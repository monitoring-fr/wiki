---
layout: page
---

[[[Nmon](nmon@do=backlink.html)]]

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
[Nmon](nmon.html "nagios:integration:nmon")

### Table des matières {.toggle}

-   [Nmon](nmon.html#nmon)
    -   [Présentation](nmon.html#presentation)
    -   [Installation](nmon.html#installation)
        -   [Pré-requis](nmon.html#pre-requis)
        -   [Compilation](nmon.html#compilation)

Nmon {#nmon .sectionedit1}
====

en cours de rédaction

Le but de ce tuto est de voir comment il est possible d’intégrer nmon à
Nagios pour en faire un agent de supervision possible sur systèmes AIX.

Ce tutoriel a été réalisé par :

  **Rôle**        **Nom**
  --------------- -------------
  **Rédacteur**   Olivier JAN

Présentation {#presentation .sectionedit3}
------------

[Nmon](http://www.ibm.com/developerworks/aix/library/au-analyze_aix/ "http://www.ibm.com/developerworks/aix/library/au-analyze_aix/")
est intéressant dans une panoplie de supervision parce qu’il est
installé en standard sur plateformes AIX. C’est un logiciel pour
l’administrateur système qui permet de tuner, benchmarker, superviser un
très grand nombre de paramètres en une seule opération. Il fournit des
sorties de deux façons :

1.  À l’écran (console, telnet, VNC, putty ou X Windows) en utilisant la
    librairie curses qui permet de garder un impact CPU faible alors que
    les données sont rafraîchis toutes les deux secondes par défaut.
    -   Vous pouvez visualiser les ressources de types CPU, mémoire,
        réseau, disques (nombres ou mini-graphes), systèmes de fichiers,
        NFS, processus les plus consommateurs et ressources (Linux
        version et processeurs).

2.  Dans un fichier type CSV pour analyse ultérieure et tendance à long
    terme.
    -   Utilisation conjointe avec la feuille de calcul nmon Analyser
        Excel 2000 qui charge et crée automatiquement depuis les
        fichiers de sortie nmon des douzaines de graphiques prêts pour
        l’étude ou l’analyse.
    -   Filtrez les données ou ajoutez les à des bases de données rrd
        (grâce à RRDTool et
        [nmon2rrd](http://www.ibm.com/developerworks/aix/library/au-analyze_aix/ "http://www.ibm.com/developerworks/aix/library/au-analyze_aix/")).
        Ceci génère des graphes au formats .gif ou .png ainsi que les
        pages web .html associées.
    -   Insertion directe des données en bases rrd ou autres pour votre
        propre analyse

Installation {#installation .sectionedit4}
------------

### Pré-requis {#pre-requis .sectionedit5}

~~~~ {.code .bash}
sudo aptitude install libncurses5-dev sysstat
~~~~

~~~~ {.code}
wget http://downloads.sourceforge.net/project/nmon/code/lmon12d.zip?use_mirror=freefr
unzip lmon12d.zip
ln -s lmon12d.c lmon.c
~~~~

Ajout de la distribution 8.0.4 LTS au fichier makefile. C’est une
tabulation et non des espaces en début de ligne cc

~~~~ {.code}
nmon_x86_ubuntu804:
        cc -o nmon_x86_ubuntu804 $(FILE) $(CFLAGS) $(LDFLAGS)
~~~~

### Compilation {#compilation .sectionedit6}

~~~~ {.code .bash}
make nmon_x86_ubuntu804
~~~~

Installation

~~~~ {.code .bash}
sudo mv nmon_x86_ubuntu804 /usr/local/bin/
sudo ln -s /usr/local/bin/nmon_x86_ubuntu804 /usr/local/bin/nmon
~~~~

Il est alors possible de lancer nmon et de se référer à l’écran d’aide
pour aller plus loin dans son fonctionnement interactif.

~~~~ {.code .bash}
/usr/local/bin/nom
~~~~

Mais, bien évidemment, c’est le mode qui permet de sauvegarder les
données récoltées qui nous intéressent plus particulièrement dans le
cadre de la supervision.

c’est donc alors cette commande qui permet de capturer les données dans
un fichier de type CSV.

~~~~ {.code .bash}
nmon -fT -s 30 -c 120
~~~~

Cette commande capture l’ensemble des données possibles, y compris les
processus les plus importants à un intervalle de 30 secondes pendant une
heure (120 rafraîchissements toutes les 30 secondes). Le fichier est
écrit à l’endroit d’où vous lancez la commande et prends la forme
suivante

~~~~ {.code}
<hostname>_date_time.nmon
~~~~

A ce stade, vous pouvez consulter le fichier csv de sortie avec votre
tableur préféré. Des feuilles déjà prêtes à l’emploi pour
[visualiser](http://www.ibm.com/developerworks/wikis/display/WikiPtype/nmonanalyser "http://www.ibm.com/developerworks/wikis/display/WikiPtype/nmonanalyser")
et [consolider ces
données](http://www.ibm.com/developerworks/wikis/display/WikiPtype/nmonconsolidator "http://www.ibm.com/developerworks/wikis/display/WikiPtype/nmonconsolidator")
ainsi que des exmples sont disponibles.

Il est également possible d’injecter les données issues des fichiers CSV
dans des bases de données RRDTool grâce au logiciel
[nmon2rrd](http://www.ibm.com/developerworks/wikis/download/attachments/53871937/nmon2rrdv12g.tar?version=1 "http://www.ibm.com/developerworks/wikis/download/attachments/53871937/nmon2rrdv12g.tar?version=1")
Pour l’installer, il suffit de compiler l’exécutable et de le copier. La
compilation fournit beaucoup d’erreurs mais le binaire est valide et
fonctionnel.

~~~~ {.code .bash}
cc -o nmon2rrd_x86_ubuntu804 nmon2rrd.c -g -O2 -D JFS -D GETUSER -Wall -D LARGEMEM
sudo mv nmon2rrd_x86_ubuntu804 /usr/local/bin/
sudo ln -s /usr/local/bin/nmon2rrd_x86_ubuntu804 /usr/local/bin/nmon2rrd
~~~~

Pour injecter des données, il suffit de préciser le fichier CSV à
utiliser en entrée et le répertoire de stockage des bases RRD en sortie.
Pour ma part, j’envoie le tout des bases de données accessibles à Nagios
pour interrogations ultérieurs avec un plugin de type
[check\_rrd](../../plugins/check_rrd.html "plugins:check_rrd") plutôt
que pour une visualisation directe des graphes depuis la page web
générée par nmon2rrd.

~~~~ {.code .bash}
 /usr/local/bin/nmon2rrd -f master_091019_1310.nmon -d /usr/local/nagios/var/rrd -x
~~~~

~~~~ {.code}
./find_max_nmon_val.pl /home/system/src/nmon/ CPU_ALL
~~~~

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
    source](nmon@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](nmon@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](nmon@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](nmon@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](nmon@do=media.html "Gestionnaire de médias")
-   [Index](nmon@do=index.html "Index [X]")
-   [Connexion](nmon@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de page](nmon.html#dokuwiki__top "Haut de page [T]")

nagios/integration/nmon.txt · Dernière modification: 2013/03/29 09:39
(modification externe)

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

![](../../lib/exe/indexer.php@id=nagios%253Aintegration%253Anmon&1424859578)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
