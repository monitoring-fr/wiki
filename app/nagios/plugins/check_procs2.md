---
layout: page
---

[[[check\_procs2](check_procs2@do=backlink.html)]]

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
[check\_procs2](check_procs2.html "nagios:plugins:check_procs2")

### Table des matières {.toggle}

-   [check\_procs2](check_procs2.html#check_procs2)
    -   [Présentation et
        Utilisation](check_procs2.html#presentation-et-utilisation)
    -   [Layout type](check_procs2.html#layout-type)
    -   [Modification du
        plugin](check_procs2.html#modification-du-plugin)

check\_procs2 {#check_procs2 .sectionedit1}
=============

check\_procs2 est un plugin Solaris.

Présentation et Utilisation {#presentation-et-utilisation .sectionedit2}
---------------------------

Quel peut être l’intéret d’un
[check\_procs2](http://www.nagiosexchange.org/cgi-bin/jump.cgi?ID=2100;d=1 "http://www.nagiosexchange.org/cgi-bin/jump.cgi?ID=2100;d=1")
si l’on a un check\_procs basique et disponible dans les plugins Nagios.
L’avantage est simple et évident, il peut interroger plusieurs processus
en même temps. Son fonctionnement est tout aussi simple puisqu’il suffit
de connaitre le principe modale des opérandes classiques et de les
disposer convenablement.

Ces opérandes sont:

-   ge pour Ggreater or equal ( \> = )
-   gt pour greater than ( \> )
-   le pour less or equal ( \< = )
-   lt pour less than ( \< )
-   eq pour equal ( = )

Ensuite il ne vous reste plus qu’à utiliser convenablement le plugin:

~~~
check_procs2 telnet ge 3
~~~

Layout type {#layout-type .sectionedit3}
-----------

Les layout types se définissent suivant deux modèles :

~~~
PROCS CRITICAL: 149 processes - telnet: 2/3
~~~

Dans un premier temps vous avez l’état de votre supervision. Puis vous
pouvez voir le décompte global des processus en cours de fonctionnement
sur le serveur. Pour finir, vous obtenez plus d’information sur la
supervision que vous venez d’effectuer. Ici telnet devait posséder au
moins trois instances (selon commande vu en haut), alors que seul deux
sont en cours sur le serveur.

Le deuxième type de layout est le suivant:

~~~
PROCS OK: 149 processes - no problems found
~~~

Pour cet exemple nous avons demandé si il y avait au moins 2 instances
du processus telnet. La condition étant validée, le plugin nous retourne
“no problem found” en guise d’explication.

NB: Dans le cas ou vous supervisiez plusieurs processus dans une seule
commande check\_procs. Un détail des différents processus vous est donné
dans le layout. L’état de la supervision est lui guidé par le premier
processus qui ne respecte pas la condition exigée.

Modification du plugin {#modification-du-plugin .sectionedit4}
----------------------

Nous l’avons vu, ce plugins fonctionne très bien et répond à un besoin
concret. Toutefois il ne se plie pas forcément aux dernières
technologies. A l’heure actuelle, Solaris à fortement initié un projet
de virtualisations de poste de travail dans sa version 10 de Solaris.
(SunOS 5.10). Le principe de virtualisation est qu’il existe une zone
globale qui contient des zones container (pardon pour l’explication plus
que sommaire). Ce qu’il faut retenir c’est que si vous exécutez
check\_procs2 dans votre zone globale, votre résultat sera corrompu par
les processus qui tournent dans vos zones container, et il vous sera
donc difficile d’adapter votre supervision. Nous allons donc modifier le
plugin check\_procs2 à cet effet: Fait moi un beau petit vi de votre
check\_procs2 et rendez-vous à la ligne demandée. Avant:

~~~
open PS, "/usr/bin/ps -e -o comm |";
~~~

Après:

~~~
open PS, "/usr/bin/ps -fz global -o comm |";
~~~

Vous pourrez dès lors ne voir que les processus de votre zone globale
sans vous souciez des autres (qui devraient naturellement être
superviser en tant qu’OS à part entière)

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
    source](check_procs2@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](check_procs2@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](check_procs2@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](check_procs2@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](check_procs2@do=media.html "Gestionnaire de médias")
-   [Index](check_procs2@do=index.html "Index [X]")
-   [Connexion](check_procs2@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de page](check_procs2.html#dokuwiki__top "Haut de page [T]")

nagios/plugins/check\_procs2.txt · Dernière modification: 2013/03/29
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

![](../../lib/exe/indexer.php@id=nagios%253Aplugins%253Acheck_procs2&1424859574)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
