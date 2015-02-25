---
layout: page
---

[[[Diverses solutions de supervision](start@do=backlink.html)]]

[wiki monitoring-fr.org](../start.html "[ALT+H]")

![Logo Monitoring](../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../start.html "start") » [Diverses solutions de
supervision](start.html "various:start")

### Table des matières {.toggle}

-   [Diverses solutions de
    supervision](start.html#diverses-solutions-de-supervision)
    -   [Ganglia](start.html#ganglia)
        -   [Présentation](start.html#presentation)
        -   [Documentation](start.html#documentation)
    -   [Hyperic](start.html#hyperic)
        -   [Présentation](start.html#presentation1)
        -   [Documentation](start.html#documentation1)

Diverses solutions de supervision {#diverses-solutions-de-supervision .sectionedit1}
=================================

Dans ce dossier, figure un ensemble de documentations et de tutoriels
sur la mise en place de différentes solutions de supervision.

Pour toutes questions, informations complémentaires, rendez-vous sur le
[forum](http://forums.monitoring-fr.org/ "http://forums.monitoring-fr.org/")
du site.

Ce dossier a été réalisé avec l’aide de :

  **Rôle**           **Nom**
  ------------------ ------------------
  **Créateur**       Ludovic VALENTIN
  **Contributeur**   Romuald FRONTEAU

Ganglia {#ganglia .sectionedit3}
-------

[![logo\_ganglia.jpg](../assets/media/supervision/logo_ganglia.jpg "logo_ganglia.jpg")](../_detail/supervision/logo_ganglia.jpg@id=various%253Astart.html "supervision:logo_ganglia.jpg")

### Présentation {#presentation .sectionedit4}

[Ganglia](http://ganglia.sourceforge.net/ "http://ganglia.sourceforge.net/")
est une interface de supervision pour les clusters de serveurs. Il peut
enregistré une multitude de données et les personnaliser comme vous les
avez définis. Il travaille de façon distribuée avec chaque machine
collectant ses statistiques grâce au démon de collecte **Gmond**. Chaque
données collectées par le démon sont extraites grâce à un metadata démon
du nom de **Gmetad** tournant soit sur chaque machine supervisé ou sur
une machine séparée.

Ganglia possède une interface Web en php affichant les données provenant
de gmetad en forme de jolis graphiques.

### Documentation {#documentation .sectionedit5}

**[Installation de Ganglia sur Ubuntu 8.0.4
LTS](ganglia-ubuntu-install.html "various:ganglia-ubuntu-install")**

Hyperic {#hyperic .sectionedit6}
-------

[![](../assets/media/supervision/logo_hyperic.jpg)](../_detail/supervision/logo_hyperic.jpg@id=various%253Astart.html "supervision:logo_hyperic.jpg")

### Présentation {#presentation1 .sectionedit7}

[Hyperic](http://www.hyperic.com "http://www.hyperic.com") est conçu
pour diriger des applications web et une infrastructure. La capacité
unique d’Hyperic est d’automatiquement découvrir et contrôler le
logiciel et les ressources de réseau, sans tenir compte du type de
machine ou de l’endroit. Ce qui vous donne une vue unifiée de la
performance et l’état de santé de votre IT.

La société Hyperic étant été racheté par la société SpringSource,
Hyperic complète l’éventail de produit de cette dernière.

Hyperic permet de monitorer une très grande variété de ressources :

-   OS
-   serveurs web et proxys
-   serveurs d’applications
-   bases de données
-   MOM
-   technologies Microsoft (AD, Exchange, .NET)
-   produits de virtualisation
-   ressources réseau
-   et bien d’autres comme Alfresco par exemple

### Documentation {#documentation1 .sectionedit8}

**[Installation de Hyperic HQ sur Ubuntu 8.0.4
LTS](hyperic-ubuntu-install.html "various:hyperic-ubuntu-install")**

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

**[Infrastructure](../infra/start.html "infra:start")**

**[Développement](../dev/start.html "dev:start")**

-   [Afficher le texte
    source](start@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](start@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](start@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](start@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](start@do=media.html "Gestionnaire de médias")
-   [Index](start@do=index.html "Index [X]")
-   [Connexion](start@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de page](start.html#dokuwiki__top "Haut de page [T]")

various/start.txt · Dernière modification: 2013/03/29 09:39
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

![](../lib/exe/indexer.php@id=various%253Astart&1424859847)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
