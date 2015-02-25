---
layout: page
---

### Table des matières {.toggle}

-   [Lilac Platform](lilac-platform.html#lilac-platform)
    -   [Installation](lilac-platform.html#installation)
    -   [Configuration](lilac-platform.html#configuration)

Lilac Platform {#lilac-platform .sectionedit1}
==============

La [Plateforme
Lilac](http://www.lilacplatform.com/ "http://www.lilacplatform.com/")
est une collection d’outils conçus pour améliorer les application open
source de supervision, écrit par Lila Networks. Le premier outil paru
est le Lilac Configurator conçu pour assurer la configuration de Nagios.
Le code de base de Lilac Configurator est basé sur celui du défunt
projet Fruity. Les principales fonctionnalités sont les suivantes:

-   Support des périodes de temps de Nagios 3
-   Supporte l’héritage multiple de gabarits
-   Des gabarits d’hôtes capables de recevoir de services, des
    dépendances et des escalades
-   Un outil d’import qui peut importer les configurations Nagios
    existantes ainsi que les imports d’installation Fruity
-   Export avec contrôle de cohérence des fichiers générés ainsi que la
    sauvegarde des fichiers existants
-   Outil d’auto-découverte pour ajouter rapidement l’infrastructure à
    superviser dans votre installation Nagios

Installation {#installation .sectionedit2}
------------

La dernière version du code source est à télécharger sur le [site de
Lilac
Platform](http://www.lilacplatform.com/downloads "http://www.lilacplatform.com/downloads").

Il y a quelques pré-requis qu’il est facile de satisfaire

~~~~ {.code .bash}
sudo apt-get install php5-curl php-pear php5-cli php5-mysql
~~~~

Ensuite, c’est une simple décompression de l’archive récupérée et
déplacement des fichiers dans un répertoire servi par le serveur web.

~~~~ {.code .bash}
tar -xzf lilac-1.0.2.tar.gz
sudo mv lilac-1.0.2 /var/www/lilac
~~~~

le reste se passe directement depuis l’installeur web
[http://nagios/lilac/install.php](http://nagios/lilac/install.php "http://nagios/lilac/install.php")

[![](../../../../assets/media/addons/lilac-install1.png@w=700)](../../../../_detail/addons/lilac-install1.png@id=nagios%253Aaddons%253Alilac-platform.html "addons:lilac-install1.png")

Ce premier écran permet de vérifier la conformité de votre installation
php par rapport aux pré-requis de Lilac.

[![](../../../../assets/media/addons/lilac-install2.png@w=700)](../../../../_detail/addons/lilac-install2.png@id=nagios%253Aaddons%253Alilac-platform.html "addons:lilac-install2.png")

Ce deuxième écran permet de préciser les réglages à utiliser pour la
base de données dont a besoin Lilac Configurator.

le script est capable de créer la base de données et l’utilisateur
afférent.

[![](../../../../assets/media/addons/lilac-install3.png@w=700)](../../../../_detail/addons/lilac-install3.png@id=nagios%253Aaddons%253Alilac-platform.html "addons:lilac-install3.png")

Le dernier écran permet simplement d’envoyer quelques informations à
l’éditeur à des fins de statistiques. C’est optionnel et il est tout à
fait possible de se rendre sur l’installation ainsi terminée par le lien
“Launch Lilac Now”.

[![](../../../../assets/media/addons/lilac-index.png@w=700)](../../../../_detail/addons/lilac-index.png@id=nagios%253Aaddons%253Alilac-platform.html "addons:lilac-index.png")

L’installation à proprement parlé est terminée. Il reste à voir la
configuration.

Configuration {#configuration .sectionedit3}
-------------

![FIXME](../../../../lib/images/smileys/fixme.gif) A continuer…
