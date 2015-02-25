---
layout: page
---

[[[Requêtage de la base NDOUtils](sql-request@do=backlink.html)]]

[wiki monitoring-fr.org](../../../start.html "[ALT+H]")

![Logo Monitoring](../../../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../../../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../../../start.html "start") »
[Nagios](../../start.html "nagios:start") » [Nagios
Addons](../start.html "nagios:addons:start") »
[NDOUtils](../ndoutils.html "nagios:addons:ndoutils") » [Requêtage de la
base NDOUtils](sql-request.html "nagios:addons:ndoutils:sql-request")

### Table des matières {.toggle}

-   [Requêtage de la base
    NDOUtils](sql-request.html#requetage-de-la-base-ndoutils)
    -   [Requête SQL NDO](sql-request.html#requete-sql-ndo)
        -   [Liste des hôtes appartenant à un
            hostgroup](sql-request.html#liste-des-hotes-appartenant-a-un-hostgroup)
        -   [Liste des couples hôtes/services appartenant à un
            hostgroup](sql-request.html#liste-des-couples-hotesservices-appartenant-a-un-hostgroup)
        -   [Liste des couples hôtes/services appartenant à un hostgroup
            et dont le service contient
            XXX](sql-request.html#liste-des-couples-hotesservices-appartenant-a-un-hostgroup-et-dont-le-service-contient-xxx)
        -   [Historique des mise en
            maintenance](sql-request.html#historique-des-mise-en-maintenance)
    -   [REQUETE CENTREON](sql-request.html#requete-centreon)
        -   [Liste des macros des modèles
            d'hôtes](sql-request.html#liste-des-macros-des-modeles-d-hotes)
        -   [Liste des commandes utilisées par les modèles de
            services](sql-request.html#liste-des-commandes-utilisees-par-les-modeles-de-services)
        -   [Titre](sql-request.html#titre)

Requêtage de la base NDOUtils {#requetage-de-la-base-ndoutils .sectionedit1}
=============================

Il peut être fastidieux de requêter la base NDO, son schéma n’étant pas
du tout pratique. Il est du coup intéressant d’ouvrir cet espace aux
requêtes plus ou moins “touchy” afin d’obtenir des résultats avec cette
base.

Cette page a été réalisé par :

  **Rôle**           **Nom**
  ------------------ ------------------
  **Créateur**       Romuald FRONTEAU
  **Contributeur**   David GUENAULT

Il est très facile d’obtenir des sortie type csv des requêtes mysql

~~~ {.code .bash}
mysql -h localhost -u [USER] -p -B -N -D centreon -e "[REQUETE]" | sed -e "s/\t/;/g"
~~~

Requête SQL NDO {#requete-sql-ndo .sectionedit3}
---------------

### Liste des hôtes appartenant à un hostgroup {#liste-des-hotes-appartenant-a-un-hostgroup .sectionedit4}

Le but de cette requête est d’afficher la liste des hôtes présents dans
la table **nagios\_hosts** en se basant sur le champ
**host\_object\_id** et le comparant à celui se trouvant dans la table
**nagios\_hostgroup\_members** en y mettant un filtre basé sur la
présence de l’**hostgroup\_id** se référant à l’alias de notre
hostgroup.

~~~ {.code .sql}
SELECT nagios_hosts.display_name FROM nagios_hosts \
LEFT JOIN nagios_hostgroup_members ON \
nagios_hosts.host_object_id=nagios_hostgroup_members.host_object_id \
WHERE nagios_hostgroup_members.hostgroup_id IN (SELECT nagios_hostgroups.hostgroup_id \
FROM nagios_hostgroups WHERE nagios_hostgroups.alias LIKE '%VOTRE_HOSTGROUP_NAME');
~~~

### Liste des couples hôtes/services appartenant à un hostgroup {#liste-des-couples-hotesservices-appartenant-a-un-hostgroup .sectionedit5}

Le but est le même que la requête si dessus en y ajoutant la liste des
services rattachées aux hôtes.

~~~ {.code .sql}
SELECT nagios_hosts.display_name, nagios_services.display_name FROM nagios_hosts \
LEFT JOIN nagios_services ON \
nagios_hosts.host_object_id=nagios_services.host_object_id LEFT JOIN \ 
nagios_hostgroup_members ON \
nagios_hosts.host_object_id=nagios_hostgroup_members.host_object_id WHERE \ 
nagios_hostgroup_members.hostgroup_id IN (SELECT nagios_hostgroups.hostgroup_id \
FROM nagios_hostgroups WHERE nagios_hostgroups.alias LIKE '%VOTRE_HOSTGROUP_NAME');
~~~

### Liste des couples hôtes/services appartenant à un hostgroup et dont le service contient XXX {#liste-des-couples-hotesservices-appartenant-a-un-hostgroup-et-dont-le-service-contient-xxx .sectionedit6}

Le but est le même que la requête si dessus en y ajoutant la liste des
services rattachées aux hôtes.

~~~ {.code .sql}
SELECT nagios_hosts.display_name, nagios_services.display_name FROM nagios_hosts \
LEFT JOIN nagios_services ON \
nagios_hosts.host_object_id=nagios_services.host_object_id LEFT JOIN \
nagios_hostgroup_members ON \
nagios_hosts.host_object_id=nagios_hostgroup_members.host_object_id WHERE nagios_hostgroup_members.hostgroup_id IN \
(SELECT nagios_hostgroups.hostgroup_id FROM nagios_hostgroups WHERE nagios_hostgroups.alias LIKE 'VOTRE_HOSTGROUP' \
AND nagios_services.display_name LIKE '%XXX%');
~~~

### Historique des mise en maintenance {#historique-des-mise-en-maintenance .sectionedit7}

~~~ {.code .sql}
SELECT nagios_downtimehistory.actual_start_time, nagios_downtimehistory.actual_end_time, nagios_downtimehistory.author_name, nagios_hosts.display_name  FROM `nagios_downtimehistory` LEFT JOIN nagios_hosts ON nagios_downtimehistory.object_id=nagios_hosts.host_object_id WHERE 1 ORDER BY actual_start_time DESC
~~~

REQUETE CENTREON {#requete-centreon .sectionedit8}
----------------

-   Des requêtes utiles pour récupérer les informations de la base
    centreon

### Liste des macros des modèles d'hôtes {#liste-des-macros-des-modeles-d-hotes .sectionedit9}

Récupérer les macros affectées aux modèles d’hôtes

~~~ {.code .sql}
SELECT 
 h.host_name hote , 
 SUBSTRING(m.host_macro_name,7,LENGTH(m.host_macro_name)-7) macro, 
 REPLACE(m.host_macro_value,'#S#','/') valeur 
FROM 
 host h INNER JOIN on_demand_macro_host m ON h.host_id = m.host_host_id 
WHERE 
 host_register = '0' 
ORDER BY 
 host_name, 
 host_macro_name;
~~~

### Liste des commandes utilisées par les modèles de services {#liste-des-commandes-utilisees-par-les-modeles-de-services .sectionedit10}

~~~ {.code .sql}
SELECT   
 h.host_name hote,   
 s.service_description service,   
 c.command_name commande,   
 s.command_command_id_arg arguments ,   
 REPLACE(c.command_line,'#S#','/') ligne  
FROM   
 host h    
 INNER JOIN host_service_relation hs ON h.host_id = hs.host_host_id     
 INNER JOIN service s ON hs.service_service_id = s.service_id      
 INNER JOIN command c ON s.command_command_id = c.command_id  
WHERE   
 host_register='0' AND   
 service_register='0'  
ORDER BY   
 host_name,   
 service_description;
~~~

### Titre {#titre .sectionedit11}

SOMMAIRE {#sommaire .sectionedit1}
--------

**[Accueil](../../../start.html "start")**

**[Supervision](../../../supervision/start.html "supervision:start")**

-   [Nagios](../../start.html "nagios:start")
-   [Centreon](../../../centreon/start.html "centreon:start")
-   [Shinken](../../../shinken/start.html "shinken:start")
-   [Zabbix](../../../zabbix/start.html "zabbix:start")
-   [OpenNMS](../../../opennms/start.html "opennms:start")
-   [EyesOfNetwork](../../../eyesofnetwork/start.html "eyesofnetwork:start")
-   [Groundwork](../../../groundwork/start.html "groundwork:start")
-   [Zenoss](../../../zenoss/start.html "zenoss:start")
-   [Vigilo](../../../vigilo/start.html "vigilo:start")
-   [Icinga](../../../icinga/start.html "icinga:start")
-   [Cacti](../../../cacti/start.html "cacti:start")
-   [Ressenti
    utilisateur](../../../supervision/eue/start.html "supervision:eue:start")
-   [Ressenti utilisateur avec
    sikuli](../../../sikuli/eue/start.html "sikuli:eue:start")

**[Hypervision](../../../hypervision/start.html "hypervision:start")**

-   [Canopsis](../../../canopsis/start.html "canopsis:start")

**[Sécurité](../../../securite/start.html "securite:start")**

**[Infrastructure](../../../infra/start.html "infra:start")**

**[Développement](../../../dev/start.html "dev:start")**

Nagios Addons {#nagios-addons .sectionedit1}
-------------

-   [Lilac
    Platform](../lilac-platform.html "nagios:addons:lilac-platform")
-   [Merlin](../../../addons/merlin.html "nagios:addons:merlin")
-   [NConf](../nconf.html "nagios:addons:nconf")
-   [NDOUtils](../ndoutils.html "nagios:addons:ndoutils")
-   [NSClient++](../nsclient.html "nagios:addons:nsclient")
-   [NagTrap](../../../addons/nagtrap.html "nagios:addons:nagtrap")
-   [NagVis](../nagvis/start.html "nagios:addons:nagvis:start")
-   [Nagios Business Process
    Addon](../nagios-business-process-addons.html "nagios:addons:nagios-business-process-addons")
-   [NagiosDigger](../nagiosdigger.html "nagios:addons:nagiosdigger")
-   [NagiosGrapher](../nagiosgrapher.html "nagios:addons:nagiosgrapher")
-   [NagiosQL](../nagiosql.html "nagios:addons:nagiosql")
-   [Netways Grapher
    V2](../netways-grapher-v2.html "nagios:addons:netways-grapher-v2")
-   [Ninja](../ninja.html "nagios:addons:ninja")
-   [PNP4Nagios](../pnp/start.html "nagios:addons:pnp:start")
-   [Protocole NRPE](../nrpe.html "nagios:addons:nrpe")
-   [Protocole NSCA](../nsca.html "nagios:addons:nsca")
-   [Setup distribué avec
    Mod\_Gearman](../mod_gearman.html "nagios:addons:mod_gearman")
-   [Vautour Style](../vautour-style.html "nagios:addons:vautour-style")
-   [check\_mk](../check_mk/start.html "nagios:addons:check_mk:start")
-   [omd Open Monitoring Distribution](../omd.html "nagios:addons:omd")

-   [Afficher le texte
    source](sql-request@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](sql-request@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](sql-request@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](sql-request@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](sql-request@do=media.html "Gestionnaire de médias")
-   [Index](sql-request@do=index.html "Index [X]")
-   [Connexion](sql-request@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de page](sql-request.html#dokuwiki__top "Haut de page [T]")

nagios/addons/ndoutils/sql-request.txt · Dernière modification:
2013/08/30 11:35 (modification externe)

[![CC Attribution-Noncommercial-Share Alike 3.0
Unported](../../../lib/images/license/button/cc-by-nc-sa.png)](http://creativecommons.org/licenses/by-nc-sa/3.0/)

[![www.chimeric.de](../../../lib/tpl/arctic/images/button-chimeric-de.png)](http://www.chimeric.de "www.chimeric.de")
[![Valid
CSS](../../../lib/tpl/arctic/images/button-css.png)](http://jigsaw.w3.org/css-validator/check/referer "Valid CSS")
[![Driven by
DokuWiki](../../../lib/tpl/arctic/images/button-dw.png)](http://wiki.splitbrain.org/wiki:dokuwiki "Driven by DokuWiki")
[![do yourself a favour and use a real browser - get
firefox!!](../../../lib/tpl/arctic/images/button-firefox.png)](http://www.firefox-browser.de "do yourself a favour and use a real browser - get firefox")
[![Recent changes RSS
feed](../../../lib/tpl/arctic/images/button-rss.png)](../../../feed.php "Recent changes RSS feed")
[![Valid XHTML
1.0](../../../lib/tpl/arctic/images/button-xhtml.png)](http://validator.w3.org/check/referer "Valid XHTML 1.0")

![](../../../lib/exe/indexer.php@id=nagios%253Aaddons%253Andoutils%253Asql-request&1424859604)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
