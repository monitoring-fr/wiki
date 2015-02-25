---
layout: page
---

[[[Installation de Zabbix sur
Centos](zabbix-centos-install@do=backlink.html)]]

[wiki monitoring-fr.org](../start.html "[ALT+H]")

![Logo Monitoring](../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../start.html "start") »
[Zabbix](start.html "zabbix:start") » [Installation de Zabbix sur
Centos](zabbix-centos-install.html "zabbix:zabbix-centos-install")

### Table des matières {.toggle}

-   [Installation de Zabbix sur
    Centos](zabbix-centos-install.html#installation-de-zabbix-sur-centos)
    -   [Pré-requis](zabbix-centos-install.html#pre-requis)
    -   [Zabbix Server](zabbix-centos-install.html#zabbix-server)
    -   [Zabbix Frontend](zabbix-centos-install.html#zabbix-frontend)
    -   [Zabbix Proxy](zabbix-centos-install.html#zabbix-proxy)
    -   [Zabbix Agent](zabbix-centos-install.html#zabbix-agent)

Installation de Zabbix sur Centos {#installation-de-zabbix-sur-centos .sectionedit1}
=================================

En cours de rédaction…

Tutoriel rédigé pour une version Centos 6.x et Zabbix 1.8.x.

Documentation d’installation de Zabbix sur une distribution de type
Linux, à savoir Centos.

Ce tutoriel a été réalisé par :

  **Rôle**              **Nom**
  --------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------
  **Rédacteur(s)**      [Ludovic VALENTIN](http://www.monitoring-fr.org/community/members/ludovic-valentin/ "http://www.monitoring-fr.org/community/members/ludovic-valentin/")
  **Contributeur(s)**   -

Pré-requis {#pre-requis .sectionedit3}
----------

\# rpm -Uvh
[http://fr2.rpmfind.net/linux/epel/6/x86\_64/epel-release-6-6.noarch.rpm](http://fr2.rpmfind.net/linux/epel/6/x86_64/epel-release-6-6.noarch.rpm "http://fr2.rpmfind.net/linux/epel/6/x86_64/epel-release-6-6.noarch.rpm")

\# yum update

\# yum install ssh wget

\# yum groupinstall “Development Tools”

\# groupadd -g 9000 zabbix \# useradd -u 9000 -g zabbix -d
/usr/local/zabbix -c “Zabbix User” zabbix \# passwd zabbix

\# wget
[http://prdownloads.sourceforge.net/zabbix/zabbix-1.8.2.tar.gz](http://prdownloads.sourceforge.net/zabbix/zabbix-1.8.2.tar.gz "http://prdownloads.sourceforge.net/zabbix/zabbix-1.8.2.tar.gz")

\# tar -zxf zabbix-1.8.2.tar.gz \# cd zabbix-1.8.2

\# mkdir /usr/local/zabbix \# mkdir /usr/local/zabbix/etc \# mkdir
/usr/local/zabbix/var \# mkdir /usr/local/zabbix/var/run \# mkdir
/usr/local/zabbix/var/log

Zabbix Server {#zabbix-server .sectionedit4}
-------------

\# yum install mysql-server mysql-devel libssl-dev libssh-dev
libgnutls-dev libopenipmi-dev libiksemel-dev snmp libsnmp-dev
libnet-snmp-perl libcurl4-gnutls-dev fping

\# mysql -u root -p

> create database zabbixdb character set utf8;\
>  grant all privileges on zabbixdb.\* to zabbix@localhost identified by
> ‘zabbix’;\
>  exit

\# mysql -u zabbix -p zabbixdb \<
/…/zabbix-1.8.2/create/schema/mysql.sql \# mysql -u zabbix -p zabbixdb
\< /…/zabbix-1.8.2/create/data/data.sql \# mysql -u zabbix -p zabbixdb
\< /…/zabbix-1.8.2/create/data/images\_mysql.sql

\# ./configure –enable-server –with-mysql –with-net-snmp –with-libcurl
–with-openipmi –with-jabber –prefix=/usr/local/zabbix

\# make install

\# dir /usr/local/zabbix

(Plus nécessaire sur la 2.0 :)

\# cp /…/zabbix-1.8.2/misc/conf/zabbix\_server.conf
/usr/local/zabbix/etc

(\# vi /etc/init.d/zabbix-server)

\# chmod 640 /usr/local/zabbix/etc/zabbix\_server.conf \# chown -R
zabbix:zabbix /usr/local/zabbix\*

\# vi /usr/local/zabbix/etc/zabbix\_server.conf

LogFile=/usr/local/zabbix/var/log/zabbix\_server.log
PidFile=/usr/local/zabbix/var/run/zabbix\_server.pid

DBName=zabbixdb DBUser=zabbix DBPassword=zabbix
DBSocket=/var/run/mysqld/mysqld.sock

cp misc/init.d/redhat/zabbix\_server\_ctl /etc/init.d/zabbix-server
chmod +x /etc/init.d/zabbix-server

Zabbix Frontend {#zabbix-frontend .sectionedit5}
---------------

apache2 php php-gd php-mysql php-bcmath php-mbstring php-xml

cp -R -p /…/zabbix-1.8.2/frontends/php/\* /var/www/html/zabbix

service httpd restart

voir droits apache

usermod -a -G zabbix apache

Zabbix Proxy {#zabbix-proxy .sectionedit6}
------------

Zabbix Agent {#zabbix-agent .sectionedit7}
------------

cp misc/init.d/redhat/zabbix\_agentd\_ctl /etc/init.d/zabbix-agentd
chmod + /etc/init.d/zabbix-agentd

vi /etc/init.d/zabbix-agentd

BASEDIR PIDFILE

chown -R zabbix:zabbix /usr/local/zabbix

vi /usr/local/zabbix/etc/zabbix\_agentd.conf

PID LOG hostname server

SOMMAIRE {#sommaire .sectionedit1}
--------

**[Accueil](../start.html "start")**

**[Supervision](../supervision/start.html "supervision:start")**

-   [Nagios](../nagios/start.html "nagios:start")
-   [Centreon](../centreon/start.html "centreon:start")
-   [Shinken](../shinken/start.html "shinken:start")
-   [Zabbix](start.html "zabbix:start")
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

Zabbix {#zabbix .sectionedit1}
------

-   [Introduction](zabbix-introduction.html "zabbix:zabbix-introduction")
-   [Fonctionnement](zabbix-work.html "zabbix:zabbix-work")
-   [Ressources et
    performances](zabbix-resources.html "zabbix:zabbix-resources")
-   [Installation sur
    Ubuntu](zabbix-ubuntu-install.html "zabbix:zabbix-ubuntu-install")
-   [Interface Web](zabbix-interface.html "zabbix:zabbix-interface")
-   [Prise en main](zabbix-use.html "zabbix:zabbix-use")
-   [Gestion des items](zabbix-item-use.html "zabbix:zabbix-item-use")
-   [Gestion des
    triggers](zabbix-trigger-use.html "zabbix:zabbix-trigger-use")
-   [Gestion des
    actions](zabbix-action-use.html "zabbix:zabbix-action-use")
-   [Optimisation](zabbix-optimization.html "zabbix:zabbix-optimization")
-   [Architectures
    distribuées](zabbix-distributed-architecture.html "zabbix:zabbix-distributed-architecture")
-   [Découverte
    d'équipements](zabbix-discovery.html "zabbix:zabbix-discovery")
-   [Notification par
    email](zabbix-email-notification.html "zabbix:zabbix-email-notification")
-   [Superviser un hôte
    SNMP](zabbix-snmp-host.html "zabbix:zabbix-snmp-host")
-   [Catalogue des erreurs](zabbix-errors.html "zabbix:zabbix-errors")

-   [Afficher le texte
    source](zabbix-centos-install@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](zabbix-centos-install@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](zabbix-centos-install@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](zabbix-centos-install@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](zabbix-centos-install@do=media.html "Gestionnaire de médias")
-   [Index](zabbix-centos-install@do=index.html "Index [X]")
-   [Connexion](zabbix-centos-install@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de
    page](zabbix-centos-install.html#dokuwiki__top "Haut de page [T]")

zabbix/zabbix-centos-install.txt · Dernière modification: 2013/03/29
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

![](../lib/exe/indexer.php@id=zabbix%253Azabbix-centos-install&1424859531)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
