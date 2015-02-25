---
layout: page
---

[[[Knockd](knockd@do=backlink.html)]]

[wiki monitoring-fr.org](../start.html "[ALT+H]")

![Logo Monitoring](../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../start.html "start") »
[Infrastructure](start.html "infra:start") »
[Knockd](knockd.html "infra:knockd")

### Table des matières {.toggle}

-   [Knockd](knockd.html#knockd)
    -   [Installation](knockd.html#installation)
    -   [Configuration](knockd.html#configuration)
        -   [iptables](knockd.html#iptables)
        -   [knockd](knockd.html#knockd1)
    -   [Utilisation](knockd.html#utilisation)

Knockd {#knockd .sectionedit1}
======

knockd est un démon qui permet d’implémenter des techniques de [port
knocking](http://fr.wikipedia.org/wiki/Port_knocking "http://fr.wikipedia.org/wiki/Port_knocking")
facilement. Outre l’aspect sécurtié évident de la chose, la possibilité
d’exécuter n’importe quelle commande en réponse à une séquence de ports
permet d’envisager des détournements en supervision.

Nous allons voir une utilisation basique sur le port ssh pour illustrer
le propos.

Installation {#installation .sectionedit2}
------------

~~~
sudo apt-get iptables openssh-server knockd openssh-blacklist openssh-blacklist-extra
~~~

Configuration {#configuration .sectionedit3}
-------------

La configuration est à faire d’abord au niveau iptables, donc cartes
réseaux et ensuite au niveau knockd.

### iptables {#iptables .sectionedit4}

il faut créer deux fichiers pour démarrer et stopper iptables en même
tant que les interfaces réseaux Il est possible d’utiliser pour
configurer la partie firewall d’autres outils comme
[shorewall](http://shorewall.net/ "http://shorewall.net/") ou la
commande
[ufw](http://doc.ubuntu-fr.org/ufw "http://doc.ubuntu-fr.org/ufw").

le fichier /etc/network/if-pre-up.d/iptables-start contient

~~~
#!/bin/sh

## Reset all rules
iptables -F
iptables -t nat -F

## Global parameters
# Deny all incoming connections
iptables -P INPUT DROP

# Accept all forwarded connections
iptables -P FORWARD ACCEPT

# Accept all outgoing connections
iptables -P OUTPUT ACCEPT

## filtrage
# No filtering on loopback interface
iptables -A INPUT -i lo -j ACCEPT

# Ping
iptables -A INPUT -p icmp -j ACCEPT

# IGMP (multicast)
iptables -A INPUT -p igmp -j ACCEPT

# Accept connections already established
iptables -A INPUT -m state --state RELATED,ESTABLISHED -j ACCEPT

# SSH
#iptables -A INPUT -p tcp --dport 22 -j ACCEPT
~~~

le fichier /etc/network/if-pre-up.d/iptables-stop contient quant à lui

~~~
#!/bin/sh

## Reset all rules
iptables -F
iptables -t nat -F

## Global paramters
# Accept all incoming connections
iptables -P INPUT ACCEPT

# Accept all forwarded connections
iptables -P FORWARD ACCEPT

# Accept all outgoing connections
iptables -P OUTPUT ACCEPT
~~~

Ne pas oublier de rendre ces deux fichiers exécutables et de les appeler
depuis l’interface réseau de loopback dans le fichier
/etc/network/interfaces comme suit:

~~~
auto lo
iface lo inet loopback
    pre-up /etc/network/if-pre-up.d/iptables-start
    pre-down /etc/network/if-pre-up.d/iptables-stop
~~~

C’est paré coté iptables et un petit coup de nmap depuis une machine
distante donne ceci:

~~~
nmap -PN 192.168.44.29 -p 22

Starting Nmap 4.53 ( http://insecure.org ) at 2008-12-28 20:08 CET
Interesting ports on 192.168.44.29:
PORT   STATE    SERVICE
22/tcp filtered ssh

Nmap done: 1 IP address (1 host up) scanned in 2.112 seconds
~~~

Le port est fermé par le firewall. Reste à configurer knockd pour qu’il
ouvre ce port à la demande.

### knockd {#knockd1 .sectionedit5}

Pour pouvoir démarrer knockd, il faut d’abord éditer le fichier
/etc/default/knock sur Debian et dérivées. Passer START\_KNOCKD à 1 et
décommenter KNOCKD\_OPTS en précisant l’interface d’écoute, ici la
classique eth0.

~~~
# control if we start knockd at init or not
# 1 = start
# anything else = don't start
START_KNOCKD=1

# command line options
KNOCKD_OPTS="-i eth0"
~~~

knockd réagit à une séquence de ports qu’il faut préciser dans le
fichier de configuration /etc/knockd/conf comme l’exmple suivant qui
ouvre le port 22 ssh lors de la présentation de la bonne séquence et le
ferme automatiquement après 30 secondes. C’est plus de temps qu’il n’en
faut pour se connecter. Les connexions actives étant conservées par le
firewall, c’est tout bon.

~~~
[options]
        logfile = /var/log/knockd.log

[opencloseSSH]
        sequence    = 7000:udp,8000:tcp,9000:udp
        seq_timeout = 5
        start_command     = /sbin/iptables -A INPUT -s %IP% -p tcp --dport 22 -j ACCEPT
        cmd_timeout    = 30
        stop_command     = /sbin/iptables -D INPUT -s %IP% -p tcp --dport 22 -j ACCEPT
        tcpflags    = syn
~~~

Utilisation {#utilisation .sectionedit6}
-----------

Sur l’ordinateur à partir du quel nous voulons nous connecter, il faut
bien sûr installer knockd qui contient aussi la partie cliente.

Ensuite, il faut envoyer la bonne séquence

~~~
knock 192.168.44.29 7000:udp 8000:tcp 9000:udp
~~~

un nmap nous confirme l’ouverture de port

~~~
 nmap -PN 192.168.44.29 -p 22

Starting Nmap 4.53 ( http://insecure.org ) at 2008-12-28 20:16 CET
Interesting ports on 192.168.44.29:
PORT   STATE SERVICE
22/tcp open  ssh

Nmap done: 1 IP address (1 host up) scanned in 0.096 seconds
~~~

Côté serveur, le fichier de log de knockd affiche

~~~
[2008-12-28 20:16] 192.168.44.250: opencloseSSH: Stage 1
[2008-12-28 20:16] 192.168.44.250: opencloseSSH: Stage 2
[2008-12-28 20:16] 192.168.44.250: opencloseSSH: Stage 3
[2008-12-28 20:16] 192.168.44.250: opencloseSSH: OPEN SESAME
[2008-12-28 20:16] opencloseSSH: running command: /sbin/iptables -A INPUT -s 192.168.44.250 -p tcp --dport 22 -j ACCEPT
~~~

Il nous reste alors trente secondes pour se connecter à la machine ainsi
ouverte. Passé ce délai, le port se referme irrémédiablement comme le
prouve ce nmap réalisé trente secondes après l’ouverture

~~~
 nmap -PN 192.168.44.29 -p 22

Starting Nmap 4.53 ( http://insecure.org ) at 2008-12-28 20:19 CET
Interesting ports on 192.168.44.29:
PORT   STATE    SERVICE
22/tcp filtered ssh
~~~

et ce message dans le log de knock côté serveur.

~~~
[2008-12-28 20:16] 192.168.44.250: opencloseSSH: command timeout
[2008-12-28 20:16] opencloseSSH: running command: /sbin/iptables -D INPUT -s 192.168.44.250 -p tcp --dport 22 -j ACCEPT
~~~

knock’n roll, non ?

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

**[Infrastructure](start.html "infra:start")**

**[Développement](../dev/start.html "dev:start")**

Gestion des infrastructures {#gestion-des-infrastructures .sectionedit1}
---------------------------

-   [Chef](chef.html "infra:chef")
-   [GLPI](glpi/start.html "infra:glpi:start")
-   [Graylog2](graylog2.html "infra:graylog2")
-   [Installation de Job
    Scheduler](jobscheduler.html "infra:jobscheduler")
-   [Installation de archipel sous ubuntu
    10.10](archipel.html "infra:archipel")
-   [Installation de sikuli IDE sous Ubuntu
    10.10](sikuli.html "infra:sikuli")
-   [Knockd](knockd.html "infra:knockd")
-   [Logstash](logstash.html "infra:logstash")
-   [Mise en place d'un système de contrôle de version GIT sous unbuntu
    server 10.10](git.html "infra:git")
-   [Partage de session terminal avec
    Screen](screen.html "infra:screen")
-   [Postfix](postfix.html "infra:postfix")
-   [Zimbra](zimbra.html "infra:zimbra")

-   [Afficher le texte
    source](knockd@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](knockd@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](knockd@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](knockd@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](knockd@do=media.html "Gestionnaire de médias")
-   [Index](knockd@do=index.html "Index [X]")
-   [Connexion](knockd@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de page](knockd.html#dokuwiki__top "Haut de page [T]")

infra/knockd.txt · Dernière modification: 2013/03/29 09:39 (modification
externe)

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

![](../lib/exe/indexer.php@id=infra%253Aknockd&1424859534)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
