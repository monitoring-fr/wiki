---
layout: page
title: check\_http
---

check\_http permet de vérifier la disponibilité d’un service web.

Hôtes virtuels {#hotes-virtuels .sectionedit2}
--------------

Rien de plus simple que de superviser des hôtes virtuels apache
configurés sur une seule adresse IP. Cette solution a été fournie par
Marc Powell à la liste anglophone des utilisateurs Nagios. Il suffit de
“jouer” avec les paramètres -I et -H de la commande.

On définit d’abord la commande http\_vhost

~~~
define command{
command_name http_vhost
Command_line $USER1$/check_http -I $HOSTADDRESS$ -H $ARG1$ <vos autres param>
}
~~~

On définit notre serveur apache et son adresse IP

~~~
define host{
host_name web_server
address 192.168.1.2
...
}
~~~

Enfin, on définit un service par hôte virtuel Apache

~~~
define service{
host_name webserver
service_description web site 1
check_command http_vhost!www.site1.example
...
}

define service{
host_name webserver
service_description web site 2
check_command http_vhost!www.site2.example
...
}
~~~