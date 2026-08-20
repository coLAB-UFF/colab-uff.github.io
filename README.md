# coLAB — site institucional

Site estático gerado com [Jekyll](https://jekyllrb.com/), pronto para publicação via GitHub Pages
(build automático por GitHub Actions, ver `.github/workflows/jekyll.yml`).

Quase todo o conteúdo do site é configurável por arquivos **Markdown** e **YAML**, sem precisar
editar HTML, CSS ou JavaScript.

## Rodando localmente

Requer Ruby + Bundler.

```bash
bundle install
bundle exec jekyll serve
```

O site fica disponível em `http://localhost:4000` (ou na porta configurada). Qualquer alteração
em arquivos `_data/`, `_projects/`, `_includes/` etc. é recarregada automaticamente.

## Onde editar cada coisa

| Conteúdo | Arquivo(s) |
|---|---|
| Título, descrição, URL do site | `_config.yml` |
| Menu do header e links rápidos do rodapé | `_data/navigation.yml` |
| Logo, contato, redes sociais, textos do rodapé | `_data/site.yml` |
| Hero (título, texto, imagens) | `_data/hero.yml` |
| Apoiadores/parceiros (seção de logos) | `_data/partners.yml` |
| Cards "O que fazemos?" | `_data/features.yml` |
| **Bloco "Board do coLAB" (Time)** — config de paginação/ordem | `_data/team.yml` |
| **Integrantes** (perfil + página single de cada pessoa) | pasta `_integrantes/` (um arquivo `.md` por integrante) |
| Texto de intro da seção "Projetos" | `_data/works.yml` |
| Texto de intro da seção "Projetos em destaque" | `_data/portfolio.yml` |
| Texto do bloco "Um pouco sobre o coLAB" | `_data/author.yml` |
| **Projetos** (aparecem em "Projetos" e/ou "Projetos em destaque") | pasta `_projects/` (um arquivo `.md` por projeto) |

## Configurando o bloco "Board do coLAB"

Em `_data/team.yml`, a chave `config` controla o comportamento do bloco sem precisar tocar em
código:

```yaml
config:
  profiles_per_page: 9      # quantos perfis por página (3, 6, 9, 12...)
  pagination_mode: "dots"   # "dots" (paginação por pontos) ou "all" (mostra todos de uma vez)
  order: "manual"           # "manual", "alphabetical" ou "random"
```

Cada integrante é um arquivo em `_integrantes/` (front matter com `name`, `role`, `bio`, `avatar`,
`social`, `order`, além de `degree`, `research_interests` e `social_links` usados na página single
da pessoa; o corpo do arquivo é a minibio). Para destacar um perfil (realce visual + sempre exibido
primeiro), adicione `featured: true` e, opcionalmente, `badge: "Texto do selo"`.

## Adicionando ou editando um projeto

Cada projeto é um arquivo `.md` dentro de `_projects/`. O conteúdo do arquivo pode ficar vazio —
tudo é controlado pelo front matter (cabeçalho entre `---`):

```yaml
---
title: "Nome do projeto"
category: "Pesquisa"
excerpt: "Descrição curta do projeto."
image: "/assets/img/works/minha-imagem.jpg"   # ou uma URL completa
section: works       # "works" (seção "Projetos") ou "portfolio" (seção "Projetos em destaque")
size: featured        # apenas para section: portfolio — "featured" (card grande) ou "small"
color: accent          # apenas para section: portfolio — "accent" ou "navy"
image_position: right   # apenas para cards "featured" — "right" ou "left"
order: 1                 # ordem de exibição dentro da seção
---
```

A seção "Projetos" (`_includes/works.html`) lista os projetos com `section: works`. A seção
"Projetos em destaque" (`_includes/portfolio.html`) lista os projetos com `section: portfolio`,
separando os `size: featured` (2 cards grandes) dos `size: small` (2 cards pequenos).

## Estrutura

```
_config.yml          Configuração geral do Jekyll e do site
_data/                Conteúdo em YAML (ver tabela acima)
_projects/             Coleção de projetos em Markdown
_layouts/default.html   Layout base (head, scripts)
_includes/               Uma seção do site por arquivo (header, hero, team, footer...)
assets/css/style.css      Estilos
assets/js/main.js          Comportamento (scroll reveal, paginação do bloco Time)
index.md                    Home — só aciona o layout "default"
```

## Publicando no GitHub Pages

1. Suba este repositório para o GitHub.
2. Em **Settings → Pages → Build and deployment**, selecione **GitHub Actions**.
3. O workflow em `.github/workflows/jekyll.yml` builda e publica automaticamente a cada push na
   branch `main`.

Se o site for publicado como projeto (`usuario.github.io/nome-do-repo`), ajuste `baseurl` em
`_config.yml` para `"/nome-do-repo"`.
