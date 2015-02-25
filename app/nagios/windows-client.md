---
layout: page
---

[[[Outils de supervision d'un hôte
Windows](windows-client@do=backlink.html)]]

[wiki monitoring-fr.org](../start.html "[ALT+H]")

![Logo Monitoring](../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../start.html "start") »
[Nagios](start.html "nagios:start") » [Outils de supervision d'un hôte
Windows](windows-client.html "nagios:windows-client")

### Table des matières {.toggle}

-   [Outils de supervision d'un hôte
    Windows](windows-client.html#outils-de-supervision-d-un-hote-windows)
    -   [Supervision passive](windows-client.html#supervision-passive)
        -   [Méthodes possibles
            EventLog](windows-client.html#methodes-possibles-eventlog)
        -   [Méthodes possibles Logs
            génériques](windows-client.html#methodes-possibles-logs-generiques)
        -   [Méthodes possibles Traps
            SNMP](windows-client.html#methodes-possibles-traps-snmp)
        -   [Clients possibles](windows-client.html#clients-possibles)
        -   [Contexte Supervision
            passive](windows-client.html#contexte-supervision-passive)
    -   [Supervision active](windows-client.html#supervision-active)
        -   [NSClient](windows-client.html#nsclient)
        -   [NC\_NET](windows-client.html#nc_net)
        -   [NRPE\_NT](windows-client.html#nrpe_nt)
        -   [NSClient++](windows-client.html#nsclient1)
        -   [WMI](windows-client.html#wmi)

Outils de supervision d'un hôte Windows {#outils-de-supervision-d-un-hote-windows .sectionedit1}
=======================================

Pour Windows, nous avons à la fois à effectuer une supervision active
(performance) mais aussi une supervision passive (EventLog et log).
Nagios 3 devrait changer la façon dont on supervise en passif un hôte.
Aujourd’hui, les remontées d’infos sont assurées par le client NSCA qui
écrit dans le fichier external commands du serveur. Demain, nous
devrions pouvoir alimenter directment une base de données dont se
servira le serveur pour déterminer l’état d’un service. Cette nouvelle
façon de faire s’appuierait sur le module event broker de Nagios et sur
NDOUtils qui permet de gérer l’ensemble des informations
(configurations, états…) d’un ou plusieurs serveurs Nagios.

Supervision passive {#supervision-passive .sectionedit2}
-------------------

Habituellement, la supervision passive est faite par l’envoi des
évènements issus de fichiers logs en temps réel vers un serveur central
sur lequel seront appliquées les règles de détection, filtrage et
corrélation des évènements susceptible d’intéresser la supervision.

Néanmoins, y compris sous Windows, il est possible de filtrer à la
source, c’est à dire sur l’hôte supervisé de façon à réduire le trafic
réseau vers le serveur.

### Méthodes possibles EventLog {#methodes-possibles-eventlog .sectionedit3}

1.  Traduire les évènements EventLog en [messages standard BSD
    syslog](http://www.ietf.org/rfc/rfc3164.txt "http://www.ietf.org/rfc/rfc3164.txt")
    et envoyer ces messages à un serveur centralisé qui effectuera
    filtrage,corrélation et envoi des messages à Nagios.
2.  Traduire les évènements Eventlog en messages syslog mais ne remonter
    vers le serveur central ques les évènements jugés intéressants. Le
    filtrage et la corrélation de ces évènements est alors assuré sur
    l’hôtes supervisé.

Pour ces deux méthodes, les clients possibles sont Nagios EventLog,
SNARE et NT\_Syslog.

### Méthodes possibles Logs génériques {#methodes-possibles-logs-generiques .sectionedit4}

Sous Windows, la seule solution possible pour superviser de façon
passive les journaux de logs génériques est
[SEC](http://kodu.neti.ee/~risto/sec/ "http://kodu.neti.ee/~risto/sec/")
(Simple Event Correlator).

### Méthodes possibles Traps SNMP {#methodes-possibles-traps-snmp .sectionedit5}

Une possibilité assez mal documentée de Windows Server (au moins depuis
2003) permet de convertir les évènements des journaux en traps SNMP. Il
suffit d’ouvrir une commande DOS et de taper “evntwin” pour ouvrir un
programme qui permet de définir quel évènement Windows provoqueront
l’émission d’une trap SNMP. Voilà qui ouvre des possibilités assez
intéressante pour la supervision d’hôtes Windows.

### Clients possibles {#clients-possibles .sectionedit6}

#### Nagios EventLog

[Nagios
EventLog](http://www.steveshipway.org/software/f_nagios.html "http://www.steveshipway.org/software/f_nagios.html")
est un client Nagios passif pour Windows. Il regroupe à la fois les
fonctions de NT\_Syslog et de send\_nsca. Il est capable de superviser
tout type de fichiers eventlog et d’envoyer des messages à Nagios sur
les évènements sélectionnés. Il s’appuie pour cela sur des règles de
filtrage stockées dans la base des registres. Ces règles permettent de
définir le journal supervisé (ex : System) , la source dans ce journal
(ex : Information), l’ Eventlog ID (ex : 7036) ou un pattern prédéfini
sous forme de regex (ex : .\*\\Horloge.\*\\exécution).

Nagios EventLog est un programme bien suivi par son auteur et qui
apparaît stable dans sa version testée (1.8.3). Il fonctionne
correctement sur nos environnements de test ( Windows XP et Windows
Standard Server 2003).

Le fait que Nagios EventLog possèe un client NSCA intégré n’est pas
utile puisque nous avons besoin de toute façon d’un client NSCA pour SEC
notamment. Nagios EventLog utilise un cycle de vérification des logs
qu’il n’est pas possible de faire descendre au dessous des 10 secondes.
Celui induit une latence qui peut se traduire par un délai de 1 minute
pour recevoir l’alerte dans Nagios. Les règles basées sur les regex
semblent “capricieuses”. En cas de détection d’évènements prédéfinis,
Nagios EventLog envoie à Nagios le message correspondant du journal
d’évènements; qui est parfois long et accentué posant des problèmes
d’encodage lors du passage Windows/Unix. Malheureusement, il n’est pas
possible de redéfinir le message envoyé à Nagios.

~~~~ {.code}
System [error] [Windows Update Agent #16]: Connexion impossible�: Windows ne parvient pas � se connecter au service Mises � jour automatiques et ne peut donc pas proc�der au t�l�chargement et � l'installation des mises � jour d�finies par la planification 
~~~~

#### Snare

[SNARE](http://www.intersectalliance.com/projects/SnareWindows/ "http://www.intersectalliance.com/projects/SnareWindows/")
est un “traducteur” de journaux au format EventLog vers le format
syslog. Il permet de lire en temps réel les journaux d’évènements
Windows et de rediriger ces évènements après filtrage éventuel vers un
serveur SNARE et/ou un serveur Syslog. La version freeware de ce
programme dont le code source est disponible permet uniquement les
envois de message au protocole UDP. L’ensemble des règles de filtrage
sont stockés la base des registres. De plus, SNARE possède une interface
d’administration web sur le port 6161 par défaut. Cette interface peut
être protégée par mot de passe et/ou par restrictions d’adresses de
connexion.

#### NTsyslog

[ntsyslog](http://ntsyslog.sourceforge.net/ "http://ntsyslog.sourceforge.net/")
a été développé pour permettre, à l’instar de SNARE, de traduire les
évènements type eventlog en message syslog. La dernière version date du
21 octobre 2002 et le projet semble aujourd’hui abandonné. Cependant, ce
programme fonctionne correctement sur nos machines de tests. Il est
intégré à Nagios EventLog. Il permet de filtrer les types d’événèments
qui seront envoyés pour analyse. Cependant, ce niveau de filtrage
n’étant pas suffisant, il faut soit accepter d’envoyer au central des
évènements partiellement qualifiés (augmentation utilisation bande
passante et filtrage, corrélation à prévoir sur central) soit compléter
son installation avec Kiwi Syslog Dameon et SEC sur l’hôte supervisé.

#### Kiwi Syslog

[Kiwi
Syslog](http://www.kiwisyslog.com/kiwi-syslog-daemon-overview/ "http://www.kiwisyslog.com/kiwi-syslog-daemon-overview/")
est un serveur de type syslog capable de recevoir messages et traps snmp
depuis n’importe quel hôte compatible avec ce protocole. Il est
compatible Windows XP, Server 2003 et Vista. Kiwi Syslog permet de
stocker ces évènements dans un fichier plat ou dans une base de données.
Kiwi Syslog a été préfére à
[syslog-win32](http://syslog-win32.sourceforge.net/ "http://syslog-win32.sourceforge.net/")
qui travaille moins rapidement et qui est plus difficile à configurer.

#### SEC

Ce programme écrit en Perl fonctionne sur Windows avec ActivePerl ou
Cygwin. Il accepte en entrée n’importe quel fichier de type txt dans
lequel il détecte en temps réel les évènements définis au préalable.
Plusieurs fichiers peuvent être surveillés en même temps. SEC est un
programme très puissant puisque il permet de définir des règles de
corrélation de type n évènements de type y dans une fenêtre de temps de
z minutes.

### Contexte Supervision passive {#contexte-supervision-passive .sectionedit7}

1.  Pour les Event Log Windows, le parser retenu doit filtrer le maximum
    d’évènements en local et envoyer le reste au serveur syslog-ng qui
    tourne sur le collecteur avec SEC en corrélation. Navios EventLog
    envoie directement des alertes au format NSCA sans avoir besoin de
    send\_nsca.
2.  Les outils qui parsent des Event Log Windows ne pouvant filtrer des
    logs plus “génériques” (type oracle, netvault…), nous avons donc
    besoin d’un deuxième agent pour la supervision passive. Le seul qui
    semble pouvoir remplir cette tâche est SEC qui tourne avec
    ActivePerl. OSSEC aurait pu convenir mais l’agent Windows ne fait
    pas de filtrage.
3.  Nous pouvons traduire les messages eventlog en message syslog et les
    filtrer directement sur l’hôte supervisé à l’aide de SEC. Nous ne
    renvoyons alors sous forme de messages NSCA que les évènements sur
    lesquels nous allons réagir.

L’envoi des fichiers de log brut à la syslog vers un serveur central qui
effectuerait la corrélation et l’alerte n’est pas possible au vu des
volumes à transférer continuellement sur le réseau. Nous devons donc
filtrer à la source (sur l’hôte supervisé) et n’envoyer au collecteur
que les messages qui nous intéressent. SNARE, NT\_Syslog et Nagios
EventLog sont trois clients potentiels pour cette opération. La pile
SNMP Windows n’étant pas réputé pour son fonctionnement optimal et SNMP
étant un protocole UDP sans garanti de transmission, nous avons choisi
la solution suivante :

Supervision active {#supervision-active .sectionedit8}
------------------

Nous utilisons la supervision active pour tous les services dont nous
voulons garder un historique de performance.

### NSClient {#nsclient .sectionedit9}

[NSClient](http://nsclient.ready2run.nl/ "http://nsclient.ready2run.nl/")
a été le premier client Nagios développé spécifiquement pour la
supervision active d’un hôte Windows. La dernière version en date est la
2.0.1 du 02 juin 2003. Le développement semble désormais abondonné.

### NC\_NET {#nc_net .sectionedit10}

NC\_Net a repris

-   Windows XP Professional SP2
-   Windows Server 2003 Enterprise
-   Windows 2000 Server SP4
-   Windows 2000 Professional SP4

### NRPE\_NT {#nrpe_nt .sectionedit11}

### NSClient++ {#nsclient1 .sectionedit12}

NSClient++ combine les fonctions de NSClient, NRPE et bientôt
send\_nsca. Il est compatible toutes versions de Windows et est
activement développé. Il est aujourd’hui le client inclus dans la
documentation Nagios 3 et peut s’enorgueillir à ce titre de client
officiel Windows. En outre, il possède un module générique
d’interrogations WMI et possède désormais une version optimisée 64 bits.

### WMI {#wmi .sectionedit13}

Une autre manière de superviser un hôte windows est l’interrogation de
la base WMI (Windows Management Instrumentation). WMI est un système de
gestion interne de Windows qui prend en charge la surveillance et le
contrôle de ressource système via un ensemble d’interfaces.

Le principal avantage de cette solution est l’absence de client à
installer sur l’hôte.

Une
[documentation](windows-client/superivision-wmi.html "nagios:windows-client:superivision-wmi")
décrit plus longuement le principe et la mise en place de solution.

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
    source](windows-client@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](windows-client@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](windows-client@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](windows-client@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](windows-client@do=media.html "Gestionnaire de médias")
-   [Index](windows-client@do=index.html "Index [X]")
-   [Connexion](windows-client@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de page](windows-client.html#dokuwiki__top "Haut de page [T]")

nagios/windows-client.txt · Dernière modification: 2013/03/29 09:39
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

![](../lib/exe/indexer.php@id=nagios%253Awindows-client&1424859525)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
