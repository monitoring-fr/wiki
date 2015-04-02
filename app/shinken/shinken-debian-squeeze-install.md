---
layout: page
title: Installation Shinken 0.8 sur Debian Squeeze
---

En cours de rédaction

Pré-Requis {#pre-requis .sectionedit2}
----------

Nous n’allons pas couvrir en détail l’installation de la distribution
Linux. Il suffit de choisir une installation de serveur LAMP et de
suivre les indications. Pour que cette installation soit opérationnelle,
il convient d’exécuter les commandes suivantes :

~~~
apt-get update
apt-get upgrade
apt-get install openssh-server pyro python-paste git
~~~

Ces commandes mettent à jour l’ensemble de la distribution installée et
installe le serveur ssh pour la prise en main à distance.

Préparation des dépôts apt pour l’installation

~~~
vi /etc/apt/sources.list
~~~

Le contenu désiré est le suivant:

~~~
deb http://ftp.fr.debian.org/debian/ squeeze main
deb-src http://ftp.fr.debian.org/debian/ squeeze main

deb http://security.debian.org/ squeeze/updates main
deb-src http://security.debian.org/ squeeze/updates main

# squeeze-updates, previously known as 'volatile'
deb http://ftp.fr.debian.org/debian/ squeeze-updates main
deb-src http://ftp.fr.debian.org/debian/ squeeze-updates main
~~~

Installation Shinken {#installation-shinken .sectionedit3}
--------------------

Création de l’utilisateur nagios

~~~ {.code .bash}
cd /tmp
git clone git://github.com/naparuba/shinken.git
~~~