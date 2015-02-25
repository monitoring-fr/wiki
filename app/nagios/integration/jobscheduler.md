---
layout: page
---

[[[Intégrer Job Scheduler à Nagios](jobscheduler@do=backlink.html)]]

[wiki monitoring-fr.org](../../start.html "[ALT+H]")

![Logo Monitoring](../../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../../start.html "start") »
[Nagios](../start.html "nagios:start") » [Nagios
Integration](start.html "nagios:integration:start") » [Intégrer Job
Scheduler à Nagios](jobscheduler.html "nagios:integration:jobscheduler")

### Table des matières {.toggle}

-   [Intégrer Job Scheduler à
    Nagios](jobscheduler.html#integrer-job-scheduler-a-nagios)
    -   [Pré-requis](jobscheduler.html#pre-requis)
    -   [Configuration](jobscheduler.html#configuration)
        -   [Configuration de Job
            Scheduler](jobscheduler.html#configuration-de-job-scheduler)
        -   [Configuration de
            Nagios](jobscheduler.html#configuration-de-nagios)

Intégrer Job Scheduler à Nagios {#integrer-job-scheduler-a-nagios .sectionedit1}
===============================

Ce tutoriel a été réalisé par :

  **Rôle**        **Nom**
  --------------- ------------------
  **Rédacteur**   Romuald FRONTEAU

Comme j’aime bien le schéma explicatif de l’implémentation de Job
Scheduler et Nagios, le voilà. Il est bien sûr pris sur le site de Job
Scheduler.

[![jobscheduler-nagios.jpg](../../assets/media/nagios/jobscheduler-nagios.jpg@w=800 "jobscheduler-nagios.jpg")](../../_detail/nagios/jobscheduler-nagios.jpg@id=nagios%253Aintegration%253Ajobscheduler.html "nagios:jobscheduler-nagios.jpg")

Reste à tester la chose comme expliqué sur le site de Job Scheduler.

Pré-requis {#pre-requis .sectionedit3}
----------

Job Scheduler doit être installé, pour cela vous pouvez vous rendre à la
page ci-dessous :

**[Installation de Job
Scheduler](../../infra/jobscheduler.html "infra:jobscheduler")**

La liste des pré-requis est assez courte mais au combien importante.
Tout d’abord il vous faut impérativement trois fichiers:

-   [sos.stack.jar](../../lib/exe/fetch.php@hash=12e3b6&media=http%253A%252F%252Fwww.sos-berlin.com%252Fdownload%252Fscheduler%252Flib%252Fsos.stacks.jar "http://www.sos-berlin.com/download/scheduler/lib/sos.stacks.jar")
    qui est en fait une archive contenant la définition de tâche que
    Nagios peut superviser.
-   [check\_scheduler.pl](../../lib/exe/fetch.php@hash=aa0e58&media=http%253A%252F%252Fwww.sos-berlin.com%252Fdownload%252Fscheduler%252Fsources%252Fsos%252Fstacks%252Fnagios%252Fcheck_scheduler.pl.html "http://www.sos-berlin.com/download/scheduler/sources/sos/stacks/nagios/check_scheduler.pl.html")
    est le plugin Nagios vous permettant de superviser job scheduler
-   [check\_monitor.xml](../../lib/exe/fetch.php@hash=49c439&media=http%253A%252F%252Fwww.sos-berlin.com%252Fdownload%252Fscheduler%252Fconfig%252Fscheduler_monitor.xml "http://www.sos-berlin.com/download/scheduler/config/scheduler_monitor.xml")
    est la définition d’une tâche que nous utiliserons pour notre
    premier cas.

Il est important de noter que check\_scheduler.pl requiert Perl dans sa
version 5.8 minimum, ainsi que des paquets Perl comme Net::HTTP et
XML::XPath (disponible sur
[www.cpan.org](../../lib/exe/fetch.php@hash=97f0d7&media=http%253A%252F%252Fwww.cpan.org.html "http://www.cpan.org")
)

Configuration {#configuration .sectionedit4}
-------------

La configuration de cette supervision se déroule en deux temps bien
distinct. Dans un premier temps nous allons configurer Job Scheduler
pour qu’il puisse être superviser, puis votre serveur Nagios pour qu’il
supervise ce que demandé.

### Configuration de Job Scheduler {#configuration-de-job-scheduler .sectionedit5}

Dans un premier temps, il s’agit de télécharger l’archive contenant les
différents job utilisé pour Nagios, ainsi que le
[check\_monitor.xml](../../lib/exe/fetch.php@hash=49c439&media=http%253A%252F%252Fwww.sos-berlin.com%252Fdownload%252Fscheduler%252Fconfig%252Fscheduler_monitor.xml "http://www.sos-berlin.com/download/scheduler/config/scheduler_monitor.xml")

Une fois ces fichiers en votre possession veuillez lire votre fichier
factory.ini:

~~~
LCPXP-407:~/scheduler/config$ sudo vi factory.ini
~~~

Rechercher la chaine CLASS\_PATH:

~~~
[java]
class_path              = /usr/local/scheduler/lib/*.jar

;   
~~~

Il ne vous reste plus qu’à copier le fichier sos.stack.jar dans le
répertoire signifié par la variable CLASS\_PATH.

La deuxième chose à faire est de copier le fichier check\_monitor.xml.
Veuillez placer le fichier que vous venez de télécharger dans
/usr/local/scheduler/config . Une fois ces étapes effectuer, relancer
Job Scheduler.

### Configuration de Nagios {#configuration-de-nagios .sectionedit6}

Rappelons que vous devez avoir en votre possession le fichier
check\_schedule.pl et que les modules perl NET::HTTP et XML::XPATH
doivent être installé sur votre machine client (serveur Job Schedule).

Le principe de configuration reste aussi simple que pour Job Schedule, à
ceci près qu’une petite modification du plugin est peut être à
effectuer. Une fois copier dans votre répertoire /libexec de votre
serveur de supervision Nagios, procédez à une petite lecture du fichier:

~~~
nagios@Nagios:/usr/local/nagios/libexec$ vi check_scheduler.pl 
~~~

A la première ligne, en entête d’exécution du fichier perl, vous pouvez
lire:

~~~
#! /opt/perl-5.8.6/bin/perl -w
~~~

Pour vérifier que ce chemin est bien le bon, veuillez faire un petit
“which perl” dans votre invite de commande. le chemin qui vous sera
révélé sera celui à mettre à la place.

~~~
#! /usr/bin/perl
~~~

Maintenant, il ne nous reste plus qu’à ajouter notre hôte Job Schedule
dans Nagios et de définir le service de supervision associé.

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

Nagios Integration {#nagios-integration .sectionedit1}
------------------

-   [Blosxom4nagios](../../integration/blosxom4nagios.html "nagios:integration:blosxom4nagios")
-   [Collectd](collectd.html "nagios:integration:collectd")
-   [Incron & LoggedFS](incron.html "nagios:integration:incron")
-   [Intégration de Prelude-IDS à
    Nagios](prelude.html "nagios:integration:prelude")
-   [Intégrer Job Scheduler à
    Nagios](jobscheduler.html "nagios:integration:jobscheduler")
-   [Monit](monit.html "nagios:integration:monit")
-   [Nagios Plugin for Cacti](npc.html "nagios:integration:npc")
-   [Nmon](nmon.html "nagios:integration:nmon")
-   [OSSEC](ossec.html "nagios:integration:ossec")
-   [Octopussy](8pussy.html "nagios:integration:8pussy")
-   [Rsyslog](rsyslog.html "nagios:integration:rsyslog")
-   [SEC](sec.html "nagios:integration:sec")
-   [SmokePing](smokeping.html "nagios:integration:smokeping")
-   [Webinject](webinject.html "nagios:integration:webinject")
-   [Wordpress4nagios](../../integration/wordpress.html "nagios:integration:wordpress")

-   [Afficher le texte
    source](jobscheduler@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](jobscheduler@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](jobscheduler@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](jobscheduler@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](jobscheduler@do=media.html "Gestionnaire de médias")
-   [Index](jobscheduler@do=index.html "Index [X]")
-   [Connexion](jobscheduler@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de page](jobscheduler.html#dokuwiki__top "Haut de page [T]")

nagios/integration/jobscheduler.txt · Dernière modification: 2013/03/29
09:39 (modification externe)

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

![](../../lib/exe/indexer.php@id=nagios%253Aintegration%253Ajobscheduler&1424859578)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
