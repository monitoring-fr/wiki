---
layout: page
---

[[[Instalation de shinken les yeux
fermés](shinken-10min-start@do=backlink.html)]]

[wiki monitoring-fr.org](../start.html "[ALT+H]")

![Logo Monitoring](../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../start.html "start") »
[Shinken](start.html "shinken:start") » [Instalation de shinken les yeux
fermés](shinken-10min-start.html "shinken:shinken-10min-start")

### Table des matières {.toggle}

-   [Instalation de shinken les yeux
    fermés](shinken-10min-start.html#instalation-de-shinken-les-yeux-fermes)
    -   [Prérequis](shinken-10min-start.html#prerequis)
        -   [Prérequis
            communs](shinken-10min-start.html#prerequis-communs)
        -   [Prérequis
            optionnels](shinken-10min-start.html#prerequis-optionnels)
        -   [Installer et vérifier les prérequis communs sous
            Linux](shinken-10min-start.html#installer-et-verifier-les-prerequis-communs-sous-linux)
    -   [Comment installer
        shinken](shinken-10min-start.html#comment-installer-shinken)
        -   [Etape
            préliminaire](shinken-10min-start.html#etape-preliminaire)
        -   [Première manière : Script d'installation (recommandé pour
            les utilisateurs
            finaux)](shinken-10min-start.html#premiere-manierescript-d-installation-recommande-pour-les-utilisateurs-finaux)

Instalation de shinken les yeux fermés {#instalation-de-shinken-les-yeux-fermes .sectionedit1}
======================================

  **Rôle**        **Nom**
  --------------- ----------------
  **Rédacteur**   David GUENAULT

Prérequis {#prerequis .sectionedit3}
---------

Shinken peut s’installer de troix manières différentes. Le choix d’une
manière est fonction de vos objectifs. En résumé :

-   setup.py : pour les packagers
-   install : la méthode facile
-   Tout dans un répertoire : pour tester rapidement la solution

Gardez bien a l’esprit que les différentes méthodes d’installation sont
incompatibles entre elles. Si vous choisissez une méthode vous ne
pourrez pas appliquer une autre méthode par la suite. A moins de
désinstaller complètement et reprendre depuis le début avec une autre
méthode.

Si vous choisissez la méthode d’installation par le script install, vous
n’avez pas besoin de lire la section prérequis

### Prérequis communs {#prerequis-communs .sectionedit4}

Shinken à besoin de :

-   Python 2.4 ou supérieur (python 2.6 est recommandé et deviendra le
    prérequis minimal pour les futures versions de shinken). L’interface
    shinken nécessite au minimum python 2.6.
-   setuptools ou distribute ou pip pour les modules python.
-   Le module python pyro en version inférieure à 4.14
-   Le module python multiprocessing quand vous utilisez une version de
    python inférieure a 2.6.
-   Le paquet python-devel

### Prérequis optionnels {#prerequis-optionnels .sectionedit5}

Si (et seulement si) vous prévoyez d’utiliser le module livestatus ou
l’interface web, vous aurez également besoin de :

-   simplejson
-   ujson (permet d’améliorer les perfomances de livestatus)
-   pysqlite

### Installer et vérifier les prérequis communs sous Linux {#installer-et-verifier-les-prerequis-communs-sous-linux .sectionedit6}

#### Python

La version livrée avec les principales distribution devrait être
correcte

#### Pyro

Sous Debian et ses dérivées (Ubuntu par exemple), vous pouvez installer
pyro de la manière suivante :

~~~
apt-get install pyro
~~~

Sous Redhat/Centos une recherche dans les dépot devrais permettre de
retrouver le paquet

~~~
yum search pyro
~~~

Si vous ne trouvez pas le module pyro, vous pouvez utiliser les
setup-tools

~~~
easy_install pyro
~~~

Comment installer shinken {#comment-installer-shinken .sectionedit7}
-------------------------

### Etape préliminaire {#etape-preliminaire .sectionedit8}

Cette étape n’est pas nécéssaire pour l’installation par le script
install

-   Télécharger et décomprésser l’archive de shinken
    ([https://github.com/naparuba/shinken](https://github.com/naparuba/shinken "https://github.com/naparuba/shinken"))

-   Via clone du dépot sur github

-   Via téléchargement de l’archive

-   Créer l’utilisateur et le group shinken

~~~
useradd --user-group shinken
usermod --lock shinken
~~~

### Première manière : Script d'installation (recommandé pour les utilisateurs finaux) {#premiere-manierescript-d-installation-recommande-pour-les-utilisateurs-finaux .sectionedit9}

#### Installation

Vous pouvez utiliser le script d’installation situé à la racine des
sources shinken (install). Ce script va créer l’utilisateur et le groupe
shinken, résoudre les dépendances et installer shinken. Il est
compatible avec Debian (5/6), Ubuntu (à partir de la version 11), RedHat
et Centos (5/6). Les seuls prérequis sont une connexion à internet pour
le serveur sur lequel vous allez installer shinken. Vous pouvez
également modifier le chemin d’installation (par modification du fichier
install.d/shinken.conf ou simplement en positionnant la variable
d’environnement TARGET).

Pour installer shinken en quelques secondes/minutes, il suffit de lancer
la commande suivante :

~~~
./install -i
~~~

Allez prendre un café, a votre retour shinken sera installé.

#### Mise à jour {#mise-a-jour}

1.  Récupérer la dernière archive sur le dépôt github de shinken

1.  Positionnez vous dans le répertoire des sources

1.  Sauvegarder la configuration, les plugins, les addons et récupérer
    l’identifiant de backup qui apparait à la fin du processus de
    sauvegarde

~~~
./install -b
~~~

1.  Supprimer la version de shinken existante

~~~
./install -u
~~~

1.  Installer la nouvelle version

~~~
./install -i
~~~

1.  restaurer la sauvegarde

~~~
./install -r backupid
~~~

#### Désinstaller shinken {#desinstaller-shinken}

1.  Positionnez vous dans le repertoire des sources shinken et lancer la
    commande suivante :

~~~
./install -u
~~~

#### Contrôler shinken {#controler-shinken}

-   Lancement : /etc/init.d/shinken start
-   Arrêt : /etc/init.d/shinken stop
-   Redémarrage : /etc/init.d/shinken restart
-   Prise en compte d’une nouvelle configuration :
    /etc/init.d/shinken-arbiter restart

Vous pouvez démarrer en mode debug en utilisant -d dans la ligne de
commande

Ex : /etc/init.d/shinken -d restart

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
    source](shinken-10min-start@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](shinken-10min-start@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](shinken-10min-start@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](shinken-10min-start@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](shinken-10min-start@do=media.html "Gestionnaire de médias")
-   [Index](shinken-10min-start@do=index.html "Index [X]")
-   [Connexion](shinken-10min-start@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de
    page](shinken-10min-start.html#dokuwiki__top "Haut de page [T]")

shinken/shinken-10min-start.txt · Dernière modification: 2013/03/29
09:39 (modification externe)

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

![](../lib/exe/indexer.php@id=shinken%253Ashinken-10min-start&1424859529)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
