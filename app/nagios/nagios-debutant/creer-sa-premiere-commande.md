---
layout: page
---

[[[Créer une nouvelle
commande](creer-sa-premiere-commande@do=backlink.html)]]

[wiki monitoring-fr.org](../../start.html "[ALT+H]")

![Logo Monitoring](../../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../../start.html "start") »
[Nagios](../start.html "nagios:start") » [NAGIOS - Guide de démarrage
pour débutant](start.html "nagios:nagios-debutant:start") » [Créer une
nouvelle
commande](creer-sa-premiere-commande.html "nagios:nagios-debutant:creer-sa-premiere-commande")

### Table des matières {.toggle}

-   [Créer une nouvelle
    commande](creer-sa-premiere-commande.html#creer-une-nouvelle-commande)
    -   [Création d'une nouvelle
        commande](creer-sa-premiere-commande.html#creation-d-une-nouvelle-commande)

Créer une nouvelle commande {#creer-une-nouvelle-commande .sectionedit1}
===========================

Ce chapitre va permettre de créer une nouvelle commande pour valider la
définition du service Load Average de l’hôte Rainette.

Création d'une nouvelle commande {#creation-d-une-nouvelle-commande .sectionedit2}
--------------------------------

La création des commandes se fait dans le fichier *commands.cfg*. Nous
allons donc ajouter notre check\_load à notre fichier pour que Nagios
reconnaisse la commande check\_load.

Dans le fichier commands.cfg, ajoutez ceci :

~~~~ {.code}
# 'check_load' command definition
define command{
        command_name    check_load
        command_line    $USER1$/check_load -w $ARG1$ -c $ARG2$
        }
~~~~

Bien sûr tous les commandes n’ont pas la même syntaxe. Il est très
important d’utiliser l’option –help des plugins pour savoir de quoi vous
aller avoir besoin à renseigner pour la variable **command\_line**

Et voilà redémarrez Nagios le problème est corrigé et nos 2 services
sont là :)

[![](../../assets/media/nagios/nagios-debutant/nouveaux-services.png@w=700)](../../_detail/nagios/nagios-debutant/nouveaux-services.png@id=nagios%253Anagios-debutant%253Acreer-sa-premiere-commande.html "nagios:nagios-debutant:nouveaux-services.png")

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
    source](creer-sa-premiere-commande@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](creer-sa-premiere-commande@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](creer-sa-premiere-commande@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](creer-sa-premiere-commande@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](creer-sa-premiere-commande@do=media.html "Gestionnaire de médias")
-   [Index](creer-sa-premiere-commande@do=index.html "Index [X]")
-   [Connexion](creer-sa-premiere-commande@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de
    page](creer-sa-premiere-commande.html#dokuwiki__top "Haut de page [T]")

nagios/nagios-debutant/creer-sa-premiere-commande.txt · Dernière
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

![](../../lib/exe/indexer.php@id=nagios%253Anagios-debutant%253Acreer-sa-premiere-commande&1424859573)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
