---
layout: page
---

[[[Création du premier groupe
d'hôte](creer-son-premier-hostgroup@do=backlink.html)]]

[wiki monitoring-fr.org](../../start.html "[ALT+H]")

![Logo Monitoring](../../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../../start.html "start") »
[Nagios](../start.html "nagios:start") » [NAGIOS - Guide de démarrage
pour débutant](start.html "nagios:nagios-debutant:start") » [Création du
premier groupe
d'hôte](creer-son-premier-hostgroup.html "nagios:nagios-debutant:creer-son-premier-hostgroup")

### Table des matières {.toggle}

-   [Création du premier groupe
    d'hôte](creer-son-premier-hostgroup.html#creation-du-premier-groupe-d-hote)
    -   [Ajout d'un hôte à un
        hostgroup](creer-son-premier-hostgroup.html#ajout-d-un-hote-a-un-hostgroup)

Création du premier groupe d'hôte {#creation-du-premier-groupe-d-hote .sectionedit1}
=================================

Dans la configuration de Nagios, les hostgroups ou servicegroups peuvent
être très utile pour vous simplifier la vie. La fonction première permet
de regrouper des hôtes ou services par affinité. Mais en réfléchissant
un peu pour se simplifier la vie, ils peuvent devenir des “pivots de
configuration” pour permettre de déployer massivement des services
prédéfinis en fonction du type, rôle de l’hôte. Nous verrons ça plus
tard dans le chapitre 3.

Ajout d'un hôte à un hostgroup {#ajout-d-un-hote-a-un-hostgroup .sectionedit2}
------------------------------

En faisant simple, nous allons créer un fichier hostgroups.cfg qui
contiendra le code ci-dessous :

~~~
define hostgroup {
    hostgroup_name     Grenouille
    alias              Groupe d'hotes des Grenouilles
    members            Rainette,localhost,...
}
~~~

**Description des variables**

  **Variable**         **Description**
  -------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  hostgroup\_name      Cette variable est utilisée pour définir le nom court à utiliser pour identifier le groupe d’hôtes.
  alias                Cette variable est utilisée pour définir un nom long ou une description à utiliser pour identifier le groupe d’hôtes. Ceci est fourni pour vous permettre d’identifier plus facilement un groupe d’hôtes en particulier.
  members              C’est une liste de noms courts d’ hôtes qui doivent faire partie de ce groupe. Plusieurs noms d’hôtes peuvent être séparés par des virgules. Cette variable peut être utilisée comme une alternative (ou en complément) à la variable hostgroups dans les définitions d’hôtes .
  hostgroup\_members   Cette variable optionnelle peut être utilisée pour inclure des hôtes depuis des sous-groupes dans ce groupe d’hôtes. Précisez une liste séparée par des virgules de noms courts d’autres groupes d’hôtes à inclure dans ce groupe.

Enregistrez le fichier et redémarrez Nagios et voilà le résultat.

[![](../../assets/media/nagios/nagios-debutant/hostgroups.png@w=700)](../../_detail/nagios/nagios-debutant/hostgroups.png@id=nagios%253Anagios-debutant%253Acreer-son-premier-hostgroup.html "nagios:nagios-debutant:hostgroups.png")

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
    source](creer-son-premier-hostgroup@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](creer-son-premier-hostgroup@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](creer-son-premier-hostgroup@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](creer-son-premier-hostgroup@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](creer-son-premier-hostgroup@do=media.html "Gestionnaire de médias")
-   [Index](creer-son-premier-hostgroup@do=index.html "Index [X]")
-   [Connexion](creer-son-premier-hostgroup@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de
    page](creer-son-premier-hostgroup.html#dokuwiki__top "Haut de page [T]")

nagios/nagios-debutant/creer-son-premier-hostgroup.txt · Dernière
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

![](../../lib/exe/indexer.php@id=nagios%253Anagios-debutant%253Acreer-son-premier-hostgroup&1424859573)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
