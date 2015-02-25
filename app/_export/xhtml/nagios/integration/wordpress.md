---
layout: page
---

### Table des matières {.toggle}

-   [Wordpress4nagios](wordpress.html#wordpress4nagios)
    -   [Intégration dans
        Nagios](wordpress.html#integration-dans-nagios)

Wordpress4nagios {#wordpress4nagios .sectionedit1}
================

Ceci est une variante de
[Blosxom4nagios](../../../../integration/blosxom4nagios.html "nagios:integration:blosxom4nagios")
que j’ai mise en test. Elle utilise
[Wordpress](http://www.wordpress-fr.net/ "http://www.wordpress-fr.net/")
en lieu et place de blosxom. Et outre que l’installation de Wordpress
est simple et complètement standard, il n’y a pratiquement rien à faire
pour mettre en place cette solution qui peut se révéler puissante à
l’usage. Wordpress bénéficie d’un module XMLRPC qui permet au serveur
Nagios de pouvoir poster de nouvelles alertes avec un simple appel à
[wppost](http://search.cpan.org/~leocharre/WordPress-Post-1.04/bin/wppost "http://search.cpan.org/~leocharre/WordPress-Post-1.04/bin/wppost"),
script Perl qui gère ce genre de choses.

~~~
./wppost -U utilisateur -P passe -p http://adresse.serveur-wordpress.org/wordpress/xmlrpc.php -t "** $NOTIFICATIONTYPE$ Service Alert: $HOSTALIAS$/$SERVICEDESC$ is $SERVICESTATE$ **" -i "***** Nagios *****/" -c expertise-online.net
~~~

Où -t est le sujet et -i le contenu du message à poster sur le blog.

Il est possible d’utiliser une variante qui permet de transmettre le
contenu d’un document comme message et son titre comme sujet

~~~
./wppost -U utilisateur -P passe -p http://adresse.serveur-wordpress.org/wordpress/xmlrpc.php -t /tmp/Notification.txt -i /tmp/Notification.txt -c expertise-online.net
~~~

donne un billet dont le titre est Notification.txt et le contenu le
contenu du fichier /tmp/Notification.txt

Ce tutoriel a été réalisé par :

  **Rôle**        **Nom**
  --------------- -------------
  **Rédacteur**   Olivier JAN

Intégration dans Nagios {#integration-dans-nagios .sectionedit3}
-----------------------

Le mieux que j’ai trouvé reste de passer par un fichier intermédiare qui
permet de vraiment formater et rédiger le message de façon beaucoup plus
souple que directment depuis la commande Nagios. La commande Nagios se
contente d’appeler un script avec les arguments (macros) que nous
souhaitons manipuler ensuite.

~~~
define command{
        command_name    notify-service-by-blog
        command_line    $USER1$/submit-wp.sh $NOTIFICATIONTYPE$ $SERVICEDESC$ $HOSTALIAS$ $HOSTADDRESS$ $SERVICESTATE$ $LONGDATETIME$ $SERVICEOUTPUT$ $HOSTNAME$
        }
~~~

Le contenu de **submit-wp.sh** est le suivant :

~~~
#!/bin/bash

echo -e "***** Nagios *****\n\nNotification Type: $1\n\nService: $2\nHost: $3\nAddress: $4\nState: $5\n\nDate/Time: $6\n\nAdditional Info:\n$7\n\nAcknowled$ > /tmp/wp-submit.txt
/usr/local/nagios/libexec/wppost -U user -P passe -p http://demo.monitoring-fr.org/wp-nagios/xmlrpc.php -t "$1 Service Alert: $3/$2 is $5" -i $
rm /tmp/wp-submit.txt
~~~

![:!:](../../../../lib/images/smileys/icon_exclaim.gif) Le contenu de ce
script peut largement être amélioré, donner un exemple avec un contenu
HTML, des catégories dynamiques pour gérer séparement les statut PROBLEM
et RECOVERY par exemple. La limite actuelle du module Perl est qu’il ne
gère pas les tags WordPress ce qui serait nettement plus pratique (on
voit les tags comme des catégories dynamiques dans ce cas). À suivre
donc…
