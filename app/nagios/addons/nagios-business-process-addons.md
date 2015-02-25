---
layout: page
---

[[[Nagios Business Process
Addon](nagios-business-process-addons@do=backlink.html)]]

[wiki monitoring-fr.org](../../start.html "[ALT+H]")

![Logo Monitoring](../../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../../start.html "start") »
[Nagios](../start.html "nagios:start") » [Nagios
Addons](start.html "nagios:addons:start") » [Nagios Business Process
Addon](nagios-business-process-addons.html "nagios:addons:nagios-business-process-addons")

### Table des matières {.toggle}

-   [Nagios Business Process
    Addon](nagios-business-process-addons.html#nagios-business-process-addon)
    -   [Installation de Nagios Business Process
        Addon](nagios-business-process-addons.html#installation-de-nagios-business-process-addon)
    -   [Utilisation de Nagios Business Process
        Addon](nagios-business-process-addons.html#utilisation-de-nagios-business-process-addon)

Nagios Business Process Addon {#nagios-business-process-addon .sectionedit1}
=============================

En cours de rédaction

Nagios Business Process Addon apporte à Nagios une dimension orientée
application (ou métier …). Il permet d’agréger des résultats de
contrôles techniques à l’aide d’opérateurs logiques (et, ou ….) afin de
présenter l’état d’une ou plusieurs applications. Cela mérite un
exemple.

Prenons le cas d’une société qui vend des tee shirt en ligne. Qu’est ce
qui va définir que le métier de cette société est disponible ? De quoi a
besoin la société pour que son commerce fonctionne ? La réponse peut
paraitre simple, et elle l’est. Il faut simplement que, du point de vue
de l’acheteur, le site de vente en ligne soit disponible et permette de
valider de bout en bout le processus d’achat. Maintenant qu’est ce qui
va définir que le site est disponible ?

-   Il faut que lorsque je tape l’adresse du site, celui réponde bien
    sur l’adresse IP du serveur qui héberge le site de commerce
    électronique (**DNS**).
-   Il faut également que le site s’affiche. Donc le **serveur web**
    doit être démarré et la **base de donnée** qui stocke le catalogue
    également.
-   Il faut également que le **tiers permettant d’enregistrer le
    paiement** électronique de la commande soit disponible.

Nous venons de définir les différents éléments constituant notre
application. Pour que le métier fonctionne il faut que les DNS et le
serveur web et la base de données et le tiers enregistrant les paiements
soit disponible. Nagios ne permet pas de définir nativement ce genre de
chaîne de liaison. Nagios Business Process Addon est la pour palier ce
manque.

Installation de Nagios Business Process Addon {#installation-de-nagios-business-process-addon .sectionedit2}
---------------------------------------------

Utilisation de Nagios Business Process Addon {#utilisation-de-nagios-business-process-addon .sectionedit3}
--------------------------------------------

SOMMAIRE {#sommaire .sectionedit1}
--------

**[Accueil](../../start.html "start")**

**[Supervision](../../supervision/start.html "supervision:start")**

-   [Nagios](../start.html "nagios:start")
-   [Centreon](../../centreon/start.html "centreon:start")
-   [Shinken](../../shinken/start.html "shinken:start")
-   [Zabbix](../../zabbix/start.html "zabbix:start")
-   [OpenNMS](../../opennms/start.html "opennms:start")
-   [EyesOfNetwork](../../eyesofnetwork/start.html "eyesofnetwork:start")
-   [Groundwork](../../groundwork/start.html "groundwork:start")
-   [Zenoss](../../zenoss/start.html "zenoss:start")
-   [Vigilo](../../vigilo/start.html "vigilo:start")
-   [Icinga](../../icinga/start.html "icinga:start")
-   [Cacti](../../cacti/start.html "cacti:start")
-   [Ressenti
    utilisateur](../../supervision/eue/start.html "supervision:eue:start")
-   [Ressenti utilisateur avec
    sikuli](../../sikuli/eue/start.html "sikuli:eue:start")

**[Hypervision](../../hypervision/start.html "hypervision:start")**

-   [Canopsis](../../canopsis/start.html "canopsis:start")

**[Sécurité](../../securite/start.html "securite:start")**

**[Infrastructure](../../infra/start.html "infra:start")**

**[Développement](../../dev/start.html "dev:start")**

Nagios Addons {#nagios-addons .sectionedit1}
-------------

-   [Lilac Platform](lilac-platform.html "nagios:addons:lilac-platform")
-   [Merlin](../../addons/merlin.html "nagios:addons:merlin")
-   [NConf](nconf.html "nagios:addons:nconf")
-   [NDOUtils](ndoutils.html "nagios:addons:ndoutils")
-   [NSClient++](nsclient.html "nagios:addons:nsclient")
-   [NagTrap](../../addons/nagtrap.html "nagios:addons:nagtrap")
-   [NagVis](nagvis/start.html "nagios:addons:nagvis:start")
-   [Nagios Business Process
    Addon](nagios-business-process-addons.html "nagios:addons:nagios-business-process-addons")
-   [NagiosDigger](nagiosdigger.html "nagios:addons:nagiosdigger")
-   [NagiosGrapher](nagiosgrapher.html "nagios:addons:nagiosgrapher")
-   [NagiosQL](nagiosql.html "nagios:addons:nagiosql")
-   [Netways Grapher
    V2](netways-grapher-v2.html "nagios:addons:netways-grapher-v2")
-   [Ninja](ninja.html "nagios:addons:ninja")
-   [PNP4Nagios](pnp/start.html "nagios:addons:pnp:start")
-   [Protocole NRPE](nrpe.html "nagios:addons:nrpe")
-   [Protocole NSCA](nsca.html "nagios:addons:nsca")
-   [Setup distribué avec
    Mod\_Gearman](mod_gearman.html "nagios:addons:mod_gearman")
-   [Vautour Style](vautour-style.html "nagios:addons:vautour-style")
-   [check\_mk](check_mk/start.html "nagios:addons:check_mk:start")
-   [omd Open Monitoring Distribution](omd.html "nagios:addons:omd")

-   [Afficher le texte
    source](nagios-business-process-addons@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](nagios-business-process-addons@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](nagios-business-process-addons@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](nagios-business-process-addons@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](nagios-business-process-addons@do=media.html "Gestionnaire de médias")
-   [Index](nagios-business-process-addons@do=index.html "Index [X]")
-   [Connexion](nagios-business-process-addons@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de
    page](nagios-business-process-addons.html#dokuwiki__top "Haut de page [T]")

nagios/addons/nagios-business-process-addons.txt · Dernière
modification: 2013/03/29 09:39 (modification externe)

[![CC Attribution-Noncommercial-Share Alike 3.0
Unported](../../lib/images/license/button/cc-by-nc-sa.png)](http://creativecommons.org/licenses/by-nc-sa/3.0/)

[![www.chimeric.de](../../lib/tpl/arctic/images/button-chimeric-de.png)](http://www.chimeric.de "www.chimeric.de")
[![Valid
CSS](../../lib/tpl/arctic/images/button-css.png)](http://jigsaw.w3.org/css-validator/check/referer "Valid CSS")
[![Driven by
DokuWiki](../../lib/tpl/arctic/images/button-dw.png)](http://wiki.splitbrain.org/wiki:dokuwiki "Driven by DokuWiki")
[![do yourself a favour and use a real browser - get
firefox!!](../../lib/tpl/arctic/images/button-firefox.png)](http://www.firefox-browser.de "do yourself a favour and use a real browser - get firefox")
[![Recent changes RSS
feed](../../lib/tpl/arctic/images/button-rss.png)](../../feed.php "Recent changes RSS feed")
[![Valid XHTML
1.0](../../lib/tpl/arctic/images/button-xhtml.png)](http://validator.w3.org/check/referer "Valid XHTML 1.0")

![](../../lib/exe/indexer.php@id=nagios%253Aaddons%253Anagios-business-process-addons&1424859577)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
