---
layout: page
---

### Table des matières {.toggle}

-   [Présentation](start.html#presentation)
-   [Documentation](start.html#documentation)
    -   [Chapitre 1 - Installation](start.html#chapitre-1-installation)
    -   [Chapitre 2 - Interface
        web](start.html#chapitre-2-interface-web)
    -   [Chapitre 3 - Prise en
        main](start.html#chapitre-3-prise-en-main)
    -   [Chapitre 4 - Installation de PNP4Nagios avec
        Icinga](start.html#chapitre-4-installation-de-pnp4nagios-avec-icinga)
    -   [Chapitre 5 - Migration d'Icinga 1.3.x vers
        1.4.x](start.html#chapitre-5-migration-d-icinga-13x-vers-14x)
    -   [Chapitre 6 - Sauvegarde
        d'Icinga](start.html#chapitre-6-sauvegarde-d-icinga)

Dans cette page, figure une présentation d’Icinga, ainsi qu’un tutoriel
sur la mise en place de cette solution de supervision.

Ce dossier a été réalisé par :

  **Rôle**       **Nom**
  -------------- ----------------
  **Créateur**   Charles JUDITH

Présentation {#presentation .sectionedit2}
------------

Icinga
([http://www.icinga.org](http://www.icinga.org "http://www.icinga.org"))
un fork du coeur de Nagios (Nagios Core), le célèbre projet de
supervision open source. Le projet Icinga est né en mai 2009 suite à la
frustration des développeurs et contributeurs qui ne voyaient qu’aucun
de leurs patches dans le Nagios core avaient été accpetés par le project
leader de Nagios Ethan Galstad.

Documentation {#documentation .sectionedit3}
-------------

### Chapitre 1 - Installation {#chapitre-1-installation .sectionedit4}

**[Installation sur
Ubuntu](../../../icinga/icinga-ubuntu-install.html "icinga:icinga-ubuntu-install")**

1.  **[Installation depuis les
    sources](../../../icinga/icinga-ubuntu-install.html#installation-depuis-les-sources "icinga:icinga-ubuntu-install")**

### Chapitre 2 - Interface web {#chapitre-2-interface-web .sectionedit5}

### Chapitre 3 - Prise en main {#chapitre-3-prise-en-main .sectionedit6}

### Chapitre 4 - Installation de PNP4Nagios avec Icinga {#chapitre-4-installation-de-pnp4nagios-avec-icinga .sectionedit7}

Tutoriel rédigé pour une version Ubuntu 11.04, Debian Squeeze,
pnp4nagios 0.6.12 et Icinga 1.3.0.

Dans ce tutoriel, l’installation de pnp4nagios ainsi que son intégration
dans Icinga sera abordé. Parmis les différents modes de fonctionnement
de pnp4nagios, nous utiliserons le mode synchrone (mode sync). Cette
installation recommande une certaine maîtrise de l’utilisation du
système Debian/Ubuntu, mais permet notamment de personnaliser
l’intégration de pnp4nagios dans Icinga.

Pré-requis

Nous partons du principe que vous avez un Icinga installé, fonctionnel
et que vous savez vous en servir. Si ce n’est pas le cas, je vous invite
à lire le chapitre 1 de la catégorie Icinga.

Compilation de PNP4NAGIOS

Avant d’installer PNP4Nagios, nous allons récupérer les sources de la
dernière version sur le site du projet:

[http://www.pnp4nagios.org](http://www.pnp4nagios.org "http://www.pnp4nagios.org")

Une fois l’archive télécharger, décompréssez la puis vérifier que vous
avez les paquets suivants:

~~~
build-essential
rrdtool
librrds-perl
~~~

Si vous n’avez pas tous ces paquets, installez les par l’intermédiaire
de la commande suivante:

~~~
sudo aptitude install build-essential rrdtool librrds-perl php5-gd
~~~

NB: Si vous êtes root, n’utilisez pas sudo!

Décplacez vous dans le répertoire décompréssé de l’archive, puis lancez
les commandes suivantes:cd pnp4nagios-0.6.12

~~~
./configure --with-nagios-user=icinga --with-nagios-group=icinga --with-rrdtool=/usr/bin/rrdtool
make all
make fullinstall
~~~

Configuration

Copie des fichiers de configuration en utilisant les exemples de
fichiers de configuration:

~~~
cd /usr/local/pnp4nagios/etc/
mv npcd.cfg-sample npcd.cfg
mv process_perfdata.cfg-sample process_perfdata.cfg
mv rra.cfg-sample rra.cfg
~~~

Modification du fichier “npcd.cfg” qui se trouve dans
/usr/local/pnp4nagios/etc/ afin d’avoir les éléments suivants:log\_type
= file log\_level = -1 load\_threshold = 10.0

Modification du fichier “config.php” qui se trouve dans
/usr/local/pnp4nagios/etc/:\$conf’nagios\_base’ = ”/icinga/cgi-bin”;

Dans le fichier process\_perfdata.cfg qui se trouve dans
/usr/local/pnp4nagios/etc/, commentez les lignes suivantes: PREFORK = 1
GEARMAN\_HOST = localhost:4730 REQUESTS\_PER\_CHILD = 10000 ENCRYPTION =
1 KEY = should\_be\_changed KEY\_FILE =
/usr/local/pnp4nagios/etc/secret.key

Modifier le fichier icinga.cfg afin d’avoir les paramètres suivants:

process\_performance\_data=1
service\_perfdata\_command=process-service-perfdata
host\_perfdata\_command=process-host-perfdata

~~~
Dans le fichier commands.cfg, ajouter les commandes suivantes:define command {
command_name process-service-perfdata
command_line /usr/bin/perl /usr/local/pnp4nagios/libexec/process_perfdata.pl
}

define command {
command_name process-host-perfdata
command_line /usr/bin/perl /usr/local/pnp4nagios/libexec/process_perfdata.pl -d HOSTPERFDATA
}
~~~

NB: Supprimmez ou commentez les commandes d’origines pour la collecte
des données de performances.

Redémarrez Icinga pour que tous les changements effectués soient pris en
compte:

~~~
/etc/init.d/icinga restart
~~~

Activez le mode rewrite d’apache, puis redémarrer apache:sudo a2enmod
rewrite

~~~
sudo /etc/init.d/apache2 restart
~~~

Testez votre configuration

Exécutez le scriptverify\_pnp\_config.pl pour vérifier la conformité de
votre configuration:/usr/local/pnp4nagios/libexec/verify\_pnp\_config.pl
-m sync

NB: le scirpt s’exécute de la façon suivante verify\_pnp\_config.pl -m
\<mode\> où mode est le mode utilise, ici on utilise le mode synchrone
d’où le ”-m sync”. Pour obtenir de l’aide sur ce plugin, utilise
l’option -h ou –help.

Pendant l’execution du script, vous allez avoir de multiple
informations, voic une petite légende:I message d’informations à propos
de la configuration, des actions effectuées, …

~~~
A actions à faire
W message de warning
E message d'erreur: PNP ne pourra pas fonctionner sans résourdre ce ou ces problème(s)
H indice: il pourrait être utile de lire la documentation appropriée
D Message de debug
~~~

Si vous avez aucune erreur suite à l’exécution de ce script, vous pouvez
dès à présent vous connecter à l’interface web de pnp4nagios pour un
ultime test:

<http://votreserveuricinga/pnp4nagios>

Et la vous vérrez une interface web avec un diagnostic, si tout est en
ordre et que vous avez le petit cadre vert en bas de page, supprimez le
fichier install.php qui se trouve dans le répertoire /usr/local/share/.

Intégration de PNP4Nagios dans Icinga

Ajouter la directive action\_url dans la definition des vos machine et
de vos services, vous trouvez un exemple ci dessous:define

~~~
host {
name host-icinga
action_url /pnp4nagios/index.php/graph?host=$HOSTNAME$&srv=HOST
register 0
}

define service {
name srv-pong
action_url /pnp4nagios/index.php/graph?host=$HOSTNAME$&srv=$SERVICEDESC$
register 0
}
~~~

Redémarrez Icinga après avoir effectué ces changements:

~~~
sudo /etc/init.d/icinga restart
~~~

Connectez-vous sur votre interface d’incinga (<http://votreip/icinga>),
et vous verrez apparaître un petit engrenage à côté des services dont
vous voulez la métrologie.

Intégration avancée de PNP4Nagios dans Icinga

Afin d’avoir de la prévisualisation lorsque vous survolez le petit
engrenage dans votre interface d’icinga, effectuez les modifications
suivantes.

Remplacez action\_url
/pnp4nagios/index.php/graph?host=\$HOSTNAME\$&srv=HOST par action\_url
/pnp4nagios/index.php/graph?host=\$HOSTNAME\$&srv=HOST’ class=‘tips’
rel='/pnp4nagios/index.php/popup?host=\$HOSTNAME\$&srv=HOST pour les
hôtes ET remplacez action\_url
/pnp4nagios/index.php/graph?host=\$HOSTNAME\$&srv=\$SERVICEDESC\$ par
action\_url
/pnp4nagios/index.php/graph?host=\$HOSTNAME\$&srv=\$SERVICEDESC\$’
class=‘tips’
rel='/pnp4nagios/index.php/popup?host=\$HOSTNAME\$&srv=\$SERVICEDESC\$
pour les services

Puis créer le fichier status-header.ssi dans le répertoire
/usr/local/icinga/share/ssi/ en insérant les lignes suivantes:

~~~
<script src="/pnp4nagios/media/js/jquery-min.js" type="text/javascript"></script>
<script src="/pnp4nagios/media/js/jquery.cluetip.js" type="text/javascript"></script>
<script type="text/javascript">
jQuery.noConflict();
jQuery(document).ready(function() {
jQuery('a.tips').cluetip({ajaxCache: false, dropShadow: false,showTitle: false });
});
</script>
~~~

Redémarrez Icinga puis visualisez les changements sur votre interface.

Troubleshouting

Si vous avez une erreur 500 lorsque vous voulez accéder à l’interface de
pnp4nagios, modifier le fichier /etc/apache2/conf.d/pnp4nagios.conf en
gfaisant le changement suivant:

AuthUserFile /usr/local/icinga/etc/htpasswd.users

et non AuthUserFile /usr/local/nagios/etc/htpasswd.users

### Chapitre 5 - Migration d'Icinga 1.3.x vers 1.4.x {#chapitre-5-migration-d-icinga-13x-vers-14x .sectionedit8}

Dans ce tutoriel, nous suposons que vous avez installé Icinga dans le
répertoire suivant: /usr/local/icinga.

Arrêt d’Icinga

~~~
/etc/init/d/icinga stop
~~~

Sauvegarde de la configuration actuelle

Avant de faire la migration, nous allons sauvegarder la configuration
actuelle car Icinga ne gère pas le versionning. Pour ce faire, vous
pouvez utilisez le script que j’ai écrit dans le chapitre suivant.

Comment sauvegarder Icinga

Si vous ne souhaitez pas utilisez ce script, vous pouvez créer une
archive de votre répertoire d’Icinga. Pour ce faire:

~~~
tar -zcvf sauv_icinga.tar.gz /usr/local/icinga
~~~

ou

~~~
cp -r /usr/local/icinga/ /usr/local/icinga.old/
~~~

Téléchargement d’Icinga version 1.4.x

~~~
wget http://supervisionlibre.org/download/icinga-1.4.0.tar.gz

Décompression de l'archive téléchargée

tar xvf icinga-1.4.0.tar.gz
~~~

Installation

~~~
cd icinga-1.4.0

./configure --with-nagios-user=icinga --with-nagios-group=icinga --with-command-user=icinga --with-command-group=icinga-cmd --prefix=/usr/local/icinga --enable-idoutils --enable-ssl
~~~

Restauration des fichiers de configuration

1°) Si vous avez sauvegardé en utilisant mon script, vous procèderais de
la façon suivante:

~~~
sudo tar xvf /var/backups/icinga/files/icinga_17052011.tar.gz

cd icinga_17052011

cp -v etc/* /usr/local/icinga/etc/
~~~

2°) Si vous n’avez pas utiliser mon script, et donc fait une copie du
répertoire d’Icinga dans un répertoire quelconque (ici
/usr/local/icinga.old), vous ferez ceci:

~~~
cp /usr/local/icinga.old/etc/* /usr/local/icinga/etc/
~~~

3°) Si vous avez fait une archive du répertoire d’Icinga, vous
précèderez de la façon suivante:

~~~
tar xvf sauv_icinga.tar.gz

cp sauv_icinga/etc/* /usr/local/icinga/etc/
~~~

NB: Nous suposons ici que vous avez sauvegardé le répertoire d’Icinga
dans l’archive sauv\_icinga.tar.gz

Démarrage d’Icinga

~~~
/etc/init.d/icinga start
~~~

### Chapitre 6 - Sauvegarde d'Icinga {#chapitre-6-sauvegarde-d-icinga .sectionedit9}

Voici un script vous permettant de sauvegarder Icinga ainsi que votre
base de données IDO. Vous êtes libre de le modifier et de le
redistribuer. N’hésitez pas à me faire des retours.

Dans ce script, nous supposons que:

-   Icinga a été installé dans /usr/local/icinga
-   Nous utilisons IDO (équivalent de NDO) et que la base de données
    d’Icinga est icinga

~~~
#!/bin/bash
###################################################################
#This program is free software; you can redistribute it and/or
# modify it under the terms of the GNU General Public License
# as published by the Free Software Foundation; either version 2
# of the License, or (at your option) any later version.
#
#
#    For information : [email protected]
/*  */!function(){try{var t="currentScript"in document?document.currentScript:function(){for(var t=document.getElementsByTagName("script"),e=t.length;e--;)if(t[e].getAttribute("cf-hash"))return t[e]}();if(t&&t.previousSibling){var e,r,n,i,c=t.previousSibling,a=c.getAttribute("data-cfemail");if(a){for(e="",r=parseInt(a.substr(0,2),16),n=2;a.length-n;n+=2)i=parseInt(a.substr(n,2),16)^r,e+=String.fromCharCode(i);e=document.createTextNode(e),c.parentNode.replaceChild(e,c)}}}catch(u){}}();/*  */
[email protected]
/*  */!function(){try{var t="currentScript"in document?document.currentScript:function(){for(var t=document.getElementsByTagName("script"),e=t.length;e--;)if(t[e].getAttribute("cf-hash"))return t[e]}();if(t&&t.previousSibling){var e,r,n,i,c=t.previousSibling,a=c.getAttribute("data-cfemail");if(a){for(e="",r=parseInt(a.substr(0,2),16),n=2;a.length-n;n+=2)i=parseInt(a.substr(n,2),16)^r,e+=String.fromCharCode(i);e=document.createTextNode(e),c.parentNode.replaceChild(e,c)}}}catch(u){}}();/*  */###

echo"
####################################################################                                                                                                                  
#                                                                  #
#                                                                  #                                                
#                                                                  #
#               Bienvenue dans le script de sauvegarde             #
#                              d'Icinga                            #
#                                                                  #                                                                                                                  
#                                                                  #                                                                  
####################################################################
"

ICINGA_LOG=/var/backups/icinga/log/icinga_`date +'%d%m%Y'`.tar.gz
ICINGA_BACKUP=/var/backups/icinga/files/icinga_`date +'%d%m%Y'`.tar.gz
ICINGA_DIR=/usr/local/icinga/

echo "Debut de la sauvegarde d'Icinga a "`date +'%H heures %M minutes et %S secondes le %d %m %Y'` | tee -a $ICINGA_LOGcd $ICINGA_DIR
tar -zcvf $ICINGA_BACKUP . | tee -a $ICINGA_LOG
echo "Backup de la base Icinga (IDO)"DATE=`date +'%d%m%Y'`cd /var/backups/icinga/files/mysqldump -u icinga -ppasspass icinga | gzip -c > icingadb_${DATE}.dump.tar.gz | tee -a $ICINGA_LOG
echo "Supprime les sauvegardes datant de plus de deux semaines" | tee -a $ICINGA_LOG
# Nettoyage des ancien backups de plus de 14 jours
find -mtime +14 -exec rm -f {} \;
cd /var/backups/icinga/log/find -mtime +14 -exec rm -f { } \;
echo "Fin de la sauvegarde d'Icinga a "`date +'%H heures %M minutes et %S secondes le %d %m %Y'` | tee -a $ICINGA_LOG
~~~
