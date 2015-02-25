---
layout: page
---

[[[Webinject](webinject@do=backlink.html)]]

[wiki monitoring-fr.org](../../start.html "[ALT+H]")

![Logo Monitoring](../../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../../start.html "start") »
[Nagios](../start.html "nagios:start") » [Nagios
Integration](start.html "nagios:integration:start") »
[Webinject](webinject.html "nagios:integration:webinject")

### Table des matières {.toggle}

-   [Webinject](webinject.html#webinject)
    -   [Installation](webinject.html#installation)
    -   [Configuration de
        Webinject](webinject.html#configuration-de-webinject)
    -   [Configuration de Nagios pour
        Webinject](webinject.html#configuration-de-nagios-pour-webinject)

Webinject {#webinject .sectionedit1}
=========

Webinject est un logiciel libre permettant d’effectuer des tests
automatisés de services ou d’applications web. Il peut être utilisé pour
tester individuellement les composants d’un système ayant une interface
HTTP comme les services JSP, ASP, CGI, PHP, Servlets, HTML Forms,
XML/SOAP Web Services… et pour créer des suites complètes de tests de
type fonctionnels, regressifs au niveau du protocole HTTP. Une suite de
test peut comprendre un ou plusieurs cas de test et permet de les
collecter et de les reporter ensemble en une suite logique. Webinject
délivre ses résultats en temps réel et peut aussi être utilisé pour
mesurer les temps de réponse applicatifs. Il peut bien sûr s’interfacer
avec Nagios.

Ce tutoriel a été réalisé par :

  **Rôle**        **Nom**
  --------------- -------------
  **Rédacteur**   Olivier JAN

Installation {#installation .sectionedit3}
------------

L’installation est aussi simple que de décompacter l’archive source et
de placer le dossier résultant de ce décompactage dans
/usr/local/nagios/libexec. Il convient aussi de s’assurer que les
dépendance perl requises sont bien présentes. les dépendances requises
sont les suivantes :

-   LWP
-   HTTP::Request::Common
-   HTTP::Cookies
-   XML::Simple
-   Time::HiRes
-   Getopt::Long
-   Crypt::SSLeay
-   XML::Parser
-   Error

Configuration de Webinject {#configuration-de-webinject .sectionedit4}
--------------------------

Pour chaque suite de tests à effectuer, il faut avoir deux fichiers de
configuration. Le premier contient les options d’exécution des tests et
le deuxième contient les définitions des tests à effectuer. Ces fichiers
sont au format XML et donc plutôt très lisibles.

~~~~ {.code}
<testcasefile>nagioscases.xml</testcasefile>
<globalhttplog>onfail</globalhttplog>
<timeout>10</timeout>
<globaltimeout>20</globaltimeout>
<reporttype>nagios</reporttype>
<proxy>http://157.150.100.4:80</proxy>
~~~~

Le fichier d’exemple ci-dessus précise que le fichier de configuration
des tests à charger est le fichier nagioscases.xml situé dans le même
répertoire que celui-ci. Est également précisé une limite de temps pour
l’exécution ainsi qu’un serveur proxy pour pouvoir se connecter vers
Internet. L’option reporttype permet de formater la sortie des tests
dans un format compatible Nagios.

Voyons maintenant le contenu du fichier nagioscases.xml

~~~~ {.code}
<testcases repeat="1">

<case
    id="1"
    description1="Présence du site expertise"
    description2="Vérification de centre national de conseil dans la page"
    method="get"
    url="http://expertise.gfi.fr/"
    verifypositive="centre national de conseil"
/>

<case
    id="2"
    description1="Présence de la page du pôle supervision"
    description2="Vérification du mot supervision dans la page"
    method="get"
    url="http://expertise.gfi.fr/index.php?id=158"
    verifypositive="supervision"
/>

</testcases>
~~~~

Ci-dessus deux règles simples permettant de vérifier la disponibilité
d’une page web et de vérifier la présence de chaînes de caractères dans
cette page.

[webinject-drupal.zip](../../assets/media/webinject-drupal.zip "webinject-drupal.zip")
sont des fichiers de configuraton Webinject prêts à l’emploi pour tester
Drupal.

Configuration de Nagios pour Webinject {#configuration-de-nagios-pour-webinject .sectionedit5}
--------------------------------------

Il faut d’abord définir la commande qui permet d’appeler webinject

~~~~ {.code}
define command {
    command_name    check_webinject
    command_line    /usr/bin/perl $USER1$/webinject/webinject.pl -c $ARG1$ $ARG2$
}
~~~~

Webinject n’étant pas compatible pour l’instant avec le mode ePN de
Nagios, il faut précéder l’appel par le chemin complet de Perl de façon
à désactiver cette fonction.

Il est aussi possible d’éditer
/usr/local/nagios/libexec/webinject/webinject.pl et d’ajouter quelque
part dans les dix premières lignes du script

~~~~ {.code}
# nagios: -epn
~~~~

Ensuite, il suffit de définir un ou plusieurs services

~~~~ {.code}
define service{
        use                             actif-generic
        hostgroup_name                  LINUX
        service_description             HTTP_SCENARIO
        check_command                   check_webinject!config-nagios.xml!nagioscases.xml
        }
~~~~

Ce service utilise le gabarit actif-generic, s’applique au groupe
d’hôtes LINUX. Il s’appelle HTTP\_SCENARIO et appelle la commande
check\_webinject définie plus haut en lui passant en paramètres les deux
fichiers de configuration nécessaire à l’exécution.

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
    source](webinject@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](webinject@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](webinject@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](webinject@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](webinject@do=media.html "Gestionnaire de médias")
-   [Index](webinject@do=index.html "Index [X]")
-   [Connexion](webinject@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de page](webinject.html#dokuwiki__top "Haut de page [T]")

nagios/integration/webinject.txt · Dernière modification: 2013/03/29
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

![](../../lib/exe/indexer.php@id=nagios%253Aintegration%253Awebinject&1424859578)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
