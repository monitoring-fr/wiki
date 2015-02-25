---
layout: page
---

[[[Supervision vmware esx](vmware_esx@do=backlink.html)]]

[wiki monitoring-fr.org](../start.html "[ALT+H]")

![Logo Monitoring](../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../start.html "start") »
[Nagios](start.html "nagios:start") » [Supervision vmware
esx](vmware_esx.html "nagios:vmware_esx")

### Table des matières {.toggle}

-   [Supervision vmware esx](vmware_esx.html#supervision-vmware-esx)
    -   [esxtop & vdf](vmware_esx.html#esxtop-vdf)
    -   [SNMP](vmware_esx.html#snmp)
        -   [OID Intéressants](vmware_esx.html#oid-interessants)
    -   [Conclusion](vmware_esx.html#conclusion)

Supervision vmware esx {#supervision-vmware-esx .sectionedit1}
======================

La supervision des serveurs ESX posent toujours à ce jour un certains
nombre de problèmes. Le plugin développé par [Steve
Shipway](http://www.steveshipway.org/forum/viewforum.php?f=28 "http://www.steveshipway.org/forum/viewforum.php?f=28")
est plutôt buggé pour les serveurs ESX 3.0 (il indique toujours les vm
comme down) et n’est pas prévu pour ESX 3.5.

esxtop & vdf {#esxtop-vdf .sectionedit2}
------------

Une première idée est d’utiliser la commande esxtop et notamment son
mode de sortie csv.

~~~
esxtop -b -n 1
~~~

Il est ensuite possible de balayer cette sortie comme suit:

~~~
esxtop -b -n 1 | awk -F "," '{print $30}'
~~~

nous donne la valeur disponible de swap sur notre serveur

~~~
"\\demo.monitoring-fr.org\Console Memory\Swap Free MBytes"
"462"
~~~

et vdf

~~~
[[email protected]
/*  */!function(){try{var t="currentScript"in document?document.currentScript:function(){for(var t=document.getElementsByTagName("script"),e=t.length;e--;)if(t[e].getAttribute("cf-hash"))return t[e]}();if(t&&t.previousSibling){var e,r,n,i,c=t.previousSibling,a=c.getAttribute("data-cfemail");if(a){for(e="",r=parseInt(a.substr(0,2),16),n=2;a.length-n;n+=2)i=parseInt(a.substr(n,2),16)^r,e+=String.fromCharCode(i);e=document.createTextNode(e),c.parentNode.replaceChild(e,c)}}}catch(u){}}();/*  */]# /usr/sbin/vdf -h
Filesystem            Size  Used Avail Use% Mounted on
/dev/cciss/c0d0p2     4.9G  2.4G  2.3G  52% /
/dev/cciss/c0d0p1      99M   26M   69M  28% /boot
none                  132M     0  132M   0% /dev/shm
/dev/cciss/c0d0p7     2.0G   86M  1.8G   5% /var/log
/vmfs/devices         1.2T     0  1.2T   0% /vmfs/devices
/vmfs/volumes/4593f02c-eab7d028-c21c-0019bb2d7fb6
                      402G  227G  174G  56% /vmfs/volumes/storage1
~~~

SNMP {#snmp .sectionedit3}
----

### OID Intéressants {#oid-interessants .sectionedit4}

Les OID spécifiques à Vmware commencent en 1.3.6.1.4.1.6876 et sont
visibles avec la commande snmpwalk suivante :

~~~
snmpwalk 127.0.0.1 -c public -v 1 1.3.6.1.4.1.6876
~~~

un snmpwalk sur SNMPv2-SMI::enterprises.6876.2.1.1.2 nous donne les noms
de vm

~~~
snmpwalk 127.0.0.1 -c public -v 1 SNMPv2-SMI::enterprises.6876.2.1.1.2

SNMPv2-SMI::enterprises.6876.2.1.1.2.0 = STRING: "Nagios3-proto"
SNMPv2-SMI::enterprises.6876.2.1.1.2.1 = STRING: "Security DIAM_2003"
~~~

un snmpwalk sur SNMPv2-SMI::enterprises.6876.2.1.1.3 nous retourne le
tableau des vmx (disques durs) utilisés par les machines

~~~
snmpwalk 127.0.0.1 -c public -v 1 SNMPv2-SMI::enterprises.6876.2.1.1.3

SNMPv2-SMI::enterprises.6876.2.1.1.3.0 = STRING: "/vmfs/volumes/4593f02c-eab7d028-c21c-0019bb2d7fb6/Nagios3-proto/Nagios3-proto.vmx"
SNMPv2-SMI::enterprises.6876.2.1.1.3.1 = STRING: "/vmfs/volumes/4593f02c-eab7d028-c21c-0019bb2d7fb6/VM_IAM_2003/VM_IAM_2003.vmx"
~~~

le SNMPv2-SMI::enterprises.6876.2.1.1.4 nous donne le nom du système
d’exploitation tournant dans la vm

~~~
snmpwalk 127.0.0.1 -c public -v 1 SNMPv2-SMI::enterprises.6876.2.1.1.4

SNMPv2-SMI::enterprises.6876.2.1.1.4.0 = STRING: "Ubuntu Linux (32-bit)"
SNMPv2-SMI::enterprises.6876.2.1.1.4.1 = STRING: "Microsoft Windows Server 2003, Standard Edition (32-bit)"
~~~

le 5 nous donne la quantité de mémoire affectée à chaque vm

~~~
snmpwalk 127.0.0.1 -c public -v 1 SNMPv2-SMI::enterprises.6876.2.1.1.5

SNMPv2-SMI::enterprises.6876.2.1.1.5.0 = INTEGER: 512
SNMPv2-SMI::enterprises.6876.2.1.1.5.1 = INTEGER: 384
~~~

Le 6 nous donne l’état (démarré ou arrêté) de chaque vm

~~~
snmpwalk 127.0.0.1 -c public -v 1 SNMPv2-SMI::enterprises.6876.2.1.1.6

SNMPv2-SMI::enterprises.6876.2.1.1.6.0 = STRING: "poweredOn"
SNMPv2-SMI::enterprises.6876.2.1.1.6.1 = STRING: "poweredOff"
~~~

Le 7 nous donne le numéro d’index par lequel la VM est identifié dans
par snmp:

~~~
snmpwalk 127.0.0.1 -c public -v 1 SNMPv2-SMI::enterprises.6876.2.1.1.7

SNMPv2-SMI::enterprises.6876.2.1.1.7.0 = INTEGER: 112
SNMPv2-SMI::enterprises.6876.2.1.1.7.1 = INTEGER: 128
~~~

le 8 donne également l’état de la machine sous une forme différente

~~~
[root@demo-expertise system]# snmpwalk 127.0.0.1 -c public -v 1 SNMPv2-SMI::enterprises.6876.2.1.1.8

SNMPv2-SMI::enterprises.6876.2.1.1.8.0 = STRING: "running"
SNMPv2-SMI::enterprises.6876.2.1.1.8.1 = STRING: "notRunning"
~~~

un check snmp récupérant le nom de la première vm à tourner

~~~
./check_snmp -H localhost -v 1 -C public  -o SNMPv2-SMI::enterprises.6876.2.1.1.2.0
~~~

Conclusion {#conclusion .sectionedit5}
----------

Pour le moment, la meilleure solution est d’utiliser la version 3 des
plugins de steve shipway avec le vmware-stat modifié pour corriger la
division par zéro et d’utiliser la version 3 de check\_esx\_gw pour
récupérer la liste des vm up et down. Le plug de Steve est défaillant
sur ce point même patché comme indiqué dans les forums.

Il y aurait fort à faire pour harmoniser tout ça

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
    source](vmware_esx@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](vmware_esx@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](vmware_esx@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](vmware_esx@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](vmware_esx@do=media.html "Gestionnaire de médias")
-   [Index](vmware_esx@do=index.html "Index [X]")
-   [Connexion](vmware_esx@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de page](vmware_esx.html#dokuwiki__top "Haut de page [T]")

nagios/vmware\_esx.txt · Dernière modification: 2013/03/29 09:39
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

![](../lib/exe/indexer.php@id=nagios%253Avmware_esx&1424859523)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
