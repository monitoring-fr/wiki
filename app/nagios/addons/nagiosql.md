---
layout: page
---

[[[NagiosQL](nagiosql@do=backlink.html)]]

[wiki monitoring-fr.org](../../start.html "[ALT+H]")

![Logo Monitoring](../../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../../start.html "start") »
[Nagios](../start.html "nagios:start") » [Nagios
Addons](start.html "nagios:addons:start") »
[NagiosQL](nagiosql.html "nagios:addons:nagiosql")

### Table des matières {.toggle}

-   [NagiosQL](nagiosql.html#nagiosql)
    -   -   [Pré-requis](nagiosql.html#pre-requis)
        -   [Installation de
            NagiosQL:](nagiosql.html#installation-de-nagiosql)

NagiosQL {#nagiosql .sectionedit1}
========

Tutoriel rédigé pour une version de Debien Squeeze (Debian 6).

Dans ce tutoriel, nous aborderons l’installation de NagiosQL depuis les
sources, elle recommande une certaine maîtrise de l’utilisation du
système Debian.

**ATTENTION :** Nous partons du principe que vous avez une installation
de Nagios fonctionnelle.

Ce tutoriel a été réalisé par :

  **Rôle**        **Nom**
  --------------- ----------------
  **Rédacteur**   Charles JUDITH

### Pré-requis {#pre-requis .sectionedit3}

~~~~ {.code}
$ sudo apt-get install apache2 php5 mysql-server
$ sudo pear install HTML_Template_IT
~~~~

Téléchargement de la dernière version de NagiosQL:

~~~~ {.code}
$ sudo wget http://sourceforge.net/projects/nagiosql/files/nagiosql/NagiosQL%203.1.1/nagiosql_311.tar.gz
~~~~

Décompression de l’archive:

~~~~ {.code}
$ tar xvf nagiosql_311.tar.gz
~~~~

### Installation de NagiosQL: {#installation-de-nagiosql .sectionedit4}

~~~~ {.code}
$ cp -r nagiosql/ /var/www/
$ chown -R www-data:www-data /var/www/nagiosql
~~~~

Création de la base de données:

~~~~ {.code}
$ mysql -u root -p
$ mysql> CREATE DATABASE nagiosql;
$ mysql> quit
~~~~

Importation du schéma de la base de données:

~~~~ {.code}
$ mysql -u root -p nagiosql < /var/www/nagiosql/install/sql/nagiosQL_v31_db_mysql.sql
~~~~

Dans votre navigateur, entrez l’adresse suivante:

<http://adresse_ip_de_votre_serveur/nagiosql>

Vous arriverez sur l’interface d’installation de nagiosQL. Vous pouvez
choisir la langue de votre choix en haut à droite, pour passer à
l’installation cliquez sur “STAR INSTALLATION”.

Vous arriverez sur une deuxième page qui effectue des tests sur les
paquets pré-requis à l’installation de nagiosQL.

Si vous avez installé les paquets au début de ce tutoriel, vous n’aurez
qu’une seule erreure, la suivante:

suhosin.session.encrypt: 1 (should be 0)

Pour y remédier, il vous suffit d’éditer votre fichier php.ini et d’y
insérer la ligne suivante: suhosin.session.encrypt=Off

Redémarrez Apache pour que la modification soit pris en compte:

~~~~ {.code}
$ sudo /etc/init.d/apache2 restart
~~~~

Rafraichissez votre page web et cliquez sur “Next” ou “Suivant” (cela
dépend du langage sélectionné).

Sur la page suivante, vous devrez saisir les informations concernant
votre base de données:

~~~~ {.code}
Database Configuration

    MySQL Server ==> IP de votre serveur MySQL
    MySQL Server Port ==> 3306 (par défaut pour MySQL)
    Database name ==> nom de votre base de données, ici nous avons choisis nagiosql
    Administrative MySQL User ==> utilisateur de la BDD
    Administrative MySQL Password ==> mot de passe de l'utilisateur de la BDD
~~~~

Si vous voulez donner les droits à un utilisateurs sur une base de
données, voici un exemple: mysql -u root -p Entrez le mot de passe root
de votre mysql mysql\>GRANT ALL on nagiosql.\* TO ‘monitor’@‘localhost’
IDENTIFIED BY ‘sonmotdepasse’; mysql\>FLUSH PRIVILEGES;

L’étape suivante vous demandera de supprimer le répertoire
d’installation /var/www/nagiosql/install, vous le supprimerez:

~~~~ {.code}
$ sudo rm -rf /var/www/nagiosql/install
~~~~

Après vous allez vous rendre sur l’URL
<http://adresse_ip_de_votre_serveur/nagiosql> et vous rencontrerez une
erreur 404 (page inexistante).

Vous allez recopier le répertoir d’installation que vous avez copié dans
/var/www/nagiosql/install: \<code\> \$ sudo cp -r
/home/charles/downloads/nagiosql/install /var/www/nagiosql/ \<code\>

Essayez de vous connecter à nouveau sur l’URL suivante
<http://adresse_ip_de_votre_serveur/nagiosql> puis vous referez les
étapes d’installation “Démarrer l’installation” puis “Suivant” puis
“Paramètre de la base de données et juste en dessous paramètre de
connexion à linterface de NagiosQL”.

Vous validez la fin de l’installation puis vous pouvez dès à présent
vous connecter sur votre interface de NagiosQL à l’adresse suivante:

<http://adresse_ip_de_votre_serveur/nagiosql>

SOMMAIRE {#sommaire .sectionedit1}
--------

**[Accueil](../../start.html "start")**

**[Supervision](../../supervision/start.html "supervision:start")**

-   [Nagios](../start.html "nagios:start")
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

**[Sécurité](../../securite/start.html "securite:start")**

**[Infrastructure](../../infra/start.html "infra:start")**

**[Développement](../../dev/start.html "dev:start")**

Nagios Addons {#nagios-addons .sectionedit1}
-------------

-   [Lilac Platform](lilac-platform.html "nagios:addons:lilac-platform")
-   [Merlin](../../addons/merlin.html "nagios:addons:merlin")
-   [NConf](nconf.html "nagios:addons:nconf")
-   [NDOUtils](ndoutils.html "nagios:addons:ndoutils")
-   [NSClient++](nsclient.html "nagios:addons:nsclient")
-   [NagTrap](../../addons/nagtrap.html "nagios:addons:nagtrap")
-   [NagVis](nagvis/start.html "nagios:addons:nagvis:start")
-   [Nagios Business Process
    Addon](nagios-business-process-addons.html "nagios:addons:nagios-business-process-addons")
-   [NagiosDigger](nagiosdigger.html "nagios:addons:nagiosdigger")
-   [NagiosGrapher](nagiosgrapher.html "nagios:addons:nagiosgrapher")
-   [NagiosQL](nagiosql.html "nagios:addons:nagiosql")
-   [Netways Grapher
    V2](netways-grapher-v2.html "nagios:addons:netways-grapher-v2")
-   [Ninja](ninja.html "nagios:addons:ninja")
-   [PNP4Nagios](pnp/start.html "nagios:addons:pnp:start")
-   [Protocole NRPE](nrpe.html "nagios:addons:nrpe")
-   [Protocole NSCA](nsca.html "nagios:addons:nsca")
-   [Setup distribué avec
    Mod\_Gearman](mod_gearman.html "nagios:addons:mod_gearman")
-   [Vautour Style](vautour-style.html "nagios:addons:vautour-style")
-   [check\_mk](check_mk/start.html "nagios:addons:check_mk:start")
-   [omd Open Monitoring Distribution](omd.html "nagios:addons:omd")

-   [Afficher le texte
    source](nagiosql@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](nagiosql@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](nagiosql@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](nagiosql@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](nagiosql@do=media.html "Gestionnaire de médias")
-   [Index](nagiosql@do=index.html "Index [X]")
-   [Connexion](nagiosql@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de page](nagiosql.html#dokuwiki__top "Haut de page [T]")

nagios/addons/nagiosql.txt · Dernière modification: 2013/03/29 09:39
(modification externe)

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

![](../../lib/exe/indexer.php@id=nagios%253Aaddons%253Anagiosql&1424859576)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
