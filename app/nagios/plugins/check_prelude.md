---
layout: page
---

[[[check\_prelude](check_prelude@do=backlink.html)]]

[wiki monitoring-fr.org](../../start.html "[ALT+H]")

![Logo Monitoring](../../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../../start.html "start") »
[Nagios](../start.html "nagios:start") » [Nagios
Plugins](start.html "nagios:plugins:start") »
[check\_prelude](check_prelude.html "nagios:plugins:check_prelude")

### Table des matières {.toggle}

-   [check\_prelude](check_prelude.html#check_prelude)
    -   [Présentation](check_prelude.html#presentation)
    -   [Installation](check_prelude.html#installation)
    -   [Configuration](check_prelude.html#configuration)
        -   [Nagios](check_prelude.html#nagios)
        -   [check\_prelude.pl](check_prelude.html#check_preludepl)

check\_prelude {#check_prelude .sectionedit1}
==============

Ce plugin accède aux évènements (alertes) contenus dans une base de
données d’un serveur Prelude

Tutoriel réalisé par :

  **Rôle**        **Nom**
  --------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------
  **Rédacteur**   [Ludovic VALENTIN](http://www.monitoring-fr.org/community/members/ludovic-valentin/ "http://www.monitoring-fr.org/community/members/ludovic-valentin/")

Présentation {#presentation .sectionedit3}
------------

Dans le cadre d’une intégration Nagios de Prelude-IDS, il faut installer
le plugin check\_prelude. Celui-ci permet de récupérer les évènements
stockés dans la base de données MySQL de Prelude, à intervalle régulier
(toutes les 5 minutes), puis il retourne un statut basé sur des limites
définies.

check\_prelude compte les évènements avec une sévérité de type medium et
high présents dans la base de données. Ensuite il remonte un statut
WARNING ou CRITICAL dans Nagios.

Le comptage des évènements, et le déclenchement d’un statut dans Nagios
se fait selon des paramètres (limites ou seuils) spécifiés lors de la
création du service dans Nagios. Par exemple, dès que check\_prelude
trouve 10 évènements medium dans Prelude, il génère un WARNING. Le
nombre à partir duquel le plugin réagit dans Nagios est donc à fixer par
l’administrateur.

Installation {#installation .sectionedit4}
------------

Cette partie va traiter de l’installation de check\_prelude.pl dans
l’environnement d’un serveur Nagios.

~~~
$ sudo wget http://www.monitoringexchange.org/cgi-bin/jump.cgi?ID=2287&view=File1;d=1

$ sudo cp check_prelude.pl /usr/local/nagios/libexec
~~~

Et voilà votre plugin est installé et près à être configuré dans Nagios.

Configuration {#configuration .sectionedit5}
-------------

### Nagios {#nagios .sectionedit6}

Pour configurer Nagios dans l’optique de « dialoguer » avec le serveur
Prelude, il faut définir une commande, puis un host et enfin un service.
Il est bien sûr possible de les déclarer de plusieurs façons soit dans
un seul fichier comme dans l’exemple qui va suivre ou bien, dans
plusieurs fichiers. Tout dépend de son choix personnel, de ses
préférences, et de ses besoins.

Pour commencer, il faut d’abord créer un dossier puis un fichier pour y
stocker les objets à déclarer.

~~~
$ sudo mkdir /usr/local/nagios/etc/prelude
$ sudo vim /usr/local/nagios/etc/prelude/prelude.cfg
~~~

Et dans ce fichier, éditer la commande, le service et l’hôte.

~~~
define command {
    command_name    check_prelude
    command_line    /usr/bin/perl /usr/local/nagios/libexec/check_prelude.pl $ARG1$ $ARG2$
}
~~~

Ici, l’utilisation de la commande (command\_line) nécessite de préciser
le chemin vers perl, afin de lancer correctement le plugin
check\_prelude. Sinon, le service apparaîtra en UNKNOWN dans l’interface
web de Nagios. C’est un problème venant d’une erreur ePN (ePN étant le
module d’interprétation Perl de Nagios lui-même. Il peut s’avérer
instable avec certains scripts).

~~~
define host {
    use         linux-server
    host_name       PRELUDE
    display_name        srv-prelude
    alias           Serveur Prelude
    address             xx.xx.xx.xx
}

define service {
    use         generic-service
    host_name       PRELUDE
    service_description Alertes_PRELUDE
    check_command       check_prelude!1!1
}
~~~

Dans la définition du service et de la commande, les arguments
(\$ARG1\$, \$ARG2\$ pour la commande, et !1 !1 pour le service) indique
les seuils maximums à partir desquels Nagios affiche un état CRITICAL,
ou WARNING selon le nombre d’alertes de Prelude de type HIGH ou MEDIUM.
Ici, dès que la base de données de Prelude contient une alerte HIGH, vu
que le seuil est de 1, Nagios affiche alors un état CRITICAL pour le
service Prelude, de même pour le type MEDIUM, …etc.

Une fois les objets déclarés, il reste à définir le dossier contenant ce
fichier dans la configuration principale de Nagios, à savoir le fichier
nagios.cfg. Pour cela il suffit d’indiquer le chemin vers ce répertoire
afin que Nagios prenne en compte nos objets.

~~~
cfg_dir=/usr/local/nagios/etc/prelude
~~~

### check\_prelude.pl {#check_preludepl .sectionedit7}

La configuration du serveur n’est pas encore finie, en effet, le
check\_prelude avant d’être opérationnel, doit être correctement
paramétré pour pouvoir s’authentifier auprès du serveur MySQL de
Prelude. Il faut éditer le fichier check\_prelude et y ajouter les
paramètres MySQL.

Attention : ne pas oublier de configurer votre base de données MySQL sur
le serveur Prelude, pour accepter les connexions du plugin depuis un
hôte distant (serveur Nagios).

~~~
$ sudo vim /usr/local/nagios/libexec/check_prelude.pl
~~~

~~~
### database access

use constant DBNAME => "prelude";
use constant DBHOST => "xx.xx.xx.xx";
use constant DBUSER => "prelude";
use constant DBPASS => "manager";
~~~

A ce stade, la configuration de Nagios pour récupérer les alertes de
Prelude est terminée. Il n’y a plus qu’à (re)lancer Nagios.

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

Nagios Plugins {#nagios-plugins .sectionedit1}
--------------

-   [Best of plugins compatibles
    Nagios](bestof.html "nagios:plugins:bestof")
-   [Cucumber
    Nagios](cucumber-nagios.html "nagios:plugins:cucumber-nagios")
-   [Supervision de type End User Experience avec Cucumber &
    Watir](cucumber-nagios-watir.html "nagios:plugins:cucumber-nagios-watir")
-   [check\_apt](check_apt.html "nagios:plugins:check_apt")
-   [check\_by\_ssh](check_by_ssh.html "nagios:plugins:check_by_ssh")
-   [check\_citrix\_lic](check_citrix_lic.html "nagios:plugins:check_citrix_lic")
-   [check\_dnsbl](check_dnsbl.html "nagios:plugins:check_dnsbl")
-   [check\_esx3](check_esx3.html "nagios:plugins:check_esx3")
-   [check\_esx3\_dp](check_esx3_dp.html "nagios:plugins:check_esx3_dp")
-   [check\_hpasm](check_hpasm.html "nagios:plugins:check_hpasm")
-   [check\_http](check_http.html "nagios:plugins:check_http")
-   [check\_jmx](check_jmx.html "nagios:plugins:check_jmx")
-   [check\_multi](check_multi.html "nagios:plugins:check_multi")
-   [check\_prelude](check_prelude.html "nagios:plugins:check_prelude")
-   [check\_procs](check_procs.html "nagios:plugins:check_procs")
-   [check\_procs2](check_procs2.html "nagios:plugins:check_procs2")
-   [check\_rrd](../../plugins/check_rrd.html "nagios:plugins:check_rrd")
-   [check\_webpage.rb](check_webpage.rb.html "nagios:plugins:check_webpage.rb")

-   [Afficher le texte
    source](check_prelude@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](check_prelude@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](check_prelude@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](check_prelude@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](check_prelude@do=media.html "Gestionnaire de médias")
-   [Index](check_prelude@do=index.html "Index [X]")
-   [Connexion](check_prelude@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de page](check_prelude.html#dokuwiki__top "Haut de page [T]")

nagios/plugins/check\_prelude.txt · Dernière modification: 2013/03/29
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

![](../../lib/exe/indexer.php@id=nagios%253Aplugins%253Acheck_prelude&1424859574)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
