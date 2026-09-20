---
layout: default
title: "Apps for Research Management — coLAB Apps"
description: "coLAB has its own line of open-source solutions, developed by our researchers with the help of artificial intelligence, to facilitate research tasks, academic management, social media management, and other activities of the investigative routine, all freely available to anyone interested."
permalink: /en/lab/
hero_eyebrow: "coLAB Apps"
hero_title: "Apps for Research Management"
hero_description: >
  coLAB has its own line of open-source solutions, developed by our
  researchers with the help of artificial intelligence, to facilitate research
  tasks, academic management, social media management, and other activities of
  the investigative routine, all freely available to anyone interested.
hero_images:
  col1:
    src: "/assets/img/apps/kripplab-featured.png"
    alt: "KrippLAB — intercoder reliability"
  col2:
    - src: "/assets/img/apps/sucupiralab-featured.png"
      alt: "SucupiraLAB — academic management"
    - src: "/assets/img/apps/codlab-featured.png"
      alt: "CodLAB — manual coding for content analysis"
  col3:
    src: "/assets/img/apps/apps-featured.png"
    alt: "coLAB Apps"
---
{% include page-hero.html
   eyebrow=page.hero_eyebrow
   title=page.hero_title
   description=page.hero_description
   images=page.hero_images
   newsletter_label=site.data.en.hero.newsletter_label
   newsletter_placeholder=site.data.en.hero.form.placeholder
   newsletter_button=site.data.en.hero.form.button_text
%}
{% include apps-list.html %}
