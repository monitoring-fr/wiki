---
layout: page
title: Gestion des triggers dans Zabbix
---

Tutoriel rédigé pour une version Ubuntu 8.04/10.04 LTS et Zabbix 1.8.2.

Dans ce tutoriel, nous allons décrire et présenter l’utilisation et la
gestion des triggers dans Zabbix.

Ce tutoriel a été réalisé par :

  **Rôle**        **Nom**
  --------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------
  **Rédacteur**   [Ludovic VALENTIN](http://www.monitoring-fr.org/community/members/ludovic-valentin/ "http://www.monitoring-fr.org/community/members/ludovic-valentin/")

en cours

Présentation {#presentation .sectionedit3}
------------

Dans Zabbix, les triggers (ou déclencheurs en français) ont pour rôle de
générer (déclencher) des évènements en réaction à une certaine valeur ou
donnée remontée par un item.

Les évènements dans Zabbix ne sont pas des alertes à proprement parlé,
en fait, ce sont des éléments indiquant le statut d’un item (selon les
conditions choisies) sous le forme d’un état de type WARNING (=
problème), UNKNOW (= inconnu) ou OK (= tout va bien). Pour les alertes,
Zabbix utilise les éléments actions pour générer des notifications à
partir du statut d’un trigger (évènement).

On peut donc résumer ces deux notions de la manière suivante :

-   pour les triggers (à partir d’un item) :

**trigger = évènement = statut**

-   pour les actions (à partir d’un trigger) :

**action = alerte = notification**

Un trigger est donc une fonction importante du processus d’alerte de
Zabbix, car sans évènement et donc le statut d’un item, il n’y aurait
pas d’alerte (ou notification).

Pour plus d’information sur le **[système
d'alerte](zabbix-work.html#systeme-d-alerte "zabbix:zabbix-work")** de
Zabbix.

Définition d'un trigger {#definition-d-un-trigger .sectionedit4}
-----------------------

Liste des principaux paramètres (ou attributs) définissant un trigger :

  **Paramètre**                  **Description**
  ------------------------------ -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **`Name`**                     Correspond au nom du trigger. Le nom peut contenir des macros, généralement il est similaire à l’item auquel il est rattaché
  **`Expression`**               `Expression` permet de renseigner l’expression logique utilisée pour le calcul de l’état du trigger. C’est en quelque sorte la condition qui doit permettre au trigger de déclencher un évènement
  **`The trigger depends on`**   Ce champs est utilisé pour lister les dépendances éventuelles avec d’autres triggers
  **`New dependency`**           Permet d’ajouter une dépendance avec un trigger
  **`Event generation`**         L’option Normal du champs `Event generation` permet de générer des évènements normallement, c’est-à-dire à chaque changement de statuts (PROBLEM/UNKNOW/OK). Quant à l’option Normal + Multiple PROBLEM events, elle est utilisée pour générer des évènements sur tous les statuts de type PROBLEM d’un trigger
  **`Severity`**                 Indique la sévérité (criticité) du trigger
  **`Comments`**                 Le champs `Comments` est utile pour préciser certaines informations sur le trigger comme sa fonction, les diverses solutions pour résoudre les problèmes le concernant, …etc
  **`URL`**                      Si ce champs n’est pas vide, cet `URL` est alors utilisé dans l’écran Status of Triggers
  **`Disabled`**                 Permet de désactiver un trigger

Création d'un trigger {#creation-d-un-trigger .sectionedit6}
---------------------

Edition d'un trigger {#edition-d-un-trigger .sectionedit7}
--------------------

Suppression d'un trigger {#suppression-d-un-trigger .sectionedit8}
------------------------