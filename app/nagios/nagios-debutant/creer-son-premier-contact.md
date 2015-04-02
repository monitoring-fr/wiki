---
layout: page
title: Créer son premier contact et groupe de contacts
---

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

**[cf Phase de Test d'envoi de mail](../../infra/postfix.html#phase-de-test "infra:postfix")**