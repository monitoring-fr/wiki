---
layout: page
---

[[[Installation de Oinkmaster sur
Ubuntu](oinkmaster-ubuntu-install@do=backlink.html)]]

[wiki monitoring-fr.org](../../start.html "[ALT+H]")

![Logo Monitoring](../../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../../start.html "start") »
[Sécurité](../start.html "securite:start") »
[Snort](start.html "securite:snort:start") » [Installation de Oinkmaster
sur
Ubuntu](oinkmaster-ubuntu-install.html "securite:snort:oinkmaster-ubuntu-install")

### Table des matières {.toggle}

-   [Installation de Oinkmaster sur
    Ubuntu](oinkmaster-ubuntu-install.html#installation-de-oinkmaster-sur-ubuntu)
    -   [Installation](oinkmaster-ubuntu-install.html#installation)
    -   [Configuration](oinkmaster-ubuntu-install.html#configuration)
        -   [Configuration de
            base](oinkmaster-ubuntu-install.html#configuration-de-base)
        -   [Optimisation](oinkmaster-ubuntu-install.html#optimisation)
    -   [Utilisation](oinkmaster-ubuntu-install.html#utilisation)

Installation de Oinkmaster sur Ubuntu {#installation-de-oinkmaster-sur-ubuntu .sectionedit1}
=====================================

Tutoriel rédigé pour une version Ubuntu 8.04 LTS et Oinkmaster 2.0.

Oinkmaster est un simple script pour l’application Snort, permettant
d’effectuer la mise à jour régulière des règles.

Ce tutoriel a été réalisé par :

  **Rôle**        **Nom**
  --------------- ------------------
  **Rédacteur**   Ludovic VALENTIN

Installation {#installation .sectionedit3}
------------

Téléchargement et installation de l’outil Oinkmaster, ce dernier permet
de mettre à jour régulièrement les règles de Snort :

~~~~ {.code}
$ sudo wget http://prdownloads.sourceforge.net/oinkmaster/oinkmaster-2.0.tar.gz?download
$ sudo tar –zxf oinkmaster-2.0.tar.gz
$ sudo cd oinkmaster.2.0
$ sudo cp oinkmaster.pl /usr/local/bin
$ sudo cp oinkmaster.conf /etc/snort
~~~~

Configuration {#configuration .sectionedit4}
-------------

Le fichier de configuration de Oinkmaster :

~~~~ {.code}
$ sudo vim /etc/snort/oinkmaster.conf
~~~~

### Configuration de base {#configuration-de-base .sectionedit5}

#### Récupération du code “oink” {#recuperation-du-code-oink}

La définition d’un url de mises à jour de règles SNORT, nécessite
l’obtention d’un code oink. Ce dernier est disponible dans les options
du compte d’un utilisateur inscrit sur le site
[www.snort.org](http://www.snort.org "http://www.snort.org").

Une fois inscrit puis connecté (si n’est pas déjà fait) il suffit de se
rendre sur la rubrique « My Account » puis sur l’onglet « Subscriptions
and Oinkcodes » et le lien « Oinkcodes », il ne reste alors plus qu’à
générer un code et de le copier.

#### Ajout des url

La configuration de l’outil se fait par l’intermédiaire d’un unique
fichier.

~~~~ {.code}
$ sudo vim /etc/snort/oinkmaster.conf
~~~~

Dans ce fichier, il faut alors définir le ou les url de mises à jour des
règles. Pour les règles de SNORT, l’url nécessite le code oink.

~~~~ {.code}
http://www.snort.org/pub-in/oinkmaster.cgi/<oinkcode>/snortrules-snapshot-x.x.tar.gz
~~~~

Soit un exemple plus concret :

~~~~ {.code}
http://www.snort.org/pub-in/oinkmaster.cgi/8515c042b41ad0a2170373bf41a5d5e42e01df7f/snortrules-snapshot-2.8.tar.gz
~~~~

Pour les règles Emerging, pas besoin de code, l’url est donc plus simple
à déclarée.

~~~~ {.code}
http://emergingthreats.net/rules/emerging.rules.tar.gz
~~~~

Ces deux url sont à ajouter au fichier oinkmaster, chacune précédée par
un « url = ». Exemple:

~~~~ {.code}
url = http://www.snort.org/pub-in/oinkmaster.cgi/8515c042b41ad0a2170373bf41a5d5e42e01df7f/snortrules-snapshot-2.8.tar.gz
url = http://emergingthreats.net/rules/emerging.rules.tar.gz
~~~~

### Optimisation {#optimisation .sectionedit6}

#### Exclure des fichiers de la mise à jour {#exclure-des-fichiers-de-la-mise-a-jour}

Par défaut, certains fichiers de Snort (règles, …) sont conservés, et
protégés de toute nouvelle mise à jour. Ainsi, par exemple,
**snort.conf** est exclu de la mise à jour, ce qui permet de conserver
notamment les paramètres du fichier de configuration. Si jamais une
nouvelle version du fichier était téléchargé, toutes les données
seraient perdues, car réécrite par le nouveau. Pour éviter cela, il faut
éditer le fichier de configuration de Oinkmaster :

~~~~ {.code}
skipfile local.rules
~~~~

Ici, le fichier **local.rules** est exclu de la mise à jour.

Utilisation {#utilisation .sectionedit7}
-----------

Pour lancer la mise à jour des règles.

~~~~ {.code}
$ sudo /usr/local/bin/oinkmaster.pl –C /etc/snort/oinkmaster –o /etc/snort/rules –b /etc/snort/rules_backup
~~~~

Afin d’automatiser les mises à jour, il est possible d’utiliser Cron :

~~~~ {.code}
$ sudo crontab -e -u root
~~~~

Et y ajouter cette ligne :

~~~~ {.code}
00 11 * * * /usr/local/bin/oinkmaster.pl -C /etc/snort/oinkmaster -o /etc/snort/rules -b /etc/snort/rules_backup
~~~~

Elle permet ainsi d’automatiser la mise à jour quotidienne, par exemple,
à 11h00.

Le fichier ainsi créé se trouve dans :

~~~~ {.code}
$ sudo vim /var/spool/cron/crontabs/root 
~~~~

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
    source](oinkmaster-ubuntu-install@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](oinkmaster-ubuntu-install@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](oinkmaster-ubuntu-install@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](oinkmaster-ubuntu-install@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](oinkmaster-ubuntu-install@do=media.html "Gestionnaire de médias")
-   [Index](oinkmaster-ubuntu-install@do=index.html "Index [X]")
-   [Connexion](oinkmaster-ubuntu-install@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de
    page](oinkmaster-ubuntu-install.html#dokuwiki__top "Haut de page [T]")

securite/snort/oinkmaster-ubuntu-install.txt · Dernière modification:
2013/03/29 09:39 (modification externe)

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

![](../../lib/exe/indexer.php@id=securite%253Asnort%253Aoinkmaster-ubuntu-install&1424859806)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
