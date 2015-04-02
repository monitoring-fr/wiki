---
layout: page
title: omd Open Monitoring Distribution 
---

  **Rôle**            **Nom**
  ------------------- ----------------
  **Créateur**        Charles JUDITH
  **Contributeurs**   Charles JUDITH

Au lieu d’un long discours sur la présentation de omd, je vous invite à
lire l’article de Romuald FRONTEAU en cliquant sur le lien suivant
[présentation
omd](http://www.monitoring-fr.org/2011/02/omd-open-monitoring-distribution/ "http://www.monitoring-fr.org/2011/02/omd-open-monitoring-distribution/").

Ce tutoriel a été réalisé sur une Ubuntu 11.04.

**Téléchargement de la dernière version d’omd**

~~~
root@charles-eeepc:~# wget http://omdistro.org/attachments/download/90/omd-0.48_0.natty_i386.deb
~~~

**Pré-requis**

Une Ubuntu 11.04 fraichement installé

~~~
root@charles-eeepc:~# apt-get install apache2 fping curl dialog dnsutils fping graphviz libapache2-mod-fcgid libapache2-mod-proxy-html libapache2-mod-python libdbi0 libevent-1.4-2 libgd2-xpm libltdl7 libnet-snmp-perl libpango1.0-0 libreadline5 libsnmp-perl libuuid1 mysql-server patch php5 php5-cli php5-cgi php5-gd php5-mcrypt php5-sqlite php-pear pyro rsync smbclient snmp unzip xinetd
~~~

**Installation d’omd**

~~~
root@charles-eeepc:~# dpkg -i omd-0.48_0.natty_i386.deb
~~~

En Contruction!