---
layout: page
---

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

~~~~ {.code .bash}
mysql -h localhost -u [USER] -p -B -N -D centreon -e "[REQUETE]" | sed -e "s/\t/;/g"
~~~~

Requête SQL NDO {#requete-sql-ndo .sectionedit3}
---------------

### Liste des hôtes appartenant à un hostgroup {#liste-des-hotes-appartenant-a-un-hostgroup .sectionedit4}

Le but de cette requête est d’afficher la liste des hôtes présents dans
la table **nagios\_hosts** en se basant sur le champ
**host\_object\_id** et le comparant à celui se trouvant dans la table
**nagios\_hostgroup\_members** en y mettant un filtre basé sur la
présence de l’**hostgroup\_id** se référant à l’alias de notre
hostgroup.

~~~~ {.code .sql}
SELECT nagios_hosts.display_name FROM nagios_hosts \
LEFT JOIN nagios_hostgroup_members ON \
nagios_hosts.host_object_id=nagios_hostgroup_members.host_object_id \
WHERE nagios_hostgroup_members.hostgroup_id IN (SELECT nagios_hostgroups.hostgroup_id \
FROM nagios_hostgroups WHERE nagios_hostgroups.alias LIKE '%VOTRE_HOSTGROUP_NAME');
~~~~

### Liste des couples hôtes/services appartenant à un hostgroup {#liste-des-couples-hotesservices-appartenant-a-un-hostgroup .sectionedit5}

Le but est le même que la requête si dessus en y ajoutant la liste des
services rattachées aux hôtes.

~~~~ {.code .sql}
SELECT nagios_hosts.display_name, nagios_services.display_name FROM nagios_hosts \
LEFT JOIN nagios_services ON \
nagios_hosts.host_object_id=nagios_services.host_object_id LEFT JOIN \ 
nagios_hostgroup_members ON \
nagios_hosts.host_object_id=nagios_hostgroup_members.host_object_id WHERE \ 
nagios_hostgroup_members.hostgroup_id IN (SELECT nagios_hostgroups.hostgroup_id \
FROM nagios_hostgroups WHERE nagios_hostgroups.alias LIKE '%VOTRE_HOSTGROUP_NAME');
~~~~

### Liste des couples hôtes/services appartenant à un hostgroup et dont le service contient XXX {#liste-des-couples-hotesservices-appartenant-a-un-hostgroup-et-dont-le-service-contient-xxx .sectionedit6}

Le but est le même que la requête si dessus en y ajoutant la liste des
services rattachées aux hôtes.

~~~~ {.code .sql}
SELECT nagios_hosts.display_name, nagios_services.display_name FROM nagios_hosts \
LEFT JOIN nagios_services ON \
nagios_hosts.host_object_id=nagios_services.host_object_id LEFT JOIN \
nagios_hostgroup_members ON \
nagios_hosts.host_object_id=nagios_hostgroup_members.host_object_id WHERE nagios_hostgroup_members.hostgroup_id IN \
(SELECT nagios_hostgroups.hostgroup_id FROM nagios_hostgroups WHERE nagios_hostgroups.alias LIKE 'VOTRE_HOSTGROUP' \
AND nagios_services.display_name LIKE '%XXX%');
~~~~

### Historique des mise en maintenance {#historique-des-mise-en-maintenance .sectionedit7}

~~~~ {.code .sql}
SELECT nagios_downtimehistory.actual_start_time, nagios_downtimehistory.actual_end_time, nagios_downtimehistory.author_name, nagios_hosts.display_name  FROM `nagios_downtimehistory` LEFT JOIN nagios_hosts ON nagios_downtimehistory.object_id=nagios_hosts.host_object_id WHERE 1 ORDER BY actual_start_time DESC
~~~~

REQUETE CENTREON {#requete-centreon .sectionedit8}
----------------

-   Des requêtes utiles pour récupérer les informations de la base
    centreon

### Liste des macros des modèles d'hôtes {#liste-des-macros-des-modeles-d-hotes .sectionedit9}

Récupérer les macros affectées aux modèles d’hôtes

~~~~ {.code .sql}
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
~~~~

### Liste des commandes utilisées par les modèles de services {#liste-des-commandes-utilisees-par-les-modeles-de-services .sectionedit10}

~~~~ {.code .sql}
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
~~~~

### Titre {#titre .sectionedit11}
