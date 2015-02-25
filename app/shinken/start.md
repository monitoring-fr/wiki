---
layout: page
---

[[[Shinken](start@do=backlink.html)]]

[wiki monitoring-fr.org](../start.html "[ALT+H]")

![Logo Monitoring](../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../start.html "start") »
[Shinken](start.html "shinken:start")

### Table des matières {.toggle}

-   [Shinken](start.html#shinken)
    -   [Documentation](start.html#documentation)
        -   [Chapitre 1 - Shinken](start.html#chapitre-1-shinken)
        -   [Chapitre 2 -
            Installation](start.html#chapitre-2-installation)
        -   [Chapitre 2 -
            Configuration](start.html#chapitre-2-configuration)
        -   [Chapitre 3 - Expertise](start.html#chapitre-3-expertise)
        -   [Chapitre 4 -
            Suppléments](start.html#chapitre-4-supplements)
    -   [Nouvelle Documentation](start.html#nouvelle-documentation)
        -   [Débuter avec Shinken](start.html#debuter-avec-shinken)
        -   [Approfondir votre connaissance de
            Shinken](start.html#approfondir-votre-connaissance-de-shinken)
        -   [Perfectionnez vous avec
            Shinken](start.html#perfectionnez-vous-avec-shinken)
        -   [Annexe](start.html#annexe)

[![](../assets/media/nagios/shinken/logo_shinken-128x128.png)](../_detail/nagios/shinken/logo_shinken-128x128.png@id=shinken%253Astart.html "nagios:shinken:logo_shinken-128x128.png")

Shinken {#shinken .sectionedit1}
=======

Ce dossier a été réalisé par :

  **Rôle**           **Nom**
  ------------------ ------------------
  **Rédacteur**      Jean GABES
  **Contributeur**   Romuald FRONTEAU
  **Contributeur**   David GUENAULT

Le projet Shinken consiste en une refonte complète du cœur de Nagios en
Python, lui apportant une nouvelle architecture plus souple et plus
facile à maintenir que le daemon monolithique actuel. Se basant sur une
vue Unix, l’architecture se compose de daemons simples qui coopèrent
afin de proposer les mêmes fonctionnalités que Nagios, voir plus.

Le nom est inspiré des sabres Shinken japonais qui sont les armes les
plus coupantes des guerriers. Le programme permet en effet de couper
automatiquement la configuration des administrateurs et ce
intelligemment (enfin au moins il essaie).

Documentation {#documentation .sectionedit3}
-------------

### Chapitre 1 - Shinken {#chapitre-1-shinken .sectionedit4}

**[Introduction à
Shinken](shinken-introduction.html "shinken:shinken-introduction")**

**[Fonctionnement de
Shinken](shinken-work.html "shinken:shinken-work")**

**[Ressources et performances de
Shinken](shinken-ressources.html "shinken:shinken-ressources")**

### Chapitre 2 - Installation {#chapitre-2-installation .sectionedit5}

**[Installation de Shinken sur
Ubuntu](shinken-ubuntu-install.html "shinken:shinken-ubuntu-install")**

**[Installation de Shinken sur Ubuntu possédant Nagios
d'installé](shinken-ubuntu-install-with-nagios.html "shinken:shinken-ubuntu-install-with-nagios")**

**[Installation de Shinken sur Debian
Lenny](shinken-debian-install.html "shinken:shinken-debian-install")**

**[Installation de Shinken sur
CentOS](shinken-centos-install.html "shinken:shinken-centos-install")**

**[Installation simplifiée de shinken à l'aide du nouveau
script](http://wiki.monitoring-fr.org/shinken/shinken-install "shinken:shinken-install")**

### Chapitre 2 - Configuration {#chapitre-2-configuration .sectionedit6}

**[Configuration &
Lancement](shinken-architecture-config.html "shinken:shinken-architecture-config")**

### Chapitre 3 - Expertise {#chapitre-3-expertise .sectionedit7}

**[Les architectures avancées de
Shinken](shinken-advanced-architecture.html "shinken:shinken-advanced-architecture")**

### Chapitre 4 - Suppléments {#chapitre-4-supplements .sectionedit8}

**[La supervision en général sur le wiki
Monitoring-fr](../supervision/start.html "supervision:start")**

-   [Commandes pour la
    supervision](../supervision/commands.html "supervision:commands")
-   [Dstat](../supervision/dstat.html "supervision:dstat")
-   [Installer ou activer
    SNMP](../supervision/snmp-install.html "supervision:snmp-install")
-   [Mode actif](../supervision/actif.html "supervision:actif")
-   [Mode passif](../supervision/passif.html "supervision:passif")
-   [Ntop](../supervision/ntop/start.html "supervision:ntop:start")
-   [Panorama](../supervision/links.html "supervision:links")
-   [RRDTool](../supervision/rrdtool.html "supervision:rrdtool")
-   [SNMP](../supervision/snmp.html "supervision:snmp")
-   [Supervision Hardware
    IPMI](../supervision/ipmi.html "supervision:ipmi")
-   [Supervision du ressenti
    utilisateur](../supervision/eue/start.html "supervision:eue:start")
-   [Tableaux récapitulatifs des différents fichiers
    importants](../supervision/important-files.html "supervision:important-files")

Nouvelle Documentation {#nouvelle-documentation .sectionedit9}
----------------------

Cette documentation est basé sur un code couleur pour vous montrer
rapidement le niveau de complexité des parties de la documentation.

  **Code**                                                                                                                                **Niveau**
  --------------------------------------------------------------------------------------------------------------------------------------- --------------------
  [![](../assets/media/shinken/puce_verte.png@w=16)](../_detail/shinken/puce_verte.png@id=shinken%253Astart.html "shinken:puce_verte.png")      Niveau Débutant
  [![](../assets/media/shinken/puce_orange.png@w=16)](../_detail/shinken/puce_orange.png@id=shinken%253Astart.html "shinken:puce_orange.png")   Niveau Confirmé
  [![](../assets/media/shinken/puce_rouge.png@w=16)](../_detail/shinken/puce_rouge.png@id=shinken%253Astart.html "shinken:puce_rouge.png")      Niveau Expérimenté

### Débuter avec Shinken {#debuter-avec-shinken .sectionedit11}

  ------------------------------------------------------------------------------------------------------------------------------------ ----------------------------------------------------------------------------------------
  [![](../assets/media/shinken/puce_verte.png@w=16)](../_detail/shinken/puce_verte.png@id=shinken%253Astart.html "shinken:puce_verte.png")   **[Introduction à Shinken](shinken-introduction.html "shinken:shinken-introduction")**
  [![](../assets/media/shinken/puce_verte.png@w=16)](../_detail/shinken/puce_verte.png@id=shinken%253Astart.html "shinken:puce_verte.png")   **[Fonctionnement de Shinken](shinken-work.html "shinken:shinken-work")**
  ------------------------------------------------------------------------------------------------------------------------------------ ----------------------------------------------------------------------------------------

  ------------------------------------------------------------------------------------------------------------------------------------ ------------------------------------------------------------------------------------------------------------------------------------------------------
  [![](../assets/media/shinken/puce_verte.png@w=16)](../_detail/shinken/puce_verte.png@id=shinken%253Astart.html "shinken:puce_verte.png")   **[Installer votre Shinken les yeux fermés](shinken-10min-start.html "shinken:shinken-10min-start")**
  [![](../assets/media/shinken/puce_verte.png@w=16)](../_detail/shinken/puce_verte.png@id=shinken%253Astart.html "shinken:puce_verte.png")   **[Shinken en haute disponibilité sur 2 noeuds](shinken-ha-2noeuds.html "shinken:shinken-ha-2noeuds")**
  [![](../assets/media/shinken/puce_verte.png@w=16)](../_detail/shinken/puce_verte.png@id=shinken%253Astart.html "shinken:puce_verte.png")   **[Utilisez Shinken avec l'interface de votre choix](shinken-use-ui.html "shinken:shinken-use-ui")**
  [![](../assets/media/shinken/puce_verte.png@w=16)](../_detail/shinken/puce_verte.png@id=shinken%253Astart.html "shinken:puce_verte.png")   **[Configuration de Shinken post-install](http://wiki.monitoring-fr.org/shinken/shinken-post-install-config "shinken:shinken-post-install-config")**
  ------------------------------------------------------------------------------------------------------------------------------------ ------------------------------------------------------------------------------------------------------------------------------------------------------

### Approfondir votre connaissance de Shinken {#approfondir-votre-connaissance-de-shinken .sectionedit14}

  --------------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------------------
  [![](../assets/media/shinken/puce_orange.png@w=16)](../_detail/shinken/puce_orange.png@id=shinken%253Astart.html "shinken:puce_orange.png")   **[Les modules de Shinken](http://wiki.monitoring-fr.org/shinken/shinken-modules "shinken:shinken-modules")**
  [![](../assets/media/shinken/puce_orange.png@w=16)](../_detail/shinken/puce_orange.png@id=shinken%253Astart.html "shinken:puce_orange.png")   **[Configuration avancée de Shinken](http://wiki.monitoring-fr.org/shinken/shinken-modules "shinken:shinken-modules")**
  [![](../assets/media/shinken/puce_orange.png@w=16)](../_detail/shinken/puce_orange.png@id=shinken%253Astart.html "shinken:puce_orange.png")   **[Architecture Distribuée avec Shinken](http://wiki.monitoring-fr.org/shinken/shinken-modules "shinken:shinken-modules")**
  --------------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------------------

### Perfectionnez vous avec Shinken {#perfectionnez-vous-avec-shinken .sectionedit16}

  ------------------------------------------------------------------------------------------------------------------------------------ ------------------------------------------------------------------------------------------------------------------------------------
  [![](../assets/media/shinken/puce_rouge.png@w=16)](../_detail/shinken/puce_rouge.png@id=shinken%253Astart.html "shinken:puce_rouge.png")   **[Présentation des fonctionnalités de Shinken](http://wiki.monitoring-fr.org/shinken/shinken-modules "shinken:shinken-modules")**
  [![](../assets/media/shinken/puce_rouge.png@w=16)](../_detail/shinken/puce_rouge.png@id=shinken%253Astart.html "shinken:puce_rouge.png")   **[Mise en place de la Haute Dispo](http://wiki.monitoring-fr.org/shinken/shinken-modules "shinken:shinken-modules")**
  [![](../assets/media/shinken/puce_rouge.png@w=16)](../_detail/shinken/puce_rouge.png@id=shinken%253Astart.html "shinken:puce_rouge.png")   **[Mise en place de la répartition de charge](http://wiki.monitoring-fr.org/shinken/shinken-modules "shinken:shinken-modules")**
  [![](../assets/media/shinken/puce_rouge.png@w=16)](../_detail/shinken/puce_rouge.png@id=shinken%253Astart.html "shinken:puce_rouge.png")   **[Présentation & Mise en place des Royaume](http://wiki.monitoring-fr.org/shinken/shinken-modules "shinken:shinken-modules")**
  [![](../assets/media/shinken/puce_rouge.png@w=16)](../_detail/shinken/puce_rouge.png@id=shinken%253Astart.html "shinken:puce_rouge.png")   **[Gestion des chaînes de liaisons](http://wiki.monitoring-fr.org/shinken/shinken-modules "shinken:shinken-modules")**
  [![](../assets/media/shinken/puce_rouge.png@w=16)](../_detail/shinken/puce_rouge.png@id=shinken%253Astart.html "shinken:puce_rouge.png")   **[....](http://wiki.monitoring-fr.org/shinken/shinken-modules "shinken:shinken-modules")**
  ------------------------------------------------------------------------------------------------------------------------------------ ------------------------------------------------------------------------------------------------------------------------------------

### Annexe {#annexe .sectionedit18}

  ------------------------------------------------------------------------------------------------------------------------------------ --------------------------------------------------------------------------------------------------------------------------------------------------------
  [![](../assets/media/shinken/puce_verte.png@w=16)](../_detail/shinken/puce_verte.png@id=shinken%253Astart.html "shinken:puce_verte.png")   **[Description des fichiers de configuration](http://wiki.monitoring-fr.org/shinken/shinken-configuration-file "shinken:shinken-configuration-file")**
  ------------------------------------------------------------------------------------------------------------------------------------ --------------------------------------------------------------------------------------------------------------------------------------------------------

Contenu décrivant la moindre option de shinken variable, balise, etc …
comme cette page

[http://doc.monitoring-fr.org/3\_0/html/configuringnagios-configmain.html\#configuringnagios-configmain-debug\_verbosity](http://doc.monitoring-fr.org/3_0/html/configuringnagios-configmain.html#configuringnagios-configmain-debug_verbosity "http://doc.monitoring-fr.org/3_0/html/configuringnagios-configmain.html#configuringnagios-configmain-debug_verbosity")

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
    source](start@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](start@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](start@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](start@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](start@do=media.html "Gestionnaire de médias")
-   [Index](start@do=index.html "Index [X]")
-   [Connexion](start@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de page](start.html#dokuwiki__top "Haut de page [T]")

shinken/start.txt · Dernière modification: 2013/03/29 09:39
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

![](../lib/exe/indexer.php@id=shinken%253Astart&1424859528)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
