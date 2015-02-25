---
layout: page
---

### Table des matières {.toggle}

-   [Installation d'Icinga sur
    Ubuntu](icinga-ubuntu-install.html#installation-d-icinga-sur-ubuntu)
    -   [Installation depuis les
        sources](icinga-ubuntu-install.html#installation-depuis-les-sources)
        -   [Pré-requis](icinga-ubuntu-install.html#pre-requis)
        -   [Installation](icinga-ubuntu-install.html#installation)

Installation d'Icinga sur Ubuntu {#installation-d-icinga-sur-ubuntu .sectionedit1}
================================

Tutoriel rédigé pour une version Ubuntu 10.10 et Icinga 1.3.0.

Dans ce tutoriel, l’installation d’Icinga 1.3.0 depuis les sources sera
abordé.. Cette méthode d’installation recommande une certaine maîtrise
de l’utilisation du système Ubuntu, mais permet notamment de
personnaliser l’installation d’Icinga selon ses préférences/besoins, et
surtout de disposer de la version la plus récente d’Icinga.

Ce tutoriel a été réalisé par :

  **Rôle**        **Nom**
  --------------- ----------------
  **Rédacteur**   Charles JUDITH

Installation depuis les sources {#installation-depuis-les-sources .sectionedit3}
-------------------------------

### Pré-requis {#pre-requis .sectionedit4}

Installation des dépendances requises à la mise en place d’Icinga :

~~~~ {.code}
$ sudo apt-get install apache2 build-essential libgd2-xpm-dev
$ sudo apt-get install libjpeg62 libjpeg62-dev libpng12-0 libpng12-dev
$ sudo apt-get install snmp libsnmp5-dev
$ sudo apt-get install git 
~~~~

#### Création d’un utilisateur icinga {#creation-d-un-utilisateur-icinga}

L’utilisateur icinga sert à exécuter les composants Icinga (démons),
sans avoir recours à un utilisateur avec des privilèges (root,
sudo-users).

**Rappel :** l’utilisateur icinga ne doit pas être un super-utilisateur
(sudo-user).

~~~~ {.code}
$ sudo groupadd -g 6000 icinga
$ sudo useradd -u 6000 -g icinga -d /usr/local/icinga -c "Icinga User" icinga
$ sudo passwd icinga
$ sudo groupadd icinga-cmd
$ sudo usermod -a -G icinga-cmd icinga
$ sudo usermod -a -G icinga-cmd www-data
~~~~

### Installation {#installation .sectionedit5}

#### Téléchargement d'Icinga et des Plugins {#telechargement-d-icinga-et-des-plugins}

Téléchargement de Nagios::Plugins:

~~~~ {.code}
$ cd /usr/src
$ wget http://downloads.sourceforge.net/project/nagiosplug/nagiosplug/1.4.15/nagios-plugins-1.4.15.tar.gz
$ sudo tar -zxvf nagios-plugins-1.4.15.tar.gz
$ cd nagios-plugins-1.4.15
$ sudo ./configure --prefix=/usr/local/icinga --with-cgiurl=/icinga/cgi-bin \
--with-htmurl=/icinga --with-nagios-user=icinga --with-nagios-group=icinga
$ sudo make all
$ sudo make install
~~~~

Téléchargement d’Icinga:

~~~~ {.code}
$ sudo git clone git://git.icinga.org/icinga-core.git
$ wget http://downloads.sourceforge.net/project/icinga/icinga/1.3.0/icinga-1.3.0.tar.gz
$ tar -zxvf icinga-1.3.0.tar.gz
$ cd icinga-1.3.0
~~~~

Compilation d’Icinga:

~~~~ {.code}
$ sudo ./configure --with-command-group=icinga-cmd
$ sudo make all
$ sudo make install
$ sudo make install-init
$ sudo make install-config
$ sudo make install-commandmode
$ sudo make fullinstall
$ sudo make install-config
$ sudo make cgis
$ sudo make install-cgis
$ sudo make install-html
$ sudo make install-webconf
~~~~

Création du mot de passe de la console web pour l’utilisateur
icingaadmin.

~~~~ {.code}
$ sudo htpasswd -c /usr/local/icinga/etc/htpasswd.users icingaadmin
~~~~

#### Finalisation de l'installation {#finalisation-de-l-installation}

Redémarrage ou reload d’apache afin qu’il relise son fichier de
configuration:

~~~~ {.code}
$ sudo /etc/init.d/apache2 restart
ou
$ sudo /etc/init.d/apache2 reload
~~~~

Activation d’icinga au démarrage de la machine:

~~~~ {.code}
$ sudo update-rc.d icinga defaults
~~~~

Verification de la configuration d’icinga:

~~~~ {.code}
$ sudo /usr/local/icinga/bin/icinga -v /usr/local/icinga/etc/icinga.cfg
ou
$ sudo /etc/init.d/icinga show-errors
~~~~

Si tout est correct, vous pouvez lancer Icinga, au sinon vous devez
corriger l’erreur dans vos fichiers de configuration.

Démarrage d’icinga:

~~~~ {.code}
$ sudo /etc/init.d/icinga start
~~~~

#### Installation terminée {#installation-terminee}

Vous pouvez dès à present vous connecter a la console web d’icinga avec
votre navigateur:

<http://adresse_ip_de_votre_serveur/icinga>”
