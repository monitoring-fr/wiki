---
layout: page
---

### Table des matières {.toggle}

-   [Installation de Snort sur
    Ubuntu](snort-ubuntu-install.html#installation-de-snort-sur-ubuntu)
    -   [Pré-requis](snort-ubuntu-install.html#pre-requis)
        -   [Libprelude](snort-ubuntu-install.html#libprelude)
    -   [Installation](snort-ubuntu-install.html#installation)
        -   [Utilisateur et
            groupe](snort-ubuntu-install.html#utilisateur-et-groupe)
        -   [Règles Snort](snort-ubuntu-install.html#regles-snort)
        -   [Règles Emerging](snort-ubuntu-install.html#regles-emerging)
        -   [MySQL](snort-ubuntu-install.html#mysql)
    -   [Configuration](snort-ubuntu-install.html#configuration)
        -   [Configuration de
            base](snort-ubuntu-install.html#configuration-de-base)
        -   [Optimisation](snort-ubuntu-install.html#optimisation)
    -   [Utilisation](snort-ubuntu-install.html#utilisation)
        -   [Administration de
            Snort](snort-ubuntu-install.html#administration-de-snort)
        -   [Démarrage de
            Snort](snort-ubuntu-install.html#demarrage-de-snort)

Installation de Snort sur Ubuntu {#installation-de-snort-sur-ubuntu .sectionedit1}
================================

Tutoriel rédigé pour une version Ubuntu 8.04 LTS et Snort 2.8.4.1.

Ce tutoriel a été réalisé par :

  **Rôle**        **Nom**
  --------------- ------------------
  **Rédacteur**   Ludovic VALENTIN

Pré-requis {#pre-requis .sectionedit3}
----------

Il faut commencer par préparer le serveur en effectuant différentes
mises à jour et installations, de manière à pouvoir installer
correctement l’application Snort.

~~~
$ sudo apt-get update
$ sudo apt-get upgrade
$ sudo apt-get install build-essential checkinstall mysql-server libnet1-dev libpcap0.8-dev libpcre3-dev libmysqlclient15-dev
~~~

Autres paquets optionnels (selon le choix des outils installés comme
BASE, …etc).

~~~
$ sudo apt-get install php5 php5-gd php5-mysql php5-cli php-pear php5-adodb libphp-adodb libtool libssl-dev apache2 libapache2-mod-php5
~~~

Et bien sûr les essentiels du type wget, man, …etc.

### Libprelude {#libprelude .sectionedit4}

**Cette installation (libprelude) est à utiliser que dans le cadre d’une
architecture réseau, dans laquelle Snort génère des alertes vers un
serveur Prelude**

L’installation de Libprelude est obligatoire pour pouvoir enregistrer le
serveur Snort auprès du serveur Prelude. Ainsi, Snort est considéré
comme une sonde de Prelude et peut alors échanger avec ce dernier de
manière sécurisé.

Pour installer la librairie de Prelude, voir cette page :

**[Libprelude](../../../../securite/prelude/prelude-ubuntu-install.html#libprelude "securite:prelude:prelude-ubuntu-install")**

Installation {#installation .sectionedit5}
------------

Maintenant, l’installation de Snort peut commencer :

~~~
$ sudo cd /tmp
$ sudo wget http://dl.snort.org/snort-current/snort-2.8.4.1.tar.gz
$ sudo tar --zxf snort-2.8.4.1.tar.gz
$ sudo cd snort-2.8.4.1
$ sudo ./configure --with-mysql --enable-dynamicplugin --prefix=/usr/local/snort --enable-prelude
$ sudo make
$ sudo make install
$ sudo mkdir /etc/snort
$ sudo mkdir /var/log/snort
$ sudo mkdir /etc/snort/rules_backup
$ sudo mkdir /etc/snort/packages
$ sudo cp /tmp/snort-2.8.4.1/etc/*.conf* /etc/snort
$ sudo cp /tmp/snort-2.8.4.1/etc/*.map /etc/snort
~~~

### Utilisateur et groupe {#utilisateur-et-groupe .sectionedit6}

Pour l’administration de l’application Snort, il faut créer un
utilisateur d’administration et un groupe (cette étape peut être
optionnelle) :

~~~
$ sudo groupadd snort
$ sudo useradd –g snort –d /usr/local/snort –m snort
$ sudo chown –R snort /var/log/snort
$ sudo chgrp –R snort /var/log/snort
~~~

### Règles Snort {#regles-snort .sectionedit7}

Ajout des règles Snort:

~~~
$ sudo cd /tmp
$ sudo wget http://dl.snort.org/sub-rules/snortrules-snapshot-2.8_s.tar.gz
$ sudo tar –zxf snortrules-snapshot-2.8_s.tar.gz
$ sudo mv snortrules-snapshot-2.8/rules/* /etc/snort/rules
~~~

### Règles Emerging {#regles-emerging .sectionedit8}

Ajout des règles Emerging (optionnel) :

~~~
$ sudo cd /etc/snort
$ sudo wget http://emergingthreats.net/rules/emerging.rules.tar.gz
$ sudo tar –zxf emerging.rules.tar.gz
~~~

### MySQL {#mysql .sectionedit9}

#### Création de la base de données {#creation-de-la-base-de-donnees}

Pour le stockage des alertes de Snort, et pour une visualisation plus
claire que dans un fichier de logs, il est possible de créer une base de
données (tout en conservant la sortie en logs) :

~~~
$ sudo mysql –u root –p
> create database snort;
~~~

#### Création d’un utilisateur {#creation-d-un-utilisateur}

Ajout d’un utilisateur pour administrer la base de données:

~~~
> grant all on snort.* to snort@localhost;
> set password for snort@localhost=password(‘manager’);
> flush privileges;
> exit
~~~

#### Construction de la base de données {#construction-de-la-base-de-donnees}

Création des tables et différentes propriétés de la base de données,
grâce à un script fourni dans le paquet d’installation de Snort :

~~~
$ sudo cd /tmp/snort-2.8.4.1/schemas
$ sudo mysql –u snort –p < create_mysql snort
~~~

#### Vérification {#verification}

Et enfin, pour vérifier que la base de données a bien été construite :

~~~
$ sudo mysql –u snort –p snort
> show tables;
> exit
~~~

Configuration {#configuration .sectionedit10}
-------------

Pour configurer Snort, il faut éditer le fichier **snort.conf**.

~~~
$ sudo vim /etc/snort/snort.conf
~~~

### Configuration de base {#configuration-de-base .sectionedit11}

Dans le fichier **snort.conf**, voici les paramètres de base à indiquer
pour le bon fonctionnement de Snort :

Déclaration des interfaces d’écoute :

~~~
var HOME_NET any
var EXTERNAL_NET any
~~~

Ensuite, il est important d’indiquer le répertoire contenant les règles
:

~~~
var RULE_PATH /etc/snort/rules
~~~

Définition de la base de données Snort :

~~~
output database: log, mysql, user=snort password=manager dbname=snort host=localhost
~~~

#### Libprelude {#libprelude1}

**Cette étape n’est à faire que dans le cadre d’une intégration de Snort
à Prelude**

Activation de l’envoi d’alertes vers Prelude:

~~~
$ sudo vim /etc/snort/snort.conf
~~~

Pour relayer les alertes de snort vers le serveur Prelude, il faut
également ajouter cette ligne :

~~~
output alert_prelude: profile=snort
~~~

Puis, il est important pour la communication entre Snort et Prelude de
configurer la librairie de Prelude. Pour cela, il faut préciser
l’adresse du serveur Prelude dans le fichier client.conf dans le
repertoire **/usr/local/etc/prelude/default**.

~~~
$ sudo vim /usr/local/etc/prelude/default/client.conf
~~~

~~~
server-addr = 192.168.1.200
~~~

#### Test de la configuration de Snort

**Création d’une règle locale de test**

Editer le fichier **local.rules**, ou bien le créer s’il n’existe pas.

~~~
$ sudo vim /etc/snort/rules/local.rules
~~~

Puis y ajouter cette ligne de test, qui sert à envoyer des alertes
lorsque Snort sniffe et détecte des pings sur le réseau :

~~~
alert icmp any any -> any any (msg:"test ICMP";sid:10000001;)
~~~

**Lancement de Snort**

Démarrage de Snort:

~~~
$ sudo /usr/local/snort/bin/snort -c /etc/snort/snort.conf
~~~

**Test**

Lancement du test de la règle **local.rules** :

~~~
$ sudo ping x.x.x.x
~~~

**Vérification**

Puis vérification de la présence des alertes générées, normalement,
après le test, dans la base de données, et dans le fichier de logs :

~~~
$ sudo vim /var/log/snort/alert
~~~

et/ou

~~~
$ sudo mysql –u snort –p –D snort –e “select count(*) from event”
~~~

### Optimisation {#optimisation .sectionedit12}

#### Classification et Référence {#classification-et-reference}

Pour un meilleur fonctionnement de Snort, il faut inclure deux fichiers
supplémentaires dans **snort.conf**. Ces derniers permettent la gestion
des priorités des alertes (niveaux, classification, …etc), et l’usage
des références dans les règles de Snort, d’après notre installation, ces
fichiers se trouvent dans **/etc/snort**.

~~~
include classification.config
include reference.config 
~~~

#### Déclaration de serveurs {#declaration-de-serveurs}

Afin de préciser les différents serveurs présents sur le réseau que
Snort surveille, il faut éditer dans le fichier **snort.conf**, les
différentes variables disponibles telles que :

~~~
...
# List of DNS servers on your network
var DNS_SERVERS $HOME_NET

# List of SMTP servers on your network
var SMTP_SERVERS $HOME_NET

# List of web servers on your network
var HTTP_SERVERS $HOME_NET

# List of sql servers on your network
var SQL_SERVERS $HOME_NET

# List of telnet servers on your network
var TELNET_SERVERS $HOME_NET

# List of snmp servers on your network
var SNMP_SERVERS $HOME_NET
...
~~~

Voici un exemple :

~~~
var HTTP_SERVERS [192.168.1.10,192.168.1.20,192.168.1.30]
~~~

#### Activation/Désactivation d'une règle {#activationdesactivation-d-une-regle}

Toujours dans le fichier de configuration de Snort, il est possible de
d’activer ou bien de désactiver les règles. Il suffit pour cela,
respectivement de décommenter ou de commenter une règle.

~~~
...
include $RULE_PATH/other-ids.rules
# include $RULE_PATH/web-attacks.rules
...
~~~

Utilisation {#utilisation .sectionedit13}
-----------

### Administration de Snort {#administration-de-snort .sectionedit14}

#### Commande

##### snort

Snort ne possède qu’une seule commande, **snort**, cette dernière
regroupe toutes les options nécessaires pour le fonctionnement de
l’application.

Usage :

~~~
/usr/local/snort/bin/snort [-options] <filter options>
~~~

Pour plus d’informations sur les options de la commande :

~~~
/usr/local/snort/bin/snort --h
~~~

### Démarrage de Snort {#demarrage-de-snort .sectionedit15}

Pour démarrer Snort, il faut entrer cette commande :

~~~
$ sudo /usr/local/snort/bin/snort -c /etc/snort/snort.conf
~~~

La visualisation des alertes se fait dans le fichier alert :

~~~
$ sudo vim /var/log/snort/alert
~~~
