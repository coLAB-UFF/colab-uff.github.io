---
title: "xoxoLAB"
excerpt: >
  Aplicativo de gestão editorial colaborativa do coLAB/UFF, pensado para
  organizar fluxos de produção e revisão de textos entre integrantes do grupo.
order: 3
authors: "Viktor Chagas e Arthur Araujo"
year: 2026
demo_url: "https://xoxolab.ombudsmanviktor.me/"
install_url: "https://github.com/ombudsmanviktor/xoxolab"
doi: "10.0000/PENDENTE"
image: "/assets/img/apps/xoxolab-featured.png"
---

### Créditos

Autoria: **Viktor Chagas**{% include orcid.html url="https://orcid.org/0000-0002-1806-6062" %} e **Arthur Araujo**

Realização: coLAB/UFF

### Como citar este aplicativo

```

{% if page.doi and page.doi != "10.0000/PENDENTE" %}
Link: [https://doi.org/{{ page.doi }}](https://doi.org/{{ page.doi }})
{% elsif page.demo_url %}
Link: [{{ page.demo_url }}]({{ page.demo_url }})
{% elsif page.access_url %}
Link: [{{ page.access_url }}]({{ page.access_url }})
{% endif %}
