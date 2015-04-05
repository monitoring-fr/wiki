---
layout: page
title: Installation GroundWork sur Ubuntu 8.0.4 LTS
---

Ce tutoriel a été réalisé par :

  **Rôle**        **Nom**
  --------------- ------------------
  **Rédacteur**   Romuald FRONTEAU

Pré-requis {#pre-requis .sectionedit3}
----------

-   **Matériel :**

Groundwork vous fera des warning si vous êtes en dessous de ces seuils
mais à ce que j’ai pu tester il lui faudrait :

1.  4Go de RAM
2.  160 Go de Disque
3.  et un bon processeur

Personnellement, je l’ai monté sur une VM :

1.  1go de RAM
2.  6 Go de disque dont 3 Go sont convenable pour /usr (si
    partitionnement LVM)
3.  1 CPU, 2833.432MHz

-   **Packaging :**

~~~
sudo apt-get install -y mysql-server mysql-client phpmyadmin wget
~~~

Installation {#installation .sectionedit4}
------------

-   **Récupération des sources**

~~~
sudo -s

wget http://freefr.dl.sourceforge.net/sourceforge/gwmos/groundwork-5.3.0-br46-gw333-linux-32-installer.bin

chmod +x groundwork-5.3.0-br46-gw333-linux-32-installer.bin

./groundwork-5.3.0-br46-gw333-linux-32-installer.bin
~~~

-   **Lancement de l’installation**

o Do you wish to Continue? [y/N]: y

o J’ai fait « Entrer » car il en demande toujours + en fonction de la
conf matériel qu’il voit.

~~~
Warning: GroundWork recommends at least 4000MB of memory. 1017MB detected.
Press [Enter] to continue : 
Warning: GroundWork recommends at least 160GB of free disk space. 2GB detected.
Press [Enter] to continue : 
Warning: GroundWork recommends at least 2 CPU, 3000MHz. 1 CPU, 2833.432MHz 
detected.
Press [Enter] to continue :
~~~

o Entrer le mot de passe Mysql de l’utilisateur root (paramétré
préalablement lors de l’installation des packages pré-requis)

~~~
MySQL Credentials

Please enter your database root user password

MySQL Server root password :
Re-enter password :
~~~

o Vous pouvez choisir ce que vous voulez, c’est pour envoyer des infos à
Groundwork sur votre installation (j’ai répondu 3)

~~~
Notification Component

The optional GroundWork Notification component provides software update notifications, new product announcements and other information within your GroundWork Monitor installation. The Notification component periodically sends summary information about this installation back to GroundWork.

Would you like to enable Groundwork Notification ?

[1] Please select an option
[2] Yes
[3] No
Please choose an option [1] : 3
~~~

o Il vous demande une justification ([] rien répondu)

~~~
Network Service Feedback

Network Service Feedback: Can you please explain why you have disabled Notification Component with Network Service support ? Thank you !

 []:
~~~

o Do you wish to Continue? [y/N]: y

~~~
Please wait while Setup installs GroundWork Monitor Community Edition on your computer.

Installing

 0% ______________ 50% ______________ 100%

 ########################################

Warning: Problem running post-install step. Installation may not complete 

correctly

 Error writing file /var/spool/cron/nagios
~~~

o Faire “Entrer” pour continuer

~~~
Press [Enter] to continue : 

----------------------------------------------------------------------------

Installed Components


GroundWork Installation Report 

==============================



Installer name: groundwork-5.3.0-br46-gw333-linux-32-installer.bin

Installation date: 2009-07-16

Components Installed:



Foundation ..... 2.3.0-351

Core       ..... 5.3.0-br46-gw333

Bookshelf  ..... 5.3.0-358



Press [Enter] to continue :

----------------------------------------------------------------------------

Setup has finished installing GroundWork Monitor Community Edition on your computer.



\Info: To access the GroundWork Application, go to 

http://demo-groundwork.expertise-online.net:80 from your browser.


Press [Enter] to continue :
~~~

Présentation de l'interface {#presentation-de-l-interface .sectionedit5}
---------------------------

Votre Groundwork Monitor sera accessible via l’adresse

<http://ip_serv_groundwork/>

Le login / Mot de passe passe pour se connecter est admin / admin par
défaut.

[![](/assets/media/nagios/gw-page_login.png@w=700)](/_detail/nagios/gw-page_login.png@id=groundwork%253Agroundwork-ubuntu-install.html "nagios:gw-page_login.png")

### Le Menu {#le-menu .sectionedit6}

Quand on arrive sur Groundwork Monitor on se demande où sont les
onglets.

[![](/assets/media/nagios/gw-menu.png@w=700)](/_detail/nagios/gw-menu.png@id=groundwork%253Agroundwork-ubuntu-install.html "nagios:gw-menu.png")

### Administration {#administration .sectionedit7}

-   **Users**

[![](/assets/media/nagios/gw-admin_users.png@w=700)](/_detail/nagios/gw-admin_users.png@id=groundwork%253Agroundwork-ubuntu-install.html "nagios:gw-admin_users.png")

-   **Groups**

[![](/assets/media/nagios/gw-admin_groupes.png@w=700)](/_detail/nagios/gw-admin_groupes.png@id=groundwork%253Agroundwork-ubuntu-install.html "nagios:gw-admin_groupes.png")

-   **Roles**

[![](/assets/media/nagios/gw-admin_roles.png@w=700)](/_detail/nagios/gw-admin_roles.png@id=groundwork%253Agroundwork-ubuntu-install.html "nagios:gw-admin_roles.png")

### Auto Discovery {#auto-discovery .sectionedit8}

A première vue, cette vue permet de renifler les hôtes présents sur
votre réseau selon vos critères de recherche.

[![](/assets/media/nagios/gw-discovery.png@w=700)](/_detail/nagios/gw-discovery.png@id=groundwork%253Agroundwork-ubuntu-install.html "nagios:gw-discovery.png")

### Configuration {#configuration .sectionedit9}

Comme il fallait s’y attendre, une interface très complète s’offre à
nous et quelques petits plus de clonage / copie d’éléments de
configuration pour faire gagner un maximum de temps est plutôt bien
pensé de la part de GroundWork.

[![](/assets/media/nagios/gw-configuration.png@w=700)](/_detail/nagios/gw-configuration.png@id=groundwork%253Agroundwork-ubuntu-install.html "nagios:gw-configuration.png")

### Bookshelf {#bookshelf .sectionedit10}

Il s’agit d’une documentation disponible directement dans l’outil
(malheureusement elle n’est pas en multi-langue).

[![](/assets/media/nagios/gw-documentation.png@w=700)](/_detail/nagios/gw-documentation.png@id=groundwork%253Agroundwork-ubuntu-install.html "nagios:gw-documentation.png")

### Tools {#tools .sectionedit11}

[![](/assets/media/nagios/gw-tools.png@w=700)](/_detail/nagios/gw-tools.png@id=groundwork%253Agroundwork-ubuntu-install.html "nagios:gw-tools.png")

### Nagios {#nagios .sectionedit12}

[![](/assets/media/nagios/gw-nagios.png@w=700)](/_detail/nagios/gw-nagios.png@id=groundwork%253Agroundwork-ubuntu-install.html "nagios:gw-nagios.png")

### Reports {#reports .sectionedit13}

Deux types de rapports nous sont proposés :

-   Les rapports mis à disposition par le développement de l’équipe de
    Groundwork

[![](/assets/media/nagios/gw-reports1.png)](/_detail/nagios/gw-reports1.png@id=groundwork%253Agroundwork-ubuntu-install.html "nagios:gw-reports1.png")

-   Les rapports traditionnels de nagios

[![](/assets/media/nagios/gw-reports2.png)](/_detail/nagios/gw-reports2.png@id=groundwork%253Agroundwork-ubuntu-install.html "nagios:gw-reports2.png")

### Status {#status .sectionedit14}

Groundwork nous propose ici une vue plus complète et claire d’un
Tactical Overview.

[![](/assets/media/nagios/gw-status1.png@w=700)](/_detail/nagios/gw-status1.png@id=groundwork%253Agroundwork-ubuntu-install.html "nagios:gw-status1.png")

La deuxième vue est exclusivement axée sur les problèmes en cours.

[![](/assets/media/nagios/gw-troubleview.png@w=700)](/_detail/nagios/gw-troubleview.png@id=groundwork%253Agroundwork-ubuntu-install.html "nagios:gw-troubleview.png")

### Performance {#performance .sectionedit15}

[![](/assets/media/nagios/gw-performance.png@w=700)](/_detail/nagios/gw-performance.png@id=groundwork%253Agroundwork-ubuntu-install.html "nagios:gw-performance.png")