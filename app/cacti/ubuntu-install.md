---
layout: page
---

[[[Installation de Cacti sur Ubuntu](ubuntu-install@do=backlink.html)]]

[wiki monitoring-fr.org](../start.html "[ALT+H]")

![Logo Monitoring](../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../start.html "start") »
[Cacti](start.html "cacti:start") » [Installation de Cacti sur
Ubuntu](ubuntu-install.html "cacti:ubuntu-install")

### Table des matières {.toggle}

-   [Installation de Cacti sur
    Ubuntu](ubuntu-install.html#installation-de-cacti-sur-ubuntu)

Installation de Cacti sur Ubuntu {#installation-de-cacti-sur-ubuntu .sectionedit1}
================================

Vous devez déjà avoir un serveur LAMP fonctionnel pour effectuer cette
installation.

Cacti a besoin des paquets Ubuntu rrdtool, php5, php5-mysql, php5-cli,
snmp. La mémoire pour PHP5 est de 128 Mo recommandée à modifier dans
/etc/php5/apache2/php.ini

~~~~ {.code}
wget http://www.cacti.net/downloads/cacti-0.8.7b.tar.gz
tar xzf cacti-0.8.7b.tar.gz
sudo mv cacti-0.8.7b.tar.gz /var/www/cacti
cd /var/www/cacti
sudo chown -R www-data:www-data /var/ww/cacti
~~~~

Créer la base de données et le compte associé sur MySQL

~~~~ {.code .sql}
CREATE USER 'cacti'@'localhost' IDENTIFIED BY '****************';
 
GRANT USAGE ON * . * TO 'cacti'@'localhost' IDENTIFIED BY '****************' WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0 ;
 
CREATE DATABASE IF NOT EXISTS `cacti` ;
 
GRANT ALL PRIVILEGES ON `cacti` . * TO 'cacti'@'localhost';
~~~~

Injecter le dump de la base dans la base ainsi créée.

~~~~ {.code}
mysql -u root -p cacti < cacti.sql
~~~~

Editer le fichier include/config.php pour y renseigner les paramètres de
connexion à la base de données.

~~~~ {.code}
$database_type = "mysql";
$database_default = "cacti";
$database_hostname = "localhost";
$database_username = "cactiuser";
$database_password = "cactipass";
$database_port = "3306";
~~~~

Il ne reste plus qu’à se rendre sur /cacti/install/ en se connectant au
serveur sur lequel Cacti est installé et de répondre aux quelques écrans
proposés.

[![](../assets/media/cacti/cacti-install1.png@w=600)](../_detail/cacti/cacti-install1.png@id=cacti%253Aubuntu-install.html "cacti:cacti-install1.png")

Premier écran d’installation

[![](../assets/media/cacti/cacti-install2.png@w=600)](../_detail/cacti/cacti-install2.png@id=cacti%253Aubuntu-install.html "cacti:cacti-install2.png")

Nouvelle installation

[![](../assets/media/cacti/cacti-install3.png@w=600)](../_detail/cacti/cacti-install3.png@id=cacti%253Aubuntu-install.html "cacti:cacti-install3.png")

Tout est en place au niveau des programmes externes dont a besoin Cacti
pour fonctionner.

Il est maintenant possible de se connecter sur l’interface de Cacti avec
**admin** comme identifiant et **cacti** comme mot de passe. Il vous est
demandé de le changer immédiatemment après.

Pour finir, exécuter le poller toutes les 5 minutes par exemple avec une
tâche cron.

~~~~ {.code}
sudo nano /etc/cron.d/cacti
~~~~

Y mettre cette ligne

~~~~ {.code}
*/5 * * * * www-data php /var/www/cacti/poller.php > /dev/null 2>&1
~~~~

SOMMAIRE {#sommaire .sectionedit1}
--------

**[Accueil](../start.html "start")**

**[Supervision](../supervision/start.html "supervision:start")**

-   [Nagios](../nagios/start.html "nagios:start")
-   [Centreon](../centreon/start.html "centreon:start")
-   [Shinken](../shinken/start.html "shinken:start")
-   [Zabbix](../zabbix/start.html "zabbix:start")
-   [OpenNMS](../opennms/start.html "opennms:start")
-   [EyesOfNetwork](../eyesofnetwork/start.html "eyesofnetwork:start")
-   [Groundwork](../groundwork/start.html "groundwork:start")
-   [Zenoss](../zenoss/start.html "zenoss:start")
-   [Vigilo](../vigilo/start.html "vigilo:start")
-   [Icinga](../icinga/start.html "icinga:start")
-   [Cacti](start.html "cacti:start")
-   [Ressenti
    utilisateur](../supervision/eue/start.html "supervision:eue:start")
-   [Ressenti utilisateur avec
    sikuli](../sikuli/eue/start.html "sikuli:eue:start")

**[Hypervision](../hypervision/start.html "hypervision:start")**

-   [Canopsis](../canopsis/start.html "canopsis:start")

**[Sécurité](../securite/start.html "securite:start")**

**[Infrastructure](../infra/start.html "infra:start")**

**[Développement](../dev/start.html "dev:start")**

Cacti {#cacti .sectionedit1}
-----

-   [Configuration de Cacti](configuration.html "cacti:configuration")
-   [Installation Cacti sur RedHat
    9](redhat-install.html "cacti:redhat-install")
-   [Installation de Cacti
    Windows](windows-install.html "cacti:windows-install")
-   [Installation de Cacti sur
    Ubuntu](ubuntu-install.html "cacti:ubuntu-install")

-   [Afficher le texte
    source](ubuntu-install@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](ubuntu-install@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](ubuntu-install@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](ubuntu-install@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](ubuntu-install@do=media.html "Gestionnaire de médias")
-   [Index](ubuntu-install@do=index.html "Index [X]")
-   [Connexion](ubuntu-install@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de page](ubuntu-install.html#dokuwiki__top "Haut de page [T]")

cacti/ubuntu-install.txt · Dernière modification: 2013/03/29 09:39
(modification externe)

[![CC Attribution-Noncommercial-Share Alike 3.0
Unported](../lib/images/license/button/cc-by-nc-sa.png)](http://creativecommons.org/licenses/by-nc-sa/3.0/)

[![www.chimeric.de](../lib/tpl/arctic/images/button-chimeric-de.png)](http://www.chimeric.de "www.chimeric.de")
[![Valid
CSS](../lib/tpl/arctic/images/button-css.png)](http://jigsaw.w3.org/css-validator/check/referer "Valid CSS")
[![Driven by
DokuWiki](../lib/tpl/arctic/images/button-dw.png)](http://wiki.splitbrain.org/wiki:dokuwiki "Driven by DokuWiki")
[![do yourself a favour and use a real browser - get
firefox!!](../lib/tpl/arctic/images/button-firefox.png)](http://www.firefox-browser.de "do yourself a favour and use a real browser - get firefox")
[![Recent changes RSS
feed](../lib/tpl/arctic/images/button-rss.png)](../feed.php "Recent changes RSS feed")
[![Valid XHTML
1.0](../lib/tpl/arctic/images/button-xhtml.png)](http://validator.w3.org/check/referer "Valid XHTML 1.0")

![](../lib/exe/indexer.php@id=cacti%253Aubuntu-install&1424859533)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
