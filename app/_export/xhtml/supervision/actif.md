---
layout: page
---

### Table des matières {.toggle}

-   [Mode actif](actif.html#mode-actif)

Mode actif {#mode-actif .sectionedit1}
==========

Nagios, utilise essentiellement deux methodes pour tester les hotes :

-   Les remontés autonomes des hotes, on appelle cela les tests passifs
-   Les tests provoqués par Nagios, se sont les tests actifs

Chaque une de ses methodes a ses avantages et inconveniants, evidement

1.  tests passifs :

⇒ c’est l’hote qui decide quand elle renvoie son information, comment
etre sur que le systeme arrive encore a envoyer ses informations ? (il
existe un parametre pour parer a cela dans le nagios, regarder du cote
de check\_freshness…)

1.  tests actifs :

c’est le nagios qui decide de quand il fait le test, a son rythme

~~~
     => le serveur s'il le peut, pourrait prevenir un peu plus tot de l'incident
     => faire le tests requiert des ressources sur le serveur Nagios
~~~

Un bon compromis est de permettre aux deux types de tests de fonctionner
simultanément pour le même service, en fonction des possibilités des
tests evidement, quand a la charge du serveur Nagios, il est possible de
déporter les tests avec le NRPE.

![FIXME](../../../lib/images/smileys/fixme.gif) : page en cours de
rédaction par adlp
