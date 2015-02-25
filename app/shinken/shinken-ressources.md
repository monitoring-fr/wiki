---
layout: page
---

[[[Ressources et Performances de
Shinken](shinken-ressources@do=backlink.html)]]

[wiki monitoring-fr.org](../start.html "[ALT+H]")

![Logo Monitoring](../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../start.html "start") »
[Shinken](start.html "shinken:start") » [Ressources et Performances de
Shinken](shinken-ressources.html "shinken:shinken-ressources")

### Table des matières {.toggle}

-   [Ressources et Performances de
    Shinken](shinken-ressources.html#ressources-et-performances-de-shinken)
    -   [Ressources](shinken-ressources.html#ressources)
        -   [Matériels requis](shinken-ressources.html#materiels-requis)
        -   [Systèmes d'exploitation
            supportés](shinken-ressources.html#systemes-d-exploitation-supportes)
        -   [Logiciels requis](shinken-ressources.html#logiciels-requis)
    -   [Stockages](shinken-ressources.html#stockages)
        -   [Modules
            supportés](shinken-ressources.html#modules-supportes)
    -   [Performances](shinken-ressources.html#performances)

Ressources et Performances de Shinken {#ressources-et-performances-de-shinken .sectionedit1}
=====================================

Page rédigée pour une version de Shinken 0.4.

Sur cette page, nous allons préciser les différentes ressources que
Shinken doit disposer afin de fonctionner correctement. Un descriptif
des performances de Zabbix est également présent, de manière à permettre
une meilleur estimation et compréhension des besoins.

Sources : site et wiki officiels de
[Shinken](http://www.shinken-monitoring.org/ "http://www.shinken-monitoring.org/").

Cette page a été rédigée par :

  **Rôle**        **Nom**
  --------------- ------------------
  **Rédacteur**   Romuald FRONTEAU

Ressources {#ressources .sectionedit3}
----------

### Matériels requis {#materiels-requis .sectionedit4}

Shinken doit disposer d’une configuration matérielle minimum pour
fonctionner telle que celles-ci :

  **Ressource**       **Configuration minimale**   **Configuration conseillée**
  ------------------- ---------------------------- ------------------------------
  **Processeur**                                   
  **Mémoire RAM**     xx Mo                        xx Mo
  **Espace disque**   xx Mo                        xx Mo

#### Processeur

#### Mémoires {#memoires}

#### Exemples de configurations matérielles {#exemples-de-configurations-materielles}

Voici quelques exemples de configurations matérielles avec le nombre
d’hôtes supervisables correspondant :

  **Type**   **Plateforme**   **Processeur**   **Mémoire RAM**   **Hôtes**
  ---------- ---------------- ---------------- ----------------- -----------
                                                                 

### Systèmes d'exploitation supportés {#systemes-d-exploitation-supportes .sectionedit7}

Shinken est développé pour fonctionner sur de nombreuses plateformes
différentes. Shinken est compatible sur les plateformes où Python est
installable. Il a testé sur les plateformes suivantes :

  **Plateforme**               **Shinken**
  ---------------------------- -------------
  **FreeBSD**                  Supporté
  **Linux**                    Supporté
  **Mac OS X**                 Supporté
  **Android**                  Supporté
  **Solaris**                  Supporté
  **Windows XP / Vista / 7**   Supporté

### Logiciels requis {#logiciels-requis .sectionedit9}

Pour fonctionner, Shinken a besoin de plusieurs applications
essentielles :

  **Logiciels**        **Versions**   **Descriptions**
  -------------------- -------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Python**           \>= 2.4        Si Python \< 2.6, installer la librarie python [multiprocessing](http://pypi.python.org/packages/source/m/multiprocessing/multiprocessing-2.6.2.1.tar.gz "http://pypi.python.org/packages/source/m/multiprocessing/multiprocessing-2.6.2.1.tar.gz")
  **Pyro**                            
  **Thruk ou Ninja**                  Une interface Web pour visualiser votre contenu à superviser

Stockages {#stockages .sectionedit11}
---------

### Modules supportés {#modules-supportes .sectionedit12}

Afin de stocker l’ensemble de ses données, Shinken peut les injecter
dans :

-   Oracle (via NDO)
-   MySQL (via NDO)
-   Merlin
-   CouchDB
-   Perfdata (hôtes & services)
-   LiveStatus

Performances {#performances .sectionedit13}
------------

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
    source](shinken-ressources@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](shinken-ressources@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](shinken-ressources@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](shinken-ressources@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](shinken-ressources@do=media.html "Gestionnaire de médias")
-   [Index](shinken-ressources@do=index.html "Index [X]")
-   [Connexion](shinken-ressources@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de
    page](shinken-ressources.html#dokuwiki__top "Haut de page [T]")

shinken/shinken-ressources.txt · Dernière modification: 2013/03/29 09:39
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

![](../lib/exe/indexer.php@id=shinken%253Ashinken-ressources&1424859528)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
