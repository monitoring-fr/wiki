---
layout: page
title: Infrastructure
permalink: /infra/index.html
---

Au delà de la supervision qui reste le cœur de la gestion du système d’informations, il est possible de penser par extension à entièrement gérer un SI avec des logiciels Open Source. Voici donc le point de départ des logiciels qui nous servent soit à gérer la modeste infrastructure monitoring-fr.org soit à entrevoir toujours plus de liberté dans la façon de gérer son SI.

<ul class="collection">
{% assign sorted_articles = site.infra | sort: 'title' %}
{% for article in sorted_articles %}
    <li class="collection-item"><a href="{{ article.url }}">{{ article.title }}</a></li>
{% endfor %}
</ul>