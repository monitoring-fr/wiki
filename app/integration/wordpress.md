---
layout: page
---

[[[Wordpress4nagios](../nagios/integration/wordpress@do=backlink.html)]]

[wiki monitoring-fr.org](../start.html "[ALT+H]")

![Logo Monitoring](../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../start.html "start") »
[Nagios](../nagios/start.html "nagios:start") » [Nagios
Integration](../nagios/integration/start.html "nagios:integration:start")
» [Wordpress4nagios](wordpress.html "nagios:integration:wordpress")

### Table des matières {.toggle}

-   [Wordpress4nagios](wordpress.html#wordpress4nagios)
    -   [Intégration dans
        Nagios](wordpress.html#integration-dans-nagios)

Wordpress4nagios {#wordpress4nagios .sectionedit1}
================

Ceci est une variante de
[Blosxom4nagios](blosxom4nagios.html "nagios:integration:blosxom4nagios")
que j’ai mise en test. Elle utilise
[Wordpress](http://www.wordpress-fr.net/ "http://www.wordpress-fr.net/")
en lieu et place de blosxom. Et outre que l’installation de Wordpress
est simple et complètement standard, il n’y a pratiquement rien à faire
pour mettre en place cette solution qui peut se révéler puissante à
l’usage. Wordpress bénéficie d’un module XMLRPC qui permet au serveur
Nagios de pouvoir poster de nouvelles alertes avec un simple appel à
[wppost](http://search.cpan.org/~leocharre/WordPress-Post-1.04/bin/wppost "http://search.cpan.org/~leocharre/WordPress-Post-1.04/bin/wppost"),
script Perl qui gère ce genre de choses.

~~~~ {.code}
./wppost -U utilisateur -P passe -p http://adresse.serveur-wordpress.org/wordpress/xmlrpc.php -t "** $NOTIFICATIONTYPE$ Service Alert: $HOSTALIAS$/$SERVICEDESC$ is $SERVICESTATE$ **" -i "***** Nagios *****/" -c expertise-online.net
~~~~

Où -t est le sujet et -i le contenu du message à poster sur le blog.

Il est possible d’utiliser une variante qui permet de transmettre le
contenu d’un document comme message et son titre comme sujet

~~~~ {.code}
./wppost -U utilisateur -P passe -p http://adresse.serveur-wordpress.org/wordpress/xmlrpc.php -t /tmp/Notification.txt -i /tmp/Notification.txt -c expertise-online.net
~~~~

donne un billet dont le titre est Notification.txt et le contenu le
contenu du fichier /tmp/Notification.txt

Ce tutoriel a été réalisé par :

  **Rôle**        **Nom**
  --------------- -------------
  **Rédacteur**   Olivier JAN

Intégration dans Nagios {#integration-dans-nagios .sectionedit3}
-----------------------

Le mieux que j’ai trouvé reste de passer par un fichier intermédiare qui
permet de vraiment formater et rédiger le message de façon beaucoup plus
souple que directment depuis la commande Nagios. La commande Nagios se
contente d’appeler un script avec les arguments (macros) que nous
souhaitons manipuler ensuite.

~~~~ {.code}
define command{
        command_name    notify-service-by-blog
        command_line    $USER1$/submit-wp.sh $NOTIFICATIONTYPE$ $SERVICEDESC$ $HOSTALIAS$ $HOSTADDRESS$ $SERVICESTATE$ $LONGDATETIME$ $SERVICEOUTPUT$ $HOSTNAME$
        }
~~~~

Le contenu de **submit-wp.sh** est le suivant :

~~~~ {.code}
#!/bin/bash

echo -e "***** Nagios *****\n\nNotification Type: $1\n\nService: $2\nHost: $3\nAddress: $4\nState: $5\n\nDate/Time: $6\n\nAdditional Info:\n$7\n\nAcknowled$ > /tmp/wp-submit.txt
/usr/local/nagios/libexec/wppost -U user -P passe -p http://demo.monitoring-fr.org/wp-nagios/xmlrpc.php -t "$1 Service Alert: $3/$2 is $5" -i $
rm /tmp/wp-submit.txt
~~~~

![:!:](../lib/images/smileys/icon_exclaim.gif) Le contenu de ce script
peut largement être amélioré, donner un exemple avec un contenu HTML,
des catégories dynamiques pour gérer séparement les statut PROBLEM et
RECOVERY par exemple. La limite actuelle du module Perl est qu’il ne
gère pas les tags WordPress ce qui serait nettement plus pratique (on
voit les tags comme des catégories dynamiques dans ce cas). À suivre
donc…

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

-   [Canopsis](../canopsis/start.html "canopsis:start")

**[Sécurité](../securite/start.html "securite:start")**

**[Infrastructure](../infra/start.html "infra:start")**

**[Développement](../dev/start.html "dev:start")**

Nagios Integration {#nagios-integration .sectionedit1}
------------------

-   [Blosxom4nagios](blosxom4nagios.html "nagios:integration:blosxom4nagios")
-   [Collectd](../nagios/integration/collectd.html "nagios:integration:collectd")
-   [Incron &
    LoggedFS](../nagios/integration/incron.html "nagios:integration:incron")
-   [Intégration de Prelude-IDS à
    Nagios](../nagios/integration/prelude.html "nagios:integration:prelude")
-   [Intégrer Job Scheduler à
    Nagios](../nagios/integration/jobscheduler.html "nagios:integration:jobscheduler")
-   [Monit](../nagios/integration/monit.html "nagios:integration:monit")
-   [Nagios Plugin for
    Cacti](../nagios/integration/npc.html "nagios:integration:npc")
-   [Nmon](../nagios/integration/nmon.html "nagios:integration:nmon")
-   [OSSEC](../nagios/integration/ossec.html "nagios:integration:ossec")
-   [Octopussy](../nagios/integration/8pussy.html "nagios:integration:8pussy")
-   [Rsyslog](../nagios/integration/rsyslog.html "nagios:integration:rsyslog")
-   [SEC](../nagios/integration/sec.html "nagios:integration:sec")
-   [SmokePing](../nagios/integration/smokeping.html "nagios:integration:smokeping")
-   [Webinject](../nagios/integration/webinject.html "nagios:integration:webinject")
-   [Wordpress4nagios](wordpress.html "nagios:integration:wordpress")

-   [Afficher le texte
    source](../nagios/integration/wordpress@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](../nagios/integration/wordpress@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](../nagios/integration/wordpress@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](../nagios/integration/wordpress@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](../nagios/integration/wordpress@do=media.html "Gestionnaire de médias")
-   [Index](../nagios/integration/wordpress@do=index.html "Index [X]")
-   [Connexion](../nagios/integration/wordpress@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de page](wordpress.html#dokuwiki__top "Haut de page [T]")

nagios/integration/wordpress.txt · Dernière modification: 2013/03/29
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

![](http://wiki.monitoring-fr.org/lib/exe/indexer.php?id=nagios%3Aintegration%3Awordpress&1424859601)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
