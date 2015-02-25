---
layout: page
---

### Table des matières {.toggle}

-   [Commandes pour la
    supervision](commands.html#commandes-pour-la-supervision)

Commandes pour la supervision {#commandes-pour-la-supervision .sectionedit1}
=============================

![FIXME](../../../lib/images/smileys/fixme.gif) Ébauche de page

Il n’est pas toujours utile de sortir la grosse artillerie pour vérifier
l’état de santé d’une machine. Les sytèmes Linux/unix possèdent des
outils de base pour superviser une machine en ligne de commande.

top

~~~~ {.code}
  Liste les processus en cours d'exécution et leur identifiant (PID)
~~~~

kill

~~~~ {.code}
  Tue un processus grâce à son PID
~~~~

ftptop

~~~~ {.code}
  Liste des connexions au serveur FTP
~~~~

iftop

~~~~ {.code}
  Top des interfaces réseau (installation par apt-get install iftop)
~~~~

apachetop

~~~~ {.code}
  Top Apache (installation par apt-get install apachetop)
~~~~

mtop

~~~~ {.code}
  Top MySQL (installation par apt-get install mtop)
~~~~

En ce qui concerne le réseau :

netstat -tap

~~~~ {.code}
  Liste les connexions établies
~~~~

netstat -tulp

~~~~ {.code}
  Liste les ports en écoute
~~~~

lsof -n | grep LISTEN

~~~~ {.code}
  Liste les ports en écoute
~~~~

lsof -n | grep UDP

~~~~ {.code}
  Liste les connexions UDP 
~~~~
