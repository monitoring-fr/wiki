---
layout: page
title: Introduction à Shinken
---

Page rédigée pour une version de Shinken 0.4.

Sur cette page, nous allons présenter et décrire les principales
fonctionnalités de Shinken.

Sources : site et wiki officiels de
[Shinken](http://www.shinken-monitoring.org/ "http://www.shinken-monitoring.org/").

Cette page a été rédigée par :

  **Rôle**        **Nom**
  --------------- ------------------
  **Rédacteur**   Romuald FRONTEAU

Présentation {#presentation .sectionedit3}
------------

Le projet Shinken consiste en une refonte complète du cœur de Nagios en
Python, lui apportant une nouvelle architecture plus souple et plus
facile à maintenir que le daemon monolithique actuel. Se basant sur une
vue Unix, l’architecture se compose de daemons simples qui coopèrent
afin de proposer les mêmes fonctionnalités que Nagios, voir plus.

Ainsi en se basant sur la configuration actuelle de Nagios, ainsi que
ses innombrables sondes, Shinken est capable de remplacer Nagios dans la
supervision classique :

-   vérifications des états SOFT/HARD
-   gestion des dépendances réseaux et logiques (applicatives)
-   gestion des actions correctrices
-   supervision active et passive
-   vérification de la fraicheur des informations dans le cadre de la
    supervision passive

Mais il est également possible d’obtenir bien plus qu’un Nagios standard
:

-   supervision distribuée hautement disponible très facile à mettre en
    place, et de manière intégrée à la configuration globale
-   gestion des noms en UTF-8
-   presque 5 fois plus de performances que le Nagios classique
-   Multiplateforme : tourne nativement sur GNU/Linux et Windows. Il est
    même possible de mixer les deux dans une même architecture!

Le nom est inspiré des sabres Shinken japonais qui sont les armes les
plus coupantes des guerriers. Le programme permet en effet de couper
automatiquement la configuration des administrateurs et ce
intelligemment (enfin au moins il essaie).

Historique {#historique .sectionedit4}
----------

Au commencement, Jean Gabès travailla sur la publication de son livre
“Nagios pour la Supervision et la métrologie”. Lors de la publication de
son livre en Mai 2009, Jean a commencé à se poser la question de Nagios
et les performances ? Jean Gabès repris son livre et identifia les
points bloquants de Nagios dans les grands environnements. Il se lança
sur un principe de Proof of Concept codé en Python car il recherchait un
minimum d’effort pour un maximum de résultat.

Durant tout l’été 2009, Jean Gabès s’attela à coder ses idées et se rend
compte que ce qu’il a produit est plus facilement maintenable que le
code C de Nagios mais aussi qu’il a décuplé les performances.

En octobre 2009, Jean propose son POC sur la mailing-list du projet
Nagios mais le changement de langage n’emballe pas et Ethan Galstad ne
répond même pas à sa proposition. N’ayant aucun espoir que son POC soit
pris dans la roadmap du développement de Nagios, Jean décida de lancer
Shinken en tant que Projet à part entière.

En fin avril 2010, le projet Shinken sort sa première version 0.1 sous
le nom de “Anemic Alligator”.

En fin aout 2010, la version 0.2 sort sous le nom “Bold Badger”

En début octobre 2010, la version 0.3 sort sous le nom de “Crappy
Caribou”

Début décembre 2010, la version 0.4 sort sous le nom “Decadent
Dragonfly”, et est la première version à être installable en production.

Fonctionnalités {#fonctionnalites .sectionedit5}
---------------

**Répartition de charge**

Possibilité de pondérer le découpage de la configuration

**Haute disponibilité**

Minimise le temps d’indisponibilité en ne rattachant aucune
configuration à un hôte physique

**Multi plateforme**

Compatible sur toutes les plateformes où Python est installable
(Windows, Linux, Solaris, FreeBSD, Android, …

**Simple de migration Nagios vers Shinken**

La migration de Nagios vers Shinken ne prend que quelques minutes

**Compatible Nagios Configuration et plugins**

**Pas seulement Open Source, il est libre**

Shinken est sous licence [AGPL
v3](http://www.gnu.org/licenses/agpl.html "http://www.gnu.org/licenses/agpl.html")

Références {#references .sectionedit7}
----------

Voici une liste non-exhaustive des principales entreprises ayant recours
à Shinken :

  **Nom**   **Pays**
  --------- ----------