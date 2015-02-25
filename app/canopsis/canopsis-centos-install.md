---
layout: page
---

[[[Installation de Canopsis sur
CentOS](canopsis-centos-install@do=backlink.html)]]

[wiki monitoring-fr.org](../start.html "[ALT+H]")

![Logo Monitoring](../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../start.html "start") »
[Canopsis](start.html "canopsis:start") » [Installation de Canopsis sur
CentOS](canopsis-centos-install.html "canopsis:canopsis-centos-install")

### Table des matières {.toggle}

-   [Installation de Canopsis sur
    CentOS](canopsis-centos-install.html#installation-de-canopsis-sur-centos)
    -   [Pré-requis](canopsis-centos-install.html#pre-requis)
        -   [Date/Heure](canopsis-centos-install.html#dateheure)
        -   [Création d'un utilisateur
            canopsis](canopsis-centos-install.html#creation-d-un-utilisateur-canopsis)
        -   [Installation du
            bootstrap](canopsis-centos-install.html#installation-du-bootstrap)
    -   [Installation de
        Canopsis](canopsis-centos-install.html#installation-de-canopsis)
    -   [Installation des
        connecteurs](canopsis-centos-install.html#installation-des-connecteurs)

Installation de Canopsis sur CentOS {#installation-de-canopsis-sur-centos .sectionedit1}
===================================

Tutoriel rédigé pour une version CentOS 6 et Canopsis (stable).

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

~~~~ {.code}
# useradd -m -d /opt/canopsis -s /bin/bash canopsis
~~~~

### Installation du bootstrap {#installation-du-bootstrap .sectionedit6}

L’installation du bootstrap nécessite réglages et dépendances pour
fonctionner. Tout d’abord, il est conseillé d’arrêter et désactiver
SELinux, le Firewall ainsi que le broker AMQP :

~~~~ {.code}
# setenforce 0
# chkconfig iptables off
# chkconfig ip6tables off
# chkconfig qpidd off
# service iptables stop
# service ip6tables stop
# service qpidd stop
~~~~

Puis viennent les dépendances de canopsis :

~~~~ {.code}
# yum clean all
# yum update
# yum install wget redhat-lsb xorg-x11-server-Xvfb sudo
~~~~

Ensuite il faut se connecter sous l’utilisateur “canopsis”, télécharger
le bootstrap, le décompresser et enfin l’installer :

~~~~ {.code}
# su - canopsis
$ mkdir tmp && cd tmp
$ wget http://repo.canopsis.org/stable/canopsis_installer.tgz
$ tar xfz canopsis_installer.tgz
$ cd canopsis_installer
$ ./install.sh
$ exit
~~~~

Installation de Canopsis {#installation-de-canopsis .sectionedit7}
------------------------

La mise en place de Canopsis se fait en quelques commandes. Il suffit en
effet de mettre à jour la liste des paquets du `package manager`, puis
d’installer le `cmaster` :

~~~~ {.code}
$ sudo su - canopsis
$ pkgmgr update
$ pkgmgr list
$ pkgmgr install cmaster
~~~~

L’installation est terminée. On peut maintenant démarrer les services de
Canopsis (en une seule commande) :

~~~~ {.code}
$ hypcontrol start
~~~~

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
-   [Cacti](../cacti/start.html "cacti:start")
-   [Ressenti
    utilisateur](../supervision/eue/start.html "supervision:eue:start")
-   [Ressenti utilisateur avec
    sikuli](../sikuli/eue/start.html "sikuli:eue:start")

**[Hypervision](../hypervision/start.html "hypervision:start")**

-   [Canopsis](start.html "canopsis:start")

**[Sécurité](../securite/start.html "securite:start")**

**[Infrastructure](../infra/start.html "infra:start")**

**[Développement](../dev/start.html "dev:start")**

-   [Afficher le texte
    source](canopsis-centos-install@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](canopsis-centos-install@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](canopsis-centos-install@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](canopsis-centos-install@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](canopsis-centos-install@do=media.html "Gestionnaire de médias")
-   [Index](canopsis-centos-install@do=index.html "Index [X]")
-   [Connexion](canopsis-centos-install@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de
    page](canopsis-centos-install.html#dokuwiki__top "Haut de page [T]")

canopsis/canopsis-centos-install.txt · Dernière modification: 2013/03/29
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

![](../lib/exe/indexer.php@id=canopsis%253Acanopsis-centos-install&1424859804)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
