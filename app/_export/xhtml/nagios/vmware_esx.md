---
layout: page
---

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

~~~~ {.code}
esxtop -b -n 1
~~~~

Il est ensuite possible de balayer cette sortie comme suit:

~~~~ {.code}
esxtop -b -n 1 | awk -F "," '{print $30}'
~~~~

nous donne la valeur disponible de swap sur notre serveur

~~~~ {.code}
"\\demo.monitoring-fr.org\Console Memory\Swap Free MBytes"
"462"
~~~~

et vdf

~~~~ {.code}
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
~~~~

SNMP {#snmp .sectionedit3}
----

### OID Intéressants {#oid-interessants .sectionedit4}

Les OID spécifiques à Vmware commencent en 1.3.6.1.4.1.6876 et sont
visibles avec la commande snmpwalk suivante :

~~~~ {.code}
snmpwalk 127.0.0.1 -c public -v 1 1.3.6.1.4.1.6876
~~~~

un snmpwalk sur SNMPv2-SMI::enterprises.6876.2.1.1.2 nous donne les noms
de vm

~~~~ {.code}
snmpwalk 127.0.0.1 -c public -v 1 SNMPv2-SMI::enterprises.6876.2.1.1.2

SNMPv2-SMI::enterprises.6876.2.1.1.2.0 = STRING: "Nagios3-proto"
SNMPv2-SMI::enterprises.6876.2.1.1.2.1 = STRING: "Security DIAM_2003"
~~~~

un snmpwalk sur SNMPv2-SMI::enterprises.6876.2.1.1.3 nous retourne le
tableau des vmx (disques durs) utilisés par les machines

~~~~ {.code}
snmpwalk 127.0.0.1 -c public -v 1 SNMPv2-SMI::enterprises.6876.2.1.1.3

SNMPv2-SMI::enterprises.6876.2.1.1.3.0 = STRING: "/vmfs/volumes/4593f02c-eab7d028-c21c-0019bb2d7fb6/Nagios3-proto/Nagios3-proto.vmx"
SNMPv2-SMI::enterprises.6876.2.1.1.3.1 = STRING: "/vmfs/volumes/4593f02c-eab7d028-c21c-0019bb2d7fb6/VM_IAM_2003/VM_IAM_2003.vmx"
~~~~

le SNMPv2-SMI::enterprises.6876.2.1.1.4 nous donne le nom du système
d’exploitation tournant dans la vm

~~~~ {.code}
snmpwalk 127.0.0.1 -c public -v 1 SNMPv2-SMI::enterprises.6876.2.1.1.4

SNMPv2-SMI::enterprises.6876.2.1.1.4.0 = STRING: "Ubuntu Linux (32-bit)"
SNMPv2-SMI::enterprises.6876.2.1.1.4.1 = STRING: "Microsoft Windows Server 2003, Standard Edition (32-bit)"
~~~~

le 5 nous donne la quantité de mémoire affectée à chaque vm

~~~~ {.code}
snmpwalk 127.0.0.1 -c public -v 1 SNMPv2-SMI::enterprises.6876.2.1.1.5

SNMPv2-SMI::enterprises.6876.2.1.1.5.0 = INTEGER: 512
SNMPv2-SMI::enterprises.6876.2.1.1.5.1 = INTEGER: 384
~~~~

Le 6 nous donne l’état (démarré ou arrêté) de chaque vm

~~~~ {.code}
snmpwalk 127.0.0.1 -c public -v 1 SNMPv2-SMI::enterprises.6876.2.1.1.6

SNMPv2-SMI::enterprises.6876.2.1.1.6.0 = STRING: "poweredOn"
SNMPv2-SMI::enterprises.6876.2.1.1.6.1 = STRING: "poweredOff"
~~~~

Le 7 nous donne le numéro d’index par lequel la VM est identifié dans
par snmp:

~~~~ {.code}
snmpwalk 127.0.0.1 -c public -v 1 SNMPv2-SMI::enterprises.6876.2.1.1.7

SNMPv2-SMI::enterprises.6876.2.1.1.7.0 = INTEGER: 112
SNMPv2-SMI::enterprises.6876.2.1.1.7.1 = INTEGER: 128
~~~~

le 8 donne également l’état de la machine sous une forme différente

~~~~ {.code}
[root@demo-expertise system]# snmpwalk 127.0.0.1 -c public -v 1 SNMPv2-SMI::enterprises.6876.2.1.1.8

SNMPv2-SMI::enterprises.6876.2.1.1.8.0 = STRING: "running"
SNMPv2-SMI::enterprises.6876.2.1.1.8.1 = STRING: "notRunning"
~~~~

un check snmp récupérant le nom de la première vm à tourner

~~~~ {.code}
./check_snmp -H localhost -v 1 -C public  -o SNMPv2-SMI::enterprises.6876.2.1.1.2.0
~~~~

Conclusion {#conclusion .sectionedit5}
----------

Pour le moment, la meilleure solution est d’utiliser la version 3 des
plugins de steve shipway avec le vmware-stat modifié pour corriger la
division par zéro et d’utiliser la version 3 de check\_esx\_gw pour
récupérer la liste des vm up et down. Le plug de Steve est défaillant
sur ce point même patché comme indiqué dans les forums.

Il y aurait fort à faire pour harmoniser tout ça
