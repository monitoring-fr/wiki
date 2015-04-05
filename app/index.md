---
layout: page
title: Accueil
---

Ce wiki contient l’ensemble des docs, how-to, tutoriaux rédigés par l’équipe de monitoring-fr et ses contributeurs réguliers et/ou occasionnels sur la supervision et plus généralement sur la gestion des infrastructures informatiques à partir de logiciels Open Source.

Pour participer, il suffit de [créer un compte](start@do=register.html "http://wiki.monitoring-fr.org/start?do=register") sur ce wiki et de [se connecter](start@do=login.html "http://wiki.monitoring-fr.org/start?do=login"). Un guide d’écriture pour le wiki est [disponible](http://wiki.monitoring-fr.org/wiki/syntax "wiki:syntax").

Du fait de l’augmentation du nombre de spams sur le wiki, nous sommes dans l’obligation de vérifier les adresses des personnes qui s’enregistrent avant de leur accorder les droits en écriture. Désolé pour la gêne occasionnée.

## Documentation Supervision

Des documents plus “génériques” sur la [supervision](supervision/start.html "supervision:start") Windows, VMware, avec IPMI, [SNMP](supervision/snmp.html "supervision:snmp")… avec Nagios bien sûr… mais pas que Nagios ![=)](lib/images/smileys/icon_smile2.gif)

<ul class="collection">
{% assign sorted_articles = site.supervision | sort: 'title' %}
{% for article in sorted_articles %}
    <li class="collection-item"><a href="{{ article.url }}">{{ article.title }}</a></li>
{% endfor %}
</ul>

Sans oublier le désormais célèbre
[Panorama](supervision/links.html "supervision:links")
![:-P](lib/images/smileys/icon_razz.gif)

### Documentation Nagios

Doit accueillir l’ensemble des documentations d’installation, de configuration et d’administration de [Nagios](nagios/start.html "nagios:start").

<ul class="collection">
{% assign sorted_articles = site.nagios | sort: 'title' %}
{% for article in sorted_articles %}
    <li class="collection-item"><a href="{{ article.url }}">{{ article.title }}</a></li>
{% endfor %}
</ul>

### Documentation Centreon

Doit accueillir l’ensemble des documentations d’installation, de configuration et d’administration de [Centreon](centreon/start.html "centreon:start").

<ul class="collection">
{% assign sorted_articles = site.centreon | sort: 'title' %}
{% for article in sorted_articles %}
    <li class="collection-item"><a href="{{ article.url }}">{{ article.title }}</a></li>
{% endfor %}
</ul>

### Documentation Shinken

Le wiki héberge également le projet de Jean Gabès; [Shinken](shinken/start.html "shinken:start") qui est un Proof Of Concept pour le moment de ce que pourrait donner Nagios pour les très grosses installations. ~~100 000~~ 250 000 (nouveau record ![:-P](lib/images/smileys/icon_razz.gif)) contrôles toutes les 5 minutes, ça force le respect ![;-)](lib/images/smileys/icon_wink.gif)

<ul class="collection">
{% assign sorted_articles = site.shinken | sort: 'title' %}
{% for article in sorted_articles %}
    <li class="collection-item"><a href="{{ article.url }}">{{ article.title }}</a></li>
{% endfor %}
</ul>

### Documentation Zabbix

Cette section contient l’ensemble de la documentation sur [Zabbix](zabbix/start.html "zabbix:start").

<ul class="collection">
{% assign sorted_articles = site.zabbix | sort: 'title' %}
{% for article in sorted_articles %}
    <li class="collection-item"><a href="{{ article.url }}">{{ article.title }}</a></li>
{% endfor %}
</ul>

### Documentation OpenNMS

Doit accueillir l’ensemble des documentations d’installation, de configuration et d’administration d’[OpenNMS](opennms/start.html "opennms:start").

<ul class="collection">
{% assign sorted_articles = site.opennms | sort: 'title' %}
{% for article in sorted_articles %}
    <li class="collection-item"><a href="{{ article.url }}">{{ article.title }}</a></li>
{% endfor %}
</ul>

### Documentation EyesOfNetwork

Doit accueillir l’ensemble des documentations d’installation, de configuration et d’administration de [EyesOfNetwork](eyesofnetwork/start.html "eyesofnetwork:start").

- [Installation de EyesOfNetwork](eyesofnetwork/eyesofnetwork-iso-install.html "eyesofnetwork:eyesofnetwork-iso-install")
- [Interface Web de EyesOfNetwork](eyesofnetwork/eyesofnetwork-interface.html "eyesofnetwork:eyesofnetwork-interface")

### Documentation Groundwork

Doit accueillir l’ensemble des documentations d’installation, de configuration et d’administration de [Groundwork](groundwork/start.html "groundwork:start").

- [Installation de Groundwork Bêta 6.0 sur Ubuntu 8.0.4 LTS](groundwork/groundwork6.0-install-ubuntu.html "groundwork:groundwork6.0-install-ubuntu")
- [Installation GroundWork sur Ubuntu 8.0.4 LTS](groundwork/groundwork-ubuntu-install.html "groundwork:groundwork-ubuntu-install")

### Documentation Vigilo

Doit accueillir l’ensemble des documentations d’installation, de configuration et d’administration de [Vigilo](vigilo/start.html "vigilo:start").

- [Installation Vigilo sur Ubuntu 8.0.4 LTS](vigilo/vigilo-ubuntu-install.html "vigilo:vigilo-ubuntu-install")

### Documentation Cacti

Doit accueillir l’ensemble des documentations d’installation, de configuration et d’administration de [Cacti](cacti/start.html "cacti:start").

- [Installation de Cacti Windows](cacti/windows-install.html "cacti:windows-install")
- [Installation de Cacti sur Ubuntu](cacti/ubuntu-install.html "cacti:ubuntu-install")
- [Installation Cacti sur RedHat 9](cacti/redhat-install.html "cacti:redhat-install")
- [Configuration de Cacti](cacti/configuration.html "cacti:configuration")

## Documentation Hypervision

Un ensemble de documentations sur l’installation, la configuration et l’utilisation d’applications pour l’[hypervision](hypervision/start.html "hypervision:start") d’un système d’information :

<ul class="collection">
{% assign sorted_articles = site.hypervision | sort: 'title' %}
{% for article in sorted_articles %}
    <li class="collection-item"><a href="{{ article.url }}">{{ article.title }}</a></li>
{% endfor %}
</ul>

## Documentation Sécurité

Un ensemble de documentations sur l’installation, la configuration et l’utilisation d’applications pour la [sécurité](securite/start.html "securite:start") d’un système/réseau, ou bien encore, sur la mise en place d’une architecture combinant la sécurité et la supervision (Sécurité OSS).

<ul class="collection">
{% assign sorted_articles = site.securite | sort: 'title' %}
{% for article in sorted_articles %}
    <li class="collection-item"><a href="{{ article.url }}">{{ article.title }}</a></li>
{% endfor %}
</ul>

## Documentation Infrastructure

La gestion des [infrastructures informatiques](/infra/ "Gestion des infrastructures") à base de logiciels Open Source

<ul class="collection">
{% assign sorted_articles = site.infra | sort: 'title' %}
{% for article in sorted_articles %}
    <li class="collection-item"><a href="{{ article.url }}">{{ article.title }}</a></li>
{% endfor %}
</ul>