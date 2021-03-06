---
layout: page
title: Notification par email dans Zabbix
---

Tutoriel rédigé pour une version Ubuntu 8.04/10.04 LTS et Zabbix 1.8.2.

Dans ce tutoriel, nous allons suivre les différentes étapes nécessaires
à l’activation de la notification par email. Ainsi, il sera alors
possible de recevoir par email le moindre changement de statut d’un
item, grâce à la génération d’évènements des triggers.

Ce tutoriel a été réalisé par :

  **Rôle**        **Nom**
  --------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------
  **Rédacteur**   [Ludovic VALENTIN](http://www.monitoring-fr.org/community/members/ludovic-valentin/ "http://www.monitoring-fr.org/community/members/ludovic-valentin/")

Pré-requis {#pre-requis .sectionedit3}
----------

La mise en place de la notification nécessite au minimum un serveur
Zabbix opérationnel, et au moins un agent (Zabbix Agent installé en
local ou sur un hôte distant, ou tout autre moyen choisi tel qu’un agent
SNMP, IPMI, …etc) afin de pouvoir générer des évènements, et donc
l’envoi de notification.

Avant de commencer, voici une petite mise au point: on considère que le
Zabbix Server et le Zabbix Agent (ou autre type d’agent) sont
correctement installés et configurés. La communication entre ses deux
composants fonctionne.

Dans l’interface d’administration Zabbix (Zabbix Frontend), l’hôte sur
lequel est installé l’agent est déjà créé et supervisé. Ce dernier
génère donc déjà des évènements (un template peut lui être appliqué par
exemple).

Pour ce tutoriel, nous allons utiliser la même adresse email
d’expéditeur et de destinataire pour servir d’exemple.

Création d'un média de type email {#creation-d-un-media-de-type-email .sectionedit4}
---------------------------------

Tout d’abord, commençons par créer un média. Pour cela, il faut se
rendre dans l’interface web Zabbix Frontend.

***Rappel* :**

Pour visualiser l’interface Web de Zabbix, il faut entrer dans la barre
d’adresse url de votre navigateur internet (IE, Firefox, …etc),
l’adresse ip de votre serveur Zabbix, puis valider le site :

<http://adresse_ip_zabbix/zabbix/>

L’interface doit alors s’afficher, avec comme première page, une demande
d’authentification :

[![](../assets/media/supervision/zabbix/zabbix-frontend_login.png@w=500)](../_detail/supervision/zabbix/zabbix-frontend_login.png@id=zabbix%253Azabbix-email-notification.html "supervision:zabbix:zabbix-frontend_login.png")

Il faut alors se connecter avec l’utilisateur **Admin** avec **zabbix**
comme mot-de-passe par défaut.

Ensuite, on clique sur l’onglet **Administration/Media** types pour
arriver sur cet écran. C’est ici que nous allons créer notre média.

[![](../assets/media/zabbix/zabbix-email-notification_media-1.png@w=700)](../_detail/zabbix/zabbix-email-notification_media-1.png@id=zabbix%253Azabbix-email-notification.html "zabbix:zabbix-email-notification_media-1.png")

Après avoir cliqué sur le bouton **Create Media Type**, on peut alors
visualiser le formulaire de création d’un média :

[![](../assets/media/zabbix/zabbix-email-notification_media-2.png@w=700)](../_detail/zabbix/zabbix-email-notification_media-2.png@id=zabbix%253Azabbix-email-notification.html "zabbix:zabbix-email-notification_media-2.png")

Dans ce tutoriel, nous allons configurer le média pour exemple, avec ces
paramètres :

[![](../assets/media/zabbix/zabbix-email-notification_media-3.png@w=700)](../_detail/zabbix/zabbix-email-notification_media-3.png@id=zabbix%253Azabbix-email-notification.html "zabbix:zabbix-email-notification_media-3.png")

Ici, nous lui avons attribué un nom (ou `Description`), et renseignés
les paramètres nécessaires pour l’envoi d’email. Tout d’abord, il faut
entrer le nom du serveur SMTP (nom DNS ou bien son adresse IP) ainsi que
son `SMTP helo`, ensuite il est essentiel d’indiquer l’adresse email qui
va être utilisée comme expéditeur pour l’envoi des emails.

Une fois les différents champs remplis en fonction de vos propres
paramètres, on peut valider la création du média en cliquant sur le
bouton **Save**. Ce nouveau média doit être maintenant visible dans la
liste des médias.

[![](../assets/media/zabbix/zabbix-email-notification_media-4.png@w=700)](../_detail/zabbix/zabbix-email-notification_media-4.png@id=zabbix%253Azabbix-email-notification.html "zabbix:zabbix-email-notification_media-4.png")

On peut maintenant passer à l’étape suivante, à savoir la configuration
d’un utilisateur.

Ajout d'un média à un utilisateur {#ajout-d-un-media-a-un-utilisateur .sectionedit5}
---------------------------------

Dans la mise en place des notifications, il est essentiel de paramétrer
un utilisateur pour que ce dernier puisse recevoir, en l’occurrence les
emails. On se rend donc sur l’onglet **Administration/Users**.

[![](../assets/media/zabbix/zabbix-email-notification_user-1.png@w=700)](../_detail/zabbix/zabbix-email-notification_user-1.png@id=zabbix%253Azabbix-email-notification.html "zabbix:zabbix-email-notification_user-1.png")

On clique ensuite sur l’utilisateur destiné à recevoir les notification,
afin de pouvoir l’éditer. Dans ce tutoriel, nous allons paramétrer
l’utilisateur Admin, mais vous pouvez aussi très bien créer un
utilisateur ou en modifier un autre. Voici l’écran d’édition de notre
utilisateur Admin :

[![](../assets/media/zabbix/zabbix-email-notification_user-2.png@w=700)](../_detail/zabbix/zabbix-email-notification_user-2.png@id=zabbix%253Azabbix-email-notification.html "zabbix:zabbix-email-notification_user-2.png")

Comme vous pouvez le voir sur la capture d’écran précédente, il y a un
champ de paramétrage de l’utilisateur intitulé `Media types`, C’est
celui-ci qui nous intéresse. Cliquons alors sur le bouton **Add**
correspondant afin d’ajouter le média que nous avons créé auparavant.

[![](../assets/media/zabbix/zabbix-email-notification_user-3.png@w=500)](../_detail/zabbix/zabbix-email-notification_user-3.png@id=zabbix%253Azabbix-email-notification.html "zabbix:zabbix-email-notification_user-3.png")

Il faut alors remplir la fenêtre venant de s’ouvrir comme dans la
capture d’écran précédente en ajoutant vos paramètres, notamment
l’adresse email du destinataire des notifications (dans notre exemple,
l’adresse email de l’expéditeur et du destinataire est la même). Puis on
peut cliquer sur **Add**.

L’ajout du média à l’utilisateur Admin doit ensuite être visible :

[![](../assets/media/zabbix/zabbix-email-notification_user-4.png@w=700)](../_detail/zabbix/zabbix-email-notification_user-4.png@id=zabbix%253Azabbix-email-notification.html "zabbix:zabbix-email-notification_user-4.png")

Il ne reste plus qu’à sauvegarder la modification de l’utilisateur Admin
en cliquant sur **Save**. Maintenant on peut passer à l’étape suivante,
c’est-à-dire la configuration d’une action pour déclencher l’envoi des
notifications.

Création d'une action {#creation-d-une-action .sectionedit6}
---------------------

Afin de déclencher l’envoi d’email à chaque évènement généré par un
trigger, il faut créer une action. Une action est un composant chargé de
réagir à l’apparition de tout nouvel évènement dans Zabbix. Ainsi, dans
notre cas, nous allons créer une action qui, à chaque changement de
statut d’un item sous la forme d’un évènement généré par un trigger,
doit envoyer un email de notification à l’utilisateur précédemment
configuré, à savoir l’utilisateur Admin.

Tout d’abord, il faut cliquer sur l’onglet **Configuration/Actions**
pour visualiser la page des actions.

[![](../assets/media/zabbix/zabbix-email-notification_action-1.png@w=700)](../_detail/zabbix/zabbix-email-notification_action-1.png@id=zabbix%253Azabbix-email-notification.html "zabbix:zabbix-email-notification_action-1.png")

Puis, cliquez sur **Create Action** pour démarrer la création de notre
action, et ainsi afficher l’écran de paramétrage d’une nouvelle action :

[![](../assets/media/zabbix/zabbix-email-notification_action-2.png@w=700)](../_detail/zabbix/zabbix-email-notification_action-2.png@id=zabbix%253Azabbix-email-notification.html "zabbix:zabbix-email-notification_action-2.png")

A partir de cette page, il faut dans un premier temps attribuer un nom à
l’action, ensuite on doit sélectionner l’opération à effectuer,
c’est-à-dire dans notre cas, l’envoi de notification de type email. Pour
cela, cliquons sur le bouton **New** de la partie **Action operations**
:

[![](../assets/media/zabbix/zabbix-email-notification_action-3.png@w=150)](../_detail/zabbix/zabbix-email-notification_action-3.png@id=zabbix%253Azabbix-email-notification.html "zabbix:zabbix-email-notification_action-3.png")

Il faut alors ajouter une opération avec les paramètres de notre
utilisateur Admin et notre média Monitoring :

[![](../assets/media/zabbix/zabbix-email-notification_action-4.png@w=700)](../_detail/zabbix/zabbix-email-notification_action-4.png@id=zabbix%253Azabbix-email-notification.html "zabbix:zabbix-email-notification_action-4.png")

Voici la configuration de l’action une fois terminée :

[![](../assets/media/zabbix/zabbix-email-notification_action-5.png@w=700)](../_detail/zabbix/zabbix-email-notification_action-5.png@id=zabbix%253Azabbix-email-notification.html "zabbix:zabbix-email-notification_action-5.png")

On peut sauvegarder l’action en cliquant sur **Save**. La page suivante
affichée doit alors correspondre à la liste des actions, liste dans
laquelle notre nouvelle action doit apparaître.

[![](../assets/media/zabbix/zabbix-email-notification_action-6.png@w=700)](../_detail/zabbix/zabbix-email-notification_action-6.png@id=zabbix%253Azabbix-email-notification.html "zabbix:zabbix-email-notification_action-6.png")

La mise en place de la notification par email est enfin terminée.

Résultat {#resultat .sectionedit7}
--------

Pour finir ce tutoriel, voyons si notre système de notification par
email fonctionne. D’abord consultons l’écran des notifications de
Zabbix, pour cela, cliquez sur l’onglet
**Administration/Notifications**. En jonglant avec les filtres de la
page on peut obtenir un affichage global des notifications :

[![](../assets/media/zabbix/zabbix-email-notification_notification.png@w=700)](../_detail/zabbix/zabbix-email-notification_notification.png@id=zabbix%253Azabbix-email-notification.html "zabbix:zabbix-email-notification_notification.png")

Sur cet écran, il est possible de voir que des emails ont bien été
envoyés à l’utilisateur Admin, avec un total de 14 notifications.
Maintenant, vérifions que ces emails sont bels et bien présents dans la
boîte de messagerie correspondant à cet utilisateur.

[![](../assets/media/zabbix/zabbix-email-notification_email.png@w=600)](../_detail/zabbix/zabbix-email-notification_email.png@id=zabbix%253Azabbix-email-notification.html "zabbix:zabbix-email-notification_email.png")

Effectivement, dans la boîte du destinataire (dans notre cas expéditeur
= destinataire) on peut voir que des emails ont bien été générés et
envoyés, comme le montre la capture d’écran ci-dessus, avec le
changement de statut d’un trigger.

Conclusion, nos emails ont bien été envoyés. La notification par email
fonctionne et peut être déclinée à d’autres utilisateurs. Il est
également possible d’affiner la notification en ajoutant des conditions,
par exemple de manière à ne recevoir que les notifications des statuts
de type PROBLEM.