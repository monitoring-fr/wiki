---
layout: page
---

### Table des matières {.toggle}

-   [Connecteur Nagios / Icinga pour
    Canopsis](canopsis-nagios-connector.html#connecteur-nagiosicinga-pour-canopsis)
    -   [Pré-requis](canopsis-nagios-connector.html#pre-requis)
    -   [Installation](canopsis-nagios-connector.html#installation)
    -   [Configuration](canopsis-nagios-connector.html#configuration)

Connecteur Nagios / Icinga pour Canopsis {#connecteur-nagiosicinga-pour-canopsis .sectionedit1}
========================================

Tutoriel rédigé pour une version Ubuntu 10.04 LTS et Canopsis (stable).

Cette documentation permet d’installer et configurer un connecteur
Canopsis pour Nagios et Icinga. Ce connecteur est sous la forme d’un
“Event broker” (c’est-à-dire un NEB ⇒ Nagios Event Broker) afin de
remonter les données de votre supervision vers l’hyperviseur Canopsis.

Ce tutoriel a été réalisé par :

  **Rôle**        **Nom**
  --------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------
  **Rédacteur**   [Ludovic VALENTIN](http://www.monitoring-fr.org/community/members/ludovic-valentin/ "http://www.monitoring-fr.org/community/members/ludovic-valentin/")

Pré-requis {#pre-requis .sectionedit3}
----------

Quelques paquets essentiels doivent être installés afin de pouvoir
installer le connecteur :

~~~~ {.code}
$ apt-get install build-essential git-core
~~~~

Installation {#installation .sectionedit4}
------------

Une fois les pré-requis installés, il est possible de commencer
l’installation du NEB. Tout d’abord il faut télécharger puis compiler le
connecteur :

~~~~ {.code}
$ git clone git://forge.canopsis.org/neb2amqp.git
$ cd neb2amqp
$ make
~~~~

Pour finir, il ne reste plus qu’à copier l’exécutable dans votre
installation Nagios :

~~~~ {.code}
$ sudo cp src/neb2amqp.o /usr/local/nagios/bin/
~~~~

Configuration {#configuration .sectionedit5}
-------------

Ensuite, après avoir terminé l’installation du connecteur, il faut
configurer Nagios de manière à ce qu’il charge le NEB. Pour cela, vous
devez éditer votre fichier de configuration **nagios.cfg** :

~~~~ {.code}
$ sudo vi /usr/local/nagios/etc/nagios.cfg
~~~~

Dans le fichier, il faut y renseigner les informations suivantes :

~~~~ {.file}
...
event_broker_options=-1
broker_module=/usr/local/nagios/bin/neb2amqp.o name=Central x.x.x.x
...
~~~~

*`x.x.x.x` ⇒ adresse ip de votre serveur Canopsis*

On redémarre ensuite Nagios :

~~~~ {.code}
$ sudo service nagios restart
~~~~

Les évènements Nagios sont maintenant visibles depuis l’interface
Canopsis.
