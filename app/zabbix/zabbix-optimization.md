---
layout: page
---

[[[Optimisation de Zabbix](zabbix-optimization@do=backlink.html)]]

[wiki monitoring-fr.org](../start.html "[ALT+H]")

![Logo Monitoring](../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../start.html "start") »
[Zabbix](start.html "zabbix:start") » [Optimisation de
Zabbix](zabbix-optimization.html "zabbix:zabbix-optimization")

### Table des matières {.toggle}

-   [Optimisation de
    Zabbix](zabbix-optimization.html#optimisation-de-zabbix)
    -   [Matériel](zabbix-optimization.html#materiel)
    -   [Système
        d'exploitation](zabbix-optimization.html#systeme-d-exploitation)
    -   [Zabbix](zabbix-optimization.html#zabbix)
        -   [Zabbix Server](zabbix-optimization.html#zabbix-server)
        -   [Zabbix Frontend](zabbix-optimization.html#zabbix-frontend)
    -   [Base de données](zabbix-optimization.html#base-de-donnees)

Optimisation de Zabbix {#optimisation-de-zabbix .sectionedit1}
======================

Page rédigée pour une version Ubuntu 8.04/10.04 LTS et Zabbix 1.8.2.

Sur cette page, nous allons indiquer les différentes optimisations
matérielles ou logicielles permettant d’améliorer le fonctionnement de
Zabbix, et de ses performances.

Sources : site et wiki officiels de
[Zabbix](http://www.zabbix.com/ "http://www.zabbix.com/").

Cette page a été rédigée par :

  **Rôle**        **Nom**
  --------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------
  **Rédacteur**   [Ludovic VALENTIN](http://www.monitoring-fr.org/community/members/ludovic-valentin/ "http://www.monitoring-fr.org/community/members/ludovic-valentin/")

Matériel {#materiel .sectionedit3}
--------

Au niveau du matériel, il est possible d’optimiser les performances de
Zabbix en acquérant en toute logique les meilleures technologies
possibles. Ainsi, il est recommandé d’utiliser un processeur aussi
rapide que possible, de manière à améliorer le traitement des
informations.

Pour les supports de stockage, il est préférable de disposer d’un SCSI
ou d’un NAS plutôt que de simples disques durs IDE, ou SATA. Pour les
disques IDE, l’usage de l’utilitaire hdparm permet d’en accroître les
performances. La vitesse de traitement des supports doit aussi être
prise en compte, en favorisant une vitesse la plus élevée possible. Une
vitesse de 15000 tr/min pour un disque dur est donc un meilleur choix
qu’un de 7200 tr/min.

En cas de mise en place d’un système de stockage RAID, il faut faciliter
le traitement des données en choisissant un système rapide de sauvegarde
RAID.

Dans l’optimisation du matériel réseau, il est recommandé de disposer
d’adaptateurs Ethernet rapides.

Et bien sûr, pour finir il est également conseillé de posséder une
grande capacité de mémoire RAM, dans l’optique de favoriser les
traitements des différents processus de Zabbix.

Système d'exploitation {#systeme-d-exploitation .sectionedit4}
----------------------

Dans le choix du système d’exploitation, il est avant tout recommandé
d’utiliser une version stable, et la plus récente possible. Certaines
fonctionnalités du Kernel peuvent également être retirées, ou encore
optimisées.

Zabbix {#zabbix .sectionedit5}
------

### Zabbix Server {#zabbix-server .sectionedit6}

De nombreux paramètres de la configuration de Zabbix peuvent être
optimisés :

  **Paramètre**        **Description**
  -------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **`StartPollers`**   Ce paramètre correspond au nombre d’instances de zabbix\_server démarrées. Il consomme de nombreuses ressources, car le parallélisme augmente en conséquence. Sa valeur doit être la plus basse possible, il faut donc trouver le paramétrage optimal. Le nombre optimal est trouvé lorsque la file d’attente de Zabbix (voir Administration/Queue dans l’interface web) ne contient pas beaucoup de paramètres (items) en attente de traitement (l’idéal étant bien sûr 0 paramètres en attente). Il est possible de surveiller cette valeur avec un check interne zabbix[queue].
  **`DebugLevel`**     La valeur optimale du DebugLevel est le niveau 3. Ce dernier permet de limiter les informations.
  **`DBSocket`**       L’optimisation de ce paramètre est valable seulement pour un SGBD MySQL. Il est recommandé de préciser le DBSocket afin d’améliorer la vitesse et la sécurité de la connexion.

### Zabbix Frontend {#zabbix-frontend .sectionedit8}

Dans l’interface Zabbix, le réglage des mises à jour des items à une
valeur moins basse que possible permet de ne pas surcharger Zabbix.
Alors que l’usage de petits intervalles de temps entre chaque mise à
jour d’items, apporte des graphiques plus précis et détaillés, mais plus
gourmand en ressources de traitement des données.

Pour optimiser les performances, il faut donc éditer les templates afin
de régler les paramètres par défaut de manière générale.

Au niveau des paramètres, il y a quelques réglages possibles dans
l’interface Zabbix, comme les Housekeepers, permettant d’affiner la
durée de conservation de certaines données (historiques, évènements,
…etc).

De plus pour les items, il est recommandé de ne pas gaspiller les
ressources et les performances de Zabbix en supervisant des paramètres
en doublons sur un même hôte. Par exemple, un item peut remonter un
ensemble d’informations A, B et C, tout en ayant un autre item remontant
B, il y a donc une nécessité d’optimisation en supprimant ce deuxième
item, celui-ci devenant inutile par rapport au premier.

Pour finir, il faut éviter l’usage de longues périodes données en
argument dans les triggers. Pour exemple, Max(3600) sera plus long à
calculer que Max(60).

Base de données {#base-de-donnees .sectionedit9}
---------------

La base de données est une partie importante de l’optimisation de
Zabbix, celui-ci dépendant essentiellement de la disponibilité et de la
performance du SGBD utilisé. Il est donc conseillé d’utiliser un moteur
de base de données rapide.

Il est recommandé d’utiliser une version du SGBD stable et récente, de
plus pour améliorer les performances de MySQL et PostreSQL, ces derniers
doivent être installés depuis les sources. Ensuite, il faut se tourner
vers la documentation officielle du SGDB utilisé afin de d’optimiser les
performances des bases de données.

Au niveau de MySQL, la structure de table InnoDB doit être activée, car
Zabbix peut fonctionner jusqu’à 1,5 fois plus vite si InnoDB est
utilisé, en comparaison de MyISAM. Cela est dû à l’augmentation du
parallélisme, même si cette fonction est très gourmande en CPU et en
espace disque. Pour les grandes infrastructures, il est recommandé de
conserver les fichiers temporaires de MySQL en tmpfs.

Il peut être intéressant aussi de stocker les tables de la base de
données sur différents disques durs. Les tables les plus utilisées sont
« history », « history\_str », « items », « functions », « triggers » et
« trends ».

SOMMAIRE {#sommaire .sectionedit1}
--------

**[Accueil](../start.html "start")**

**[Supervision](../supervision/start.html "supervision:start")**

-   [Nagios](../nagios/start.html "nagios:start")
-   [Centreon](../centreon/start.html "centreon:start")
-   [Shinken](../shinken/start.html "shinken:start")
-   [Zabbix](start.html "zabbix:start")
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

Zabbix {#zabbix .sectionedit1}
------

-   [Introduction](zabbix-introduction.html "zabbix:zabbix-introduction")
-   [Fonctionnement](zabbix-work.html "zabbix:zabbix-work")
-   [Ressources et
    performances](zabbix-resources.html "zabbix:zabbix-resources")
-   [Installation sur
    Ubuntu](zabbix-ubuntu-install.html "zabbix:zabbix-ubuntu-install")
-   [Interface Web](zabbix-interface.html "zabbix:zabbix-interface")
-   [Prise en main](zabbix-use.html "zabbix:zabbix-use")
-   [Gestion des items](zabbix-item-use.html "zabbix:zabbix-item-use")
-   [Gestion des
    triggers](zabbix-trigger-use.html "zabbix:zabbix-trigger-use")
-   [Gestion des
    actions](zabbix-action-use.html "zabbix:zabbix-action-use")
-   [Optimisation](zabbix-optimization.html "zabbix:zabbix-optimization")
-   [Architectures
    distribuées](zabbix-distributed-architecture.html "zabbix:zabbix-distributed-architecture")
-   [Découverte
    d'équipements](zabbix-discovery.html "zabbix:zabbix-discovery")
-   [Notification par
    email](zabbix-email-notification.html "zabbix:zabbix-email-notification")
-   [Superviser un hôte
    SNMP](zabbix-snmp-host.html "zabbix:zabbix-snmp-host")
-   [Catalogue des erreurs](zabbix-errors.html "zabbix:zabbix-errors")

-   [Afficher le texte
    source](zabbix-optimization@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](zabbix-optimization@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](zabbix-optimization@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](zabbix-optimization@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](zabbix-optimization@do=media.html "Gestionnaire de médias")
-   [Index](zabbix-optimization@do=index.html "Index [X]")
-   [Connexion](zabbix-optimization@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de
    page](zabbix-optimization.html#dokuwiki__top "Haut de page [T]")

zabbix/zabbix-optimization.txt · Dernière modification: 2013/03/29 09:39
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

![](../lib/exe/indexer.php@id=zabbix%253Azabbix-optimization&1424859530)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
