---
layout: page
title: Intégrer Nagvis dans Centreon
---

Introduction {#introduction .sectionedit2}
------------

Une demande récurrente des SI souhaitant intégrer à la fois Centreon et
Nagvis est la possibilité de posséder une console unique (et une
authentification unique) pour ces deux outils. C’est l’objectif que
remplit le module centreon-nagvis.

Centreon-nagvis n’est pas une alternative à la solution Centreon Maps de
Merethis car il ne permet pas de gérer les ACL au niveau objet et ne
propose pas l’ensemble des fonctionnalités de Centreon Maps. Il permet
néanmoins d’intégrer Nagvis au sein de Centreon, de gérer les ACL au
niveau carte et propose également un système d’authentification et
d’autorisation unifié (une fois que vous êtes authentifié dans centreon
vous l’êtes également dans nagvis).

Cette intégration a demandé le développement de :

-   Un module centreon permettant d’afficher Nagvis dans Centreon et de
    paramétrer le module
-   Un module Nagvis permettant de stocker les données de configuration
    Nagvis dans une base mysql (Nagvis stocke par défaut ses données
    dans une base sqlite)
-   Un module Nagvis permettant de partager l’authentification avec
    Centreon
-   Un module Nagvis permettant des gérer les accès au cartes

Récupération des sources {#recuperation-des-sources .sectionedit3}
------------------------

Les sources du module sont disponible dans la forge monitoring-fr et
bientôt dans la forge communautaire de centreon.

Dernière version : centreon-nagvis-2.2b disponible à cette url :
[http://forge.monitoring-fr.org/attachments/download/34/centreon-nagvis-2.2b.tar.gz](http://forge.monitoring-fr.org/attachments/download/34/centreon-nagvis-2.2b.tar.gz "http://forge.monitoring-fr.org/attachments/download/34/centreon-nagvis-2.2b.tar.gz")

Prérequis {#prerequis .sectionedit4}
---------

-   Une installation de Nagios et de Centreon fonctionnelle
-   curl
-   wget
-   patch
-   php5-gd
-   php5-gettext
-   php5-mbstring
-   php5-session
-   php5-pdo and pdo-sqlite
-   php5-mysql
-   graphviz

### RedHat/Centos/Centreon Enterprise Server {#redhatcentoscentreon-enterprise-server .sectionedit5}

~~~
yum install php-gd php-gettext php-mbstring php-session php-pdo sqlite php-mysql patch
~~~

ATTENTION : pour certaines versions de CentOS une erreur peut apparaitre

~~~
php53-common conflicts with php-common
<code>

Solution :
- Installation des EPEL et IUS
<code>
Avec les *** à remplacer selon votre cas (voir http://dl.iuscommunity.org/pub/ius/stable/Redhat/5/)
rpm -Uvh http://dl.iuscommunity.org/pub/ius/stable/Redhat/5/****/epel-release-***.noarch.rpm
rpm -Uvh http://dl.iuscommunity.org/pub/ius/stable/Redhat/5/****/ius-release-***.ius.el5.noarch.rpm
rpm --import /etc/pki/rpm-gpg/RPM-GPG-KEY-EPEL
rpm --import /etc/pki/rpm-gpg/IUS-COMMUNITY-GPG-KEY
~~~

- Remplacement de php par php53u

~~~
yum install yum-plugin-replace
yum replace php --replace-with php53u
yum install php-gd php-gettext php-mbstring php-session php-pdo sqlite php-mysql patch
~~~

- Installation des packages nécessaires (incluant graphviz)

~~~
yum install php53u-gd php53u-gettext php53u-mbstring php53u-session php53u-pdo sqlite php53u-mysql patch graphviz
~~~

-   Pour graphviz, vous devez utiliser EPEL ou RPMFORGE
    ([http://fedoraproject.org/wiki/EPEL](http://fedoraproject.org/wiki/EPEL "http://fedoraproject.org/wiki/EPEL"))
    :

~~~
# pour une version 5 en 64 bits ce sera : 
wget http://download.fedoraproject.org/pub/epel/5/i386/epel-release-5-4.noarch.rpm
rpm -Uvh epel-release-5-4.noarch.rpm
~~~

Installation {#installation .sectionedit6}
------------

### Introduction {#introduction1 .sectionedit7}

Vous pouvez installer le module de deux manières :

-   manuellement : il faut alors se reporter au fichier README contenu
    dans l’archive
-   par un script d’installation, c’est ce qui va être documenté ici.

Le script est nommé setup.sh (oui oui c’est pas très original). Il doit
être lancé avec les privilèges root (ou équivalent avec sudo). il
accepte trois paramètres différents :

-   setup.sh -c : va vérifier si une installation précédente existe
-   setup.sh -i : va installer le module (ainsi que nagvis)
-   setup.sh -d : va supprimer le module

**Le fichier setup.conf doit être paramétré AVANT toute installation.**

### Fichiers de configuration déjà paramétré {#fichiers-de-configuration-deja-parametre .sectionedit8}

#### Centreon Enterprise Server 2

Vous devez absolument positionner un mot de passe pour l’utilisateur
root et le renseigner dans ce modèle de configuration (MYSQLPASSWD)

~~~ {.code .sql}
mysql> GRANT ALL privileges ON *.* TO 'root'@'localhost' IDENTIFIED BY 'monmotdepasse';
Query OK, 0 rows affected (0.10 sec)
 
mysql> FLUSH privileges;
Query OK, 0 rows affected (0.02 sec)
~~~

A partir de Centreon 2.3, il est nécessaire d’installer le broker NDO
non patché et donc de reprendre l’officiel. Ou la version patchée
disponible sur le SVN de Centreon.

~~~ {.code .bash}
#!/bin/bash
TMP="/tmp"
 
MODULE_NAME="nagvis"
 
LOCALMACHINE=$(hostname -s)
 
HTTPD_USER="apache"
HTTPD_GROUP="apache"
HTTPD_CONF="/etc/httpd/conf.d"
HTTPD_INIT="/etc/init.d/httpd"
 
CENTREON_WWW="/usr/share/centreon/www"
CENTREON_ETC="/etc/centreon"
NAGVIS_PATH="/opt/nagvis"
CENTREONURI="http://localhost/centreon"
CENTREONU="admin"
CENTREONP="centreon"
 
NAGVISBRANCH="1.5"
NAGVISVER="${NAGVISBRANCH}.9"
NAGVISDL="http://downloads.sourceforge.net/project/nagvis/NagVis%20$NAGVISBRANCH/nagvis-$NAGVISVER.tar.gz"
NAGVISPATH="/opt/nagvis"
NAGVISURI="/nagvis"
 
NAGVISBACKENDS="ndo2db"
NAGVISNDO="/usr/sbin/ndo2db"
NAGVISLIVE=""
 
ENGINE="Nagios"
ENGINEPATH="/usr/lib/nagios"
ENGINEBIN="/usr/sbin/nagios"
GRAPHVIZBIN="/usr/bin"
 
MYSQLUSER="root"
MYSQLPASSWD="manager"
MYSQLHOST="localhost"
MYSQLPORT="3306"
CENTREONDB="centreon"
CENTREONUSER="centreon"
CENTREONPASSWD=$(cat $CENTREON_ETC/conf.pm | grep "mysql_passwd" | awk -F = '{print $2}' | sed -e "s/^ //g" -e "s/\"//g" -e "s/;$//g")
CENTSTATUSDB="centstatus"
NAGVISDB="nagvis"
NAGVISUSER="nagvis"
NAGVISPASS="$CENTREONPASSWD"
INSTANCE="Central"
 
 
 
# DO NOT MODIFY HERE !
 
sqlmoduleconf="USE $CENTREONDB;
INSERT INTO options (\`key\`,\`value\`) VALUES ('centreon-nagvis-db-password','$NAGVISPASS');
INSERT INTO options (\`key\`,\`value\`) VALUES ('centreon-nagvis-db-user','$NAGVISUSER');
INSERT INTO options (\`key\`,\`value\`) VALUES ('centreon-nagvis-db-name','$NAGVISDB');
INSERT INTO options (\`key\`,\`value\`) VALUES ('centreon-nagvis-db-port','$MYSQLPORT');
INSERT INTO options (\`key\`,\`value\`) VALUES ('centreon-nagvis-db-host','$MYSQLHOST');"
 
sqlclean="DROP TABLE IF EXISTS $CENTREONDB.centreonnagvis; DROP DATABASE IF EXISTS $NAGVISDB;"
 
sqlcentreon="use $CENTREONDB; CREATE TABLE  centreonnagvis  ( acl_group_id  int(10) NOT NULL, roleId  int(10) NOT NULL) ENGINE=MyISAM DEFAULT CHARSET=latin1;"
 
sqlacl="GRANT SELECT on $CENTREONDB.centreonnagvis to '$NAGVISUSER'@'$LOCALMACHINE';
GRANT ALL PRIVILEGES ON \`$NAGVISDB\`.* to '$NAGVISUSER'@'$LOCALMACHINE' identified by '$NAGVISPASS';
GRANT SELECT on $CENTREONDB.acl_groups to '$NAGVISUSER'@'$LOCALMACHINE';
GRANT SELECT on $CENTREONDB.session to '$NAGVISUSER'@'$LOCALMACHINE';
GRANT SELECT on $CENTREONDB.acl_group_contacts_relations to '$NAGVISUSER'@'$LOCALMACHINE';
GRANT SELECT on $CENTREONDB.contact to '$NAGVISUSER'@'$LOCALMACHINE';
GRANT SELECT on \`$NAGVISDB\`.roles to '$CENTREONUSER'@'$LOCALMACHINE';
FLUSH PRIVILEGES;"
 
sqlnagvisdb="CREATE DATABASE IF NOT EXISTS $NAGVISDB  DEFAULT CHARACTER SET latin1 ;
USE  $NAGVISDB ;
DROP TABLE IF EXISTS  perms ;
CREATE TABLE  perms  (
   permId  int(10) NOT NULL AUTO_INCREMENT,
   \`mod\`  varchar(100) DEFAULT NULL,
   \`act\`  varchar(100) DEFAULT NULL,
   \`obj\`  varchar(100) DEFAULT NULL,
  PRIMARY KEY ( permId ),
  UNIQUE KEY  permId  ( \`mod\` , \`act\` , \`obj\` )
) ENGINE=MyISAM AUTO_INCREMENT=150 DEFAULT CHARSET=latin1;
 
DROP TABLE IF EXISTS  roles ;
CREATE TABLE  roles  (
   roleId  int(10) NOT NULL AUTO_INCREMENT,
   name  varchar(100) DEFAULT NULL,
  PRIMARY KEY ( roleId ),
  UNIQUE KEY  roleId  ( name )
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
 
DROP TABLE IF EXISTS  roles2perms ;
CREATE TABLE  roles2perms  (
   roleId  int(10) DEFAULT NULL,
   permId  int(10) DEFAULT NULL,
  UNIQUE KEY  roleId  ( roleId , permId )
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
 
DROP TABLE IF EXISTS  users ;
CREATE TABLE  users  (
   userId  int(10) NOT NULL AUTO_INCREMENT,
   name  varchar(100) DEFAULT NULL,
   password  varchar(40) DEFAULT NULL,
  PRIMARY KEY ( userId ),
  UNIQUE KEY  userId  ( name )
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
 
DROP TABLE IF EXISTS  users2roles ;
CREATE TABLE  users2roles  (
   userId  int(10) DEFAULT NULL,
   roleId  int(10) DEFAULT NULL,
  UNIQUE KEY  userId  ( userId , roleId )
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
 
DROP TABLE IF EXISTS  version ;
CREATE TABLE  version  (
   version  varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY ( version )
) ENGINE=MyISAM DEFAULT CHARSET=latin1;"
~~~

### Paramètres de configuration {#parametres-de-configuration .sectionedit9}

  PARAMÈTRE        COMMENTAIRE
  ---------------- ----------------------------------------------------------------------------------------------------------------
  HTTPD\_USER      Utilisateur apache (peut être httpd sous redhat)
  HTTPD\_GROUP     groupe apache (peut être httpd sous redhat)
  HTTPD\_CONF      Chemin d’accés aux fichier de configuration pour le vhost par défaut de apache (sous redhat /etc/httpd/conf.d)
  HTTPD\_INIT      Script de démarage de apache (sous redhat c’est /etc/init.d/httpd)
  CENTREON\_BASE   répertoire d’installation de centreon (peut être également /usr/local/centreon)
  CENTREONU        Utilisateur admin de centreon
  CENTREONP        Mot de passe de l’utilisateur admin de centreon
  NAGVISPATH       Chemin d’installation de nagvis
  MYSQLUSER        utilisateur root mysql
  MYSQLPASSWD      mot de passe de l’utilisateur root
  MYSQLHOST        Serveur mysql
  MYSQLPORT        Port TCP d’accès au serveur mysql
  CENTREONUSER     Utilisateur mysql pour les bases centreon, centstatus et centstorage
  CENTREONPASSWD   Mot de passe de CENTREONUSER
  NAGVISUSER       Utilisateur pour la base mysql nagvis
  NAGVISPASS       mot de passe \$NAGVISUSER

\* **Vous ne devriez pas avoir besoin de toucher à cela :**

PARAMÈTRE

COMMENTAIRE

TMP

Un repertoire temporaire ou seront extraite les archives

MODULE\_NAME

Nom du modules

LOCALMACHINE

Nom de l’hôte local (eventuellement vous pouvez le modifier manuellement
par localhost si votre serveur mysql n’est pas distant

CENTREONURI

Url d’accès a centreon (du point de vue du serveur centreon)

CENTREON\_WWW

répertoire correspondant à l’application web centreon

CENTREON\_ETC

répertoire ou sont stockés les fichiers de configuration de centreon

NAGVISBRANCH

Branche nagvis sur sourceforge

NAGVISVER

release de la branche nagvis

NAGVISDL

url de téléchargement de nagvis

NAGVISURI

NAGVISBACKENDS

NAGVISNDO

ENGINE

ENGINEPATH

ENGINEBIN

GRAPHVIZBIN

INSTANCE

CENTREONDB

Base de donnée centreon

CENTSTATUSDB

NAGVISDB

Après installation {#apres-installation .sectionedit12}
------------------

le module centreon nagvis s’appuie sur un couplage entre les groupe
d’ACL centreon et les rôles nagvis. On peut ainsi avoir une limitation
des cartes visibles par un utilisateur Centreon.

A l’installation rien n’est paramétré. Nous allons voir comment
paramétrer centreon et nagvis afin d’obtenir les ACL nécessaires à la
consultation des cartes. A terme il sera possible de donner accès à
nagvis simplement en affectant un contact centreon à un groupe de
contacts spécifique.

Dans centreon :

-   créer un groupe de contact cgnagvisreadonly
-   créer un groupe d’accès agnagvisreadonly et lier le groupe de
    contact cgnagvisreadonly à celui ci.
-   Créer un accès au menus managvisreadonly et lier le groupe d’accès
    agnagvisreadonly à celui ci. Dans les pages accessibles, dérouler
    views et cocher nagvis
-   Editer Toutes les ressources dans Accès aux ressource et ajouter le
    groupe d’accès agnagvisreadonly
-   créer un contact nagvis (ou autre) faisant parti du groupe de
    contact cgnagvisreadonly et le lier également au groupe d’accès
    agnagvisreadonly.
-   Aller dans Configuration → nagvis → ACL et selectionner dans la
    première liste : agnagvisreadonly et dans la seconde : users
    (read-only) puis cliquer sur le bouton “set mapping” et sauvegarder.
-   Il ne reste plus qu’a tester

Dans cet exemple l’utilisateur n’a accès qu’aux cartes Nagvis et rien
d’autre. Il faudra combiner cela avec le reste des droits à positionner
pour obtenir un affichage complet de centreon.

L’accès à nagvis seul se fait avec les utilisateur et mots de passe par
défaut (nagiosadmin/nagiosadmin). Pensez à les modifier !