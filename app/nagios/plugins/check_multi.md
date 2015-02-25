---
layout: page
---

[[[check\_multi](check_multi@do=backlink.html)]]

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
[check\_multi](check_multi.html "nagios:plugins:check_multi")

### Table des matières {.toggle}

-   [check\_multi](check_multi.html#check_multi)
    -   [Présentation](check_multi.html#presentation)
    -   [Scénario typique](check_multi.html#scenario-typique)
    -   [Comment le plugin check\_multi peut nous permettre de remonter
        cela dans nagios
        ?](check_multi.html#comment-le-plugin-check_multi-peut-nous-permettre-de-remonter-cela-dans-nagios)
    -   [Utilisation de check\_multi dans le cadre de ce
        scénario](check_multi.html#utilisation-de-check_multi-dans-le-cadre-de-ce-scenario)
    -   [Allez un peu plus loin avec
        check\_multi](check_multi.html#allez-un-peu-plus-loin-avec-check_multi)

check\_multi {#check_multi .sectionedit1}
============

En cours de rédaction

Présentation {#presentation .sectionedit2}
------------

check\_multi est un agrégateur de check qui tirent parti des
possibilités de Nagios 3.x d’afficher de multiples lignes de résultat.
Il exécute de multiple plugins enfants et affiche leur résultats. Un
résumé est affiché sur la sortie standard.

L’intérêt de ce plugin est de pouvoir exécuter plusieurs plugins de
check en une passe et d’agréger les résultats de manière logique.

check\_multi peut être téléchargé à cette adresse :
[http://my-plugin.de/wiki/projects/check\_multi/download](http://my-plugin.de/wiki/projects/check_multi/download "http://my-plugin.de/wiki/projects/check_multi/download")

L’excellente documentation est disponible au format wiki (en anglais) :
[http://my-plugin.de/wiki/projects/check\_multi/start](http://my-plugin.de/wiki/projects/check_multi/start "http://my-plugin.de/wiki/projects/check_multi/start")

Scénario typique {#scenario-typique .sectionedit3}
----------------

On veut vérifier l’état de santé d’une application 3 tiers constituée de
1 nœud de présentation, 1 nœud serveurs d’application et 1 nœud serveur
de base de donnée, on devra vérifier que les serveurs de présentation,
d’application et de base de donnée sont présent sur le réseau, que le
serveurs web apache du serveur de présentation fonctionne, que le
serveur tomcat du serveur d’application fonctionne et que la base de
donnée oracle du serveur de base de donnée fonctionne également. Le fait
que l’ensemble de ces pré-requis soit remplis constitue l’état de santé
de l’application 3 tiers.

La perte du serveur de présentation ou du serveur d’application ou du
serveur de base de donnée ainsi que au moins un des services (apache,
tomcat ou oracle) constitue un état critique (CRITICAL). La
disponibilité de l’ensemble des serveurs et services associés constitue
l’état normal de fonctionnement (OK).

Nous venons donc de décrire un comportement logique (et non plus
technique) de l’état de santé de notre application 3 tiers.

Comment le plugin check\_multi peut nous permettre de remonter cela dans nagios ? {#comment-le-plugin-check_multi-peut-nous-permettre-de-remonter-cela-dans-nagios .sectionedit4}
---------------------------------------------------------------------------------

Nous avons besoins d’exécuter différents check à la suite et d’effectuer
des évaluations logiques (ET OU …) des résultats de ces checks.

Les checks sont les suivants :

-   A - présence du serveur de présentation
-   B - présence du serveur d’application
-   C - présence du serveur de base de donnée
-   D - fonctionnement de apache
-   E - fonctionnement de tomcat
-   F - fonctionnement de oracle

Les évaluations logiques sont les suivantes :

-   Application 3 tiers OK : A=OK et B=OK et C=OK et D=OK et E=OK et
    F=OK
-   Application 3 tiers CRITIQUE : A=CRITIQUE ou B=CRITIQUE ou
    C=CRITIQUE ou D=CRITIQUE ou E=CRITIQUE ou F=CRITIQUE

Utilisation de check\_multi dans le cadre de ce scénario {#utilisation-de-check_multi-dans-le-cadre-de-ce-scenario .sectionedit5}
--------------------------------------------------------

Check\_multi se base sur un fichier de configuration permettant de
spécifier les commandes et les évaluations d’état à retourner (OK,
WARNING,CRITIQUE). La syntaxe est très simple :

-   on définit une commande par : command [ Nomdelacommande ] = ligne de
    commande à exécuter
-   on définit une évaluation logique de l’état par state : [
    OK|WARNING|UNKNOWN|CRITICAL ] = ( Nomdelacommande ==
    OK|WARNING|UNKNOWN|CRITICAL && Nomdelacommande ==
    OK|WARNING|UNKNOWN|CRITICAL )

dans notre cas cela donnerait (fichier de configuration
check\_application.cmd):

~~~~ {.code}
command [ serveurpresentation ] = check_ping -H 192.168.1.2 -w 3000.0,80% -c 5000.0,100% -p 5
command [ serveurapplication ] = check_ping -H 192.168.1.3 -w 3000.0,80% -c 5000.0,100% -p 5
command [ serveurbdd ] = check_ping -H 192.168.1.4 -w 3000.0,80% -c 5000.0,100% -p 5

command [ apache ] = check_apache -H 192.168.1.2
command [ tomcat ] = check_tomcat -H 192.168.1.3 -p 8080
command [ oracle ] = check_oracle -H 192.168.1.4 -b mabase -u toto -p titi

state [ OK ] = serveurpresentation == OK && serveurapplication == OK && serveurbdd == OK && apache == OK && tomcat == OK && oracle == OK
state [ CRITICAL ] = serveurpresentation == CRITICAL || serveurapplication == CRITICAL || serveurbdd == CRITICAL || apache == CRITICAL || tomcat == CRITICAL || oracle == CRITICAL
~~~~

la commande permettant d’exécuter notre scénario serais ensuite :

~~~~ {.code}
check_multi -f check_application.cmd
~~~~

L’intégration de nagios se fera ensuite grâce à la création d’une
commande et du service associé :

~~~~ {.code}
define command {
  command_name   check_application
  command_line   $USER1$/check_multi -f $USER1$/check_application.cmd
}
~~~~

Allez un peu plus loin avec check\_multi {#allez-un-peu-plus-loin-avec-check_multi .sectionedit6}
----------------------------------------

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
    source](check_multi@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](check_multi@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](check_multi@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](check_multi@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](check_multi@do=media.html "Gestionnaire de médias")
-   [Index](check_multi@do=index.html "Index [X]")
-   [Connexion](check_multi@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de page](check_multi.html#dokuwiki__top "Haut de page [T]")

nagios/plugins/check\_multi.txt · Dernière modification: 2013/03/29
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

![](../../lib/exe/indexer.php@id=nagios%253Aplugins%253Acheck_multi&1424859574)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
