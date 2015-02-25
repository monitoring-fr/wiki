---
layout: page
---

[[[Shinken en haute disponiblité sur 2
noeuds](shinken-ha-2noeuds@do=backlink.html)]]

[wiki monitoring-fr.org](../start.html "[ALT+H]")

![Logo Monitoring](../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../start.html "start") »
[Shinken](start.html "shinken:start") » [Shinken en haute disponiblité
sur 2 noeuds](shinken-ha-2noeuds.html "shinken:shinken-ha-2noeuds")

### Table des matières {.toggle}

-   [Shinken en haute disponiblité sur 2
    noeuds](shinken-ha-2noeuds.html#shinken-en-haute-disponiblite-sur-2-noeuds)
    -   [Introduction](shinken-ha-2noeuds.html#introduction)
    -   [architecture](shinken-ha-2noeuds.html#architecture)
    -   [Installation du serveur
        principal](shinken-ha-2noeuds.html#installation-du-serveur-principal)
        -   [Shinken](shinken-ha-2noeuds.html#shinken)
        -   [Plugins Nagios](shinken-ha-2noeuds.html#plugins-nagios)
        -   [Graphite](shinken-ha-2noeuds.html#graphite)

Shinken en haute disponiblité sur 2 noeuds {#shinken-en-haute-disponiblite-sur-2-noeuds .sectionedit1}
==========================================

  **Rôle**        **Nom**
  --------------- ----------------
  **Rédacteur**   David GUENAULT

En cours de rédaction

Introduction {#introduction .sectionedit3}
------------

Une des grandes force de shinken est son support natif de la haute
disponibilité. Nous allons voir dans ce tutoriel comment installer
shinken en haute disponibilité sur 2 noeuds. Cette installation restera
volontairement simple afin de bien appréhender le fonctionnement de
shinken dans ce cas d’utilisation. Nous nous baserons sur le script
d’installation livré avec shinken pour réaliser cette installation.

Ce tutoriel est réalisé pour la version 1.2 de shinken sous debian 6

L’objectif est de faire en sorte que lors de la perte de tout ou partie
du noeud principal, le noeud secondaire soit a même de prendre le
relais. Il faut néanmoins prendre un certain nombre de choses en compte.

La haute disponibilité est donnée pour le coeur shinken, si les addons
nagios tels que multisite, nagvis ou pnp4nagios ne le supporte pas, il
est évident que l’on perd en haute disponibilité sur ce point. Pour
autant la fonction de supervision en elle même et les notifications sont
elles toujours assurée et c’est la l’essentiel.

architecture {#architecture .sectionedit4}
------------

L’architecture de supervision est constituée de deux serveurs montés à
l’identique sur lesquels nous allons installer git (mais ce n’est pas
obligatoire si vous récupérez l’archive shinken directement depuis le
site de shinken).

Les deux serveurs sont nommés shinken1 et shinken2 et les adresses ip
sont :

-   shinken1 : 192.168.122.6
-   shinken2 : 192.168.122.7

shinken1 sera le serveur actif et shinken 2 sera le serveur de secours.

Installation du serveur principal {#installation-du-serveur-principal .sectionedit5}
---------------------------------

### Shinken {#shinken .sectionedit6}

Vous devez avoir une connexion directe à internet car le script va
devoir télécharger les dépendances d’installation (paquets debian et
modules python par exemple). Si vous êtes derrière un proxy, n’oubliez
pas de le confiugrer pour vos serveurs (au niveau apt et également les
variables d’environnement).

-   Récupération des sources de shinken dans un premier temps :

~~~
git clone https://github.com/naparuba/shinken.git
~~~

-   Installation de shinken à l’aide du script d’installation

~~~
cd shinken
MANAGEPYRO=1 RETENTIONMODULE=mongo ./install -i
~~~

MANAGEPYRO=1 permet de contourner un bug pyro sous debian6
RETENTIONMODULE=1 permet d’utiliser la retention en base mongo.

### Plugins Nagios {#plugins-nagios .sectionedit7}

-   Installation des plugins Nagios

~~~
./install -p nagios-plugins
~~~

### Graphite {#graphite .sectionedit8}

graphite permet de stocker et retranscrire les métriques sous forme de
graphiques. Nous aurions pu utiliser pnp4nagios mais celui ci ne
supporte pas la réplication et casserait donc la haute disponibilité de
la solution. Graphite est composé pour l’instant de 2 éléments
principaux :

-   Un démon (ou plusieurs comme nous le verrons plus loin) permettant
    de recevoir et stocker les métriques (carbon)
-   Une interface en mode web permettant de restituer les graphiques.

#### Quelques explications

Il y à un certain nombre de choses à connaitre et maîtriser avant de
pouvoir utiliser graphite :

-   Vous devez pouvoir nommer vos métriques, cela se fait en spécifiant
    un “chemin” de nommage. Chaque étape du chemin est séparée par un
    point. Par exemple pour la charge moyenne sur 5 minutes du serveur
    monserveur, le chemin de nommage sera :
    servers.monserveur.load.5min. Pour le load sur 1 minute ce sera
    servers.monserveur.load.1min. Vous aurez remarqué la catégorisation
    du début du chemin (servers). Cela n’est pas obligatoire mais nous
    verrons plus loin à quel point c’est utile dans la définition des
    rétentions.

-   Vous devez également spécifier une/des périodes de rétention pour
    les métriques (sur combien de temps sont conservés les métriques).
    Les bases graphites sont pré allouées. La définition d’une rétention
    se fait en fonction de la durée mais également de la précision des
    donnée collectée (on parle de résolution). Le meilleur moyen de
    définir la retention est de répondre a ces questions :
    -   Quelle est ma capacitée de production de métrique ?
    -   Quel est mon besoin en terme de résolution ?
    -   Sur quel période ai je besoin de retourner en arrière en
        conservant cette résolution ?
    -   Quelle est la plus mauvaise résolution acceptable pour mon
        utilisation ?
    -   Sur quelle période maximale dois je être capable de retourner en
        arrière ?

Une fois que l’on a répondu à ces questions, il devient trivial de
calculer la rétention. Cela se fait en définissant des schémas de
stockage (selon ou est installé graphite :
/opt/graphite/conf/storage-schemas.conf). Nous allons reprendre notre
exemple de Load pour illustrer la configuration des schémas de stockage.
Mon intervalle de vérification de la charge moyenne est de 5 minutes,
c’est ma capacité de production de métrique (300secondes). J’ai besoin
de conserver cette résolution pour vérification sur une période de une
semaine et ensuite je peux me contenter d’une résolution de 15 minutes
mais sur une période de 1 an. Les schémas de stockage sont définit de la
manière suivante :

~~~
[nom_du_schema]
priority = 100
pattern = ^servers\.
retentions = 300:2016,900:35040
~~~

-   nom\_du\_chema est arbitraire et sert juste à identifier un schéma
    de stockage
-   priority sert a deux choses. Définir dans quel ordre vont être
    traités les schémas (du plus petit au plus grand). Il peut être
    utile de traiter en premier les schémas les plus utilisés. Cela
    permet également de définir différente retentions pour des métriques
    qui pourraient correspondre a plusieurs pattern de schémas.
-   pattern est une expression régulière permettant de faire
    correspondre un chemin à un schémas (dans l’exemple : tout les
    chemins commençant par servers). Et c’est la que le début du chemin
    en servers prend toute sa dimension, nous pourrons ainsi définir des
    périodes de rétention différentes en fonction des types d’équipement
    (par exemple servers, routers …).
-   retention correspond aux différentes question que nous nous sommes
    posés. (le format est
    resoution\_fine:nombre\_de\_points\_a\_stocker,resolution\_grossiere:nombre\_de\_points\_a\_stocker).
    -   résolution fine : 5 minutes soit 5\*60 = 300 secondes
    -   nombre de points pour la resolution fine : (7 jours / resolution
        soit (7\*86400)/300 = 2016 points)
    -   résolution grossière : 15 minutes soit (15\*60 = 900 secondes)
    -   nombre de points pour la resolution grossière : (365 jours /
        resolution soit (365\*86400)/900 = 35040 points)

#### Installer graphite

L’installation de graphite est facilitée par l’installeur

~~~
./install -a graphite
~~~

SOMMAIRE {#sommaire .sectionedit1}
--------

**[Accueil](../start.html "start")**

**[Supervision](../supervision/start.html "supervision:start")**

-   [Nagios](../nagios/start.html "nagios:start")
-   [Centreon](../centreon/start.html "centreon:start")
-   [Shinken](start.html "shinken:start")
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

Shinken {#shinken .sectionedit1}
-------

-   [Comment activer et utiliser le module
    livestatus](enable_livestatus_module.html "shinken:enable_livestatus_module")
-   [Configuration et
    lancement](shinken-architecture-config.html "shinken:shinken-architecture-config")
-   [Fonctionnement de
    Shinken](shinken-work.html "shinken:shinken-work")
-   [Instalation de shinken les yeux
    fermés](shinken-10min-start.html "shinken:shinken-10min-start")
-   [Installation Shinken 0.8 sur Debian
    Squeeze](shinken-debian-squeeze-install.html "shinken:shinken-debian-squeeze-install")
-   [Installation de Shinken par
    script](install-script.html "shinken:install-script")
-   [Installation de Shinken sur
    CentOS](shinken-centos-install.html "shinken:shinken-centos-install")
-   [Installation de Shinken sur Debian
    Lenny](shinken-debian-install.html "shinken:shinken-debian-install")
-   [Installation de Shinken sur Ubuntu
    server](shinken-ubuntu-install-with-nagios.html "shinken:shinken-ubuntu-install-with-nagios")
-   [Installation de Shinken sur Ubuntu server 10.04
    LTS](shinken-ubuntu-install.html "shinken:shinken-ubuntu-install")
-   [Interface Shinken](shinken-use-ui.html "shinken:shinken-use-ui")
-   [Introduction à
    Shinken](shinken-introduction.html "shinken:shinken-introduction")
-   [Les architectures avancées de
    Shinken](shinken-advanced-architecture.html "shinken:shinken-advanced-architecture")
-   [Ressources et Performances de
    Shinken](shinken-ressources.html "shinken:shinken-ressources")
-   [Shinken en haute disponiblité sur 2
    noeuds](shinken-ha-2noeuds.html "shinken:shinken-ha-2noeuds")

-   [Afficher le texte
    source](shinken-ha-2noeuds@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](shinken-ha-2noeuds@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](shinken-ha-2noeuds@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](shinken-ha-2noeuds@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](shinken-ha-2noeuds@do=media.html "Gestionnaire de médias")
-   [Index](shinken-ha-2noeuds@do=index.html "Index [X]")
-   [Connexion](shinken-ha-2noeuds@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de
    page](shinken-ha-2noeuds.html#dokuwiki__top "Haut de page [T]")

shinken/shinken-ha-2noeuds.txt · Dernière modification: 2013/03/29 09:39
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

![](../lib/exe/indexer.php@id=shinken%253Ashinken-ha-2noeuds&1424859528)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
