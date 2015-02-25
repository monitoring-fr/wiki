---
layout: page
---

[[[Event Handlers](event_handlers@do=backlink.html)]]

[wiki monitoring-fr.org](../start.html "[ALT+H]")

![Logo Monitoring](../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../start.html "start") »
[Nagios](start.html "nagios:start") » [Event
Handlers](event_handlers.html "nagios:event_handlers")

### Table des matières {.toggle}

-   [Event Handlers](event_handlers.html#event-handlers)
    -   [Création d'incidents dans
        DokuWiki](event_handlers.html#creation-d-incidents-dans-dokuwiki)
        -   [Configuration de
            Nagios](event_handlers.html#configuration-de-nagios)

Event Handlers {#event-handlers .sectionedit1}
==============

Ateliers de travail autour des possibilités des Event Handlers de Nagios

Pour tous ces ateliers, une commande au niveau des paramètres
global\_host\_event\_handler et global\_host\_event\_handler doivent
être activés dans nagios.cfg si l’on souhaite avoir les
global\_event\_handlers, ces actions exécutées systématiquement pour
tout changement d’états sur les hôtes et les services.

~~~
global_host_event_handler=submit_incident
global_service_event_handler=submit_incident
~~~

Ensuite, il faut activer le paramètre xxx dans le fichier de définition
d’hôte ou de service

~~~
event_handler_enabled           1
~~~

Ces Event Handlers sont déclenchés pour un hôte ou service dans les cas
suivants :

-   Au passage en problème état SOFT
-   Au passage en état HARD
-   A la sortie d’un état SOFT ou HARD

Création d'incidents dans DokuWiki {#creation-d-incidents-dans-dokuwiki .sectionedit2}
----------------------------------

L’idée est de créer un historique de tous les incidents hard et soft à
l’extérieur de Nagios. Cette idée a été mise en œuvre dans un esprit
assez similaire avec
[blosxom4nagios](../integration/blosxom4nagios.html "integration:blosxom4nagios")
et
[Wordpress4nagios](../integration/wordpress.html "integration:wordpress").

Histoire d’avoir une page par service dans le wiki qui pointe vers les
pages incidents organisées par an/mois/jour soit une page par jour par
service par hôte (si incident).

Au premier incident de la journée, une page sera crée si et une ligne de
tableau sera ajoutée à chaque incident suivant nous donnant le tableau
suivant :

##### Incidents du 03/03/2008

  Heure      Status     State   \# Attempts   Information                                     Check Command
  ---------- ---------- ------- ------------- ----------------------------------------------- ------------------------
  16:07:41   CRITICAL   SOFT    3             PROCS CRITICAL: 0 processes with args bin/sec   check\_nrpe!check\_sec
  16:08:41   CRITICAL   SOFT    4             PROCS CRITICAL: 0 processes with args bin/sec   check\_nrpe!check\_sec
  16:09:41   OK         SOFT    5             PROCS OK: 1 process with args bin/sec           check\_nrpe!check\_sec

### Configuration de Nagios {#configuration-de-nagios .sectionedit4}

Comme d’habitude, il convient de créer une nouvelle commande qui pointe
sur un script valide et exécutable par l’utilisateur Nagios

~~~
# 'submit_incident' command definition
define command{
        command_name    submit_incident
        command_line    $USER1$/event-test "$SERVICESTATE$" "$SERVICESTATETYPE$" "$SERVICEATTEMPT$" "$SERVICEDESC$" "$HOSTNAME$" "$SERVICEOUTPUT$"\
                        "$LONGSERVICEOUTPUT$" "$SERVICECHECKCOMMAND$"
        }
~~~

Le contenu de submit\_incident

~~~ {.code .bash}
#!/bin/bash
 
SERVICESTATE=$1
SERVICESTATETYPE=$2
SERVICEATTEMPT=$3
SERVICEDESC=$(echo $4 | tr [:upper:] [:lower:])
HOSTNAME=$(echo $5 | tr [:upper:] [:lower:])
SERVICEOUTPUT=$6
LONGSERVICEOUTPUT=$7
SERVICECHECKCOMMAND=$8
 
YEAR=`date +%Y` # the current year
MONTH=`date +%m` # the current numeric month
DAY=`date +%d` # the current day
HOUR=`date +%H` # the current hour
MINUTE=`date +%M` # the current minute
SECOND=`date +%S` # the current second
 
WIKI_ROOT=/usr/local/dokuwiki/data/pages
 
if [ ! -d $WIKI_ROOT/$HOSTNAME/$SERVICEDESC/$YEAR/$MONTH/ ]
then
        mkdir -p $WIKI_ROOT/$HOSTNAME/$SERVICEDESC/$YEAR/$MONTH/
fi
 
if [ ! -f $WIKI_ROOT/$HOSTNAME/$SERVICEDESC/$YEAR/$MONTH/$DAY.txt ]
then
        echo "====== Incidents du $DAY/$MONTH/$YEAR ======" >> $WIKI_ROOT/$HOSTNAME/$SERVICEDESC/$YEAR/$MONTH/$DAY.txt
        echo "^ Heure      ^ Status       ^ State       ^ # Attempts       ^ Information       ^ Check Command          ^" >> $WIKI_ROOT/$HOSTNAME/$SERVICEDESC/$YEAR/$MONTH/$DAY.txt
fi
 
echo "| $HOUR:$MINUTE:$SECOND | $SERVICESTATE | $SERVICESTATETYPE | $SERVICEATTEMPT | $SERVICEOUTPUT $LONGSERVICEOUTPUT | $SERVICECHECKCOMMAND |" >> $WIKI_ROOT/$HOSTNAME/$SERVICEDESC/$YEAR/$MONTH/$DAY.txt
 
exit 0
~~~

SOMMAIRE {#sommaire .sectionedit1}
--------

**[Accueil](../start.html "start")**

**[Supervision](../supervision/start.html "supervision:start")**

-   [Nagios](start.html "nagios:start")
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

Nagios {#nagios .sectionedit1}
------

-   [Arborescence des
    fichiers](installation-layout.html "nagios:installation-layout")
-   [Commandes de remontée de
    contrôle](ocsp-ochp.html "nagios:ocsp-ochp")
-   [Données Nagios dans un ramdisk](ramdisk.html "nagios:ramdisk")
-   [Event Handlers](event_handlers.html "nagios:event_handlers")
-   [Gabarits d'objets de
    configuration](templates.html "nagios:templates")
-   [Installation Nagios 2 & 3 sur Ubuntu 6.0.6, 8.0.4 et 10.0.4
    LTS](ubuntu-install.html "nagios:ubuntu-install")
-   [Installation Nagios 3 sur Debian Squeeze
    6.0.3](debian-install.html "nagios:debian-install")
-   [Installation de Nagios 3.x sur CentOS
    5.3](nagios-centos-install.html "nagios:nagios-centos-install")
-   [Introduction aux objets de
    configuration](configobjects.html "nagios:configobjects")
-   [Introduction à
    Nagios](nagios-introduction.html "nagios:nagios-introduction")
-   [Liens Nagios](links.html "nagios:links")
-   [Mise en place complète de Nagios sur RHEL
    5.4](mise-en-place-complete-nagios-sur-rhel-5.4/start.html "nagios:mise-en-place-complete-nagios-sur-rhel-5.4:start")
-   [NAGIOS - Guide de démarrage pour
    débutant](nagios-debutant/start.html "nagios:nagios-debutant:start")
-   [Nagios Addons](addons/start.html "nagios:addons:start")
-   [Nagios
    Integration](integration/start.html "nagios:integration:start")
-   [Nagios Plugins](plugins/start.html "nagios:plugins:start")
-   [Nagios et les
    notifications](notifications.html "nagios:notifications")
-   [Outils de supervision d'un hôte
    Windows](windows-client.html "nagios:windows-client")
-   [Référence des objets de
    configuration](objects-reference.html "nagios:objects-reference")
-   [Superviser un hôte Windows avec
    NSClient++](nagios-nsclient-host.html "nagios:nagios-nsclient-host")
-   [Supervision Windows en mode
    passif](supervision-windows-passif.html "nagios:supervision-windows-passif")
-   [Supervision vmware esx](vmware_esx.html "nagios:vmware_esx")
-   [check-list de diagnostic](debug.html "nagios:debug")

-   [Afficher le texte
    source](event_handlers@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](event_handlers@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](event_handlers@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](event_handlers@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](event_handlers@do=media.html "Gestionnaire de médias")
-   [Index](event_handlers@do=index.html "Index [X]")
-   [Connexion](event_handlers@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de page](event_handlers.html#dokuwiki__top "Haut de page [T]")

nagios/event\_handlers.txt · Dernière modification: 2013/03/29 09:39
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

![](../lib/exe/indexer.php@id=nagios%253Aevent_handlers&1424859525)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
