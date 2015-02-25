---
layout: page
---

[[[Mode passif](passif@do=backlink.html)]]

[wiki monitoring-fr.org](../start.html "[ALT+H]")

![Logo Monitoring](../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../start.html "start") »
[Supervision](start.html "supervision:start") » [Mode
passif](passif.html "supervision:passif")

### Table des matières {.toggle}

-   [Mode passif](passif.html#mode-passif)

Mode passif {#mode-passif .sectionedit1}
===========

Nagios, utilise essentiellement deux methodes pour tester les hotes :

-   Les remontés autonomes des hotes, on appelle cela les tests passifs
-   Les tests provoqués par Nagios, se sont les tests actifs

Chaque une de ses methodes a ses avantages et inconveniants, evidement

1.  tests passifs :

⇒ c’est l’hote qui decide quand elle renvoie son information, comment
etre sur que le systeme arrive encore a envoyer ses informations ? (il
existe un parametre pour parer a cela dans le nagios, regarder du cote
de check\_freshness…)

1.  tests actifs :

c’est le nagios qui decide de quand il fait le test, a son rythme

~~~~ {.code}
     => le serveur s'il le peut, pourrait prevenir un peu plus tot de l'incident
     => faire le tests requiert des ressources sur le serveur Nagios
~~~~

Un bon compromis est de permettre aux deux types de tests de fonctionner
simultanément pour le même service, en fonction des possibilités des
tests evidement, quand a la charge du serveur Nagios, il est possible de
déporter les tests avec le NRPE.

![FIXME](../lib/images/smileys/fixme.gif) : Page en cours de rédaction
par adlp

SOMMAIRE {#sommaire .sectionedit1}
--------

**[Accueil](../start.html "start")**

**[Supervision](start.html "supervision:start")**

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
-   [Ressenti utilisateur](eue/start.html "supervision:eue:start")
-   [Ressenti utilisateur avec
    sikuli](../sikuli/eue/start.html "sikuli:eue:start")

**[Hypervision](../hypervision/start.html "hypervision:start")**

-   [Canopsis](../canopsis/start.html "canopsis:start")

**[Sécurité](../securite/start.html "securite:start")**

**[Infrastructure](../infra/start.html "infra:start")**

**[Développement](../dev/start.html "dev:start")**

Supervision {#supervision .sectionedit1}
-----------

-   [Commandes pour la
    supervision](commands.html "supervision:commands")
-   [Dstat](dstat.html "supervision:dstat")
-   [Installer ou activer
    SNMP](snmp-install.html "supervision:snmp-install")
-   [Mode actif](actif.html "supervision:actif")
-   [Mode passif](passif.html "supervision:passif")
-   [Ntop](ntop/start.html "supervision:ntop:start")
-   [Panorama](links.html "supervision:links")
-   [RRDTool](rrdtool.html "supervision:rrdtool")
-   [SNMP](snmp.html "supervision:snmp")
-   [Supervision Hardware IPMI](ipmi.html "supervision:ipmi")
-   [Supervision du ressenti
    utilisateur](eue/start.html "supervision:eue:start")
-   [Tableaux récapitulatifs des différents fichiers
    importants](important-files.html "supervision:important-files")

-   [Afficher le texte
    source](passif@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](passif@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](passif@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](passif@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](passif@do=media.html "Gestionnaire de médias")
-   [Index](passif@do=index.html "Index [X]")
-   [Connexion](passif@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de page](passif.html#dokuwiki__top "Haut de page [T]")

supervision/passif.txt · Dernière modification: 2013/03/29 09:39
(modification externe)

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

![](../lib/exe/indexer.php@id=supervision%253Apassif&1424859521)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
