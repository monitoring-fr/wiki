---
layout: page
---

[[[Créer son premier
service](creer-son-premier-service@do=backlink.html)]]

[wiki monitoring-fr.org](../../start.html "[ALT+H]")

![Logo Monitoring](../../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../../start.html "start") »
[Nagios](../start.html "nagios:start") » [NAGIOS - Guide de démarrage
pour débutant](start.html "nagios:nagios-debutant:start") » [Créer son
premier
service](creer-son-premier-service.html "nagios:nagios-debutant:creer-son-premier-service")

### Table des matières {.toggle}

-   [Créer son premier
    service](creer-son-premier-service.html#creer-son-premier-service)
    -   [Création du/des
        services](creer-son-premier-service.html#creation-dudes-services)

Créer son premier service {#creer-son-premier-service .sectionedit1}
=========================

Ce chapitre va montrer pas par pas comment ajouter un service à notre
hôte Rainette.

Création du/des services {#creation-dudes-services .sectionedit2}
------------------------

Pour notre hôte “Rainette”, nous allons lui ajouter 2 services. Un
service de Load Average et un autre pour le test d’apache (Serveur Web)

Pour ajouter nos 2 services, éditez le fichier *rainette.cfg* et ajouter
le code ci-dessous.

~~~
# Definition du service de Load Average
define service{
        use                             generic-service
        host_name                       Rainette
        service_description             Load Average
        check_command                   check_load!5.0,4.0,3.0!10.0,8.0,6.0
        }

# Definition du service de controle d'url Web
define service{
        use                             generic-service
        host_name                       Rainette
        service_description             Reponse interface Web Nagios
        check_command                   check_http!"http://xx.xx.xx.xx/nagios"
        notifications_enabled           0
        }
~~~

J’explique un peu les définitions ci-dessus. Concernant le “Load
Average”, nous avons précisé 4 variables.

-   **use** → sert à appeler le template précisé
-   **host\_name** → permet de créer le lien entre le service “Load
    Average” et notre hôte “Rainette”
-   **service\_description** → est le nom que vous allez donner à votre
    service
-   **check\_command** → cette variable fait appel à une commande qui
    est déjà paramétrée ou que vous avez paramétré dans le fichier
    commands.cfg.

***Explication syntaxique :***

check\_load!5.0,4.0,3.0!10.0,8.0,6.0

-   **check\_load** → est l’alias (command\_name dans la définition de
    commandes, regarder le commands.cfg pour y voir plus clair)
-   **!** → le ! est un séparateur pour délimiter les arguments
    (\$ARG1\$, \$ARG2\$ …)
-   **5.0,4.0,3.0** → c’est l’argument numéro 1 (\$ARG1\$). Pour le
    plugin check\_load ceci correspond aux seuils de WARNING
-   **10.0,8.0,6.0** → c’est l’argument numéro 2 (\$ARG2\$). Pour le
    plugin check\_load ceci correspond aux seuils de CRITICAL

Concernant, la réponse de l’interface Nagios, le check\_http, vous
pouvez voir une variable supplémentaire. Vu que vos services héritent du
“generic-service”, comme tout principe d’héritage, la valeur la plus
proche de votre définition de service sera prioritaire sur le template.

Vous allez me dire, il est pourri son cours quand je redémarre Nagios,
il est en erreur … je vous dis c’est normal, car la check\_command
“check\_load” pour la définition du Load Average n’existe pas dans le
fichier commands.cfg. Je vous invite donc à suivre le **[chapitre
suivant](creer-sa-premiere-commande.html "nagios:nagios-debutant:creer-sa-premiere-commande")**
pour se sortir de ce mauvais pas et voir notre hôte Rainette muni de 2
beaux services.

SOMMAIRE {#sommaire .sectionedit1}
--------

**[Accueil](../../start.html "start")**

**[Supervision](../../supervision/start.html "supervision:start")**

-   [Nagios](../start.html "nagios:start")
-   [Centreon](../../centreon/start.html "centreon:start")
-   [Shinken](../../shinken/start.html "shinken:start")
-   [Zabbix](../../zabbix/start.html "zabbix:start")
-   [OpenNMS](../../opennms/start.html "opennms:start")
-   [EyesOfNetwork](../../eyesofnetwork/start.html "eyesofnetwork:start")
-   [Groundwork](../../groundwork/start.html "groundwork:start")
-   [Zenoss](../../zenoss/start.html "zenoss:start")
-   [Vigilo](../../vigilo/start.html "vigilo:start")
-   [Icinga](../../icinga/start.html "icinga:start")
-   [Cacti](../../cacti/start.html "cacti:start")
-   [Ressenti
    utilisateur](../../supervision/eue/start.html "supervision:eue:start")
-   [Ressenti utilisateur avec
    sikuli](../../sikuli/eue/start.html "sikuli:eue:start")

**[Hypervision](../../hypervision/start.html "hypervision:start")**

-   [Canopsis](../../canopsis/start.html "canopsis:start")

**[Sécurité](../../securite/start.html "securite:start")**

**[Infrastructure](../../infra/start.html "infra:start")**

**[Développement](../../dev/start.html "dev:start")**

Nagios {#nagios .sectionedit1}
------

-   [Arborescence des
    fichiers](../installation-layout.html "nagios:installation-layout")
-   [Commandes de remontée de
    contrôle](../ocsp-ochp.html "nagios:ocsp-ochp")
-   [Données Nagios dans un ramdisk](../ramdisk.html "nagios:ramdisk")
-   [Event Handlers](../event_handlers.html "nagios:event_handlers")
-   [Gabarits d'objets de
    configuration](../templates.html "nagios:templates")
-   [Installation Nagios 2 & 3 sur Ubuntu 6.0.6, 8.0.4 et 10.0.4
    LTS](../ubuntu-install.html "nagios:ubuntu-install")
-   [Installation Nagios 3 sur Debian Squeeze
    6.0.3](../debian-install.html "nagios:debian-install")
-   [Installation de Nagios 3.x sur CentOS
    5.3](../nagios-centos-install.html "nagios:nagios-centos-install")
-   [Introduction aux objets de
    configuration](../configobjects.html "nagios:configobjects")
-   [Introduction à
    Nagios](../nagios-introduction.html "nagios:nagios-introduction")
-   [Liens Nagios](../links.html "nagios:links")
-   [Mise en place complète de Nagios sur RHEL
    5.4](../mise-en-place-complete-nagios-sur-rhel-5.4/start.html "nagios:mise-en-place-complete-nagios-sur-rhel-5.4:start")
-   [NAGIOS - Guide de démarrage pour
    débutant](start.html "nagios:nagios-debutant:start")
-   [Nagios Addons](../addons/start.html "nagios:addons:start")
-   [Nagios
    Integration](../integration/start.html "nagios:integration:start")
-   [Nagios Plugins](../plugins/start.html "nagios:plugins:start")
-   [Nagios et les
    notifications](../notifications.html "nagios:notifications")
-   [Outils de supervision d'un hôte
    Windows](../windows-client.html "nagios:windows-client")
-   [Référence des objets de
    configuration](../objects-reference.html "nagios:objects-reference")
-   [Superviser un hôte Windows avec
    NSClient++](../nagios-nsclient-host.html "nagios:nagios-nsclient-host")
-   [Supervision Windows en mode
    passif](../supervision-windows-passif.html "nagios:supervision-windows-passif")
-   [Supervision vmware esx](../vmware_esx.html "nagios:vmware_esx")
-   [check-list de diagnostic](../debug.html "nagios:debug")

-   [Afficher le texte
    source](creer-son-premier-service@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](creer-son-premier-service@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](creer-son-premier-service@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](creer-son-premier-service@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](creer-son-premier-service@do=media.html "Gestionnaire de médias")
-   [Index](creer-son-premier-service@do=index.html "Index [X]")
-   [Connexion](creer-son-premier-service@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de
    page](creer-son-premier-service.html#dokuwiki__top "Haut de page [T]")

nagios/nagios-debutant/creer-son-premier-service.txt · Dernière
modification: 2013/03/29 09:39 (modification externe)

[![CC Attribution-Noncommercial-Share Alike 3.0
Unported](../../lib/images/license/button/cc-by-nc-sa.png)](http://creativecommons.org/licenses/by-nc-sa/3.0/)

[![www.chimeric.de](../../lib/tpl/arctic/images/button-chimeric-de.png)](http://www.chimeric.de "www.chimeric.de")
[![Valid
CSS](../../lib/tpl/arctic/images/button-css.png)](http://jigsaw.w3.org/css-validator/check/referer "Valid CSS")
[![Driven by
DokuWiki](../../lib/tpl/arctic/images/button-dw.png)](http://wiki.splitbrain.org/wiki:dokuwiki "Driven by DokuWiki")
[![do yourself a favour and use a real browser - get
firefox!!](../../lib/tpl/arctic/images/button-firefox.png)](http://www.firefox-browser.de "do yourself a favour and use a real browser - get firefox")
[![Recent changes RSS
feed](../../lib/tpl/arctic/images/button-rss.png)](../../feed.php "Recent changes RSS feed")
[![Valid XHTML
1.0](../../lib/tpl/arctic/images/button-xhtml.png)](http://validator.w3.org/check/referer "Valid XHTML 1.0")

![](../../lib/exe/indexer.php@id=nagios%253Anagios-debutant%253Acreer-son-premier-service&1424859573)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
