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
hero_image: "/assets/img/apps/apps-featured.png"
---
{% include page-hero.html
   eyebrow=page.hero_eyebrow
   title=page.hero_title
   description=page.hero_description
   single_image=page.hero_image
   single_image_alt="Aplicativos coLAB"
   newsletter_label=site.data.hero.newsletter_label
   newsletter_placeholder=site.data.hero.form.placeholder
   newsletter_button=site.data.hero.form.button_text
%}
{% include apps-list.html %}
