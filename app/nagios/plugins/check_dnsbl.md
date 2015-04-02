---
layout: page
title: check\_dnsbl
---

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

~~~
pear install -a Net_DNSBL Console_Getopt
~~~

Il convient ensuite de créer le script de vérification

~~~ {.code .php}
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
~~~

Ce script est à déposer dans le répertoire des scripts Nagios,
habituellement /usr/local/nagios/libexec.

Ensuite, il suffit de créer une commande comme à l’accoutumée

~~~
define command{
        command_name    check_dnsbl
        command_line    $USER1$/check_dnsbl -H $HOSTADDRESS$ -r $ARG1$
        }
~~~

et de créer le service correspondant

~~~
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
~~~

Nagios va désormais vérifier à l’intervalle fixé si le serveur smtp déclaré dans hostname est fiché dans les services de listes noires passés en paramètres