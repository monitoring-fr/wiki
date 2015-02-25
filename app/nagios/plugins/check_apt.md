---
layout: page
---

[[[check\_apt](check_apt@do=backlink.html)]]

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
[check\_apt](check_apt.html "nagios:plugins:check_apt")

### Table des matières {.toggle}

-   [check\_apt](check_apt.html#check_apt)
    -   [Exemples check\_apt](check_apt.html#exemples-check_apt)
        -   [Utilisation simple](check_apt.html#utilisation-simple)
    -   [Intégration check\_apt dans
        Nagios](check_apt.html#integration-check_apt-dans-nagios)
    -   [Aide check\_apt](check_apt.html#aide-check_apt)

check\_apt {#check_apt .sectionedit1}
==========

check\_apt fait partie des plugins officiels distribués sur
nagiosplugins.org.

Cette une commande qui permet de savoir si des mises à jour sont
disponibles pour toutes versions de Linux basée sur Debian et utilisant
donc apt.

Exemples check\_apt {#exemples-check_apt .sectionedit2}
-------------------

Des exemples d’utilisation de la commande check\_apt.

### Utilisation simple {#utilisation-simple .sectionedit3}

En appelant check\_apt sans argument, le plugin se contente de vérifier
si il y a des mises à jour en attente. La commande apt-get update n’est
pas exécuter au préalable, ce qui suppose que cela soit fait par une
tâche planifiée avant l’exécution de check\_apt.

~~~
./check_apt 
APT OK: 0 packages available for upgrade (0 critical updates).
~~~

Pour contourner cette limitation, il est possible d’appeler la commande
check\_apt avec l’argument -u qui effectue au préalable un apt-get
update. Encore faut il que l’utilisateur nagios puisse lancer la
commande ce qui n’est pas le cas par défaut, apt-get update nécessitant
des droits root. A compléter
![FIXME](../../lib/images/smileys/fixme.gif)

Intégration check\_apt dans Nagios {#integration-check_apt-dans-nagios .sectionedit4}
----------------------------------

~~~
# 'check_apt' command definition
define command{
        command_name    check_apt
        command_line    $USER1$/check_apt
        }
~~~

La définition de la commande dans le service l’utilisant est dans ce cas

~~~
        check_command                   check_apt!
~~~

Aide check\_apt {#aide-check_apt .sectionedit5}
---------------

~~~
Usage:check_apt [[-d|-u|-U]opts] [-n] [-t timeout]

Options:
 -h, --help
    Print detailed help screen
 -V, --version
    Print version information
 -t, --timeout=INTEGER
    Seconds before connection times out (default: 10)
 -U, --upgrade=OPTS
    [Default] Perform an upgrade.  If an optional OPTS argument is provided,
    apt-get will be run with these command line options instead of the
    default (-o 'Debug::NoLocking=true' -s -qq).
    Note that you may be required to have root privileges if you do not use
    the default options.
 -d, --dist-upgrade=OPTS
    Perform a dist-upgrade instead of normal upgrade. Like with -U OPTS
    can be provided to override the default options.
  -n, --no-upgrade
    Do not run the upgrade.  Probably not useful (without -u at least).
 -i, --include=REGEXP
    Include only packages matching REGEXP.  Can be specified multiple times
    the values will be combined together.  Any patches matching this list
    cause the plugin to return WARNING status.  Others will be ignored.
    Default is to include all packages.
 -e, --exclude=REGEXP
    Exclude packages matching REGEXP from the list of packages that would
    otherwise be included.  Can be specified multiple times; the values
    will be combined together.  Default is to exclude no packages.
 -c, --critical=REGEXP
    If the full package information of any of the upgradable packages match
    this REGEXP, the plugin will return CRITICAL status.  Can be specified
    multiple times like above.  Default is a regexp matching security
    upgrades for Debian and Ubuntu:
        ^[^\(]*\([^ ]* (Debian-Security:|Ubuntu:[^/]*/[^-]*-security)
    Note that the package must first match the include list before its
    information is compared against the critical list.


The following options require root privileges and should be used with care:

 -u, --update=OPTS
    First perform an 'apt-get update'.  An optional OPTS parameter overrides
    the default options.  Note: you may also need to adjust the global
    timeout (with -t) to prevent the plugin from timing out if apt-get
    upgrade is expected to take longer than the default timeout.
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
    source](check_apt@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](check_apt@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](check_apt@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](check_apt@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](check_apt@do=media.html "Gestionnaire de médias")
-   [Index](check_apt@do=index.html "Index [X]")
-   [Connexion](check_apt@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de page](check_apt.html#dokuwiki__top "Haut de page [T]")

nagios/plugins/check\_apt.txt · Dernière modification: 2013/03/29 09:39
(modification externe)

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

![](../../lib/exe/indexer.php@id=nagios%253Aplugins%253Acheck_apt&1424859575)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
