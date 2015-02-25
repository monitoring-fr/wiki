---
layout: page
---

### Table des matières {.toggle}

-   [Instalation de shinken les yeux
    fermés](shinken-10min-start.html#instalation-de-shinken-les-yeux-fermes)
    -   [Prérequis](shinken-10min-start.html#prerequis)
        -   [Prérequis
            communs](shinken-10min-start.html#prerequis-communs)
        -   [Prérequis
            optionnels](shinken-10min-start.html#prerequis-optionnels)
        -   [Installer et vérifier les prérequis communs sous
            Linux](shinken-10min-start.html#installer-et-verifier-les-prerequis-communs-sous-linux)
    -   [Comment installer
        shinken](shinken-10min-start.html#comment-installer-shinken)
        -   [Etape
            préliminaire](shinken-10min-start.html#etape-preliminaire)
        -   [Première manière : Script d'installation (recommandé pour
            les utilisateurs
            finaux)](shinken-10min-start.html#premiere-manierescript-d-installation-recommande-pour-les-utilisateurs-finaux)

Instalation de shinken les yeux fermés {#instalation-de-shinken-les-yeux-fermes .sectionedit1}
======================================

  **Rôle**        **Nom**
  --------------- ----------------
  **Rédacteur**   David GUENAULT

Prérequis {#prerequis .sectionedit3}
---------

Shinken peut s’installer de troix manières différentes. Le choix d’une
manière est fonction de vos objectifs. En résumé :

-   setup.py : pour les packagers
-   install : la méthode facile
-   Tout dans un répertoire : pour tester rapidement la solution

Gardez bien a l’esprit que les différentes méthodes d’installation sont
incompatibles entre elles. Si vous choisissez une méthode vous ne
pourrez pas appliquer une autre méthode par la suite. A moins de
désinstaller complètement et reprendre depuis le début avec une autre
méthode.

Si vous choisissez la méthode d’installation par le script install, vous
n’avez pas besoin de lire la section prérequis

### Prérequis communs {#prerequis-communs .sectionedit4}

Shinken à besoin de :

-   Python 2.4 ou supérieur (python 2.6 est recommandé et deviendra le
    prérequis minimal pour les futures versions de shinken). L’interface
    shinken nécessite au minimum python 2.6.
-   setuptools ou distribute ou pip pour les modules python.
-   Le module python pyro en version inférieure à 4.14
-   Le module python multiprocessing quand vous utilisez une version de
    python inférieure a 2.6.
-   Le paquet python-devel

### Prérequis optionnels {#prerequis-optionnels .sectionedit5}

Si (et seulement si) vous prévoyez d’utiliser le module livestatus ou
l’interface web, vous aurez également besoin de :

-   simplejson
-   ujson (permet d’améliorer les perfomances de livestatus)
-   pysqlite

### Installer et vérifier les prérequis communs sous Linux {#installer-et-verifier-les-prerequis-communs-sous-linux .sectionedit6}

#### Python

La version livrée avec les principales distribution devrait être
correcte

#### Pyro

Sous Debian et ses dérivées (Ubuntu par exemple), vous pouvez installer
pyro de la manière suivante :

~~~~ {.code}
apt-get install pyro
~~~~

Sous Redhat/Centos une recherche dans les dépot devrais permettre de
retrouver le paquet

~~~~ {.code}
yum search pyro
~~~~

Si vous ne trouvez pas le module pyro, vous pouvez utiliser les
setup-tools

~~~~ {.code}
easy_install pyro
~~~~

Comment installer shinken {#comment-installer-shinken .sectionedit7}
-------------------------

### Etape préliminaire {#etape-preliminaire .sectionedit8}

Cette étape n’est pas nécéssaire pour l’installation par le script
install

-   Télécharger et décomprésser l’archive de shinken
    ([https://github.com/naparuba/shinken](https://github.com/naparuba/shinken "https://github.com/naparuba/shinken"))

-   Via clone du dépot sur github

-   Via téléchargement de l’archive

-   Créer l’utilisateur et le group shinken

~~~~ {.code}
useradd --user-group shinken
usermod --lock shinken
~~~~

### Première manière : Script d'installation (recommandé pour les utilisateurs finaux) {#premiere-manierescript-d-installation-recommande-pour-les-utilisateurs-finaux .sectionedit9}

#### Installation

Vous pouvez utiliser le script d’installation situé à la racine des
sources shinken (install). Ce script va créer l’utilisateur et le groupe
shinken, résoudre les dépendances et installer shinken. Il est
compatible avec Debian (5/6), Ubuntu (à partir de la version 11), RedHat
et Centos (5/6). Les seuls prérequis sont une connexion à internet pour
le serveur sur lequel vous allez installer shinken. Vous pouvez
également modifier le chemin d’installation (par modification du fichier
install.d/shinken.conf ou simplement en positionnant la variable
d’environnement TARGET).

Pour installer shinken en quelques secondes/minutes, il suffit de lancer
la commande suivante :

~~~~ {.code}
./install -i
~~~~

Allez prendre un café, a votre retour shinken sera installé.

#### Mise à jour {#mise-a-jour}

1.  Récupérer la dernière archive sur le dépôt github de shinken

1.  Positionnez vous dans le répertoire des sources

1.  Sauvegarder la configuration, les plugins, les addons et récupérer
    l’identifiant de backup qui apparait à la fin du processus de
    sauvegarde

~~~~ {.code}
./install -b
~~~~

1.  Supprimer la version de shinken existante

~~~~ {.code}
./install -u
~~~~

1.  Installer la nouvelle version

~~~~ {.code}
./install -i
~~~~

1.  restaurer la sauvegarde

~~~~ {.code}
./install -r backupid
~~~~

#### Désinstaller shinken {#desinstaller-shinken}

1.  Positionnez vous dans le repertoire des sources shinken et lancer la
    commande suivante :

~~~~ {.code}
./install -u
~~~~

#### Contrôler shinken {#controler-shinken}

-   Lancement : /etc/init.d/shinken start
-   Arrêt : /etc/init.d/shinken stop
-   Redémarrage : /etc/init.d/shinken restart
-   Prise en compte d’une nouvelle configuration :
    /etc/init.d/shinken-arbiter restart

Vous pouvez démarrer en mode debug en utilisant -d dans la ligne de
commande

Ex : /etc/init.d/shinken -d restart
