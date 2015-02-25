---
layout: page
---

### Table des matières {.toggle}

-   [Webinject](webinject.html#webinject)
    -   [Installation](webinject.html#installation)
    -   [Configuration de
        Webinject](webinject.html#configuration-de-webinject)
    -   [Configuration de Nagios pour
        Webinject](webinject.html#configuration-de-nagios-pour-webinject)

Webinject {#webinject .sectionedit1}
=========

Webinject est un logiciel libre permettant d’effectuer des tests
automatisés de services ou d’applications web. Il peut être utilisé pour
tester individuellement les composants d’un système ayant une interface
HTTP comme les services JSP, ASP, CGI, PHP, Servlets, HTML Forms,
XML/SOAP Web Services… et pour créer des suites complètes de tests de
type fonctionnels, regressifs au niveau du protocole HTTP. Une suite de
test peut comprendre un ou plusieurs cas de test et permet de les
collecter et de les reporter ensemble en une suite logique. Webinject
délivre ses résultats en temps réel et peut aussi être utilisé pour
mesurer les temps de réponse applicatifs. Il peut bien sûr s’interfacer
avec Nagios.

Ce tutoriel a été réalisé par :

  **Rôle**        **Nom**
  --------------- -------------
  **Rédacteur**   Olivier JAN

Installation {#installation .sectionedit3}
------------

L’installation est aussi simple que de décompacter l’archive source et
de placer le dossier résultant de ce décompactage dans
/usr/local/nagios/libexec. Il convient aussi de s’assurer que les
dépendance perl requises sont bien présentes. les dépendances requises
sont les suivantes :

-   LWP
-   HTTP::Request::Common
-   HTTP::Cookies
-   XML::Simple
-   Time::HiRes
-   Getopt::Long
-   Crypt::SSLeay
-   XML::Parser
-   Error

Configuration de Webinject {#configuration-de-webinject .sectionedit4}
--------------------------

Pour chaque suite de tests à effectuer, il faut avoir deux fichiers de
configuration. Le premier contient les options d’exécution des tests et
le deuxième contient les définitions des tests à effectuer. Ces fichiers
sont au format XML et donc plutôt très lisibles.

~~~
<testcasefile>nagioscases.xml</testcasefile>
<globalhttplog>onfail</globalhttplog>
<timeout>10</timeout>
<globaltimeout>20</globaltimeout>
<reporttype>nagios</reporttype>
<proxy>http://157.150.100.4:80</proxy>
~~~

Le fichier d’exemple ci-dessus précise que le fichier de configuration
des tests à charger est le fichier nagioscases.xml situé dans le même
répertoire que celui-ci. Est également précisé une limite de temps pour
l’exécution ainsi qu’un serveur proxy pour pouvoir se connecter vers
Internet. L’option reporttype permet de formater la sortie des tests
dans un format compatible Nagios.

Voyons maintenant le contenu du fichier nagioscases.xml

~~~
<testcases repeat="1">

<case
    id="1"
    description1="Présence du site expertise"
    description2="Vérification de centre national de conseil dans la page"
    method="get"
    url="http://expertise.gfi.fr/"
    verifypositive="centre national de conseil"
/>

<case
    id="2"
    description1="Présence de la page du pôle supervision"
    description2="Vérification du mot supervision dans la page"
    method="get"
    url="http://expertise.gfi.fr/index.php?id=158"
    verifypositive="supervision"
/>

</testcases>
~~~

Ci-dessus deux règles simples permettant de vérifier la disponibilité
d’une page web et de vérifier la présence de chaînes de caractères dans
cette page.

[webinject-drupal.zip](../../../../assets/media/webinject-drupal.zip "webinject-drupal.zip")
sont des fichiers de configuraton Webinject prêts à l’emploi pour tester
Drupal.

Configuration de Nagios pour Webinject {#configuration-de-nagios-pour-webinject .sectionedit5}
--------------------------------------

Il faut d’abord définir la commande qui permet d’appeler webinject

~~~
define command {
    command_name    check_webinject
    command_line    /usr/bin/perl $USER1$/webinject/webinject.pl -c $ARG1$ $ARG2$
}
~~~

Webinject n’étant pas compatible pour l’instant avec le mode ePN de
Nagios, il faut précéder l’appel par le chemin complet de Perl de façon
à désactiver cette fonction.

Il est aussi possible d’éditer
/usr/local/nagios/libexec/webinject/webinject.pl et d’ajouter quelque
part dans les dix premières lignes du script

~~~
# nagios: -epn
~~~

Ensuite, il suffit de définir un ou plusieurs services

~~~
define service{
        use                             actif-generic
        hostgroup_name                  LINUX
        service_description             HTTP_SCENARIO
        check_command                   check_webinject!config-nagios.xml!nagioscases.xml
        }
~~~

Ce service utilise le gabarit actif-generic, s’applique au groupe
d’hôtes LINUX. Il s’appelle HTTP\_SCENARIO et appelle la commande
check\_webinject définie plus haut en lui passant en paramètres les deux
fichiers de configuration nécessaire à l’exécution.
