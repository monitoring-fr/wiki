---
layout: page
---

[[[check\_dnsbl](check_dnsbl@do=backlink.html)]]

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
[check\_dnsbl](check_dnsbl.html "nagios:plugins:check_dnsbl")

### Table des matières {.toggle}

-   [check\_dnsbl](check_dnsbl.html#check_dnsbl)
    -   [Vous avez dit RBL ?](check_dnsbl.html#vous-avez-dit-rbl)
    -   [Implémentation dans
        Nagios](check_dnsbl.html#implementation-dans-nagios)

check\_dnsbl {#check_dnsbl .sectionedit1}
============

Où comment vérifier la présence d’un serveur SMTP dans les listes noires
de Spam. Ce petit tuto est une traduction de [d'un
article](http://nohn.org/blog/view/id/checking_your_smtp_server_with_net_dnsbl_and_nagios "http://nohn.org/blog/view/id/checking_your_smtp_server_with_net_dnsbl_and_nagios")
de Sebastian Nohn.

Vous avez dit RBL ? {#vous-avez-dit-rbl .sectionedit2}
-------------------

Les RBLs ont pour objectif de fournir une liste de serveurs réputés
comme grands envoyeurs de pourriels, et de lister les grands
polluposteurs. Il s’agit en fait d’une grande liste noire généralisée.
Le principe d’utilisation est fort simple : lorsqu’un filtre reçoit une
courriel, il vérifie si le serveur d’envoi est contenu dans un RBL. Si
oui, le courriel est catégorisé comme pourriel. Les RBLs qu’un filtre
utilise comme sources de serveurs est habituellement déterminée par
l’administrateur système. Cette méthode contient donc son lot de
controverse, puisque certains RBLs sont réputés pour être plus efficaces
que d’autres. Le choix des RBLs influence donc directement l’efficacité
du système antipourriel. De plus, certains RBL ont des règles plus
souples que d’autres quant à l’ajout d’un serveur dans leur liste,
compliquant encore plus la situation. Parmi les RBLs connus, notons,
entre autres,
[SpamHaus](http://www.spamhaus.org/ "http://www.spamhaus.org/"),
[DynaBlock](http://www.njabl.org/dynablock.html "http://www.njabl.org/dynablock.html"),
[Sorbs](http://www.sorbs.net/ "http://www.sorbs.net/"), et
[DSBL](http://www.dsbl.org/ "http://www.dsbl.org/"). Il est également
possible d’associer
[ROKSO](http://www.spamhaus.org/rokso/index.lasso "http://www.spamhaus.org/rokso/index.lasso")
aux RBLs. ROKSO (Register of Known Spam Operations) est une liste des
polluposteurs les plus actifs. En fait, les membres de ROKSO sont
responsables de près de 80% du pourriel sur le Net.

Il est donc du ressort d’un administrateur système de vérifier
régulièrement si ses serveurs d’envoi SMTP ne sont pas fichés dans l’une
de ces listes noires. C’est particulièrement fastidieux manuellement et
on oublie souvent de le faire alors que Nagios associé à un peu de PHP
et quelques modules PEAR peut tout à fait s’en charger de façon
automatique.

Implémentation dans Nagios {#implementation-dans-nagios .sectionedit3}
--------------------------

Commençons par installer les packages PEAR nécessaires soit Net\_DNSBL
et Console\_Getopt

~~~~ {.code}
pear install -a Net_DNSBL Console_Getopt
~~~~

Il convient ensuite de créer le script de vérification

~~~~ {.code .php}
#!/usr/bin/php
<?php
 
define('SERVICE_STATUS', 'Service Status:');
 
require_once 'Console/Getopt.php';
require_once 'Net/DNSBL.php';
 
$dnsbl = new Net_DNSBL();
 
$shortoptions = 'H:V::r:';
$longoptions = array('hostname=', 'version==', 'rbls=');
 
$con = new Console_Getopt;
$args = $con->readPHPArgv();
array_shift($args);
$options = $con->getopt2($args, $shortoptions, $longoptions);
 
foreach($options[0] as $option) {
  if ($option[0] == 'H' || $option[0] == '--hostname') {
    $hostname = $option[1];
  }
  if ($option[0] == 'r' || $option[0] == '--rbls') {
    $rbls_temp = $option[1];
  }
}
 
if (!isset($hostname) || !isset($rbls_temp)) {
  echo SERVICE_STATUS.' Unknown'."\n";
  exit(3);
} else {
  $rbls = explode(',', $rbls_temp);
  $dnsbl->setBlacklists($rbls);
  if ($dnsbl->isListed($hostname)) {
    echo SERVICE_STATUS.' Critical - Listed in '.$dnsbl->getListingBl($hostname)."\n";
    exit(2);
  } else {
    echo SERVICE_STATUS.' OK - Not Listed in supplied DNSBLs'."\n";
    exit(0);
  }
}
?>
~~~~

Ce script est à déposer dans le répertoire des scripts Nagios,
habituellement /usr/local/nagios/libexec.

Ensuite, il suffit de créer une commande comme à l’accoutumée

~~~~ {.code}
define command{
        command_name    check_dnsbl
        command_line    $USER1$/check_dnsbl -H $HOSTADDRESS$ -r $ARG1$
        }
~~~~

et de créer le service correspondant

~~~~ {.code}
define service{
        use                             generic-service
        host_name                       votre.server.mail
        service_description             DNSBL
        is_volatile                     0
        check_period                    24x7
        max_check_attempts              3
        normal_check_interval           3
        retry_check_interval            1
        contact_groups                  none
        notification_interval           120
        notification_period             24x7
        notification_options            w,u,c,r
        check_command                   check_dnsbl!bl.spamcop.net,autre.liste.virgule.separe.rbls
        }
~~~~

Nagios va désormais vérifier à l’intervalle fixé si le serveur smtp
déclaré dans hostname est fiché dans les services de listes noires
passés en paramètres

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
    source](check_dnsbl@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](check_dnsbl@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](check_dnsbl@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](check_dnsbl@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](check_dnsbl@do=media.html "Gestionnaire de médias")
-   [Index](check_dnsbl@do=index.html "Index [X]")
-   [Connexion](check_dnsbl@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de page](check_dnsbl.html#dokuwiki__top "Haut de page [T]")

nagios/plugins/check\_dnsbl.txt · Dernière modification: 2013/03/29
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

![](../../lib/exe/indexer.php@id=nagios%253Aplugins%253Acheck_dnsbl&1424859575)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
