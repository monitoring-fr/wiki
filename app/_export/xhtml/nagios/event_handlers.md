---
layout: page
---

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

~~~~ {.code}
global_host_event_handler=submit_incident
global_service_event_handler=submit_incident
~~~~

Ensuite, il faut activer le paramètre xxx dans le fichier de définition
d’hôte ou de service

~~~~ {.code}
event_handler_enabled           1
~~~~

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
[blosxom4nagios](../../../integration/blosxom4nagios.html "integration:blosxom4nagios")
et
[Wordpress4nagios](../../../integration/wordpress.html "integration:wordpress").

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

~~~~ {.code}
# 'submit_incident' command definition
define command{
        command_name    submit_incident
        command_line    $USER1$/event-test "$SERVICESTATE$" "$SERVICESTATETYPE$" "$SERVICEATTEMPT$" "$SERVICEDESC$" "$HOSTNAME$" "$SERVICEOUTPUT$"\
                        "$LONGSERVICEOUTPUT$" "$SERVICECHECKCOMMAND$"
        }
~~~~

Le contenu de submit\_incident

~~~~ {.code .bash}
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
~~~~
