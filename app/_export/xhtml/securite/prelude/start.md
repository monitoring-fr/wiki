---
layout: page
---

### Table des matières {.toggle}

-   [Prelude-IDS](start.html#prelude-ids)
    -   [Présentation](start.html#presentation)
        -   [Composants Prelude](start.html#composants-prelude)
        -   [Compatibilités Prelude](start.html#compatibilites-prelude)
    -   [Documentation](start.html#documentation)
        -   [Chapitre 1 -
            Installation](start.html#chapitre-1-installation)
        -   [Chapitre 2 - Prise en
            main](start.html#chapitre-2-prise-en-main)
        -   [Chapitre 3 - Expertise](start.html#chapitre-3-expertise)

Prelude-IDS {#prelude-ids .sectionedit1}
===========

Dans ce dossier, figure une présentation des fonctionnalités de
Prelude-IDS, ainsi qu’un ensemble de documentations et de tutoriels sur
la mise en place d’un système Prelude.

Pour toutes questions, informations complémentaires sur Prelude-IDS,
rendez-vous sur le
[forum](http://forums.monitoring-fr.org/ "http://forums.monitoring-fr.org/")
du site.

Ce dossier a été réalisé par :

  **Rôle**              **Nom**
  --------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------
  **Rédacteur**         [Ludovic VALENTIN](http://www.monitoring-fr.org/community/members/ludovic-valentin/ "http://www.monitoring-fr.org/community/members/ludovic-valentin/")
  **Contributeur(s)**   [Romuald FRONTEAU](http://www.monitoring-fr.org/community/members/romuald-fronteau/ "http://www.monitoring-fr.org/community/members/romuald-fronteau/")

Présentation {#presentation .sectionedit3}
------------

[![](../../../../assets/media/securite/prelude-logo.png@w=150)](../../../../_detail/securite/prelude-logo.png@id=securite%253Aprelude%253Astart.html "securite:prelude-logo.png")

Prelude, ou Prelude-IDS
([http://www.prelude-technologies.com](http://www.prelude-technologies.com "http://www.prelude-technologies.com")),
est un système de détection d’intrusion hybride composé de plusieurs
plugins, sondes. Prelude a été conçu dans le but d’être modulaire,
souple, et résistant aux attaques. Sa modularité permet notamment de lui
rajouter facilement de nouveaux types de détecteurs d’intrusion,
d’analyseurs de logs et d’une solution de corrélation, le tout au format
et à la norme IDMEF (Intrusion Detection Message Exchange Format), bien
que de nombreux autres formats de logs sont compatibles.

Le format IDMEF décrit une alerte de façon objet et exhaustive. Une
alerte est le message qui est émis depuis un analyseur, qui est une
sonde en langage IDMEF, vers un collecteur. Le but d’IDMEF est de
proposer un standard permettant d’avoir une communication hétérogène
quel que soit l’environnement ou les capacités d’un analyseur donné. Ces
alertes sont définies au format XML, offrant une possibilité de
validation de chaque message. En général, les implémentations restent
binaires, afin d’éviter les problèmes connus d’ajout d’information
inutiles en dehors d’XML lorsque l’on envoie un message sur le réseau.

IDMEF offre aussi un vocabulaire précis, qu’il est courant d’utiliser
dans le domaine de la détection d’intrusions. Par exemple, une
classification correspond au nom d’une alerte, un impact celui d’un
niveau d’attaque.

L’intérêt de Prelude est de pouvoir centraliser les alertes dans sa base
de données et de les normaliser au format IDMEF, puis visualisable dans
une interface web.

Prelude peut intégrer :

-   un NIDS (Network Intrusion Detection System, par exemple Snort)
-   un HIDS (Host Intrusion Detection System, par exemple Ossec)
-   un LML (Log Monitoring Lackey, module Prelude : Prelude-LML)
-   un corrélateur (module Prelude : Prelude-Correlator)
-   une interface web (module Prelude : Prelude-Prewikka)

L’application Prelude est disponible uniquement sous Linux, bien qu’il
ait une offre payante (support, fonctionnalités supplémentaires, …), le
logiciel est gratuit.

### Composants Prelude {#composants-prelude .sectionedit4}

#### Libprelude

Libprelude est une bibliothèque permettant une communication sécurisée
entre différentes sondes et un serveur Prelude (Prelude-Manager). De
plus, il fournit une API (Application Programming Interface) afin de
permettre la génération d’alertes au format standard IDMEF (par exemple,
libprelude “traduit” une alerte Ossec en IDMEF).

La bibliothèque permet également d’automatiser l’enregistrement et la
retransmission des alertes en cas de perte d’un des composants.

#### LibpreludeDB

La librairie LibpreludeDB permet la gestion du type et du format de la
base de données utilisée pour stocker les alertes au format IDMEF. Elle
offre aussi la possibilité de gérer la base de données sans utiliser du
SQL, grâce à l’usage de commandes, spécialement développées pour
interagir depuis un terminal Linux.

#### Prelude-Manager

Prelude-Manager est le composant principal de Prelude, il joue le rôle
de serveur. En effet, il réceptionne les alertes IDMEF provenant de ses
sondes ou de ses composants (Prelude-Correlator).

#### Prelude-Correlator

C’est un outil de corrélation multiflux, utilisant des règles écrites en
Python pour corréler les alertes IDMEF reçues par Prelude-Manager.

#### Prelude-LML

Prelude-LML est un analyseur de fichiers de logs. En agissant comme
sonde auprès de Prelude-Manager, il collecte et analyse les informations
issues de tous types d’applications émettant des évènements sous forme
de journaux systèmes, de massages syslog, …etc. Il détecte des activités
suspectes lors de ses analyses, puis génère des alertes au format IDMEF
et les transmet au serveur Prelude.

#### Prewikka

Interface web de Prelude. Prewikka permet de visualiser les alertes
reçues par Prelude-Manager.

### Compatibilités Prelude {#compatibilites-prelude .sectionedit5}

-   AuditD
-   **[Snort](../../../../securite/snort/start.html "securite:snort:start")**
-   SanCP
-   **[Nagios](../../../../nagios/start.html "nagios:start")**
    (**[check\_prelude](../../../../nagios/plugins/check_prelude.html "nagios:plugins:check_prelude")**)
-   **[Ossec](../../../../securite/ossec/start.html "securite:ossec:start")**
-   Nepenthes
-   PAM
-   NuFW
-   Samhain

Documentation {#documentation .sectionedit6}
-------------

### Chapitre 1 - Installation {#chapitre-1-installation .sectionedit7}

**[Installation de Prelude-IDS sur
Ubuntu](../../../../securite/prelude/prelude-ubuntu-install.html "securite:prelude:prelude-ubuntu-install")**

1.  **[Pré-requis](../../../../securite/prelude/prelude-ubuntu-install.html#pre-requis "securite:prelude:prelude-ubuntu-install")**
2.  **[Libprelude](../../../../securite/prelude/prelude-ubuntu-install.html#libprelude "securite:prelude:prelude-ubuntu-install")**
3.  **[LibpreludeDB](../../../../securite/prelude/prelude-ubuntu-install.html#libpreludedb "securite:prelude:prelude-ubuntu-install")**
4.  **[Prelude-Manager](../../../../securite/prelude/prelude-ubuntu-install.html#prelude-manager "securite:prelude:prelude-ubuntu-install")**
5.  **[Prelude-Correlator](../../../../securite/prelude/prelude-ubuntu-install.html#prelude-correlator "securite:prelude:prelude-ubuntu-install")**
6.  **[Prelude-LML](../../../../securite/prelude/prelude-ubuntu-install.html#prelude-lml "securite:prelude:prelude-ubuntu-install")**
7.  **[Prewikka](../../../../securite/prelude/prelude-ubuntu-install.html#prewikka "securite:prelude:prelude-ubuntu-install")**

### Chapitre 2 - Prise en main {#chapitre-2-prise-en-main .sectionedit8}

**[Prise en main de
Prelude-IDS](../../../../securite/prelude/prelude-use.html "securite:prelude:prelude-use")**

1.  **[Administration des composants
    Prelude](../../../../securite/prelude/prelude-use.html#administration-des-composants-prelude "securite:prelude:prelude-use")**
2.  **[Inscriptions des composants Prelude et des
    sondes](../../../../securite/prelude/prelude-use.html#inscriptions-des-composants-prelude-et-des-sondes "securite:prelude:prelude-use")**
3.  **[Démarrage de
    Prelude](../../../../securite/prelude/prelude-use.html#demarrage-de-prelude "securite:prelude:prelude-use")**

### Chapitre 3 - Expertise {#chapitre-3-expertise .sectionedit9}

**[Architecture d'une solution Sécurité
OSS](../../../../securite/architecture-oss/start.html#architecture "securite:architecture-oss:start")**
