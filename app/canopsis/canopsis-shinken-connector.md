---
layout: page
---

[[[Connecteur Shinken pour
Canopsis](canopsis-shinken-connector@do=backlink.html)]]

[wiki monitoring-fr.org](../start.html "[ALT+H]")

![Logo Monitoring](../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../start.html "start") »
[Canopsis](start.html "canopsis:start") » [Connecteur Shinken pour
Canopsis](canopsis-shinken-connector.html "canopsis:canopsis-shinken-connector")

### Table des matières {.toggle}

-   [Connecteur Shinken pour
    Canopsis](canopsis-shinken-connector.html#connecteur-shinken-pour-canopsis)

Connecteur Shinken pour Canopsis {#connecteur-shinken-pour-canopsis .sectionedit1}
================================

Tutoriel rédigé pour une version Centos 6.2, Shinken version 1.2+ et
Canopsis (stable).

  **Rôle**        **Nom**
  --------------- ----------------
  **Rédacteur**   David GUENAULT

Au moment de rédiger ces lignes le connecteur shinken pour canopsis et
encore en developpement, cela ne devrais pas trop changer dans l’avenir,
mais il existe une possibilité.

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

-   [Canopsis](start.html "canopsis:start")

**[Sécurité](../securite/start.html "securite:start")**

**[Infrastructure](../infra/start.html "infra:start")**

**[Développement](../dev/start.html "dev:start")**

-   [Afficher le texte
    source](canopsis-shinken-connector@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](canopsis-shinken-connector@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](canopsis-shinken-connector@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](canopsis-shinken-connector@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](canopsis-shinken-connector@do=media.html "Gestionnaire de médias")
-   [Index](canopsis-shinken-connector@do=index.html "Index [X]")
-   [Connexion](canopsis-shinken-connector@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de
    page](canopsis-shinken-connector.html#dokuwiki__top "Haut de page [T]")

canopsis/canopsis-shinken-connector.txt · Dernière modification:
2013/03/29 09:39 (modification externe)

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

![](../lib/exe/indexer.php@id=canopsis%253Acanopsis-shinken-connector&1424859804)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
