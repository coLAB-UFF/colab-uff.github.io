---
layout: default
title: "DDoS Lab — Laboratory to Combat Disinformation and Hate Speech"
description: "DDoS Lab: a laboratory to combat disinformation and hate speech in networked communication systems, a coLAB/UFF project."
permalink: /en/ddoslab/
hero_eyebrow: "A coLAB project"
hero_title: "DDoS Lab - Laboratory to Combat Disinformation and Hate Speech in Networked Communication Systems"
hero_description: >
  DDoS Lab aims to map influence networks and identify dynamics of political
  action associated with the spread of disinformation and hate speech,
  inauthentic behavior and anti-democratic agendas.
hero_images:
  col1:
    src: "/assets/img/publicacoes/influenciadores-digitais-politicos.jpg"
    alt: "Report Mapping of Local Influencers"
  col2:
    - src: "/assets/img/publicacoes/mapa-violencia-politica-genero.jpg"
      alt: "Report Map of Gender-Based Political Violence on Digital Platforms"
    - src: "/assets/img/publicacoes/tiktok-polarizacao-politica-brasil.jpg"
      alt: "Report TikTok and Political Polarization in Brazil"
  col3:
    src: "/assets/img/projects/ddoslab-featured.png"
    alt: "DDoS Lab — Laboratory to Combat Disinformation and Hate Speech"
---
{% include i18n.html %}
{% include page-hero.html
   eyebrow=page.hero_eyebrow
   title=page.hero_title
   description=page.hero_description
   images=page.hero_images
   newsletter_label=d.hero.newsletter_label
   newsletter_placeholder=d.hero.form.placeholder
   newsletter_button=d.hero.form.button_text
%}
{% include ddoslab-reports.html %}
