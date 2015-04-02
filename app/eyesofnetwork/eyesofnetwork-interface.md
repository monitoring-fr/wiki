---
layout: page
title: Interface Web de EyesOfNetwork
---

On remarquera au premier coup d’oeil que l’interface de EON est vraiment
pas mal du tout, déjà que son installation est plus que simple. Le fait
que de bons outils y soit greffés font de lui un bon “couteau suisse”.
L’interface n’est pas super classe mais ne soyons pas difficile, ils ne
sont qu’à la version 1.2.

L’interface se découpe en 7 onglets principal mais seulement 5 nous
intéresse :

-   Disponibilités
-   Capacités
-   Production
-   Rapports
-   Administration

Nous allons vous les présenter un par un. Nous sauterons certaines
fonctionnalités qui ne présentent pas un grand intérêt.

La connexion à l’interface se fait via un navigateur à l’url suivante :

<http://ip_serv_EON>

utilisateur : admin

mdp : admin

Ce tutoriel a été réalisé par :

  **Rôle**        **Nom**
  --------------- ------------------
  **Rédacteur**   Romuald FRONTEAU

Onglet Disponibilités {#onglet-disponibilites .sectionedit3}
---------------------

Cet onglet est la vue globale de EON. On y retrouve toutes informations
liés à cet outil de supervision (monitoring, cartographie, ect ….)

### Vue Globale {#vue-globale .sectionedit4}

-   **Tableau de bord**

Il s’agit d’une vue récapitulative de l’état de santé du S.I supervisés

[![](../assets/media/eon-tableau_bord.png@w=700)](../_detail/eon-tableau_bord.png@id=eyesofnetwork%253Aeyesofnetwork-interface.html "eon-tableau_bord.png")

-   **Tableau technique**

Il s’agit tout bonnement du tactical Overview de nagios

[![](../assets/media/eon-tactical_overview.png@w=700)](../_detail/eon-tactical_overview.png@id=eyesofnetwork%253Aeyesofnetwork-interface.html "eon-tactical_overview.png")

### Cartographie {#cartographie .sectionedit5}

-   **Nagios**

Il s’agit du statusmap de nagios

[![](../assets/media/eon-statusmap.png@w=700)](../_detail/eon-statusmap.png@id=eyesofnetwork%253Aeyesofnetwork-interface.html "eon-statusmap.png")

-   **Nagvis**

Il s’agit de la vue globale de nagvis

[![](../assets/media/eon-nagvis.png@w=700)](../_detail/eon-nagvis.png@id=eyesofnetwork%253Aeyesofnetwork-interface.html "eon-nagvis.png")

-   **Réseau**

Il s’agit de l’addons weathermap (utilitaire servant à réaliser des
cartographies du réseaux) derrière

[![](../assets/media/eon-weathermap.png@w=700)](../_detail/eon-weathermap.png@id=eyesofnetwork%253Aeyesofnetwork-interface.html "eon-weathermap.png")

### Evènements {#evenements .sectionedit6}

-   **Évènements actif**

Il s’agit d’un dérivé de l’eventlog de nagios. Il permet d’afficher les
évènements en cours.

-   **Évènements résolus**

Il s’agit d’un dérivé de l’eventlog de nagios. Il permet d’afficher le
début et la fin d’un problème.

[![](../assets/media/eon-event_resolu.png@w=700)](../_detail/eon-event_resolu.png@id=eyesofnetwork%253Aeyesofnetwork-interface.html "eon-event_resolu.png")

-   **Vue équipements**

Il s’agit de la vue des hôtes de nagios

[![](../assets/media/eon-vue_host.png@w=700)](../_detail/eon-vue_host.png@id=eyesofnetwork%253Aeyesofnetwork-interface.html "eon-vue_host.png")

-   **Vue services**

Il s’agit de la vue des services de nagios

[![](../assets/media/eon-vue_services.png@w=700)](../_detail/eon-vue_services.png@id=eyesofnetwork%253Aeyesofnetwork-interface.html "eon-vue_services.png")

-   **groupes d’équipements**

Il s’agit de la vue des groupes d’hôtes

[![](../assets/media/eon-vue_hostgroup.png@w=700)](../_detail/eon-vue_hostgroup.png@id=eyesofnetwork%253Aeyesofnetwork-interface.html "eon-vue_hostgroup.png")

-   **groupes de services**

Il s’agit de la vue des groupes de services

[![](../assets/media/eon-vue_servicegroups.png@w=700)](../_detail/eon-vue_servicegroups.png@id=eyesofnetwork%253Aeyesofnetwork-interface.html "eon-vue_servicegroups.png")

-   **Vue applications**

Il s’agit d’une vue vraiment pas mal, elle regroupe des services par
types d’applications

[![](../assets/media/eon-vue_applicative_metier.png@w=700)](../_detail/eon-vue_applicative_metier.png@id=eyesofnetwork%253Aeyesofnetwork-interface.html "eon-vue_applicative_metier.png")

### Incidents {#incidents .sectionedit7}

-   **Incidents équipements**

Il s’agit d’un filtre permettant de voir tous les problèmes sur les
hôtes en cours

-   **Incidents services**

Il s’agit d’un filtre permettant de voir tous les problèmes sur les
services en cours

-   **Arrêts planifiés**

Correspond à la vue Downtime de nagios

Onglet Capacités {#onglet-capacites .sectionedit8}
----------------

Cet onglet correspond à la fonction métrologique de l’outil.

-   **par équipement**

[![](../assets/media/eon-perf_equip.png@w=700)](../_detail/eon-perf_equip.png@id=eyesofnetwork%253Aeyesofnetwork-interface.html "eon-perf_equip.png")

-   **par métrique**

[![](../assets/media/eon-perf_metrique.png@w=700)](../_detail/eon-perf_metrique.png@id=eyesofnetwork%253Aeyesofnetwork-interface.html "eon-perf_metrique.png")

Onglet Production {#onglet-production .sectionedit9}
-----------------

Je pense que cet onglet est en cours de développement mais s’annonce
très prometteur. A première vue, il permettrait d’accéder à votre
machine (ssh, telnet, rdp, vnc, ….) directement via l’outil
EyesOfNetwork.

-   **équipements**

Permet d’utiliser les outils ci-dessus énoncés pour les machines
supervisées

[![](../assets/media/eon-production_supervision.png@w=700)](../_detail/eon-production_supervision.png@id=eyesofnetwork%253Aeyesofnetwork-interface.html "eon-production_supervision.png")

-   **externes**

Permet d’utiliser les outils ci-dessus énoncés pour une IP.

[![](../assets/media/eon-production_externes.png@w=700)](../_detail/eon-production_externes.png@id=eyesofnetwork%253Aeyesofnetwork-interface.html "eon-production_externes.png")

Onglet Rapports {#onglet-rapports .sectionedit10}
---------------

Que dire sur cet onglet, à part qu’il est très réussi et très prometteur
lui aussi pour un outil qui n’est qu’à ça version 1.2.

### Évènements {#evenements1 .sectionedit11}

-   **volume d’incidents**

[![](../assets/media/eon-volume_incidents.png@w=700)](../_detail/eon-volume_incidents.png@id=eyesofnetwork%253Aeyesofnetwork-interface.html "eon-volume_incidents.png")

-   **sla technique**

[![](../assets/media/eon-sla_technique.png@w=700)](../_detail/eon-sla_technique.png@id=eyesofnetwork%253Aeyesofnetwork-interface.html "eon-sla_technique.png")

-   **génération de rapports**

j’adore cette fonctionnalité très particulièrement, utile pour donner un
rapport vite fait à votre DSI qui ne voit que par Word.

[![](../assets/media/eon-gen_rapport.png@w=700)](../_detail/eon-gen_rapport.png@id=eyesofnetwork%253Aeyesofnetwork-interface.html "eon-gen_rapport.png")

### Disponibilités {#disponibilites .sectionedit12}

-   **disponibilités**

Il s’agit de la vue du rapport de disponibilité de nagios

[![](../assets/media/eon-rapport_dispo.png@w=700)](../_detail/eon-rapport_dispo.png@id=eyesofnetwork%253Aeyesofnetwork-interface.html "eon-rapport_dispo.png")

-   **tendances**

Il s’agit de la vue du rapport des tendances de nagios

[![](../assets/media/eon-rapport_tendances.png@w=700)](../_detail/eon-rapport_tendances.png@id=eyesofnetwork%253Aeyesofnetwork-interface.html "eon-rapport_tendances.png")

### Capacités {#capacites .sectionedit13}

-   **Performances**

[![](../assets/media/eon-rapport_perf.png@w=700)](../_detail/eon-rapport_perf.png@id=eyesofnetwork%253Aeyesofnetwork-interface.html "eon-rapport_perf.png")

Onglet Administration {#onglet-administration .sectionedit14}
---------------------

Cet onglet est réservé à l’administration général de EON et des addons
qui y sont greffés.

### Généralités {#generalites .sectionedit15}

-   authentification

Dans cette vue, vous aurez le choix de gérer vos connexion à EON soit
via la base mysql ou via un annuaire LDAP

[![](../assets/media/eon-admin_auth.png@w=700)](../_detail/eon-admin_auth.png@id=eyesofnetwork%253Aeyesofnetwork-interface.html "eon-admin_auth.png")

-   groupes

Dans cette vue, vous pourrez gérer des groupes d’utilisateurs pour
l’interface EON

-   utilisateurs

Dans cette vue, vous pourrez gérer les utilisateurs pour l’interface EON

-   processus

Dans cette vue, vous pourrez gérer vos processus et voir dans quel état
ils sont

[![](../assets/media/eon-admin_processus.png@w=700)](../_detail/eon-admin_processus.png@id=eyesofnetwork%253Aeyesofnetwork-interface.html "eon-admin_processus.png")

-   snmp

Dans cette vue, vous avez accès à la configuration de snmp

-   snmptrapd

Dans cette vue, vous avez accès à la configuration de snmptrapd

-   journaux

Dans cette vue, vous avez accès au journal des connexions utilisateurs à
l’interface

### Ged {#ged .sectionedit16}

Dans ce menu, vous aurez accès à la configuration de logiciel GED

### Nagios {#nagios .sectionedit17}

-   paramètres

[![](../assets/media/eon-nagios_param.png@w=700)](../_detail/eon-nagios_param.png@id=eyesofnetwork%253Aeyesofnetwork-interface.html "eon-nagios_param.png")

-   modèles

Vous pourrez créer vos templates d’hôtes et de services ici (correspond
au templates.cfg)

[![](../assets/media/eon-nagios_template.png@w=700)](../_detail/eon-nagios_template.png@id=eyesofnetwork%253Aeyesofnetwork-interface.html "eon-nagios_template.png")

-   groupes d’ équipements

Gestion des groupes d’hôtes (correspond à hostgroups.cfg)

-   groupes de services

Gestion des groupes de services

-   équipements

[![](../assets/media/eon-nagios_equipement.png@w=700)](../_detail/eon-nagios_equipement.png@id=eyesofnetwork%253Aeyesofnetwork-interface.html "eon-nagios_equipement.png")

-   applications

Cette vue est lié à GED et permet de gérer la vue application métier vu
ci-dessus dan “l’Onglet Dsiponibilités”

-   commandes

Dans cette vue, vous pourrez créer vos commandes de check (correspond au
commands.cfg). Y a des commandes de déclarer par défaut vraiment pas mal
à première vue.

### Cartographie {#cartographie1 .sectionedit18}

-   nagvis

C’est nagvis intégré dans l’interface de EON. Pour comment gérer nagvis,
veuillez vous référer
[nagvis](http://wiki.monitoring-fr.org/addons/nagvis "addons:nagvis")

-   weathermap

C’est weather intégré dans l’interface EON. La gestion de la
configuration de la cartographie weathermap se fera ici.

En attendant, un article de Wiki Nagios-fr.org sur le sujet
phpWeathermap, je vous envoie à lire ceci pour un peu mieux comprendre
comment ça fonctione.

[Des cartes Réseaux comme chez
Free](http://www.paperblog.fr/575571/des-cartes-reseaux-comme-chez-free/ "http://www.paperblog.fr/575571/des-cartes-reseaux-comme-chez-free/")

[![](../assets/media/eon-admin_weathermap.png@w=700)](../_detail/eon-admin_weathermap.png@id=eyesofnetwork%253Aeyesofnetwork-interface.html "eon-admin_weathermap.png")