---
layout: page
title: 'SNMP'
---

**SNMP** est un protocole qui permet aux administrateurs réseaux de
gérer les équipements et de diagnostiquer les problèmes. **SNMP**
signifie *Simple Network Management Protocol* et la plupart des switchs,
UPS, firewall hardware, routeurs,… comprennent ce protocole pour les
diagnostiques.

*Remarque :* Quand je dit “la plupart”, je parle du matériel que l’on
retrouve en entreprise; pas forcément le routeur fourni par votre
fournisseur d’accès Internet. Pour savoir si votre matériel est
compatible avec le **SNMP**, veuillez consulter les spécifications
techniques livrées avec l’appareil.

Le protocole **SNMP** est un standard défini par l’IETF dans la [RFC
1157](http://www.ietf.org/rfc/rfc1157.txt "http://www.ietf.org/rfc/rfc1157.txt")
(Mai 1990). Le **SNMP** est souvent vu comme quelque chose de compliqué
et d’assez confus. Les APIs permettant d’interagir avec le protocole
englobe tellement de choses qu’au final, on ne s’y retrouve plus. Les
livres et la documentation disponibles sur le sujet ont tendance à
compliquer les choses et à ne pas les démystifier.

Ce tutoriel a été réalisé par :

  **Rôle**        **Nom**
  --------------- ------------------
  **Rédacteur**   Romuald FRONTEAU

### Généralités et vocabulaire {#generalites-et-vocabulaire .sectionedit3}

**SNMP** est relativement simple… une fois qu’on a compris. Voyons
comment se compose un ensemble d’éléments communiquant via SNMP.

Un périphérique réseau (routeur, switch, firewall,…) fait tourner un
**agent SNMP** qui est en fait un processus *daemon* qui réponds aux
requêtes du réseau. L’ **agent SNMP** fournit un grand nombre d’
**identifiant d’objets** (*Object Identifiers* ou **OID**). Un **OID**
est une paire clé-valeur unique. L’ **agent SNMP** remplit ces valeurs
et fait en sorte qu’elles soient disponibles. Un **manager SNMP** (ou
**client SNMP**) peut effectuer des requêtes aux agents avec ces paires
clé-valeur à propos d’informations spécifiques. Les **OIDs SNMP**
peuvent être lu ou écrit.

Notons qu’il est rare d’écrire des informations sur un périphérique
SNMP. Le SNMP est surtout utilisé par de nombreuses applications de
management pour contrôler l’état des périphériques réseaux (comme une
interface graphique administrative pour les switches). Un système
d’authentification basique existe dans le SNMP; il permet au manager
d’envoyer un **community name** (qui est en fait un mot de passe en
clair) pour autoriser la lecture ou l’écriture des OIDs. La plupart des
périphériques utilisent le **community name** non sécurisé `public`. Les
communications SNMP se font via les ports UDP 161 et 162.

### MIB {#mib .sectionedit4}

Si vous avez déjà effectué quelques recherches sur le SNMP, vous avez
sûrement été confronté aux **MIB** (*Management Information Base*).
L’importance des MIBs est très surfaite et vous allez comprendre
pourquoi. Au premier coup d’oeil, une MIB peut paraître très complexe;
en réalité, c’est très simple.

Les
[\*\*OID\*\*s](http://wiki.monitoring-fr.org/snmp/snmp-oid "snmp:snmp-oid")
sont numériques et globaux. Un **OID** est très similaire à une adresse
IPv6 et les différents fabriquants ont différents préfixes, chaque
fabriquant a sa gamme de produit (un autre préfixe) et ainsi de suite.
Les OIDs peuvent très vite être long et c’est compliqué pour un humain
de se rappeler la signification de cet ensemble de nombre. C’est pour
cela qu’une méthode a été mise au point pour traduire un OID numérique
dans une forme lisible pour un humain. Cette carte de traduction est
stockée dans un fichier texte appelé *Management Information Base* ou
**MIB**.

Vous n’avez pas besoin d’un MIB pour utiliser SNMP ou effectuer des
requêtes sur des périphériques SNMP mais sans la MIB, vous n’allez pas
savoir facilement ce que signifient les données retournées par le
périphérique. Dans certains cas, c’est facile comme le nom de l’hôte,
l’usage des disques ou les informations d’état des ports. Dans d’autres
cas, cela peut être plus difficile et une MIB peut être d’une grande
aide. Notez qu’il est assez inhabituel pour la plupart des applications
d’écrire des requêtes uniquement numériques; la plupart des applications
permettent l’installation de MIB complémentaires. Cette installation
consiste en fait de placer les MIB à un endroit où l’application cliente
SNMP peut les trouver pour effectuer la traduction.

### Techniques de supervision avec SNMP {#techniques-de-supervision-avec-snmp .sectionedit5}

SNMP peut être utilisé de deux manières distinctes : le *polling* et les
*traps*.

Le **polling** consiste simplement à envoyer une requête à intervalles
réguliers pour obtenir une valeur particulière. Cette technique est
appelée *vérification active*. Vous pouvez par programme/script vérifier
si les valeurs sont correctes. Si la requête échoue, il est possible
qu’il y ai un problème avec le périphérique. Cependant, vu que le SNMP
s’appuie sur UDP, il est conseillé de réitérer la requête pour confirmer
le problème (surtout dans le cas d’une vérification au travers
d’Internet).

Les **traps** consistent à faire de la vérification passive; en gros, on
configure l’agent SNMP pour qu’il contacte un autre agent SNMP en cas de
problème. C’est-à-dire que l’on peut configurer un périphérique réseau
(comme un routeur) pour qu’il envoie un **trap SNMP** lors de certains
événements. Par exemple, le routeur peut envoyer un **trap** lorsqu’il
détecte que la ligne est coupée (down). Quand un **événement trap**
apparait, l’agent sur le périphérique va envoyer le **trap** vers une
destination pré-configurée communément appelé **trap host**. Le trap
host possède son propre agent SNMP qui va accepter et traiter les traps
lorsqu’ils arrivent. Le traitement des traps est effectués par des
**trap handlers**. Le **handler** peut faire ce qui est approprié pour
répondre au trap, comme envoyer un email d’alerte ou faire ce qu’on
veut.

### Les différentes versions de SNMP {#les-differentes-versions-de-snmp .sectionedit6}

Il existe actuellement 3 versions différentes du protocole SNMP :

-   SNMP v1 (RFC 1155, 1157 et 1212).
-   SNMP v2c (RFC 1901 à 1908).
-   SNMP v3 (RFC 3411 à 3418).

La co-existence des trois versions est détaillée dans la RFC 3584.

Installation {#installation .sectionedit7}
------------

Pour installer un manager SNMP, vous pouvez utiliser *Net-SNMP*.
L’application Net-SNMP est un ensemble de programme console permettant
de tout faire avec le protocole SNMP. L’avantage d’utiliser des
programmes console est que vous pouvez facilement écrire des petits
scripts de vérifications que vous pourrez intégrer dans
[Nagios](../nagios/start.html "nagios:start"), par exemple.

Pour installer le paquet client SNMP :

~~~
sudo apt-get install snmpd
~~~

Une fois ce dernier installé, il vous faut encore renseigner l’endroit
où se trouve les MIB en assignant la variable d’environnement
` $MIBDIRS ` de la manière suivante (à introduire dans une console) :

~~~
MIBDIRS=/usr/share/snmp/mibs/
~~~

Ensuite, on renseigne le `MIBDIRS` pour tous les utilisateurs de la
machines en ajoutant la ligne ci-dessus dans le fichier
`/etc/environment` via la commande suivante :

~~~
sudo vi /etc/environment
~~~

La dernière étape consiste à vous procurer les MIB concernant votre
matériel (en général, sur le site web du constructeur) et de les copier
dans le répertoire `/usr/share/snmp/mibs/`.

*Remarque :* Veillez à ce que les noms de fichiers MIB terminent bien
par `-MIB.txt`.

Utilisation {#utilisation .sectionedit8}
-----------

Pour une utilisation de base du SNMP, vous avez besoin de 2 commandes
principales :

-   `snmpwalk` : pour sortir des informations par lots.
-   `snmpget` : pour obtenir une information sur un OID précis.

Il existe bien d’autres commandes SNMP disponible dans le paquet
*Net-SNMP*. Je vous encourage à lire la manpage principale
`man snmpcmd`.

### snmpwalk {#snmpwalk .sectionedit9}

Lorsqu’on décide de superviser un périphérique, il est important de
connaître ce qui est disponible. Pour ce faire, il existe la commande
`snmpwalk`. Cette commande permet de sortir sur la console toutes les
informations accessibles sur le périphériques. Voici un exemple avec un
switch 3com SuperStack3 :

~~~
snmpwalk -v1 -c private 192.168.0.232
~~~

Voyons brièvement les différentes options :

-   `-v1` : indique que l’on utilise le protocole SNMP version 1 (la
    version du protocole à utiliser dépend du périphérique supervisé).
-   `-c private` : indique le *community name* pour accéder aux
    informations. Dans cet exemple, on utilise le *community name*
    `private`. Ce *community name* est dépendant du périphérique et se
    modifie dans les paramètres de ce dernier (interface web,
    console,…).
-   `192.168.0.232` : indique l’adresse IP du périphérique.

Une telle commande retourne quelque chose de similaire à ce qui suit :

~~~
SNMPv2-MIB::sysDescr.0 = STRING: 3Com SuperStack 3
SNMPv2-MIB::sysObjectID.0 = OID: SNMPv2-SMI::enterprises.43.10.27.4.1.2.11
SNMPv2-MIB::sysUpTime.0 = Timeticks: (6550243) 18:11:42.43
SNMPv2-MIB::sysContact.0 = STRING: [email protected]
/*  */!function(){try{var t="currentScript"in document?document.currentScript:function(){for(var t=document.getElementsByTagName("script"),e=t.length;e--;)if(t[e].getAttribute("cf-hash"))return t[e]}();if(t&&t.previousSibling){var e,r,n,i,c=t.previousSibling,a=c.getAttribute("data-cfemail");if(a){for(e="",r=parseInt(a.substr(0,2),16),n=2;a.length-n;n+=2)i=parseInt(a.substr(n,2),16)^r,e+=String.fromCharCode(i);e=document.createTextNode(e),c.parentNode.replaceChild(e,c)}}}catch(u){}}();/*  */
SNMPv2-MIB::sysName.0 = STRING: switch
SNMPv2-MIB::sysLocation.0 = STRING: Ubuntu-fr
SNMPv2-MIB::sysServices.0 = INTEGER: 2
IF-MIB::ifNumber.0 = INTEGER: 34
[...]
IF-MIB::ifOperStatus.112 = INTEGER: up(1)
IF-MIB::ifOperStatus.113 = INTEGER: up(1)
IF-MIB::ifOperStatus.114 = INTEGER: down(2)
IF-MIB::ifOperStatus.115 = INTEGER: up(1)
IF-MIB::ifOperStatus.116 = INTEGER: up(1)
IF-MIB::ifOperStatus.117 = INTEGER: down(2)
IF-MIB::ifOperStatus.118 = INTEGER: up(1)
IF-MIB::ifOperStatus.119 = INTEGER: down(2)
IF-MIB::ifOperStatus.120 = INTEGER: down(2)
[...]
~~~

Cette liste peut être très longue et dépend du périphérique supervisé.
Vous constatez que les informations sont classées par MIB suivi du OID.

Dans l’exemple ci-dessus, nous avons
`IF-MIB::ifOperStatus.117 = INTEGER: down(2)`. Ce qui signifie que l’OID
`ifOperStatus.117` (qui correspond à l’état du port 17 du switch) est
repris dans la MIB `IF-MIB` (qui est une MIB standard). Cet OID (clé)
est associé à une valeur entière (type `INTEGER`) qui vaut 2 (qui
indique que l’état est `down`).

L’application `snmpwalk` peut également sortir les enfants d’un OID. Par
exemple :

~~~
snmpwalk -v1 -c private 192.168.0.232 IF-MIB::ifOperStatus
~~~

Nous fournira l’état de toutes les interfaces du switch.

### snmpget {#snmpget .sectionedit10}

Si vous avez compris le principe de `snmpwalk`, vous comprendrez très
rapidement comment fonctionne le `snmpget`. L’application `snmpget`
permet d’obtenir l’information concernant un OID précis. Reprenons notre
exemple, imaginons que nous voulons connaître uniquement l’état du port
22 du switch, il nous suffit d’entrer la commande suivante :

~~~
snmpget -v1 -c private 192.168.0.232 IF-MIB::ifOperStatus.122
~~~

Nous obtenons l’information précise :

~~~
IF-MIB::ifOperStatus.122 = INTEGER: up(1)
~~~

SNMP sur le wiki monitoring-fr {#snmp-sur-le-wiki-monitoring-fr .sectionedit11}
------------------------------

-   [OID](snmp/oid/start.html "supervision:snmp:oid:start")
    -   [Cisco SNMP
        OID](snmp/oid/oid-cisco.html "supervision:snmp:oid:oid-cisco")
    -   [Net-SNMP OID
        MIB](snmp/oid/oid-mib-net-snmp.html "supervision:snmp:oid:oid-mib-net-snmp")
    -   [Nortel SNMP
        OID](snmp/oid/oid-nortel.html "supervision:snmp:oid:oid-nortel")