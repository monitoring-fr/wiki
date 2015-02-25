---
layout: page
---

[[[check\_rrd](../nagios/plugins/check_rrd@do=backlink.html)]]

[wiki monitoring-fr.org](../start.html "[ALT+H]")

![Logo Monitoring](../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../start.html "start") »
[Nagios](../nagios/start.html "nagios:start") » [Nagios
Plugins](../nagios/plugins/start.html "nagios:plugins:start") »
[check\_rrd](check_rrd.html "nagios:plugins:check_rrd")

### Table des matières {.toggle}

-   [check\_rrd](check_rrd.html#check_rrd)
    -   [rrdpoller](check_rrd.html#rrdpoller)
        -   [Installation](check_rrd.html#installation)
        -   [Configuration Nagios](check_rrd.html#configuration-nagios)
        -   [Le script](check_rrd.html#le-script)

check\_rrd {#check_rrd .sectionedit1}
==========

![:!:](../lib/images/smileys/icon_exclaim.gif) Il se trouve que
rrdpoller ne fonctionne pas avec une version récente de rrdtool. Il faut
réécrire une partie du plugin pour qu’il n’ait plus besoin de rrdpoller.
En l’occurence, rrdpoller fonctionne sur Dapper mais pas Ubuntu Hardy.

![:!:](../lib/images/smileys/icon_exclaim.gif) Pour faire fonctionner
rrdpoller sur “Ubuntu Hardy” il faut modifier une ligne dans le fichier
**Query.pm**, ligne 190 :

~~~
@@ -190,1 +190,1 @@
 -            $value = $data->[-1]->[$i];
 +            $value = $data->[-2]->[$i];
~~~

rrdpoller {#rrdpoller .sectionedit2}
---------

rrdpoller est un module cpan permettant d’interroger des bases RRD et de
fixer des seuils sur la réponse obtenue. C’est une voie interessante
pour interroger depuis Nagios des base RRD.

### Installation {#installation .sectionedit3}

~~~
wget http://search.cpan.org/~rsoliv/rrdpoller-1.5.0/
sudo apt-get install liberror-perl libsoap-lite-perl
perl Makefile.PL
make
make install
~~~

Une fois installé, plein de bonnes choses deviennent possibles en
interrogation de bases RRD

~~~
rrdpoller get /opt/collectd/var/lib/collectd/rrd/nagios3/apache/apache_scoreboard-open.rrd count
~~~

permet de récupérer la dernière valeur du DS count dans la base RRD
apache\_scoreboard-open.rrd

### Configuration Nagios {#configuration-nagios .sectionedit4}

Se basant sur rrdpoller et Nagios::plugin, j’ai écrit le script
check\_rrd.pl dont je mettrais le code source à dispo bientôt. En
attendant, voici la définition de commande et de service en résultant

~~~
define service{
        use                             actif-generic
        hostgroup_name                  LINUX
        service_description             HTTP_REQUESTS
        check_command                   check_rrd!apache/apache_requests.rrd!count!10!20
        #check_command                  check_rrd!-r /opt/collectd/var/lib/collectd/rrd/nagios3/apache/apache_requests.rrd -d count -w 10 -c 20
        servicegroups                   +RRD,HTTP
        }
~~~

La commande

~~~
# 'check_rrd' command definition
define command{
        command_name    check_rrd
        command_line    /usr/bin/perl $USER1$/check_rrd.pl -r $USER4$/$HOSTNAME$/$ARG1$ -d $ARG2$ -w $ARG3$ -c $ARG4$
#        command_line    /usr/bin/perl $USER1$/check_rrd.pl $ARG1
        }

# check_rrd.pl -r /opt/collectd/var/lib/collectd/rrd/nagios3/apache/apache_requests.rrd -d count -w 10 -c 20
~~~

Dans le fichier resource.cfg

~~~
$USER4$=/opt/collectd/var/lib/collectd/rrd
~~~

Exemple utilisation :

~~~ {.code .bash}
./check_rrd.pl -F /opt/collectd/var/lib/collectd/rrd/kubuntu-gutsy/hddtemp/temperature-hdb.rrd -D value -w 35 -u degrees
~~~

Avec le check\_rrd.pl classique

~~~ {.code .bash}
./check_rrd_pro.pl -F /opt/collectd/var/lib/collectd/rrd/kubuntu-gutsy/hddtemp/temperature-hdb.rrd  -w 35 -c 50 -a AVERAGE -v 1 -l temperature -u degrees                         
~~~

### Le script {#le-script .sectionedit5}

Le script version 1.2

~~~ {.code .perl}
#!/usr/bin/perl
 
###  check_rrd.pl
 
# a Nagios plugin for querying values in rrd databases using the Nagios::Plugin modules.
 
# Originally by Olivier Jan based on Nagios::Plugin example, ojan at expertise-online dot net
# February 27 2008
 
# Version 1.2 2008-04-01 : --label option added, cleanup and various bugs fix
# Version 1.1 2008-03-01 : --unit option added
 
 
# $Id: check_rrd 1539 2008-02-27 21:48:22Z ojan $
 
##############################################################################
# prologue
use strict;
use warnings;
 
use Nagios::Plugin ;
 
use vars qw($VERSION $PROGNAME  $verbose $warn $critical $timeout $rrd $dsname $result $unit $label);
'$Revision: 1539 $' =~ /^.*(\d+.\d+) \$$/;  # Use The Revision from RCS/CVS/Subversion
$VERSION = $1;
 
# get the base name of this script
use File::Basename;
$PROGNAME = basename($0);
 
 
##############################################################################
# define and get the command line options.
#   see the command line option guidelines at
#   http://nagiosplug.sourceforge.net/developer-guidelines.html#PLUGOPTIONS
 
 
# Instantiate Nagios::Plugin object (the 'usage' parameter is mandatory)
my $p = Nagios::Plugin->new(
    usage => "Usage: %s [ -v|--verbose ]  [-H <host>] [-t <timeout>]
    [ -F|--rrd = <rrd database file and path> ]
    [ -D|--dsname=<ds name in rrd> ]
    [ -c|--critical=<critical threshold> ]
    [ -w|--warning=<warning threshold> ]
    [ -u|--unit=<unit value> ]
    [ -l|--label=<label value> ]",
    version => $VERSION,
    blurb => 'This plugin queries values in rrd databases. It is written in Perl using the Nagios::Plugin modules.  It accepts path and name of the rrd database to query',
 
        extra => "
 
THRESHOLDs for -w and -c are specified 'min:max' or 'min:' or ':max'
(or 'max'). If specified '\@min:max', a warning status will be generated
if the count *is* inside the specified range.
 
See more threshold examples at http
  : // nagiosplug
  . sourceforge
  . net / developer-guidelines
  . html    #THRESHOLDFORMAT
 
  Examples:
 
  $PROGNAME -w 10 -c 18 Returns a warning
  if the resulting number is greater than 10,
  or a critical error
  if it is greater than 18.
 
  $PROGNAME -w 10 : -c 4 : Returns a warning
  if the resulting number is less than 10,
  or a critical error
  if it is less than 4.
 
  "
);
 
 
# Define and document the valid command line options
# usage, help, version, timeout and verbose are defined by default.
 
$p->add_arg(
        spec => 'warning|w=s',
        help =>
qq{-w, --warning=INTEGER:INTEGER
   Minimum and maximum number of allowable result, outside of which a
   warning will be generated.  If omitted, no warning is generated.},
 
#       required => 1,
#       default => 10,
);
 
$p->add_arg(
        spec => 'critical|c=s',
        help =>
qq{-c, --critical=INTEGER:INTEGER
   Minimum and maximum number of allowable result, outside of
   which a critical will be generated. If omitted, no critical is generated.},
);
 
$p->add_arg(
        spec => 'unit|u=s',
        help =>
qq{-u, --unit=STRING
   Optionally specifies a unit to append to the value queried.},
);
 
$p->add_arg(
        spec => 'label|l=s',
        help =>
qq{-l, --unit=STRING
   Optionally specifies a label to preppend to the value queried.},
);
 
$p->add_arg(
        spec => 'rrd|F=s',
        required => 1,
        help =>
qq{-F, --rrd=STRING
   Specify the path and name of the rrd base to query.},
);
 
$p->add_arg(
        spec => 'dsname|D=s',
        required => 1,
        help =>
qq{-D, --dsname=STRING
   Specify the ds name to check in the rrd database.},
);
 
# Parse arguments and process standard ones (e.g. usage, help, version)
$p->getopts;
 
 
# perform sanity checking on command line options
#if ( (defined $p->opts->warning) && ($p->opts->warning < 0 || $p->opts->warning > 20) )  {
#    $p->nagios_die( " invalid number supplied for the -r option " );
#}
 
unless ( defined $p->opts->rrd || defined $p->opts->dsname ) {
        $p->nagios_die( " you didn't supply the required arguments " );
}
 
 
 
##############################################################################
# check stuff.
 
# THIS is where you'd do your actual checking to get a real value for $result
#  don't forget to timeout after $p->opts->timeout seconds, if applicable.
my $result;
my $ds_name;
my $unit_chosen;
my $label_chosen;
my $rrd_file;
    $ds_name = $p->opts->dsname;
    $rrd_file = $p->opts->rrd;
    $unit_chosen = "";
    $label_chosen = "";
if ( (defined $p->opts->unit) )  {
    $unit_chosen = $p->opts->unit;
}
if ( (defined $p->opts->label) )  {
    $label_chosen = $p->opts->label;
}
 
    $result = `/usr/bin/rrdpoller get $rrd_file $ds_name`;
    print " using supplied $rrd_file and $ds_name from command line \n " if $p->opts->verbose;
 
##############################################################################
# check the result against the defined warning and critical thresholds,
# output the result and exit
chomp $result;
 
$p->nagios_exit(
         return_code => $p->check_threshold($result),
         message => "$label_chosen: $result $unit_chosen"
);
~~~

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

Nagios Plugins {#nagios-plugins .sectionedit1}
--------------

-   [Best of plugins compatibles
    Nagios](../nagios/plugins/bestof.html "nagios:plugins:bestof")
-   [Cucumber
    Nagios](../nagios/plugins/cucumber-nagios.html "nagios:plugins:cucumber-nagios")
-   [Supervision de type End User Experience avec Cucumber &
    Watir](../nagios/plugins/cucumber-nagios-watir.html "nagios:plugins:cucumber-nagios-watir")
-   [check\_apt](../nagios/plugins/check_apt.html "nagios:plugins:check_apt")
-   [check\_by\_ssh](../nagios/plugins/check_by_ssh.html "nagios:plugins:check_by_ssh")
-   [check\_citrix\_lic](../nagios/plugins/check_citrix_lic.html "nagios:plugins:check_citrix_lic")
-   [check\_dnsbl](../nagios/plugins/check_dnsbl.html "nagios:plugins:check_dnsbl")
-   [check\_esx3](../nagios/plugins/check_esx3.html "nagios:plugins:check_esx3")
-   [check\_esx3\_dp](../nagios/plugins/check_esx3_dp.html "nagios:plugins:check_esx3_dp")
-   [check\_hpasm](../nagios/plugins/check_hpasm.html "nagios:plugins:check_hpasm")
-   [check\_http](../nagios/plugins/check_http.html "nagios:plugins:check_http")
-   [check\_jmx](../nagios/plugins/check_jmx.html "nagios:plugins:check_jmx")
-   [check\_multi](../nagios/plugins/check_multi.html "nagios:plugins:check_multi")
-   [check\_prelude](../nagios/plugins/check_prelude.html "nagios:plugins:check_prelude")
-   [check\_procs](../nagios/plugins/check_procs.html "nagios:plugins:check_procs")
-   [check\_procs2](../nagios/plugins/check_procs2.html "nagios:plugins:check_procs2")
-   [check\_rrd](check_rrd.html "nagios:plugins:check_rrd")
-   [check\_webpage.rb](../nagios/plugins/check_webpage.rb.html "nagios:plugins:check_webpage.rb")

-   [Afficher le texte
    source](../nagios/plugins/check_rrd@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](../nagios/plugins/check_rrd@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](../nagios/plugins/check_rrd@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](../nagios/plugins/check_rrd@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](../nagios/plugins/check_rrd@do=media.html "Gestionnaire de médias")
-   [Index](../nagios/plugins/check_rrd@do=index.html "Index [X]")
-   [Connexion](../nagios/plugins/check_rrd@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de page](check_rrd.html#dokuwiki__top "Haut de page [T]")

nagios/plugins/check\_rrd.txt · Dernière modification: 2013/03/29 09:39
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

![](http://wiki.monitoring-fr.org/lib/exe/indexer.php?id=nagios%3Aplugins%3Acheck_rrd&1424859947)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
