---
layout: page
---

### Table des matières {.toggle}

-   [Centreon](start.html#centreon)
    -   [Présentation](start.html#presentation)
        -   [Schéma Fonctionnel](start.html#schema-fonctionnel)
    -   [Documentation](start.html#documentation)
        -   [Chapitre 1 -
            Installation](start.html#chapitre-1-installation)
        -   [Chapitre 2 - Interface
            Web](start.html#chapitre-2-interface-web)
        -   [Chapitre 3 - Prise en
            main](start.html#chapitre-3-prise-en-main)
        -   [Chapitre 4 - Partie
            Technique](start.html#chapitre-4-partie-technique)
        -   [Chapitre 4 -
            Suppléments](start.html#chapitre-4-supplements)

[![](../../../assets/media/nagios/centreon_logo.png)](../../../_detail/nagios/centreon_logo.png@id=centreon%253Astart.html "nagios:centreon_logo.png")

Centreon {#centreon .sectionedit1}
========

Ce dossier a été réalisé avec l’aide de :

  **Rôle**            **Nom**
  ------------------- ---------------------------------------------------
  **Créateur**        Romuald FRONTEAU
  **Contributeurs**   Romain BERTHAUD, David GUENAULT, Ludovic VALENTIN

Certaines des pages ressemblent énormément à celle de la documentation
officielle pour les raisons suivantes :

1.  La rédaction de ces pages est déjà pour un but personnel (doit
    installer un centreon sur RedHat)
2.  Certains internautes se plaignent du manque de documentation de
    Centreon et d’autres souffrent de la difficulté d’installation de
    celui-ci quand on est novice. Je veux tout d’abord démontrer que la
    documentation de Merethis est correcte (si différence il y a, nous
    nous rapprocherons d’eux pour leur faire part des points obscurs)
3.  J’aimerais faire de ces pages, non pas qu’un simple article sur
    Centreon mais creuser un peu plus en profondeur son principe de
    fonctionnement, comment l’utiliser, etc…

Présentation {#presentation .sectionedit3}
------------

[Centreon](http://www.centreon.com/ "http://www.centreon.com/") est
**LE** dérivé français de Nagios de référence développé par la société
Merethis. Il s’agit d’une couche applicative Web venant se greffer à
Nagios pour offrir une administration moins rudimentaire (évite les
fichiers de configuration et les lignes de commandes brute). L’équipe de
chez Merethis est avant-gardiste et a inspiré pour certains points les
lignes directrices de la communauté. C’est un produit très complet et
son interface le rend très professionnel aux yeux des dirigeants.

### Schéma Fonctionnel {#schema-fonctionnel .sectionedit4}

-   **Principe de fonctionnement**

Le schéma ci-dessous montre comment Centreon et Nagios intéragissent
l’un avec l’autre.

[![archi-centreon.jpg](../../../assets/media/powered/centreon/archi-centreon.jpg@w=700 "archi-centreon.jpg")](../../../_detail/powered/centreon/archi-centreon.jpg@id=centreon%253Astart.html "powered:centreon:archi-centreon.jpg")

-   **Gestion des flux**

Le schéma ci-dessous montre les protocoles et flux utilisés par les
différents éléments qui compose une supervision Centreon / Nagios

[![centreon-flux.jpg](../../../assets/media/powered/centreon/centreon-flux.jpg@w=700 "centreon-flux.jpg")](../../../_detail/powered/centreon/centreon-flux.jpg@id=centreon%253Astart.html "powered:centreon:centreon-flux.jpg")

Documentation {#documentation .sectionedit5}
-------------

### Chapitre 1 - Installation {#chapitre-1-installation .sectionedit6}

**[Installation de Centreon sur Centos
5.3](../../../centreon/centreon-centos-install.html "centreon:centreon-centos-install")**

**[Installation de Centreon sur RedHat
5](../../../centreon/centreon-redhat-install.html "centreon:centreon-redhat-install")**

**[Installation de Centreon sur Ubuntu
Server](../../../centreon/centreon-ubuntu-install.html "centreon:centreon-ubuntu-install")**

**[Installation de Centreon Enterprise
Server](../../../centreon/centreon-enterprise-server.html "centreon:centreon-enterprise-server")**

### Chapitre 2 - Interface Web {#chapitre-2-interface-web .sectionedit7}

**[2.1 -
Accueil](../../../centreon/manuel-utilisation/start.html#accueil "centreon:manuel-utilisation:start")**

1.  **[Tactical
    Overview](../../../centreon/manuel-utilisation/start.html#tactical-overview "centreon:manuel-utilisation:start")**
2.  **[Santé
    Globale](../../../centreon/manuel-utilisation/start.html#sante-globale "centreon:manuel-utilisation:start")**
3.  **[Statistique de
    Nagios](../../../centreon/manuel-utilisation/start.html#statistique-de-nagios "centreon:manuel-utilisation:start")**

**[2.2 -
Supervision](../../../centreon/manuel-utilisation/start.html#supervision "centreon:manuel-utilisation:start")**

1.  **[Les
    Hôtes](../../../centreon/manuel-utilisation/start.html#les-hotes "centreon:manuel-utilisation:start")**
2.  **[Les
    Services](../../../centreon/manuel-utilisation/start.html#les-services "centreon:manuel-utilisation:start")**
3.  **[Les journaux
    d'évènements](../../../centreon/manuel-utilisation/start.html#les-journaux-d-evenements "centreon:manuel-utilisation:start")**

**[2.3 -
Vues](../../../centreon/manuel-utilisation/start.html#vues "centreon:manuel-utilisation:start")**

**[2.4 -
Rapport](../../../centreon/manuel-utilisation/start.html#rapport "centreon:manuel-utilisation:start")**

**[2.5 -
Configuration](../../../centreon/manuel-utilisation/start.html#configuration "centreon:manuel-utilisation:start")**

1.  **[Hôtes](../../../centreon/manuel-utilisation/start.html#hotes "centreon:manuel-utilisation:start")**
2.  **[Services](../../../centreon/manuel-utilisation/start.html#services "centreon:manuel-utilisation:start")**
3.  **[Utilisateurs](../../../centreon/manuel-utilisation/start.html#utilisateurs "centreon:manuel-utilisation:start")**
4.  **[Commandes](../../../centreon/manuel-utilisation/start.html#commandes "centreon:manuel-utilisation:start")**
5.  **[Notifications](../../../centreon/manuel-utilisation/start.html#notifications "centreon:manuel-utilisation:start")**
6.  **[Nagios](../../../centreon/manuel-utilisation/start.html#nagios "centreon:manuel-utilisation:start")**
7.  **[Centreon](../../../centreon/manuel-utilisation/start.html#centreon "centreon:manuel-utilisation:start")**

**[2.6 -
Administration](../../../centreon/manuel-utilisation/start.html#administration "centreon:manuel-utilisation:start")**

1.  **[Options](../../../centreon/manuel-utilisation/start.html#options "centreon:manuel-utilisation:start")**
2.  **[Modules](../../../centreon/manuel-utilisation/start.html#modules "centreon:manuel-utilisation:start")**
3.  **[ACL](../../../centreon/manuel-utilisation/start.html#acl "centreon:manuel-utilisation:start")**
4.  **[Base de
    données](../../../centreon/manuel-utilisation/start.html#base-de-donnees "centreon:manuel-utilisation:start")**
5.  **[Sessions](../../../centreon/manuel-utilisation/start.html#sessions "centreon:manuel-utilisation:start")**
6.  **[Etat du
    Serveur](../../../centreon/manuel-utilisation/start.html#etat-du-serveur "centreon:manuel-utilisation:start")**
7.  **[A
    propos](../../../centreon/manuel-utilisation/start.html#a-propos "centreon:manuel-utilisation:start")**

* * * * *

### Chapitre 3 - Prise en main {#chapitre-3-prise-en-main .sectionedit8}

**[3.1 - Ajout d'un
hôte](../../../centreon/manuel-utilisation/start.html#ajout-d-un-hote "centreon:manuel-utilisation:start")**

**[3.2 - Ajout d'un groupe
d'hôtes](../../../centreon/manuel-utilisation/start.html#ajout-d-un-groupe-d-hotes "centreon:manuel-utilisation:start")**

**[3.3 - Ajout d'une
Commande](../../../centreon/manuel-utilisation/start.html#ajout-d-une-commande "centreon:manuel-utilisation:start")**

**[3.4 - Ajout d'un
service](../../../centreon/manuel-utilisation/start.html#ajout-d-un-service "centreon:manuel-utilisation:start")**

**[3.5 - Suppression d'un
service](../../../centreon/manuel-utilisation/start.html#suppression-d-un-service "centreon:manuel-utilisation:start")**

**[3.6 - Paramétrage d’un compte utilisateur en lecture
seule](../../../centreon/manuel-utilisation/start.html#parametrage-d-un-compte-utilisateur-en-lecture-seule "centreon:manuel-utilisation:start")**

**[3.7 - Personnaliser l'apparence des
courbes](../../../centreon/manuel-utilisation/start.html#personnaliser-l-apparence-des-courbes "centreon:manuel-utilisation:start")**

### Chapitre 4 - Partie Technique {#chapitre-4-partie-technique .sectionedit9}

**[Installation du patch Multi Broker pour
Centreon](../../../centreon/multi-broker-patch-install.html "centreon:multi-broker-patch-install")**

**[Installation de MKLiveStatus et Intégration dans
Centreon](../../../centreon/mklivestatus-install-integration-centreon.html "centreon:mklivestatus-install-integration-centreon")**

**[Documentation Technique sur
Centreon](../../../centreon/centreon-doc-technique.html "centreon:centreon-doc-technique")**

**[Superviser le Spanning Tree avec
Centreon](../../../centreon/superviser-spanning-tree.html "centreon:superviser-spanning-tree")**
\

**[Intégrer Nagvis dans
Centreon](../../../centreon/integration-nagvis.html "centreon:integration-nagvis")**
\

**[Superviser un OXE Alcatel-Lucent avec
Centreon](../../../centreon/superviser-oxe-alcatel.html "centreon:superviser-oxe-alcatel")**

### Chapitre 4 - Suppléments {#chapitre-4-supplements .sectionedit10}

**[La supervision en général sur le wiki
Monitoring-fr](../../../supervision/start.html "supervision:start")**

-   [Commandes pour la
    supervision](../../../supervision/commands.html "supervision:commands")
-   [Dstat](../../../supervision/dstat.html "supervision:dstat")
-   [Installer ou activer
    SNMP](../../../supervision/snmp-install.html "supervision:snmp-install")
-   [Mode actif](../../../supervision/actif.html "supervision:actif")
-   [Mode passif](../../../supervision/passif.html "supervision:passif")
-   [Ntop](../../../supervision/ntop/start.html "supervision:ntop:start")
-   [Panorama](../../../supervision/links.html "supervision:links")
-   [RRDTool](../../../supervision/rrdtool.html "supervision:rrdtool")
-   [SNMP](../../../supervision/snmp.html "supervision:snmp")
-   [Supervision Hardware
    IPMI](../../../supervision/ipmi.html "supervision:ipmi")
-   [Supervision du ressenti
    utilisateur](../../../supervision/eue/start.html "supervision:eue:start")
-   [Tableaux récapitulatifs des différents fichiers
    importants](../../../supervision/important-files.html "supervision:important-files")

**[Présentation de l'interface Centreon 2.1 et de son
utilisation](../../../centreon/centreon-interface-utilisation.html "centreon:centreon-interface-utilisation")**

**[Tableau de correspondance des
plugins](../../../centreon/tableau-correspondance-plugins.html "centreon:tableau-correspondance-plugins")**
