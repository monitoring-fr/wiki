---
layout: page
title: Installation de Nagios 3.x sur CentOS 5.3
---

Pré-requis {#pre-requis .sectionedit2}
----------

### Installation du dépôt "RPM forge" {#installation-du-depot-rpm-forge .sectionedit3}

Nous allons ajouter aux sources de dépôt celui de RPMForge pour éviter
quelques désagréments de compilation (par exemple RRDTool n’est pas
disponible sur les dépôts officiels).

Dans un terminal, exécutez les commandes suivantes :

~~~
# wget http://apt.sw.be/redhat/el5/en/i386/RPMS.dag/rpmforge-release-0.3.6-1.el5.rf.i386.rpm

# rpm --import http://dag.wieers.com/rpm/packages/RPM-GPG-KEY.dag.txt

# rpm -Uvh rpmforge-release-0.3.6-1.el5.rf.i386.rpm
~~~

### Installation des packages {#installation-des-packages .sectionedit4}

~~~
# yum install httpd gd fontconfig-devel libjpeg-devel libpng-devel gd-devel perl-GD openssl-devel php mailx postfix cpp gcc gcc-c++ libstdc++ glib2-devel libtool-ltdl-devel
~~~

Création Utilisateur et groupes Nagios {#creation-utilisateur-et-groupes-nagios .sectionedit5}
--------------------------------------

Nous allons créer l’utilisateur Nagios et les groupes Nagios dont on a
besoin

~~~
# groupadd -g 6000 nagios
# groupadd -g 6001 nagcmd
# useradd -u 6000 -g nagios -G nagcmd -d /usr/local/nagios -c "Nagios Admin" nagios
~~~

Compilation et Installation {#compilation-et-installation .sectionedit6}
---------------------------

On récupère les sources :

~~~
# wget http://prdownloads.sourceforge.net/sourceforge/nagios/nagios-3.2.0.tar.gz
# tar xzf nagios-3.2.0.tar.gz
# cd nagios-3.2.0
~~~

Pour la compilation de Nagios, il est important de suivre toutes les
étapes ci-dessous

~~~
# ./configure --prefix=/usr/local/nagios --with-nagios-user=nagios --with-nagios-group=nagios --with-command-user=nagios --with-command-group=nagcmd --enable-event-broker --enable-nanosleep --enable-embedded-perl --with-perlcache

# make all

# make install

# make install-init

# make install-commandmode

# make install-webconf

# make install-config
~~~

Sécuriser l'accès à Nagios {#securiser-l-acces-a-nagios .sectionedit7}
--------------------------

Le minimum en sécurité pour éviter que n’importe qui accède à Nagios est
une mire de connexion apache.

Nous allons créer un fichier des utilisateurs ayant accès à Nagios (le
mot de passe qui vous demandera sera le mot de passe à mettre lors de la
connexion à la mire) :

~~~
# htpasswd -c /usr/local/nagios/etc/htpasswd.users nagiosadmin
~~~

L’utilisateur Nagios devient propriétaire du fichier

~~~
# chown nagios:nagcmd /usr/local/nagios/etc/htpasswd.users
~~~

On ajoute l’utilisateur apache au groupe Nagios

~~~
# usermod -a -G nagios,nagcmd apache
~~~

Redémarrez Apache

~~~
/etc/init.d/httpd restart
~~~

Maintenant vous avez accès à Nagios via l’url :
<http://IP_SERV_NAGIOS/nagios>

A la mire de connexion, il faudra entrer le login et mot de passe
renseigné plus haut avec la commande htpasswd

[![](../assets/media/nagios/centreon_mire-nagios.png@w=700)](../_detail/nagios/centreon_mire-nagios.png@id=nagios%253Anagios-centos-install.html "nagios:centreon_mire-nagios.png")

Installation des Plugins Nagios {#installation-des-plugins-nagios .sectionedit8}
-------------------------------

C’est bien beau d’avoir installé Nagios, mais il nous faut des plugins
avec tous ça. On va récupérer les sources.

~~~
# wget http://ovh.dl.sourceforge.net/sourceforge/nagiosplug/nagios-plugins-1.4.13.tar.gz
# tar xzf nagios-plugins-1.4.13.tar.gz 
# cd nagios-plugins-1.4.13
~~~

-   **Compilation et Installation**

~~~
# ./configure --with-nagios-user=nagios --with-nagios-group=nagios --with-command-user=nagios --with-command-group=nagcmd --prefix=/usr/local/nagios

# make all

# make install
~~~

Problèmes éventuels {#problemes-eventuels .sectionedit9}
-------------------

### Règle de Firewall RedHat {#regle-de-firewall-redhat .sectionedit10}

Vous n’avez pas du tout accès via l’url donné. Normal, sous Redhat la
règle de firewall (IpTables) est aggressive. Donnez accès au port 80 et
vous pourrez voir votre interface web

A developper

### Problème de droits {#probleme-de-droits .sectionedit11}

Il vous met “Permissions denied /nagios”, aller voir dans le répertoire
d’installation de nagios. Perso sur 2 installations de Redhat, à chaque
fois il m’a mis des droits aux répertoires nagios 700 alors que ça doit
être 755

~~~
# chmod 755 /usr/local/nagios
~~~

### Problème d'Internal Error lors d'accès aux CGI {#probleme-d-internal-error-lors-d-acces-aux-cgi .sectionedit12}

Faites attention à SElinux, étant activé, j’avais des “internal Error”
lorsque je voulais accéder aux cgi. On rencontre souvent des problèmes
avec le SElinux.

Désactivation de Selinux, éditer le fichier de configuration de SELINUX
:

~~~
# vi /etc/selinux/config
~~~

~~~
# This file controls the state of SELinux on the system.
# SELINUX= can take one of these three values:
# enforcing - SELinux security policy is enforced.
# permissive - SELinux prints warnings instead of enforcing.
# disabled - No SELinux policy is loaded.
SELINUX=disabled
# SELINUXTYPE= can take one of these two values:
# targeted - Only targeted network daemons are protected.
# strict - Full SELinux protection.
SELINUXTYPE=targeted
~~~

**Vous devez redémarrer votre machine pour que cela soit pris en compte.**