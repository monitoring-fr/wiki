---
layout: page
title: 'Commandes pour la supervision'
---

![FIXME](../lib/images/smileys/fixme.gif) Ébauche de page

Il n’est pas toujours utile de sortir la grosse artillerie pour vérifier
l’état de santé d’une machine. Les sytèmes Linux/unix possèdent des
outils de base pour superviser une machine en ligne de commande.

	top

Liste les processus en cours d'exécution et leur identifiant (PID)

	kill

Tue un processus grâce à son PID

	ftptop

Liste des connexions au serveur FTP

	iftop
 
Top des interfaces réseau (installation par apt-get install iftop)

	apachetop
 
Top Apache (installation par apt-get install apachetop)

	mtop
 
Top MySQL (installation par apt-get install mtop)

En ce qui concerne le réseau :

	netstat -tap

Liste les connexions établies

	netstat -tulp

Liste les ports en écoute

	lsof -n | grep LISTEN
 
Liste les ports en écoute

	lsof -n | grep UDP

Liste les connexions UDP