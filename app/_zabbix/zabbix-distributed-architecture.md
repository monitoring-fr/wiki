---
layout: page
title: Architectures distribuées de Zabbix
---

Page rédigée pour une version Ubuntu 8.04/10.04 LTS et Zabbix 1.8.2.

Sur cette page, nous allons présenter les différentes architectures
distribuées possibles sur Zabbix, leurs fonctionnements, ainsi que leurs
procédures de mise en place.

Sources : site et wiki officiels de
[Zabbix](http://www.zabbix.com/ "http://www.zabbix.com/").

Cette page a été rédigée par :

  **Rôle**        **Nom**
  --------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------
  **Rédacteur**   [Ludovic VALENTIN](http://www.monitoring-fr.org/community/members/ludovic-valentin/ "http://www.monitoring-fr.org/community/members/ludovic-valentin/")

Présentation {#presentation .sectionedit3}
------------

Dans Zabbix, il existe trois types d’architectures distribuées : la
première architecture concerne l’usage des proxy (Zabbix Proxy) avec un
seul Zabbix Server, quant à la seconde, elle est constituée de multiples
serveurs Zabbix. Le troisième et dernier type d’architecture distribuée
de Zabbix est l’association des deux premiers, c’est-à-dire de tout
simplement combiner l’utilisation des proxy et des serveurs Zabbix.

Les Zabbix Proxy servent de collecteurs, de serveurs-relais avec les
Zabbix Server et permettent également de réduire la charge de travail
d’un serveur Zabbix. Ils ne peuvent pas être administrés comme un Zabbix
Server avec Zabbix Frontend. Les proxy se contentent en effet de relayer
les requêtes du serveur Zabbix aux agents.

L’usage des Zabbix Server permet quant à lui une administration locale
grâce notamment à l’interface Zabbix Frontend. Ils peuvent aussi servir
de collecteur, mais à un niveau supérieur que les Zabbix Proxy (car ils
disposent d’une interface web).

Pour plus d’informations sur les différentes **[architectures
distribuées](zabbix-work.html#distribuee "zabbix:zabbix-work")**.

Fonctionnement du mode distribué {#fonctionnement-du-mode-distribue .sectionedit4}
--------------------------------

en cours

Mise en place d'une architecture distribuée {#mise-en-place-d-une-architecture-distribuee .sectionedit5}
-------------------------------------------

Voici 2 tutoriels permettant de mettre en place des architectures
distribuées. La première procédure consiste à ajouter un Zabbix Proxy au
sein d’une architecture Zabbix (avec au minimum un serveur Zabbix).
Quant à la seconde, elle décrit les étapes à suivre pour ajouter un
serveur Zabbix supplémentaire.

Ces tutoriels peuvent être combinés afin de mettre en place une
architecture multi-serveur et multi-proxy.

### Ajout d'un proxy {#ajout-d-un-proxy .sectionedit6}

#### Pré-requis {#pre-requis}

Pour ajouter un Zabbix Proxy dans votre architecture, il vous faut dans
un premier temps un serveur Zabbix (composant Zabbix Server) avec bien
sûr le composant Frontend installé.

Voir la procédure d’installation de
**[Zabbix](zabbix-ubuntu-install.html "zabbix:zabbix-ubuntu-install")**.

Ensuite, il faut disposer d’un second serveur sur lequel est installé
l’application proxy de Zabbix, c’est-à-dire, le composant Zabbix Proxy.

Voir la procédure d’installation d’un **[Zabbix
Proxy](zabbix-ubuntu-install.html#zabbix-proxy1 "zabbix:zabbix-ubuntu-install")**.

Avant de commencer la procédure de mise en place d’un proxy, dans ce
tutoriel, on considère que l’ensemble des composants Zabbix précédemment
cités dans les pré-requis, sont installés et opérationnels.

Une fois ces pré-requis validés, la procédure d’ajout d’un proxy peut
enfin débuter.

#### Configuration d'un proxy {#configuration-d-un-proxy}

Première étape dans la mise en place d’un proxy (après son
installation), c’est le paramétrage. La configuration du Zabbix Proxy
est essentiel afin qu’il puisse notamment communiquer avec le serveur
Zabbix auquel il est va être rattaché.

Pour cela, dans le fichier de configuration du proxy, il faut s’assurer
qu’il lui est bien attribué un nom :

~~~
$ sudo vim /usr/local/zabbix/etc/zabbix_proxy.conf
~~~

On attribue donc un nom à notre proxy :

~~~ {.file}
Hostname=Zabbix Proxy B1
~~~

Ce nom `Hostname` ne correspond pas forcément au nom DNS du serveur sur
lequel est installé votre Zabbix Proxy. C’est une dénomination interne à
Zabbix.

Ensuite, on peut enregistrer les modifications de notre fichier
**zabbix\_proxy.conf**. Pour finir, on redémarre le Zabbix Proxy :

~~~
$ /usr/local/zabbix/sbin/zabbix_proxy –c /usr/local/zabbix/sbin/zabbix_proxy.conf
~~~

A ce stade, la configuration du Zabbix Proxy est terminée. Le reste de
la procédure de mise en place d’un proxy se fait maintenant dans
l’interface web de Zabbix.

#### Ajout d'un proxy {#ajout-d-un-proxy1}

Après avoir redémarrer le Zabbix Proxy, il ne reste plus qu’à le créer
dans l’interface du Zabbix Server. La création d’un proxy se fait dans
la page **Administration/DM**. Dans cette page il faut sélectionner
l’affichage des “Proxies” sur le côté, en haut à droite de la page, puis
on peut cliquer sur le bouton Create Proxy juste à côté :

[![](/assets/media/zabbix/zabbix-distributed-architecture_proxy-1.png@w=700)](/_detail/zabbix/zabbix-distributed-architecture_proxy-1.png@id=zabbix%253Azabbix-distributed-architecture.html "zabbix:zabbix-distributed-architecture_proxy-1.png")

Lorsque que vous avez cliqué sur le bouton de création d’un proxy, vous
devez visualiser une nouvelle page. Il s’agit de l’écran de
configuration d’un proxy :

[![](/assets/media/zabbix/zabbix-distributed-architecture_proxy-2.png@w=700)](/_detail/zabbix/zabbix-distributed-architecture_proxy-2.png@id=zabbix%253Azabbix-distributed-architecture.html "zabbix:zabbix-distributed-architecture_proxy-2.png")

Ici, il faut tout simplement le paramétrer en lui attribuant un nom. En
l’occurrence, on lui indique le nom que nous avons attribué au Zabbix
Proxy dans la partie précédente, dans le fichier de configuration
**zabbix\_proxy.conf**. Après, on sauvegarde la configuration pour
valider la création de notre proxy.

[![](/assets/media/zabbix/zabbix-distributed-architecture_proxy-3.png@w=700)](/_detail/zabbix/zabbix-distributed-architecture_proxy-3.png@id=zabbix%253Azabbix-distributed-architecture.html "zabbix:zabbix-distributed-architecture_proxy-3.png")

Voici le résultat de la création de notre Zabbix Proxy, dans la liste
affichée à l’écran, le nouveau proxy doit être visible :

[![](/assets/media/zabbix/zabbix-distributed-architecture_proxy-4.png@w=700)](/_detail/zabbix/zabbix-distributed-architecture_proxy-4.png@id=zabbix%253Azabbix-distributed-architecture.html "zabbix:zabbix-distributed-architecture_proxy-4.png")

La mise en place du proxy est enfin terminée. Peut alors débuter la
supervision d’un hôte par son intermédiaire.

#### Superviser un hôte avec un proxy {#superviser-un-hote-avec-un-proxy}

Maintenant, il est possible d’ajouter un hôte supervisé par
l’intermédiaire du Zabbix Proxy. On va donc utiliser notre Zabbix Proxy
en personne, sur lequel un Zabbix Agent est installé.

[![](/assets/media/zabbix/zabbix-distributed-architecture_proxy-5.png@w=700)](/_detail/zabbix/zabbix-distributed-architecture_proxy-5.png@id=zabbix%253Azabbix-distributed-architecture.html "zabbix:zabbix-distributed-architecture_proxy-5.png")

Il est également possible d’ajouter un hôte déjà crée. Pour cela, il
suffit tout simplement de l’ajouter comme membre depuis l’écran de
paramétrage du Zabbix Proxy concerné (voir la page
**Administration/DM**) :

[![](/assets/media/zabbix/zabbix-distributed-architecture_proxy-6.png@w=700)](/_detail/zabbix/zabbix-distributed-architecture_proxy-6.png@id=zabbix%253Azabbix-distributed-architecture.html "zabbix:zabbix-distributed-architecture_proxy-6.png")

En tout cas, voici le résultat dans l’écran de configuration des hôtes,
une fois l’usage d’un proxy ajouté à un hôte :

[![](/assets/media/zabbix/zabbix-distributed-architecture_proxy-7.png@w=700)](/_detail/zabbix/zabbix-distributed-architecture_proxy-7.png@id=zabbix%253Azabbix-distributed-architecture.html "zabbix:zabbix-distributed-architecture_proxy-7.png")

Autre résultat de la supervision d’un hôte par un proxy, dans la fenêtre
d’administration des Zabbix Proxy :

[![](/assets/media/zabbix/zabbix-distributed-architecture_proxy-8.png@w=700)](/_detail/zabbix/zabbix-distributed-architecture_proxy-8.png@id=zabbix%253Azabbix-distributed-architecture.html "zabbix:zabbix-distributed-architecture_proxy-8.png")

Le tutoriel de mise en place et d’usage d’un proxy est maintenant
terminé.

### Ajout d'un serveur {#ajout-d-un-serveur .sectionedit7}

#### Pré-requis {#pre-requis1}

Pour la mise en place d’un groupe de serveurs Zabbix, il faut en toute
logique au minimum 2 serveurs. Sur chacun de ses serveurs, doivent être
installés les composants Zabbix Server et Zabbix Frontend.

Voir la procédure d’installation de
**[Zabbix](zabbix-ubuntu-install.html "zabbix:zabbix-ubuntu-install")**.

Il y a un serveur central (parent) qui en plus de sa propre
configuration, a le contrôle total sur la configuration d’un serveur
enfant. Ce dernier reporte régulièrement ses évènements, ses historiques
et ses tendances auprès du serveur central.

Pour la procédure d’installation de l’architecture distribuée dit
“multi-serveur”, voici les paramètres que nous allons utiliser pour
illustrer ce tutoriel :

**Paramètre**

**Serveur central (parent)**

**Serveur enfant**

ID nœud

1

2

Adresse IP

192.168.1.100

192.168.1.200

Port

10051

10051

#### Configuration des serveurs

Tout d’abord, pour commencer il faut configurer nos 2 serveurs Zabbix
(Zabbix Server nœud 1 et 2).

##### Serveur parent

Pour débuter, on édite le fichier de configuration de notre Zabbix
Server parent :

~~~
$ sudo vim /usr/local/zabbix/etc/zabbix_server.conf
~~~

On lui attribue ensuite un ID, puis on sauvegarde notre fichier :

~~~ {.file}
NodeID=1
~~~

Ensuite, il faut convertir la base de données du Zabbix Server en
fonction de son NodeID :

Cette étape n’est à réaliser qu’une fois et doit être effectuée pour
chaque nœud Zabbix Server ajouté.

~~~
$ sudo /usr/local/zabbix/sbin/zabbix_server –n 1 –c /usr/local/zabbix/etc/zabbix_server.conf
~~~

On passe ensuite à la configuration du second serveur, c’est-à-dire
notre Zabbix Server enfant.

##### Serveur enfant

Pour le serveur enfant, il faut reproduire les mêmes étapes que pour le
serveur parent. Il faut juste lui attribuer son propre NodeID.

Donc on commence par édtier le fichier de configuration de notre Zabbix
Server enfant :

~~~
$ sudo vim /usr/local/zabbix/etc/zabbix_server.conf
~~~

On lui attribue ensuite un ID, puis on sauvegarde notre fichier :

~~~ {.file}
NodeID=2
~~~

Ensuite, il faut convertir la base de données du Zabbix Server en
fonction de son NodeID :

Cette étape n’est à réaliser qu’une fois et doit être effectuée pour
chaque nœud Zabbix Server ajouté.

~~~
$ sudo /usr/local/zabbix/sbin/zabbix_server –n 2 –c /usr/local/zabbix/etc/zabbix_server.conf
~~~

Maintenant on passe au paramétrage de nos 2 serveurs dans l’interface
web de Zabbix.

#### Ajout des serveurs

##### Serveur parent {#serveur-parent1}

Une fois la conversion de la base de données en fonction du NodeID
terminée, dans l’interface Zabbix doit alors apparaître une nouvelle
fonction dans le coin supérieur droit, à savoir la sélection des nœuds
(rafraîchir la page) :

[![](/assets/media/zabbix/zabbix-distributed-architecture_server-1.png@w=700)](/_detail/zabbix/zabbix-distributed-architecture_server-1.png@id=zabbix%253Azabbix-distributed-architecture.html "zabbix:zabbix-distributed-architecture_server-1.png")

Dans **Administration/DM**, il faut maintenant paramétrer le nœud local,
ici le serveur parent :

[![](/assets/media/zabbix/zabbix-distributed-architecture_server-2.png@w=700)](/_detail/zabbix/zabbix-distributed-architecture_server-2.png@id=zabbix%253Azabbix-distributed-architecture.html "zabbix:zabbix-distributed-architecture_server-2.png")

Pour cela cliquer sur **Local node** afin d’afficher la configuration du
nœud :

[![](/assets/media/zabbix/zabbix-distributed-architecture_server-3.png@w=700)](/_detail/zabbix/zabbix-distributed-architecture_server-3.png@id=zabbix%253Azabbix-distributed-architecture.html "zabbix:zabbix-distributed-architecture_server-3.png")

Ici, on peut alors renseigner les paramètres de notre nœud. Ensuite,
vous pouvez valider la configuration en cliquant sur le bouton **Save**
:

[![](/assets/media/zabbix/zabbix-distributed-architecture_server-4.png@w=700)](/_detail/zabbix/zabbix-distributed-architecture_server-4.png@id=zabbix%253Azabbix-distributed-architecture.html "zabbix:zabbix-distributed-architecture_server-4.png")

Notre nœud local est enfin paramétré :

[![](/assets/media/zabbix/zabbix-distributed-architecture_server-5.png@w=700)](/_detail/zabbix/zabbix-distributed-architecture_server-5.png@id=zabbix%253Azabbix-distributed-architecture.html "zabbix:zabbix-distributed-architecture_server-5.png")

Maintenant, il faut ajouter le second serveur, c’est-à-dire le Zabbix
Server enfant. Tout d’abord cliquez sur le bouton **New node**, on
visualise alors une nouvelle page de configuration d’un nœud :

[![](/assets/media/zabbix/zabbix-distributed-architecture_server-6.png@w=700)](/_detail/zabbix/zabbix-distributed-architecture_server-6.png@id=zabbix%253Azabbix-distributed-architecture.html "zabbix:zabbix-distributed-architecture_server-6.png")

On configure donc ce nouveau nœud selon les paramètres de notre serveur
enfant :

[![](/assets/media/zabbix/zabbix-distributed-architecture_server-7.png@w=700)](/_detail/zabbix/zabbix-distributed-architecture_server-7.png@id=zabbix%253Azabbix-distributed-architecture.html "zabbix:zabbix-distributed-architecture_server-7.png")

Après la sauvegarde des paramètres du second nœud, on peut alors voir
notre architecture prendre forme :

[![](/assets/media/zabbix/zabbix-distributed-architecture_server-8.png@w=700)](/_detail/zabbix/zabbix-distributed-architecture_server-8.png@id=zabbix%253Azabbix-distributed-architecture.html "zabbix:zabbix-distributed-architecture_server-8.png")

Il ne reste plus qu’à reproduire la même procédure sur le serveur
enfant.

##### Serveur enfant {#serveur-enfant1}

De la même manière que sur le serveur parent (Central), dans l’interface
Zabbix de notre nœud enfant doit alors apparaître une nouvelle fonction
dans le coin supérieur droit, à savoir la sélection des nœuds
(rafraîchir la page) :

[![](/assets/media/zabbix/zabbix-distributed-architecture_server-1.png@w=700)](/_detail/zabbix/zabbix-distributed-architecture_server-1.png@id=zabbix%253Azabbix-distributed-architecture.html "zabbix:zabbix-distributed-architecture_server-1.png")

Dans **Administration/DM**, il faut maintenant paramétrer le nœud local,
ici le serveur enfant :

[![](/assets/media/zabbix/zabbix-distributed-architecture_server-2.png@w=700)](/_detail/zabbix/zabbix-distributed-architecture_server-2.png@id=zabbix%253Azabbix-distributed-architecture.html "zabbix:zabbix-distributed-architecture_server-2.png")

Pour cela cliquer sur **Local node** afin d’afficher la configuration du
nœud :

Comme pour le serveur parent à ce stade, vous pouvez remarquer que l’
`Id` est différent. Le champs correspondant étant automatiquement
paramétré selon le `NodeID` indiqué auparavant dans le fichier de
configuration. C’est une manière de vérifier que l’attribution d’un ID
pour ce serveur, a bien été pris en compte.

[![](/assets/media/zabbix/zabbix-distributed-architecture_server-9.png@w=700)](/_detail/zabbix/zabbix-distributed-architecture_server-9.png@id=zabbix%253Azabbix-distributed-architecture.html "zabbix:zabbix-distributed-architecture_server-9.png")

Ici, on peut alors renseigner les paramètres de notre nœud. Ensuite,
vous pouvez valider la configuration en cliquant sur le bouton **Save**
:

[![](/assets/media/zabbix/zabbix-distributed-architecture_server-10.png@w=700)](/_detail/zabbix/zabbix-distributed-architecture_server-10.png@id=zabbix%253Azabbix-distributed-architecture.html "zabbix:zabbix-distributed-architecture_server-10.png")

Notre nœud local est enfin paramétré :

[![](/assets/media/zabbix/zabbix-distributed-architecture_server-11.png@w=700)](/_detail/zabbix/zabbix-distributed-architecture_server-11.png@id=zabbix%253Azabbix-distributed-architecture.html "zabbix:zabbix-distributed-architecture_server-11.png")

Maintenant, il faut ajouter le second serveur, c’est-à-dire le Zabbix
Server parent. Tout d’abord cliquez sur le bouton **New node**, on
visualise alors une nouvelle page de configuration d’un nœud :

[![](/assets/media/zabbix/zabbix-distributed-architecture_server-6.png@w=700)](/_detail/zabbix/zabbix-distributed-architecture_server-6.png@id=zabbix%253Azabbix-distributed-architecture.html "zabbix:zabbix-distributed-architecture_server-6.png")

On configure donc ce nouveau nœud selon les paramètres de notre serveur
parent :

[![](/assets/media/zabbix/zabbix-distributed-architecture_server-12.png@w=700)](/_detail/zabbix/zabbix-distributed-architecture_server-12.png@id=zabbix%253Azabbix-distributed-architecture.html "zabbix:zabbix-distributed-architecture_server-12.png")

Après la sauvegarde des paramètres du second nœud, on peut alors voir
notre architecture prendre forme :

[![](/assets/media/zabbix/zabbix-distributed-architecture_server-13.png@w=700)](/_detail/zabbix/zabbix-distributed-architecture_server-13.png@id=zabbix%253Azabbix-distributed-architecture.html "zabbix:zabbix-distributed-architecture_server-13.png")

Les nœuds sont enfin paramétrés, ce qui permet maintenant à notre
architecture Zabbix de fonctionner en mode distribué.

#### Utilisation des serveurs

Une fois la configuration des nœuds terminée. On peut enfin utiliser
notre architecture distribuée.

Dans un premier temps, nous allons effectuer un redémarrage de nos
Zabbix Server (sur les serveurs parent et enfant) :

~~~
$ /usr/local/zabbix/sbin/zabbix_server –c /usr/local/zabbix/etc/zabbix_server.conf
~~~

Puis on retourne sur l’interface de notre serveur parent. Maintenant, il
doit être possible de jongler entre la visualisation des différents
nœuds dans l’interface (rafraîchir la page) :

[![](/assets/media/zabbix/zabbix-distributed-architecture_server-use-1.png@w=300)](/_detail/zabbix/zabbix-distributed-architecture_server-use-1.png@id=zabbix%253Azabbix-distributed-architecture.html "zabbix:zabbix-distributed-architecture_server-use-1.png")

Il peut être nécessaire de cliquer une première fois sur le bouton
`Select Nodes` juste à côté pour sélectionner les nœuds à afficher
(filtres).

Il en est de même sur le serveur enfant, à la différence qu’il ne peut
afficher que sa propre configuration (ou plus tard, éventuellement ses
propres nœuds enfants).

[![](/assets/media/zabbix/zabbix-distributed-architecture_server-use-2.png@w=250)](/_detail/zabbix/zabbix-distributed-architecture_server-use-2.png@id=zabbix%253Azabbix-distributed-architecture.html "zabbix:zabbix-distributed-architecture_server-use-2.png")

En tout cas, à partir du nœud central (parent), il donc maintenant
possible de visualiser les évènements provenant du serveur enfant, et
même de réaliser l’ensemble des différentes tâches de configuration d’un
serveur Zabbix comme par exemple l’ajout d’un hôte à superviser, …etc.
Le tout sans avoir besoin de se connecter à l’interface du serveur
enfant.