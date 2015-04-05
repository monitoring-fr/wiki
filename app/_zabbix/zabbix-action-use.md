---
layout: page
title: Gestion des actions dans Zabbix
---

Tutoriel rédigé pour une version Ubuntu 8.04/10.04 LTS et Zabbix 1.8.2.

Dans ce tutoriel, nous allons décrire et présenter l’utilisation et la
gestion des actions dans Zabbix.

Ce tutoriel a été réalisé par :

  **Rôle**        **Nom**
  --------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------
  **Rédacteur**   [Ludovic VALENTIN](http://www.monitoring-fr.org/community/members/ludovic-valentin/ "http://www.monitoring-fr.org/community/members/ludovic-valentin/")

en cours

Présentation {#presentation .sectionedit3}
------------

Pour les alertes, Zabbix utilise les éléments actions pour générer des
notifications. On peut donc dire que pour Zabbix : action = alerte =
notification.

Définition d'une action {#definition-d-une-action .sectionedit4}
-----------------------

Liste des principaux paramètres (ou attributs) composant une action :

  **Paramètre**              **Description**
  -------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **`Name`**                 Correspond au nom du trigger. Le nom peut contenir des macros, généralement il est similaire à l’item auquel il est rattaché
  **`Event source`**         `Expression` permet de renseigner l’expression logique utilisée pour le calcul de l’état du trigger. C’est en quelque sorte la condition qui doit permettre au trigger de déclencher un évènement
  **`Enable escalations`**   Ce champs est utilisé pour lister les dépendances éventuelles avec d’autres triggers
  **`Period (seconds)`**     Permet d’ajouter une dépendance avec un trigger
  **`Default subject`**      L’option Normal du champs `Event generation` permet de générer des évènements normallement, c’est-à-dire à chaque changement de statuts (PROBLEM/UNKNOW/OK). Quant à l’option Normal + Multiple PROBLEM events, elle est utilisée pour générer des évènements sur tous les statuts de type PROBLEM d’un trigger
  **`Default message`**      Indique la sévérité (criticité) du trigger
  **`Recovery message`**     Le champs `Comments` est utile pour préciser certaines informations sur le trigger comme sa fonction, les diverses solutions pour résoudre les problèmes le concernant, …etc
  **`Recovery subject`**     Si ce champs n’est pas vide, cet `URL` est alors utilisé dans l’écran Status of Triggers
  **`Recovery message`**     Permet de désactiver un trigger
  **`Status`**               Indique si l’action est activée

Création d'une action {#creation-d-une-action .sectionedit6}
---------------------

Edition d'une action {#edition-d-une-action .sectionedit7}
--------------------

Suppression d'une action {#suppression-d-une-action .sectionedit8}
------------------------