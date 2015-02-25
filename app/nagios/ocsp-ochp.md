---
layout: page
---

[[[Commandes de remontée de contrôle](ocsp-ochp@do=backlink.html)]]

[wiki monitoring-fr.org](../start.html "[ALT+H]")

![Logo Monitoring](../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../start.html "start") »
[Nagios](start.html "nagios:start") » [Commandes de remontée de
contrôle](ocsp-ochp.html "nagios:ocsp-ochp")

### Table des matières {.toggle}

-   [Commandes de remontée de
    contrôle](ocsp-ochp.html#commandes-de-remontee-de-controle)
    -   [Méthode classique](ocsp-ochp.html#methode-classique)
        -   [OCSP](ocsp-ochp.html#ocsp)
        -   [OCHP](ocsp-ochp.html#ochp)
        -   [submit\_check\_result](ocsp-ochp.html#submit_check_result)
        -   [submit\_check\_result
            amélioré](ocsp-ochp.html#submit_check_result-ameliore)
    -   [PNSCA, OCP\_daemon et OSCP
        Sweeper](ocsp-ochp.html#pnsca-ocp_daemon-et-oscp-sweeper)
        -   [OCP\_daemon](ocsp-ochp.html#ocp_daemon)

Commandes de remontée de contrôle {#commandes-de-remontee-de-controle .sectionedit1}
=================================

En environnement distribué, Nagios remonte systématiquement le résultat
des contrôles de services et d’hôtes ^[1)](ocsp-ochp.html#fn__1)^ du
serveur réparti vers le serveur central en utilisant les commandes
obsessive compulsive service processor ^[2)](ocsp-ochp.html#fn__2)^ et
obsessive compulsive host processor ^[3)](ocsp-ochp.html#fn__3)^. Comme
les exemples fournis dans la doc pour ces commandes sont un peu datés,
voici les définitions de commandes et le script submit\_check\_result
que j’utilise dans ces cas là.

Dans les deux définitions de commandes suivantes, la macro \$USER2\$ est
renseigné dans le fichier de configuration resource.cfg avec la valeur
/usr/local/nagios/libexec/eventhandlers dans mon cas.

Méthode classique {#methode-classique .sectionedit2}
-----------------

C’est la méthode documenté dans la doc officielle Nagios.

### OCSP {#ocsp .sectionedit3}

~~~
# 'submit_service_check_result' command definition
define command{
        command_name    submit_service_check_result
        command_line    $USER2$/submit_check_result $HOSTNAME$ "$SERVICEDESC$" $SERVICESTATEID$ "$SERVICEOUTPUT$ | $SERVICEPERFDATA$"
        }
~~~

![:!:](../lib/images/smileys/icon_exclaim.gif) Noter le symbole du pipe
et la macro \$SERVICEPERFDATA\$ située après qui remonte vers le central
les données de performance. Peut être bien évidement omis si vous ne
souhaitez pas faire de traitement des données de performance.

### OCHP {#ochp .sectionedit4}

~~~
# 'submit_host_check_result' command definition
define command{
        command_name    submit_host_check_result
        command_line    $USER2$/submit_check_result $HOSTNAME$ $HOSTSTATEID$ "$HOSTOUTPUT$"
        }
~~~

### submit\_check\_result {#submit_check_result .sectionedit5}

Pour finir, ces deux définitions de commande passent l’ensemble de leurs
arguments au script submit\_check\_result suivant qui est une adaptation
du script original fourni dans le répertorie contrib des sources de
Nagios.

~~~
printfcmd="/usr/bin/printf"

NscaBin="/usr/local/nagios/libexec/send_nsca"
NscaCfg="/usr/local/nagios/etc/send_nsca.cfg"
NagiosHost="192.168.1.1"

# Fire the data off to the NSCA daemon using the send_nsca script
$printfcmd "%s\t%s\t%s\t%s\n" "$1" "$2" "$3" "$4" | $NscaBin -H $NagiosHost -c $NscaCfg
~~~

N’hésitez pas à adapter ces définitions et script à votre environnement
et à [me faire part des
améliorations](http://www.monitoring-fr.org/about/contact "http://www.monitoring-fr.org/about/contact")
en résultant.

### submit\_check\_result amélioré {#submit_check_result-ameliore .sectionedit6}

Le submit\_check\_result est habituellement le goulet d’étranglement
d’une solution distribuée en faisant grimper très haut la latence. Pour
revenir à des valeurs de latence raisonnables, il faut alors soit
utiliser un addon type OCP\_daemon ou modifier le script ci-dessus de la
façon suivante:

~~~
printfcmd="/usr/bin/printf"

NscaBin="/usr/local/nagios/libexec/send_nsca"
NscaCfg="/usr/local/nagios/etc/send_nsca.cfg"
NagiosHost="192.168.1.1"

# Fire the data off to the NSCA daemon using the send_nsca script
$printfcmd "%s\t%s\t%s\t%s\n" "$1" "$2" "$3" "$4" | $NscaBin -H $NagiosHost -c $NscaCfg > /dev/null &
~~~

La petite astuce, tirée de la liste de diffusion consiste simplement à
envoyer la commande en arrière-plan pour ne pas avoir à attendre la fin
d’exécution de celle-ci. D’après l’auteur de cette astuce
^[4)](ocsp-ochp.html#fn__4)^, les temps d’exécution de cette commande
passent de 0.7 seconde à 0.02 secondes; ce qui fait toute la différence
au final.

PNSCA, OCP\_daemon et OSCP Sweeper {#pnsca-ocp_daemon-et-oscp-sweeper .sectionedit7}
----------------------------------

Sur de très gros environnement de supervision comme celui que je gère en
ce moment ^[5)](ocsp-ochp.html#fn__5)^, les commandes ocsp et ochp
constitue un goulet d’étranglement qui amène une latence importante sur
les collecteurs ^[6)](ocsp-ochp.html#fn__6)^. Pour remédier à ce
problème, il existe plusieurs solutions comme
[OCP\_daemon](http://wiki.nagios.org/index.php/OCP_Daemon "http://wiki.nagios.org/index.php/OCP_Daemon")
ou pnsca. Il existe aussi [OCSP
Sweeper](http://www.nagiosexchange.org/cgi-bin/page.cgi?g=Detailed%2F1639.html;d=1 "http://www.nagiosexchange.org/cgi-bin/page.cgi?g=Detailed%2F1639.html;d=1")
qui a l’inconvénient de ne pas travailler en temps réel, ce qui est un
handicap quand vous souhaitez récupérer les données de performance sur
le serveur central. OCP\_daemon est un démon écrit en Perl alors que
pnsca est un module de courtage d’évènements (event broker module) pour
Nagios. Que ce soit avec pnsca ou OCP\_daemon, la latence redevient à un
niveau normal (moins de 1 seconde) dès que l’un des deux est installé.
En attendant que pnsca devienne un produit mature, c’est OCP\_daemon qui
semble la meilleure option pour le moment et c’est son installation que
nous allons voir maintenant.

### OCP\_daemon {#ocp_daemon .sectionedit8}

Vous pouvez trouver des instructions détaillées en anglais pour
[l'installation de OCP\_daemon sur le portail de la communauté
Nagios](http://www.nagioscommunity.org/wiki/index.php/OCP_Daemon "http://www.nagioscommunity.org/wiki/index.php/OCP_Daemon").
Il faut noter que OCP\_daemon utilise le circuit habituellement réservé
au traitement des performances sur le collecteur et qu’il ne peut donc
plus servir à cela. Ce n’est pas forcément un problème puisque ces
données peuvent quand même être remontées au central pour être stockées,
graphées sur celui-ci.

Voici un condensé de l’installation pour Debian et dérivés.
L’installation commence par les librairies et modules Perl nécessaires
au bon fonctionnement de OCP\_daemon.

~~~ {.code .bash}
sudo apt-get install libevent1 libevent-dev
wget http://search.cpan.org/CPAN/authors/id/V/VP/VPARSEVAL/Event-Lib-1.03.tar.gz
tar xzf Event-Lib-1.03.tar.gz
cd Event-Lib-1.03
perl Makefile.PL
make
sudo make install
~~~

Ensuite, il convient de préparer les deux fichiers pipe nécessaires au
traitement des hôtes et services.

~~~ {.code .bash}
sudo mkdir /usr/local/nagios/var/ocp
sudo mkfifo /usr/local/nagios/var/ocp/host-perfdata.fifo
sudo mkfifo /usr/local/nagios/var/ocp/service-perfdata.fifo
sudo chown -R nagios:nagcmd /usr/local/nagios/var/ocp
~~~

Il ne reste plus qu’à démarrer le démon en lui passant tous les
arguments nécessaires comme ci-dessous.

~~~
/usr/local/nagios/bin/OCP_daemon -f /usr/local/nagios/var/ocp/host-perfdata.fifo,/usr/local/nagios/var/ocp/service-perfdata.fifo -n /usr/local/nagios/libexec/send_nsca -H 10.176.3.45 -c /usr/local/nagios/etc/send_nsca.cfg -r 1
~~~

Il reste à configurer Nagios pour le faire utiliser ce nouveau circuit
de commandes de remontée de contrôle. Cela se passe au niveau du fichier
nagios.cfg.

~~~
process_performance_data=1

#performance data for ocp commands

# Files to which Nagios will write data. In this setup
# they will be named pipes.
host_perfdata_file=/usr/local/nagios/var/ocp/host-perfdata.fifo
service_perfdata_file=/usr/local/nagios/var/ocp/service-perfdata.fifo

# This is exactly what will be sent to send_NSCA. Do not change it.
host_perfdata_file_template=$HOSTNAME$\t$HOSTSTATEID$\t$HOSTOUTPUT$|$HOSTPERFDATA$
service_perfdata_file_template=$HOSTNAME$\t$SERVICEDESC$\t$SERVICESTATEID$\t$SERVICEOUTPUT$|$SERVICEPERFDATA$

# The write mode should be w, although append should have no effect on a named pipe.
host_perfdata_file_mode=w
service_perfdata_file_mode=w

# We don't want to process any command, so set this to 0
host_perfdata_file_processing_interval=0
service_perfdata_file_processing_interval=0
~~~

N’oubliez pas d’activer le traitement des performances au niveau des
définitions d’hôtes et de services et le tour est joué. Bye bye latence
![;-)](../lib/images/smileys/icon_wink.gif)

^[1)](ocsp-ochp.html#fnt__1)^ depuis la version 3

^[2)](ocsp-ochp.html#fnt__2)^ ocsp

^[3)](ocsp-ochp.html#fnt__3)^ ochp

^[4)](ocsp-ochp.html#fnt__4)^ beegie\_b

^[5)](ocsp-ochp.html#fnt__5)^ 1600 hôtes pour 25 000 services par
collecteur

^[6)](ocsp-ochp.html#fnt__6)^ j’ai observé jusquà 8000 secondes de
latence

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
    source](ocsp-ochp@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](ocsp-ochp@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](ocsp-ochp@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](ocsp-ochp@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](ocsp-ochp@do=media.html "Gestionnaire de médias")
-   [Index](ocsp-ochp@do=index.html "Index [X]")
-   [Connexion](ocsp-ochp@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de page](ocsp-ochp.html#dokuwiki__top "Haut de page [T]")

nagios/ocsp-ochp.txt · Dernière modification: 2013/03/29 09:39
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

![](../lib/exe/indexer.php@id=nagios%253Aocsp-ochp&1424859523)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
