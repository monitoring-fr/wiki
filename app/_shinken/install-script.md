---
layout: page
title: Installation de Shinken par script
---

Attention : il est recommandé de n’utiliser que des distribution sur
architecture 64bits. Apparemment le support des architectures 32bits
pose problème (un correctif est en cours)

Pour la version 1.0, Shinken se dote d’un script d’installation
simplifié. Il prend en charge les fonctionnalités suivantes :

-   Installation et suppression de shinken
-   Sauvegarde et restauration de la configuration, des plugins et des
    logs
-   Compression des logs
-   Installation de plugins
-   Installation d’addons

Support des distributions linux {#support-des-distributions-linux .sectionedit2}
-------------------------------

Le script prend en charge les distributions basées sur Debian (Debian 6
/ Ubuntu \>= 10.04) et Redhat/Centos (5.5 et 6.x). Un support de Suse
Linux Enterprise Server est en cours d’implémentation

Prérequis {#prerequis .sectionedit3}
---------

Le nom du script “install” est peut être mal choisit car il effectue
bien d’autre choses que les phases d’installation. Il est prévu de le
scinder en plusieurs parties dans de futures versions.

Bien que prenant en charge l’ensemble des prérequis de shinken, le
script aura besoin au minimum de git (si vous voulez télécharger la
version de développement et de la commande lsb\_release). Si
lsb\_release n’est pas présent, un message vous préviendra et
l’installation sera annulée.

Installation de shinken {#installation-de-shinken .sectionedit4}
-----------------------

Comment se passe une installation de shinken ? Prenons l’exemple sur une
Debian 6 :

Il faut d’abord installer Git pour récupérer les sources :

~~~
apt-get install git-core
~~~

Ensuite cloner le dépôt de Shinken :

~~~
git clone https://github.com/naparuba/shinken.git
~~~

Et enfin, se déplacer dans le répertoir des sources et exécuter le
script d’installation :

La rétention est activée par défaut. Si vous voulez activer la rétention
en base mongodb pour le scheduler, il suffit de positionner la variable
d’environnement RETENTIONMODULE=mongo. Cela est utile en environnement
hautement disponible. Il faut donc posséder un serveur mongo, mais cela
est également géré par le script

~~~
./install -p mongodb
RETENTIONMODULE=mongo ./install -i
~~~

~~~
./install -i
+--------------------------------------------------------------------------------
| Verifying compatible distros
+--------------------------------------------------------------------------------
 > Found DEBIAN
 > Version checking for Debian is not needed
+--------------------------------------------------------------------------------
| Checking for existing installation
+--------------------------------------------------------------------------------
+--------------------------------------------------------------------------------
| Checking prerequisite
+--------------------------------------------------------------------------------
 > Checking for wget : OK
 > Checking for sed : OK
 > Checking for awk : OK
 > Checking for grep : OK
 > Checking for python : OK
 > Checking for bash : OK
 > Installing build-essential
 > Package libperl-dev allready installed
 > Package python-setuptools allready installed
 > Package libsqlite3-dev allready installed
 > Installing python-dev
 > Package pyro allready installed
 > Package sqlite3 allready installed
 > Package nmap allready installed
 > Package unzip allready installed
 > Module paramiko (paramiko) not found. Installing...
....
~~~

Installation des plugins nagios {#installation-des-plugins-nagios .sectionedit5}
-------------------------------

~~~
./install -p nagios-plugins
+--------------------------------------------------------------------------------
| Install nagios plugins
+--------------------------------------------------------------------------------
 > installing prerequisites
 > Extract archive content
 > Configure source tree
 > Building ....
 > Installing
~~~

Installation des plugins snmp de manubulon {#installation-des-plugins-snmp-de-manubulon .sectionedit6}
------------------------------------------

~~~
./install -p manubulon
+--------------------------------------------------------------------------------
| Install manubulon plugins
+--------------------------------------------------------------------------------
 > Installing prerequisites
 > Extract archive content 
 > Relocate libs
 => Processing /tmp/nagios_plugins/check_snmp_boostedge.pl
 => Installing /tmp/nagios_plugins/check_snmp_boostedge.pl
 => Processing /tmp/nagios_plugins/check_snmp_cpfw.pl
 => Installing /tmp/nagios_plugins/check_snmp_cpfw.pl
 => Processing /tmp/nagios_plugins/check_snmp_css_main.pl
 => Installing /tmp/nagios_plugins/check_snmp_css_main.pl
 => Processing /tmp/nagios_plugins/check_snmp_css.pl
 => Installing /tmp/nagios_plugins/check_snmp_css.pl
 => Processing /tmp/nagios_plugins/check_snmp_env.pl
 => Installing /tmp/nagios_plugins/check_snmp_env.pl
 => Processing /tmp/nagios_plugins/check_snmp_int.pl
 => Installing /tmp/nagios_plugins/check_snmp_int.pl
 => Processing /tmp/nagios_plugins/check_snmp_linkproof_nhr.pl
 => Installing /tmp/nagios_plugins/check_snmp_linkproof_nhr.pl
 => Processing /tmp/nagios_plugins/check_snmp_load.pl
 => Installing /tmp/nagios_plugins/check_snmp_load.pl
 => Processing /tmp/nagios_plugins/check_snmp_mem.pl
 => Installing /tmp/nagios_plugins/check_snmp_mem.pl
 => Processing /tmp/nagios_plugins/check_snmp_nsbox.pl
 => Installing /tmp/nagios_plugins/check_snmp_nsbox.pl
 => Processing /tmp/nagios_plugins/check_snmp_process.pl
 => Installing /tmp/nagios_plugins/check_snmp_process.pl
 => Processing /tmp/nagios_plugins/check_snmp_storage.pl
 => Installing /tmp/nagios_plugins/check_snmp_storage.pl
 => Processing /tmp/nagios_plugins/check_snmp_vrrp.pl
 => Installing /tmp/nagios_plugins/check_snmp_vrrp.pl
 => Processing /tmp/nagios_plugins/check_snmp_win.pl
 => Installing /tmp/nagios_plugins/check_snmp_win.pl
~~~

Installation des addons {#installation-des-addons .sectionedit7}
-----------------------

### pnp4nagios {#pnp4nagios .sectionedit8}

~~~
./install -p pnp4nagios
+--------------------------------------------------------------------------------
| Install pnp4nagios addon
+--------------------------------------------------------------------------------
 > Installing prerequisites
 > Extracting archive
 > Configuring source tree
 > Building ....
 > Installing
 > fix htpasswd.users path
 > Enable npcdmod
~~~

### Check\_mk multisite {#check_mk-multisite .sectionedit9}

~~~
./install -p multisite
+--------------------------------------------------------------------------------
| Install check_mk addon
+--------------------------------------------------------------------------------
 > configure response file
 > Installing prerequisites
 -> Installing libapache2-mod-python
 > Extracting archive
 > install multisite
 > default configuration for multisite
 > Fix www-data group
 > Enable sudoers commands for check_mk
~~~

Finalisation {#finalisation .sectionedit10}
------------

Cela est fait automatiquement par la dernière version du script

Nous allons finaliser en démarrant **shinken**, le démon **npcd** et
redémarrer **apache**.

~~~
/etc/init.d/shinken start
/etc/init.d/npcd start
/etc/init.d/apache2 restart
~~~

Vous possédez maintenant une interface innovante pour Shinken, un outil
de métrologie et une console de supervision complète avec les plugins
nagios de base

-   shinken webui : <http://hostname:7767>
-   multisite : <http://hostname/check_mk>
-   pnp4nagios : <http://hostanme/pnp4nagios>

Autres fonctionnalités {#autres-fonctionnalites .sectionedit11}
======================

Sauvegardes {#sauvegardes .sectionedit12}
-----------

Le script inclus une fonctionnalité très basique des sauvegardes. Cela
se fait par simple recopie dans un répertoire horodaté des données
“vivantes” de Shinken. Seule les répertoires etc, libexec et var sont
sauvegardés. La sauvegarde se doit d’être un automatisme dans le
processus de mise à jour.

Le répertoires de sauvegarde est définis dans le fichier de
configuration du script (shinken.conf).

### Effectuer une sauvegarde {#effectuer-une-sauvegarde .sectionedit13}

~~~
./install -b
+--------------------------------------------------------------------------------
| Backup shinken configuration, plugins and data
+--------------------------------------------------------------------------------
 > Backup done. Id is 20120216083735
~~~

Après chaque sauvegarde vous devez démarrer shinken

### Lister les sauvegardes {#lister-les-sauvegardes .sectionedit14}

Avant de restaurer une sauvegarde vous pouvez lister les sauvegardes
existantes et ainsi choisir celle que vous voulez restaurer.

~~~
./install -l
+--------------------------------------------------------------------------------
| List of available backups in /opt/backup
+--------------------------------------------------------------------------------
 > 20120216083735
 > 20120216083854
 > 20120216083856
~~~

### Restauration de la sauvegarde {#restauration-de-la-sauvegarde .sectionedit15}

La restauration se fait en spécifiant l’élément retourné dans la liste
des sauvegardes

~~~
./install -r 20120216083856
+--------------------------------------------------------------------------------
| Restore shinken configuration, plugins and data
+--------------------------------------------------------------------------------
 > Restoration done
~~~

Compression des logs {#compression-des-logs .sectionedit16}
--------------------

Shinken gère lui même la rotation des logs mais ne propose pas de
mécanisme de compressions. Le script permet d’effectuer cela en plaçant
une commande simple dans le planificateur de tâches.

~~~
./install -c
~~~

Arrêter un shinken récalcitrant {#arreter-un-shinken-recalcitrant .sectionedit17}
-------------------------------

En période de mise en place et de tests, il peut arriver que certains
plantage surviennent et il devient alors difficile d’arrêter shinken par
les scripts d’initialisation. Le script permet de forcer l’arrêt de
shinken. Il va dans un premier temps tenter d’arrêter normalement
shinken et vérifier si des processus existent encore. Si c’est le cas le
script va simplement tuer les processus restant

~~~
./install -k
~~~

Activation des démons au démarrage {#activation-des-demons-au-demarrage .sectionedit18}
----------------------------------

Dans un mode distribué chaque serveur peut embarquer un ou plusieurs
rôle (arbiter scheduler reactionner broker poller receiver). Il est
possible de spécifier simplement les démons devant être démarrés.

-   La commande suivante n’activera que le poller

~~~
./install -e poller
~~~

-   La commande suivante n’activera que les démons suivants : arbiter
    scheduler reactionner broker

~~~
./install -e "arbiter scheduler reactionner broker"
~~~

Usage du script {#usage-du-script .sectionedit19}
---------------

~~~~~~~~~~~~~~~~
===========================
Shinken installation script
===========================

===== WARNING : THIS SCRIPT IS STILL IN BETA =====

Contact
~~~~~~

You can contact me at dguenault at monitoring-fr dot org if you find a bug
or you can write an issue in the github interface

if you find and fix a bug just send me the patch and i will apply it (and add credit for the patch in the README file)

Minimal requirements
~~~~~~~~~~~~~~~

For RedHat/CentOs you will need redhat-lsb (and git for cloning this repository)
For Debian based distro you will need lsb-release 

Usage
~~~~

This is a really simple script allowing to install a fully fonctionnal shinken in seconds !
Curently only tested with Ubuntu/Linux Mint/Debian and RHEL/CentOS 5/6 distros. 

Usage : install -k | -i | -w | -d | -u | -b | -r | -l | -c | -h | -a | -z [poller|centreon] | -e daemons | -p plugins [plugname|addon]
    -k  Kill shinken
    -i  Install shinken
    -w  Remove demo configuration 
    -d  Remove shinken
    -u  Update an existing shinken installation
    -v  purge livestatus sqlite db and shrink sqlite db
    -b  Backup shinken configuration plugins and data
    -r  Restore shinken configuration plugins and data
    -l  List shinken backups
    -c  Compress rotated logs
    -e  Which daemons to keep enabled at boot time
    -z  This is a really special usecase that allow to install shinken on Centreon Enterprise Server in place of nagios
    -p  Install plugins or addons (args should be one of the following : 
        check_esx3
        nagios-plugins
        check_oracle_health
        check_mysql_health
        check_wmi_plus
        check_mongodb
        check_emc_clariion
        check_nwc_health
        check_hpasm
        manubulon (snmp plugins)
        capture_plugin
        pnp4nagios
        multisite
        nagvis
    -h  Show help


configuration file
~~~~~~~~~~~~~~

You can modify the target folder, version, backup folder or user/group  by editing the install.d/shinken.conf file 

  export TMP=/tmp
  export VERSION="master"
  export TARGET=/opt/shinken
  export BACKUPDIR="/opt/backup"
  export SKUSER=shinken
  export SKGROUP=shinken
~~~~~~~~~~~~~~~~