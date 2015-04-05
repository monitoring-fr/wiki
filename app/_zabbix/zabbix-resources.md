---
layout: page
title: Ressources et performances de Zabbix
---

Page rédigée pour une version de Zabbix 1.8.2.

Sur cette page, nous allons préciser les différentes ressources que
Zabbix doit disposer afin de fonctionner correctement. Un descriptif des
performances de Zabbix est également présent, de manière à permettre une
meilleur estimation et compréhension des besoins.

Sources : site et wiki officiels de
[Zabbix](http://www.zabbix.com/ "http://www.zabbix.com/").

Cette page a été rédigée par :

  **Rôle**        **Nom**
  --------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------
  **Rédacteur**   [Ludovic VALENTIN](http://www.monitoring-fr.org/community/members/ludovic-valentin/ "http://www.monitoring-fr.org/community/members/ludovic-valentin/")

Matériels requis {#materiels-requis .sectionedit3}
----------------

Zabbix doit disposer d’une configuration matérielle minimum pour
fonctionner telle que celles-ci :

  **Ressource**       **Configuration minimale**   **Configuration conseillée**
  ------------------- ---------------------------- ------------------------------
  **Processeur**      Pentium                      Pentium IV
  **Mémoire RAM**     64 Mo                        256 Mo
  **Espace disque**   10 Mo                        100 Mo

### Processeur {#processeur .sectionedit5}

Zabbix et plus précisément la base de données nécessitent d’importantes
ressources du processeur. Ces besoins en ressources CPU dépendent du
nombre de paramètres supervisés, et du choix du SGBD, certains étant
plus gourmand que d’autres.

### Mémoires {#memoires .sectionedit6}

Pour fonctionner Zabbix a besoin dans un premier temps d’un espace
disque suffisant, et puis dans un second, d’une quantité de mémoire RAM
minimale. Comme pour le processeur, l’espace disque, tout comme la
mémoire RAM dépendent avant surtout du nombre de paramètres supervisés,
ces derniers engendrant plus ou moins d’informations à stocker dans la
base de données. En fonction de la durée de conservation de
l’historique, il peut être nécessaire de disposer de plusieurs Go de
stockage, bien que, pour commencer 128 Mo de RAM et 256 Mo d’espace
disque devraient pouvoir faire l’affaire.

Bien sûr, plus le serveur sur lequel sera installé Zabbix disposera de
mémoire RAM, plus rapide sera le traitement de la base de données (si la
base de données est en local, sur le même serveur que Zabbix).

### Autres matériels {#autres-materiels .sectionedit7}

D’autres équipements peuvent être ajoutés à un serveur Zabbix, afin
notamment de pouvoir gérer la notification par SMS, pour cela, il faut
avoir un port série (serial port) et un modem GSM (port série).

### Exemples de configurations matérielles {#exemples-de-configurations-materielles .sectionedit8}

Voici quelques exemples de configurations matérielles avec le nombre
d’hôtes supervisables correspondant :

  **Type**      **Plateforme**         **Processeur**         **Mémoire RAM**   **Hôtes**
  ------------- ---------------------- ---------------------- ----------------- -----------
  Petite        Ubuntu Linux           Pentium II             256 Mo            20
  Moyenne       Ubuntu Linux 64 bits   AMD Athlon 3200+       2 Go              500
  Grande        Ubuntu Linux 64 bits   Intel Dual Core 6400   4 Go              \>1000
  Très grande   RedHat Enterprise      Intel Xeon 2xCPU       8 Go              \>10000

Systèmes d'exploitation supportés {#systemes-d-exploitation-supportes .sectionedit10}
---------------------------------

Zabbix est développé pour fonctionner sur de nombreuses plateformes
différentes :

  **Plateforme**        **ZABBIX Server \***   **ZABBIX Agent**
  --------------------- ---------------------- ------------------
  **AIX**               Supporté               Supporté
  **FreeBSD**           Supporté               Supporté
  **HP-UX**             Supporté               Supporté
  **Linux**             Supporté               Supporté
  **Mac OS X**          Supporté               Supporté
  **Novell Netware**    -                      Supporté
  **Open BSD**          Supporté               Supporté
  **SCO Open Server**   Supporté               Supporté
  **Solaris**           Supporté               Supporté
  **Tru64/OSF**         Supporté               Supporté
  **Windows**           -                      Supporté

**\*** Zabbix Frontend et Proxy inclus.

Logiciels requis {#logiciels-requis .sectionedit12}
----------------

Pour fonctionner, Zabbix a besoin de plusieurs applications essentielles
:

  **Composant**      **Logiciel**          **Version**            **Description**
  ------------------ --------------------- ---------------------- ---------------------------------------------------------------------------------------------------------------------------------
  **Frontend**       Apache                1.3.12 ou supérieure   Serveur Web
  **Frontend**       PHP                   5.0 ou supérieure      Support PHP
  **Frontend**       Modules PHP           -                      php-gd (2.0 ou supérieure), php truetype, bc, XML, session, socket, multibyte support, php-mysql/php-oci8/php-pgsql/php-sqlite3
  **Server/Proxy**   OpenIPMI              -                      Support IPMI
  **Server/Proxy**   snmp                  -                      Support SNMP
  **Server/Proxy**   libssh2               -                      Support SSH
  **Client**         Navigateur internet   -                      Mozilla Firefox, Microsoft Internet Explorer, Opera, Konqueror

Bases de données {#bases-de-donnees .sectionedit14}
----------------

### SGBD supportés {#sgbd-supportes .sectionedit15}

Afin de stocker l’ensemble de ses données, Zabbix doit pouvoir se
connecter à une base de données. Il existe 4 serveurs de bases de
données (ou SGBD) compatibles pour les composants Zabbix Server et
Zabbix Proxy :

-   Oracle
-   MySQL
-   PostgreSQL
-   SQLite

### Volumétrie {#volumetrie .sectionedit16}

Tout comme la configuration matérielle, la taille de la base de données
Zabbix dépend de plusieurs facteurs, ces derniers étant responsables du
volume d’historiques à stocker dans une base de données, ils jouent donc
un rôle essentiel dans le choix de l’espace disque minimum nécessaire
pour le fonctionnement de l’application de supervision.

#### Nombre de valeurs traitées par seconde {#nombre-de-valeurs-traitees-par-seconde}

Le nombre de valeurs traitées par seconde correspond au nombre de
nouvelles valeurs reçues par le Zabbix Server toutes les secondes.

***Formule* :**

Ce nombre peut être calculé grâce à cette formule :

**(nombre d’items)/(intervalle de mises à jour des items)**

Unités :

-   intervalle de mises à jour des items : en seconde

***Exemple* :**

Voici un exemple, pour un nombre de 3000 items avec un intervalle de
mise à jour de 60 secondes :

items/intervalle = 3000/500 = 50

Dans cet exemple, le nombre de valeurs traitées par seconde est donc de
50.

#### Durée de conservation des historiques {#duree-de-conservation-des-historiques}

Zabbix conserve les valeurs sur une durée plus ou moins longue
(jours/semaine/mois). Chacun de ses valeurs conservées occupe une
certaine place sur le disque dur, dans la base de données.

***Formule* :**

Afin de déterminer l’espace disque nécessaire, selon la durée de
conservation des historiques désirée, il faut utiliser ce calcul pour
déterminer dans un premier temps le nombre de valeurs sur la durée :

**jours\*(nombre de valeurs traitées par seconde)**

Unités :

-   jours : en seconde

Ensuite, dans un second temps, il faut déterminer la taille de toutes
ces valeurs sur le disque dur :

**(nombre total de valeurs)\*(taille moyenne d’une valeur)**

Unités :

-   taille moyenne d’une valeur : en octet

***Exemple* :**

Dans un cas concret, en reprenant le nombre de valeurs déterminées dans
l’exemple de la partie précédente (3.4.2.1), et si l’on part du principe
que l’on souhaite conserver les historiques sur une durée de 30 jours,
et que l’on a donc 50 nouvelles valeurs par seconde :

jours\*(nombre de valeurs traitées par seconde) = (30\*24\*3600)\*50 =
129600000

Ainsi, le nombre de valeurs conservées sur une durée de 30 jours est de
129600000.

Maintenant, il reste à calculer la taille que vont occuper ces 129600000
valeurs sur le disque dur pour une durée de conservation de 30 jours, en
sachant, qu’en moyenne la taille d’une valeur est d’environ 50 octets :

(nombre total de valeurs)\*(taille moyenne d’une valeur) = 129600000\*50
= 6,5 Go

Pour conclure, la conservation des historiques sur une durée de 30
jours, avec 50 nouvelles valeurs par seconde, nécessite un espace disque
d’au moins 6,5 Go.

#### Durée de conservation des tendances (trends) {#duree-de-conservation-des-tendances-trends}

Zabbix conserve les statistiques (max/min/moyenne/nombre) de tous les
items par tranche d’une heure, ce qui lui permet ensuite d’établir des
graphiques sur de plus ou moins longues périodes des tendances pour
chaque item.

***Formule* :**

Pour calculer l’espace disque nécessaire à la conservation de ces
données sur une période :

**jours\*(nombre d’items/1800)\*(taille d’une valeur)**

Unités :

-   jours : en seconde
-   taille d’une valeur : en octet

***Exemple* :**

Par exemple, la taille d’une valeur de type « tendance » est en général
de 128 octets, si l’on veut les conserver sur une période de 5 ans, en
ayant 3000 items :

jours\*(items/1800)\*(taille d’une valeur) =
(365\*24\*3600\*5)\*(3000/1800)\*128 = 31,5 Go

Avec une durée de conservation de 5 ans pour 3000 items, il faut un
espace disque d’au moins 31,5 Go pour stocker toutes les données de type
« tendance ».

#### Durée de conservation des évènements (events) {#duree-de-conservation-des-evenements-events}

Après les historiques, les tendances, Zabbix conserve également les
évènements. Hors, Zabbix peut générer un grand nombre d’évènements par
jour, avec pour chacun en moyenne une taille de 130 octets sur le disque
dur, il faut donc prévoir un espace disque adapté.

***Formule* :**

Cet espace disque peut être calculé grâce à cette formule :

**jours\*(nombre d’évènements par seconde)\*(taille d’un évènement)**

Unités :

-   jours : en seconde
-   taille d’un évènement : en octet

***Exemple* :**

Voici un exemple, dans lequel, on considère que la taille d’un évènement
est de 130 octets, et que Zabbix génère en moyenne 1 évènement par
seconde. De plus, les évènements sont conservés pour une période de 3
ans :

jours\*évènements\*taille = (365\*24\*3600\*3)\*1\*130 = 11 Go

Sur une durée de 3 ans, il faut donc 11 Go d’espace disque pour stocker
l’ensemble des évènements générés par Zabbix.

#### Autre

La taille du fichier de configuration de Zabbix ne dépasse pas
normalement les 10 Mo.

#### Conclusion

La taille totale d’espace disque requise est tout simplement la somme de
tous les résultats des formules précédentes, à savoir :

**configuration+historiques+tendances+évènements**