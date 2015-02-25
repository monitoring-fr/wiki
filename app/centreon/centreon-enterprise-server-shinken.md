---
layout: page
---

[[[Installation de Shinken sur Centreon Enterprise
Server](centreon-enterprise-server-shinken@do=backlink.html)]]

[wiki monitoring-fr.org](../start.html "[ALT+H]")

![Logo Monitoring](../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../start.html "start") »
[Centreon](start.html "centreon:start") » [Installation de Shinken sur
Centreon Enterprise
Server](centreon-enterprise-server-shinken.html "centreon:centreon-enterprise-server-shinken")

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

~~~
yum install redhat-lsb
~~~

### Récupération des sources {#recuperation-des-sources .sectionedit6}

Les sources de shinken sont disponibles sur la forge GitHub. Nous allons
utiliser la branche de développement pour récupérer les sources.

~~~
wget https://github.com/naparuba/shinken/tarball/master
~~~

aprés avoir extrait les sources il suffit de se rendre dans le
repertoire [racine des
sources]/contrib/alternative-installation/shinken-install

### Installation et switch de Nagios a Shinken {#installation-et-switch-de-nagios-a-shinken .sectionedit7}

Nous voila rendu à la partie la plus facile.

~~~
./shinken.sh -i && ./shinken.sh -z centreon
~~~

Après cela il suffit de déployer la configuration nagios de la manière
habituelle.

### Ajout d'un satellite {#ajout-d-un-satellite .sectionedit8}

Installer CES avec linux poller à l’invite de GRUB

Récupérer les sources (voir plus haut)

Installer le nouveau poller de la manière suivante :

~~~
./shinken.sh -i && ./shinken.sh -z poller
~~~

Reste à déclarer le poller dans la configuration shinken

~~~
export PYTHONPATH=/opt/shinken
python26 ./tools/skonf.py -f /opt/shinken/etc/shinken-specific.cfg -a cloneobject -o poller -d "poller_name=poller-2,address=192.168.1.56" -r "poller_name=poller-1"
~~~

Une petite précision sur l’outil skonf. Celui ci permet de réaliser des
opérations de configuration en ligne de commande (affichage lisible de
la configuration, ajout de directives, clone d’objet de configuration
…). Il à été écrit pour faciliter le développement du script
d’installation. Un module spécifique est en cours de création et servira
de base à un outil de configuration graphique plus évolué.

Une fois le nouveau poller déclaré, il suffit de synchroniser cette
configuration sur le nouveau poller.

~~~
scp /opt/shinken/etc/shinken-specific.cfg root@[IP SATELLITE]:/opt/shinken/etc
~~~

On démarre le tout

~~~
ssh root@[IP SATELLITE] "service shinken start"
service shinken restart
~~~

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

~~~
export PYTHONPATH=/opt/shinken
python26 ./tools/skonf.py -f /opt/shinken/etc/shinken-specific.cfg -a setparam -o poller -d "poller_tags" -v "poller-2" -r "poller_name=poller-2"
~~~

cette opération permettra d’affecter les exécutions de checks sur le
poller-2 quand la macro POLLER\_TAG est positionnée sur poller-2 dans la
configuration des services ou des hôtes.

maintenant nous devons activer le module HackPollerTagByMacros pour
notre arbiter :

voyons tout d’abord les modules existant :

~~~
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
~~~

nous avons donc le module de rétention pickle dont il faudra tenir
compte. Maintenant nous pouvons ajouter le module HackPollerTagByMacros

~~~
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
~~~

reste à propager la configuration

~~~
scp /opt/shinken/etc/shinken-specific.cfg root@[IP SATELLITE]:/opt/shinken/etc
~~~

Et redémarrer les services

~~~
ssh root@[IP SATELLITE] "service shinken restart"
service shinken restart
~~~

