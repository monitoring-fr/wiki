---
layout: page
---

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

~~~~ {.code}
$ sudo wget http://www.monitoringexchange.org/cgi-bin/jump.cgi?ID=2287&view=File1;d=1

$ sudo cp check_prelude.pl /usr/local/nagios/libexec
~~~~

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

~~~~ {.code}
$ sudo mkdir /usr/local/nagios/etc/prelude
$ sudo vim /usr/local/nagios/etc/prelude/prelude.cfg
~~~~

Et dans ce fichier, éditer la commande, le service et l’hôte.

~~~~ {.code}
define command {
    command_name    check_prelude
    command_line    /usr/bin/perl /usr/local/nagios/libexec/check_prelude.pl $ARG1$ $ARG2$
}
~~~~

Ici, l’utilisation de la commande (command\_line) nécessite de préciser
le chemin vers perl, afin de lancer correctement le plugin
check\_prelude. Sinon, le service apparaîtra en UNKNOWN dans l’interface
web de Nagios. C’est un problème venant d’une erreur ePN (ePN étant le
module d’interprétation Perl de Nagios lui-même. Il peut s’avérer
instable avec certains scripts).

~~~~ {.code}
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
~~~~

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

~~~~ {.code}
cfg_dir=/usr/local/nagios/etc/prelude
~~~~

### check\_prelude.pl {#check_preludepl .sectionedit7}

La configuration du serveur n’est pas encore finie, en effet, le
check\_prelude avant d’être opérationnel, doit être correctement
paramétré pour pouvoir s’authentifier auprès du serveur MySQL de
Prelude. Il faut éditer le fichier check\_prelude et y ajouter les
paramètres MySQL.

Attention : ne pas oublier de configurer votre base de données MySQL sur
le serveur Prelude, pour accepter les connexions du plugin depuis un
hôte distant (serveur Nagios).

~~~~ {.code}
$ sudo vim /usr/local/nagios/libexec/check_prelude.pl
~~~~

~~~~ {.code}
### database access

use constant DBNAME => "prelude";
use constant DBHOST => "xx.xx.xx.xx";
use constant DBUSER => "prelude";
use constant DBPASS => "manager";
~~~~

A ce stade, la configuration de Nagios pour récupérer les alertes de
Prelude est terminée. Il n’y a plus qu’à (re)lancer Nagios.
