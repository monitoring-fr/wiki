---
layout: page
---

### Table des matières {.toggle}

-   [Découverte d'équipements dans
    Zabbix](zabbix-discovery.html#decouverte-d-equipements-dans-zabbix)
    -   [Présentation](zabbix-discovery.html#presentation)
    -   [Fonctionnement](zabbix-discovery.html#fonctionnement)
    -   [Définition d'une règle de
        découverte](zabbix-discovery.html#definition-d-une-regle-de-decouverte)

Découverte d'équipements dans Zabbix {#decouverte-d-equipements-dans-zabbix .sectionedit1}
====================================

Tutoriel rédigé pour une version Ubuntu 10.04 LTS et Zabbix 1.8.3.

Dans ce tutoriel, nous allons décrire et présenter le fonctionnement et
l’utilisation de la fonction d’auto-découverte (discovery) d’équipements
de Zabbix.

Ce tutoriel a été réalisé par :

  **Rôle**        **Nom**
  --------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------
  **Rédacteur**   [Ludovic VALENTIN](http://www.monitoring-fr.org/community/members/ludovic-valentin/ "http://www.monitoring-fr.org/community/members/ludovic-valentin/")

en cours

Présentation {#presentation .sectionedit3}
------------

Fonctionnement {#fonctionnement .sectionedit4}
--------------

Définition d'une règle de découverte {#definition-d-une-regle-de-decouverte .sectionedit5}
------------------------------------

Liste des principaux paramètres (ou attributs) composant une règle de
découverte :

  **Paramètre**                      **Description**
  ---------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **`Name`**                         Correspond au nom de la règle
  **`IP range`**                     Plage des adresses IP pour la découverte peut être : une adresse IP unique, une plage d’adresses (ex: 192.168.1.1-254), une liste (ex: 192.168.4.1-254,192.168.2.1-100,192.168.2.200,192.168.1.0/24) ou bien une adresse de réseau avec son masque (ex: 192.168.1.0/24)
  **`Delay (in sec)`**               Ce champs indique le délai entre chaque exécution de la règle
  **`Checks`**                       Précise les checks réalisés pour la découverte (ex: ICMP Ping, SNMP, …)
  **`Device uniqueness criteria`**   Définit le critère d’unicité des périphériques
  **`Status`**                       Indique si la règle est active ou pas


