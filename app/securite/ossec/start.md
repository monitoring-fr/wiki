---
layout: page
---

[[[Ossec](start@do=backlink.html)]]

[wiki monitoring-fr.org](../../start.html "[ALT+H]")

![Logo Monitoring](../../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../../start.html "start") »
[Sécurité](../start.html "securite:start") »
[Ossec](start.html "securite:ossec:start")

### Table des matières {.toggle}

-   [Ossec](start.html#ossec)
    -   [Présentation](start.html#presentation)
    -   [Documentation](start.html#documentation)
        -   [Chapitre 1 -
            Installation](start.html#chapitre-1-installation)
        -   [Chapitre 2 - Prise en
            main](start.html#chapitre-2-prise-en-main)
        -   [Chapitre 3 - Expertise](start.html#chapitre-3-expertise)

Ossec {#ossec .sectionedit1}
=====

Dans ce dossier, figure une présentation des fonctionnalités d’Ossec,
ainsi qu’un ensemble de documentations et de tutoriels sur la mise en
place d’un système Ossec.

Pour toutes questions, informations complémentaires sur Ossec,
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

**[Architecture d'une solution Sécurité
OSS](../architecture-oss/start.html#architecture "securite:architecture-oss:start")**

SOMMAIRE {#sommaire .sectionedit1}
--------

**[Accueil](../../start.html "start")**

**[Supervision](../../supervision/start.html "supervision:start")**

-   [Nagios](../../nagios/start.html "nagios:start")
-   [Centreon](../../centreon/start.html "centreon:start")
-   [Shinken](../../shinken/start.html "shinken:start")
-   [Zabbix](../../zabbix/start.html "zabbix:start")
-   [OpenNMS](../../opennms/start.html "opennms:start")
-   [EyesOfNetwork](../../eyesofnetwork/start.html "eyesofnetwork:start")
-   [Groundwork](../../groundwork/start.html "groundwork:start")
-   [Zenoss](../../zenoss/start.html "zenoss:start")
-   [Vigilo](../../vigilo/start.html "vigilo:start")
-   [Icinga](../../icinga/start.html "icinga:start")
-   [Cacti](../../cacti/start.html "cacti:start")
-   [Ressenti
    utilisateur](../../supervision/eue/start.html "supervision:eue:start")
-   [Ressenti utilisateur avec
    sikuli](../../sikuli/eue/start.html "sikuli:eue:start")

**[Hypervision](../../hypervision/start.html "hypervision:start")**

-   [Canopsis](../../canopsis/start.html "canopsis:start")

**[Sécurité](../start.html "securite:start")**

**[Infrastructure](../../infra/start.html "infra:start")**

**[Développement](../../dev/start.html "dev:start")**

Sécurité {#securite .sectionedit1}
--------

-   [Architecture d'une solution Sécurité
    OSS](../architecture-oss/start.html "securite:architecture-oss:start")
-   [Ossec](start.html "securite:ossec:start")
    -   [Installation d'Ossec sur
        Ubuntu](ossec-ubuntu-install.html "securite:ossec:ossec-ubuntu-install")
    -   [Prise en main
        d'Ossec](ossec-use.html "securite:ossec:ossec-use")
-   [Prelude-IDS](../prelude/start.html "securite:prelude:start")
    -   [Installation de Prelude-IDS sur
        Ubuntu](../prelude/prelude-ubuntu-install.html "securite:prelude:prelude-ubuntu-install")
    -   [Prise en main de
        Prelude-IDS](../prelude/prelude-use.html "securite:prelude:prelude-use")
-   [Snort](../snort/start.html "securite:snort:start")
    -   [Installation de Oinkmaster sur
        Ubuntu](../snort/oinkmaster-ubuntu-install.html "securite:snort:oinkmaster-ubuntu-install")
    -   [Installation de Snort sur
        Ubuntu](../snort/snort-ubuntu-install.html "securite:snort:snort-ubuntu-install")

-   [Afficher le texte
    source](start@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](start@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](start@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](start@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](start@do=media.html "Gestionnaire de médias")
-   [Index](start@do=index.html "Index [X]")
-   [Connexion](start@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de page](start.html#dokuwiki__top "Haut de page [T]")

securite/ossec/start.txt · Dernière modification: 2013/03/29 09:39
(modification externe)

[![CC Attribution-Noncommercial-Share Alike 3.0
Unported](../../lib/images/license/button/cc-by-nc-sa.png)](http://creativecommons.org/licenses/by-nc-sa/3.0/)

[![www.chimeric.de](../../lib/tpl/arctic/images/button-chimeric-de.png)](http://www.chimeric.de "www.chimeric.de")
[![Valid
CSS](../../lib/tpl/arctic/images/button-css.png)](http://jigsaw.w3.org/css-validator/check/referer "Valid CSS")
[![Driven by
DokuWiki](../../lib/tpl/arctic/images/button-dw.png)](http://wiki.splitbrain.org/wiki:dokuwiki "Driven by DokuWiki")
[![do yourself a favour and use a real browser - get
firefox!!](../../lib/tpl/arctic/images/button-firefox.png)](http://www.firefox-browser.de "do yourself a favour and use a real browser - get firefox")
[![Recent changes RSS
feed](../../lib/tpl/arctic/images/button-rss.png)](../../feed.php "Recent changes RSS feed")
[![Valid XHTML
1.0](../../lib/tpl/arctic/images/button-xhtml.png)](http://validator.w3.org/check/referer "Valid XHTML 1.0")

![](../../lib/exe/indexer.php@id=securite%253Aossec%253Astart&1424859534)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
