---
layout: page
---

[[[Installation de Centreon 2.2 sur Ubuntu Server
10.04](centreon-ubuntu-install@do=backlink.html)]]

[wiki monitoring-fr.org](../start.html "[ALT+H]")

![Logo Monitoring](../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../start.html "start") »
[Centreon](start.html "centreon:start") » [Installation de Centreon 2.2
sur Ubuntu Server
10.04](centreon-ubuntu-install.html "centreon:centreon-ubuntu-install")

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

[![](../assets/media/nagios/centreon_logo.png)](../_detail/nagios/centreon_logo.png@id=centreon%253Acentreon-ubuntu-install.html "nagios:centreon_logo.png")

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

~~~~ {.code .bash}
sudo apt-get install rrdtool snmpd php5-cli librrds-perl php-pear snmp snmpd php5-ldap php5-snmp libpng3 libconfig-inifiles-perl libcrypt-des-perl libdigest-hmac-perl libdigest-sha1-perl libgd-gd2-perl libio-socket-inet6-perl libnet-snmp-perl librrds-perl mailutils php5-gd php5-mysql snmptt
~~~~

Nous allons faire en sorte que le démon snmpd soit un peu moins parano
(Debian way). Editer le fichier **/etc/snmp/snmpd.cfg**

-   Rechercher et commenter la ligne : **com2sec paranoid default
    public**
-   Rechercher et decommenter la ligne : **\#com2sec readonly default
    public**
-   Redémarrer le démon snmp

~~~~ {.code .bash}
sudo /etc/init.d/snmpd restart
~~~~

Récupération et extraction des sources {#recuperation-et-extraction-des-sources .sectionedit3}
--------------------------------------

~~~~ {.code}
cd /tmp
wget http://download.centreon.com/centreon/centreon-2.2.0.tar.gz
tar zxvf centreon-2.2.0.tar.gz
cd centreon-2.2.0
~~~~

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

~~~~ {.code}
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
~~~~

Lancement de l'installation {#lancement-de-l-installation .sectionedit7}
---------------------------

~~~~ {.code}
cd /tmp/centreon-2.0.0 
sudo ./install.sh -v -f /tmp/centreon.tpl
~~~~

-   L’installeur ne devrais pas vous demander plus

-   A la fin de l’installation il suffit d’ouvrir un navigateur et de
    taper l’url suivante :
    [http://[ipserveur]/centreon](http://[ipserveur]/centreon "http://[ipserveur]/centreon")

SOMMAIRE {#sommaire .sectionedit1}
--------

**[Accueil](../start.html "start")**

**[Supervision](../supervision/start.html "supervision:start")**

-   [Nagios](../nagios/start.html "nagios:start")
-   [Centreon](start.html "centreon:start")
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

Centreon {#centreon .sectionedit1}
--------

-   [Documentation Technique sur
    Centreon](centreon-doc-technique.html "centreon:centreon-doc-technique")
-   [Installation MKLivestatus & Intégration dans
    Centreon](mklivestatus-install-integration-centreon.html "centreon:mklivestatus-install-integration-centreon")
-   [Installation Nagios / Centreon sur RedHat
    EL](centreon-redhat-install.html "centreon:centreon-redhat-install")
-   [Installation de Centreon 2.1 sur CentOS
    5.3](centreon-centos-install.html "centreon:centreon-centos-install")
-   [Installation de Centreon 2.2 sur Ubuntu Server
    10.04](centreon-ubuntu-install.html "centreon:centreon-ubuntu-install")
-   [Installation de Centreon Enterprise
    Server](centreon-enterprise-server.html "centreon:centreon-enterprise-server")
-   [Installation de Shinken sur Centreon Enterprise
    Server](centreon-enterprise-server-shinken.html "centreon:centreon-enterprise-server-shinken")
-   [Installation du patch multi-broker pour
    Centreon](multi-broker-patch-install.html "centreon:multi-broker-patch-install")
-   [Intégrer Nagvis dans
    Centreon](integration-nagvis.html "centreon:integration-nagvis")
-   [Manuel d'utilisation
    Centreon](manuel-utilisation/start.html "centreon:manuel-utilisation:start")
-   [Nagios Centreon
    part1](nagios-centreon-part1.html "centreon:nagios-centreon-part1")
-   [Nagios Centreon
    part2](nagios-centreon-part2.html "centreon:nagios-centreon-part2")
-   [Présentation de l'interface Centreon 2.1 et de son
    utilisation](centreon-interface-utilisation.html "centreon:centreon-interface-utilisation")
-   [Superviser le spanning-tree sous
    Centreon/Nagios](superviser-spanning-tree.html "centreon:superviser-spanning-tree")
-   [Superviser un Autocom OXE V9.x Alcatel-Lucent sous
    Centreon/Nagios](superviser-oxe-alcatel.html "centreon:superviser-oxe-alcatel")
-   [Tableau de correspondance des
    plugins](tableau-correspondance-plugins.html "centreon:tableau-correspondance-plugins")

-   [Afficher le texte
    source](centreon-ubuntu-install@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](centreon-ubuntu-install@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](centreon-ubuntu-install@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](centreon-ubuntu-install@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](centreon-ubuntu-install@do=media.html "Gestionnaire de médias")
-   [Index](centreon-ubuntu-install@do=index.html "Index [X]")
-   [Connexion](centreon-ubuntu-install@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de
    page](centreon-ubuntu-install.html#dokuwiki__top "Haut de page [T]")

centreon/centreon-ubuntu-install.txt · Dernière modification: 2013/03/29
09:39 (modification externe)

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

![](../lib/exe/indexer.php@id=centreon%253Acentreon-ubuntu-install&1424859527)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
