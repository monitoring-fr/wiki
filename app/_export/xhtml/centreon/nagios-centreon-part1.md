---
layout: page
---

### Table des matières {.toggle}

-   [Nagios Centreon
    part1](nagios-centreon-part1.html#nagios-centreon-part1)
-   [Version utilisées dans cette
    documentation](nagios-centreon-part1.html#version-utilisees-dans-cette-documentation)
-   [Généralités](nagios-centreon-part1.html#generalites)
-   [Installation de
    Nagios](nagios-centreon-part1.html#installation-de-nagios)
    -   [Étapes d'installation de
        Nagios](nagios-centreon-part1.html#etapes-d-installation-de-nagios)
-   [Configuration de
    Nagios](nagios-centreon-part1.html#configuration-de-nagios)
    -   [Documentations](nagios-centreon-part1.html#documentations)
    -   [Supervision serveur avec le protocole SNMP sans installation
        d'agent](nagios-centreon-part1.html#supervision-serveur-avec-le-protocole-snmp-sans-installation-d-agent)
        -   [Convention de nom des communautés
            SNMP](nagios-centreon-part1.html#convention-de-nom-des-communautes-snmp)
        -   [Installer les plugins SNMP sur le
            serveur](nagios-centreon-part1.html#installer-les-plugins-snmp-sur-le-serveur)
        -   [Installer SNMP sous
            Windows](nagios-centreon-part1.html#installer-snmp-sous-windows)
        -   [Installer SNMP sous
            Linux](nagios-centreon-part1.html#installer-snmp-sous-linux)
        -   [Installer SNMP sous
            ESX](nagios-centreon-part1.html#installer-snmp-sous-esx)
    -   [Supervision routeur, switchs et borne
        wifi](nagios-centreon-part1.html#supervision-routeur-switchs-et-borne-wifi)
        -   [Activer SNMP sur les routeurs ou switchs
            CISCO](nagios-centreon-part1.html#activer-snmp-sur-les-routeurs-ou-switchs-cisco)
    -   [Éléments intéressants de l'interface web
        Nagios](nagios-centreon-part1.html#elements-interessants-de-l-interface-web-nagios)
-   [Extension Mozilla Firefox : Nagios
    Checker](nagios-centreon-part1.html#extension-mozilla-firefoxnagios-checker)
-   [NDOUtils](nagios-centreon-part1.html#ndoutils)
    -   [Pré-requis](nagios-centreon-part1.html#pre-requis)
    -   [Installation
        MySQL](nagios-centreon-part1.html#installation-mysql)
    -   [Configurer MySQL](nagios-centreon-part1.html#configurer-mysql)
    -   [Installer
        NDOUtils](nagios-centreon-part1.html#installer-ndoutils)
-   [Nagvis](nagios-centreon-part1.html#nagvis)
    -   [Pré-requis](nagios-centreon-part1.html#pre-requis1)
    -   [Configuration
        Nagvis](nagios-centreon-part1.html#configuration-nagvis)
        -   [Type de carte](nagios-centreon-part1.html#type-de-carte)

Nagios Centreon part1 {#nagios-centreon-part1 .sectionedit1}
=====================

**Documentation de mise en place de Nagios avec Centreon sur un même
serveur en RHEL avec une base de données MySQL et l’utilisation de
Nagvis pour certaines cartes.**

Version utilisées dans cette documentation {#version-utilisees-dans-cette-documentation .sectionedit2}
==========================================

-   Nagios 3.0.6
-   Centreon 2.0.2
-   RHEL 5.4
-   MySQL 5
-   NDOUtils 1.4 beta7
-   Nagvis 1.4

Généralités {#generalites .sectionedit3}
===========

Nagios (anciennement appelé Netsaint) est une application permettant la
surveillance système et réseau. Elle surveille les hôtes et services
spécifiés, alertant lorsque les systèmes vont mal et quand ils vont
mieux. C’est un logiciel libre sous licence GPL. C’est un programme
modulaire qui se décompose en trois parties :

-   Le moteur de l’application qui vient ordonnancer les tâches de
    supervision.
-   L’interface web, qui permet d’avoir une vue d’ensemble du système
    d’information et des possibles anomalies.
-   Les plugins, une centaine de mini programmes que l’on peut compléter
    en fonction des besoins de chacun pour superviser chaque service ou
    ressource disponible sur l’ensemble des ordinateurs ou éléments
    réseaux du SI.

Installation de Nagios {#installation-de-nagios .sectionedit4}
======================

Cf. documentation [Installation de
nagios](../../../nagios/mise-en-place-complete-nagios-sur-rhel-5.4/nagios-infrastructure-complete.html#installation-de-nagios "nagios:mise-en-place-complete-nagios-sur-rhel-5.4:nagios-infrastructure-complete")
pour installer Nagios. Pour la configuration avec Centreon, continuer
ensuite à suivre cette documentation.

Les RPM installés manuellement (fichier avec l’extension .rpm) sont à
récupérer sur les sites de création de paquets comme dagwieers.com,
rpm.pbone.net et rpmfind.net. Essayer d’obtenir la dernière version du
logiciel.

La totalité des paquets qui n’était pas présent dans les paquets fournit
avec le dépôt EPEL
([http://fedoraproject.org/wiki/EPEL](http://fedoraproject.org/wiki/EPEL "http://fedoraproject.org/wiki/EPEL"))
a été récupérée sur le site rpm.pbone.net. On ne peut pas installer
Nagios en faisant un `yum install nagios` car Nagios n’est pas intégré
par Red Hat dans Red Hat Network. Par contre avec le dépôt EPEL, Nagios
est présent mais en version 2. Or il est plus intéressant de disposer de
la dernière version car elle contient des améliorations importantes par
rapport à la 2 et Centreon 2 ne supporte que Nagios version 3.

Donc, pour l’installation, la méthode du dépôt EPEL, et des paquets RPM
récupérés manuellement sur Internet a été utilisée.

Remarque : remplacer les noms de paquets par les versions adéquates.
Récupérer le dossier nagios avec tout les RPM téléchargés avec WinSCP et
le positionner dans /root par exemple. Il faudra après installation
supprimer le dossier.

Étapes d'installation de Nagios {#etapes-d-installation-de-nagios .sectionedit5}
-------------------------------

Dépendances dont a besoin nagios pour fonctionner.

~~~
yum install httpd gcc glibc glibc-common gd gd-devel
yum install libtool-ltdl
~~~

Décommenter la directive ServerName du fichier
/etc/httpd/conf/httpd.conf.

Les deux paquets principaux de nagios.

~~~
rpm -ivh nagios-3.0.6-1.el5.rf.i386.rpm
rpm -ivh nagios-plugins-1.4.13-4.el5.i386.rpm
~~~

Deux dépendances nécessaires à net-snmp

~~~
yum install fping
yum install qstat
~~~

Installer les paquets SNMP suivants nécessaires au fonctionnement de
nagios avec SNMP. Essayer de les installer avec yum ou utiliser les
paquets téléchargés. Faire attention, certains paquets sont peut-être
déjà présent sur le système.

~~~
yum install net-snmp net-snmp-libs net-snmp-utils php-snmp
yum install nagios-plugins-all
~~~

~~~
vi /etc/nagios/objects/contacts.cfg
~~~

changer `nagioasadmin@localhost` par votre boite mail de supervision par
exemple.

Attribuer un mot de passe pour nagios.

~~~
passwd nagios
~~~

Créer le mot de passe de connexion à l’interface web de supervision.

~~~
htpasswd -c /etc/nagios/htpasswd.users nagiosadmin
~~~

C’est la même commande pour changer le mot de passe.

Redémarrer le service.

~~~
service httpd restart
~~~

Vérifier la syntaxe du fichier de configuration de nagios.

~~~
nagios -v /etc/nagios/nagios.cfg
~~~

Démarrer le service nagios.

~~~
/etc/init.d/nagios start
~~~

Vérifier qu’il est bien lancé.

~~~
ps -ef | grep nagios
~~~

Vérifier qu’il est lancé au démarrage de la machine.

~~~
chkconfig --list | grep nagi
~~~

Accéder à l’interface web de nagios.

~~~
http://serveur.domaine.local/nagios/
~~~

Entrer `nagiosadmin` et son mot de passe. On accède à l’interface de
nagios.

Configuration de Nagios {#configuration-de-nagios .sectionedit6}
=======================

Documentations {#documentations .sectionedit7}
--------------

-   [sources-nagios-centreon](http://wiki.monitoring-fr.org/powered/centreon/sources-nagios-centreon "powered:centreon:sources-nagios-centreon").

Supervision serveur avec le protocole SNMP sans installation d'agent {#supervision-serveur-avec-le-protocole-snmp-sans-installation-d-agent .sectionedit8}
--------------------------------------------------------------------

Cette partie est à lire uniquement si on a fait le choix d’utiliser SNMP
au lieu des agents installés sur les machines.

### Convention de nom des communautés SNMP {#convention-de-nom-des-communautes-snmp .sectionedit9}

Les communautés sont volontairement cachées pour des raisons de
sécurité.

-   srvcom : pour les serveurs Windows et Linux.
-   netcom : pour les routeurs, les switchs, les bornes wifi et les
    faisceaux hertziens…
-   secucom : pour les éléments de la baie sécurité sauf la console de
    management.

### Installer les plugins SNMP sur le serveur {#installer-les-plugins-snmp-sur-le-serveur .sectionedit10}

Afin de récolter les informations des systèmes, il est nécessaire
d’utiliser des plugins supplémentaires plus précis. Les plugins du site
manubulon
([http://nagios.manubulon.com](http://nagios.manubulon.com "http://nagios.manubulon.com"))
ont été utilisés. Un paquetage est à télécharger et à installer.

Installer les dépendances perl nécessaires.

~~~
yum install perl-Net-SNMP
~~~

Aller sur le site
[http://nagios.manubulon.com/](http://nagios.manubulon.com/ "http://nagios.manubulon.com/")
pour récupérez la liste de scripts suivante disponible sur le site dans
une archive.

~~~
check_snmp_boostedge.pl
check_snmp_cpfw.pl
check_snmp_css.pl
check_snmp_env.pl
check_snmp_int.pl
check_snmp_linkproof_nhr.pl
check_snmp_load.pl
check_snmp_mem.pl
check_snmp_nsbox.pl
check_snmp_process.pl
check_snmp_processus_loaded.pl
check_snmp_script_result.pl
check_snmp_storage.pl
check_snmp_vrrp.pl
check_snmp_win.pl
~~~

Positionner ces scripts dans le dossier `/usr/lib/nagios/plugins` et
leurs appliquer les droits.

~~~
chmod 755  check_snmp_*
~~~

Vous remarquerez qu’un script check\_snmp est déjà présent. Cependant,
il est un peu moins simple et précis à utiliser que les autres que nous
venons d’installer. On va tout de même s’en servir pour l’uptime des
systèmes par exemple.

Récupérer le script PERL nommé `check_snmp_netint.pl` développé par
William Leibzon et disponible à cette adresse :
[http://wleibzon.bol.ucla.edu/nagios/](http://wleibzon.bol.ucla.edu/nagios/ "http://wleibzon.bol.ucla.edu/nagios/").
Il a été créé à partir du script de Patrick Proy. Le positionner aussi
dans le dossier /usr/lib/nagios/plugins de manière manuelle.

~~~
cp /root/nagios-server/check_snmp_supp/check_snmp_netint.pl /usr/lib/nagios/plugins
~~~

Lui appliquer les droits.

~~~
chmod 755  check_snmp_netint.pl
~~~

et il est opérationnel.

Une fois cette opération réalisée, il faut créer les commandes avec les
paramètres qu’on passe pour que nous puissions utiliser ces commandes
dans la définition des services.

Les paramètres entre des Windows, des Linux ou des ESX sont différents,
pour contrer cela, une définition de commande par type de système a été
créée. On obtient les commandes suivantes.

~~~
check_win_storage
check_win_load
check_win_mem
...

check_lin_storage
check_lin_load
check_lin_mem
...
~~~

### Installer SNMP sous Windows {#installer-snmp-sous-windows .sectionedit11}

Cf. [installer activer
snmp](http://wiki.monitoring-fr.org/powered/centreon/installer-activer-snmp "powered:centreon:installer-activer-snmp").

### Installer SNMP sous Linux {#installer-snmp-sous-linux .sectionedit12}

Cf. [installer activer
snmp](http://wiki.monitoring-fr.org/powered/centreon/installer-activer-snmp "powered:centreon:installer-activer-snmp").

### Installer SNMP sous ESX {#installer-snmp-sous-esx .sectionedit13}

Cf. [installer activer
snmp](http://wiki.monitoring-fr.org/powered/centreon/installer-activer-snmp "powered:centreon:installer-activer-snmp").

Supervision routeur, switchs et borne wifi {#supervision-routeur-switchs-et-borne-wifi .sectionedit14}
------------------------------------------

### Activer SNMP sur les routeurs ou switchs CISCO {#activer-snmp-sur-les-routeurs-ou-switchs-cisco .sectionedit15}

Cf. [installer activer
snmp](http://wiki.monitoring-fr.org/powered/centreon/installer-activer-snmp "powered:centreon:installer-activer-snmp").

Éléments intéressants de l'interface web Nagios {#elements-interessants-de-l-interface-web-nagios .sectionedit16}
-----------------------------------------------

Entrer directement dans la barre de recherche le nom d’un élément. Cela
affiche les services associés à l’élément de manière concise. Sinon
chercher l’élément à travers la vue Hostgroup Overview. Il faut trouver
le groupe auquel il appartient et cliquer dessus. On arrive à la même
page avec la liste des services de l’hôte.

Lorsqu’on clique sur un service en particulier, il faut cliquer sur View
Status Detail For This Host afin de retourner à la vue de tous les
services de l’hôte.

Lorsqu’on sélectionne un service, on peut lui dire Re-schedule the next
check of this service et après commiter pour lui forcer le lancement du
check tout de suite et ne pas attendre.

Extension Mozilla Firefox : Nagios Checker {#extension-mozilla-firefoxnagios-checker .sectionedit17}
==========================================

Une extension du navigateur Mozilla Firefox permet de récupérer les
informations affichées par l’interface de Nagios. Cette extension
récupère les alertes et permet d’un simple clic d’accéder à la page
Nagios correspondant à l’élément en alerte.

Pour plus d’information se reporter à la documentation [Extension
Mozilla Firefox : Nagios
Checker](../../../nagios/mise-en-place-complete-nagios-sur-rhel-5.4/nagios-checker.html "nagios:mise-en-place-complete-nagios-sur-rhel-5.4:nagios-checker").

NDOUtils {#ndoutils .sectionedit18}
========

Pré-requis {#pre-requis .sectionedit19}
----------

Nagios et MySQL.

Installation MySQL {#installation-mysql .sectionedit20}
------------------

~~~
yum install mysql mysql-server
~~~

Configurer MySQL {#configurer-mysql .sectionedit21}
----------------

Commencer par créer un disque supplémentaire (ici de 12Go de taille)
afin d’isoler la base de données du système.

J’ai donc un point de montage `/data` qui pointe sur le deuxième disque
nouvellement ajouté.

J’ai supprimé le fichier `/etc/my.cnf` par défaut (copie de sauvegarde
au début quand même) et j’ai copié le fichier
`/usr/share/mysql/my-large.cnf` à la place

~~~
cp /usr/share/mysql/my-large.cnf /etc
~~~

Plusieurs gabarit sont fournit par défaut pour adapter la configuration
en fonction de la taille de la machine (`my-huge.cnf`, `my-large.cnf`,
`my-medium.cnf`,…).

Un dossier `/data/sgbd` a été créé pour remplacer le dossier par défaut
`/var/lib/mysql`

~~~
chown mysql:mysql /data/sgbd
~~~

Arrêter le serveur `/etc/init.d/mysqld stop` Supprimer le dossier
`/var/lib/mysql` Créer un lien symbolique nommé mysql dans `/var/lib`
qui pointe sur le dossier `/data/sgbd`

~~~
cd /var/lib
ln -s /data/sgbd mysql
~~~

Options modifiés de `my.cnf` en partant à l’origine de `my-large.cnf`

~~~
[client]
socket          = /data/sgbd/mysql.sock

# The MySQL server
[mysqld]
datadir         = /data/sgbd
socket          = /data/sgbd/mysql.sock

# Try number of CPU's*2 for thread_concurrency
thread_concurrency = 4
max_connections=200
~~~

Très important la directive qui active ou désactive les logs binaires de
MySQL. L’activation de ces logs est obligatoire dans les cas de serveur
maître et esclave ce qui n’est pas le cas pour nous. Les logs binaires
contiennent toutes les requêtes qui modifie la BD. Le problème est la
taille que prennent ces logs. On ne peut que les purger sur une durée
d’un jour ce qui n’est pas assez fin. La rotation est impossible ce qui
m’a conduit à les désactiver.

~~~
# binary logging - not required for slaves, but recommended
#log-bin=mysql-bin
~~~

Toujours dans la section mysqld, j’ai décommenté et modifié la
configuration concernant Innodb car c’est le type de table que nous
allons utiliser.

~~~
# Uncomment the following if you are using InnoDB tables
#innodb_data_home_dir = /data/sgbd/
#innodb_data_file_path = ibdata1:10M:autoextend

#innodb_log_group_home_dir = /data/sgbd/
#innodb_log_arch_dir = /data/sgbd/

# You can set .._buffer_pool_size up to 50 - 80 %
# of RAM but beware of setting memory usage too high
innodb_buffer_pool_size = 256M
innodb_additional_mem_pool_size = 20M
# Set .._log_file_size to 25 % of buffer pool size
innodb_log_file_size = 64M
#innodb_log_buffer_size = 8M
#innodb_flush_log_at_trx_commit = 1
#innodb_lock_wait_timeout = 50

# un fichier par table innodb
innodb_file_per_table

# Gestion des logs binaires (mysql-bin.0000X avec index mysql-bin.index)
#Default 1G = 1073741824
#150Mo * 1024 * 1024 = 157286400 octets
#60Mo * 1024 * 1024 = 62914560 octets

#max_binlog_size=62914560

#Default 4Go = 4294967295 octets
#1073741824 = 1Go
#max_binlog_cache_size=1073741824
#expire_logs_days=1
~~~

Redémarrer la base de données (`/etc/init.d/mysqld restart`) et lancer
le script de sécurisation qui permet au passage d’attribuer un mot de
passe à root.

~~~
[root@NOMSERVEUR mysql]# mysql_secure_installation
NOTE: RUNNING ALL PARTS OF THIS SCRIPT IS RECOMMENDED FOR ALL MySQL
      SERVERS IN PRODUCTION USE!  PLEASE READ EACH STEP CAREFULLY!

In order to log into MySQL to secure it, we'll need the current
password for the root user.  If you've just installed MySQL, and
you haven't set the root password yet, the password will be blank,
so you should just press enter here.

Enter current password for root (enter for none):
OK, successfully used password, moving on...

Setting the root password ensures that nobody can log into the MySQL
root user without the proper authorisation.

Set root password? [Y/n] Y
New password:
Re-enter new password:
Password updated successfully!
Reloading privilege tables..
 ... Success!


By default, a MySQL installation has an anonymous user, allowing anyone
to log into MySQL without having to have a user account created for
them.  This is intended only for testing, and to make the installation
go a bit smoother.  You should remove them before moving into a
production environment.

Remove anonymous users? [Y/n] Y
 ... Success!

Normally, root should only be allowed to connect from 'localhost'.  This
ensures that someone cannot guess at the root password from the network.

Disallow root login remotely? [Y/n] n
 ... skipping.

By default, MySQL comes with a database named 'test' that anyone can
access.  This is also intended only for testing, and should be removed
before moving into a production environment.

Remove test database and access to it? [Y/n] Y
 - Dropping test database...
 ... Success!
 - Removing privileges on test database...
 ... Success!

Reloading the privilege tables will ensure that all changes made so far
will take effect immediately.

Reload privilege tables now? [Y/n] Y
 ... Success!
Cleaning up...

All done!  If you've completed all of the above steps, your MySQL
installation should now be secure.

Thanks for using MySQL!
~~~

Installer NDOUtils {#installer-ndoutils .sectionedit22}
------------------

Installation des dépendances dont NDOUtils a besoin.

~~~
yum install postgresql
~~~

NDOUtils supporte la base de données PostgreSQL. Cette commande
n’installe pas PostgreSQL serveur, seulement le client.

Installer NDOUtils, il ne devrait pas demander d’autres dépendances.

~~~
rpm -ivh ndoutils-1.4-0.beta7.3.el5.rf.i386.rpm
~~~

~~~
cd /etc/nagios
chown nagios:nagios ndo2db.cfg ndomod.cfg
~~~

Nagvis {#nagvis .sectionedit23}
======

Pré-requis {#pre-requis1 .sectionedit24}
----------

-   MySQL
-   NDOUtils
-   Nagios
-   Un serveur Web (Apache) avec mod\_php, PHP minimum en version 5 et
    avec les modules php suivants.
    -   php
    -   php-gd
    -   php-mysql
    -   php5-mbstring
    -   php5-session
    -   php5-xml

-   Graphviz
    -   graphviz-2.22.2-1.el5.i386.rpm
    -   graphviz-doc-2.22.2-1.el5.i386.rpm
    -   graphviz-gd-2.22.2-1.el5.i386.rpm
    -   graphviz-graphs-2.22.2-1.el5.i386.rpm
    -   graphviz-guile-2.22.2-1.el5.i386.rpm
    -   graphviz-perl-2.22.2-1.el5.i386.rpm

On installe les modules PHP avec la commande yum.

~~~
yum install php php-gd php-mysql php-mbstring php-xml php-common
~~~

php-session n’est pas présent dans les dépôts, mais ce paquet est
compris dans le paquet php-common déjà installé normalement mais on le
remet pour être sûr.

Aller dans le dossier et installer graphviz via les rpm téléchargés. Il
est demandé une version supérieur à 2.14 de graphviz (pour Nagvis 1.4)
or dans le dépôt epel, ce sont les version 2.12 qui sont fournit.

~~~
rpm -ivh graphviz-2.22.2-1.el5.i386.rpm
rpm -ivh graphviz-doc-2.22.2-1.el5.i386.rpm
rpm -ivh graphviz-gd-2.22.2-1.el5.i386.rpm
rpm -ivh graphviz-graphs-2.22.2-1.el5.i386.rpm
rpm -ivh graphviz-perl-2.22.2-1.el5.i386.rpm
~~~

Redémarrer Apache pour prendre en compte les nouveaux modules.

Télécharger Nagvis (tar.gz) sur le site et positionner le dossier
décompressé dans `/usr/share/nagios/`.

~~~
tar zxvf navis-1.4.tar.gz
mv nagvis-1.4 /usr/share/nagios/nagvis
~~~

On a donc un dossier nommé `/usr/share/nagios/nagvis` qui contient
l’intégralité de Nagvis. Nagvis est une application web, il n’y a aucune
compilation à faire. C’est une succession de fichiers PHP à positionner
dans un répertoire.

Remarque Pour ce logiciel, j’ai utilisé directement les sources et non
le RPM car une nouvelle version venait de sortir (1.4), c’est une
application web donc qui ne demande pas de compilation et le rpm de la
version 1.3 demandait une dépendance mystérieuse nommée
rpmlib(PayloadIsLzma) que je n’ai jamais réussi à trouver. Pour
information le rpm ne fait ni plus ni moins de copier les fichiers dans
l’arborescence de fichiers, c’est tout.

Mettre en place le fichier de configuration principal.

~~~
cd /usr/share/nagios/nagvis/etc
cp nagvis.ini.php-sample nagvis.ini.php
~~~

Connaître l’utilisateur et le groupe du serveur web Apache sous Red Hat.

~~~
grep -e '^User' /etc/httpd/conf/*.conf
grep -e '^Group' /etc/httpd/conf/*.conf
~~~

Ceci est important pour ce qui suit : l’application des permissions sur
les dossiers.

Application des permissions sur le dossier nagvis (dossier qui contient
tout).

~~~
chown apache:apache /usr/share/nagios/nagvis -R
chmod 664 /usr/share/nagios/nagvis/etc/nagvis.ini.php
chmod 775 /usr/share/nagios/nagvis/nagvis/images/maps
chmod 664 /usr/share/nagios/nagvis/nagvis/images/maps/*
chmod 775 /usr/share/nagios/nagvis/etc/maps
chmod 664 /usr/share/nagios/nagvis/etc/maps/*
chmod 775 /usr/share/nagios/nagvis/var
chmod 664 /usr/share/nagios/nagvis/var/*
~~~

Accès à la page d’accueil qui liste les cartes définies.
[http://serveur.domaine.local/nagios/nagvis/nagvis/index.php](http://serveur.domaine.local/nagios/nagvis/nagvis/index.php "http://serveur.domaine.local/nagios/nagvis/nagvis/index.php")

La page d’accueil est aussi accessible à cette URL.
[http://serveur.domaine.local/nagios/nagvis/](http://serveur.domaine.local/nagios/nagvis/ "http://serveur.domaine.local/nagios/nagvis/")

Accès à la page de configuration web
[http://serveur.domaine.local/nagios/nagvis/config.php](http://serveur.domaine.local/nagios/nagvis/config.php "http://serveur.domaine.local/nagios/nagvis/config.php")

Configuration Nagvis {#configuration-nagvis .sectionedit25}
--------------------

Le fichier de configuration général est à l’origine une copie du fichier
example.

~~~
cd /usr/share/nagios/nagvis/etc/
cp nagvis.ini.php-sample nagvis.ini.php
~~~

Par défaut tout est en commentaire, Il faut simplement décommenter ce
dont on a besoin. Pour plus de clarté les sections en commentaires ne
sont pas représentées mais uniquement ce qui a été modifié.

~~~
vi /usr/share/nagios/nagvis/etc/nagvis.ini.php
~~~

~~~
[global]
dateformat="Y-m-d H:i:s"
language="fr_FR"
refreshtime=20

[paths]
base="/usr/share/nagios/nagvis/"
htmlbase="/nagios/nagvis"
htmlcgi="/nagios/cgi-bin"

[defaults]
backend="ndomy_1"

[index]

[automap]
defaultroot="NOMSERVEUR"

[wui]

[worker]


[backend_ndomy_1]
backendtype="ndomy"
dbhost="localhost"
dbport=3306
dbname="ndo"
dbuser="centreon"
dbpass="supervis8bd2"
dbprefix="nagios_"
dbinstancename="Central"
maxtimewithoutupdate=180
htmlcgi="/nagios/cgi-bin"

[backend_ndo2fs_1]

[backend_merlinmy_1]

[rotation_demo]
maps="demo,Demo2:demo2"
interval=15
~~~

### Type de carte {#type-de-carte .sectionedit26}

Pour la carte des serveurs, nous allons utiliser l’automap et pour la
carte des routeurs, on va utiliser une carte dédiée sur laquelle on va
positionner les éléments que l’on souhaite directement sur l’interface
web.

Pour que l’automap fonctionne, il faut mettre en place une relation de
dépendance entre les éléments au niveau de la configuration Nagios.
[http://nagios.sourceforge.net/docs/3\_0/networkreachability.html](http://nagios.sourceforge.net/docs/3_0/networkreachability.html "http://nagios.sourceforge.net/docs/3_0/networkreachability.html")

Concrètement, j’ai positionné tout les serveurs en tant que fils de
localhost (le serveur nagios). Pour cela, il faut utiliser la directive
parents qui permet de spécifier qu’un serveur dépend d’un autre ou d’un
élément réseau. Nagvis reproduit la hiérarchie Nagios ni plus ni moins.
Si on veut changer l’aspect hiérarchique, il faut changer la
configuration dans Nagios elle sera automatiquement reportée dans Nagvis
puisqu’il se base dessus.

~~~
/usr/share/nagios/nagvis/etc/maps/__automap.cfg
~~~

~~~
define global {
alias=Automap
allowed_user=EVERYONE
allowed_for_config=EVERYONE
iconset=std_small
map_image=nagvis-demo.png
hover_childs_sort=s
hover_childs_order=asc
}
~~~

Il n’y a rien d ‘autre à faire pour cette carte.

Pour la carte des routeurs, j’ai réutilisé un fichier de demo pour avoir
une base de départ.

~~~
cd /usr/share/nagios/nagvis/etc/maps
cp demo-map.cfg carte-routeur.cfg
~~~

On peut directement rafraîchir dans l’interface, la nouvelle carte est
directement accessible sans redémarrer aucun service.

Copier le fichier image de fond de carte de la Saône et Loire dans le
dossier des images dans le dossier suivant.

~~~
/usr/share/nagios/nagvis/nagvis/images/maps/dep_routeurs1024x768.png
~~~

Éditer la configuration de la carte.

~~~
vi /usr/share/nagios/nagvis/etc/maps/carte-routeur.cfg
~~~

Voici le début du fichier de configuration avec à la fin quelques hôtes
d’ajouté. Les hôtes sont automatiquement créé dans l’interface
graphique.

~~~
define global {
allowed_user=EVERYONE
allowed_for_config=EVERYONE
iconset=std_small
map_image=dep_routeurs1280x1024.png
label_show=1
label_x=-30
label_y=+20
label_border=#BBBBBB
label_background=transparent
}

define textbox {
text=[refresh_counter]
x=651
y=109
z=5
w=36
background_color=transparent
border_color=transparent
}

define host {
label_y=+17
label_x=-11
host_name=apa__charolles
x=468
y=611
z=3
}

define host {
label_y=+22
label_x=-21
host_name=uas_cluny
x=695
y=599
}
~~~

Changer le mot clé suivant dans la section global avec le nom de
l’image.

~~~
map_image=dep_routeurs1024x768.png
~~~

Plusieurs fichiers images ont été utilisés avec différentes résolutions
pour s’adapter aux tailles des écrans. Les images de tailles supérieures
ont été conservées. A l’origine, c’est la même image que celle utilisée
dans l’ancien serveur de supervision. Néanmoins la qualité est
meilleure. Je suis repartis du fichier source pour retailler les images.

La suite de cette documentation : [Nagios Centreon
part2](../../../centreon/nagios-centreon-part2.html "centreon:nagios-centreon-part2").
