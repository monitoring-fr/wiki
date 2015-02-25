---
layout: page
---

[[[Notification par sms dans
Zabbix](zabbix-sms-notification@do=backlink.html)]]

[wiki monitoring-fr.org](../start.html "[ALT+H]")

![Logo Monitoring](../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../start.html "start") »
[Zabbix](start.html "zabbix:start") » [Notification par sms dans
Zabbix](zabbix-sms-notification.html "zabbix:zabbix-sms-notification")

### Table des matières {.toggle}

-   [Notification par sms dans
    Zabbix](zabbix-sms-notification.html#notification-par-sms-dans-zabbix)
-   [installation et configuration de
    gammu](zabbix-sms-notification.html#installation-et-configuration-de-gammu)
-   [Configurer zabbix -sms avec
    GAMMU](zabbix-sms-notification.html#configurer-zabbix-sms-avec-gammu)

Notification par sms dans Zabbix {#notification-par-sms-dans-zabbix .sectionedit1}
================================

Dans ce tutoriel, nous allons suivre les différentes étapes nécessaires
à l’activation de la notification par sms. Ainsi, il sera alors possible
de recevoir par simple sms le moindre changement de statut d’un item,
grâce à la génération d’événements des triggers. Ici nous allons
utiliser comme modem gsm une clé USB Hawaii et l’utilitaire gammu pour
l’interfaçage du téléphone avec votre ordinateur.

  **Rôle**        **Nom**
  --------------- -------------
  **Rédacteur**   Wilson GAMO

installation et configuration de gammu {#installation-et-configuration-de-gammu .sectionedit3}
======================================

sous ubuntu apt-get install gammu ensuite on édite le fichier
/etc/gammurc ou le fichier .gammurc(si le fichier n’existe pas on le
crée)

~~~~ {.code}
[gammu]
port = /dev/ttyUSB0
model =
connection = at19200
synchronizetime = yes
logfile =
logformat = nothing
use_locking =
gammuloc =
~~~~

A ce niveau vous pouvez deja envoyer des sms depuis votre ordinateur en
utilisant la commande suivante

~~~~ {.code}
gammu --identify
~~~~

~~~~ {.code}
echo "Tapez ici votre SMS" | gammu --sendsms TEXT 06XXXXXX
~~~~

Pour plus d’information sur gammu
[http://doc.ubuntu-fr.org/gammu](http://doc.ubuntu-fr.org/gammu "http://doc.ubuntu-fr.org/gammu")

Configurer zabbix -sms avec GAMMU {#configurer-zabbix-sms-avec-gammu .sectionedit4}
=================================

Créer un script (rendez le exécutable) sur le serveur zabbix dans le
AlertScriptsPath(=/etc/zabbix/alert.d/ sur ubuntu)

~~~~ {.code}
#!/bin/sh
HOME=/etc
PATH=/bin:/sbin:/usr/bin:/usr/sbin
LOGFILE="/var/log/zabbix-server/zabbix-sms.log"
echo "Recipient='$1' Message='$3'" >> ${LOGFILE}
MOBILE_NUMBER=`echo "$1" | sed s#\s##`
# Log it
echo "echo $3 | /usr/bin/sudo /usr/bin/gammu --sendsms TEXT ${MOBILE_NUMBER}" >>${LOGFILE}
# Send it
echo "$3" | /usr/bin/sudo /usr/bin/gammu --sendsms TEXT "${MOBILE_NUMBER}" 1>>${LOGFILE} 2>&1
# EOF
~~~~

ajouter

~~~~ {.code}
zabbix ALL = NOPASSWD:/usr/bin/gammu
~~~~

dans sudoers. Si vos action et notification sont bien faites zabbix
pourra envoyez des sms !!!

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
    source](zabbix-sms-notification@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](zabbix-sms-notification@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](zabbix-sms-notification@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](zabbix-sms-notification@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](zabbix-sms-notification@do=media.html "Gestionnaire de médias")
-   [Index](zabbix-sms-notification@do=index.html "Index [X]")
-   [Connexion](zabbix-sms-notification@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de
    page](zabbix-sms-notification.html#dokuwiki__top "Haut de page [T]")

zabbix/zabbix-sms-notification.txt · Dernière modification: 2013/03/29
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

![](../lib/exe/indexer.php@id=zabbix%253Azabbix-sms-notification&1424859529)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
