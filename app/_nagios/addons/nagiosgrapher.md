---
layout: page
title: NagiosGrapher
---

NagiosGrapher est certainement le module de génération de graphes le
plus populaire pour Nagios en attendant la montée en puissance de PNP à
l’approche de la version 1.0. Il est cependant plus difficile à
installer et appréhender que PNP. C’est un programme écrit en Perl. Il
est par contre intéressant dans certaines installations où les plugins
exécutant les contrôles ne sont pas écrits en respectant les
recommandations. NagiosGrapher sait en effet récupérer les valeurs de
performance dans la première partie de la sortie d’un contrôle; celle
avant le symbole du tube. Il y arrive en utilisant des expressions
régulières Perl (regexp). La contrepartie est que les valeurs relevées
sont moins précises que celles fournies après le symbole du tube.

Pour pouvoir être installé, NagiosGrapher nécessite un nombre non
négligeable de modules Perl dont la liste est heureusement fournie.

~~~
CGI 
CGI::Carp 
Calendar::Simple 
Carp        
Data::Dumper 
File::Basename 
File::Copy 
GD 
IO::Handle 
Image::Magick 
RRDs 
Storable 
Time::HiRes 
Time::Local 
URI::Escape
~~~

Après avoir récupéré les sources de NagiosGrapher sur
[sourceforge.net](http://sourceforge.net/projects/nagiosgrapher/ "http://sourceforge.net/projects/nagiosgrapher/"),
il faut les décompresser et passer la commande

~~~
autoconf 
~~~

Ceci génère un fichier configure qu’il faut alors appeler

~~~
configure 
~~~

Configure renverra des erreurs si les dépendances de modules Perl ne
sont pas satisfaites. Pour connaître le nom des module qu’il manque, il
est possible de taper

~~~
make testdeps 
~~~

Si vous êtes sur une distribution de type Debian comme notre Ubuntu,
vous pouvez installer l’ensemble de ces modules Perl avec la commande
apt-get suivante

~~~
apt-get install autoconf rrdtool perl perl-base perl-modules libcalendar-simple-perl libgd-gd2-perl perlmagick librrds-perl liburi-perl 
~~~

Après avoir contrôlé que nous disposons de tous les modules nécessaires,
un simple make install suffit

~~~
make install 
~~~

NagiosGrapher est alors installé en /usr/local/nagios/contrib. Les
fichiers de configuration sont eux installés dans
/usr/local/nagios/etc/ngraph.d. NagiosGrapher possède plusieurs modes de
fonctionnement quand il s’agit de traiter les données. Il peut
travailler à partir d’un fichier à plat, un fichier de pipe ou en réseau
grâce à un écho UDP. La première chose à faire est donc de choisir la
méthode qui sera utilisée pour traiter les données. De ce choix dépend
la configuration qu’il faut appliquer à Nagios. Pour notre exemple, nous
allons prendre le mode par défaut qui est le mode fichier à plat. Nous
somme alors dans la cas vu plus haut de service\_perfdata\_file. Nous
allons donc ajouter ces lignes dans nagios.cfg pour passer dans ce cas.

~~~
    cfg_dir=/usr/local/nagios/etc/serviceext 
    process_performance_data=1 
    service_perfdata_file=/usr/local/nagios/var/service-perfdata 
    service_perfdata_file_template=$HOSTNAME$   $SERVICEDESC$   $SERVICEOUTPUT$ $SERVICEPERFDATA$   $TIMET$ 
    service_perfdata_file_mode=a 
    service_perfdata_file_processing_interval=30 
    service_perfdata_file_processing_command=process-service-perfdata-file
~~~

L’ensemble des explications ayant été donnée plus haut, la seule
directive à expliquer reste cfg\_dir=/usr/local/nagios/etc/serviceext .
NagiosGrapher stocke dans ce répertoire les définitions d’informations
étendues de services dont un exemple ci-dessous

~~~
# ExtInfo for www.cms-fr.net, DNS_SERVER 
define serviceextinfo{ 
        host_name               www.cms-fr.net 
        icon_image               dot.png' alt="" border="0"></a><A TARGET="_blank" HREF="graphs.cgi?host=www.cms-fr.net&service=DNS_SERVER"><img src="nagios/images/logos/graph.png"
        service_description     DNS_SERVER 
}
~~~

Cette information permet d’avoir dans l’interface web de Nagios une
icône affichée auprès des services possédant des graphiques de tendance.
C’est pourquoi nous avons ajouté la directive cfg\_dir supplémentaire de
façon à ce que ces définitions soient prise en compte par Nagios.

[![](..//assets/media/addons/nagiosgrapher-console.png@w=700)](..//_detail/addons/nagiosgrapher-console.png@id=nagios%253Aaddons%253Anagiosgrapher.html "addons:nagiosgrapher-console.png")

L’icône à gauche de l’état OK indique la présence d’un graphique de
tendance pour le service. Un clic sur cette icône affiche le graphique
correspondant.

Maintenant que le fichier nagios.cfg est configuré, il reste à créer la
commande process-service-perfdata-file . Nous écrivons donc le contenu
suivant dans un fichier process-service-perfdata-file .cfg.

~~~
    define command{ 
            command_name process-service-perfdata-file 
            command_line mv /usr/local/nagios/var/service-perfdata /usr/local/nagios/var/service-perfdata.$TIMET$ 
            }
~~~

Comme nous le supposions dans les explications plus haut, la commande
est un simple déplacement du fichier suffixé de la date et heure au
format epoch. Le rôle de Nagios se termine ici. Ce qui suit ce
déplacement est le travail de NagiosGrapher.

![FIXME](../../lib/images/smileys/fixme.gif) A compléter par la
configuration de nagiosgrapher

Il existe beaucoup d’autres modules de génération de graphiques pour
Nagios. Des plus anciens, perfparse au plus récent StoreMe du projet
Vigilo. Il n’est pas possible de tous les aborder dans le cadre de cette
ouvrage d’autant que les différences sont parfois minimes. Il reste
néanmoins possible de distinguer NagiosGraph, réputé mais plus trop mis
à jour et dont la notoriété va minimisante. N2RRD (Nagios To RRD) est un
cas à part puisqu’il ne propose pas d’interface de consultation,
laissant ce soin à des outils spécialisés comme Cacti ou Drraw. Sans
oublier la “bombe” à venir quand le projet sera plus avancée et qui
n’est autre que le successeur de NagiosGrapher; à savoir [NetWays
Grapher](https://www.nagiosforge.org/gf/project/netwaysgrapher/ "https://www.nagiosforge.org/gf/project/netwaysgrapher/")