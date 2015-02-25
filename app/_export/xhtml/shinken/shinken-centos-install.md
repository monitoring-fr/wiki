---
layout: page
---

### Table des matières {.toggle}

-   [Installation de Shinken sur
    CentOS](shinken-centos-install.html#installation-de-shinken-sur-centos)
    -   -   [TÉLÉCHARGEMENT DES
            SOURCES](shinken-centos-install.html#telechargement-des-sources)
        -   [INSTALLATION DES
            PREREQUIS](shinken-centos-install.html#installation-des-prerequis)
        -   [AJOUT DE L'UTILISATEUR &
            GROUPE](shinken-centos-install.html#ajout-de-l-utilisateur-groupe)
        -   [CONFIGURATION AVANT
            INSTALLATION](shinken-centos-install.html#configuration-avant-installation)
        -   [INSTALLATION DE
            SHINKEN](shinken-centos-install.html#installation-de-shinken)
        -   [INSTALLATION
            PLUGINS](shinken-centos-install.html#installation-plugins)
        -   [TEST DE LANCEMENT / FONCTIONNEMENT
            SHINKEN](shinken-centos-install.html#test-de-lancementfonctionnement-shinken)
        -   [INSTALLATION DE L'INTERFACE WEB
            THRUK](shinken-centos-install.html#installation-de-l-interface-web-thruk)

Installation de Shinken sur CentOS {#installation-de-shinken-sur-centos .sectionedit1}
==================================

Voici la procédure pour mettre en place un serveur de supervision
Shinken sur CentOS (avec LiveStatus et Thruk).

**Cette page a été rédigée par :**

  **Rôle**        **Nom**
  --------------- -----------------
  **Rédacteur**   Thibaut LAGORCE
  **Rédacteur**   Jean Gabès

### TÉLÉCHARGEMENT DES SOURCES {#telechargement-des-sources .sectionedit3}

~~~
wget http://shinken-monitoring.org/pub/shinken-0.5.1.tar.gz
tar zxvf shinken-0.5.1.tar.gz
~~~

### INSTALLATION DES PREREQUIS {#installation-des-prerequis .sectionedit4}

~~~
yum install python-setuptools python-devel MySQL-python libffi python-simplejson python-sqlite2
~~~

***Installation de Pyro***

~~~
wget http://pypi.python.org/packages/source/P/Pyro/Pyro-3.10.tar.gz
tar zxvf Pyro-3.10.tar.gz
cd Pyro-3.10
python setup.py install
~~~

### AJOUT DE L'UTILISATEUR & GROUPE {#ajout-de-l-utilisateur-groupe .sectionedit5}

~~~
groupadd shinken
useradd -g shinken -G apache -d /usr/local/shinken/ shinken
passwd shinken
passwd -x -1 shinken
~~~

### CONFIGURATION AVANT INSTALLATION {#configuration-avant-installation .sectionedit6}

~~~
mkdir /usr/local/shinken
chown -R shinken:shinken /usr/local/shinken/
~~~

~~~
vi /images/shinken-0.5.1/setup_parameters.cfg
~~~

~~~
[etc]
path=/usr/local/shinken/etc
owner=shinken
group=shinken

[var]
path=/usr/local/shinken/var
owner=shinken
group=shinken

[libexec]
path=/usr/local/shinken/libexec
owner=shinken
group=shinken
~~~

### INSTALLATION DE SHINKEN {#installation-de-shinken .sectionedit7}

~~~
python setup.py install --install-scripts=/usr/local/shinken/bin
~~~

**=⇒ Avant de lancer Shinken nous allons installer les plugins**

### INSTALLATION PLUGINS {#installation-plugins .sectionedit8}

~~~
wget http://sourceforge.net/projects/nagiosplug/files/nagiosplug/1.4.15/nagios-plugins-1.4.15.tar.gz
tar xvf nagios-plugins-1.4.15.tar.gz
cd nagios-plugins-1.4.15
~~~

~~~
./configure --prefix=/usr/local/shinken --with-nagios-user=shinken --with-nagios-group=shinken --enable-libtap --enable-extra-opts --enable-perl-modules
make
make install
~~~

### TEST DE LANCEMENT / FONCTIONNEMENT SHINKEN {#test-de-lancementfonctionnement-shinken .sectionedit9}

~~~
/etc/init.d/shinken-scheduler start
/etc/init.d/shinken-poller start
/etc/init.d/shinken-broker start
/etc/init.d/shinken-reactionner start
/etc/init.d/shinken-arbiter start
~~~

***Vérification des LOGS :***

~~~
ps -fu shinken
tail -f /usr/local/shinken/var/nagios.log
~~~

### INSTALLATION DE L'INTERFACE WEB THRUK {#installation-de-l-interface-web-thruk .sectionedit10}

~~~
arch=$(perl -e 'use Config; print $Config{archname}')
vers=$(perl -e 'use Config; print $Config{version}')
wget http://www.thruk.org/files/Thruk-0.82-$arch-$vers.tar.gz
tar zxf Thruk-0.82-$arch-$vers.tar.gz
cd Thruk-0.82
mkdir /usr/local/shinken/Thruk/
cp -R /images/Thruk-0.82/* /usr/local/shinken/Thruk/
chown -R shinken:shinken /usr/local/shinken/Thruk
~~~

~~~
vi /usr/local/shinken/Thruk/thruk.conf
~~~

~~~
<peer>
    name   = SHINKEN
    type   = livestatus
    <options>
        peer    = 127.0.0.1:50000
    </options>
</peer>
~~~

***Lancement de thruk***

~~~
/usr/local/shinken/Thruk/script/thruk_server.pl
~~~

***Accès à l’interface Thruk***

~~~
http://@IP_SERVEUR:3000/
~~~
