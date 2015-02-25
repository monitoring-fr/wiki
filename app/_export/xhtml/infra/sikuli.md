---
layout: page
---

### Table des matières {.toggle}

-   [Installation de sikuli IDE sous Ubuntu
    10.10](sikuli.html#installation-de-sikuli-ide-sous-ubuntu-1010)
-   [Téléchargement](sikuli.html#telechargement)
-   [Prérequis](sikuli.html#prerequis)
-   [Installation](sikuli.html#installation)
-   [Introduction au scripting avec
    sikuli](sikuli.html#introduction-au-scripting-avec-sikuli)
    -   [Exploration de l'éditeur](sikuli.html#exploration-de-l-editeur)
    -   [Création du premier
        script](sikuli.html#creation-du-premier-script)

Installation de sikuli IDE sous Ubuntu 10.10 {#installation-de-sikuli-ide-sous-ubuntu-1010 .sectionedit1}
============================================

Sikuli est une application permettant de piloter des applications
graphiques au travers de scripts et de capture d’écran. Cette
application rentre dans la catégorie de la supervision du ressenti
utilisateur.

Téléchargement {#telechargement .sectionedit2}
==============

-   [http://sikuli.org/download.shtml\#linux](http://sikuli.org/download.shtml#linux "http://sikuli.org/download.shtml#linux")

Prérequis {#prerequis .sectionedit3}
=========

Sous Ubuntu 10.04 et 10.10 la libcv est passée en version 4. Il faudra
donc la recompiler sur ces plateformes.

Vous aurez besoin d’installer une machine virtuelle java. Il est
préférable d’utiliser une version sun/oracle de la machine virtuelle
java.

~~~~ {.code}
# Ubuntu
sudo apt-get install wmctrl libcv2.1 libcvaux2.1 libhighgui2.1
~~~~

Installation {#installation .sectionedit4}
============

Il suffit d’extraire le contenu de l’archive zip puis de lancer le
script **sikuli-ide** situé dans le répertoire
Sikuli-X-1.0rc2-linux/Sikuli-IDE

Introduction au scripting avec sikuli {#introduction-au-scripting-avec-sikuli .sectionedit5}
=====================================

Exploration de l'éditeur {#exploration-de-l-editeur .sectionedit6}
------------------------

[![](../../../assets/media/infra/sikuli/interface.png@w=700)](../../../_detail/infra/sikuli/interface.png@id=infra%253Asikuli.html "infra:sikuli:interface.png")

Comme on peut le voir L’éditeur de scripts Sikuli est très simple. Pour
autant, simple ne veut pas dire simpliste. L’interface est divisée en 4
zones principales (en fait 5 mais nous en discuterons plus tard).

Création du premier script {#creation-du-premier-script .sectionedit7}
--------------------------

Pour débuter vous n’avez pas besoin de savoir programmer. L’ide est
suffisamment intuitif pour produire des scripts simples.
