---
layout: page
---

### Table des matières {.toggle}

-   [Comment activer et utiliser le module
    livestatus](enable_livestatus_module.html#comment-activer-et-utiliser-le-module-livestatus)
    -   [Définir le module
        livestatus](enable_livestatus_module.html#definir-le-module-livestatus)
    -   [Activer le module
        livestatus](enable_livestatus_module.html#activer-le-module-livestatus)
    -   [Désactiver human readable
        logs](enable_livestatus_module.html#desactiver-human-readable-logs)

Comment activer et utiliser le module livestatus {#comment-activer-et-utiliser-le-module-livestatus .sectionedit1}
================================================

Définir le module livestatus {#definir-le-module-livestatus .sectionedit2}
----------------------------

Commencez par examiner le fichier /etc/shinken/shinken-specific.cfg pour
ce module:

~~~~ {.code}
define module{
       module_name      Livestatus
       module_type      livestatus
       host             *       ; * = listen on all configured IP addresses
       port             50000   ; port to listen on
       database_file    /var/lib/shinken/livestatus.db
}
~~~~

Avec ces paramètres:

-   module\_name: nom du module appelé par les brokers
-   module\_type: livestatus
-   host: interface IP à écouter. La valeur par défaut est \*, ce qui
    signifie « écouter sur toutes les interfaces. »
-   Port: le port TCP à écouter.
-   socket: socket Unix à écouter.
-   database\_file: le chemin vers le fichier de base de données SQLite
    qui est utilisé pour stocker les logs Broks/messages. La valeur par
    défaut est « var/livelogs.db »
-   max\_logs\_age: temps de rétention maximum des messages de log
    (avant qu’ils ne soient supprimés de la base de données). La valeur
    par défaut est de 1 an. L’argument de ce paramètre prend la forme
    \<numéro\> [\<period de temp\>], où \<period de temp\> peut être d
    pour les jours, w pour les semaines, m pour les mois et y les
    années.
-   allowed\_hosts: une liste séparée par des virgules des adresses IP
    qui sont autorisés à communiquer avec le port TCP. S’il vous plaît
    gardez à l’esprit que ceux-ci doivent être des adresses IP, PAS des
    noms d’hôte. Parce qu’une recherche DNS pour chaque requête entrante
    livestatus pourrait avoir de la latence et donc bloquer le module.

Activer le module livestatus {#activer-le-module-livestatus .sectionedit3}
----------------------------

Toujours dans le fichier /etc/shinken/shinken-specific.cfg , trouver le
broker objet et ajouter « livestatus » à ses «modules»:

~~~~ {.code}
define broker{
       broker_name      broker-1
[...]
       modules          Simple-log,Livestatus
}
~~~~

Désactiver human readable logs {#desactiver-human-readable-logs .sectionedit4}
------------------------------

Dans le fichier /etc/shinken/nagios.cfg, vérifiez que l’option
human\_timestamp\_log est réglé sur 0.

Dans la version 0.6.5, vous ne pouvez pas avoir en même temps un simple
fichier-journal avec horodatage lisible par un humain et une base de
données livestatus.
