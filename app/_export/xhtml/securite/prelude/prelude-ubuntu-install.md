---
layout: page
---

### Table des matières {.toggle}

-   [Installation de Prelude-IDS sur
    Ubuntu](prelude-ubuntu-install.html#installation-de-prelude-ids-sur-ubuntu)
    -   [Pré-requis](prelude-ubuntu-install.html#pre-requis)
    -   [Libprelude](prelude-ubuntu-install.html#libprelude)
        -   [Téléchargement](prelude-ubuntu-install.html#telechargement)
        -   [Installation](prelude-ubuntu-install.html#installation)
        -   [Configuration](prelude-ubuntu-install.html#configuration)
    -   [LibpreludeDB](prelude-ubuntu-install.html#libpreludedb)
        -   [Pré-requis](prelude-ubuntu-install.html#pre-requis1)
        -   [Téléchargement](prelude-ubuntu-install.html#telechargement1)
        -   [Installation](prelude-ubuntu-install.html#installation1)
    -   [Prelude-Manager](prelude-ubuntu-install.html#prelude-manager)
        -   [Téléchargement](prelude-ubuntu-install.html#telechargement2)
        -   [Installation](prelude-ubuntu-install.html#installation2)
        -   [Configuration](prelude-ubuntu-install.html#configuration1)
    -   [Prelude-Correlator](prelude-ubuntu-install.html#prelude-correlator)
        -   [Pré-requis](prelude-ubuntu-install.html#pre-requis2)
        -   [Téléchargement](prelude-ubuntu-install.html#telechargement3)
        -   [Installation](prelude-ubuntu-install.html#installation3)
        -   [Configuration](prelude-ubuntu-install.html#configuration2)
    -   [Prelude-LML](prelude-ubuntu-install.html#prelude-lml)
        -   [Téléchargement](prelude-ubuntu-install.html#telechargement4)
        -   [Installation](prelude-ubuntu-install.html#installation4)
        -   [Configuration](prelude-ubuntu-install.html#configuration3)
    -   [Prewikka](prelude-ubuntu-install.html#prewikka)
        -   [Pré-requis](prelude-ubuntu-install.html#pre-requis3)
        -   [Téléchargement](prelude-ubuntu-install.html#telechargement5)
        -   [Installation](prelude-ubuntu-install.html#installation5)
        -   [Configuration](prelude-ubuntu-install.html#configuration4)

Installation de Prelude-IDS sur Ubuntu {#installation-de-prelude-ids-sur-ubuntu .sectionedit1}
======================================

Tutoriel rédigé pour une version Ubuntu 8.04 LTS et Prelude-IDS 0.9.

Ce tutoriel a été réalisé par :

  **Rôle**        **Nom**
  --------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------
  **Rédacteur**   [Ludovic VALENTIN](http://www.monitoring-fr.org/community/members/ludovic-valentin/ "http://www.monitoring-fr.org/community/members/ludovic-valentin/")

Pré-requis {#pre-requis .sectionedit3}
----------

Pour la préparation d’un environnement Prelude, il faut installer
certains paquets :

~~~
$ sudo apt-get update
$ sudo apt-get upgrade
$ sudo apt-get install man wget ssh build-essential checkinstall libpcap-dev flex byacc gtk-doc-tools libssl-dev libxml-dev libpcre3-dev libfam-dev gnutls-bin libgcrypt11-dev libgnutls-dev libgpg-error-dev libopencdk10-dev libxmlsec1 libxmlsec1-gnutls
~~~

Libprelude {#libprelude .sectionedit4}
----------

### Téléchargement {#telechargement .sectionedit5}

Récupération de la librairie de Prelude :

~~~
$ sudo wget http://www.prelude-ids.com/download/releases/libprelude/libprelude-0.9.24.1.tar.gz
~~~

### Installation {#installation .sectionedit6}

Installation de la librairie :

Attention : ne pas oublier l’installation des pré-requis.

~~~
$ sudo tar zxf libprelude-0.9.24.1.tar.gz

$ cd libprelude-0.9.24.1

$ sudo ./configure --enable-easy-bindings --enable-gtk-doc

*** Dumping configuration ***

    - Generate documentation   : yes

    - Libtool dynamic loader   : System

    - LUA binding              : no

    - Perl binding             : yes

    - Python binding           : yes

    - Ruby binding             : no

    - Easy bindings            : yes
~~~

~~~
$ sudo make

$ sudo make install

$ sudo ln /sbin/ldconfig /usr/local/lib

$ sudo export LD_LIBRARY_PATH=/usr/local/lib
~~~

~~~
$ sudo vim /etc/ld.so.conf

include /usr/local/lib
~~~

~~~
$ sudo ldconfig
~~~

### Configuration {#configuration .sectionedit7}

Cette partie correspond à la configuration de Prelude en général,
c’est-à-dire à Libprelude installé sur un poste client ou serveur. En
effet, quelque soit l’usage, et l’installation étant la même sur les
deux types de postes, la configuration de base de Prelude se trouve par
défaut dans le répertoire **/usr/local/etc/prelude/default**.

Ce dossier contient plusieurs fichiers de configuration tels que:

-   **client.conf**
-   **global.conf**
-   **idmef-client.conf**
-   **tls.conf**

#### client.conf {#clientconf}

Ce fichier est à éditer que dans le cadre d’une configuration d’un agent
ou d’une sonde (exemple: Prelude-Correlator, Ossec, …etc).
**client.conf** permet notamment d’indiquer l’adresse du serveur Prelude
(Prelude-Manager), et de paramétrer les différents échanges (au niveau
tcp, et tls) entre le client et le serveur.

#### global.conf {#globalconf}

Le fichier **global.conf** contient la configuration pouvant servir
aussi bien pour le serveur, que pour le client (agent, ou sonde). Dans
ce fichier, il est possible de paramétrer certaines options pour gérer
des champs à remplir lors de l’envoi d’alerte, ou encore pour préciser
les informations sur le poste serveur ou client (multiples adresses ip,
nom du vlan, …etc).

#### idmef-client.conf {#idmef-clientconf}

Quant à ce fichier, **idmef-client.conf**, il contient les liens vers
les deux fichiers précédents, à savoir **client.conf** et
**global.conf**.

#### tls.conf {#tlsconf}

Afin de paramétrer la génération des certificats, comme la durée de vie
ou la valeur de la clé de cryptage (par défaut 1024), il faut éditer le
fichier **tls.conf**.

LibpreludeDB {#libpreludedb .sectionedit8}
------------

### Pré-requis {#pre-requis1 .sectionedit9}

L’ajout d’une base de données sur un serveur Prelude requiert des
paquets supplémentaires :

~~~
$ sudo apt-get install mysql-server libmysqlclient15-dev
~~~

### Téléchargement {#telechargement1 .sectionedit10}

Téléchargement de la librairie de base de données de Prelude:

~~~
$ sudo wget http://www.prelude-ids.com/download/releases/libpreludedb/libpreludedb-0.9.15.3.tar.gz
~~~

### Installation {#installation1 .sectionedit11}

Installation de la librairie:

~~~
$ sudo tar zxf libpreludedb-0.9.15.3.tar.gz

$ cd libprelude-0.9.15.3

$ sudo ./configure --with-postgresql=no --enable-gtk-doc

*** Dumping configuration ***

    - Generate documentation      : yes

    - Enable MySQL plugin         : yes

    - Enable PostgreSQL plugin    : no

    - Enable SQLite3 plugin       : no

    - Perl binding                : yes

    - Python binding              : yes
~~~

~~~
$ sudo make

$ sudo make install
~~~

~~~
$ sudo vim /etc/ld.so.conf

include /usr/local/lib/libpreludedb/plugins/formats

include /usr/local/lib/libpreludedb/plugins/sql
~~~

~~~
$ sudo ldconfig
~~~

#### Création de la base de données {#creation-de-la-base-de-donnees}

Pour stocker les alertes, création de la base de données Prelude :

~~~
$ sudo mysql -u root –p

> create database prelude;

> grant all privileges on prelude.* to prelude@localhost identified by 'prelude';

> grant all privileges on prelude.* to prelude@nagios identified by 'prelude';

> exit

$ sudo mysql -u prelude -p prelude < /usr/local/share/libpreludedb/classic/mysql.sql
~~~

Bien sûr, dans cet exemple, le mot-de-passe pour l’utilisateur prelude
est tout simplement prelude, ce qui n’est pas recommandé dans un
contexte réel en entreprise, libre à vous d’en préciser un autre. Il en
est de même pour l’utilisateur prelude, utilisé par défaut dans ce
projet.

Prelude-Manager {#prelude-manager .sectionedit12}
---------------

### Téléchargement {#telechargement2 .sectionedit13}

Ensuite, il faut télécharger le paquet Prelude-Manager:

~~~
$ sudo wget http://www.prelude-ids.com/download/releases/prelude-manager/prelude-manager-0.9.15.tar.gz
~~~

### Installation {#installation2 .sectionedit14}

Et enfin l’installer:

~~~
$ sudo tar zxf prelude-manager-0.9.15.tar.gz

$ cd prelude-manager-0.9.15

$ sudo ./configure

*** Dumping configuration ***

    - TCP wrapper support    : no

    - XML plugin support     : yes

    - Database plugin support: yes
~~~

~~~
$ sudo make

$ sudo make install
~~~

~~~
$ sudo vim /etc/ld.so.conf

include /usr/local/lib/prelude-manager/decodes

include /usr/local/lib/prelude-manager/filters

include /usr/local/lib/prelude-manager/reports$ sudo ldconfig
~~~

~~~
$ sudo ldconfig
~~~

### Configuration {#configuration1 .sectionedit15}

Pour configurer Prelude-Manager, il faut éditer le fichier
**prelude-manager.conf**, par défaut ce dernier se trouve sous le
répertoire **/usr/local/etc/prelude-manager**.

~~~
$ sudo vim /usr/local/etc/prelude-manager/prelude-manager.conf
~~~

#### Configuration de base

Dans **prelude-manager.conf**, le réseau sur lequel Prelude-Manager
écoute doit être précisé, afin que ce dernier accepte les connexions des
clients (sondes). Pour simplifié, ici l’adresse choisie est globale.

~~~
listen = 0.0.0.0
~~~

Ensuite, il reste à indiquer les paramètres de la base de données de
Prelude (LibpreludeDB) :

~~~
[db]
type = mysql
host = localhost
port = 3306
name = prelude
user = prelude
pass = manager
~~~

Avec ces paramètres, Prelude-Manager est prêt à démarrer et à
fonctionner.

#### Optimisation

Une fois la configuration de base terminée, il est possible d’optimiser
Prelude-Manager dans **prelude-manager.conf**.

##### Logs

L’activation du debug en mode texte se fait en ajoutant ces lignes :

~~~
...
[debug]
logfile = stderr
logfile = /var/log/prelude.log
...
~~~

##### Relaying

Pour relayer les alertes d’un Prelude-Manager vers un autre, voir
plusieurs :

~~~
...
[relaying]
parent-managers = 192.168.1.100 || 192.168.1.101 && 192.168.1.102
...
~~~

Dans l’exemple précédent, Prelude-Manager relaye les alertes vers le
Prelude-Manager 192.168.1.100 **OU** en cas d’échec, vers les
Prelude-Managers 192.168.1.101 **ET** 192.168.1.102.

Prelude-Correlator {#prelude-correlator .sectionedit16}
------------------

### Pré-requis {#pre-requis2 .sectionedit17}

L’ajout de Prelude-Correlator nécessite l’installation d’un
environnement python :

~~~
$ sudo apt-get install python
~~~

### Téléchargement {#telechargement3 .sectionedit18}

Téléchargement du plugin de corrélation de Prelude :

~~~
$ sudo wget http://www.prelude-ids.com/download/releases/prelude-correlator/prelude-correlator-0.9.0-beta6.tar.gz
~~~

### Installation {#installation3 .sectionedit19}

Installation du module de corrélation:

~~~
$ sudo tar zxf prelude-correlator-0.9.0-beta6.tar.gz

$ cd prelude-correlator-0.9.0-beta6

$ sudo python setup.py build

$ sudo python setup.py install
~~~

~~~
$ sudo vim /etc/ld.so.conf

include /usr/local/lib/prelude-correlator
~~~

~~~
$ sudo ldconfig
~~~

### Configuration {#configuration2 .sectionedit20}

La configuration de Prelude-Correlator se fait dans le fichier
**prelude-correlator.conf**.

~~~
$ vim /etc/prelude-correlator/prelude-correlator.conf
~~~

#### Configuration de base {#configuration-de-base1}

Correctement installé, Prelude-Correlator ne nécessite aucune
configuration.

Ne pas oublier d’éditer le fichier **client.conf**, afin d’indiquer
l’adresse ip du serveur Prelude-Manager.

#### Règles de corrélation {#regles-de-correlation}

Par défaut, il y a très peu de règles de corrélation fournies dans le
paquet. Donc pour répondre à vos propres besoins, il n’y a pour
l’instant pas le choix, il faut écrire des règles. Le langage utilisé
pour écrire les règles est le Python.

L’ajout d’une règle se fait en la copiant dans le répertoire
**/usr/lib/python2.5/site-packages/PreludeCorrelator/plugins**,
bizarrement, ce n’est pas dans le dossier
**/etc/prelude-correlator/rules**, car les règles placées seulement dans
ce dernier ne sont pas chargées au démarrage de Prelude-Correlator.

Ensuite, il reste à déclarer la nouvelle règle dans le fichier
**entry\_points.txt**.

~~~
$ vim /usr/lib/python2.5/site-packages/prelude_correlator-0.9.0_beta6-py2.5.egg-info/entry_points.txt
~~~

Voici un exemple de déclaration dans entry\_points.txt, il suffit de
suivre l’exemple des règles par défaut :

~~~
[PreludeCorrelator.plugins]
...
NewRulePlugin = PreludeCorrelator.plugins.scan:NewRulePlugin
...
~~~

Dans le fichier de configuration **prelude-correlator.conf**, il est
possible de désactiver des règles, sans les supprimer. Pour cela, il
faut indiquer les plugins, c’est-à-dire les règles à charger par le
corrélateur. Exemple :

~~~
…
[BruteForcePlugin]
disable = false
[FirewallPlugin]
disable = True
…
~~~

Prelude-LML {#prelude-lml .sectionedit21}
-----------

### Téléchargement {#telechargement4 .sectionedit22}

Pour installer le module Prelude-LML, il faut récupérer le paquet:

~~~
$ sudo wget http://www.prelude-ids.com/download/releases/prelude-lml/prelude-lml-0.9.15.tar.gz
~~~

### Installation {#installation4 .sectionedit23}

Puis le compiler et l’installer:

~~~
$ sudo tar zxf prelude-lml-0.9.15.tar.gz

$ cd prelude-lml-0.9.15

$ sudo ./configure

*** Dumping configuration ***

    - Enable unsupported rulesets       : yes

$ sudo make

$ sudo make install
~~~

~~~
$ sudo vim /etc/ld.so.conf

include /usr/local/lib/prelude-lml
~~~

~~~
$ sudo ldconfig
~~~

### Configuration {#configuration3 .sectionedit24}

Pour configurer Prelude-LML, il faut éditer le fichier
**prelude-lml.conf**.

~~~
$ sudo vim /usr/local/etc/prelude-lml/prelude-lml.conf
~~~

#### Configuration de base {#configuration-de-base2}

Ne pas oublier d’éditer le fichier **client.conf**.

#### Optimisation {#optimisation1}

Pour prendre en compte les syslogs par exemple, y ajouter :

~~~
[format=syslog]

time-format = "%b %d %H:%M:%S"

prefix-regex = "^(?P<timestamp>.{15}) (?P<hostname>\S+) (?:(?P<process>\S+?)(?:\[(?P<pid>[0-9]+)\])?: )?"

file = /var/log/messages
~~~

Prewikka {#prewikka .sectionedit25}
--------

### Pré-requis {#pre-requis3 .sectionedit26}

La mise en place de l’interface web nécessite d’installer quelques
paquets supplémentaires :

~~~
$ sudo apt-get install apache2 libapache2-mod-python mysql-server python python-dev python-setuptools
~~~

### Téléchargement {#telechargement5 .sectionedit27}

Pour mettre en place une interface graphique de Prelude, il faut
télécharger le module Prewikka:

~~~
$ sudo wget http://www.prelude-ids.com/download/releases/prewikka/prewikka-0.9.17.tar.gz
~~~

### Installation {#installation5 .sectionedit28}

Installation de l’interface Prewikka:

~~~
$ sudo tar zxf prewikka-0.9.17

$ cd prewikka-0.9.17

$ sudo apt-get install cheetah

$ sudo python setup.py build

$ sudo python setup.py install
~~~

#### Création de la base de données {#creation-de-la-base-de-donnees1}

Pour l’interface Prewikka, il faut créer une base de données :

~~~
$ sudo mysql -u root –p

> create database prewikka;

> grant all privileges on prewikka.* to prewikka@localhost identified by 'prewikka';

> exit

$ sudo mysql -u prewikka -p prewikka < /usr/share/prewikka/database/mysql.sql
~~~

### Configuration {#configuration4 .sectionedit29}

Pour activer l’interface Web de Prelude, il faut commencer par
configurer Prewikka. Ce dernier dispose d’un fichier de configuration,
**prewikka.conf**.

~~~
$ sudo vim /etc/prewikka/prewikka.conf
~~~

#### Configuration de base {#configuration-de-base3}

Dans **prewikka.conf**, il faut précisé les paramètres des bases de
données à utiliser. Voici les champs à compléter:

~~~
[idmef_database]
#
# if your database is a sqlite file, please use:
#
# type: sqlite3
# file: /path/to/your/sqlite_database
#
type: mysql
host: localhost
user: prelude
pass: prelude
name: prelude

[database]
type: mysql
host: localhost
user: prewikka
pass: prewikka
name: prewikka
~~~

La première partie correspond à la base de données de Prelude-Manager,
contenant les alertes IDMEF. Quant à la seconde base de données, c’est
celle de Prewikka, crée lors de l’installation de ce dernier pour
ajouter une interface graphique.

##### Apache

Ensuite il reste tout simplement éditer les fichiers de configuration
d’Apache.

Tout d’abord, il faut créer un fichier pour notre Prewikka :

~~~
$ sudo vim /etc/apache2/sites-available/prewikka
~~~

Puis y ajouter ces lignes pour créer un VirtualHost :

~~~
NameVirtualHost PRELUDE
<VirtualHost 192.168.1.100>
        ServerAdmin webmaster@localhost

        ServerName PRELUDE
        Alias /prewikka/ /usr/share/prewikka/htdocs/
        ScriptAlias / /usr/share/prewikka/cgi-bin/prewikka.cgi

        DocumentRoot /var/www/

        <Directory />
                Options FollowSymLinks
                AllowOverride None
        </Directory>

        <Directory /var/www/>
                Options Indexes FollowSymLinks MultiViews
                AllowOverride None
                Order allow,deny
                allow from all
        </Directory>
        <Directory "/usr/share/prewikka">
                AllowOverride FileInfo AuthConfig Limit Indexes
                Options MultiViews Indexes SymLinksIfOwnerMatch IncludesNoExec
                <Limit GET POST OPTIONS>
                        Order allow,deny
                        Allow from all
                </Limit>
                <LimitExcept GET POST OPTIONS>
                        Order deny,allow
                        Deny from all
                </LimitExcept>
        </Directory>
</VirtualHost>
~~~

Et enfin, pour terminer il faut activer le site prewikka :

~~~
$ a2ensite prewikka
~~~

#### Optimisation {#optimisation2}

A travers le fichier **prewikka.conf**, il est possible d’optimiser la
configuration de Prewikka.

##### Authentification

L’authentification de Prewikka peut être modifiée, soit en la
désactivant, soit en indiquant les paramètres de l’administrateur de
base, initial (par défaut admin/admin).

~~~
...
[auth loginpassword]
expiration: 60
initial_admin_user: admin
initial_admin_pass: admin
...
~~~

Pour désactiver l’authentification, il suffit de commenter les lignes
précédentes :

~~~
...
#[auth loginpassword]
#expiration: 60
#initial_admin_user: admin
#initial_admin_pass: admin
...
~~~

##### Logs {#logs1}

Pour activer les logs de Prewikka, il faut indiquer un fichier en sortie
:

~~~
...
[log file]
level: debug
file: /var/log/prewikka.log
...
~~~

Pour affiner les paramètres de logs, il existe d’autres sections
(syslog, stderr, netventlog, …) :

~~~
...
[log syslog]
level: warning
...
~~~
