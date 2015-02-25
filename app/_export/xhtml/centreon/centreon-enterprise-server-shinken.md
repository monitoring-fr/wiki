---
layout: page
---

### Table des matières {.toggle}

-   [Installation de Shinken sur Centreon Enterprise
    Server](centreon-enterprise-server-shinken.html#installation-de-shinken-sur-centreon-enterprise-server)
    -   [Introduction](centreon-enterprise-server-shinken.html#introduction)
    -   [Installation de Centreon Enterprise
        Server](centreon-enterprise-server-shinken.html#installation-de-centreon-enterprise-server)
    -   [Installation de
        shinken](centreon-enterprise-server-shinken.html#installation-de-shinken)
        -   [Prérequis](centreon-enterprise-server-shinken.html#prerequis)
        -   [Récupération des
            sources](centreon-enterprise-server-shinken.html#recuperation-des-sources)
        -   [Installation et switch de Nagios a
            Shinken](centreon-enterprise-server-shinken.html#installation-et-switch-de-nagios-a-shinken)
        -   [Ajout d'un
            satellite](centreon-enterprise-server-shinken.html#ajout-d-un-satellite)
        -   [Spécialiser un
            satellite](centreon-enterprise-server-shinken.html#specialiser-un-satellite)

Installation de Shinken sur Centreon Enterprise Server {#installation-de-shinken-sur-centreon-enterprise-server .sectionedit1}
======================================================

Introduction {#introduction .sectionedit2}
------------

Nagios est un très bon ordonnanceur de supervision mais présente
quelques limitations dues à sa conception datant de plus de 10 ans.
Centreon Enterprise Server est la réponse de la société Merethis à la
complexité d’installation de solutions de supervision Centreon/Nagios.
Un CD embarquant tout le nécessaire pour obtenir une solution de
supervision Centreon/Nagios en moins de 10 minutes.

Shinken malgré sa jeunesse réussi à combler la majorité des limitations
rencontrées avec les solutions Nagios.

L’objectif de cette documentation est de montrer que déployer Shinken
sur Centreon Enterprise Server ne dois pas prendre plus de 10 minutes
supplémentaires.

Installation de Centreon Enterprise Server {#installation-de-centreon-enterprise-server .sectionedit3}
------------------------------------------

Vous pouvez vous retourner vers l’excellente documentation de Merethis à
ce sujet :
[http://www.centreon.com/documents/CES/CES-EN-Installation-Configuration-rev07.pdf](http://www.centreon.com/documents/CES/CES-EN-Installation-Configuration-rev07.pdf "http://www.centreon.com/documents/CES/CES-EN-Installation-Configuration-rev07.pdf")

La seule chose a savoir lors du lancement de l’ISO est qu’elle propose
deux types d’installation :

-   Par défaut : Installation de Centreon/Nagios complet sur le serveur
-   Spécifique satellite : Installation de CES en tant que satellite
    (tapper linux poller a l’invite grub)

Une fois CES installé nous allons pouvoir passer à la phase suivante :
le remplacement de Nagios par Shinken et cela de manière totalement
transparente.

Installation de shinken {#installation-de-shinken .sectionedit4}
-----------------------

### Prérequis {#prerequis .sectionedit5}

Bien que conçu pour faciliter au maximum l’installation de shinken, le
script que nous allons utiliser nécessite l’installation du packet
redhat-lsb. Celui ci embarque la commande lsb-release qui va nous
permettre d’identifier la distribution sur laquelle sera installé
Shinken.

~~~~ {.code}
yum install redhat-lsb
~~~~

### Récupération des sources {#recuperation-des-sources .sectionedit6}

Les sources de shinken sont disponibles sur la forge GitHub. Nous allons
utiliser la branche de développement pour récupérer les sources.

~~~~ {.code}
wget https://github.com/naparuba/shinken/tarball/master
~~~~

aprés avoir extrait les sources il suffit de se rendre dans le
repertoire [racine des
sources]/contrib/alternative-installation/shinken-install

### Installation et switch de Nagios a Shinken {#installation-et-switch-de-nagios-a-shinken .sectionedit7}

Nous voila rendu à la partie la plus facile.

~~~~ {.code}
./shinken.sh -i && ./shinken.sh -z centreon
~~~~

Après cela il suffit de déployer la configuration nagios de la manière
habituelle.

### Ajout d'un satellite {#ajout-d-un-satellite .sectionedit8}

Installer CES avec linux poller à l’invite de GRUB

Récupérer les sources (voir plus haut)

Installer le nouveau poller de la manière suivante :

~~~~ {.code}
./shinken.sh -i && ./shinken.sh -z poller
~~~~

Reste à déclarer le poller dans la configuration shinken

~~~~ {.code}
export PYTHONPATH=/opt/shinken
python26 ./tools/skonf.py -f /opt/shinken/etc/shinken-specific.cfg -a cloneobject -o poller -d "poller_name=poller-2,address=192.168.1.56" -r "poller_name=poller-1"
~~~~

Une petite précision sur l’outil skonf. Celui ci permet de réaliser des
opérations de configuration en ligne de commande (affichage lisible de
la configuration, ajout de directives, clone d’objet de configuration
…). Il à été écrit pour faciliter le développement du script
d’installation. Un module spécifique est en cours de création et servira
de base à un outil de configuration graphique plus évolué.

Une fois le nouveau poller déclaré, il suffit de synchroniser cette
configuration sur le nouveau poller.

~~~~ {.code}
scp /opt/shinken/etc/shinken-specific.cfg root@[IP SATELLITE]:/opt/shinken/etc
~~~~

On démarre le tout

~~~~ {.code}
ssh root@[IP SATELLITE] "service shinken start"
service shinken restart
~~~~

A partir de maintenant vous pouvez oublier notre satellite, shinken
s’occupera de distribuer les checks sur les 2 pollers de manière
autonome.

En cas de besoin il suffit de ré-appliquer cette procédure pour le
nombre de poller désiré.

### Spécialiser un satellite {#specialiser-un-satellite .sectionedit9}

Dans certains cas il peut être nécessaire de dédier un poller à la
supervision d’une partie du parc. Par exemple pour surveiller une DMZ
sans avoir a autoriser l’ensemble des pollers. Shinken à introduit le
concept de poller\_tag pour répondre à ce besoin. Le problème est que
centreon ne prend pas en charge (pas encore) ce type de directive de
configuration aux niveau des hôtes et des services. Un module de
l’arbiter à donc été créé afin de contourner cette limitation. Lorsque
le besoin de tagger un service ou un hôte se fait sentir, il suffit de
déclarer une macros POLLER\_TAG sur les hôtes et services et shinken
sera en mesure de décider vers quel poller ce check sera envoyé.

nous allons commencer par positionner un tag sur le poller-2:

~~~~ {.code}
export PYTHONPATH=/opt/shinken
python26 ./tools/skonf.py -f /opt/shinken/etc/shinken-specific.cfg -a setparam -o poller -d "poller_tags" -v "poller-2" -r "poller_name=poller-2"
~~~~

cette opération permettra d’affecter les exécutions de checks sur le
poller-2 quand la macro POLLER\_TAG est positionnée sur poller-2 dans la
configuration des services ou des hôtes.

maintenant nous devons activer le module HackPollerTagByMacros pour
notre arbiter :

voyons tout d’abord les modules existant :

~~~~ {.code}
python26 tools/skonf.py -f /opt/shinken/etc/shinken-specific.cfg -a showconfig -o arbiter
====================================================================================================
|                                              arbiter                                             |
====================================================================================================
+--------------------------------------------------------------------------------------------------+
| modules                                        | PickleRetentionArbiter                          |
| spare                                          | 0                                               |
| address                                        | 192.168.1.127                                   |
| port                                           | 7770                                            |
| arbiter_name                                   | Arbiter-Master                                  |
+--------------------------------------------------------------------------------------------------+
~~~~

nous avons donc le module de rétention pickle dont il faudra tenir
compte. Maintenant nous pouvons ajouter le module HackPollerTagByMacros

~~~~ {.code}
python26 ./tools/skonf.py -f /opt/shinken/etc/shinken-specific.cfg -a setparam -o arbiter -d "modules" -v "PickleRetentionArbiter, HackPollerTagByMacros"
updated configuration of arbiter[0] modules=PickleRetentionArbiter, HackPollerTagByMacros
====================================================================================================
|                                              arbiter                                             |
====================================================================================================
+--------------------------------------------------------------------------------------------------+
| modules                                        | PickleRetentionArbiter, HackPollerTagByMacros   |
| spare                                          | 0                                               |
| address                                        | 192.168.1.127                                   |
| port                                           | 7770                                            |
| arbiter_name                                   | Arbiter-Master                                  |
+--------------------------------------------------------------------------------------------------+
~~~~

reste à propager la configuration

~~~~ {.code}
scp /opt/shinken/etc/shinken-specific.cfg root@[IP SATELLITE]:/opt/shinken/etc
~~~~

Et redémarrer les services

~~~~ {.code}
ssh root@[IP SATELLITE] "service shinken restart"
service shinken restart
~~~~
