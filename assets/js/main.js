// ==========================================================================
// Bloco "Board do coLAB" (Time)
// Os dados dos integrantes e a configuração (quantos por página, tipo de
// paginação, ordem de exibição) vêm de _data/team.yml — este arquivo só
// cuida da apresentação (ordenar, paginar, montar os cards, travar altura).
// Para mudar o comportamento do bloco, edite _data/team.yml, não este JS.
// ==========================================================================
// Mesmas redes/ícones do single de Integrante (ver _layouts/integrante.html):
// a maioria usa um ícone Unicons (uil-*); ORCID usa um SVG próprio em
// preto e branco (ver _includes/icon-orcid.html) e ResearchGate, sem ícone
// disponível na coleção, usa um selo com a letra "R".
var SOCIAL_ICONS = {
  lattes: "uil-file-alt",
  google_scholar: "uil-graduation-cap",
  academia: "uil-university",
  instagram: "uil-instagram",
  twitter: "uil-twitter"
};
var SOCIAL_LABELS = {
  lattes: "Currículo Lattes",
  orcid: "ORCID",
  google_scholar: "Google Scholar",
  academia: "Academia.edu",
  researchgate: "ResearchGate",
  instagram: "Instagram",
  twitter: "Twitter"
};
var ORCID_SVG_ICON =
  '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.428.947.947 0 .525-.422.947-.947.947-.525 0-.946-.422-.946-.947 0-.519.421-.947.946-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-2.016-1.284-3.722-4.097-3.722h-2.222z"/></svg>';

// Monta o <a> de uma rede/plataforma do card (mesmo tipo usado em SOCIAL_LABELS).
function buildSocialLinkHTML(type) {
  var label = SOCIAL_LABELS[type] || type;
  var inner;
  if (type === "orcid") {
    inner = ORCID_SVG_ICON;
  } else if (type === "researchgate") {
    inner = '<span class="icon-letter">R</span>';
  } else {
    inner = '<i class="uil ' + (SOCIAL_ICONS[type] || "uil-link") + '"></i>';
  }
  return '<a href="#" class="' + type + '" aria-label="' + label + '">' + inner + "</a>";
}

// Lê pagination_mode/order do próprio bloco (podem ser sobrescritos por
// página, ver _includes/team.html) e profiles_per_page de window.TEAM_CONFIG
// (vindo de _data/team.yml — não é sobrescrito por página).
function getTeamConfig() {
  var carousel = document.querySelector("[data-team-carousel]");
  var base = window.TEAM_CONFIG || {};
  return {
    profiles_per_page: base.profiles_per_page,
    pagination_mode: (carousel && carousel.dataset.paginationMode) || base.pagination_mode,
    order: (carousel && carousel.dataset.order) || base.order
  };
}

document.addEventListener("DOMContentLoaded", function () {
  // Scroll reveal para todas as seções ".animate"
  var animatedSections = document.querySelectorAll(".animate");
  if ("IntersectionObserver" in window && animatedSections.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    animatedSections.forEach(function (section) {
      observer.observe(section);
    });
  } else {
    animatedSections.forEach(function (section) {
      section.classList.add("in-view");
    });
  }

  renderTeamBlock();
  initGalleryLightbox();

  // Menu mobile
  var toggle = document.querySelector("[data-nav-toggle]");
  var menu = document.querySelector("[data-nav-menu]");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      menu.classList.toggle("show");
    });
  }
});

// Lightbox da galeria "Imagens em Destaque" (páginas de Publicações):
// clique na imagem para ampliar, com botão/Esc/clique-fora para fechar.
function initGalleryLightbox() {
  var overlay = document.querySelector("[data-lightbox-overlay]");
  var triggers = document.querySelectorAll("[data-lightbox-trigger]");
  if (!overlay || !triggers.length) return;

  var img = overlay.querySelector("[data-lightbox-image]");
  var closeBtn = overlay.querySelector("[data-lightbox-close]");

  function open(src, alt) {
    img.src = src;
    img.alt = alt || "";
    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function close() {
    overlay.classList.remove("is-open");
    document.body.style.overflow = "";
    img.src = "";
  }

  triggers.forEach(function (trigger) {
    trigger.addEventListener("click", function (event) {
      event.preventDefault();
      var image = trigger.querySelector("img");
      open(trigger.getAttribute("href"), image ? image.alt : "");
    });
  });

  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", function (event) {
    if (event.target === overlay) close();
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") close();
  });
}

// Lê os integrantes a partir do <ul data-team-source> renderizado pelo Jekyll
// (ver _includes/team.html), convertendo cada <li data-*> em um objeto.
function readTeamMembersFromDOM() {
  var items = document.querySelectorAll("[data-team-source] li");
  return Array.prototype.map.call(items, function (li) {
    var social = li.dataset.social ? li.dataset.social.split(",").filter(Boolean) : [];
    return {
      name: li.dataset.name,
      role: li.dataset.role,
      bio: li.dataset.bio,
      avatar: li.dataset.avatar,
      social: social,
      featured: li.dataset.featured === "true",
      badge: li.dataset.badge,
      url: li.dataset.url
    };
  });
}

