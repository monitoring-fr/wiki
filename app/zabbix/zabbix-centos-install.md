---
layout: page
title: Installation de Zabbix sur Centos
---

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