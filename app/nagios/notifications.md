---
layout: page
---

[[[Nagios et les notifications](notifications@do=backlink.html)]]

[wiki monitoring-fr.org](../start.html "[ALT+H]")

![Logo Monitoring](../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../start.html "start") »
[Nagios](start.html "nagios:start") » [Nagios et les
notifications](notifications.html "nagios:notifications")

### Table des matières {.toggle}

-   [Nagios et les
    notifications](notifications.html#nagios-et-les-notifications)
    -   [configuration de postfix pour les
        notifications](notifications.html#configuration-de-postfix-pour-les-notifications)
    -   [définition des commandes de
        notification](notifications.html#definition-des-commandes-de-notification)
    -   [Définition des
        contacts](notifications.html#definition-des-contacts)
    -   [Les groupes de
        contact](notifications.html#les-groupes-de-contact)
    -   [Les escalades](notifications.html#les-escalades)

Nagios et les notifications {#nagios-et-les-notifications .sectionedit1}
===========================

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
    source](notifications@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](notifications@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](notifications@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](notifications@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](notifications@do=media.html "Gestionnaire de médias")
-   [Index](notifications@do=index.html "Index [X]")
-   [Connexion](notifications@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de page](notifications.html#dokuwiki__top "Haut de page [T]")

nagios/notifications.txt · Dernière modification: 2013/03/29 09:39
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

![](../lib/exe/indexer.php@id=nagios%253Anotifications&1424859523)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
