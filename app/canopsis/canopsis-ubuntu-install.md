---
layout: page
title: Installation de Canopsis sur Ubuntu
---

Tutoriel rédigé pour une version Ubuntu 10.04 LTS et Canopsis (stable).

Cette documentation a été écrite afin de guider les utilisateurs dans la
mise en place et l’installation d’un serveur d’hypervision Canopsis.

Canopsis ne fonctionne que sur des plateformes 64bits.

Canopsis est un logiciel véritablement simple et rapide à installer, à
tel point qu’il suffit de 10 minutes pour le mettre en place ! Ainsi il
est même possible de découper son installation en quelques étapes :

1.  Vérification de la date et de l’heure de votre serveur
2.  Installation du bootstrap
3.  sudo su - canopsis
4.  Installation du Core packages
5.  Installation des connecteurs (exemple : Nagios / Icinga Event
    broker)
6.  Mise en route
7.  Enjoy :)

Plus bas, vous pouvez suivre la procédure détaillée et complète de
l’installation de la solution.

Ce tutoriel a été réalisé par :

  **Rôle**              **Nom**
  --------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------
  **Rédacteur**         [Ludovic VALENTIN](http://www.monitoring-fr.org/community/members/ludovic-valentin/ "http://www.monitoring-fr.org/community/members/ludovic-valentin/")
  **Contributeur(s)**   William PAIN, Geoffrey LEHEE

Pré-requis {#pre-requis .sectionedit3}
----------

Espace disque minimum sur /opt de 10 Go.

### Date/Heure {#dateheure .sectionedit4}

Il est conseillé de régler la date et l’heure (exemple par
synchronisation ntp) du serveur sur lequel vous souhaitez installer
Canopsis.

### Création d'un utilisateur canopsis {#creation-d-un-utilisateur-canopsis .sectionedit5}

Il est également nécessaire de créer un utilisateur **canopsis**. Ce
dernier est utilisé tout au long de l’installation et de l’usage de
votre serveur Canopsis :

~~~
$ sudo useradd -m -d /opt/canopsis -s /bin/bash canopsis
~~~

### Installation du bootstrap {#installation-du-bootstrap .sectionedit6}

L’installation du bootstrap nécessite quelques paquets et dépendances
pour fonctionner :

~~~
$ sudo apt-get update
$ sudo apt-get install uuid-runtime curl xvfb bzip2 libbz2-dev bc libevent-dev libxrender1 libfontconfig1 libltdl7 
~~~

Ensuite il faut se connecter sous l’utilisateur “canopsis”, télécharger
le bootstrap, le décompresser et enfin l’installer :

~~~
$ sudo su - canopsis
$ mkdir tmp && cd tmp
$ wget http://repo.canopsis.org/stable/canopsis_installer.tgz
$ tar xfz canopsis_installer.tgz
$ cd canopsis_installer
$ ./install.sh
$ exit
~~~

Installation de Canopsis {#installation-de-canopsis .sectionedit7}
------------------------

La mise en place de Canopsis se fait en quelques commandes. Il suffit en
effet de mettre à jour la liste des paquets du `package manager`, puis
d’installer le `cmaster` :

~~~
$ sudo su - canopsis
$ pkgmgr update
$ pkgmgr list
$ pkgmgr install cmaster
~~~

L’installation est terminée. On peut maintenant démarrer les services de
Canopsis (en une seule commande) :

~~~
$ hypcontrol start
~~~

Ensuite, il est possible de se rendre sur votre interface web Canopsis
et de vous y connecter avec **root** comme login **et** mot-de-passe :

[http://127.0.0.1:8082/](http://127.0.0.1:8082/ "http://127.0.0.1:8082/")

Bien entendu à ce stade, l’interface Canopsis n’affiche aucune données.
Il vous faut pour cela installer des connecteurs sur les différentes
solutions à hyperviser de votre infrastructure, comme par exemple sur un
serveur Nagios, ou bien simplement configurer vos applications
compatibles AMQP pour communiquer avec Canopsis.

Installation des connecteurs {#installation-des-connecteurs .sectionedit8}
----------------------------

Par défaut, Canopsis est capable de traiter toutes les données remontées
par AMQP. Néanmoins, certaines applications ne sont pas compatibles avec
le protocole AMQP, c’est pourquoi il existe certains connecteurs qui
permettent de réaliser une conversion des données et de les envoyer vers
Canopsis au bon format.

Rendez-vous sur la page suivante du wiki afin de consulter la liste des
connecteurs Canopsis existants :

**[Liste des connecteurs
Canopsis](canopsis-connectors.html "canopsis:canopsis-connectors")**