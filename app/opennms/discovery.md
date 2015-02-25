---
layout: page
---

[[[Découverte des équipements (discovery)](discovery@do=backlink.html)]]

[wiki monitoring-fr.org](../start.html "[ALT+H]")

![Logo Monitoring](../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../start.html "start") »
[OpenNMS](start.html "opennms:start") » [Découverte des équipements
(discovery)](discovery.html "opennms:discovery")

### Table des matières {.toggle}

-   [Découverte des équipements
    (discovery)](discovery.html#decouverte-des-equipements-discovery)
    -   [1. Configuration de la découverte
        automatique](discovery.html#configuration-de-la-decouverte-automatique)
        -   [1.1 Pré-requis](discovery.html#pre-requis)
        -   [1.2 Accès à la page de configuration de la
            découverte](discovery.html#acces-a-la-page-de-configuration-de-la-decouverte)
        -   [1.3 Configuration
            générale](discovery.html#configuration-generale)
        -   [1.4 Configuration d'une plage de
            découverte](discovery.html#configuration-d-une-plage-de-decouverte)
        -   [1.5 Configuration d'une plage
            d'exclusion](discovery.html#configuration-d-une-plage-d-exclusion)
        -   [1.6 Configuration d'un équipement
            isolé](discovery.html#configuration-d-un-equipement-isole)
    -   [2. Ajout rapide d'un équipement à
        découvrir](discovery.html#ajout-rapide-d-un-equipement-a-decouvrir)
        -   [2.1 Ajout via l'interface
            web](discovery.html#ajout-via-l-interface-web)
        -   [2.2 Ajout en ligne de
            commande](discovery.html#ajout-en-ligne-de-commande)

Découverte des équipements (discovery) {#decouverte-des-equipements-discovery .sectionedit1}
======================================

OpenNMS possède un module de découverte automatique des équipements
(discovery). Celui-ci intérroge chaque équipement à l’aide d’une requête
ICMP et l’ajoute à la supervision si celui-ci répond à cette requête.

1. Configuration de la découverte automatique {#configuration-de-la-decouverte-automatique .sectionedit2}
---------------------------------------------

### 1.1 Pré-requis {#pre-requis .sectionedit3}

-   Se connecter à l’interface d’OpenNMS avec le compte **admin**

### 1.2 Accès à la page de configuration de la découverte {#acces-a-la-page-de-configuration-de-la-decouverte .sectionedit4}

Cliquer sur le lien **Admin** dans la barre de navigation.

Dans la partie **Operations**, cliquez sur le lien intitulé **Configure
Discovery**

[![](../assets/media/supervision/opennms/discovery-01.png)](../_detail/supervision/opennms/discovery-01.png@id=opennms%253Adiscovery.html "supervision:opennms:discovery-01.png")

### 1.3 Configuration générale {#configuration-generale .sectionedit5}

[![](../assets/media/supervision/opennms/discovery-02.png@w=700)](../_detail/supervision/opennms/discovery-02.png@id=opennms%253Adiscovery.html "supervision:opennms:discovery-02.png")

Les paramètres généraux sont les suivants :

-   *Initial sleep time :* c’est le délai en millisecondes pendant
    lequel OpenNMS attend avant de lancer la découverte automatique
    après avoir redémarré. Ce délai permet à OpenNMS de démarrer
    complètement avant de lancer le processus de découverte ;
-   *Restart sleep time :* Une fois que le processus de découverte est
    terminé ; c’est le délai, en millisecondes, avant le démarrage par
    OpenNMS d’un nouveau processus de découverte ;
-   *Threads :* C’est le nombre de threads utilisés pour la découverte ;
-   *Retries :* C’est le nombre de tentatives qui seront faites pour
    interroger une adresse IP donnée avant de décider qu’elle ne
    correspond à aucun équipement. Ce paramètre peut être substitué plus
    tard dans la configuration ;
-   *Timeout :* Il s’agit du délai, en millisecondes, que le processus
    de découverte va attendre une réponse d’une adresse IP donnée avant
    de décider qu’elle ne correspond à aucun équipement. Ce paramètre
    peut être substitué plus tard dans la configuration.

### 1.4 Configuration d'une plage de découverte {#configuration-d-une-plage-de-decouverte .sectionedit6}

[![](../assets/media/supervision/opennms/discovery-03.png@w=700)](../_detail/supervision/opennms/discovery-03.png@id=opennms%253Adiscovery.html "supervision:opennms:discovery-03.png")

Cette section est utilisée pour spécifier une plage d’adresse IP à
inclure dans le processus de découverte.

Pour ajouter une plage, cliquez sur le bouton **Add New**. La fenêtre
suivante apparaît :

[![](../assets/media/supervision/opennms/discovery-04.png)](../_detail/supervision/opennms/discovery-04.png@id=opennms%253Adiscovery.html "supervision:opennms:discovery-04.png")

-   Entrez l’adresse IP du début de plage ;
-   Entrez l’adresse IP de fin de plage ;
-   Cliquez sur le bouton Add ;

Les autres paramètres sont les suivants :

-   *Timeout :* Il s’agit du délai, en millisecondes, que le processus
    de découverte va attendre une réponse d’une adresse IP donnée avant
    de décider qu’elle ne correspond à aucun équipement ;
-   *Retries:* C’est le nombre de tentatives qui seront faites pour
    interroger une adresse IP donnée avant de décider qu’elle ne
    correspond à aucun équipement ;

### 1.5 Configuration d'une plage d'exclusion {#configuration-d-une-plage-d-exclusion .sectionedit7}

[![](../assets/media/supervision/opennms/discovery-05.png@w=700)](../_detail/supervision/opennms/discovery-05.png@id=opennms%253Adiscovery.html "supervision:opennms:discovery-05.png")

Cette section est utilisée pour spécifier une plage d’adresse IP à
exclure dans le processus de découverte.

Pour ajouter une plage à exclure, cliquez sur le bouton **Add New**. La
fenêtre suivante apparaît :

[![](../assets/media/supervision/opennms/discovery-06.png)](../_detail/supervision/opennms/discovery-06.png@id=opennms%253Adiscovery.html "supervision:opennms:discovery-06.png")

-   Entrez l’adresse IP du début de plage ;
-   Entrez l’adresse IP de fin de plage ;
-   Cliquez sur le bouton Add ;

### 1.6 Configuration d'un équipement isolé {#configuration-d-un-equipement-isole .sectionedit8}

[![](../assets/media/supervision/opennms/discovery-07.png@w=700)](../_detail/supervision/opennms/discovery-07.png@id=opennms%253Adiscovery.html "supervision:opennms:discovery-07.png")

Cette section est utilisée pour spécifier une adresse IP spécifique à
inclure dans le processus de découverte.

Pour ajouter une adresse IP, cliquez sur le bouton **Add New**. La
fenêtre suivante apparaît :

[![](../assets/media/supervision/opennms/discovery-08.png)](../_detail/supervision/opennms/discovery-08.png@id=opennms%253Adiscovery.html "supervision:opennms:discovery-08.png")

-   Entrez l’adresse IP de l’équipement à superviser ;
-   Cliquez sur le bouton Add ;

Les autres paramètres sont les suivants :

-   *Timeout :* Il s’agit du délai, en millisecondes, que le processus
    de découverte va attendre une réponse d’une adresse IP donnée avant
    de décider qu’elle ne correspond à aucun équipement ;
-   *Retries :* C’est le nombre de tentatives qui seront faites pour
    interroger une adresse IP donnée avant de décider qu’elle ne
    correspond à aucun équipement ;

2. Ajout rapide d'un équipement à découvrir {#ajout-rapide-d-un-equipement-a-decouvrir .sectionedit9}
-------------------------------------------

### 2.1 Ajout via l'interface web {#ajout-via-l-interface-web .sectionedit10}

Si vous souhaitez ajouter un équipement à découvrir immédiatement sans
changer la configuration de la découverte automatique, procédez comme
suit :

Sur la page d’administration, cliquez sur **Add Interface** :

[![](../assets/media/supervision/opennms/discovery-09.png)](../_detail/supervision/opennms/discovery-09.png@id=opennms%253Adiscovery.html "supervision:opennms:discovery-09.png")

Renseignez l’adresse IP de l’équipement que vous souhaitez ajouter et
cliquez sur le bouton **Add** :

[![](../assets/media/supervision/opennms/discovery-10.png)](../_detail/supervision/opennms/discovery-10.png@id=opennms%253Adiscovery.html "supervision:opennms:discovery-10.png")

L’équipement doit répondre au ping pour pouvoir être ajouté dans
l’interface.

La configuration de la découverte automatique n’est pas modifiée. Si
l’équipement est supprimé de l’interface d’OpenNMS, il ne sera pas
découvert à nouveau par le processus de découverte automatique.

### 2.2 Ajout en ligne de commande {#ajout-en-ligne-de-commande .sectionedit11}

Pour ajouter un équipement à découvrir immédiatement, connectez-vous au
système et tapez la commande suivante :

~~~
/opt/opennms/bin/send-event.pl --interface ip-address uei.opennms.org/internal/discovery/newSuspect
~~~

Remplacer ip-address par l’adresse IP de l’équipement que vous souhaitez
ajouter.

SOMMAIRE {#sommaire .sectionedit1}
--------

**[Accueil](../start.html "start")**

**[Supervision](../supervision/start.html "supervision:start")**

-   [Nagios](../nagios/start.html "nagios:start")
-   [Centreon](../centreon/start.html "centreon:start")
-   [Shinken](../shinken/start.html "shinken:start")
-   [Zabbix](../zabbix/start.html "zabbix:start")
-   [OpenNMS](start.html "opennms:start")
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

OpenNMS {#opennms .sectionedit1}
-------

-   [Configuration des évènements et des
    alarmes](events-alarms.html "opennms:events-alarms")
-   [Découverte des équipements
    (discovery)](discovery.html "opennms:discovery")
-   [Découverte et supervision des services (capsd et
    pollerd)](services.html "opennms:services")
-   [Installation d'OpenNMS sur CentOS
    5.x](install-on-centos.html "opennms:install-on-centos")
-   [Installation d'OpenNMS sur Ubuntu 8.0.4
    LTS](install-on-ubuntu.html "opennms:install-on-ubuntu")
-   [Interface Web
    d'OpenNMS](opennms-interface.html "opennms:opennms-interface")
-   [Optimisations possibles](optimisation.html "opennms:optimisation")
-   [Personnalisation de
    l'interface](custom-ihm.html "opennms:custom-ihm")
-   [Redondance avec Heartbeat et
    Mon](redondance.html "opennms:redondance")

-   [Afficher le texte
    source](discovery@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](discovery@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](discovery@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](discovery@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](discovery@do=media.html "Gestionnaire de médias")
-   [Index](discovery@do=index.html "Index [X]")
-   [Connexion](discovery@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de page](discovery.html#dokuwiki__top "Haut de page [T]")

opennms/discovery.txt · Dernière modification: 2013/03/29 09:39
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

![](../lib/exe/indexer.php@id=opennms%253Adiscovery&1424859532)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
