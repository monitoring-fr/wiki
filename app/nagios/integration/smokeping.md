---
layout: page
---

[[[SmokePing](smokeping@do=backlink.html)]]

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
[SmokePing](smokeping.html "nagios:integration:smokeping")

### Table des matières {.toggle}

-   [SmokePing](smokeping.html#smokeping)
    -   [Pré-requis](smokeping.html#pre-requis)
    -   [Installation](smokeping.html#installation)
    -   [Configuration](smokeping.html#configuration)
    -   [Intégration avec
        Nagios](smokeping.html#integration-avec-nagios)
        -   [Intégration de la
            console](smokeping.html#integration-de-la-console)
        -   [Intégration des
            alertes](smokeping.html#integration-des-alertes)
        -   [Intégration de
            SmokeTrace](smokeping.html#integration-de-smoketrace)

SmokePing {#smokeping .sectionedit1}
=========

En cours de rédaction

SmokePing est un logiciel qui vous permet de conserver un historique de
la latence de votre réseau. Il est conçu par Tobi Oetiker, le créateur
de MRTG et RRDtool. SmokePing est prévu pour calculer le RTT (Real Trip
Time) entre les différents composants de votre réseau et peut le faire
aussi bien avec un basique ping ICMP qu’avec des pings plus
spécifiquement adaptés aux protocoles HTTP, SMTP, LDAP, DNS…

Dans le cadre d’une installation en complément de Nagios, il peut
envoyer les événements de type perte de paquets, latence trop élevée ou
rupture réseau vers la console de celui-ci. C’est cette installation et
intégration à Nagios que nous allons détailler maintenant.

Ce tutoriel a été réalisé par :

  **Rôle**        **Nom**
  --------------- ------------------
  **Rédacteur**   Romuald FRONTEAU

Pré-requis {#pre-requis .sectionedit3}
----------

Smokeping a besoin de dépendances pour fonctionner, il faut installer
les paquets suivant :

~~~~ {.code}
sudo aptitude install echoping curl fping rrdtool libwww-perl openssh-client libio-socket-inet6-perl libnet-telnet-perl libnet-dns-perl libnet-ldap-perl libauthen-radius-perl libauthen-simple-radius-perl libio-socket-ssl-perl librrds-perl librrdp-perl libapache2-mod-speedycgi
~~~~

Installation {#installation .sectionedit4}
------------

SmokePing étant un programme Perl, l’installation se résume à la
vérification/installation des modules Perl requis et à la copie des
différents fichiers composant le logiciel. Comme à l’accoutumée, cette
installation a lieu sur la dernière version en date de Ubuntu Server LTS
(8.0.4 au moment de la rédaction))

-   **Récupération des sources**

~~~~ {.code}
wget http://oss.oetiker.ch/smokeping/pub/smokeping-2.4.2.tar.gz

tar -xvzf smokeping-2.4.2.tar.gz
~~~~

-   **Création des répertoires d’accueil pour SmokePing**

~~~~ {.code}
sudo mkdir -p /usr/local/smokeping/share
sudo mkdir -p /usr/local/smokeping/etc
sudo mkdir -p /usr/local/smokeping/lib
sudo mkdir -p /usr/local/smokeping/share/cache
sudo mkdir -p /usr/local/smokeping/var/rrd
sudo mkdir -p /usr/local/smokeping/sbin
sudo mkdir -p /usr/local/smokeping/bin
~~~~

-   **Copie des fichiers smokeping dans le layout**

~~~~ {.code}
sudo cp bin/smokeping.dist /usr/local/smokeping/bin/smokeping
sudo cp htdocs/smokeping.cgi.dist /usr/local/smokeping/share/smokeping.cgi
sudo cp -R htdocs/cropper/ /usr/local/smokeping/share/
sudo cp etc/config.dist /usr/local/smokeping/etc/config
sudo cp etc/smokemail.dist /usr/local/smokeping/etc/smokemail
sudo cp etc/smokeping_secrets.dist /usr/local/smokeping/etc/smokeping_secrets
sudo cp etc/tmail.dist /usr/local/smokeping/etc/tmail
sudo cp etc/basepage.html.dist /usr/local/smokeping/var/www/basepage.html
sudo cp -R lib/ /usr/local/smokeping/lib/
~~~~

-   **Attribution des droits**

~~~~ {.code}
sudo chmod 640 /usr/local/smokeping/etc/*
sudo chmod 644 /usr/local/smokeping/etc/config
sudo chmod -R 775 /usr/local/smokeping/share/
sudo chown www-data:www-data /usr/local/smokeping/share/
~~~~

-   **Création du fichier apache smokeping.conf**

~~~~ {.code}
LoadModule speedycgi_module  modules/mod_speedycgi.so
AddHandler cgi-script .cgi


Alias /smokeping "/usr/local/smokeping/share"

<Directory "/usr/local/smokeping/share">
   Allow from all
   AddHandler cgi-script cgi
   Options ExecCGI
</Directory>

<IfModule dir_module>
    DirectoryIndex index.html smokeping.cgi
</IfModule>
~~~~

Configuration {#configuration .sectionedit5}
-------------

Le fichier de configuration de smokeping est découpé en sections
suivantes :

 Générale (General)
:   Section contenant les informations de configuration générale comme
    les chemins des fichiers, la personne responsable de l’installation…
 Bases de données (Database)
:   Cette section indique les spécifications des bases de données de
    type RRDtool à utiliser.
 Présentation (Presentation)
:   Cette section permet de gérer la présentation des différents
    graphiques dans la console web.
 Sondes (Probes)
:   Cette section indique le type de sondes (ping, http, dns, smtp…) à
    utiliser pour un type de cible.
 Cibles (Target)
:   Cette section permet de préciser quels sont les hôtes, composants
    réseaux à tester. Elle contient des informations d’adresses
    Internet, de FQDN et autres informations nécessaires à caractériser
    un composant.
 Esclaves (Slaves)
:   Cette section optionnelle est utilisée dans le cadre d’une
    installation distribuée contenant un serveur maître et au minimum un
    serveur esclave ^[1)](smokeping.html#fn__1)^

Intégration avec Nagios {#integration-avec-nagios .sectionedit6}
-----------------------

L’intégration de SmokePing avec Nagios est aisée et repose sur :

1.  Le fait que la console de SmokePing est basée sur Apache/HTML comme
    celle de Nagios
2.  Le fait que SmokePing est capable d’exécuter des commandes/scripts
    en guise d’alertes

### Intégration de la console {#integration-de-la-console .sectionedit7}

La console smokeping peut être intégrée en le rajoutant dans la sidebar
de nagios.

Editez /usr/local/nagios/share/side.php

et ajouter ce code :

~~~~ {.code}
<li><a href="/url/de/smokeping" target="<?php echo $link_target;?>">SmokePing</a></li>
~~~~

Et voilà le tour est joué, vous avez un menu supplémentaire qui vous
permettra d’accéder à Smokeping tout en restant dans l’interface Nagios

[![](../../assets/media/integration/smokeping_nagios_interface.png@w=700)](../../_detail/integration/smokeping_nagios_interface.png@id=nagios%253Aintegration%253Asmokeping.html "integration:smokeping_nagios_interface.png")

### Intégration des alertes {#integration-des-alertes .sectionedit8}

### Intégration de SmokeTrace {#integration-de-smoketrace .sectionedit9}

Pour intégrer SmokeTrace à smokeping, il faut récupérer ce qu’il faut
dans les sources (version \>= 2.4).

-   **Autorisation du Traceroute aux utilisateurs**

Tout d’abord, nous allons autoriser la commande traceroute aux
utilisateurs.

~~~~ {.code}
chown root:root /usr/bin/traceroute
chmod u+s /usr/bin/traceroute
~~~~

-   **Vérification l’exécution des cgi dans le répertoire web de
    smokeping**

Normalement, si vous avez bien paramétré votre smokeping, vous devez
avoir un fichier smokeping\_apache2.conf comme ceci :

~~~~ {.code}
LoadModule speedycgi_module  modules/mod_speedycgi.so
AddHandler cgi-script .cgi


Alias /smokeping "/usr/local/smokeping/share"

<Directory "/usr/local/smokeping/share">
   Allow from all
   AddHandler cgi-script cgi
   Options ExecCGI
</Directory>

<IfModule dir_module>
    DirectoryIndex index.html smokeping.cgi
</IfModule>
~~~~

-   **Copie des fichiers pour SmokeTrace**

Il va falloir copier plusieurs contenu à partir de l’archive détarré.

~~~~ {.code}
mkdir /usr/local/smokeping/share/script
cp htdocs/script/Tr.js /usr/local/smokeping/share/script
~~~~

Vérifier que le fichier tr.html point sur le bon chemin pour le Tr.js.

~~~~ {.code}
cp htdocs/tr.html /usr/local/smokeping/share/
~~~~

Copier le répertoire ressource dans le même répertoire que tr.html

~~~~ {.code}
cp -r htdocs/ressource usr/local/smokeping/share/
~~~~

Copier le tr.cgi.dist au même endroit que le tr.html

~~~~ {.code}
cp htdocs/tr.cgi.dist usr/local/smokeping/share/tr.cgi
~~~~

Dans le tr.cgi, modifier les ligne suivante :

~~~~ {.code}
#!/usr/bin/speedy -w

use lib qw(/usr/local/smokeping/lib/);
~~~~

Pour finir, editez le fichier de configuration *config* et ajoutez le
code ci-dessous au niveau de la section **\* Target**\*

~~~~ {.code}
 menuextra = <a target='_blank' href='tr.html{HOST}' class='{CLASS}' \
    onclick="window.open(this.href,this.target, \
    'width=800,height=500,toolbar=no,location=no,status=no,scrollbars=no'); \
    return false;">*</a>
~~~~

Ceci fera apparaitre une \* derrière chaque nom d’hôte.

Voici le résultat :

[![](../../assets/media/integration/smoketrace.png@w=700)](../../_detail/integration/smoketrace.png@id=nagios%253Aintegration%253Asmokeping.html "integration:smoketrace.png")

^[1)](smokeping.html#fnt__1)^ appelé collecteur ou satellite dans la
terminologie Nagios

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
    source](smokeping@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](smokeping@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](smokeping@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](smokeping@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](smokeping@do=media.html "Gestionnaire de médias")
-   [Index](smokeping@do=index.html "Index [X]")
-   [Connexion](smokeping@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de page](smokeping.html#dokuwiki__top "Haut de page [T]")

nagios/integration/smokeping.txt · Dernière modification: 2013/03/29
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

![](../../lib/exe/indexer.php@id=nagios%253Aintegration%253Asmokeping&1424859578)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
