---
layout: page
title: Catalogues des erreurs dans Zabbix
---

Page rédigée pour une version Ubuntu 10.04 LTS et Zabbix 1.8.3.

Sur cette page figure différentes erreurs rencontrées dans l’usage de
Zabbix, ainsi que les astuces et procédures à suivre pour les résoudre.
**Toutes les erreurs et leurs solutions ne sont pas répertoriées ici !**
Il s’agit d’un catalogue d’erreurs non-exhaustif, alimenté au fur et à
mesure des différentes expériences des membres de la communauté sur
Zabbix.

Pour toutes questions, informations complémentaires sur la résolution
d’erreurs dans Zabbix, rendez-vous sur le
[forum](http://forums.monitoring-fr.org/ "http://forums.monitoring-fr.org/")
du site.

Cette page a été réalisée par :

  **Rôle**        **Nom**
  --------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------
  **Rédacteur**   [Ludovic VALENTIN](http://www.monitoring-fr.org/community/members/ludovic-valentin/ "http://www.monitoring-fr.org/community/members/ludovic-valentin/")

Problème de check ICMP Ping {#probleme-de-check-icmp-ping .sectionedit3}
---------------------------

Lors de l’utilisation de la fonction de découverte d’équipement de
Zabbix, notamment avec l’usage des checks ICMP Ping, il est possible que
la découverte ne fonctionne pas et ne génère donc aucun résultat.

### Solution {#solution .sectionedit4}

Il faut tout d’abord installer l’utilitaire **fping** :

~~~
$ sudo apt-get install fping
~~~

Maintenant il est nécessaire de configurer le serveur Zabbix pour
utiliser **fping**. Pour cela, il suffit d’indiquer le chemin d’accès à
l’utilitaire dans le fichier de configuration du Zabbix Server :

~~~
$ sudo vim /usr/local/zabbix/etc/zabbix_server.conf
~~~

L’utilitaire **fping** s’étant installé par défaut dans **/usr/bin/**,
voici donc le champ à éditer :

~~~ {.file}
FpingLocation=/usr/bin/fping
~~~

Après avoir sauvegardé le fichier de configuration de Zabbix Server, on
attribue les droits nécessaires à l’utilisation de **fping** pour
l’utilisateur zabbix :

~~~
$ sudo chown root:zabbix /usr/bin/fping
$ sudo chmod 710 /usr/bin/fping
$ sudo chmod ug+s /usr/bin/fping
~~~

Pour finir, il ne reste plus qu’à redémarrer le serveur Zabbix. Les
check ICMP Ping sont normalement opérationnels. Les règles de
découvertes devraient maintenant fonctionner.

Zabbix server is running : No {#zabbix-server-is-runningno .sectionedit5}
-----------------------------

Dans l’interface de Zabbix, si le tableau de bord affiche que le serveur
Zabbix n’est pas démarré alors qu’il est pourtant bien actif (la
commande `ps aux | grep zabbix` devrait vous permettre de le vérifier).
L’erreur peut venir de l’adresse IP indiquée dans le fichier de
configuration de Zabbix Frontend.

### Solution {#solution1 .sectionedit6}

Pour résoudre ce problème, il suffit en fait de remplacer l’adresse IP
qui est précisée dans le fichier de configuration de l’interface :

~~~
$ sudo vim /usr/local/zabbix/frontend/conf/zabbix.conf.php
~~~

Lors de l’installation de Zabbix Frontend, le champ \$ZBX\_SERVER
indique par défaut `‘localhost`’ (ou 127.0.0.1). Il faut tout simplement
remplacer ce champ par l’adresse IP réelle du serveur au lieu du
loopback.

~~~ {.file}
$ZBX_SERVER = '192.168.1.100';
~~~

Après un redémarrage du serveur Apache est nécessaire pour prendre en
compte la modification :

~~~
$ sudo /etc/init.d/apache2 restart
~~~

Normalement l’interface de Zabbix devrait maintenant afficher que le
serveur fonctionne avec un **Zabbix server is running : Yes** dans le
tableau de bord.

Impossible de charger une image {#impossible-de-charger-une-image .sectionedit7}
-------------------------------

Le chargement d’une image dans l’interface de Zabbix, notamment pour
changer des icônes ou encore pour un fond de carte, est impossible car
elle ne s’affiche pas dans l’interface, à la place il y a une erreur.

### Solution {#solution2 .sectionedit8}

Le problème peut venir de 2 causes. Tout d’abord, il faut s’assurer
d’avoir bien créer une base de données Zabbix avec un character set de
type **UTF8**.

Ensuite, il est indispensable d’avoir téléchargé le paquet suivant pour
le support des images (png, …) :

~~~
$ sudo apt-get install php5-gd
~~~

Après le redémarrage des serveurs Zabbix et Apache, l’affichage de
l’image ne devrait plus causer d’erreur.

Apache is not running on {HOSTNAME} {#apache-is-not-running-on-hostname .sectionedit9}
-----------------------------------

Il est possible que le serveur Apache soit toujours indiqué comme étant
non démarré (ou non actif) sur un hôte supervisé, notamment pour le
Zabbix Server. Or l’interface web fonctionne, et la commande ps aux |
grep apache prouve aussi le contraire, c’est-à-dire que Apache est bel
et bien démarré.

### Solution {#solution3 .sectionedit10}

Ce problème provient du template attribué pour l’hôte concerné. Dans le
cas du template “Template\_Linux” utilisé par défaut pour le serveur
Zabbix, l’item correspondant au contrôle du démarrage du serveur Apache,
soit **Number of running processes apache** dans l’interface, est en
fait pas parfaitement adapté. Cela est dû au système d’exploitation sur
lequel tourne le service Apache. En effet, le nom des processus d’Apache
sous Ubuntu n’est pas httpd mais **apache2**. Or l’item check la
présence de processus nommés httpd sur différentes distribution Linux.

Pour régler ce problème, il faut éditer l’item dans le template
**Template\_Linux** et remplacer la valeur **httpd** par **apache2**.
Voici donc la clé (champ intitulé **Key**) à mettre :

~~~
proc.num[apache2,www-data]
~~~

Après avoir enregistré la modification, le trigger associé à cet item
devrait maintenant indiquer que celui-ci est bien démarré.