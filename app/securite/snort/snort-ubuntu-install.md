---
layout: page
---

[[[Installation de Snort sur
Ubuntu](snort-ubuntu-install@do=backlink.html)]]

[wiki monitoring-fr.org](../../start.html "[ALT+H]")

![Logo Monitoring](../../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../../start.html "start") »
[Sécurité](../start.html "securite:start") »
[Snort](start.html "securite:snort:start") » [Installation de Snort sur
Ubuntu](snort-ubuntu-install.html "securite:snort:snort-ubuntu-install")

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

~~~~ {.code}
$ sudo apt-get update
$ sudo apt-get upgrade
$ sudo apt-get install build-essential checkinstall mysql-server libnet1-dev libpcap0.8-dev libpcre3-dev libmysqlclient15-dev
~~~~

Autres paquets optionnels (selon le choix des outils installés comme
BASE, …etc).

~~~~ {.code}
$ sudo apt-get install php5 php5-gd php5-mysql php5-cli php-pear php5-adodb libphp-adodb libtool libssl-dev apache2 libapache2-mod-php5
~~~~

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

**[Libprelude](../prelude/prelude-ubuntu-install.html#libprelude "securite:prelude:prelude-ubuntu-install")**

Installation {#installation .sectionedit5}
------------

Maintenant, l’installation de Snort peut commencer :

~~~~ {.code}
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
~~~~

### Utilisateur et groupe {#utilisateur-et-groupe .sectionedit6}

Pour l’administration de l’application Snort, il faut créer un
utilisateur d’administration et un groupe (cette étape peut être
optionnelle) :

~~~~ {.code}
$ sudo groupadd snort
$ sudo useradd –g snort –d /usr/local/snort –m snort
$ sudo chown –R snort /var/log/snort
$ sudo chgrp –R snort /var/log/snort
~~~~

### Règles Snort {#regles-snort .sectionedit7}

Ajout des règles Snort:

~~~~ {.code}
$ sudo cd /tmp
$ sudo wget http://dl.snort.org/sub-rules/snortrules-snapshot-2.8_s.tar.gz
$ sudo tar –zxf snortrules-snapshot-2.8_s.tar.gz
$ sudo mv snortrules-snapshot-2.8/rules/* /etc/snort/rules
~~~~

### Règles Emerging {#regles-emerging .sectionedit8}

Ajout des règles Emerging (optionnel) :

~~~~ {.code}
$ sudo cd /etc/snort
$ sudo wget http://emergingthreats.net/rules/emerging.rules.tar.gz
$ sudo tar –zxf emerging.rules.tar.gz
~~~~

### MySQL {#mysql .sectionedit9}

#### Création de la base de données {#creation-de-la-base-de-donnees}

Pour le stockage des alertes de Snort, et pour une visualisation plus
claire que dans un fichier de logs, il est possible de créer une base de
données (tout en conservant la sortie en logs) :

~~~~ {.code}
$ sudo mysql –u root –p
> create database snort;
~~~~

#### Création d’un utilisateur {#creation-d-un-utilisateur}

Ajout d’un utilisateur pour administrer la base de données:

~~~~ {.code}
> grant all on snort.* to snort@localhost;
> set password for snort@localhost=password(‘manager’);
> flush privileges;
> exit
~~~~

#### Construction de la base de données {#construction-de-la-base-de-donnees}

Création des tables et différentes propriétés de la base de données,
grâce à un script fourni dans le paquet d’installation de Snort :

~~~~ {.code}
$ sudo cd /tmp/snort-2.8.4.1/schemas
$ sudo mysql –u snort –p < create_mysql snort
~~~~

#### Vérification {#verification}

Et enfin, pour vérifier que la base de données a bien été construite :

~~~~ {.code}
$ sudo mysql –u snort –p snort
> show tables;
> exit
~~~~

Configuration {#configuration .sectionedit10}
-------------

Pour configurer Snort, il faut éditer le fichier **snort.conf**.

~~~~ {.code}
$ sudo vim /etc/snort/snort.conf
~~~~

### Configuration de base {#configuration-de-base .sectionedit11}

Dans le fichier **snort.conf**, voici les paramètres de base à indiquer
pour le bon fonctionnement de Snort :

Déclaration des interfaces d’écoute :

~~~~ {.code}
var HOME_NET any
var EXTERNAL_NET any
~~~~

Ensuite, il est important d’indiquer le répertoire contenant les règles
:

~~~~ {.code}
var RULE_PATH /etc/snort/rules
~~~~

Définition de la base de données Snort :

~~~~ {.code}
output database: log, mysql, user=snort password=manager dbname=snort host=localhost
~~~~

#### Libprelude {#libprelude1}

**Cette étape n’est à faire que dans le cadre d’une intégration de Snort
à Prelude**

Activation de l’envoi d’alertes vers Prelude:

~~~~ {.code}
$ sudo vim /etc/snort/snort.conf
~~~~

Pour relayer les alertes de snort vers le serveur Prelude, il faut
également ajouter cette ligne :

~~~~ {.code}
output alert_prelude: profile=snort
~~~~

Puis, il est important pour la communication entre Snort et Prelude de
configurer la librairie de Prelude. Pour cela, il faut préciser
l’adresse du serveur Prelude dans le fichier client.conf dans le
repertoire **/usr/local/etc/prelude/default**.

~~~~ {.code}
$ sudo vim /usr/local/etc/prelude/default/client.conf
~~~~

~~~~ {.code}
server-addr = 192.168.1.200
~~~~

#### Test de la configuration de Snort

**Création d’une règle locale de test**

Editer le fichier **local.rules**, ou bien le créer s’il n’existe pas.

~~~~ {.code}
$ sudo vim /etc/snort/rules/local.rules
~~~~

Puis y ajouter cette ligne de test, qui sert à envoyer des alertes
lorsque Snort sniffe et détecte des pings sur le réseau :

~~~~ {.code}
alert icmp any any -> any any (msg:"test ICMP";sid:10000001;)
~~~~

**Lancement de Snort**

Démarrage de Snort:

~~~~ {.code}
$ sudo /usr/local/snort/bin/snort -c /etc/snort/snort.conf
~~~~

**Test**

Lancement du test de la règle **local.rules** :

~~~~ {.code}
$ sudo ping x.x.x.x
~~~~

**Vérification**

Puis vérification de la présence des alertes générées, normalement,
après le test, dans la base de données, et dans le fichier de logs :

~~~~ {.code}
$ sudo vim /var/log/snort/alert
~~~~

et/ou

~~~~ {.code}
$ sudo mysql –u snort –p –D snort –e “select count(*) from event”
~~~~

### Optimisation {#optimisation .sectionedit12}

#### Classification et Référence {#classification-et-reference}

Pour un meilleur fonctionnement de Snort, il faut inclure deux fichiers
supplémentaires dans **snort.conf**. Ces derniers permettent la gestion
des priorités des alertes (niveaux, classification, …etc), et l’usage
des références dans les règles de Snort, d’après notre installation, ces
fichiers se trouvent dans **/etc/snort**.

~~~~ {.code}
include classification.config
include reference.config 
~~~~

#### Déclaration de serveurs {#declaration-de-serveurs}

Afin de préciser les différents serveurs présents sur le réseau que
Snort surveille, il faut éditer dans le fichier **snort.conf**, les
différentes variables disponibles telles que :

~~~~ {.code}
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
~~~~

Voici un exemple :

~~~~ {.code}
var HTTP_SERVERS [192.168.1.10,192.168.1.20,192.168.1.30]
~~~~

#### Activation/Désactivation d'une règle {#activationdesactivation-d-une-regle}

Toujours dans le fichier de configuration de Snort, il est possible de
d’activer ou bien de désactiver les règles. Il suffit pour cela,
respectivement de décommenter ou de commenter une règle.

~~~~ {.code}
...
include $RULE_PATH/other-ids.rules
# include $RULE_PATH/web-attacks.rules
...
~~~~

Utilisation {#utilisation .sectionedit13}
-----------

### Administration de Snort {#administration-de-snort .sectionedit14}

#### Commande

##### snort

Snort ne possède qu’une seule commande, **snort**, cette dernière
regroupe toutes les options nécessaires pour le fonctionnement de
l’application.

Usage :

~~~~ {.code}
/usr/local/snort/bin/snort [-options] <filter options>
~~~~

Pour plus d’informations sur les options de la commande :

~~~~ {.code}
/usr/local/snort/bin/snort --h
~~~~

### Démarrage de Snort {#demarrage-de-snort .sectionedit15}

Pour démarrer Snort, il faut entrer cette commande :

~~~~ {.code}
$ sudo /usr/local/snort/bin/snort -c /etc/snort/snort.conf
~~~~

La visualisation des alertes se fait dans le fichier alert :

~~~~ {.code}
$ sudo vim /var/log/snort/alert
~~~~

SOMMAIRE {#sommaire .sectionedit1}
--------

**[Accueil](../../start.html "start")**

**[Supervision](../../supervision/start.html "supervision:start")**

-   [Nagios](../../nagios/start.html "nagios:start")
-   [Centreon](../../centreon/start.html "centreon:start")
-   [Shinken](../../shinken/start.html "shinken:start")
-   [Zabbix](../../zabbix/start.html "zabbix:start")
-   [OpenNMS](../../opennms/start.html "opennms:start")
-   [EyesOfNetwork](../../eyesofnetwork/start.html "eyesofnetwork:start")
-   [Groundwork](../../groundwork/start.html "groundwork:start")
-   [Zenoss](../../zenoss/start.html "zenoss:start")
-   [Vigilo](../../vigilo/start.html "vigilo:start")
-   [Icinga](../../icinga/start.html "icinga:start")
-   [Cacti](../../cacti/start.html "cacti:start")
-   [Ressenti
    utilisateur](../../supervision/eue/start.html "supervision:eue:start")
-   [Ressenti utilisateur avec
    sikuli](../../sikuli/eue/start.html "sikuli:eue:start")

**[Hypervision](../../hypervision/start.html "hypervision:start")**

-   [Canopsis](../../canopsis/start.html "canopsis:start")

**[Sécurité](../start.html "securite:start")**

**[Infrastructure](../../infra/start.html "infra:start")**

**[Développement](../../dev/start.html "dev:start")**

Sécurité {#securite .sectionedit1}
--------

-   [Architecture d'une solution Sécurité
    OSS](../architecture-oss/start.html "securite:architecture-oss:start")
-   [Ossec](../ossec/start.html "securite:ossec:start")
    -   [Installation d'Ossec sur
        Ubuntu](../ossec/ossec-ubuntu-install.html "securite:ossec:ossec-ubuntu-install")
    -   [Prise en main
        d'Ossec](../ossec/ossec-use.html "securite:ossec:ossec-use")
-   [Prelude-IDS](../prelude/start.html "securite:prelude:start")
    -   [Installation de Prelude-IDS sur
        Ubuntu](../prelude/prelude-ubuntu-install.html "securite:prelude:prelude-ubuntu-install")
    -   [Prise en main de
        Prelude-IDS](../prelude/prelude-use.html "securite:prelude:prelude-use")
-   [Snort](start.html "securite:snort:start")
    -   [Installation de Oinkmaster sur
        Ubuntu](oinkmaster-ubuntu-install.html "securite:snort:oinkmaster-ubuntu-install")
    -   [Installation de Snort sur
        Ubuntu](snort-ubuntu-install.html "securite:snort:snort-ubuntu-install")

-   [Afficher le texte
    source](snort-ubuntu-install@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](snort-ubuntu-install@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](snort-ubuntu-install@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](snort-ubuntu-install@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](snort-ubuntu-install@do=media.html "Gestionnaire de médias")
-   [Index](snort-ubuntu-install@do=index.html "Index [X]")
-   [Connexion](snort-ubuntu-install@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de
    page](snort-ubuntu-install.html#dokuwiki__top "Haut de page [T]")

securite/snort/snort-ubuntu-install.txt · Dernière modification:
2013/03/29 09:39 (modification externe)

[![CC Attribution-Noncommercial-Share Alike 3.0
Unported](../../lib/images/license/button/cc-by-nc-sa.png)](http://creativecommons.org/licenses/by-nc-sa/3.0/)

[![www.chimeric.de](../../lib/tpl/arctic/images/button-chimeric-de.png)](http://www.chimeric.de "www.chimeric.de")
[![Valid
CSS](../../lib/tpl/arctic/images/button-css.png)](http://jigsaw.w3.org/css-validator/check/referer "Valid CSS")
[![Driven by
DokuWiki](../../lib/tpl/arctic/images/button-dw.png)](http://wiki.splitbrain.org/wiki:dokuwiki "Driven by DokuWiki")
[![do yourself a favour and use a real browser - get
firefox!!](../../lib/tpl/arctic/images/button-firefox.png)](http://www.firefox-browser.de "do yourself a favour and use a real browser - get firefox")
[![Recent changes RSS
feed](../../lib/tpl/arctic/images/button-rss.png)](../../feed.php "Recent changes RSS feed")
[![Valid XHTML
1.0](../../lib/tpl/arctic/images/button-xhtml.png)](http://validator.w3.org/check/referer "Valid XHTML 1.0")

![](../../lib/exe/indexer.php@id=securite%253Asnort%253Asnort-ubuntu-install&1424859806)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
