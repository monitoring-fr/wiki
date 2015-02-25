---
layout: page
---

### Table des matières {.toggle}

-   [Notification par sms dans
    Zabbix](zabbix-sms-notification.html#notification-par-sms-dans-zabbix)
-   [installation et configuration de
    gammu](zabbix-sms-notification.html#installation-et-configuration-de-gammu)
-   [Configurer zabbix -sms avec
    GAMMU](zabbix-sms-notification.html#configurer-zabbix-sms-avec-gammu)

Notification par sms dans Zabbix {#notification-par-sms-dans-zabbix .sectionedit1}
================================

Dans ce tutoriel, nous allons suivre les différentes étapes nécessaires
à l’activation de la notification par sms. Ainsi, il sera alors possible
de recevoir par simple sms le moindre changement de statut d’un item,
grâce à la génération d’événements des triggers. Ici nous allons
utiliser comme modem gsm une clé USB Hawaii et l’utilitaire gammu pour
l’interfaçage du téléphone avec votre ordinateur.

  **Rôle**        **Nom**
  --------------- -------------
  **Rédacteur**   Wilson GAMO

installation et configuration de gammu {#installation-et-configuration-de-gammu .sectionedit3}
======================================

sous ubuntu apt-get install gammu ensuite on édite le fichier
/etc/gammurc ou le fichier .gammurc(si le fichier n’existe pas on le
crée)

~~~~ {.code}
[gammu]
port = /dev/ttyUSB0
model =
connection = at19200
synchronizetime = yes
logfile =
logformat = nothing
use_locking =
gammuloc =
~~~~

A ce niveau vous pouvez deja envoyer des sms depuis votre ordinateur en
utilisant la commande suivante

~~~~ {.code}
gammu --identify
~~~~

~~~~ {.code}
echo "Tapez ici votre SMS" | gammu --sendsms TEXT 06XXXXXX
~~~~

Pour plus d’information sur gammu
[http://doc.ubuntu-fr.org/gammu](http://doc.ubuntu-fr.org/gammu "http://doc.ubuntu-fr.org/gammu")

Configurer zabbix -sms avec GAMMU {#configurer-zabbix-sms-avec-gammu .sectionedit4}
=================================

Créer un script (rendez le exécutable) sur le serveur zabbix dans le
AlertScriptsPath(=/etc/zabbix/alert.d/ sur ubuntu)

~~~~ {.code}
#!/bin/sh
HOME=/etc
PATH=/bin:/sbin:/usr/bin:/usr/sbin
LOGFILE="/var/log/zabbix-server/zabbix-sms.log"
echo "Recipient='$1' Message='$3'" >> ${LOGFILE}
MOBILE_NUMBER=`echo "$1" | sed s#\s##`
# Log it
echo "echo $3 | /usr/bin/sudo /usr/bin/gammu --sendsms TEXT ${MOBILE_NUMBER}" >>${LOGFILE}
# Send it
echo "$3" | /usr/bin/sudo /usr/bin/gammu --sendsms TEXT "${MOBILE_NUMBER}" 1>>${LOGFILE} 2>&1
# EOF
~~~~

ajouter

~~~~ {.code}
zabbix ALL = NOPASSWD:/usr/bin/gammu
~~~~

dans sudoers. Si vos action et notification sont bien faites zabbix
pourra envoyez des sms !!!
