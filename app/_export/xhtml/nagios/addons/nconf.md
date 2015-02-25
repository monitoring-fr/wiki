---
layout: page
---

### Table des matières {.toggle}

-   [NConf](nconf.html#nconf)
-   [Import des fichiers de
    configuration](nconf.html#import-des-fichiers-de-configuration)

NConf {#nconf .sectionedit1}
=====

NConf est une interface web d’administration des fichiers de
configuration de Nagios. En attendant qu’on se penche sur son cas en
détail ![;-)](../../../../lib/images/smileys/icon_wink.gif), vous pouvez
suivre le [tuto réalisé par
Nicolargo](http://blog.nicolargo.com/2009/06/nconf-une-interface-web-pour-nagios.html "http://blog.nicolargo.com/2009/06/nconf-une-interface-web-pour-nagios.html")
pour l’installation.

Import des fichiers de configuration {#import-des-fichiers-de-configuration .sectionedit2}
====================================

Dans cette partie, nous ne traiterons que l’import des fichiers de conf(
.cfg). Le tutorial de Nicolargo est très bien écrit, il ne manque que la
partie import. Lors de l’installation de celui-ci, il n’est pas possible
de synchroniser la configuration nagios avec l’interface graphique
Nconf.

-   ***1. Pré-requis*** : Nagios 3.2.0, Debian lenny. ainsi que les
    fichiers suivants :

-   *checkcommand.cfg* : fichier contenant seulement les commandes
-   *contactgroup.cfg* : fichier contenant les ContactGroups
-   *contacts.cfg* : fichier contenant les contacts
-   *hostgroup.cfg* : fichier contenant les “hostgroup”
-   *host\_template.cfg* : fichier contenant les modèles des hosts
    (windows-server, linux-server…)
-   *misccommand.cfg* : les commandes qui permettent d’envoyer des
    alertes (sms ou mails)
-   *service\_template.cfg* : fichier contenant les modèles des services

voici un exemple des fichiers de conf :

-   *checkcommand.cfg* :

~~~~ {.code}
define command{
        command_name    check-host-alive-ping
        command_line    $USER1$/check_ping -H $HOSTADDRESS$ -w 3000.0,80% -c 5000.0,100% -p 1
        }
define command{
        command_name    check_ssh
        command_line    $USER1$/check_ssh -p $ARG1$ $HOSTADDRESS$
        }
define command{
        command_name    check_dhcp
        command_line    $USER1$/check_dhcp $ARG1$
        }        
~~~~

-   *contactgroup.cfg* :

~~~~ {.code}
define contactgroup{
        contactgroup_name       admins
        alias                   Nagios Administrators
        members                 nagiosadmin
        }
~~~~

-   *contacts.cfg* :

~~~~ {.code}
define contact{
        service_notification_period     24x7
        host_notification_period        24x7
        service_notification_options    w,u,c,r,f,s
        host_notification_options       d,u,r,f,s
        service_notification_commands   notify-service-by-email
        host_notification_commands      notify-host-by-email
        
    contact_name                    nagiosadmin
        alias                           Nagios Admin
        email                           [email protected]
/*  */!function(){try{var t="currentScript"in document?document.currentScript:function(){for(var t=document.getElementsByTagName("script"),e=t.length;e--;)if(t[e].getAttribute("cf-hash"))return t[e]}();if(t&&t.previousSibling){var e,r,n,i,c=t.previousSibling,a=c.getAttribute("data-cfemail");if(a){for(e="",r=parseInt(a.substr(0,2),16),n=2;a.length-n;n+=2)i=parseInt(a.substr(n,2),16)^r,e+=String.fromCharCode(i);e=document.createTextNode(e),c.parentNode.replaceChild(e,c)}}}catch(u){}}();/*  */
}
~~~~

-   *hostgroup.cfg* :

~~~~ {.code}
define hostgroup{
hostgroup_name  http-hostgroup
alias       Http serveurs
}
define hostgroup{
hostgroup_name  linux-hostgroup
alias           Linux serveurs
}
define hostgroup{
hostgroup_name  windows-hostgroup
alias           Windows serveurs
}
~~~~

-   *host\_template.cfg* :

~~~~ {.code}
define host{
        name                            linux-server
        notifications_enabled           1
        event_handler_enabled           1
        flap_detection_enabled          1
        failure_prediction_enabled      1
        retain_status_information       1
        retain_nonstatus_information    1

        check_period                    24x7
        check_interval                  20
        retry_interval                  2
        max_check_attempts              5
        check_command                   check-host-alive-ping
        notification_period             24x7
        notification_interval           600
        notification_options            d,u,r
        contact_groups                  admins
        hostgroups                      linux-hostgroup
        register                        0
}

define host{
        name                            windows-server
        notifications_enabled           1
        event_handler_enabled           1
        flap_detection_enabled          1
        failure_prediction_enabled      1
        retain_status_information       1
        retain_nonstatus_information    1

        check_period                    24x7
        check_interval                  20
        retry_interval                  2
        max_check_attempts              5
        check_command                   check-host-alive-ping
        notification_period             24x7
        notification_interval           600
        notification_options            d,r
        contact_groups                  admins
        hostgroups                      windows-hostgroup
        register                        0
}
~~~~

-   *misccommand.cfg* :

~~~~ {.code}
# 'notify-host-by-email' command definition
define command{
        command_name    notify-host-by-email
        command_line    /usr/bin/printf "%b" "***** Nagios *****\n\nNotification Type: $NOTIFICATIONTYPE$\nHost: $HOSTNAME$\nState: $HOSTSTATE$\nAddress: $HOSTADDRESS$\nInfo: $HOSTOUTPUT$\n\nDate/Time: $LONGDATETIME$\n" | /usr/bin/mail -s "** $NOTIFICATIONTYPE$ Host Alert: $HOSTNAME$ is $HOSTSTATE$ **" $CONTACTEMAIL$
        }

# 'notify-service-by-email' command definition
define command{
        command_name    notify-service-by-email
        command_line    /usr/bin/printf "%b" "***** Nagios *****\n\nNotification Type: $NOTIFICATIONTYPE$\n\nService: $SERVICEDESC$\nHost: $HOSTALIAS$\nAddress: $HOSTADDRESS$\nState: $SERVICESTATE$\n\nDate/Time: $LONGDATETIME$\n\nAdditional Info:\n\n$SERVICEOUTPUT$" | /usr/bin/mail -s "** $NOTIFICATIONTYPE$ Service Alert: $HOSTALIAS$/$SERVICEDESC$ is $SERVICESTATE$ **" $CONTACTEMAIL$
        }
~~~~

-   *service\_template.cfg* :

~~~~ {.code}
define service{
        name                            generic-service
        active_checks_enabled           1
        passive_checks_enabled          1
        parallelize_check               1
        obsess_over_service             1
        check_freshness                 0
        notifications_enabled           1
        event_handler_enabled           1
        flap_detection_enabled          1
        failure_prediction_enabled      1
        retain_status_information       1
        retain_nonstatus_information    1
        is_volatile                     0
        check_period                    24x7
        max_check_attempts              5
        normal_check_interval           5
        retry_check_interval            1
        contact_groups                  admins
        notification_options            w,u,c,r
        notification_interval           600
        notification_period             24x7
        register                        0
        }

define service{
        name                            http-service
        active_checks_enabled           1
        passive_checks_enabled          1
        parallelize_check               1
        obsess_over_service             1
        check_freshness                 0
        notifications_enabled           1
        event_handler_enabled           1
        flap_detection_enabled          1
        failure_prediction_enabled      1
        retain_status_information       1
        retain_nonstatus_information    1
        is_volatile                     0
        check_period                    24x7
        max_check_attempts              3
        normal_check_interval           15
        retry_check_interval            2
        contact_groups                  admins
        notification_options            w,u,c,r
        notification_interval           600
        notification_period             24x7
        register                        0
        }
~~~~

Il n’est pas nécessaire d’importer les hosts.cfg et services.cfg car
vous l’avez déjà dans votre configuration nagios.

-   ***2. Test d’import dans la base de donnée Nconf*** :

On suppose que les fichiers de conf sont dans */usr/local/nagios/etc*/

Aller dans la configuration Nconf et supprimer tous les modèles (
timeperiod, misccommand,checkcommand ,contact ,contactgroup ,hostgroup ,
service-template)

Je n’avais pas besoin du renseignement de l’OS des machines, je l’ai
donc supprimer : aller dans “Attributes” et supprimer l’” OS ”

Se placer dans le dossier bin : *cd /usr/local/nconf/bin*/

~~~~ {.code}
# ./add_items_from_cfg.pl -x 5 -s -c misccommand -n command_name -f /usr/local/nagios/etc/objects/misccommand.cfg 
# ./add_items_from_cfg.pl -x 5 -s -c checkcommand -n command_name -f /usr/local/nagios/etc/objects/checkcommand.cfg
# ./add_items_from_cfg.pl -x 5 -s -c contact -n contact_name -f /usr/local/nagios/etc/objects/contacts.cfg
# ./add_items_from_cfg.pl -x 5 -s -c contactgroup -n contactgroup_name -f /usr/local/nagios/etc/objects/contactgroup.cfg
# ./add_items_from_cfg.pl -x 5 -s -c host-template -n name -f /usr/local/nagios/etc/objects/host_template.cfg
# ./add_items_from_cfg.pl -x 5 -s -c hostgroup -n hostgroup_name -f /usr/local/nagios/etc/objects/hostgroup.cfg
# ./add_items_from_cfg.pl -x 5 -s -c service-template -n name -f /usr/local/nagios/etc/objects/service_template.cfg
~~~~

=⇒ A la fin, il ne faut aucune erreur pour passer l’étape suivante.

-   ***3. Importation dans la base de donnée Nconf*** :

~~~~ {.code}
# ./add_items_from_cfg.pl -x 5 -c misccommand -n command_name -f /usr/local/nagios/etc/objects/misccommand.cfg 
# ./add_items_from_cfg.pl -x 5 -c checkcommand -n command_name -f /usr/local/nagios/etc/objects/checkcommand.cfg
# ./add_items_from_cfg.pl -x 5 -c contact -n contact_name -f /usr/local/nagios/etc/objects/contacts.cfg
# ./add_items_from_cfg.pl -x 5 -c contactgroup -n contactgroup_name -f /usr/local/nagios/etc/objects/contactgroup.cfg
# ./add_items_from_cfg.pl -x 5 -c host-template -n name -f /usr/local/nagios/etc/objects/host_template.cfg
# ./add_items_from_cfg.pl -x 5 -c hostgroup -n hostgroup_name -f /usr/local/nagios/etc/objects/hostgroup.cfg
# ./add_items_from_cfg.pl -x 5 -c service-template -n name -f /usr/local/nagios/etc/objects/service_template.cfg
~~~~

-   ***4. Ajout des fichiers de Nconf dans la conf nagios*** :

\# *vim nagios.cfg*

~~~~ {.code}
############## NCONF  #################
cfg_file=/usr/local/nagios/etc/Default_collector/extended_host_info.cfg
cfg_file=/usr/local/nagios/etc/Default_collector/extended_service_info.cfg
cfg_file=/usr/local/nagios/etc/Default_collector/hostgroups.cfg
cfg_file=/usr/local/nagios/etc/Default_collector/hosts.cfg
cfg_file=/usr/local/nagios/etc/Default_collector/servicegroups.cfg
cfg_file=/usr/local/nagios/etc/Default_collector/services.cfg
~~~~

-   ***5. Test*** :

\* Ajouter un host “test”, avec les services associés.

\* Cliquer sur “***Generate Nagios config***”

\* S’il n’y pas de message d’erreur, vous pouvez lancer la commande
suivante pour générer la conf nagios via Nconf :
/usr/local/nconf/ADD-ONS\# ***./deploy\_local.sh***
