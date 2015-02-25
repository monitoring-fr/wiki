---
layout: page
---

[[[Chef](chef@do=backlink.html)]]

[wiki monitoring-fr.org](../start.html "[ALT+H]")

![Logo Monitoring](../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../start.html "start") »
[Infrastructure](start.html "infra:start") »
[Chef](chef.html "infra:chef")

### Table des matières {.toggle}

-   [Chef](chef.html#chef)

Chef {#chef .sectionedit1}
====

[Chef](http://www.opscode.com/chef/ "http://www.opscode.com/chef/") est
un outil de gestion des configurations et de déploiement de logiciels
écrit en Ruby et publié sous licence Apache 2 par la société Opscode. Il
permet d’industrialiser et d’automatiser un parc de serveurs et utilise
pour cela un DSL (Domain Specific Language) en pur Ruby. Il permet en
outre l’exécution parallèle et simultanée de commandes sur une partie ou
la totalité d’un parc de serveurs. Avec Ruby, on cuisine ses serveurs
avec un couteau (knife) pour créer des recettes (recipes) qui viendront
prendre place dans le livre de recettes (cookbook).

SOMMAIRE {#sommaire .sectionedit1}
--------

**[Accueil](../start.html "start")**

**[Supervision](../supervision/start.html "supervision:start")**

-   [Nagios](../nagios/start.html "nagios:start")
-   [Centreon](../centreon/start.html "centreon:start")
-   [Shinken](../shinken/start.html "shinken:start")
-   [Zabbix](../zabbix/start.html "zabbix:start")
-   [OpenNMS](../opennms/start.html "opennms:start")
-   [EyesOfNetwork](../eyesofnetwork/start.html "eyesofnetwork:start")
-   [Groundwork](../groundwork/start.html "groundwork:start")
-   [Zenoss](../zenoss/start.html "zenoss:start")
-   [Vigilo](../vigilo/start.html "vigilo:start")
-   [Icinga](../icinga/start.html "icinga:start")
-   [Cacti](../cacti/start.html "cacti:start")
-   [Ressenti
    utilisateur](../supervision/eue/start.html "supervision:eue:start")
-   [Ressenti utilisateur avec
    sikuli](../sikuli/eue/start.html "sikuli:eue:start")

**[Hypervision](../hypervision/start.html "hypervision:start")**

-   [Canopsis](../canopsis/start.html "canopsis:start")

**[Sécurité](../securite/start.html "securite:start")**

**[Infrastructure](start.html "infra:start")**

**[Développement](../dev/start.html "dev:start")**

Gestion des infrastructures {#gestion-des-infrastructures .sectionedit1}
---------------------------

-   [Chef](chef.html "infra:chef")
-   [GLPI](glpi/start.html "infra:glpi:start")
-   [Graylog2](graylog2.html "infra:graylog2")
-   [Installation de Job
    Scheduler](jobscheduler.html "infra:jobscheduler")
-   [Installation de archipel sous ubuntu
    10.10](archipel.html "infra:archipel")
-   [Installation de sikuli IDE sous Ubuntu
    10.10](sikuli.html "infra:sikuli")
-   [Knockd](knockd.html "infra:knockd")
-   [Logstash](logstash.html "infra:logstash")
-   [Mise en place d'un système de contrôle de version GIT sous unbuntu
    server 10.10](git.html "infra:git")
-   [Partage de session terminal avec
    Screen](screen.html "infra:screen")
-   [Postfix](postfix.html "infra:postfix")
-   [Zimbra](zimbra.html "infra:zimbra")

-   [Afficher le texte
    source](chef@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](chef@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](chef@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](chef@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](chef@do=media.html "Gestionnaire de médias")
-   [Index](chef@do=index.html "Index [X]")
-   [Connexion](chef@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de page](chef.html#dokuwiki__top "Haut de page [T]")

infra/chef.txt · Dernière modification: 2013/03/29 09:39 (modification
externe)

[![CC Attribution-Noncommercial-Share Alike 3.0
Unported](../lib/images/license/button/cc-by-nc-sa.png)](http://creativecommons.org/licenses/by-nc-sa/3.0/)

[![www.chimeric.de](../lib/tpl/arctic/images/button-chimeric-de.png)](http://www.chimeric.de "www.chimeric.de")
[![Valid
CSS](../lib/tpl/arctic/images/button-css.png)](http://jigsaw.w3.org/css-validator/check/referer "Valid CSS")
[![Driven by
DokuWiki](../lib/tpl/arctic/images/button-dw.png)](http://wiki.splitbrain.org/wiki:dokuwiki "Driven by DokuWiki")
[![do yourself a favour and use a real browser - get
firefox!!](../lib/tpl/arctic/images/button-firefox.png)](http://www.firefox-browser.de "do yourself a favour and use a real browser - get firefox")
[![Recent changes RSS
feed](../lib/tpl/arctic/images/button-rss.png)](../feed.php "Recent changes RSS feed")
[![Valid XHTML
1.0](../lib/tpl/arctic/images/button-xhtml.png)](http://validator.w3.org/check/referer "Valid XHTML 1.0")

![](../lib/exe/indexer.php@id=infra%253Achef&1424859535)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
