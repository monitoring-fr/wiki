---
layout: page
---

[[[Installer ou activer SNMP](snmp-install@do=backlink.html)]]

[wiki monitoring-fr.org](../start.html "[ALT+H]")

![Logo Monitoring](../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../start.html "start") »
[Supervision](start.html "supervision:start") » [Installer ou activer
SNMP](snmp-install.html "supervision:snmp-install")

### Table des matières {.toggle}

-   [Installer ou activer
    SNMP](snmp-install.html#installer-ou-activer-snmp)
-   [Installer SNMP sous
    Windows](snmp-install.html#installer-snmp-sous-windows)
-   [Installer SNMP sous
    Linux](snmp-install.html#installer-snmp-sous-linux)
-   [Installer SNMP sous ESX](snmp-install.html#installer-snmp-sous-esx)
-   [Activer SNMP sur les routeurs ou switchs
    Cisco](snmp-install.html#activer-snmp-sur-les-routeurs-ou-switchs-cisco)

Installer ou activer SNMP {#installer-ou-activer-snmp .sectionedit1}
=========================

Documentation permettant d’installer ou activer SNMP sur divers
éléments.

Ce tutoriel a été réalisé par :

  **Rôle**        **Nom**
  --------------- -----------------
  **Rédacteur**   Romain BERTHAUD

Installer SNMP sous Windows {#installer-snmp-sous-windows .sectionedit3}
===========================

Afin de faire fonctionner la remonté d’informations SNMP, il faut que le
service SNMP soit démarré. Si il n’est pas présent, il faut l’installer.
Il est déjà préconfiguré sur les templates VMware Windows 2003 et 2008.

-   Dans “Ajout/Suppression de composants Windows” situé dans
    “Ajout/Suppression de programmes” du Panneau de configuration
    sélectionnez Outils de gestion et d’analyse puis détails.
-   Enfin activez la case à cocher SNMP(Protocole simplifié de gestion
    réseau) puis cliquez sur ok et finissez par suivant.

Sous Windows 2008, c’est une fonctionnalité à ajouter et qui ne
nécessite pas le CD de windows pour être installé. Néanmoins, on est
obligé de redémarrer le serveur pour avoir accès aux informations de
configuration.

[![](../assets/media/powered/centreon/installation-snmp/installersnmp.png@w=700)](../_detail/powered/centreon/installation-snmp/installersnmp.png@id=supervision%253Asnmp-install.html "powered:centreon:installation-snmp:installersnmp.png")

Pour cette opération le CD-ROM du système utilisé avec le même Service
Pack sera demandé.

Ensuite, il faut paramétrer SNMP pour qu’il envoi les informations que
nous voulons.

Accéder aux propriétés du service et renseigner les valeurs suivantes.

Les informations de contacts et les services supervisés (tout cocher).

[![](../assets/media/powered/centreon/installation-snmp/snmp1.png@w=700)](../_detail/powered/centreon/installation-snmp/snmp1.png@id=supervision%253Asnmp-install.html "powered:centreon:installation-snmp:snmp1.png")

Dans l’onglet sécurité, définir la communauté auquel appartient le
serveur (COMMUNAUTE\_SERVEUR pour tous les serveurs Windows et Linux) et
la machine qui a l’autorisation de récupérer les informations (notre
serveur de supervision).

[![](../assets/media/powered/centreon/installation-snmp/snmp2.png@w=700)](../_detail/powered/centreon/installation-snmp/snmp2.png@id=supervision%253Asnmp-install.html "powered:centreon:installation-snmp:snmp2.png")

Valider et la réception d’information SNMP par Nagios commence
directement au prochain check si l’hôte à déjà été ajouté.

Installer SNMP sous Linux {#installer-snmp-sous-linux .sectionedit4}
=========================

SNMP est déjà installé sur tout les serveurs Linux en principe. Il fait
parti du template Vmware. Cependant, il faut vérifier sur les serveurs
physiques si il est présent. Pour l’installer,

~~~~ {.code}
yum install net-snmp
~~~~

Un fichier `/etc/snmp/snmpd.conf` est positionné

On peut aussi utiliser l’utilitaire `snmpconf` pour paramétrer le
fichier de configuration.

Récupérer le fichier de configuration `snmpd.conf` sauvegardé sur un
serveur de fichiers ou obtenu d’un autre serveur et le positionner en
lieu et place de l’existant dans `/etc/snmp/snmpd.conf`. Laisser toutes
les valeurs par défaut mais en bas du fichier, adapter les volumes
disques en fonction

Fichier `/etc/snmp/snmpd.conf` typique.

~~~~ {.code}
syscontact [email protected]
/*  */!function(){try{var t="currentScript"in document?document.currentScript:function(){for(var t=document.getElementsByTagName("script"),e=t.length;e--;)if(t[e].getAttribute("cf-hash"))return t[e]}();if(t&&t.previousSibling){var e,r,n,i,c=t.previousSibling,a=c.getAttribute("data-cfemail");if(a){for(e="",r=parseInt(a.substr(0,2),16),n=2;a.length-n;n+=2)i=parseInt(a.substr(n,2),16)^r,e+=String.fromCharCode(i);e=document.createTextNode(e),c.parentNode.replaceChild(e,c)}}}catch(u){}}();/*  */ (edit snmpd.conf)
syslocation room1 (edit snmpd.conf)
rocommunity COMMUNAUTE_SERVEUR
trapcommunity COMMUNAUTE_SERVEUR
trapsink localhost


# SECTION: Monitor Various Aspects of the Running Host
#
#   The following check up on various aspects of a host.

# disk: Check for disk space usage of a partition.
#   The agent can check the amount of available disk space, and make
#   sure it is above a set limit.
#
#    disk PATH [MIN=100000]
#
#    PATH:  mount path to the disk in question.
#    MIN:   Disks with space below this value will have the Mib's errorFlag set.
#           Can be a raw byte value or a percentage followed by the %
#           symbol.  Default value = 100000.
#
#   The results are reported in the dskTable section of the UCD-SNMP-MIB tree

disk  / 200000
disk  /boot 200000
disk  /tmp 200000
disk  /usr 200000
disk  /var 200000du partitionnement.
~~~~

Redémarrer le service snmpd.

~~~~ {.code}
/etc/init.d/snmpd restart
~~~~

Vérifier que snmpd est au démarrage.

~~~~ {.code}
chkconfig --list | grep snmpd.
~~~~

Si non, mettre snmpd au démarrage du système.

~~~~ {.code}
chkconfig snmpd on
~~~~

Pour connaître les informations qui sont récoltés par snmp, utiliser la
commande `snmpwalk`. Voici un exemple pour l’utilisation de l’espace
disque. On a le numéro du disque avec en face le pourcentage utilisé.

~~~~ {.code}
[root@srv-vmtmp01 snmp]# snmpwalk -v 1 -c COMMUNAUTE_SERVEUR localhost UCD-SNMP-MIB::dskPercent
UCD-SNMP-MIB::dskPercent.1 = INTEGER: 28
UCD-SNMP-MIB::dskPercent.2 = INTEGER: 7
UCD-SNMP-MIB::dskPercent.3 = INTEGER: 3
UCD-SNMP-MIB::dskPercent.4 = INTEGER: 62
UCD-SNMP-MIB::dskPercent.5 = INTEGER: 10
~~~~

Faire un `df -h` pour voir à quoi correspond chaque volume en fonction
du pourcentage indiqué.

Installer SNMP sous ESX {#installer-snmp-sous-esx .sectionedit5}
=======================

Sous Vmware ESX, on n’installe rien. SNMP est déjà prévu sur le système,
il est simplement démarré et configuré dans le kickstart de déploiement
du système ESX. Si ce n’est pas le cas, le fichier de configuration
(/etc/snmp/snmpd.conf) doit ressembler à ce qui suit.

~~~~ {.code}
syscontact [email protected]
/*  */!function(){try{var t="currentScript"in document?document.currentScript:function(){for(var t=document.getElementsByTagName("script"),e=t.length;e--;)if(t[e].getAttribute("cf-hash"))return t[e]}();if(t&&t.previousSibling){var e,r,n,i,c=t.previousSibling,a=c.getAttribute("data-cfemail");if(a){for(e="",r=parseInt(a.substr(0,2),16),n=2;a.length-n;n+=2)i=parseInt(a.substr(n,2),16)^r,e+=String.fromCharCode(i);e=document.createTextNode(e),c.parentNode.replaceChild(e,c)}}}catch(u){}}();/*  */ (edit snmpd.conf)
syslocation room1 (edit snmpd.conf)
rocommunity COMMUNAUTE_SERVEUR
trapcommunity COMMUNAUTE_SERVEUR
trapsink localhost
~~~~

Redémarrer le service avec un `/etc/init.d/snmpd restart`.

Vous remarquerez que c’est exactement comme sous Red Hat pour la bonne
et simple raison que VMware ESX est une Red Hat!

Il faut que le SNMP soit autorisé sur le firewall de l’ESX pour que les
requêtes passent.

Activer SNMP sur les routeurs ou switchs Cisco {#activer-snmp-sur-les-routeurs-ou-switchs-cisco .sectionedit6}
==============================================

Configuration réalisé sur des switchs de niveau 3. Pour des routeurs
distants fournit par un opérateur, il faut lui demander si le SNMP est
offert dans sa solution car c’est lui qui à la possibilité d’accéder à
la configuration des routeurs et pas nous.

Ce dont on a besoin pour activer le SNMP de manière basique.

~~~~ {.code}
enable
conf t
snmp-server community COMMUNAUTE_RESEAU ro 1
snmp-server host @IP_SERVEUR_SUPERVISION COMMUNAUTE_RESEAU
~~~~

Et c’est tout car nous n’utilisons pas les traps SNMP des éléments. Dans
le cas contraire, il faut paramétrer les traps avec la commande
`snmp-server enable traps` comme ci-dessous.

~~~~ {.code}
snmp-server community COMMUNAUTE_RESEAU RO 1
snmp-server trap-source Vlan1
snmp-server enable traps snmp authentication linkdown linkup coldstart warmstart
snmp-server enable traps tty
snmp-server enable traps fru-ctrl
snmp-server enable traps entity
snmp-server enable traps flash insertion removal
snmp-server enable traps cpu threshold
snmp-server enable traps vtp
snmp-server enable traps vlancreate
snmp-server enable traps vlandelete
snmp-server enable traps envmon fan shutdown supply temperature status
snmp-server enable traps port-security
snmp-server enable traps rf
snmp-server enable traps hsrp
snmp-server enable traps bridge newroot topologychange
snmp-server enable traps stpx inconsistency root-inconsistency loop-inconsistency
snmp-server enable traps syslog
snmp-server enable traps vlan-membership
snmp-server host @IP_SERVEUR_SUPERVISION COMMUNAUTE_RESEAU
~~~~

Pour mettre à jour une configuration existante

~~~~ {.code}
no snmp-server community COMMUNAUTE_RESEAU RO 1
snmp-server community COMMUNAUTE_RESEAU RO 1
no snmp-server host @ancienne_IP COMMUNAUTE_RESEAU
snmp-server host @IP_SERVEUR_SUPERVISION COMMUNAUTE_RESEAU
~~~~

Pour configurer les ACL.

~~~~ {.code}
sh running-config
sh snmp
sh access-lists 1
conf t
ip access-list standard 1
no 40
40 permit @IP_SERVEUR_SUPERVISION
exit
exit
wr m
~~~~

SOMMAIRE {#sommaire .sectionedit1}
--------

**[Accueil](../start.html "start")**

**[Supervision](start.html "supervision:start")**

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
-   [Ressenti utilisateur](eue/start.html "supervision:eue:start")
-   [Ressenti utilisateur avec
    sikuli](../sikuli/eue/start.html "sikuli:eue:start")

**[Hypervision](../hypervision/start.html "hypervision:start")**

-   [Canopsis](../canopsis/start.html "canopsis:start")

**[Sécurité](../securite/start.html "securite:start")**

**[Infrastructure](../infra/start.html "infra:start")**

**[Développement](../dev/start.html "dev:start")**

Supervision {#supervision .sectionedit1}
-----------

-   [Commandes pour la
    supervision](commands.html "supervision:commands")
-   [Dstat](dstat.html "supervision:dstat")
-   [Installer ou activer
    SNMP](snmp-install.html "supervision:snmp-install")
-   [Mode actif](actif.html "supervision:actif")
-   [Mode passif](passif.html "supervision:passif")
-   [Ntop](ntop/start.html "supervision:ntop:start")
-   [Panorama](links.html "supervision:links")
-   [RRDTool](rrdtool.html "supervision:rrdtool")
-   [SNMP](snmp.html "supervision:snmp")
-   [Supervision Hardware IPMI](ipmi.html "supervision:ipmi")
-   [Supervision du ressenti
    utilisateur](eue/start.html "supervision:eue:start")
-   [Tableaux récapitulatifs des différents fichiers
    importants](important-files.html "supervision:important-files")

-   [Afficher le texte
    source](snmp-install@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](snmp-install@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](snmp-install@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](snmp-install@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](snmp-install@do=media.html "Gestionnaire de médias")
-   [Index](snmp-install@do=index.html "Index [X]")
-   [Connexion](snmp-install@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de page](snmp-install.html#dokuwiki__top "Haut de page [T]")

supervision/snmp-install.txt · Dernière modification: 2013/03/29 09:39
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

![](../lib/exe/indexer.php@id=supervision%253Asnmp-install&1424859520)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
