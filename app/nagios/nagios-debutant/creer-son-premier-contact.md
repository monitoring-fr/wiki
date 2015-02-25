---
layout: page
---

[[[Créer son premier contact et groupe de
contacts](creer-son-premier-contact@do=backlink.html)]]

[wiki monitoring-fr.org](../../start.html "[ALT+H]")

![Logo Monitoring](../../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../../start.html "start") »
[Nagios](../start.html "nagios:start") » [NAGIOS - Guide de démarrage
pour débutant](start.html "nagios:nagios-debutant:start") » [Créer son
premier contact et groupe de
contacts](creer-son-premier-contact.html "nagios:nagios-debutant:creer-son-premier-contact")

### Table des matières {.toggle}

-   [Créer son premier contact et groupe de
    contacts](creer-son-premier-contact.html#creer-son-premier-contact-et-groupe-de-contacts)
    -   [Création du
        contact](creer-son-premier-contact.html#creation-du-contact)
    -   [Création du
        contactgroup](creer-son-premier-contact.html#creation-du-contactgroup)
    -   [Configuration de l'envoi des
        mails](creer-son-premier-contact.html#configuration-de-l-envoi-des-mails)
        -   [Version simplifée
            :](creer-son-premier-contact.html#version-simplifee)

Créer son premier contact et groupe de contacts {#creer-son-premier-contact-et-groupe-de-contacts .sectionedit1}
===============================================

Ce chapitre va montrer comment créer un contact et l’y affecter à un
groupe de contacts. et ce qu’il faut faire pour que l’envoi des messages
fonctionnent.

Création du contact {#creation-du-contact .sectionedit2}
-------------------

Vous allez ajouter un contact dans le fichier contact.cfg comme
ci-dessous (ceci est un exemple):

~~~
define contact{
        contact_name                    hdicule
        use                             generic-contact
        alias                           Henri Dicule
        email                           henri.dicule@votre_entreprise.fr
        }
~~~

Création du contactgroup {#creation-du-contactgroup .sectionedit3}
------------------------

Et oui, Henri ne fait pas partie des admins, il est technicien
Informatique et c’est lui qui doit être alerté par la supervision. Nous
allons donc ajouter un contactgroup “support” auquel Henri fera partie.

toujours dans le contact.cfg, insérer un exemple comme ci-dessous :

~~~
define contactgroup{
        contactgroup_name       support
        alias                   Support Technique
        members                 hdicule
        }
~~~

Maintenant, que mon contact et le contactgroup est créé, il y a 2
options qui s’offre à vous. Gérez la définition du groupe de contact qui
doit être alerter; soit dans le template ou soit dans l’hôte et le
service.

Nous allons faire la démarche la plus simple (pas forcément la plus
optimisé en terme d’administration), celle de le définir dans l’hôte et
le service.

Nous allons retourner dans le fichier de notre hôte “Rainette”
(rainette.cfg) et nous allons ajouter ce qu’il faut pour que le
contactgroup “support” soit alerté :

Nous ajouterons la variable ***contact\_groups support*** à chaque
définition (le service HTTP est volontairement absent car nous avons la
variable notifications\_enabled à 0 donc pas d’alertes ;) )

~~~
define host{
        use                     generic-host
        host_name               Rainette
        alias                   Rainette
        address                 127.0.0.1
        contact_groups          support
        }

# Definition du service de Load Average
define service{
        use                             generic-service
        host_name                       Rainette
        service_description             Load Average
        check_command                   check_load!5.0,4.0,3.0!10.0,8.0,6.0
        contact_groups                  support
        }
~~~

Un petit redémarrage de nagios, cela doit redémarrer en un quart de
tour.

Configuration de l'envoi des mails {#configuration-de-l-envoi-des-mails .sectionedit4}
----------------------------------

L’envoi des mails est très généralement géré avec postfix. ( **[cf page
concernant postfix](../../infra/postfix.html "infra:postfix")** )

### Version simplifée : {#version-simplifee .sectionedit5}

#### Installation des dépendances {#installation-des-dependances}

~~~
sudo apt-get install mailx postfix
~~~

Lors que l’installation de postfix vous demande quel type de
configuration vous répondez ***“Pas de configuration”***.

#### Configuration de postfix

Ensuite créer un fichier /etc/postfix/main.cf et mettre le contenu
ci-dessous en pensant bien à remplacer les éléments que je vais énoncer
:

-   **myhostname = rfronteau-laptop** → **rfronteau-laptop** à remplacer
    par le nom de machine que vous trouvez dans le fichier /etc/hostname
-   **mydestination = rfronteau-laptop, localhost.localdomain,
    localhost** → **rfronteau-laptop** à remplacer par le nom de machine
    que vous trouvez dans le fichier /etc/hostname
-   **relayhost = smtp.orange.fr** → **smtp.orange.fr** à remplacer par
    l’adresse de votre serveur de messagerie.

~~~
# See /usr/share/postfix/main.cf.dist for a commented, more complete version

# Debian specific:  Specifying a file name will cause the first

# line of that file to be used as the name.  The Debian default

# is /etc/mailname.

#myorigin = /etc/mailname

smtpd_banner = $myhostname ESMTP $mail_name (Ubuntu)

biff = no

# appending .domain is the MUA's job.

append_dot_mydomain = no

# Uncomment the next line to generate "delayed mail" warnings

#delay_warning_time = 4h

readme_directory = no

# TLS parameters

smtpd_tls_cert_file=/etc/ssl/certs/ssl-cert-snakeoil.pem

smtpd_tls_key_file=/etc/ssl/private/ssl-cert-snakeoil.key

smtpd_use_tls=yes

smtpd_tls_session_cache_database = btree:${data_directory}/smtpd_scache

smtp_tls_session_cache_database = btree:${data_directory}/smtp_scache

# See /usr/share/doc/postfix/TLS_README.gz in the postfix-doc package for

# information on enabling SSL in the smtp client.

myhostname = rfronteau-laptop

alias_maps = hash:/etc/aliases

alias_database = hash:/etc/aliases

mydestination = rfronteau-laptop, localhost.localdomain, localhost

relayhost = smtp.orange.fr

mynetworks = 127.0.0.0/8 [::ffff:127.0.0.0]/104 [::1]/128

mailbox_size_limit = 0

recipient_delimiter = +

inet_interfaces = loopback-only
~~~

**Penser à redémarrer postfix (/etc/init.d/postfix restart)**

#### Test d'envoi de mail {#test-d-envoi-de-mail}

**[cf Phase de Test d'envoi de
mail](../../infra/postfix.html#phase-de-test "infra:postfix")**

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

Nagios {#nagios .sectionedit1}
------

-   [Arborescence des
    fichiers](../installation-layout.html "nagios:installation-layout")
-   [Commandes de remontée de
    contrôle](../ocsp-ochp.html "nagios:ocsp-ochp")
-   [Données Nagios dans un ramdisk](../ramdisk.html "nagios:ramdisk")
-   [Event Handlers](../event_handlers.html "nagios:event_handlers")
-   [Gabarits d'objets de
    configuration](../templates.html "nagios:templates")
-   [Installation Nagios 2 & 3 sur Ubuntu 6.0.6, 8.0.4 et 10.0.4
    LTS](../ubuntu-install.html "nagios:ubuntu-install")
-   [Installation Nagios 3 sur Debian Squeeze
    6.0.3](../debian-install.html "nagios:debian-install")
-   [Installation de Nagios 3.x sur CentOS
    5.3](../nagios-centos-install.html "nagios:nagios-centos-install")
-   [Introduction aux objets de
    configuration](../configobjects.html "nagios:configobjects")
-   [Introduction à
    Nagios](../nagios-introduction.html "nagios:nagios-introduction")
-   [Liens Nagios](../links.html "nagios:links")
-   [Mise en place complète de Nagios sur RHEL
    5.4](../mise-en-place-complete-nagios-sur-rhel-5.4/start.html "nagios:mise-en-place-complete-nagios-sur-rhel-5.4:start")
-   [NAGIOS - Guide de démarrage pour
    débutant](start.html "nagios:nagios-debutant:start")
-   [Nagios Addons](../addons/start.html "nagios:addons:start")
-   [Nagios
    Integration](../integration/start.html "nagios:integration:start")
-   [Nagios Plugins](../plugins/start.html "nagios:plugins:start")
-   [Nagios et les
    notifications](../notifications.html "nagios:notifications")
-   [Outils de supervision d'un hôte
    Windows](../windows-client.html "nagios:windows-client")
-   [Référence des objets de
    configuration](../objects-reference.html "nagios:objects-reference")
-   [Superviser un hôte Windows avec
    NSClient++](../nagios-nsclient-host.html "nagios:nagios-nsclient-host")
-   [Supervision Windows en mode
    passif](../supervision-windows-passif.html "nagios:supervision-windows-passif")
-   [Supervision vmware esx](../vmware_esx.html "nagios:vmware_esx")
-   [check-list de diagnostic](../debug.html "nagios:debug")

-   [Afficher le texte
    source](creer-son-premier-contact@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](creer-son-premier-contact@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](creer-son-premier-contact@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](creer-son-premier-contact@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](creer-son-premier-contact@do=media.html "Gestionnaire de médias")
-   [Index](creer-son-premier-contact@do=index.html "Index [X]")
-   [Connexion](creer-son-premier-contact@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de
    page](creer-son-premier-contact.html#dokuwiki__top "Haut de page [T]")

nagios/nagios-debutant/creer-son-premier-contact.txt · Dernière
modification: 2013/03/29 09:39 (modification externe)

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

![](../../lib/exe/indexer.php@id=nagios%253Anagios-debutant%253Acreer-son-premier-contact&1424859573)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
