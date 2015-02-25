---
layout: page
---

[[[check\_by\_ssh](check_by_ssh@do=backlink.html)]]

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
[check\_by\_ssh](check_by_ssh.html "nagios:plugins:check_by_ssh")

### Table des matières {.toggle}

-   [check\_by\_ssh](check_by_ssh.html#check_by_ssh)
    -   [Génération des clefs sur le serveur
        nagios](check_by_ssh.html#generation-des-clefs-sur-le-serveur-nagios)
    -   [Mise en place de la clef public sur les serveurs à
        auditer](check_by_ssh.html#mise-en-place-de-la-clef-public-sur-les-serveurs-a-auditer)
        -   [Testons](check_by_ssh.html#testons)
    -   [Définition de
        commande](check_by_ssh.html#definition-de-commande)
    -   [Définition de service](check_by_ssh.html#definition-de-service)

check\_by\_ssh {#check_by_ssh .sectionedit1}
==============

Attention, je modifie le document, les informations sont mouvantes, …
(Pierre, le 24/03/2010)

Pour effectuer des check\_by\_ssh avec Nagios, il faut au préalable
procéder à l’échange de clés entre le serveur nagios et l’hôte
supervisé.

Génération des clefs sur le serveur nagios {#generation-des-clefs-sur-le-serveur-nagios .sectionedit2}
------------------------------------------

Sur le serveur nagios, se connecter avec l’utilisateur `nagios` et
entrer la commande suivante :

~~~~ {.code}
su - nagios
cd ~
mkdir .ssh
ssh-keygen -b 2048 -t rsa
~~~~

le terminal renvoie alors, laissez le chemin par défaut (normalement, il
vous propose répertoire `.ssh` du home de l’utilisateur `nagios`)

~~~~ {.code}
Generating public/private rsa key pair.
Enter file in which to save the key (/home/nagios/.ssh/id_rsa):
~~~~

Appuyer trois fois sur entrée pour valider la création de cette double
clé public privé. Vous venez de genere un jeux de clefs (public,
private) pour votre serveur nagios, elles vont permettre une
autentification transparente (sans saisie des mots de passe).

Mise en place de la clef public sur les serveurs à auditer {#mise-en-place-de-la-clef-public-sur-les-serveurs-a-auditer .sectionedit3}
----------------------------------------------------------

Ensuite, créer un répertoire ssh dans le répertoire de départ de la
machine serveur distante si il n’existe pas gràce à la commande :

~~~~ {.code}
ssh user@serveur_distant "mkdir .ssh; chmod 0700 .ssh"
~~~~

Enfin, envoyer la partie publique de la clé créée sur la machine locale
avec

~~~~ {.code}
scp .ssh/id_rsa.pub user@machine_distante:.ssh/authorized_keys2
~~~~

**ATTENTION :** Sous peine de se prendre des erreurs à la connexion, les
autorisations sur les répertoires et fichiers doivent être strictement
positionnés comme suit (à exécuter en tant que utilisateur nagios):

~~~~ {.code}
chmod go-w ~/
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
~~~~

Maintenant, l’utilisateur nagios peut se connecter à l’hôte à superviser
sans mot de passe

### Testons {#testons .sectionedit4}

Localisons le fichier `check_by_ssh` sur le serveur nagios, afin de
l’exécuter à la main.

~~~~ {.code}
$ cd /usr/local/nagios/libexec
$ ./check_by_ssh -H serveur_distant -l user -C ls
~~~~

Définition de commande {#definition-de-commande .sectionedit5}
----------------------

~~~~ {.code}
# 'check_ssh_smtp' command definition
define command{
        command_name    check_ssh_smtp
        command_line    $USER1$/check_by_ssh -H $HOSTADDRESS$ -i $USER6$ -C "$USER1$/check_smtp -H 127.0.0.1"
        }
~~~~

![:!:](../../lib/images/smileys/icon_exclaim.gif) Pour que cette
commande fonctionne correctement, il est à noter que le répertoire
libexec ^[1)](check_by_ssh.html#fn__1)^ qui est défini par la variable
\$USER1\$ doit être situé au même endroit sur le serveur Nagios et
l’hôte supervisé. la macro nagios \$USER6\$ contient la clef qui va être
utilisée lors de l’appel ssh comme /home/ojan/.ssh/id\_rsa par exemple.

Définition de service {#definition-de-service .sectionedit6}
---------------------

~~~~ {.code}
define service{
        use                             ssh-service         ; Name of service template to use
        host_name                       *
        service_description             MAIL:SMTP
        check_command                   check_ssh_smtp!
        }
~~~~

^[1)](check_by_ssh.html#fnt__1)^ généralement en
/usr/local/nagios/libexec

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
    source](check_by_ssh@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](check_by_ssh@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](check_by_ssh@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](check_by_ssh@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](check_by_ssh@do=media.html "Gestionnaire de médias")
-   [Index](check_by_ssh@do=index.html "Index [X]")
-   [Connexion](check_by_ssh@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de page](check_by_ssh.html#dokuwiki__top "Haut de page [T]")

nagios/plugins/check\_by\_ssh.txt · Dernière modification: 2013/03/29
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

![](../../lib/exe/indexer.php@id=nagios%253Aplugins%253Acheck_by_ssh&1424859575)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
