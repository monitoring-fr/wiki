---
layout: page
---

[[[Zimbra](zimbra@do=backlink.html)]]

[wiki monitoring-fr.org](../start.html "[ALT+H]")

![Logo Monitoring](../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../start.html "start") »
[Infrastructure](start.html "infra:start") »
[Zimbra](zimbra.html "infra:zimbra")

### Table des matières {.toggle}

-   [Zimbra](zimbra.html#zimbra)
    -   [Trucs et astuces](zimbra.html#trucs-et-astuces)
        -   [Récupérer la liste des
            alias](zimbra.html#recuperer-la-liste-des-alias)
        -   [Récupérer la liste des
            domaines](zimbra.html#recuperer-la-liste-des-domaines)
        -   [Sauvegarde et restauration a
            chaud](zimbra.html#sauvegarde-et-restauration-a-chaud)

Zimbra {#zimbra .sectionedit1}
======

Trucs et astuces {#trucs-et-astuces .sectionedit2}
----------------

### Récupérer la liste des alias {#recuperer-la-liste-des-alias .sectionedit3}

~~~~ {.code .bash}
#!/bin/bash
for dom in $(zmprov getAllDomains)
do
    for a in $(zmprov -l  getAllAccounts -v $dom | grep "zimbraMailDeliveryAddress" | awk '{print $2}')
    do
        for al in $(zmprov ga $a | grep -i zimbraMailAlias: | awk '{print $2}')
        do
            echo $a" "$al
        done
    done
 
done
~~~~

### Récupérer la liste des domaines {#recuperer-la-liste-des-domaines .sectionedit4}

~~~~ {.code}
zmprov getAllDomains
~~~~

### Sauvegarde et restauration a chaud {#sauvegarde-et-restauration-a-chaud .sectionedit5}

Il suffit d’utiliser le script zmbkpose
[http://wiki.zimbra.com/wiki/HOT\_Backup\_and\_HOT\_Restore](http://wiki.zimbra.com/wiki/HOT_Backup_and_HOT_Restore "http://wiki.zimbra.com/wiki/HOT_Backup_and_HOT_Restore")

#### sauvegarde a chaud

##### Sauvegarde complète {#sauvegarde-complete}

~~~~ {.code}
zmbkpose -f
~~~~

##### Sauvegarde incrémentale {#sauvegarde-incrementale}

~~~~ {.code}
zmbkpose -i
~~~~

#### Restauration compte non existant

Le domaine doit exister !

~~~~ {.code}
zmbkpose -restoreAccount [email protected]
/*  */!function(){try{var t="currentScript"in document?document.currentScript:function(){for(var t=document.getElementsByTagName("script"),e=t.length;e--;)if(t[e].getAttribute("cf-hash"))return t[e]}();if(t&&t.previousSibling){var e,r,n,i,c=t.previousSibling,a=c.getAttribute("data-cfemail");if(a){for(e="",r=parseInt(a.substr(0,2),16),n=2;a.length-n;n+=2)i=parseInt(a.substr(n,2),16)^r,e+=String.fromCharCode(i);e=document.createTextNode(e),c.parentNode.replaceChild(e,c)}}}catch(u){}}();/*  */
~~~~

#### Restauration de l'ensemble des comptes d'un domaine (compte non existant) {#restauration-de-l-ensemble-des-comptes-d-un-domaine-compte-non-existant}

Le domaine doit exister !

~~~~ {.code}
cd /opt/zimbra/backup/repertoiredesauvegarde
for a in $(ls -1 | grep domain.tld | grep tgz | sed -e "s/\.tgz//g"); do zmbkpose -restoreAccount $a ; done
~~~~

SOMMAIRE {#sommaire .sectionedit1}
--------

**[Accueil](../start.html "start")**

**[Supervision](../supervision/start.html "supervision:start")**

-   [Nagios](../nagios/start.html "nagios:start")
-   [Centreon](../centreon/start.html "centreon:start")
-   [Shinken](../shinken/start.html "shinken:start")
-   [Zabbix](../zabbix/start.html "zabbix:start")
-   [OpenNMS](../opennms/start.html "opennms:start")
-   [EyesOfNetwork](../eyesofnetwork/start.html "eyesofnetwork:start")
-   [Groundwork](../groundwork/start.html "groundwork:start")
-   [Zenoss](../zenoss/start.html "zenoss:start")
-   [Vigilo](../vigilo/start.html "vigilo:start")
-   [Icinga](../icinga/start.html "icinga:start")
-   [Cacti](../cacti/start.html "cacti:start")
-   [Ressenti
    utilisateur](../supervision/eue/start.html "supervision:eue:start")
-   [Ressenti utilisateur avec
    sikuli](../sikuli/eue/start.html "sikuli:eue:start")

**[Hypervision](../hypervision/start.html "hypervision:start")**

-   [Canopsis](../canopsis/start.html "canopsis:start")

**[Sécurité](../securite/start.html "securite:start")**

**[Infrastructure](start.html "infra:start")**

**[Développement](../dev/start.html "dev:start")**

Gestion des infrastructures {#gestion-des-infrastructures .sectionedit1}
---------------------------

-   [Chef](chef.html "infra:chef")
-   [GLPI](glpi/start.html "infra:glpi:start")
-   [Graylog2](graylog2.html "infra:graylog2")
-   [Installation de Job
    Scheduler](jobscheduler.html "infra:jobscheduler")
-   [Installation de archipel sous ubuntu
    10.10](archipel.html "infra:archipel")
-   [Installation de sikuli IDE sous Ubuntu
    10.10](sikuli.html "infra:sikuli")
-   [Knockd](knockd.html "infra:knockd")
-   [Logstash](logstash.html "infra:logstash")
-   [Mise en place d'un système de contrôle de version GIT sous unbuntu
    server 10.10](git.html "infra:git")
-   [Partage de session terminal avec
    Screen](screen.html "infra:screen")
-   [Postfix](postfix.html "infra:postfix")
-   [Zimbra](zimbra.html "infra:zimbra")

-   [Afficher le texte
    source](zimbra@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](zimbra@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](zimbra@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](zimbra@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](zimbra@do=media.html "Gestionnaire de médias")
-   [Index](zimbra@do=index.html "Index [X]")
-   [Connexion](zimbra@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de page](zimbra.html#dokuwiki__top "Haut de page [T]")

infra/zimbra.txt · Dernière modification: 2013/03/29 09:39 (modification
externe)

[![CC Attribution-Noncommercial-Share Alike 3.0
Unported](../lib/images/license/button/cc-by-nc-sa.png)](http://creativecommons.org/licenses/by-nc-sa/3.0/)

[![www.chimeric.de](../lib/tpl/arctic/images/button-chimeric-de.png)](http://www.chimeric.de "www.chimeric.de")
[![Valid
CSS](../lib/tpl/arctic/images/button-css.png)](http://jigsaw.w3.org/css-validator/check/referer "Valid CSS")
[![Driven by
DokuWiki](../lib/tpl/arctic/images/button-dw.png)](http://wiki.splitbrain.org/wiki:dokuwiki "Driven by DokuWiki")
[![do yourself a favour and use a real browser - get
firefox!!](../lib/tpl/arctic/images/button-firefox.png)](http://www.firefox-browser.de "do yourself a favour and use a real browser - get firefox")
[![Recent changes RSS
feed](../lib/tpl/arctic/images/button-rss.png)](../feed.php "Recent changes RSS feed")
[![Valid XHTML
1.0](../lib/tpl/arctic/images/button-xhtml.png)](http://validator.w3.org/check/referer "Valid XHTML 1.0")

![](../lib/exe/indexer.php@id=infra%253Azimbra&1424859535)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
