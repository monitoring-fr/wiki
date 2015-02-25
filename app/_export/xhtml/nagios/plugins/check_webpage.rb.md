---
layout: page
---

### Table des matières {.toggle}

-   [check\_webpage.rb](check_webpage.rb.html#check_webpagerb)
    -   [Fonctionalités](check_webpage.rb.html#fonctionalites)
    -   [Dépendances](check_webpage.rb.html#dependances)
    -   [Installation](check_webpage.rb.html#installation)

check\_webpage.rb {#check_webpagerb .sectionedit1}
=================

Le but de ce plugin nagios est de télécharger une page web avec tout ses
liens ( interne ).

Un processus fils est créé par ressource et toutes sont téléchargées en
parallèle.

-   Site:
    [nagios-check-webpage](http://code.google.com/p/nagios-check-webpage/ "http://code.google.com/p/nagios-check-webpage/")
-   Documentation:
    [DocumentationFr](http://code.google.com/p/nagios-check-webpage/wiki/DocumentationFr "http://code.google.com/p/nagios-check-webpage/wiki/DocumentationFr")

Fonctionalités {#fonctionalites .sectionedit2}
--------------

-   Petit script Ruby, facile à comprendre et modifier
-   http/https
-   Utilisation de la lib hpricot pour parser le html
-   Multi-threads
-   Recherche de mot clef
-   Suit les redirections

Dépendances {#dependances .sectionedit3}
-----------

-   Testé avec Ruby

o 1.8.6

~~~~ {.code}
        o 1.9.1p378 
  * hpricot
  * optiflag 
~~~~

Installation {#installation .sectionedit4}
------------

1.  Installer les dépendances sus-cités (par ex. sous linux avec le
    système de package de votre distribution).
2.  Télécharger la dernière version:
    [http://code.google.com/p/nagios-check-webpage/downloads/list](http://code.google.com/p/nagios-check-webpage/downloads/list "http://code.google.com/p/nagios-check-webpage/downloads/list")
3.  Copier le fichier ‘check\_webpage.rb’ dans le dossier où se trouve
    les autres plugins.
4.  Ajouter le plugin à votre conf nagios:

~~~~ {.code}
define command{
  command_name  check-webpage
  command_line  $USER1$/check_webpage.rb -u $ARG1$
}
~~~~
