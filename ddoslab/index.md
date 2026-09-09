---
layout: default
title: "DDoS Lab — Laboratório de Combate à Desinformação e ao Discurso de Ódio"
description: "DDoS Lab: laboratório de combate à desinformação e ao discurso de ódio em sistemas de comunicação em rede, um projeto do coLAB/UFF."
permalink: /ddoslab/
hero_eyebrow: "Um projeto coLAB"
hero_title: "DDoS Lab - Laboratório de Combate à Desinformação e ao Discurso de Ódio em Sistemas de Comunicação em Rede"
hero_description: >
  O DDoS Lab tem como objetivo mapear redes de influência e identificar dinâmicas
  de ação política que estejam associadas à disseminação de desinformação e
  discurso de ódio, comportamentos inautênticos e agendas antidemocráticas.
hero_images:
  col1:
    src: "/assets/img/publicacoes/influenciadores-digitais-politicos.jpg"
    alt: "Relatório Mapeamento de Influenciadores Locais"
  col2:
    - src: "/assets/img/publicacoes/mapa-violencia-politica-genero.jpg"
      alt: "Relatório Mapa da Violência Política de Gênero em Plataformas Digitais"
    - src: "/assets/img/publicacoes/tiktok-polarizacao-politica-brasil.jpg"
      alt: "Relatório TikTok e Polarização Política no Brasil"
  col3:
    src: "/assets/img/projects/ddoslab-featured.png"
    alt: "DDoS Lab — Laboratório de Combate à Desinformação e ao Discurso de Ódio"
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
{% include ddoslab-reports.html %}
