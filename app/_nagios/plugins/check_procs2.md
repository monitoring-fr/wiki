---
layout: page
title: check\_procs2
---

check\_procs2 est un plugin Solaris.

Présentation et Utilisation {#presentation-et-utilisation .sectionedit2}
---------------------------

Quel peut être l’intéret d’un
[check\_procs2](http://www.nagiosexchange.org/cgi-bin/jump.cgi?ID=2100;d=1 "http://www.nagiosexchange.org/cgi-bin/jump.cgi?ID=2100;d=1")
si l’on a un check\_procs basique et disponible dans les plugins Nagios.
L’avantage est simple et évident, il peut interroger plusieurs processus
en même temps. Son fonctionnement est tout aussi simple puisqu’il suffit
de connaitre le principe modale des opérandes classiques et de les
disposer convenablement.

Ces opérandes sont:

-   ge pour Ggreater or equal ( \> = )
-   gt pour greater than ( \> )
-   le pour less or equal ( \< = )
-   lt pour less than ( \< )
-   eq pour equal ( = )

Ensuite il ne vous reste plus qu’à utiliser convenablement le plugin:

~~~
check_procs2 telnet ge 3
~~~

Layout type {#layout-type .sectionedit3}
-----------

Les layout types se définissent suivant deux modèles :

~~~
PROCS CRITICAL: 149 processes - telnet: 2/3
~~~

Dans un premier temps vous avez l’état de votre supervision. Puis vous
pouvez voir le décompte global des processus en cours de fonctionnement
sur le serveur. Pour finir, vous obtenez plus d’information sur la
supervision que vous venez d’effectuer. Ici telnet devait posséder au
moins trois instances (selon commande vu en haut), alors que seul deux
sont en cours sur le serveur.

Le deuxième type de layout est le suivant:

~~~
PROCS OK: 149 processes - no problems found
~~~

Pour cet exemple nous avons demandé si il y avait au moins 2 instances
du processus telnet. La condition étant validée, le plugin nous retourne
“no problem found” en guise d’explication.

NB: Dans le cas ou vous supervisiez plusieurs processus dans une seule
commande check\_procs. Un détail des différents processus vous est donné
dans le layout. L’état de la supervision est lui guidé par le premier
processus qui ne respecte pas la condition exigée.

Modification du plugin {#modification-du-plugin .sectionedit4}
----------------------

Nous l’avons vu, ce plugins fonctionne très bien et répond à un besoin
concret. Toutefois il ne se plie pas forcément aux dernières
technologies. A l’heure actuelle, Solaris à fortement initié un projet
de virtualisations de poste de travail dans sa version 10 de Solaris.
(SunOS 5.10). Le principe de virtualisation est qu’il existe une zone
globale qui contient des zones container (pardon pour l’explication plus
que sommaire). Ce qu’il faut retenir c’est que si vous exécutez
check\_procs2 dans votre zone globale, votre résultat sera corrompu par
les processus qui tournent dans vos zones container, et il vous sera
donc difficile d’adapter votre supervision. Nous allons donc modifier le
plugin check\_procs2 à cet effet: Fait moi un beau petit vi de votre
check\_procs2 et rendez-vous à la ligne demandée. Avant:

~~~
open PS, "/usr/bin/ps -e -o comm |";
~~~

Après:

~~~
open PS, "/usr/bin/ps -fz global -o comm |";
~~~

Vous pourrez dès lors ne voir que les processus de votre zone globale
sans vous souciez des autres (qui devraient naturellement être
superviser en tant qu’OS à part entière)