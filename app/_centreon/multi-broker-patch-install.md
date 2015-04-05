---
layout: page
title: Installation du patch multi-broker pour Centreon
---

Source du patch {#source-du-patch .sectionedit2}
===============

-   Ce patch est hébergé dans la forge Centreon. Vous pouvez donc vous
    référer a cette page pour le suivi :
    [http://forge.centreon.com/issues/show/1635](http://forge.centreon.com/issues/show/1635 "http://forge.centreon.com/issues/show/1635")

Centreon version 2.1.5 {#centreon-version-215 .sectionedit3}
======================

Installation {#installation .sectionedit4}
------------

Récupérer le patch multi Broker sur la forge de Centreon et décompresser
la source.

~~~ {.code .bash}
cd /tmp
wget http://forge.centreon.com/attachments/646/centreon-2.1.5_multibroker001.patch.zip
unzip centreon-2.1.5_multibroker001.patch.zip -d ./centreon-multi-broker
~~~

Pour l’installation de ce patch, il faut créer un table supplémentaire
dans la base de donnée “Centreon” grâce à la requête suivante :

~~~ {.code .bash}
mysql -h <hote_mysql> -ucentreon -p -D centreon
~~~

~~~
CREATE TABLE IF NOT EXISTS `cfg_nagios_bkmod` (
`bkmod_id` int(11) NOT NULL AUTO_INCREMENT,
`nagios_id` int(11) DEFAULT NULL,
`broker_module` varchar(255) DEFAULT NULL,
PRIMARY KEY (`bkmod_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;
~~~

Nous allons exporter de broker\_module pour chaque config de nagios vers
la nouvelle table:

~~~
INSERT INTO `cfg_nagios_bkmod` (nagios_id, broker_module)
SELECT nagios_id, broker_module
FROM cfg_nagios;
~~~

Ensuite, nous allons passer le patch dans le répertoire Centreon comme
ci-dessous :

~~~ {.code .bash}
cd /usr/local/centreon
 
patch -p1 < /tmp/centreon-multi-broker/centreon-2.1.5_multibroker001.patch
 
 
patching file www/include/configuration/configGenerate/genNagiosCFG-DEBUG.php
patching file www/include/configuration/configGenerate/genNagiosCFG.php
patching file www/include/configuration/configNagios/DB-Func.php
patching file www/include/configuration/configNagios/formNagios.ihtml
patching file www/include/configuration/configNagios/formNagios.php
patching file www/include/configuration/configNagios/makeJS_formNagios.php
~~~

Configuration dans Centreon {#configuration-dans-centreon .sectionedit5}
---------------------------

Dans Centreon, allez dans **Configuration –\> Nagios –\> nagios.cfg** et
éditer le *Nagios CFG 1* :

[![](/assets/media/powered/centreon/config_centreon_multi-broker1-1.png@w=700)](/_detail/powered/centreon/config_centreon_multi-broker1-1.png@id=centreon%253Amulti-broker-patch-install.html "powered:centreon:config_centreon_multi-broker1-1.png")

[![](/assets/media/powered/centreon/fleche_bas_vert.png@w=100)](/_detail/powered/centreon/fleche_bas_vert.png@id=centreon%253Amulti-broker-patch-install.html "powered:centreon:fleche_bas_vert.png")

[![](/assets/media/powered/centreon/config_centreon_multi-broker2-1.png@w=700)](/_detail/powered/centreon/config_centreon_multi-broker2-1.png@id=centreon%253Amulti-broker-patch-install.html "powered:centreon:config_centreon_multi-broker2-1.png")

On voit bien sur notre page de configuration le champ Multi Broker a été
ajouté.

Centreon version 2.1.6 à 2.1.9 {#centreon-version-216-a-219 .sectionedit6}
==============================

Récupération des patchs {#recuperation-des-patchs .sectionedit7}
-----------------------

~~~ {.code .bash}
cd /tmp
wget http://forge.centreon.com/attachments/694/centreon-2.1.6_multibroker002.tar.zip
wget http://forge.centreon.com/attachments/695/centreon-2.1.6_multibroker002_To_003.tar
unzip centreon-2.1.6_multibroker002.tar.zip
tar xvf centreon-2.1.6_multibroker002.tar
tar xvf centreon-2.1.6_multibroker002_To_003.tar
~~~

Création de la table dans la base centreon {#creation-de-la-table-dans-la-base-centreon .sectionedit8}
------------------------------------------

on parle ici de la base contenant la configuration centreon

~~~
mysql -h localhost -u root -p centreon
~~~

~~~ {.code .sql}
CREATE TABLE IF NOT EXISTS `cfg_nagios_bkmod` (
`bkmod_id` int(11) NOT NULL AUTO_INCREMENT,
`nagios_id` int(11) DEFAULT NULL,
`broker_module` varchar(255) DEFAULT NULL,
PRIMARY KEY (`bkmod_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;
 
INSERT INTO `cfg_nagios_bkmod` (nagios_id, broker_module)
SELECT nagios_id, broker_module
FROM cfg_nagios;
 
exit;
~~~

Application des patchs {#application-des-patchs .sectionedit9}
----------------------

il faut recopier les patchs à la racine du répertoire d’installation de
Centreon. Dans cet exemple ce sera **/opt/centreon**. Cet exemple est a
adapter à votre ‘layout’ d’installation.

~~~ {.code .bash}
cd /opt/centreon
cp /tmp/centreon-2.1.6_multibroker002.patch ./
cp /tmp/centreon-2.1.6_multibroker002_To_003.patch ./
patch -p1 < centreon-2.1.6_multibroker002.patch
patch -p1 < centreon-2.1.6_multibroker002_To_003.patch
~~~

Centreon version 2.2+ {#centreon-version-22 .sectionedit10}
=====================

Depuis la version 2.2 le patch est intégré dans Centreon