SOMMAIRE {#sommaire .sectionedit1}
--------

**[Accueil](../start.html "start")**

**[Supervision](../supervision/start.html "supervision:start")**

-   [Nagios](../nagios/start.html "nagios:start")
-   [Centreon](start.html "centreon:start")
-   [Shinken](../shinken/start.html "shinken:start")
-   [Zabbix](../zabbix/start.html "zabbix:start")
-   [OpenNMS](../opennms/start.html "opennms:start")
-   [EyesOfNetwork](../eyesofnetwork/start.html "eyesofnetwork:start")
-   [Groundwork](../groundwork/start.html "groundwork:start")
-   [Zenoss](../zenoss/start.html "zenoss:start")
-   [Vigilo](../vigilo/start.html "vigilo:start")
-   [Icinga](../icinga/start.html "icinga:start")
-   [Cacti](../cacti/start.html "cacti:start")
-   [Ressenti
    utilisateur](../supervision/eue/start.html "supervision:eue:start")
-   [Ressenti utilisateur avec
    sikuli](../sikuli/eue/start.html "sikuli:eue:start")

**[Hypervision](../hypervision/start.html "hypervision:start")**

-   [Canopsis](../canopsis/start.html "canopsis:start")

**[Sécurité](../securite/start.html "securite:start")**

**[Infrastructure](../infra/start.html "infra:start")**

**[Développement](../dev/start.html "dev:start")**

Centreon {#centreon .sectionedit1}
--------

-   [Documentation Technique sur
    Centreon](centreon-doc-technique.html "centreon:centreon-doc-technique")
-   [Installation MKLivestatus & Intégration dans
    Centreon](mklivestatus-install-integration-centreon.html "centreon:mklivestatus-install-integration-centreon")
-   [Installation Nagios / Centreon sur RedHat
    EL](centreon-redhat-install.html "centreon:centreon-redhat-install")
-   [Installation de Centreon 2.1 sur CentOS
    5.3](centreon-centos-install.html "centreon:centreon-centos-install")
-   [Installation de Centreon 2.2 sur Ubuntu Server
    10.04](centreon-ubuntu-install.html "centreon:centreon-ubuntu-install")
-   [Installation de Centreon Enterprise
    Server](centreon-enterprise-server.html "centreon:centreon-enterprise-server")
-   [Installation de Shinken sur Centreon Enterprise
    Server](centreon-enterprise-server-shinken.html "centreon:centreon-enterprise-server-shinken")
-   [Installation du patch multi-broker pour
    Centreon](multi-broker-patch-install.html "centreon:multi-broker-patch-install")
-   [Intégrer Nagvis dans
    Centreon](integration-nagvis.html "centreon:integration-nagvis")
-   [Manuel d'utilisation
    Centreon](manuel-utilisation/start.html "centreon:manuel-utilisation:start")
-   [Nagios Centreon
    part1](nagios-centreon-part1.html "centreon:nagios-centreon-part1")
-   [Nagios Centreon
    part2](nagios-centreon-part2.html "centreon:nagios-centreon-part2")
-   [Présentation de l'interface Centreon 2.1 et de son
    utilisation](centreon-interface-utilisation.html "centreon:centreon-interface-utilisation")
-   [Superviser le spanning-tree sous
    Centreon/Nagios](superviser-spanning-tree.html "centreon:superviser-spanning-tree")
-   [Superviser un Autocom OXE V9.x Alcatel-Lucent sous
    Centreon/Nagios](superviser-oxe-alcatel.html "centreon:superviser-oxe-alcatel")
-   [Tableau de correspondance des
    plugins](tableau-correspondance-plugins.html "centreon:tableau-correspondance-plugins")

-   [Afficher le texte
    source](centreon-enterprise-server-shinken@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](centreon-enterprise-server-shinken@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](centreon-enterprise-server-shinken@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](centreon-enterprise-server-shinken@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](centreon-enterprise-server-shinken@do=media.html "Gestionnaire de médias")
-   [Index](centreon-enterprise-server-shinken@do=index.html "Index [X]")
-   [Connexion](centreon-enterprise-server-shinken@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de
    page](centreon-enterprise-server-shinken.html#dokuwiki__top "Haut de page [T]")

centreon/centreon-enterprise-server-shinken.txt · Dernière modification:
2013/03/29 09:39 (modification externe)

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

![](../lib/exe/indexer.php@id=centreon%253Acentreon-enterprise-server-shinken&1424859527)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
