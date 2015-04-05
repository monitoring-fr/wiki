---
layout: page
title: Ossec
---

Dans ce dossier, figure une présentation des fonctionnalités d’Ossec, ainsi qu’un ensemble de documentations et de tutoriels sur la mise en place d’un système Ossec.

Pour toutes questions, informations complémentaires sur Ossec, rendez-vous sur le [forum](http://forums.monitoring-fr.org/ "http://forums.monitoring-fr.org/") du site.

Ce dossier a été réalisé par :

  **Rôle**              **Nom**
  --------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------
  **Rédacteur**         [Ludovic VALENTIN](http://www.monitoring-fr.org/community/members/ludovic-valentin/ "http://www.monitoring-fr.org/community/members/ludovic-valentin/")
  **Contributeur(s)**   [Romuald FRONTEAU](http://www.monitoring-fr.org/community/members/romuald-fronteau/ "http://www.monitoring-fr.org/community/members/romuald-fronteau/")

Présentation {#presentation .sectionedit3}
------------

[![ossec-logo.jpg](../../assets/media/securite/ossec-logo.jpg "ossec-logo.jpg")](../../_detail/securite/ossec-logo.jpg@id=securite%253Aossec%253Astart.html "securite:ossec-logo.jpg")

Ossec
([http://www.ossec.net](http://www.ossec.net "http://www.ossec.net"))
est une application de détection d’intrusion, et plus précisément un
HIDS (Host Intrusion Detection System). Il permet de surveiller
l’intégrité des fichiers systèmes, aussi bien sur des postes Linux que
Windows.

De plus, Ossec détecte également des attaques de pirates comme les
rootkits, les scans de ports, et analyse les logs du système, des
applications et des services. Le logiciel propose également un système
de réponses actives, c’est-à-dire d’actions à réaliser en cas d’attaque,
comme par exemple changer les paramètres d’un parefeu. Tout comme Snort,
il dispose de nombreuses règles lui offrant un large panel de détection
d’attaques, de problèmes sur le poste sur lequel il est installé.

Ossec peut également fonctionner selon le modèle client/serveur, avec un
serveur dédié Ossec, et sur tous les postes clients (serveurs) à
surveiller une installation du logiciel client, qui est alors chargé
d’envoyer les évènements, les alertes au serveur.

Ossec fonctionne essentiellement sur Linux, mais il peut surveiller
également des postes Windows grâce à une application cliente
spécialement développée pour, mais pour la version serveur, seul un
système d’exploitation Linux est supporté.

Documentation {#documentation .sectionedit4}
-------------

### Chapitre 1 - Installation {#chapitre-1-installation .sectionedit5}

**[Installation d'Ossec sur
Ubuntu](ossec-ubuntu-install.html "securite:ossec:ossec-ubuntu-install")**

1.  **[Pré-requis](ossec-ubuntu-install.html#pre-requis "securite:ossec:ossec-ubuntu-install")**
2.  **[Ossec-HIDS](ossec-ubuntu-install.html#ossec-hids "securite:ossec:ossec-ubuntu-install")**
3.  **[Ossec-WUI](ossec-ubuntu-install.html#ossec-wui "securite:ossec:ossec-ubuntu-install")**

### Chapitre 2 - Prise en main {#chapitre-2-prise-en-main .sectionedit6}

**[Prise en main d'Ossec](ossec-use.html "securite:ossec:ossec-use")**

1.  **[Administration
    d'Ossec](ossec-use.html#administration-d-ossec "securite:ossec:ossec-use")**
2.  **[Inscription des
    agents](ossec-use.html#inscription-des-agents "securite:ossec:ossec-use")**
3.  **[Démarrage
    d'Ossec](ossec-use.html#demarrage-d-ossec "securite:ossec:ossec-use")**

### Chapitre 3 - Expertise {#chapitre-3-expertise .sectionedit7}

**[Architecture d'une solution Sécurité OSS](../architecture-oss/start.html#architecture "securite:architecture-oss:start")**