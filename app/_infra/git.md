---
layout: page
title: Mise en place d'un système de contrôle de version GIT sous unbuntu server 10.10
---

[![](../assets/media/infra/infra/git/git-logo.png)](../_detail/infra/infra/git/git-logo.png@id=infra%253Agit.html "infra:infra:git:git-logo.png")

Introduction {#introduction .sectionedit2}
------------

Git est un logiciel de gestion de versions décentralisé. C’est un
logiciel libre créé par Linus Torvalds, le créateur du noyau Linux, et
distribué sous la GNU GPL version 2.

-   Le site officiel de git est disponible à cette adresse :
    [http://git-scm.com/](http://git-scm.com/ "http://git-scm.com/")
-   Une trés bonne ressource documentaire sur git :
    [http://progit.org/book/](http://progit.org/book/ "http://progit.org/book/")

Objectifs {#objectifs .sectionedit3}
---------

L’objectif de ce tutoriel est de mettre en place rapidement et
simplement un serveur git décentralisé. Nous aurons la possibilité de :

-   parcourir les projets grâce à une interface web (gitweb)
-   cloner un projet public avec le protocole git (git-daemon)
-   cloner et travailler sur un projet de manière sécurisée (gitolite)

Enfin nous verrons l’intégration de notre serveur avec redmine.

Installation de git, gitolite et gitweb {#installation-de-git-gitolite-et-gitweb .sectionedit4}
---------------------------------------

C’est la partie la plus simple de ce tuto :

~~~
aptitude install git-core gitolite gitweb
~~~

Utilisation au quotidien {#utilisation-au-quotidien .sectionedit5}
------------------------

### Administrer le serveur git {#administrer-le-serveur-git .sectionedit6}

L’administration (attribution des droits, création des dépôts ….) se
fait entièrement à distance. Il n’est plus besoin d’intervenir sur le
serveur en lui même. C’est la magie de gitosis qui permet d’administrer
le serveur git via un … dépôt git.

L’administrateur sera donc l’utilisateur dont on a utilisé la clé
publique pour initialiser gitosis.

Ce qui suit se passe intégralement sur le poste de travail et plus sur
le serveur git

#### Récupération du dépôt gitosis-admin {#recuperation-du-depot-gitosis-admin}

~~~
git clone git@votreserveur:gitosis-admin.git && cd gitosis-admin
~~~

cela nous donne l’arborescence suivante :

~~~
`-- gitosis-admin
    |-- gitosis.conf
    `-- keydir
        `-- [email protected]
/*  */!function(){try{var t="currentScript"in document?document.currentScript:function(){for(var t=document.getElementsByTagName("script"),e=t.length;e--;)if(t[e].getAttribute("cf-hash"))return t[e]}();if(t&&t.previousSibling){var e,r,n,i,c=t.previousSibling,a=c.getAttribute("data-cfemail");if(a){for(e="",r=parseInt(a.substr(0,2),16),n=2;a.length-n;n+=2)i=parseInt(a.substr(n,2),16)^r,e+=String.fromCharCode(i);e=document.createTextNode(e),c.parentNode.replaceChild(e,c)}}}catch(u){}}();/*  */
~~~

le répertoire keydir recevra les clé publique des utilisateurs autorisés
a accéder aux dépôts le fichier gitosis.conf servira à configurer les
acl et les dépots.

#### Ajouter un dépôt et un utilisateur autorisé à écrire dans ce dépôt {#ajouter-un-depot-et-un-utilisateur-autorise-a-ecrire-dans-ce-depot}

Cela est redoutablement simple !

-   Nous devons tout d’abord récupérer la clé publique de l’utilisateur
    et la placer dans le répertoire keydir
-   Ensuite nous allons éditer le fichier gitosis.conf et rajouter une
    section décrivant le dépot

~~~
[repo monprojet]
description = description du projet
owner = Propriétaire du dépot (informatif)
<code>
  * Ensuite nous définissons les droits de l'utilisateur sur ce dépôt
[group monprojet]
writable = monprojet
members = user@host
~~~

**writable** donne les droits d’écriture sur le dépôt **monprojet**

**members** est une liste d’utilisateurs séparés par des espaces (doit
correspondre au fichier clé publique placé précédemment dans le
répertoire keydir sans l’extension .pub)

Voila notre configuration est terminée. Il ne reste plus qu’a ajouter le
fichier clé publique au dépot local

~~~
git add keydir/[email protected]
/*  */!function(){try{var t="currentScript"in document?document.currentScript:function(){for(var t=document.getElementsByTagName("script"),e=t.length;e--;)if(t[e].getAttribute("cf-hash"))return t[e]}();if(t&&t.previousSibling){var e,r,n,i,c=t.previousSibling,a=c.getAttribute("data-cfemail");if(a){for(e="",r=parseInt(a.substr(0,2),16),n=2;a.length-n;n+=2)i=parseInt(a.substr(n,2),16)^r,e+=String.fromCharCode(i);e=document.createTextNode(e),c.parentNode.replaceChild(e,c)}}}catch(u){}}();/*  */
git commit -am "Ajout du dépôt monprojet et autorisations pour user@host"
~~~

Enfin on “pousse” la configuration vers le serveur git

~~~
git push
~~~

Pour l’administrateur c’est tout ! Voyons maintenant comment
l’utilisateur va créer son dépot.

#### Création du dépot par l'utilisateur {#creation-du-depot-par-l-utilisateur}

Manipulations faites par l’utilisateur depuis son poste de travail

L’utilisateur à donc fait sa demande à l’administrateur pour pouvoir
héberger son dépôt sur le serveur git. Il doit maintenant initialiser
son dépôt sur son poste de travail

~~~
mkdir monprojet
cd monprojet
git init
~~~

Il faut maintenant déclarer le dépôt distant

~~~
git remote add origin git@monserveur:monprojet.git
~~~

Enfin on pousse notre dépot vers le serveur

~~~
git push origin master:refs/heads/master
~~~

Ressources en ligne {#ressources-en-ligne .sectionedit7}
-------------------

-   [PRO GIT](http://progit.org/book/ "http://progit.org/book/") : Un
    livre en ligne sur git et ses possibilités !
-   [Gitosis
    README](http://eagain.net/gitweb/?p=gitosis.git;a=blob;f=README.rst "http://eagain.net/gitweb/?p=gitosis.git;a=blob;f=README.rst")
    : Le fichier README de gitosis
-   [Site officiel de GIT](http://git-scm.com/ "http://git-scm.com/")