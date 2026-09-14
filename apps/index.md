---
layout: default
title: "Apps para Gestão de Pesquisa — Aplicativos do coLAB"
description: "O coLAB possui uma linha própria de soluções opensource e de código aberto, desenvolvidas por nossos pesquisadores e pesquisadoras, com auxílio de inteligência artificial, para facilitar tarefas de pesquisa, gestão acadêmica, gestão de mídias sociais, e outras atividades da rotina investigativa, todas disponibilizadas livremente a interessados."
permalink: /apps/
hero_eyebrow: "Aplicativos do coLAB"
hero_title: "Apps para Gestão de Pesquisa"
hero_description: >
  O coLAB possui uma linha própria de soluções opensource e de código aberto,
  desenvolvidas por nossos pesquisadores e pesquisadoras, com auxílio de
  inteligência artificial, para facilitar tarefas de pesquisa, gestão
  acadêmica, gestão de mídias sociais, e outras atividades da rotina
  investigativa, todas disponibilizadas livremente a interessados.
hero_images:
  col1:
    src: "/assets/img/apps/kripplab-featured.png"
    alt: "KrippLAB — confiabilidade entre codificadores"
  col2:
    - src: "/assets/img/apps/sucupiralab-featured.png"
      alt: "SucupiraLAB — gestão acadêmica"
    - src: "/assets/img/apps/codlab-featured.png"
      alt: "CodLAB — codificação manual para análise de conteúdo"
  col3:
    src: "/assets/img/apps/apps-featured.png"
    alt: "Aplicativos coLAB"
---
{% include page-hero.html
   eyebrow=page.hero_eyebrow
   title=page.hero_title
   description=page.hero_description
   images=page.hero_images
   newsletter_label=site.data.hero.newsletter_label
   newsletter_placeholder=site.data.hero.form.placeholder
   newsletter_button=site.data.hero.form.button_text
%}
{% include apps-list.html %}
