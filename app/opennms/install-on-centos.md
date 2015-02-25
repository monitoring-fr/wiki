---
layout: page
---

[[[Installation d'OpenNMS sur CentOS
5.x](install-on-centos@do=backlink.html)]]

[wiki monitoring-fr.org](../start.html "[ALT+H]")

![Logo Monitoring](../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../start.html "start") »
[OpenNMS](start.html "opennms:start") » [Installation d'OpenNMS sur
CentOS 5.x](install-on-centos.html "opennms:install-on-centos")

### Table des matières {.toggle}

-   [Installation d'OpenNMS sur CentOS
    5.x](install-on-centos.html#installation-d-opennms-sur-centos-5x)
    -   [1. Pré-requis](install-on-centos.html#pre-requis)
    -   [2. Vérification du
        hostname](install-on-centos.html#verification-du-hostname)
    -   [3. Installation et configuration de la base de données
        PostgreSQL](install-on-centos.html#installation-et-configuration-de-la-base-de-donnees-postgresql)
        -   [3.1 Installation et
            initialisation](install-on-centos.html#installation-et-initialisation)
        -   [3.2 Configuration](install-on-centos.html#configuration)
    -   [4. Installation et configuration
        d'OpenNMS](install-on-centos.html#installation-et-configuration-d-opennms)
        -   [4.1 Configuration du repository
            yum](install-on-centos.html#configuration-du-repository-yum)
        -   [4.2 Installation](install-on-centos.html#installation)
        -   [4.3 Configuration](install-on-centos.html#configuration1)

[![](../assets/media/supervision/opennms/logo.png)](../_detail/supervision/opennms/logo.png@id=opennms%253Ainstall-on-centos.html "supervision:opennms:logo.png")

Installation d'OpenNMS sur CentOS 5.x {#installation-d-opennms-sur-centos-5x .sectionedit1}
=====================================

Cette page explique comment installer OpenNMS sur un système CentOS
version 5.x à partir d’un repository yum. Celle-ci n’explique pas
comment installer la distribution CentOS.

1. Pré-requis {#pre-requis .sectionedit2}
-------------

-   CentOS 5.x installé sans option particulière
-   Être connecté au système avec l’utilisateur root ou un utilisateur
    ayant suffisamment de droits pour exécuter les commandes ci-dessous
-   Une connexion internet disponible sur le système
-   Que le firewall du système soit désactivé ou ouvert sur le port 8980
    (system-config-securitylevel-tui)

2. Vérification du hostname {#verification-du-hostname .sectionedit3}
---------------------------

Vérifier que le serveur répond au ping. Pour cela tapez la commande
suivante :

~~~~ {.code}
shell> ping `uname -n`
~~~~

Si celui-ci ne répond pas, ajouter le nom du serveur (obtenu à l’aide de
la commande uname -n) au fichier /etc/hosts.

Exemple : 127.0.0.1 OPENNMS-SERVER localhost.localdomain localhost

3. Installation et configuration de la base de données PostgreSQL {#installation-et-configuration-de-la-base-de-donnees-postgresql .sectionedit4}
-----------------------------------------------------------------

### 3.1 Installation et initialisation {#installation-et-initialisation .sectionedit5}

Pour installer le serveur de base de données, tapez la commande suivante
:

~~~~ {.code}
shell> yum install postgresql-server
~~~~

Pour initialiser le serveur de base de données, tapez la commande
suivante :

~~~~ {.code}
shell> service postgresql start
~~~~

### 3.2 Configuration {#configuration .sectionedit6}

Pour activer le serveur de base de données à chaque démarrage, tapez la
commande suivante :

~~~~ {.code}
shell> chkconfig postgresql on
~~~~

La configuration ci-dessous permet de se connecter au serveur de base de
données sans mot de passe UNIQUEMENT en local.

Modifier le fichier /var/lib/pgsql/data/postgresql.conf pour qu’il
contienne les lignes suivantes :

~~~~ {.code}
listen_addresses = 'localhost'
~~~~

Modifier le fichier /var/lib/pgsql/data/pg\_hba.conf pour qu’il
contienne les lignes suivantes :

~~~~ {.code}
# "local" is for Unix domain socket connections only
local   all         all                               trust
# IPv4 local connections:
host    all         all         127.0.0.1/32          trust
# IPv6 local connections:
host    all         all         ::1/128               trust
~~~~

Redémarrer postgresql pour prendre en compte les changements à l’aide de
la commande :

~~~~ {.code}
shell> service postgresql restart
~~~~

4. Installation et configuration d'OpenNMS {#installation-et-configuration-d-opennms .sectionedit7}
------------------------------------------

### 4.1 Configuration du repository yum {#configuration-du-repository-yum .sectionedit8}

Télécharger le paquet du repository :

~~~~ {.code}
shell> wget http://yum.opennms.org/repofiles/opennms-repo-stable-rhel5.noarch.rpm
~~~~

Installer ce paquet avec la commande suivante :

~~~~ {.code}
shell> rpm -ivh opennms-repo-stable-rhel5.noarch.rpm
~~~~

### 4.2 Installation {#installation .sectionedit9}

Pour installer OpenNMS, tapez la commande suivante :

~~~~ {.code}
shell> yum install OpenNMS
~~~~

### 4.3 Configuration {#configuration1 .sectionedit10}

Pour configurer la JVM à utiliser dans OpenNMS, tapez la commande
suivante :

~~~~ {.code}
shell> JAVA_VERSION=`rpm -qa | grep "^jdk" | cut -d"-" -f2`
shell> /opt/opennms/bin/runjava -S /usr/java/jdk$JAVA_VERSION/bin/java
~~~~

Pour configurer OpenNMS, tapez la commande suivante :

~~~~ {.code}
shell> /opt/opennms/bin/install -dis
~~~~

Pour activer OpenNMS à chaque démarrage, tapez la commande suivante :

~~~~ {.code}
shell> chkconfig opennms on
~~~~

Démarrez OpenNMS avec la commande suivante :

~~~~ {.code}
shell> service opennms start
~~~~

L’interface d’openNMS est accessible via l’url suivante :
<http://ip_serv_openNMS:8980/opennms>

**Login :** admin **Mot de passe :** admin

[![](../assets/media/supervision/opennms/login-01.png@w=700)](../_detail/supervision/opennms/login-01.png@id=opennms%253Ainstall-on-centos.html "supervision:opennms:login-01.png")

[![](../assets/media/supervision/opennms/homepage-01.png@w=700)](../_detail/supervision/opennms/homepage-01.png@id=opennms%253Ainstall-on-centos.html "supervision:opennms:homepage-01.png")

SOMMAIRE {#sommaire .sectionedit1}
--------

**[Accueil](../start.html "start")**

**[Supervision](../supervision/start.html "supervision:start")**

-   [Nagios](../nagios/start.html "nagios:start")
-   [Centreon](../centreon/start.html "centreon:start")
-   [Shinken](../shinken/start.html "shinken:start")
-   [Zabbix](../zabbix/start.html "zabbix:start")
-   [OpenNMS](start.html "opennms:start")
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

OpenNMS {#opennms .sectionedit1}
-------

-   [Configuration des évènements et des
    alarmes](events-alarms.html "opennms:events-alarms")
-   [Découverte des équipements
    (discovery)](discovery.html "opennms:discovery")
-   [Découverte et supervision des services (capsd et
    pollerd)](services.html "opennms:services")
-   [Installation d'OpenNMS sur CentOS
    5.x](install-on-centos.html "opennms:install-on-centos")
-   [Installation d'OpenNMS sur Ubuntu 8.0.4
    LTS](install-on-ubuntu.html "opennms:install-on-ubuntu")
-   [Interface Web
    d'OpenNMS](opennms-interface.html "opennms:opennms-interface")
-   [Optimisations possibles](optimisation.html "opennms:optimisation")
-   [Personnalisation de
    l'interface](custom-ihm.html "opennms:custom-ihm")
-   [Redondance avec Heartbeat et
    Mon](redondance.html "opennms:redondance")

-   [Afficher le texte
    source](install-on-centos@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](install-on-centos@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](install-on-centos@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](install-on-centos@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](install-on-centos@do=media.html "Gestionnaire de médias")
-   [Index](install-on-centos@do=index.html "Index [X]")
-   [Connexion](install-on-centos@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de
    page](install-on-centos.html#dokuwiki__top "Haut de page [T]")

opennms/install-on-centos.txt · Dernière modification: 2013/03/29 09:39
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

![](../lib/exe/indexer.php@id=opennms%253Ainstall-on-centos&1424859532)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
