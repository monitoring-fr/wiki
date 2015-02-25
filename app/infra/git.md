---
layout: page
---

[[[Mise en place d'un système de contrôle de version GIT sous unbuntu
server 10.10](git@do=backlink.html)]]

[wiki monitoring-fr.org](../start.html "[ALT+H]")

![Logo Monitoring](../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../start.html "start") »
[Infrastructure](start.html "infra:start") » [Mise en place d'un système
de contrôle de version GIT sous unbuntu server
10.10](git.html "infra:git")

### Table des matières {.toggle}

-   [Mise en place d'un système de contrôle de version GIT sous unbuntu
    server
    10.10](git.html#mise-en-place-d-un-systeme-de-controle-de-version-git-sous-unbuntu-server-1010)
    -   [Introduction](git.html#introduction)
    -   [Objectifs](git.html#objectifs)
    -   [Installation de git, gitolite et
        gitweb](git.html#installation-de-git-gitolite-et-gitweb)
    -   [Utilisation au quotidien](git.html#utilisation-au-quotidien)
        -   [Administrer le serveur
            git](git.html#administrer-le-serveur-git)
    -   [Ressources en ligne](git.html#ressources-en-ligne)

work in progress

Mise en place d'un système de contrôle de version GIT sous unbuntu server 10.10 {#mise-en-place-d-un-systeme-de-controle-de-version-git-sous-unbuntu-server-1010 .sectionedit1}
===============================================================================

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

~~~~ {.code}
aptitude install git-core gitolite gitweb
~~~~

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

~~~~ {.code}
git clone git@votreserveur:gitosis-admin.git && cd gitosis-admin
~~~~

cela nous donne l’arborescence suivante :

~~~~ {.code}
`-- gitosis-admin
    |-- gitosis.conf
    `-- keydir
        `-- [email protected]
/*  */!function(){try{var t="currentScript"in document?document.currentScript:function(){for(var t=document.getElementsByTagName("script"),e=t.length;e--;)if(t[e].getAttribute("cf-hash"))return t[e]}();if(t&&t.previousSibling){var e,r,n,i,c=t.previousSibling,a=c.getAttribute("data-cfemail");if(a){for(e="",r=parseInt(a.substr(0,2),16),n=2;a.length-n;n+=2)i=parseInt(a.substr(n,2),16)^r,e+=String.fromCharCode(i);e=document.createTextNode(e),c.parentNode.replaceChild(e,c)}}}catch(u){}}();/*  */
~~~~

le répertoire keydir recevra les clé publique des utilisateurs autorisés
a accéder aux dépôts le fichier gitosis.conf servira à configurer les
acl et les dépots.

#### Ajouter un dépôt et un utilisateur autorisé à écrire dans ce dépôt {#ajouter-un-depot-et-un-utilisateur-autorise-a-ecrire-dans-ce-depot}

Cela est redoutablement simple !

-   Nous devons tout d’abord récupérer la clé publique de l’utilisateur
    et la placer dans le répertoire keydir
-   Ensuite nous allons éditer le fichier gitosis.conf et rajouter une
    section décrivant le dépot

~~~~ {.code}
[repo monprojet]
description = description du projet
owner = Propriétaire du dépot (informatif)
<code>
  * Ensuite nous définissons les droits de l'utilisateur sur ce dépôt
[group monprojet]
writable = monprojet
members = user@host
~~~~

**writable** donne les droits d’écriture sur le dépôt **monprojet**

**members** est une liste d’utilisateurs séparés par des espaces (doit
correspondre au fichier clé publique placé précédemment dans le
répertoire keydir sans l’extension .pub)

Voila notre configuration est terminée. Il ne reste plus qu’a ajouter le
fichier clé publique au dépot local

~~~~ {.code}
git add keydir/[email protected]
/*  */!function(){try{var t="currentScript"in document?document.currentScript:function(){for(var t=document.getElementsByTagName("script"),e=t.length;e--;)if(t[e].getAttribute("cf-hash"))return t[e]}();if(t&&t.previousSibling){var e,r,n,i,c=t.previousSibling,a=c.getAttribute("data-cfemail");if(a){for(e="",r=parseInt(a.substr(0,2),16),n=2;a.length-n;n+=2)i=parseInt(a.substr(n,2),16)^r,e+=String.fromCharCode(i);e=document.createTextNode(e),c.parentNode.replaceChild(e,c)}}}catch(u){}}();/*  */
git commit -am "Ajout du dépôt monprojet et autorisations pour user@host"
~~~~

Enfin on “pousse” la configuration vers le serveur git

~~~~ {.code}
git push
~~~~

Pour l’administrateur c’est tout ! Voyons maintenant comment
l’utilisateur va créer son dépot.

#### Création du dépot par l'utilisateur {#creation-du-depot-par-l-utilisateur}

Manipulations faites par l’utilisateur depuis son poste de travail

L’utilisateur à donc fait sa demande à l’administrateur pour pouvoir
héberger son dépôt sur le serveur git. Il doit maintenant initialiser
son dépôt sur son poste de travail

~~~~ {.code}
mkdir monprojet
cd monprojet
git init
~~~~

Il faut maintenant déclarer le dépôt distant

~~~~ {.code}
git remote add origin git@monserveur:monprojet.git
~~~~

Enfin on pousse notre dépot vers le serveur

~~~~ {.code}
git push origin master:refs/heads/master
~~~~

Ressources en ligne {#ressources-en-ligne .sectionedit7}
-------------------

-   [PRO GIT](http://progit.org/book/ "http://progit.org/book/") : Un
    livre en ligne sur git et ses possibilités !
-   [Gitosis
    README](http://eagain.net/gitweb/?p=gitosis.git;a=blob;f=README.rst "http://eagain.net/gitweb/?p=gitosis.git;a=blob;f=README.rst")
    : Le fichier README de gitosis
-   [Site officiel de GIT](http://git-scm.com/ "http://git-scm.com/")

SOMMAIRE {#sommaire .sectionedit1}
--------

**[Accueil](../start.html "start")**

**[Supervision](../supervision/start.html "supervision:start")**

-   [Nagios](../nagios/start.html "nagios:start")
-   [Centreon](../centreon/start.html "centreon:start")
-   [Shinken](../shinken/start.html "shinken:start")
-   [Zabbix](../zabbix/start.html "zabbix:start")
-   [OpenNMS](../opennms/start.html "opennms:start")
-   [EyesOfNetwork](../eyesofnetwork/start.html "eyesofnetwork:start")
-   [Groundwork](../groundwork/start.html "groundwork:start")
-   [Zenoss](../zenoss/start.html "zenoss:start")
-   [Vigilo](../vigilo/start.html "vigilo:start")
-   [Icinga](../icinga/start.html "icinga:start")
-   [Cacti](../cacti/start.html "cacti:start")
-   [Ressenti
    utilisateur](../supervision/eue/start.html "supervision:eue:start")
-   [Ressenti utilisateur avec
    sikuli](../sikuli/eue/start.html "sikuli:eue:start")

**[Hypervision](../hypervision/start.html "hypervision:start")**

-   [Canopsis](../canopsis/start.html "canopsis:start")

**[Sécurité](../securite/start.html "securite:start")**

**[Infrastructure](start.html "infra:start")**

**[Développement](../dev/start.html "dev:start")**

Gestion des infrastructures {#gestion-des-infrastructures .sectionedit1}
---------------------------

-   [Chef](chef.html "infra:chef")
-   [GLPI](glpi/start.html "infra:glpi:start")
-   [Graylog2](graylog2.html "infra:graylog2")
-   [Installation de Job
    Scheduler](jobscheduler.html "infra:jobscheduler")
-   [Installation de archipel sous ubuntu
    10.10](archipel.html "infra:archipel")
-   [Installation de sikuli IDE sous Ubuntu
    10.10](sikuli.html "infra:sikuli")
-   [Knockd](knockd.html "infra:knockd")
-   [Logstash](logstash.html "infra:logstash")
-   [Mise en place d'un système de contrôle de version GIT sous unbuntu
    server 10.10](git.html "infra:git")
-   [Partage de session terminal avec
    Screen](screen.html "infra:screen")
-   [Postfix](postfix.html "infra:postfix")
-   [Zimbra](zimbra.html "infra:zimbra")

-   [Afficher le texte
    source](git@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](git@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](git@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](git@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de médias](git@do=media.html "Gestionnaire de médias")
-   [Index](git@do=index.html "Index [X]")
-   [Connexion](git@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de page](git.html#dokuwiki__top "Haut de page [T]")

infra/git.txt · Dernière modification: 2013/03/29 09:39 (modification
externe)

[![CC Attribution-Noncommercial-Share Alike 3.0
Unported](../lib/images/license/button/cc-by-nc-sa.png)](http://creativecommons.org/licenses/by-nc-sa/3.0/)

[![www.chimeric.de](../lib/tpl/arctic/images/button-chimeric-de.png)](http://www.chimeric.de "www.chimeric.de")
[![Valid
CSS](../lib/tpl/arctic/images/button-css.png)](http://jigsaw.w3.org/css-validator/check/referer "Valid CSS")
[![Driven by
DokuWiki](../lib/tpl/arctic/images/button-dw.png)](http://wiki.splitbrain.org/wiki:dokuwiki "Driven by DokuWiki")
[![do yourself a favour and use a real browser - get
firefox!!](../lib/tpl/arctic/images/button-firefox.png)](http://www.firefox-browser.de "do yourself a favour and use a real browser - get firefox")
[![Recent changes RSS
feed](../lib/tpl/arctic/images/button-rss.png)](../feed.php "Recent changes RSS feed")
[![Valid XHTML
1.0](../lib/tpl/arctic/images/button-xhtml.png)](http://validator.w3.org/check/referer "Valid XHTML 1.0")

![](../lib/exe/indexer.php@id=infra%253Agit&1424859535)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
