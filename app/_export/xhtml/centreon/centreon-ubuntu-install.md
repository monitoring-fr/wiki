---
layout: page
---

### Table des matières {.toggle}

-   [Installation de Centreon 2.2 sur Ubuntu Server
    10.04](centreon-ubuntu-install.html#installation-de-centreon-22-sur-ubuntu-server-1004)
    -   [Installation des
        prérequis](centreon-ubuntu-install.html#installation-des-prerequis)
    -   [Récupération et extraction des
        sources](centreon-ubuntu-install.html#recuperation-et-extraction-des-sources)
    -   [Création du template
        d'installation](centreon-ubuntu-install.html#creation-du-template-d-installation)
    -   [Lancement de
        l'installation](centreon-ubuntu-install.html#lancement-de-l-installation)

[![](../../../assets/media/nagios/centreon_logo.png)](../../../_detail/nagios/centreon_logo.png@id=centreon%253Acentreon-ubuntu-install.html "nagios:centreon_logo.png")

Installation de Centreon 2.2 sur Ubuntu Server 10.04 {#installation-de-centreon-22-sur-ubuntu-server-1004 .sectionedit1}
====================================================

Comme tout bon admin je suis plutôt du genre feignant et je ne vais pas
faire un tutoriel détaillant toutes les options de centreon en mode
interactif. Afin de contourner cela nous allons utiliser le mode
“silencieux”, les réponses aux questions étant fournies par un fichier
de configuration (template).

Installation des prérequis {#installation-des-prerequis .sectionedit2}
--------------------------

-   Je pars du principe que Nagios et les plugins nagios sont déjà
    installés. Vous pouvez bien sur substituer Icinga à Nagios ou bien
    utiliser le tout dernier fork de Nagios, Centreon Engine.
-   ndomod et ndo2db doivent également être installés (par contre il est
    inutile d’installer la base de donnée car centreon la crée lui même
    sous le nom centstatus).

~~~ {.code .bash}
sudo apt-get install rrdtool snmpd php5-cli librrds-perl php-pear snmp snmpd php5-ldap php5-snmp libpng3 libconfig-inifiles-perl libcrypt-des-perl libdigest-hmac-perl libdigest-sha1-perl libgd-gd2-perl libio-socket-inet6-perl libnet-snmp-perl librrds-perl mailutils php5-gd php5-mysql snmptt
~~~

Nous allons faire en sorte que le démon snmpd soit un peu moins parano
(Debian way). Editer le fichier **/etc/snmp/snmpd.cfg**

-   Rechercher et commenter la ligne : **com2sec paranoid default
    public**
-   Rechercher et decommenter la ligne : **\#com2sec readonly default
    public**
-   Redémarrer le démon snmp

~~~ {.code .bash}
sudo /etc/init.d/snmpd restart
~~~

Récupération et extraction des sources {#recuperation-et-extraction-des-sources .sectionedit3}
--------------------------------------

~~~
cd /tmp
wget http://download.centreon.com/centreon/centreon-2.2.0.tar.gz
tar zxvf centreon-2.2.0.tar.gz
cd centreon-2.2.0
~~~

Création du template d'installation {#creation-du-template-d-installation .sectionedit4}
-----------------------------------

-   Voici la liste des variables devant être ajustée pour votre
    environnement (pour ma part centreon s’installe dans /opt/centreon
    et nagios dans /opt/monitor)

  VARIABLE                 DEFINITION
  ------------------------ ---------------------------------------------------------
  INSTALL\_DIR\_CENTREON   Racine de l’installation de centreon
  INSTALL\_DIR\_NAGIOS     Ou est installé nagios (ou icinga ou centreon engine
  NAGIOS\_ETC              Ou se trouve la configuration Nagios
  NAGIOS\_PLUGIN           Ou se trouve les plugins
  NAGIOS\_BINARY           Chemin du binaire nagios (ou icinga ou centreon engine)
  NAGIOSTATS\_BINARY       Chemin du binaire nagios (ou icinga ou centreon engine)
  NAGIOS\_VAR              REPERTOIRE VAR DE NAGIOS
  NAGIOS\_USER             Identité sous laquelle est lancé nagios
  NAGIOS\_GROUP            Groupe d’appartenance de l’utilisateur executant nagios
  NAGIOS\_P1\_FILE         Chemin d’accés au script p1.pl
  NDOMOD\_BINARY           Chemin d’accés du module broker ndo (ndomod.o)
  NAGIOS\_INIT\_SCRIPT     Script de démarrage de nagios

-   Si vous utilisez une architecture 64 bits vous devais modifier les
    variables suivantes

  VARIABLE    DEFINITION
  ----------- --------------------------------------------
  RRD\_PERL   Chemin d’accès pour les librairie perl RRD

-   Créer le fichier centreon.tpl dans /tmp/ et coller le contenu
    suivant à l’intérieur.

~~~
# -*-Shell-script-*-
# SVN: $URL: http://svn.centreon.com/branches/centreon-2.1/tmpl/vardistrib/sample.tmpl $
# SVN: $Id: sample.tmpl 8586 2009-07-06 20:49:53Z watt $
#
# This file contain reconfigured variables used in install scripts
# By default, when you use ./install.sh -f sample.tmpl, you'll accept GPL licence.

#####################################################################
## Begin: Install modules
#####################################################################
## What do you want to install ? 
## 0 = no, 1 = yes

## CentWeb: Web front Centreon for Nagios
PROCESS_CENTREON_WWW=1
## CentStorage: Log and charts archiving.
PROCESS_CENTSTORAGE=1
## CentCore: Distributed Monitoring engine.
PROCESS_CENTCORE=1
## CentPlugins: Centreon Plugins for nagios
PROCESS_CENTREON_PLUGINS=1
## CentTraps: Centreon Snmp traps process for nagios
PROCESS_CENTREON_SNMP_TRAPS=1
#####################################################################
## End: Install modules
#####################################################################


#####################################################################
## Begin: Default variables
#####################################################################
## Your default variables
## $BASE_DIR is the centreon source directory
LOG_DIR="$BASE_DIR/log"
LOG_FILE="$LOG_DIR/install_centreon.log"

## Don't change values above unless you perfectly understand 
## what you are doing.
## Centreon temporary directory to work
TMP_DIR="/tmp/centreon-setup"
## default snmp config directory
SNMP_ETC="/etc/snmp/"
## a list of pear modules require by Centreon
PEAR_MODULES_LIST="pear.lst"
## forge install pear module (1=yes/0=no)
PEAR_AUTOINST=1
## no root user can be install centreon
#FORCE_NO_ROOT=0
#####################################################################
## End: Default variables
#####################################################################


#####################################################################
## Begin: Centreon preferences
#####################################################################
## Above variables are necessary to run a silent install
## Where you want to install Centreon (Centreon root directory)
INSTALL_DIR_CENTREON="/opt/centreon"
## Centreon log files directory
CENTREON_LOG="/opt/centreon/var/log"
## Centreon config files
CENTREON_ETC="/opt/centreon/etc"
## Centreon run dir (all .pid, .run, .lock)
CENTREON_RUNDIR="/opt/centreon/var/run"
## Centreon generation config directory
##  filesGeneration and filesUpload
CENTREON_GENDIR="/opt/centreon/var/cache"
## CentStorage RRDs directory (where .rrd files go)
CENTSTORAGE_RRD="/opt/centreon/var/lib"
## path to centstorage binary
CENTSTORAGE_BINDIR="/opt/centreon/bin"
## path to centcore binary
CENTCORE_BINDIR="/opt/centreon/bin"
## libraries temporary files directory
CENTREON_VARLIB="/opt/centreon/var/lib"
## Some plugins require temporary datas to process output.
## These temp datas are store in the CENTPLUGINS_TMP path.
CENTPLUGINS_TMP="/opt/centreon/var/lib/centplugins"
## path to centpluginsTraps binaries
CENTPLUGINSTRAPS_BINDIR="/opt/centreon/bin"
## path for snmptt installation
SNMPTT_BINDIR="/usr/sbin"
## force install init script (install in init.d)
## Set to "1" to enable
CENTCORE_INSTALL_INIT=1
CENTSTORAGE_INSTALL_INIT=1
## force install run level for init script (add all link on rcX.d)
## Set to "1" to enable
CENTCORE_INSTALL_RUNLVL=1
CENTSTORAGE_INSTALL_RUNLVL=1
#####################################################################
## End: Centreon preferences
#####################################################################


#####################################################################
## Begin: Nagios preferences
#####################################################################
## Install directory
INSTALL_DIR_NAGIOS="/opt/monitor"
## Configuration directory
NAGIOS_ETC="/opt/monitor/etc"
## Plugins directory
NAGIOS_PLUGIN="/opt/monitor/libexec"
## Images (logos) directory
NAGIOS_IMG="/opt/monitor/var/www/images"
## The nagios binary (optional)
NAGIOS_BINARY="/opt/monitor/bin/nagios"
## The nagiostats binary (optional)
NAGIOSTATS_BINARY="/opt/monitor/bin/nagiostats"
## Logging directory
NAGIOS_VAR="/opt/monitor/var"
## Nagios user (optional)
NAGIOS_USER="nagios"
## If you want to force NAGIOS_USER, set FORCE_NAGIOS_USER to 1 (optional)
#FORCE_NAGIOS_USER=0
## Nagios group (optional)
NAGIOS_GROUP="nagios"
## If you want to force NAGIOS_GROUP, set FORCE_NAGIOS_GROUP to 1 (optional)
#FORCE_NAGIOS_GROUP=0
## Nagios p1.pl file (perl embedded)
NAGIOS_P1_FILE="/opt/monitor/bin/p1.pl"
## If you want to not use NDO (not recommended)
#FORCE_NOT_USE_NDO=1
## Nagios NDO module
NDOMOD_BINARY="/opt/monitor/bin/ndomod.o"
## Nagios init script (optional)
NAGIOS_INIT_SCRIPT="/etc/init.d/nagios"
#####################################################################
## End: Nagios preferences
#####################################################################

#####################################################################
## Begin: Apache preferences
#####################################################################
## Apache configuration directory (optional)
DIR_APACHE="/etc/apache2"
## Apache local specific configuration directory (optional)
DIR_APACHE_CONF="/etc/apache2/conf.d"
## Apache configuration file. Only file name. (optional)
APACHE_CONF="apache2.conf"
## Apache user (optional)
WEB_USER="www-data"
## Apache group (optional)
WEB_GROUP="www-data"
## Force apache reload (optional): set APACHE_RELOAD to 1
APACHE_RELOAD=1
#####################################################################
## End: Apache preferences
#####################################################################

#####################################################################
## Begin: Other binary
#####################################################################
## RRDTOOL (optional)
BIN_RRDTOOL="/usr/bin/rrdtool"
## Mail (optional)
BIN_MAIL="/usr/bin/mail"
## SSH (optional)
BIN_SSH="/usr/bin/ssh"
## SCP (optional)
BIN_SCP="/usr/bin/scp"
## PHP (optional)
PHP_BIN="/usr/bin/php"
## GREP (optional)
#GREP=""
## CAT (optional)
#CAT=""
## SED (optional)
#SED=""
## CHMOD (optional)
#CHMOD=""
## CHOWN (optional)
#CHOWN
#####################################################################
## End: Other binary
#####################################################################


#####################################################################
## Begin: Others
#####################################################################
## Perl path for RRDs.pm file
RRD_PERL="/usr/lib/perl5"
## Path to sudoers file (optional)
SUDO_FILE="/etc/sudoers"
## Force sudo config (optional)
FORCE_SUDO_CONF=1
## Apache user (optional)
WEB_USER="www-data"
## Apache group (optional)
WEB_GROUP="www-data"
## init script directory (optional)
INIT_D="/etc/init.d"
## cron config script directory (optional)
CRON_D="/etc/cron.d"
## Path for PEAR.php file
PEAR_PATH="/usr/share/php"
#####################################################################
## End: Others
#####################################################################
~~~

Lancement de l'installation {#lancement-de-l-installation .sectionedit7}
---------------------------

~~~
cd /tmp/centreon-2.0.0 
sudo ./install.sh -v -f /tmp/centreon.tpl
~~~

-   L’installeur ne devrais pas vous demander plus

-   A la fin de l’installation il suffit d’ouvrir un navigateur et de
    taper l’url suivante :
    [http://[ipserveur]/centreon](http://[ipserveur]/centreon "http://[ipserveur]/centreon")

