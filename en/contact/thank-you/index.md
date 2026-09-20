---
layout: default
title: "Message sent"
description: "Thank you for contacting coLAB."
permalink: /en/contact/thank-you/
---
{% include i18n.html %}
<section class="contact-page container animate">
  <div class="contact-page__inner contact-page__inner--center">
    <h1 class="contact-page__title">{{ t.thanks_title }}</h1>
    <p class="contact-page__subtitle">{{ t.thanks_text }}</p>
    <a href="{{ t.home_url | relative_url }}" class="btn btn-colab-accent">{{ t.thanks_back }}</a>
  </div>
</section>
