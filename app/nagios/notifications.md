---
layout: page
title: Nagios et les notifications
---

Les notification dans nagios font appel à plusieurs éléments :

-   d’une part le MTA (postfix,ssmtp) installé sur le serveur nagios
-   d’autre part les 2 commandes utilisées pour envoyer les mails
    -   notify-service-by-email
    -   notify-host-by-email
-   les contacts à notifier
-   les groupes de contact pour éviter de déclarer à chaque fois les
    personnes à notifier
    -   niveau 1 ⇒ notifications des admins
    -   niveau 2 ⇒ notifications des responsables
-   les escalade permettant de notifier le groupe de contact niveau 2
    sans intervention du groupe de contact niveau 1 pendant un certain
    temps

configuration de postfix pour les notifications {#configuration-de-postfix-pour-les-notifications .sectionedit2}
-----------------------------------------------

-   Voir :
    [http://wiki.monitoring-fr.org/infra/postfix](../infra/postfix.html "http://wiki.monitoring-fr.org/infra/postfix")

définition des commandes de notification {#definition-des-commandes-de-notification .sectionedit3}
----------------------------------------

-   /opt/nagios/etc/conf.d/commands/notifications/notifications.cfg

~~~
define command{
    command_name    notify-host-by-email
    command_line    /usr/bin/printf "%b" "[Nagios]\n\nType de notification: $NOTIFICATIONTYPE$\nHôte: $HOSTNAME$\nEtat: $HOSTSTATE$\nAddresse: $HOSTADDRESS$\nInfo: $HOSTOUTPUT$\n\nDate/Heure: $LONGDATETIME$\n" | /usr/bin/mail -s "** $NOTIFICATIONTYPE$ Alerte : $HOSTNAME$ est $HOSTSTATE$ **" $CONTACTEMAIL$
}

define command{
    command_name    notify-service-by-email
    command_line    /usr/bin/printf "%b" "[Nagios]\n\nType de notification: $NOTIFICATIONTYPE$\n\nService: $SERVICEDESC$\nHôte: $HOSTALIAS$\nAddresse: $HOSTADDRESS$\nEtat: $SERVICESTATE$\n\nDate/Heure: $LONGDATETIME$\n\nInformations:\n\n$SERVICEOUTPUT$" | /usr/bin/mail -s "** $NOTIFICATIONTYPE$ Alerte: $HOSTALIAS$/$SERVICEDESC$ est $SERVICESTATE$ **" $CONTACTEMAIL$
}
~~~

Définition des contacts {#definition-des-contacts .sectionedit4}
-----------------------

~~~
define contact{
    use                             generic-contact
    contact_name                        admin1
    alias                           admin1
    contactgroups                       niveau1
    email                           [email protected]
/*  */!function(){try{var t="currentScript"in document?document.currentScript:function(){for(var t=document.getElementsByTagName("script"),e=t.length;e--;)if(t[e].getAttribute("cf-hash"))return t[e]}();if(t&&t.previousSibling){var e,r,n,i,c=t.previousSibling,a=c.getAttribute("data-cfemail");if(a){for(e="",r=parseInt(a.substr(0,2),16),n=2;a.length-n;n+=2)i=parseInt(a.substr(n,2),16)^r,e+=String.fromCharCode(i);e=document.createTextNode(e),c.parentNode.replaceChild(e,c)}}}catch(u){}}();/*  */
}

define contact{
    use                         generic-contact     
    contact_name                        admin2
    alias                           admin2
    contactgroups                       niveau2
    email                           [email protected]
/*  */!function(){try{var t="currentScript"in document?document.currentScript:function(){for(var t=document.getElementsByTagName("script"),e=t.length;e--;)if(t[e].getAttribute("cf-hash"))return t[e]}();if(t&&t.previousSibling){var e,r,n,i,c=t.previousSibling,a=c.getAttribute("data-cfemail");if(a){for(e="",r=parseInt(a.substr(0,2),16),n=2;a.length-n;n+=2)i=parseInt(a.substr(n,2),16)^r,e+=String.fromCharCode(i);e=document.createTextNode(e),c.parentNode.replaceChild(e,c)}}}catch(u){}}();/*  */
}

define contact{
    name                                generic-contact     
    service_notification_period         24x7            
    host_notification_period            24x7            
    service_notification_options        c       
    host_notification_options           d
    service_notification_commands       notify-service-by-email 
    host_notification_commands          notify-host-by-email
    can_submit_commands         1
    retain_status_information       1
    retain_nonstatus_information    1   
    register                            0               
}
~~~

Les groupes de contact {#les-groupes-de-contact .sectionedit5}
----------------------

-   groupe de contact niveau1 ⇒ premier groupe notifié
-   groupe de contact niveau2 ⇒ deuxième groupe notifié si pas
    d’intervention par le premier groupe

~~~
define contactgroup{
    contactgroup_name   niveau1
    alias           niveau1
}

define contactgroup{
    contactgroup_name   niveau2
    alias           niveau2
}
~~~

Les escalades {#les-escalades .sectionedit6}
-------------

Nagios vérifie régulièrement l’ensemble des services sur le parc
configuré. Cet intervalle de temps est configurable pour chaque service
à l’aide du champ normal\_check\_interval. Si le greffon renvoie un état
différent de OK, une alerte en état soft est levée. Nagios vérifiera
autant de fois que max\_check\_attempts lui indique le service toutes
les retry\_check\_interval minutes d’intervalle. Si celui-ci reste en
erreur après tous les essais, une première notification est envoyée.

Si après un intervalle de notification\_interval minutes, le problème
n’est toujours pas réglé, Nagios enverra une autre notification et
continuera ainsi jusqu’à ce que le problème soit résolu ou acquitté.

Dans certains cas, il peut être utile de mettre en place des escalades
sur les services. Le principe est simple, pour chaque service où l’on
souhaite une escalade des notifications, il suffit de préciser à quels
groupes de contacts Nagios devra envoyer les notifications. Cela se fait
en fonction du nombre de notifications envoyées.

Voici un petit exemple :

~~~
  define serviceescalation {
    host_name              generic-host
    service_description    generic-service
    first_notification     3
    last_notification      4
    notification_interval  0
    contact_groups         niveau2
    }
~~~

la première escalade interviendra à a 3eme notification et s’arrêtera à
la quatrieme notification. Le 0 sur notification\_interval invalide la
précédente règle, ainsi le niveau 2 ne sera notifié qu’une seule fois.