// Monta o markup de um card de integrante (mesma estética do CSS existente).
function buildTeamCardHTML(member) {
  var classes = "team-card" + (member.featured ? " team-card--featured" : "");
  var badge = member.featured
    ? '<span class="team-card__badge">' + (member.badge || "Destaque") + "</span>"
    : "";
  var socialLinks = (member.social || []).map(buildSocialLinkHTML).join("");
  var url = member.url || "#";

  return (
    '<div class="' + classes + '">' +
    '<a href="' + url + '" class="team-card__avatar-link">' +
    '<img class="team-card__avatar" src="' + member.avatar + '" alt="' + member.name + '">' +
    "</a>" +
    badge +
    '<h4 class="team-card__name"><a href="' + url + '">' + member.name + "</a></h4>" +
    '<div class="team-card__meta">' + member.role + "</div>" +
    '<p class="team-card__bio">' + member.bio + "</p>" +
    '<nav class="nav social justify-content-center">' + socialLinks + "</nav>" +
    "</div>"
  );
}

// Embaralha uma cópia do array (Fisher-Yates), sem alterar o original.
function shuffleArray(list) {
  var arr = list.slice();
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}

// Aplica a config (window.TEAM_CONFIG, vinda de _data/team.yml) sobre os
// integrantes lidos do DOM: separa destaques (sempre primeiro, ordem manual
// entre si), ordena o restante conforme "order" e pagina conforme
// "pagination_mode" / "profiles_per_page".
function getOrderedTeamPages() {
  var config = getTeamConfig();
  var members = readTeamMembersFromDOM();
  var featured = members.filter(function (m) { return m.featured; });
  var rest = members.filter(function (m) { return !m.featured; });

  if (config.order === "alphabetical") {
    rest = rest.slice().sort(function (a, b) {
      return a.name.localeCompare(b.name, "pt-BR");
    });
  } else if (config.order === "random") {
    rest = shuffleArray(rest);
  }
  // "manual" -> mantém a ordem em que os integrantes estão em _data/team.yml.

  var ordered = featured.concat(rest);

  if (config.pagination_mode === "all") {
    return [ordered];
  }

  var perPage = Math.max(1, config.profiles_per_page || 9);
  var pages = [];
  for (var i = 0; i < ordered.length; i += perPage) {
    pages.push(ordered.slice(i, i + perPage));
  }
  return pages;
}

function renderTeamBlock() {
  var config = getTeamConfig();
  var track = document.querySelector("[data-team-track]");
  var dotsWrap = document.querySelector("[data-team-dots]");
  if (!track) return;

  var pages = getOrderedTeamPages();
  var showDots = config.pagination_mode === "dots" && pages.length > 1;

  track.innerHTML = pages
    .map(function (page, i) {
      var cardsHTML = page.map(buildTeamCardHTML).join("");
      return (
        '<div class="team-carousel__page' + (i === 0 ? " is-active" : "") + '" data-team-page>' +
        cardsHTML +
        "</div>"
      );
    })
    .join("");

  if (dotsWrap) {
    dotsWrap.style.display = showDots ? "" : "none";
    dotsWrap.innerHTML = showDots
      ? pages
          .map(function (_, i) {
            return (
              '<button type="button" class="' + (i === 0 ? "is-active" : "") + '" data-team-dot aria-label="Página ' + (i + 1) + '"></button>'
            );
          })
          .join("")
      : "";
  }

  var teamTrack = track;
  var teamPages = track.querySelectorAll("[data-team-page]");
  var teamDots = dotsWrap ? dotsWrap.querySelectorAll("[data-team-dot]") : [];

  // Trava a altura do carrossel na maior página, para a paginação não "saltar"
  // quando bios/nomes de tamanhos diferentes mudam a altura do conteúdo.
  function lockTeamHeight() {
    if (!teamTrack || !teamPages.length) return;
    teamTrack.style.minHeight = "";
    var maxHeight = 0;
    teamPages.forEach(function (page) {
      var wasActive = page.classList.contains("is-active");
      if (!wasActive) {
        page.style.display = "grid";
        page.style.visibility = "hidden";
      }
      maxHeight = Math.max(maxHeight, page.offsetHeight);
      if (!wasActive) {
        page.style.display = "";
        page.style.visibility = "";
      }
    });
    teamTrack.style.minHeight = maxHeight + "px";
  }

  lockTeamHeight();
  window.addEventListener("resize", lockTeamHeight);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(lockTeamHeight);
  }

  teamDots.forEach(function (dot, index) {
    dot.addEventListener("click", function () {
      teamPages.forEach(function (page, i) {
        page.classList.toggle("is-active", i === index);
      });
      teamDots.forEach(function (d, i) {
        d.classList.toggle("is-active", i === index);
      });
    });
  });
}
