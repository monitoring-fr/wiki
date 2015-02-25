---
layout: page
---

[[[check\_webpage.rb](check_webpage.rb@do=backlink.html)]]

[wiki monitoring-fr.org](../../start.html "[ALT+H]")

![Logo Monitoring](../../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../../start.html "start") »
[Nagios](../start.html "nagios:start") » [Nagios
Plugins](start.html "nagios:plugins:start") »
[check\_webpage.rb](check_webpage.rb.html "nagios:plugins:check_webpage.rb")

### Table des matières {.toggle}

-   [check\_webpage.rb](check_webpage.rb.html#check_webpagerb)
    -   [Fonctionalités](check_webpage.rb.html#fonctionalites)
    -   [Dépendances](check_webpage.rb.html#dependances)
    -   [Installation](check_webpage.rb.html#installation)

check\_webpage.rb {#check_webpagerb .sectionedit1}
=================

Le but de ce plugin nagios est de télécharger une page web avec tout ses
liens ( interne ).

Un processus fils est créé par ressource et toutes sont téléchargées en
parallèle.

-   Site:
    [nagios-check-webpage](http://code.google.com/p/nagios-check-webpage/ "http://code.google.com/p/nagios-check-webpage/")
-   Documentation:
    [DocumentationFr](http://code.google.com/p/nagios-check-webpage/wiki/DocumentationFr "http://code.google.com/p/nagios-check-webpage/wiki/DocumentationFr")

Fonctionalités {#fonctionalites .sectionedit2}
--------------

-   Petit script Ruby, facile à comprendre et modifier
-   http/https
-   Utilisation de la lib hpricot pour parser le html
-   Multi-threads
-   Recherche de mot clef
-   Suit les redirections

Dépendances {#dependances .sectionedit3}
-----------

-   Testé avec Ruby

o 1.8.6

~~~
        o 1.9.1p378 
  * hpricot
  * optiflag 
~~~

Installation {#installation .sectionedit4}
------------

1.  Installer les dépendances sus-cités (par ex. sous linux avec le
    système de package de votre distribution).
2.  Télécharger la dernière version:
    [http://code.google.com/p/nagios-check-webpage/downloads/list](http://code.google.com/p/nagios-check-webpage/downloads/list "http://code.google.com/p/nagios-check-webpage/downloads/list")
3.  Copier le fichier ‘check\_webpage.rb’ dans le dossier où se trouve
    les autres plugins.
4.  Ajouter le plugin à votre conf nagios:

~~~
define command{
  command_name  check-webpage
  command_line  $USER1$/check_webpage.rb -u $ARG1$
}
~~~

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

Nagios Plugins {#nagios-plugins .sectionedit1}
--------------

-   [Best of plugins compatibles
    Nagios](bestof.html "nagios:plugins:bestof")
-   [Cucumber
    Nagios](cucumber-nagios.html "nagios:plugins:cucumber-nagios")
-   [Supervision de type End User Experience avec Cucumber &
    Watir](cucumber-nagios-watir.html "nagios:plugins:cucumber-nagios-watir")
-   [check\_apt](check_apt.html "nagios:plugins:check_apt")
-   [check\_by\_ssh](check_by_ssh.html "nagios:plugins:check_by_ssh")
-   [check\_citrix\_lic](check_citrix_lic.html "nagios:plugins:check_citrix_lic")
-   [check\_dnsbl](check_dnsbl.html "nagios:plugins:check_dnsbl")
-   [check\_esx3](check_esx3.html "nagios:plugins:check_esx3")
-   [check\_esx3\_dp](check_esx3_dp.html "nagios:plugins:check_esx3_dp")
-   [check\_hpasm](check_hpasm.html "nagios:plugins:check_hpasm")
-   [check\_http](check_http.html "nagios:plugins:check_http")
-   [check\_jmx](check_jmx.html "nagios:plugins:check_jmx")
-   [check\_multi](check_multi.html "nagios:plugins:check_multi")
-   [check\_prelude](check_prelude.html "nagios:plugins:check_prelude")
-   [check\_procs](check_procs.html "nagios:plugins:check_procs")
-   [check\_procs2](check_procs2.html "nagios:plugins:check_procs2")
-   [check\_rrd](../../plugins/check_rrd.html "nagios:plugins:check_rrd")
-   [check\_webpage.rb](check_webpage.rb.html "nagios:plugins:check_webpage.rb")

-   [Afficher le texte
    source](check_webpage.rb@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](check_webpage.rb@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](check_webpage.rb@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](check_webpage.rb@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](check_webpage.rb@do=media.html "Gestionnaire de médias")
-   [Index](check_webpage.rb@do=index.html "Index [X]")
-   [Connexion](check_webpage.rb@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de
    page](check_webpage.rb.html#dokuwiki__top "Haut de page [T]")

nagios/plugins/check\_webpage.rb.txt · Dernière modification: 2013/03/29
09:39 (modification externe)

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

![](../../lib/exe/indexer.php@id=nagios%253Aplugins%253Acheck_webpage.rb&1424859574)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
