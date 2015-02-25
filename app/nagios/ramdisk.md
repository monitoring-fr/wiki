---
layout: page
---

[[[Données Nagios dans un ramdisk](ramdisk@do=backlink.html)]]

[wiki monitoring-fr.org](../start.html "[ALT+H]")

![Logo Monitoring](../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../start.html "start") »
[Nagios](start.html "nagios:start") » [Données Nagios dans un
ramdisk](ramdisk.html "nagios:ramdisk")

### Table des matières {.toggle}

-   [Données Nagios dans un
    ramdisk](ramdisk.html#donnees-nagios-dans-un-ramdisk)
    -   [Quels fichiers](ramdisk.html#quels-fichiers)
    -   [Création ramdisk](ramdisk.html#creation-ramdisk)

Données Nagios dans un ramdisk {#donnees-nagios-dans-un-ramdisk .sectionedit1}
==============================

Comme le suggère la documentation officielle de Nagios, il est possible
d’améliorer les performances de Nagios et notamment son interface Web
par le biais de l’utilisation d’un ram disk pour stocker différentes
informations. Les infos de création du ramdisk proviennent de ce
[mini-howto](http://www.vanemery.com/Linux/Ramdisk/ramdisk.html "http://www.vanemery.com/Linux/Ramdisk/ramdisk.html").

Quels fichiers {#quels-fichiers .sectionedit2}
--------------

Le fichier le plus évident à placer en ram disk est **status.dat**. Tout
simplement parce que ce fichier est temporaire par nature et utilisé par
les cgi de l’interface. L’autres est le **dossier rw** et le fichier de
pipe qu’il contient **nagios.cmd**. Il ne faut pas oublier le fichier
temp\_file duquel découle le fichier de status.

Les autres candidats sont :

-   objects.cache
-   objects.precache
-   retention.dat
-   check\_result\_path

Le répertoire check\_result\_path est important également : il contient
les fichiers de résultats de Nagios, ils sont tepoiraires mais peuvent
représenter beaucoup d’I/O disques. Les tests sur objects.precache ne
montre aucun gain sur le calcul de configuration appelé par

~~~~ {.code}
/usr/local/nagios/bin/nagios -vps /usr/local/nagios/etc/nagios.cfg
~~~~

Dans le cadre d’une utilisation des données de performance par un
fichier temporaire, il est également intéressant de placer ce fichier
^[1)](ramdisk.html#fn__1)^ dans le ramdisk. C’est un fichier temporaire
par excellence

Création ramdisk {#creation-ramdisk .sectionedit3}
----------------

~~~~ {.code}
sudo mkdir /tmp/ramdisk0
sudo mkfs.ext3 /dev/ram0
sudo mount /dev/ram0 /tmp/ramdisk0
sudo chmod ugoa+rwx /tmp/ramdisk0
~~~~

Ces commandes peuvent être intégrées à /etc/rc.local pour une création
automatique au démarrage.

Pour créer un ramdisk d’une taille de 256 Mo, il faut ajouter le
paramètre ramdisk\_size=256000 à /boot/grub/menu.lst comme suit :

~~~~ {.code}
kernel          /vmlinuz-2.6.15-51-server root=/dev/mapper/Ubuntu-root ro quiet splash ramdisk_size=256000
~~~~

Une fois formatté, il y aura 243 Mo utilisable.

Une autre solution consiste à utiliser l’espace monté en mémoire
/dev/shm qui est présent sur toutes les distributions.

^[1)](ramdisk.html#fnt__1)^ service-perfdata sur mon install

SOMMAIRE {#sommaire .sectionedit1}
--------

**[Accueil](../start.html "start")**

**[Supervision](../supervision/start.html "supervision:start")**

-   [Nagios](start.html "nagios:start")
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

-   [Canopsis](../canopsis/start.html "canopsis:start")

**[Sécurité](../securite/start.html "securite:start")**

**[Infrastructure](../infra/start.html "infra:start")**

**[Développement](../dev/start.html "dev:start")**

Nagios {#nagios .sectionedit1}
------

-   [Arborescence des
    fichiers](installation-layout.html "nagios:installation-layout")
-   [Commandes de remontée de
    contrôle](ocsp-ochp.html "nagios:ocsp-ochp")
-   [Données Nagios dans un ramdisk](ramdisk.html "nagios:ramdisk")
-   [Event Handlers](event_handlers.html "nagios:event_handlers")
-   [Gabarits d'objets de
    configuration](templates.html "nagios:templates")
-   [Installation Nagios 2 & 3 sur Ubuntu 6.0.6, 8.0.4 et 10.0.4
    LTS](ubuntu-install.html "nagios:ubuntu-install")
-   [Installation Nagios 3 sur Debian Squeeze
    6.0.3](debian-install.html "nagios:debian-install")
-   [Installation de Nagios 3.x sur CentOS
    5.3](nagios-centos-install.html "nagios:nagios-centos-install")
-   [Introduction aux objets de
    configuration](configobjects.html "nagios:configobjects")
-   [Introduction à
    Nagios](nagios-introduction.html "nagios:nagios-introduction")
-   [Liens Nagios](links.html "nagios:links")
-   [Mise en place complète de Nagios sur RHEL
    5.4](mise-en-place-complete-nagios-sur-rhel-5.4/start.html "nagios:mise-en-place-complete-nagios-sur-rhel-5.4:start")
-   [NAGIOS - Guide de démarrage pour
    débutant](nagios-debutant/start.html "nagios:nagios-debutant:start")
-   [Nagios Addons](addons/start.html "nagios:addons:start")
-   [Nagios
    Integration](integration/start.html "nagios:integration:start")
-   [Nagios Plugins](plugins/start.html "nagios:plugins:start")
-   [Nagios et les
    notifications](notifications.html "nagios:notifications")
-   [Outils de supervision d'un hôte
    Windows](windows-client.html "nagios:windows-client")
-   [Référence des objets de
    configuration](objects-reference.html "nagios:objects-reference")
-   [Superviser un hôte Windows avec
    NSClient++](nagios-nsclient-host.html "nagios:nagios-nsclient-host")
-   [Supervision Windows en mode
    passif](supervision-windows-passif.html "nagios:supervision-windows-passif")
-   [Supervision vmware esx](vmware_esx.html "nagios:vmware_esx")
-   [check-list de diagnostic](debug.html "nagios:debug")

-   [Afficher le texte
    source](ramdisk@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](ramdisk@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](ramdisk@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](ramdisk@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](ramdisk@do=media.html "Gestionnaire de médias")
-   [Index](ramdisk@do=index.html "Index [X]")
-   [Connexion](ramdisk@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de page](ramdisk.html#dokuwiki__top "Haut de page [T]")

nagios/ramdisk.txt · Dernière modification: 2013/03/29 09:39
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

![](../lib/exe/indexer.php@id=nagios%253Aramdisk&1424859523)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
