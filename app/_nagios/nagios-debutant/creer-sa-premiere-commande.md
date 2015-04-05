---
layout: page
title: Créer une nouvelle commande
---

Ce chapitre va permettre de créer une nouvelle commande pour valider la
définition du service Load Average de l’hôte Rainette.

Création d'une nouvelle commande {#creation-d-une-nouvelle-commande .sectionedit2}
--------------------------------

La création des commandes se fait dans le fichier *commands.cfg*. Nous
allons donc ajouter notre check\_load à notre fichier pour que Nagios
reconnaisse la commande check\_load.

Dans le fichier commands.cfg, ajoutez ceci :

~~~
# 'check_load' command definition
define command{
        command_name    check_load
        command_line    $USER1$/check_load -w $ARG1$ -c $ARG2$
        }
~~~

Bien sûr tous les commandes n’ont pas la même syntaxe. Il est très
important d’utiliser l’option –help des plugins pour savoir de quoi vous
aller avoir besoin à renseigner pour la variable **command\_line**

Et voilà redémarrez Nagios le problème est corrigé et nos 2 services
sont là :)

[![](..//assets/media/nagios/nagios-debutant/nouveaux-services.png@w=700)](..//_detail/nagios/nagios-debutant/nouveaux-services.png@id=nagios%253Anagios-debutant%253Acreer-sa-premiere-commande.html "nagios:nagios-debutant:nouveaux-services.png")