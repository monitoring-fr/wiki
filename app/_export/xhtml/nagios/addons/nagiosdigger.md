---
layout: page
---

### Table des matières {.toggle}

-   [NagiosDigger](nagiosdigger.html#nagiosdigger)
    -   [Pré-requis](nagiosdigger.html#pre-requis)
    -   [Installation](nagiosdigger.html#installation)
    -   [Configuration](nagiosdigger.html#configuration)
        -   [Configuration
            apache](nagiosdigger.html#configuration-apache)
        -   [Configuration de la base
            Mysql](nagiosdigger.html#configuration-de-la-base-mysql)
        -   [Configuration
            NagiosDigger](nagiosdigger.html#configuration-nagiosdigger)
        -   [Configuration
            nagios](nagiosdigger.html#configuration-nagios)
    -   [Récupération des
        archives](nagiosdigger.html#recuperation-des-archives)

NagiosDigger {#nagiosdigger .sectionedit1}
============

NagiosDigger est une interface web permettant d’exploiter les différents
évènements se trouvant dans le fichier nagios.log. Vous pourrez donc
établir des statistiques et garder un historique sur de très longue
périodes.

Pré-requis {#pre-requis .sectionedit2}
----------

Pour faire fonctionner NagiosDigger, il vous faudra une base mysql et le
plugin php jpgraph.

~~~
sudo apt-get install libphp-jpgraph
~~~

Installation {#installation .sectionedit3}
------------

-   **Récupération des sources**

~~~
wget http://www.vanheusden.com/nagiosdigger/nagiosdigger-0.9.tgz

tar -xvzf nagiosdigger-0.9.tgz

mv nagiosdigger-0.9 nagiosdigger
~~~

Une fois les sources récupérées, nous allons copier le répertoire
NagiosDigger à un emplacement de votre serveur web. Pour notre exemple
nous déposerons ça dans /usr/local et nous nous appuierons des accès
apache de Nagios.

~~~
cp -R nagiosdigger/ /usr/local/
~~~

Configuration {#configuration .sectionedit4}
-------------

### Configuration apache {#configuration-apache .sectionedit5}

Nous allons créer un fichier de configuration pour déclarer un alias au
serveur Web et un accès sécurisé.

~~~
cd /etc/apache2/conf.d

vi nagiosdigger.conf



Alias /nagiosdigger "/usr/local/nagiosdigger"

<Directory "/usr/local/nagiosdigger">
#  SSLRequireSSL
   Options None
   AllowOverride None
   Order allow,deny
   Allow from all
#  Order deny,allow
#  Deny from all
#  Allow from 127.0.0.1
   AuthName "Nagios Access"
   AuthType Basic
   AuthUserFile /usr/local/nagios/etc/htpasswd.users
   Require valid-user
</Directory>
~~~

### Configuration de la base Mysql {#configuration-de-la-base-mysql .sectionedit6}

-   **Création de la base NagiosDigger :**

~~~
mysql -h mysqlhost -uroot -p --execute="CREATE DATABASE nagiosdigger;"
~~~

-   **Attribution des privilèges :**

~~~
mysql -h mysqlhost -uroot -p --execute="GRANT INSERT,SELECT ON nagiosdigger.* TO nagiosdigger_user@localhost IDENTIFIED BY 'nagiosdigger_pw';"

mysql -h mysqlhost -uroot -p --execute="flush privileges;"
~~~

-   **Importation du schéma de base :**

~~~
mysql -h mysqlhost -uroot -p nagiosdigger_db < /path/to/nagiosdigger/create_tables.sql
~~~

### Configuration NagiosDigger {#configuration-nagiosdigger .sectionedit7}

Il faut aller modifier les 2 fichiers suivants :

Dans import\_nagios\_logging,

~~~
$dbi_type="mysql";              
$dbi_host="localhost";          
$dbi_user="nagiosdigger_user";                
$dbi_pass="nagiosdigger_pw";    
$dbi_name="nagiosdigger";               
$dbi_table="logs";
~~~

Dans config.ini.php,

~~~
$db_hostname = 'localhost';
$db_user='nagiosdigger_user';         
$db_pass='nagiosdigger_pw';     
$db_db='nagiosdigger';
$db_table='logs';
~~~

### Configuration nagios {#configuration-nagios .sectionedit8}

Il est impératif de modifier la méthode de rotation des logs

Dans nagios.cfg,

~~~
log_rotation_method=n
~~~

Ensuite, il y a 2 méthodes possible pour importer le log nagios dans
NagiosDigger

-   **Par crontab**

J’ai plus une préférence pour celle-ci. Elle permet que nagios se
concentre sur son rôle et évite surtout une chute de performance sur les
grosses architectures.

Insérer cette commande dans votre crontab,

~~~
30 * * * * cat /usr/local/nagios/var/nagios.log | /usr/local/nagiosdigger/import_nagios_logging 2>&1 >> /var/log/nagiosdigger.log
~~~

Redémarrage de la crontab,

~~~
/etc/init.d/cron restart
~~~

\* **Par Eventhandler**

Dans nagios.cfg,

~~~
global_service_event_handler=global_service_event_handler
~~~

Nous allons copier l’eventhandler fournit par NagiosDigger dans le
répertoire /usr/local/nagios/libexec/eventhandlers

~~~
cp /usr/local/nagiosdigger/global_service_event_handler /usr/local/nagios/libexec/eventhandlers
~~~

Dans commands.cfg, Nous allons définir la commande faisant appelle à cet
eventhandler

~~~
define command {
          command_name    global_service_event_handler
          command_line    /usr/local/nagios/libexec/eventhandlers/global_service_event_handler "$TIMET$" "$HOSTNAME$" "$SERVICEDESC$" "$SERVICESTATE$" "$SERVICESTATETYPE$" "$SERVICEATTEMPT$" "$SERVICEOUTPUT$"
          }
~~~

Récupération des archives {#recuperation-des-archives .sectionedit9}
-------------------------

**Pour l’importation des données archivées, lancer la commande suivante
: cat /usr/local/nagios/var/archives/\* | sort |
/path/to/import\_nagios\_logging**
