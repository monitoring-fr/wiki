====== check_webpage.rb ======

Le but de ce plugin nagios est de télécharger une page web avec tout ses liens ( interne ).

Un processus fils est créé par ressource et toutes sont téléchargées en parallèle. 

    * Site: [[http://code.google.com/p/nagios-check-webpage/|nagios-check-webpage]]
    * Documentation: [[http://code.google.com/p/nagios-check-webpage/wiki/DocumentationFr|DocumentationFr]]

===== Fonctionalités =====

    * Petit script Ruby, facile à comprendre et modifier
    * http/https
    * Utilisation de la lib hpricot pour parser le html
    * Multi-threads
    * Recherche de mot clef
    * Suit les redirections 

===== Dépendances =====

    * Testé avec Ruby
          o 1.8.6
          o 1.9.1p378 
    * hpricot
    * optiflag 

===== Installation =====

  - Installer les dépendances sus-cités (par ex. sous linux avec le système de package de votre distribution).
  - Télécharger la dernière version: http://code.google.com/p/nagios-check-webpage/downloads/list
  - Copier le fichier 'check_webpage.rb' dans le dossier où se trouve les autres plugins.
  - Ajouter le plugin à votre conf nagios:
<code>
define command{
  command_name  check-webpage
  command_line  $USER1$/check_webpage.rb -u $ARG1$
}
</code>