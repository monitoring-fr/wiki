---
layout: page
title: check\_apt
---

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