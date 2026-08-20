// ==========================================================================
// Clipping — carrega as notícias direto da planilha pública do coLAB (Google
// Sheets, exportada como CSV via gviz/tq) e monta os cards no navegador.
// Mesmo esquema de integração usado no Clipping do #MUSEUdeMEMES
// (colab.meme/museudememes/clipping/): PapaParse + endpoint gviz/tq (tem
// CORS nativo para planilhas públicas, evita o redirect do /export).
// Diferença proposital: aqui NÃO filtramos pela coluna "Tags" (que no
// #MUSEUdeMEMES separa o que leva a tag #MUSEUdeMEMES) — exibimos todas as
// linhas da planilha, já que esta é a página de Clipping do coLAB como um
// todo, não de um projeto específico.
// ==========================================================================
(function () {
  "use strict";

  var SHEETS_URL = "https://docs.google.com/spreadsheets/d/1qzCZkxj9AeJ8LKt5xJp_snYqXixoq93jK2trl3Xnj6Q/gviz/tq?tqx=out:csv";
  var GH_RAW_BASE = "https://raw.githubusercontent.com/colab-uff/clipping/main/";
  var PER_PAGE = 54;

  var allItems = [];
  var currentPage = 1;

  /* ── Utilitários ─────────────────────────────────────────── */

  function resolveImage(val) {
    if (!val || val.trim() === "") return null;
    val = val.trim();
    if (/^https?:\/\//i.test(val)) return val; // URL externa — usar como está
    return GH_RAW_BASE + val.replace(/^\//, ""); // path relativo -> raw GitHub
  }

  // A coluna "Data" da planilha já vem no formato DD/MM/YYYY — só exibimos
  // como está.
  function formatDate(dateStr) {
    return dateStr ? dateStr.trim() : "";
  }

  // Converte "DD/MM/YYYY" em timestamp para ordenação cronológica real.
  // Comparar as strings DD/MM/YYYY diretamente (ex.: via localeCompare)
  // ordena pelo dia primeiro, não pelo ano — por isso não dá pra usar a
  // string da planilha direto no sort.
  function parseDateValue(dateStr) {
    if (!dateStr) return 0;
    var parts = dateStr.trim().split("/");
    if (parts.length !== 3) return 0;
    var day = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[2], 10);
    if (!day || !month || !year) return 0;
    return new Date(year, month - 1, day).getTime();
  }

  function esc(str) {
    return (str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* ── Renderização de card ────────────────────────────────── */

  function renderCard(row) {
    var imgUrl = resolveImage(row["Imagem da Notícia"]);
    var titulo = esc(row["Título da Notícia"] || "");
    var descricao = esc(row["Descrição"] || "");
    var categoria = esc(row["Categoria"] || "");
    var fonte = esc(row["Fonte"] || "");
    var autor = esc(row["Autor(a)"] || "");
    var data = formatDate(row["Data"]);
    var pais = esc((row["País"] || "").trim());
    var link = row["Link para a Matéria Completa"] || "";

    var imgHtml = imgUrl
      ? '<img src="' + esc(imgUrl) + '" alt="' + titulo + '" loading="lazy">'
      : '<div class="clipping-card__placeholder"><i class="uil uil-newspaper"></i></div>';

    var meta = "";
    if (fonte) meta += '<span><i class="uil uil-newspaper"></i>' + fonte + "</span>";
    if (autor) meta += '<span><i class="uil uil-user"></i>' + autor + "</span>";
    if (data) meta += '<span><i class="uil uil-calendar-alt"></i>' + data + "</span>";
    if (pais) meta += '<span><i class="uil uil-map-marker"></i>' + pais + "</span>";

    var btn = link
      ? '<a href="' + esc(link) + '" target="_blank" rel="noopener noreferrer" class="btn-report">Ler matéria completa</a>'
      : "";

    return (
      '<article class="clipping-card col-12 col-md-6 col-lg-4">' +
      '<div class="clipping-card__image">' + imgHtml + "</div>" +
      '<div class="clipping-card__info">' +
      (categoria ? '<div class="clipping-card__category">' + categoria + "</div>" : "") +
      '<h3 class="clipping-card__title">' + titulo + "</h3>" +
      (descricao ? '<p class="clipping-card__description">' + descricao + "</p>" : "") +
      (meta ? '<p class="clipping-card__meta">' + meta + "</p>" : "") +
      btn +
      "</div>" +
      "</article>"
    );
  }

  /* ── Paginação ───────────────────────────────────────────── */

  function renderPagination(page) {
    var total = Math.ceil(allItems.length / PER_PAGE);
    var pag = document.getElementById("clipping-pagination");
    if (!pag) return;

    if (total <= 1) {
      pag.innerHTML = "";
      return;
    }

    var html = '<nav aria-label="Paginação de notícias"><ul class="pagination">';
    html +=
      '<li class="page-item' + (page === 1 ? " disabled" : "") + '">' +
      '<a class="page-link" href="#noticias" data-page="' + (page - 1) + '" aria-label="Anterior">‹</a></li>';

    for (var i = 1; i <= total; i++) {
      html +=
        '<li class="page-item' + (i === page ? " active" : "") + '">' +
        '<a class="page-link" href="#noticias" data-page="' + i + '">' + i + "</a></li>";
    }

    html +=
      '<li class="page-item' + (page === total ? " disabled" : "") + '">' +
      '<a class="page-link" href="#noticias" data-page="' + (page + 1) + '" aria-label="Próximo">›</a></li>';
    html += "</ul></nav>";
    pag.innerHTML = html;

    pag.querySelectorAll("[data-page]").forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        var p = parseInt(this.getAttribute("data-page"), 10);
        if (p >= 1 && p <= total && p !== currentPage) {
          currentPage = p;
          renderPage(currentPage);
          document.getElementById("noticias").scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  }

  /* ── Resumo estatístico ──────────────────────────────────── */

  function renderSummary() {
    var total = allItems.length;
    var fontes = new Set(allItems.map(function (r) { return (r["Fonte"] || "").trim(); }).filter(Boolean)).size;
    var paises = new Set(allItems.map(function (r) { return (r["País"] || "").trim(); }).filter(Boolean)).size;

    var txt =
      "<strong>" + total + "</strong> " + (total === 1 ? "notícia" : "notícias") +
      " de <strong>" + fontes + "</strong> " + (fontes === 1 ? "fonte noticiosa" : "fontes noticiosas diferentes");

    if (paises > 0) {
      txt += " em <strong>" + paises + "</strong> " + (paises === 1 ? "país" : "países");
    }

    var el = document.getElementById("clipping-summary");
    if (!el) return;
    el.innerHTML = txt;
    el.style.display = "";
  }

  /* ── Renderização de página ──────────────────────────────── */

  function renderPage(page) {
    var start = (page - 1) * PER_PAGE;
    var slice = allItems.slice(start, start + PER_PAGE);

    var list = document.getElementById("clipping-list");
    list.innerHTML = slice.map(renderCard).join("");
    list.style.display = "";

    renderPagination(page);
  }

  /* ── Fetch + parse ───────────────────────────────────────── */

  function load() {
    var loading = document.getElementById("clipping-loading");
    var empty = document.getElementById("clipping-empty");
    var error = document.getElementById("clipping-error");
    if (!loading) return;

    fetch(SHEETS_URL)
      .then(function (r) { return r.text(); })
      .then(function (text) {
        var result = Papa.parse(text, { header: true, skipEmptyLines: true });

        allItems = result.data.slice().sort(function (a, b) {
          return parseDateValue(b["Data"]) - parseDateValue(a["Data"]);
        });

        loading.style.display = "none";

        if (allItems.length === 0) {
          empty.style.display = "";
        } else {
          renderSummary();
          renderPage(1);
        }
      })
      .catch(function () {
        loading.style.display = "none";
        error.style.display = "";
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", load);
  } else {
    load();
  }
})();
