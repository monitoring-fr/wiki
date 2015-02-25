---
layout: page
---

### Table des matières {.toggle}

-   [Installation de Centreon Enterprise
    Server](centreon-enterprise-server.html#installation-de-centreon-enterprise-server)
    -   [Ressources](centreon-enterprise-server.html#ressources)
    -   [Introduction](centreon-enterprise-server.html#introduction)
    -   [Installation du serveur
        Central](centreon-enterprise-server.html#installation-du-serveur-central)
    -   [Post
        installation](centreon-enterprise-server.html#post-installation)
        -   [Mysql](centreon-enterprise-server.html#mysql)
        -   [Réseau](centreon-enterprise-server.html#reseau)
        -   [Modification des
            dépots](centreon-enterprise-server.html#modification-des-depots)

[![](../../../assets/media/nagios/centreon_logo.png)](../../../_detail/nagios/centreon_logo.png@id=centreon%253Acentreon-enterprise-server.html "nagios:centreon_logo.png")

  **Rôle**       **Nom**
  -------------- ----------------
  **Créateur**   David GUENAULT

Installation de Centreon Enterprise Server {#installation-de-centreon-enterprise-server .sectionedit2}
==========================================

Ressources {#ressources .sectionedit3}
----------

-   L’ISO d’installation :
    [http://www.centreon.com/fr/Centreon-Enterprise-Server/telechargements-de-ces.html](http://www.centreon.com/fr/Centreon-Enterprise-Server/telechargements-de-ces.html "http://www.centreon.com/fr/Centreon-Enterprise-Server/telechargements-de-ces.html")
-   Les documentations :
    [http://www.centreon.com/fr/Centreon-Enterprise-Server/documentation-ces.html](http://www.centreon.com/fr/Centreon-Enterprise-Server/documentation-ces.html "http://www.centreon.com/fr/Centreon-Enterprise-Server/documentation-ces.html")

Introduction {#introduction .sectionedit4}
------------

Centreon Enterprise Server (CES) est une distribution linux (basée sur
centos un fork de red hat enterprise server) permettant de facilement
installer Centreon et ses dépendances.

CES est livré en plusieurs versions mais nous nous intéresseront à la
version Libre (version standard). Au niveau logiciel on se retrouve avec
:

-   Centreon
-   Nagios
-   Nagios Plugins
-   NdoUtils
-   NRPE
-   NSCA
-   Une sélection de plugins additionnels (voir la liste ci dessous)

CES permet de gérer au choix un serveur de supervision complet, un
système distribué avec serveur central et satellites. Au lancement de la
machine, il suffit de saisir central ou poller pour installer un serveur
central ou un serveur satellite.

Installation du serveur Central {#installation-du-serveur-central .sectionedit5}
-------------------------------

Après avoir récupéré l’ISO d’installation, il suffit de suivre les
menus.

[![](../../../assets/media/centreon/ces/centreon-enterprise-server-en-fonction-oracle-vm-virtualbox_002.png)](../../../_detail/centreon/ces/centreon-enterprise-server-en-fonction-oracle-vm-virtualbox_002.png@id=centreon%253Acentreon-enterprise-server.html "centreon:ces:centreon-enterprise-server-en-fonction-oracle-vm-virtualbox_002.png")

[![](../../../assets/media/centreon/ces/centreon-enterprise-server-en-fonction-oracle-vm-virtualbox_003.png)](../../../_detail/centreon/ces/centreon-enterprise-server-en-fonction-oracle-vm-virtualbox_003.png@id=centreon%253Acentreon-enterprise-server.html "centreon:ces:centreon-enterprise-server-en-fonction-oracle-vm-virtualbox_003.png")

[![](../../../assets/media/centreon/ces/centreon-enterprise-server-en-fonction-oracle-vm-virtualbox_004.png)](../../../_detail/centreon/ces/centreon-enterprise-server-en-fonction-oracle-vm-virtualbox_004.png@id=centreon%253Acentreon-enterprise-server.html "centreon:ces:centreon-enterprise-server-en-fonction-oracle-vm-virtualbox_004.png")

[![](../../../assets/media/centreon/ces/centreon-enterprise-server-en-fonction-oracle-vm-virtualbox_005.png)](../../../_detail/centreon/ces/centreon-enterprise-server-en-fonction-oracle-vm-virtualbox_005.png@id=centreon%253Acentreon-enterprise-server.html "centreon:ces:centreon-enterprise-server-en-fonction-oracle-vm-virtualbox_005.png")

[![](../../../assets/media/centreon/ces/centreon-enterprise-server-en-fonction-oracle-vm-virtualbox_006.png)](../../../_detail/centreon/ces/centreon-enterprise-server-en-fonction-oracle-vm-virtualbox_006.png@id=centreon%253Acentreon-enterprise-server.html "centreon:ces:centreon-enterprise-server-en-fonction-oracle-vm-virtualbox_006.png")

[![](../../../assets/media/centreon/ces/centreon-enterprise-server-en-fonction-oracle-vm-virtualbox_007.png)](../../../_detail/centreon/ces/centreon-enterprise-server-en-fonction-oracle-vm-virtualbox_007.png@id=centreon%253Acentreon-enterprise-server.html "centreon:ces:centreon-enterprise-server-en-fonction-oracle-vm-virtualbox_007.png")

[![](../../../assets/media/centreon/ces/centreon-enterprise-server-en-fonction-oracle-vm-virtualbox_008.png)](../../../_detail/centreon/ces/centreon-enterprise-server-en-fonction-oracle-vm-virtualbox_008.png@id=centreon%253Acentreon-enterprise-server.html "centreon:ces:centreon-enterprise-server-en-fonction-oracle-vm-virtualbox_008.png")

[![](../../../assets/media/centreon/ces/centreon-enterprise-server-en-fonction-oracle-vm-virtualbox_009.png)](../../../_detail/centreon/ces/centreon-enterprise-server-en-fonction-oracle-vm-virtualbox_009.png@id=centreon%253Acentreon-enterprise-server.html "centreon:ces:centreon-enterprise-server-en-fonction-oracle-vm-virtualbox_009.png")

[![](../../../assets/media/centreon/ces/centreon-enterprise-server-en-fonction-oracle-vm-virtualbox_010.png)](../../../_detail/centreon/ces/centreon-enterprise-server-en-fonction-oracle-vm-virtualbox_010.png@id=centreon%253Acentreon-enterprise-server.html "centreon:ces:centreon-enterprise-server-en-fonction-oracle-vm-virtualbox_010.png")

Voila l’installation est terminée pour le serveur central.

Post installation {#post-installation .sectionedit6}
-----------------

### Mysql {#mysql .sectionedit7}

Changement du mot de passe root de mysql

~~~
mysqladmin -u root password '*******'
~~~

### Réseau {#reseau .sectionedit8}

Par défaut le réseau est configuré en DHCP. Si vous utilisez un adresse
IP fixe, il suffit de se logger en root et de taper setup.

[![](../../../assets/media/centreon/ces/centreon-enterprise-server-en-fonction-oracle-vm-virtualbox_012.png)](../../../_detail/centreon/ces/centreon-enterprise-server-en-fonction-oracle-vm-virtualbox_012.png@id=centreon%253Acentreon-enterprise-server.html "centreon:ces:centreon-enterprise-server-en-fonction-oracle-vm-virtualbox_012.png")

[![](../../../assets/media/centreon/ces/centreon-enterprise-server-en-fonction-oracle-vm-virtualbox_013.png)](../../../_detail/centreon/ces/centreon-enterprise-server-en-fonction-oracle-vm-virtualbox_013.png@id=centreon%253Acentreon-enterprise-server.html "centreon:ces:centreon-enterprise-server-en-fonction-oracle-vm-virtualbox_013.png")

[![](../../../assets/media/centreon/ces/centreon-enterprise-server-en-fonction-oracle-vm-virtualbox_014.png)](../../../_detail/centreon/ces/centreon-enterprise-server-en-fonction-oracle-vm-virtualbox_014.png@id=centreon%253Acentreon-enterprise-server.html "centreon:ces:centreon-enterprise-server-en-fonction-oracle-vm-virtualbox_014.png")

[![](../../../assets/media/centreon/ces/centreon-enterprise-server-en-fonction-oracle-vm-virtualbox_015.png)](../../../_detail/centreon/ces/centreon-enterprise-server-en-fonction-oracle-vm-virtualbox_015.png@id=centreon%253Acentreon-enterprise-server.html "centreon:ces:centreon-enterprise-server-en-fonction-oracle-vm-virtualbox_015.png")

[![](../../../assets/media/centreon/ces/centreon-enterprise-server-en-fonction-oracle-vm-virtualbox_016.png)](../../../_detail/centreon/ces/centreon-enterprise-server-en-fonction-oracle-vm-virtualbox_016.png@id=centreon%253Acentreon-enterprise-server.html "centreon:ces:centreon-enterprise-server-en-fonction-oracle-vm-virtualbox_016.png")

[![](../../../assets/media/centreon/ces/centreon-enterprise-server-en-fonction-oracle-vm-virtualbox_017.png)](../../../_detail/centreon/ces/centreon-enterprise-server-en-fonction-oracle-vm-virtualbox_017.png@id=centreon%253Acentreon-enterprise-server.html "centreon:ces:centreon-enterprise-server-en-fonction-oracle-vm-virtualbox_017.png")

[![](../../../assets/media/centreon/ces/centreon-enterprise-server-en-fonction-oracle-vm-virtualbox_018.png)](../../../_detail/centreon/ces/centreon-enterprise-server-en-fonction-oracle-vm-virtualbox_018.png@id=centreon%253Acentreon-enterprise-server.html "centreon:ces:centreon-enterprise-server-en-fonction-oracle-vm-virtualbox_018.png")

[![](../../../assets/media/centreon/ces/centreon-enterprise-server-en-fonction-oracle-vm-virtualbox_019.png)](../../../_detail/centreon/ces/centreon-enterprise-server-en-fonction-oracle-vm-virtualbox_019.png@id=centreon%253Acentreon-enterprise-server.html "centreon:ces:centreon-enterprise-server-en-fonction-oracle-vm-virtualbox_019.png")

[![](../../../assets/media/centreon/ces/centreon-enterprise-server-en-fonction-oracle-vm-virtualbox_020.png)](../../../_detail/centreon/ces/centreon-enterprise-server-en-fonction-oracle-vm-virtualbox_020.png@id=centreon%253Acentreon-enterprise-server.html "centreon:ces:centreon-enterprise-server-en-fonction-oracle-vm-virtualbox_020.png")

### Modification des dépots {#modification-des-depots .sectionedit9}

Personnellement j’aime bien avoir à ma disposition des dépôts me
permettant d’installer les logiciels additionnels dont j’ai besoin. Les
dépots de la distribution ne me fournissent pas l’intégralité des
logiciels dont j’ai besoin

Cela n’est pas recommandé et peut casser votre distribution !

Il suffit de rajouter le dépôt rpmforge centos adéquat. Tout d’abord
nous devons determiner sur quelle version de centos repose Centreon
Enterprise Server. un petit coup de **uname -r** nous renvois
2.6.18-194.3.1.**el5**. C’est donc une centos 5. Pour ma part j’ai chois
une architecture 64bits donc mon dépot devra être de type x86\_64. Un
petit tour sur le wiki rpm forge
([http://rpmrepo.org/RPMforge/Using](http://rpmrepo.org/RPMforge/Using "http://rpmrepo.org/RPMforge/Using"))
me permet de selectionner le paquet rpm qui me rajoutera les dépôts
nécessaires :

~~~
rpm -Uvh http://packages.sw.be/rpmforge-release/rpmforge-release-0.5.2-2.el5.rf.x86_64.rpm
~~~
