---
layout: page
---

[[[Snort](start@do=backlink.html)]]

[wiki monitoring-fr.org](../../start.html "[ALT+H]")

![Logo Monitoring](../../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../../start.html "start") »
[Sécurité](../start.html "securite:start") »
[Snort](start.html "securite:snort:start")

### Table des matières {.toggle}

-   [Snort](start.html#snort)
    -   [Présentation](start.html#presentation)
    -   [Documentation](start.html#documentation)
        -   [Chapitre 1 -
            Installation](start.html#chapitre-1-installation)
        -   [Chapitre 2 - Expertise](start.html#chapitre-2-expertise)

Snort {#snort .sectionedit1}
=====

Dans ce dossier, figure une présentation des fonctionnalités de Snort,
ainsi qu’un ensemble de documentations et de tutoriels sur la mise en
place d’un serveur Snort.

Pour toutes questions, informations complémentaires sur Snort,
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

[![snort\_logo.jpg](../../assets/media/securite/snort_logo.jpg "snort_logo.jpg")](../../_detail/securite/snort_logo.jpg@id=securite%253Asnort%253Astart.html "securite:snort_logo.jpg")

Snort
([http://www.snort.org](http://www.snort.org "http://www.snort.org"))
est un NIDS (Network Intrusion Detection System). Il a pour rôle
d’écouter sur le réseau à la recherche d’attaques de pirates, qu’il
détecte grâce à de nombreuses règles disponibles sur le site officiel,
également auprès de certaines communautés comme Emerging.

L’application analyse le réseau, le trafic en temps réel, et peut logger
des paquets. Les alertes sont ensuite stockées dans une base données,
elles peuvent être également sous forme de logs. Snort peut aussi
transmettre, notifier les évènements. Il est basé sur un système de
signatures et combine donc l’analyse du trafic par signature, protocole
et anomalie.

Snort fonctionne sur Linux.

Documentation {#documentation .sectionedit4}
-------------

### Chapitre 1 - Installation {#chapitre-1-installation .sectionedit5}

**[Installation de Snort sur
Ubuntu](snort-ubuntu-install.html "securite:snort:snort-ubuntu-install")**

1.  **[Pré-Requis](snort-ubuntu-install.html#pre-requis "securite:snort:snort-ubuntu-install")**
2.  **[Installation](snort-ubuntu-install.html#installation "securite:snort:snort-ubuntu-install")**
3.  **[Configuration](snort-ubuntu-install.html#configuration "securite:snort:snort-ubuntu-install")**
4.  **[Utilisation](snort-ubuntu-install.html#utilisation "securite:snort:snort-ubuntu-install")**

### Chapitre 2 - Expertise {#chapitre-2-expertise .sectionedit6}

**[Architecture d'une solution Sécurité
OSS](../architecture-oss/start.html "securite:architecture-oss:start")**
\
 **[Installation de Oinkmaster sur
Ubuntu](oinkmaster-ubuntu-install.html "securite:snort:oinkmaster-ubuntu-install")**

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
-   [Ossec](../ossec/start.html "securite:ossec:start")
    -   [Installation d'Ossec sur
        Ubuntu](../ossec/ossec-ubuntu-install.html "securite:ossec:ossec-ubuntu-install")
    -   [Prise en main
        d'Ossec](../ossec/ossec-use.html "securite:ossec:ossec-use")
-   [Prelude-IDS](../prelude/start.html "securite:prelude:start")
    -   [Installation de Prelude-IDS sur
        Ubuntu](../prelude/prelude-ubuntu-install.html "securite:prelude:prelude-ubuntu-install")
    -   [Prise en main de
        Prelude-IDS](../prelude/prelude-use.html "securite:prelude:prelude-use")
-   [Snort](start.html "securite:snort:start")
    -   [Installation de Oinkmaster sur
        Ubuntu](oinkmaster-ubuntu-install.html "securite:snort:oinkmaster-ubuntu-install")
    -   [Installation de Snort sur
        Ubuntu](snort-ubuntu-install.html "securite:snort:snort-ubuntu-install")

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

securite/snort/start.txt · Dernière modification: 2013/03/29 09:39
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

![](../../lib/exe/indexer.php@id=securite%253Asnort%253Astart&1424859534)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
