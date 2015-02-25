---
layout: page
---

[[[Référence des objets de
configuration](objects-reference@do=backlink.html)]]

[wiki monitoring-fr.org](../start.html "[ALT+H]")

![Logo Monitoring](../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../start.html "start") »
[Nagios](start.html "nagios:start") » [Référence des objets de
configuration](objects-reference.html "nagios:objects-reference")

### Table des matières {.toggle}

-   [Référence des objets de
    configuration](objects-reference.html#reference-des-objets-de-configuration)
    -   -   [Notes](objects-reference.html#notes)
        -   [Introduction](objects-reference.html#introduction)
        -   [Trucs et astuces "gain de
            temps"](objects-reference.html#trucs-et-astuces-gain-de-temps)
        -   [Notes sur la
            mémorisation](objects-reference.html#notes-sur-la-memorisation)
        -   [Exemple de
            Configuration](objects-reference.html#exemple-de-configuration)
        -   [Types d'objets](objects-reference.html#types-d-objets)
    -   [host](objects-reference.html#host)
    -   [hostgroup](objects-reference.html#hostgroup)
    -   [service](objects-reference.html#service)
    -   [servicegroup](objects-reference.html#servicegroup)
    -   [contact](objects-reference.html#contact)
    -   [contactgroup](objects-reference.html#contactgroup)
    -   [timeperiod](objects-reference.html#timeperiod)
    -   [command](objects-reference.html#command)
    -   [servicedependency](objects-reference.html#servicedependency)
    -   [serviceescalation](objects-reference.html#serviceescalation)
    -   [hostdependency](objects-reference.html#hostdependency)
    -   [hostescalation](objects-reference.html#hostescalation)
    -   [hostextinfo](objects-reference.html#hostextinfo)
    -   [serviceextinfo](objects-reference.html#serviceextinfo)

Référence des objets de configuration {#reference-des-objets-de-configuration .sectionedit1}
=====================================

Une page à garder sous la main pour se souvenir des propriéts qu’il est
possible d’indiquer au niveau de chaque objet de configuration de
Nagios.

Cette page a besoin d’une mise à jour pour inclure les propriétés
apparues avec la version 3 de Nagios.

### Notes {#notes .sectionedit2}

Lorsque vous créerez /éditerez les fichiers de configuration, gardez à
l’esprit que :

1.  Les lignes commençant par un '\#' sont des commentaires et ne sont
    pas traitées.
2.  Les directives sont sensibles à la casse.

### Introduction {#introduction .sectionedit3}

Un des bénéfices de l’utilisation de fichiers dont le format utilise des
modèles est le suivant: vous pouvez créer des définitions d’objets qui
vont hériter de quelques propriétés d’autres définitions d’objets. Cette
notion d’héritage, ainsi que la documentation expliquant comment la
mettre en place, se trouve dans la doc Nagios. Je ne saurais trop vous
recommander de vous familiariser avec l’héritage entre objets, une fois
que vous aurez lu la documentation ci-dessous. En effet, l’héritage va
vous rendre le travail de création et de maintenance des définitions
d’objets bien plus facile.

### Trucs et astuces "gain de temps" {#trucs-et-astuces-gain-de-temps .sectionedit4}

Il y a quelques trucs que vous devez connaitre, dans la définition
d’objet, et qui vous permettront de créer un grand nombre d’objets avec
juste un petit nombre de définitions dans vos fichiers de configuration.
Un de ces “trucs”, c’est la possibilité de définir un seul objet pour un
service, qui crée un service pour de nombreux hôtes ou groupes d’hôtes.
Ces astuces sont décrites dans la doc Nagios.

### Notes sur la mémorisation {#notes-sur-la-memorisation .sectionedit5}

Il est important de comprendre que plusieurs directives dans les hôtes
et services peuvent ne pas être pris en compte par Nagios quand vous les
modifiez. Les directives d’hôtes et de services affectées par ce type de
comportement sont marquées
([\*](objects-reference.html#retention_notes "nagios:objects-reference ↵")).
La raison de ce comportement réside dans le fait que Nagios choisit
d’honorer les valeurs stockées dans le fichier de mémorisation des états
plutôt que celles présentes dans les fichiers de configuration, à
supposer que vous avez activé la mémorisation des états pour l’ensemble
de Nagios.

Une des manières de se débarrasser de ce problème consiste à désactiver
la mémorisation des informations n’ayant pas trait avec le statut, avec
la directive *retain\_nonstatus\_information* dans la définition des
hôtes et services. La désactivation de cette directive va obliger Nagios
à prendre les valeurs initiales pour ces directives dans vos fichiers de
configurations, plutôt que dans le fichier de mémorisation des états,
quand Nagios (re)démarre. L’utilisation de cette directive n’est
cependant pas recommandée, car elle peut avoir (de votre point de vue)
des effets inattendus.

Une autre manière consiste à exécuter une commande externe appropriée
qui va changer la valeur affectée à l’hôte ou au service, via
l’interface web, de telle sorte que cette valeur sera en phase avec ce
qui se trouve dans le fichier de configuration. Ceci est habituellement
fait à travers le CGI d’informations complémentaires. Cette option
requiert un peu plus de travail, mais elle est de loin préférable à
l’option de désactivation de la mémorisation mentionnée juste au-dessus.

### Exemple de Configuration {#exemple-de-configuration .sectionedit6}

Quelques fichiers de configuration d’objets sont créés lorsque vous
exécutez le script de configuration - vous pouvez les trouver dans le
sous répertoire *sample-config/template-object*/ de la distribution de
Nagios.

### Types d'objets {#types-d-objets .sectionedit7}

[Définition
d'hôte](objects-reference.html#host "nagios:objects-reference ↵")\
 [Définition de groupe
d'hôtes](objects-reference.html#hostgroup "nagios:objects-reference ↵")\
 [Définition de
service](objects-reference.html#service "nagios:objects-reference ↵")\
 [Définition de groupe de
service](objects-reference.html#servicegroup "nagios:objects-reference ↵")\
 [Définition de
contact](objects-reference.html#contact "nagios:objects-reference ↵")\
 [Définition de groupe de
contacts](objects-reference.html#contactgroup "nagios:objects-reference ↵")\
 [Définition de
période](objects-reference.html#timeperiod "nagios:objects-reference ↵")\
 [Définition de
commande](objects-reference.html#command "nagios:objects-reference ↵")\
 [Définition des dépendances de
service](objects-reference.html#servicedependency "nagios:objects-reference ↵")\
 [Définition d'escalade de
service](objects-reference.html#serviceescalation "nagios:objects-reference ↵")\
 [Définition des dépendances
d'hôte](objects-reference.html#hostdependency "nagios:objects-reference ↵")\
 [Définition d'escalade
d'hôte](objects-reference.html#hostescalation "nagios:objects-reference ↵")\
 [Définition des informations étendues
d'hôte](objects-reference.html#hostextinfo "nagios:objects-reference ↵")\
 [Définition des informations étendues de
service](objects-reference.html#serviceextinfo "nagios:objects-reference ↵")\

host {#host .sectionedit8}
----

Description:

Une définition d’hôte s’applique à un serveur “physique”, une station de
travail, un périphérique, un équipement, qui se trouve sur votre réseau.

Définition du format:

Note: les directives requises sont en rouge, et les optionnelles en
noir.

define host{

host\_name

*host\_name*

alias

*alias*

address

*address*

parents

*host\_names*

hostgroups

*hostgroup\_names*

check\_command

*command\_name*

max\_check\_attempts

\#

check\_interval

\#

active\_checks\_enabled

[0/1]

passive\_checks\_enabled

[0/1]

check\_period

*timeperiod\_name*

obsess\_over\_host

[0/1]

check\_freshness

[0/1]

freshness\_threshold

\#

event\_handler

*command\_name*

event\_handler\_enabled

[0/1]

low\_flap\_threshold

\#

high\_flap\_threshold

\#

flap\_detection\_enabled

[0/1]

process\_perf\_data

[0/1]

retain\_status\_information

[0/1]

retain\_nonstatus\_information

[0/1]

contact\_groups

*contact\_groups*

notification\_interval

\#

notification\_period

*timeperiod\_name*

notification\_options

[d,u,r,f]

notifications\_enabled

[0/1]

stalking\_options

[o,d,u]

}

Exemple de définition:

~~~~ {.code}
define host{
    host_name           bogus-router
    alias               Bogus Router #1
    address             192.168.1.254
    parents             server-backbone
    check_command           check-host-alive
    max_check_attempts      5
    check_period            24x7
    process_perf_data       0
    retain_nonstatus_information    0
    contact_groups          router-admins
    notification_interval       30
    notification_period     24x7
    notification_options        d,u,r
    }
~~~~

Descriptions des directives:

  --------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **host\_name**:                                                                                           C’est le nom court qui permet d’identifier l’hôte. Il est utilisé dans les groupes d’hôtes et les définitions de service pour faire référence à cet hôte particulier. Les hôtes peuvent être associés à de multiples services (qui sont supervisés). Si elle est utilisée dans le bon contexte, la macro \$HOSTNAME\$ contient ce nom court.
  **alias**:                                                                                                C’est un nom long ou une description de l’hôte permettant de l’identifier plus facilement. Si elle est utilisée dans le bon contexte, la macro \$HOSTALIAS\$ contient cet alias/description.
  **address**:                                                                                              Cette directive définit l’adresse de l’hôte. C’est normalement une adresse IP, bien que ce puisse être en réalité ce que vous voulez (du moment que cela peut être utilisé pour tester l’hôte). Vous pouvez utiliser un FQDN ^[1)](objects-reference.html#fn__1)^ pour identifier l’hôte, mais si le service DNS n’est pas actif, cela peut poser des problèmes. Si elle est utilisée dans le bon contexte, la macro \$HOSTADDRESS\$ contient cette adresse. **Note:**si vous ne spécifiez pas une directive d’adresse dans la définition d’un hôte, le nom sera employé comme adresse. Un avertissement à ce sujet : si le DNS tombe, tous les contrôles de service échoueront puisque les plugin seront incapables de résoudre les noms.
  **parents**:                                                                                              Cette directive définit une liste de noms courts d’hôtes “parents” de cet hôte, séparés par des virgules. Les hôtes parents sont généralement des routeurs, des commutateurs, des firewalls, etc. se trouvant entre l’hôte de supervision et les hôtes distants. Le routeur, le commutateur, etc. le plus proche de l’hôte distant est considéré comme le parent de cette hôte. Pour plus d’informations, référez-vous au chapitre “Déterminer l’état et l’accessibilité des hôtes du réseau” dans la doc Nagios. Si cet hôte est sur le même segment que l’hôte de supervision (sans routeur intermédiaire, etc.), il est considéré comme étant sur le réseau local et n’aura pas d’hôte parent. Laissez cette valeur vide si l’hôte n’a pas d’hôte parent (c.a.d s’il est sur le même segment que l’hôte de Nagios). L’ordre dans lequel vous déclarez les parents n’a pas d’influence sur la façon dont la supervision se déroule.
  **hostgroups**:                                                                                           Cette directive est utilisée pour identifier le *nom court* du/des [groupe(s) d'hôtes](objects-reference.html#hostgroup "nagios:objects-reference ↵") auquel(s) l’hôte appartient. Cette directive peut être utilisée à la place de (en en complément) la directive *members* dans les définitions des [hostgroup](objects-reference.html#hostgroup "nagios:objects-reference ↵").
  **check\_command**:                                                                                       Cette directive définit le *nom court* de la [commande](objects-reference.html#command "nagios:objects-reference ↵") à utiliser pour déterminer si l’hôte est hors service ou non. Typiquement, cette commande lance un “ping” vers l’hôte pour voir s’il est “vivant”. La commande doit retourner un état OK (0) sinon Nagios supposera que cet hôte est hors service. Si vous laissez cet argument vide, l’hôte ne sera pas contrôlé - Nagios supposera que l’hôte est toujours en fonctionnement. Ceci est utile pour superviser des imprimantes ou autres périphériques qui sont éteints fréquemment. Le temps d’exécution maximal de cette commande est déterminé par la variable host\_check\_timeout.
  **max\_check\_attempts**:                                                                                 Cette directive définit le nombre de fois ou Nagios relancera la commande de contrôle de l’hôte si celle-ci retourne un état différent de OK. Positionner cette valeur à 1 entraînera Nagios à générer une alerte sans re-contrôler l’hôte. Note : si vous ne voulez pas contrôler l’état de l’hôte, vous devez quand même mettre une valeur supérieure ou égale à 1. Pour ne pas effectuer le contrôle de l’hôte, laissez simplement vide l’option *\<check\_command\>*.
  **check\_interval**:                                                                                      ***NOTE:** N’activez pas cette directive sans en avoir réellement besoin ! Les vérifications sont réalisées à la demande lorsque c’est nécessaire. Les vérifications programmées des hôtes peuvent impacter les performances - lire les astuces de tuning des performances pour plus d’informations.* Cette directive est utilisée pour définir le nombre “d’unité de temps” entre chaque check de l’hôte. Sans changer la directive interval\_length la valeur par défaut est de 60, ce nombre correspond à des minutes. Plus d’informations sur cette valeur peuvent être trouvées sur la documentation des vérifications programmées.
  **active\_checks\_enabled [\*](objects-reference.html#retention_notes "nagios:objects-reference ↵")**:    Cette directive définit si les contrôles actifs (les contrôles planifiés ou ceux à la demande) sont activés pour cet hôte. Valeurs: 0 = contrôles actifs désactivés, 1 = contrôles actifs activés.
  **passive\_checks\_enabled [\*](objects-reference.html#retention_notes "nagios:objects-reference ↵")**:   Cette directive définit si les contrôles passifs sont activés pour cet hôte. Valeurs: 0 = contrôles passifs désactivés, 1 = contrôles passifs activés.
  **check\_period**:                                                                                        Cette directive est utilisée pour définir le nom court d’une [période](objects-reference.html#timeperiod "nagios:objects-reference ↵") durant laquelle les contrôles actifs de cet hôte peuvent être réalisés.
  **obsess\_over\_host [\*](objects-reference.html#retention_notes "nagios:objects-reference ↵")**:         Cette directive définit si les contrôles pour cet hôte seront “obsessed” en utilisant la directive ochp\_command.
  **check\_freshness [\*](objects-reference.html#retention_notes "nagios:objects-reference ↵")**:           Cette directive est utilisée pour définir si les contrôles de fraîcheur sont activés pour cet hôte. Valeurs : 0 = contrôle de fraîcheur désactivé, 1 = contrôle de fraîcheur activé.
  **freshness\_threshold**:                                                                                 Cette directive est utilisée pour spécifier le seuil de fraîcheur (en secondes) pour cet hôte. Si vous mettez cette valeur à 0, Nagios déterminera automatiquement le seuil de fraîcheur à utiliser.
  **event\_handler**:                                                                                       Cette directive définit le *nom court* de la [commande](objects-reference.html#command "nagios:objects-reference ↵") à lancer à chaque fois qu’un changement d’état de l’hôte est détecté (c.a.d chaque fois qu’il est hors service ou qu’il se rétablit). Lisez la documentation sur les gestionnaires d’événement pour des explications détaillées sur la façon d’écrire des scripts de gestion d’événements. Le temps d’exécution maximal de cette commande est déterminé par la variable event\_handler\_timeout.
  **event\_handler\_enabled [\*](objects-reference.html#retention_notes "nagios:objects-reference ↵")**:    Cette directive définit si le gestionnaire d’évènements est activé pour cet hôte. Valeurs: 0 = gestionnaire d’évènements désactivé, 1 = gestionnaire d’évènements activé.
  **low\_flap\_threshold**:                                                                                 Cette directive définit le seuil bas de la détection d’oscillation pour cet hôte. Vous trouverez plus d’informations sur l’oscillation dans la doc Nagios. Si vous fixez cette directive à 1, la valeur fixée par la directive globale ( au niveau de Nagios) low\_host\_flap\_threshold sera utilisé à la place.
  **high\_flap\_threshold**:                                                                                Cette directive définit le seuil haut de la détection d’oscillation pour cet hôte. Vous trouverez plus d’informations sur l’oscillation dans la doc Nagios. Si vous fixez cette directive à 1, la valeur fixée par la directive globale ( au niveau de Nagios) high\_host\_flap\_threshold sera utilisé à la place.
  **flap\_detection\_enabled [\*](objects-reference.html#retention_notes "nagios:objects-reference ↵")**:   Cette directive définit si la détection d ‘oscillation est activée pour cet hôte. Valeurs: 0 = détection d’oscillation désactivée, 1 = détection d’oscillation activée. Vous trouverez plus d’informations sur l’oscillation dans la doc Nagios.
  **process\_perf\_data [\*](objects-reference.html#retention_notes "nagios:objects-reference ↵")**:        Cette directive définit si le traitement des données liées à la performance du contrôle est activé pour cet hôte. Valeurs: 0 = traitement désactivé, 1 = traitement activé.
  **retain\_status\_information**:                                                                          Cette directive définit si les informations **liées** au statut de l’hôte sont mémorisées, entre les (re)démarrages de Nagios, pour cet hôte. Valeurs: 0 = mémorisation désactivée, 1 = mémorisation activée. Ceci n’est utile que si vous avez activé la directive retain\_state\_information. Value: 0 = mémorisation des états désactivée, 1 = mémorisation des états activée.
  **retain\_nonstatus\_information**:                                                                       Cette directive définit si les informations **non liées** au statut de l’hôte sont mémorisées, entre les (re)démarrages de Nagios, pour cet hôte. Valeurs: 0 = mémorisation désactivée, 1 = mémorisation activée. Ceci n’est utile que si vous avez activé la directive retain\_state\_information.
  **contact\_groups**:                                                                                      Ceci est une liste de *noms courts* de [groupes de contacts](objects-reference.html#contactgroup "nagios:objects-reference ↵") qui devront être notifiés lorsqu’il y aura des problèmes (ou des recouvrements) avec cet hôte. Les multiples groupes de contacts devront être séparés par des virgules.
  **notification\_interval**:                                                                               Cette directive définit le nombre d’“unités de temps” à patienter avant de re-notifier un contact que l’hôte est *toujours* hors service ou inaccessible. Si vous n’avez pas modifié la valeur par défaut de la directive [interval\_length, qui est de 60 par défaut, ce nombre exprime des minutes. Si vous mettez cette valeur à 0, Nagios *ne notifiera pas à régulièrement* les contacts à propos des problèmes de cet hôte - une seule notification sera émise.
  **notification\_period**:                                                                                 Cette directive définit le *nom court*de la [période](objects-reference.html#timeperiod "nagios:objects-reference ↵") durant laquelle les notifications d’événements concernant cet hôte peuvent être émises vers les contacts. Si un hôte est hors service, inaccessible, ou se rétablit en dehors de la période de notification, aucune notification ne sera envoyée.
  **notifications\_options**:                                                                               Cette directive définit quand les notifications pour cet hôte doivent être envoyées. Les options valides sont une combinaison d’une ou plusieurs des valeurs suivantes : : **d** = envoi de la notification pour un état DOWN, **u** = envoi de la notification pour un état UNREACHABLE , **r** = envoi de la notification pour le retour à la normale (état OK) et **f** = envoi d’une notification lorsque l’hôte commence ou arrête d’osciller. Si vous spécifiez la valeur **n** (none), aucune notification ne sera envoyée. . Exemple: avec les valeurs **d,r** dans ce champ, les notifications seront envoyées quand l’hôte sera DOWN et quand il sortira de cet état pour un état OK.
  **notifications\_enabled [\*](objects-reference.html#retention_notes "nagios:objects-reference ↵")**:     Cette directive définit si les notifications sont activées pour cet hôte. valeurs: 0 = notifications désactivées, 1 = notifications activées.
  **stalking\_options**:                                                                                    Cette directive définit pour quel état de l’hôte le “suivi précis” est activé. Les options valides sont une combinaison d’une ou plusieurs des valeurs suivantes: **o** = suivi sur les états UP, **d** = suivi sur les états DOWN , et **u** = suivi sur les états UNREACHABLE.
  --------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

hostgroup {#hostgroup .sectionedit11}
---------

Description:

Une définition de groupe d’hôtes est utilisée pour regrouper un ou
plusieurs groupes ensemble pour les afficher CGIs.

Définition du Format:

Note: les directives requises sont en rouge, et les optionnelles en
noir.

define hostgroup{

hostgroup\_name

*hostgroup\_name*

alias

*alias*

members

*members*

}

Exemple de définition

~~~~ {.code}
define hostgroup{
    hostgroup_name      novell-servers
    alias           Novell Servers
    members         netware1,netware2,netware3,netware4
    }
~~~~

Descriptions des directives

  ---------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **hostgroup\_name**:   Cette directive définit le *nom court* qui identifie le groupe d’hôtes
  **alias**:             Cette directive définit un nom long ou une description permettant d’identifier plus facilement le groupe d’hôtes. Elle sert à permettre une identification plus facile d’un groupe d’hôtes.
  **members**:           C’est une liste de *noms courts* d’[hôtes](objects-reference.html#host "nagios:objects-reference ↵") à inclure dans ce groupe. Les noms doivent être séparés par des virgules. Cette directive peut être utilisée comme une alternative (ou en complément) de la directive *hostgroups* dans les [définitions d'hôte](objects-reference.html#host "nagios:objects-reference ↵").
  ---------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

service {#service .sectionedit14}
-------

Description:

la définition d’un service identifie un service tournant sur un hôte. Le
terme “service” est très générique. Il peut s’appliquer à un service (
tel que POP, SMTP, HTTP, etc.) ou bien tout autre type de mesures
associé à l’hôte (temps de réponse à un ping, nombre d’utilisateurs
connectés, usage des disques). Les différents arguments sont expliqués
ci-dessous.

Définition du Format:

Note: les directives requises sont en rouge, et les optionnelles en
noir.

define service{

host\_name

*host\_name*

service\_description

*service\_description*

servicegroups

servicegroup\_names

is\_volatile

[0/1]

check\_command

*command\_name*

max\_check\_attempts

\#

normal\_check\_interval

\#

retry\_check\_interval

\#

active\_checks\_enabled

[0/1]

passive\_checks\_enabled

[0/1]

check\_period

*timeperiod\_name*

parallelize\_check

[0/1]

obsess\_over\_service

[0/1]

check\_freshness

[0/1]

freshness\_threshold

\#

event\_handler

*command\_name*

event\_handler\_enabled

[0/1]

low\_flap\_threshold

\#

high\_flap\_threshold

\#

flap\_detection\_enabled

[0/1]

process\_perf\_data

[0/1]

retain\_status\_information

[0/1]

retain\_nonstatus\_information

[0/1]

notification\_interval

\#

notification\_period

*timeperiod\_name*

notification\_options

[w,u,c,r,f]

notifications\_enabled

[0/1]

contact\_groups

*contact\_groups*

stalking\_options

[o,w,u,c]

}

Exemple de Définition:

~~~~ {.code}
define service{
    host_name       linux-server
    service_description check-disk-sda1
    check_command       check-disk!/dev/sda1
    max_check_attempts  5
    normal_check_interval   5
    retry_check_interval    3
    check_period        24x7
    notification_interval   30
    notification_period 24x7
    notification_options    w,c,r
    contact_groups      linux-admins
    }
~~~~

Descriptions des directives:

  --------------------------------------------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **host\_name**:                                                                                           Cette directive définit le *nom court* de l’hôte sur lequel “tourne” le service ou avec lequel il est associé.
  **service\_description;**:                                                                                Cette directive définit la description du service qui peut contenir des espaces, tirets, et deux-points (points-virgules, apostrophes, et guillemets sont à éviter). Deux services associés au même hôte ne peuvent pas avoir la même description. Les services sont identifiés uniquement avec les directives *host\_name* et *service\_description.*
  **servicegroups**:                                                                                        Cette directive est utilisée pour identifié le(s) *nom(s) court(s)* du (ou des) services groupes auquel le service appartient. Les multiples groupes de services doivent être séparés par des virgules. Cette directive peut être utilisée à la place de la directive *members* de la définition du [groupe de service](objects-reference.html#servicegroup "nagios:objects-reference ↵").
  **is\_volatile**:                                                                                         Cette directive définit si le service est “volatil”. Un service ne l’est normalement pas. Plus d’informations sur ce type de service et en quoi ils diffèrent des services normaux, se trouve dans la doc Nagios. Valeur: 0 = service non volatil, 1 = service volatil.
  **check\_command**:                                                                                       Cette directive est utilisée pour spécifier the *nom court* de la commande que Nagios exécutera pour déterminer l’état du service. Le temps d’exécution maximal de cette commande est déterminé par la variable service\_check\_timeout
  **max\_check\_attempts**:                                                                                 Cette directive définit le nombre de fois que Nagios réessayera de contrôler le service si celui-ci retourne un état différent de OK. Si vous donnez une valeur de 1 à cette variable, Nagios générera une alerte (si le contrôle de service a détecté un problème) sans nouvel essai.
  **normal\_check\_interval**:                                                                              Cette directive définit le nombre d’“unités de temps” à attendre avant d’ordonnancer le prochain contrôle “régulier” du service. Les contrôles “réguliers” sont ceux qui se font lorsque le service est en état OK ou lorsque le service n’est pas en état OK, mais que le nombre d’essais défini par la variable **max\_check\_attempts** est atteint. Si vous n’avez pas changé la valeur de interval\_length, qui est par défaut de 60, ce nombre exprime des minutes. Pour plus d’informations sur cette valeur, voyez la documentation sur l’ordonnancement du contrôle des services.
  **retry\_check\_interval**:                                                                               Cette directive définit le nombre d’“unités de temps” à attendre avant d’ordonnancer le prochain contrôle du service. Les services sont réordonnancés à cet intervalle quand ils sont passés dans un état différent de OK. Une fois que le contrôle de service a été tenté **max\_check\_attempts** fois sans changement d’état, il est réordonnancé à nouveau à sa fréquence “normale” définie par la valeur de **check\_interval**. Si vous n’avez pas changé la valeur de interval\_length, qui est par défaut de 60, ce nombre exprime des minutes. Pour plus d’informations sur cette valeur, voyez la documentation sur l’ordonnancement du contrôle des services.
  **active\_checks\_enabled [\*](objects-reference.html#retention_notes "nagios:objects-reference ↵")**:    Cette directive définit si les contrôles actifs sont activés pour ce service. Valeurs: 0 = contrôle actif désactivé, 1 = contrôle actif activé.
  **passive\_checks\_enabled [\*](objects-reference.html#retention_notes "nagios:objects-reference ↵")**:   Cette directive définit si les contrôles passifs sont activés pour ce service. Valeurs: 0 = contrôle passif désactivé, 1 = contrôle passif activé.
  **check\_period**:                                                                                        Cette directive définit le *nom court* de la période de temps durant laquelle un contrôle actif peut être effectué.
  **parallelize\_check**:                                                                                   cette directive définit si le contrôle de service peut être effectué en parallèle. Par défaut, tous les contrôles de service sont parallélisés. Le désactiver peut causer de graves problèmes de performance. Vous trouverez plus d’informations à ce sujet dans la docs Nagios. Valeurs: 0 = le contrôle de service ne peut pas être parallélisés (utilisation à vos risques et périls! ), 1 = le contrôle de service peut être parallélisé.
  **obsess\_over\_service [\*](objects-reference.html#retention_notes "nagios:objects-reference ↵")**:      Cette directive définit si les contrôles pour ce service seront “obsessed” en utilisant la ocsp\_command.
  **check\_freshness [\*](objects-reference.html#retention_notes "nagios:objects-reference ↵")**:           Cette directive définit si le contrôle de validité des données est activé pour ce service. Valeurs: 0 = contrôle désactivé, 1 = contrôle activé.
  **freshness\_threshold**:                                                                                 Cette directive définit le seuil (en secondes) à partir duquel le contrôle de validité est activé pour ce service. Si vous le mettez à 0, Nagios déterminera seul un seuil.
  **event\_handler\_enabled**:                                                                              Cette directive définit si le gestionnaire d’évènements est activé pour ce service. Valeurs: 0 = gestionnaire d’évènements désactivé, 1 = gestionnaire d’évènements activé.
  **low\_flap\_threshold**:                                                                                 Cette directive définit le seuil bas de la détection d’oscillation pour ce service. Vous trouverez plus d’informations sur l’oscillation dans la doc nagios. si vous fixez cette directive à 1, la valeur fixée par la directive globale (au niveau de Nagios) low\_service\_flap\_threshold sera utilisé à la place.
  **high\_flap\_threshold**:                                                                                Cette directive définit le seuil haut de la détection d’oscillation pour ce service. Vous trouverez plus d’informations sur l’oscillation dans la doc Nagios. si vous fixez cette directive à 1, la valeur fixée par la directive globale ( au niveau de Nagios) high\_service\_flap\_threshold sera utilisé à la place.
  **flap\_detection\_enabled [\*](objects-reference.html#retention_notes "nagios:objects-reference ↵")**:   Cette directive définit si la détection d’oscillation est activée pour ce service. Valeurs: 0 = détection d’oscillation désactivée, 1 = détection d’oscillation activée. Vous trouverez plus d’informations sur l’oscillation dans la doc Nagios.
  **process\_perf\_data [\*](objects-reference.html#retention_notes "nagios:objects-reference ↵")**:        Cette directive définit si le traitement des données liées à la performance du contrôle est activé pour ce service. Valeurs: 0 = traitement désactivé, 1 = traitement activé.
  **retain\_status\_information**:                                                                          Cette directive définit si les informations **liées** au statut du service sont mémorisées, entre les (re)démarrages de Nagios, pour cet hôte. Valeurs: 0 = mémorisation désactivée, 1 = mémorisation activée. Ceci n’est utile que si vous avez activé la mémorisation des états, avec la directive adéquate. Valeur : 0 = mémorisation des états désactivée, 1 = mémorisation des états activée.
  **retain\_nonstatus\_information**:                                                                       Cette directive définit si les informations **non liées** au statut du service sont mémorisées, entre les (re)démarrages de Nagios, pour cet hôte. Valeurs: 0 = mémorisation désactivée, 1 = mémorisation activée. Ceci n’est utile que si vous avez activé la mémorisation des états, avec la directive adéquate.
  **notification\_interval**:                                                                               Cette directive définit le nombre d’“unités de temps” à patienter avant de notifier à nouveau un contact que le service est *toujours* hors service ou inaccessible. Si vous n’avez pas modifié la valeur par défaut de la directive interval\_length, qui est de 60 par défaut, ce nombre exprime des minutes. Si vous mettez cette valeur à 0, Nagios *ne re-notifiera pas* les contacts à propos des problèmes de ce service - une seule notification sera émise.
  **notification\_period**:                                                                                 Cette directive définit le *nom court*de la [période](objects-reference.html#timeperiod "nagios:objects-reference ↵") durant laquelle les notifications d’événements concernant ce service peuvent être émises vers les contacts. Si un service est tombé, inaccessible, ou se rétablit en dehors de la période de notification, aucune notification ne sera envoyée.
  **notification\_options**:                                                                                Cette directive définit quand les notifications pour ce service doivent être envoyées. Les options valides sont une combinaison d’une ou plusieurs des valeurs suivantes : **w**= envoi de la notification pour un état WARNING, **u** = envoi de la notification pour un état UNKNOWN ,**r**= envoi de la notification pour le retour à la normale (état OK) et **f** = envoi d’une notification lorsque le service commence ou arrête d’osciller. Si vous spécifiez la valeur **n** (none), aucune notification ne sera envoyée. . Exemple: avec les valeurs **w,r** dans ce champ, les notifications seront envoyées quand l’hôte sera WARNING et quand il sortira de cet état pour un état OK.
  **notifications\_enabled [\*](objects-reference.html#retention_notes "nagios:objects-reference ↵")**:     Cette directive définit si les notifications sont activées pour ce service. Valeurs: 0 = notifications désactivées, 1: notifications activées.
  **contact\_groups**:                                                                                      C’est une liste de *noms courts* de [groupes de contacts](objects-reference.html#contactgroup "nagios:objects-reference ↵"), séparés par des virgules, qui doivent être notifiés des problèmes ou rétablissements de ce service.
  **stalking\_options**:                                                                                    Cette directive définit pour quel état du service le “suivi précis” est activé. Les options valides sont une combinaison d’une ou plusieurs des valeurs suivantes: **w** = suivi sur les états WARNING , **o** = suivi sur les états OK , et **u** = suivi sur les états UNKNOWN et **c**= suivi sur les états CRITICAL. Vous trouverez plus d’informations sur le suivi précis dans la doc Nagios.
  --------------------------------------------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

servicegroup {#servicegroup .sectionedit17}
------------

Description:

Une définition de groupe de services est utilisée pour regrouper un ou
plusieurs services ensemble pour les afficher CGIs.

Définition du Format :

Note: Les directives en rouge sont requises alors que celles en noir
sont optionnelles.

define servicegroup{

servicegroup\_name

*servicegroup\_name*

alias

*alias*

members

*members*

}

Exemple Definition:

~~~~ {.code}
define servicegroup{
    servicegroup_name   dbservices
    alias           Database Services
    members         ms1,SQL Server,ms1,SQL Server Agent,ms1,SQL DTC
    }
~~~~

Descriptions des Directives :

  ------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **servicegroup\_name**:   Cette directive définit le nom court qui identifie le groupe de services.
  **alias**:                Cette directive définit un nom long ou une description permettant d’identifier plus facilement le groupe de services. Elle sert à permettre une identification plus facile d’un groupe de services.
  **members**:              Ceci est une liste de *descriptions* de [services](objects-reference.html#service "nagios:objects-reference ↵") (et le nom de leur hôtes associés) qui doivent être inclus dans ce groupe. Les noms des hôtes et des services doivent être séparés par des virgules. Cette directive peut être utilisée comme une alternative à la directive *servicegroups* de la [définition d'un service](objects-reference.html#service "nagios:objects-reference ↵"). Le format de cette directive est le suivant (notez qu’un nom d’hôte doit être précédé d’un nom de service) :members=\<host1\>,\<service1\>,\<host2\>,\<service2\>,…,\<host*n*\>,\<service*n*\>
  ------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

contact {#contact .sectionedit20}
-------

Description:

Une définition de contact s’applique à la personne physique qui doit
être contactée en cas de problèmes sur le réseau. Les différents
arguments possibles sont expliqués ci-dessous.

Définition du Format:

Note: les directives requises sont en rouge, et les optionnelles en
noir.

define contact{

contact\_name

*contact\_name*

alias

*alias*

contactgroups

*contactgroup\_names*

host\_notification\_period

*timeperiod\_name*

service\_notification\_period

*timeperiod\_name*

host\_notification\_options

[d,u,r,f,n]

service\_notification\_options

[w,u,c,r,f,n]

host\_notification\_commands

*command\_name*

service\_notification\_commands

*command\_name*

email

*email\_address*

pager

*pager\_number or pager\_email\_gateway*

address*x*

*additional\_contact\_address*

}

Exemple de Définition:

~~~~ {.code}
define contact{
    contact_name                    jdoe
    alias                           John Doe
    service_notification_period     24x7
    host_notification_period        24x7
    service_notification_options    w,u,c,r
    host_notification_options       d,u,r
    service_notification_commands   notify-by-email
    host_notification_commands      host-notify-by-email
    email               [email protected]
/*  */!function(){try{var t="currentScript"in document?document.currentScript:function(){for(var t=document.getElementsByTagName("script"),e=t.length;e--;)if(t[e].getAttribute("cf-hash"))return t[e]}();if(t&&t.previousSibling){var e,r,n,i,c=t.previousSibling,a=c.getAttribute("data-cfemail");if(a){for(e="",r=parseInt(a.substr(0,2),16),n=2;a.length-n;n+=2)i=parseInt(a.substr(n,2),16)^r,e+=String.fromCharCode(i);e=document.createTextNode(e),c.parentNode.replaceChild(e,c)}}}catch(u){}}();/*  */
    pager               [email protected]
/*  */!function(){try{var t="currentScript"in document?document.currentScript:function(){for(var t=document.getElementsByTagName("script"),e=t.length;e--;)if(t[e].getAttribute("cf-hash"))return t[e]}();if(t&&t.previousSibling){var e,r,n,i,c=t.previousSibling,a=c.getAttribute("data-cfemail");if(a){for(e="",r=parseInt(a.substr(0,2),16),n=2;a.length-n;n+=2)i=parseInt(a.substr(n,2),16)^r,e+=String.fromCharCode(i);e=document.createTextNode(e),c.parentNode.replaceChild(e,c)}}}catch(u){}}();/*  */
    address1            [email protected]
/*  */!function(){try{var t="currentScript"in document?document.currentScript:function(){for(var t=document.getElementsByTagName("script"),e=t.length;e--;)if(t[e].getAttribute("cf-hash"))return t[e]}();if(t&&t.previousSibling){var e,r,n,i,c=t.previousSibling,a=c.getAttribute("data-cfemail");if(a){for(e="",r=parseInt(a.substr(0,2),16),n=2;a.length-n;n+=2)i=parseInt(a.substr(n,2),16)^r,e+=String.fromCharCode(i);e=document.createTextNode(e),c.parentNode.replaceChild(e,c)}}}catch(u){}}();/*  */
    address2            555-555-5555
    }
~~~~

Descriptions des directives

  ------------------------------------ ------------------------------------
  **contact\_name**:                   Cette directive définit *le nom
                                       court* identifiant le contact. Il
                                       est utilisé dans les définitions de
                                       [groupes de
                                       contacts](objects-reference.html#con
                                       tactgroup "nagios:objects-reference 
                                       ↵").
                                       Si elle est utilisée dans le bon
                                       contexte, la macro \$CONTACTNAME\$

  **alias**:                           Cette directive définit un nom long
                                       ou une description du contact. Si
                                       elle est utilisée dans le bon
                                       contexte, la macro \$CONTACTALIAS\$
                                       contient cette valeur.

  **contactgroups**:                   Cette directive est utilisée pour
                                       identifier le(s) *nom(s) court(s)*
                                       [de groupe(s) de
                                       contacts](objects-reference.html#con
                                       tactgroup "nagios:objects-reference 
                                       ↵")
                                       auquel le contact appartient. Les
                                       multiples groupes de contacts
                                       doivent être séparés par des
                                       virgules. Cette directive peut être
                                       utilisée comme une alternative (ou
                                       en complément) de la directive
                                       *members* de la définition d’un
                                       [groupe de
                                       contacts](objects-reference.html#con
                                       tactgroup "nagios:objects-reference 
                                       ↵").

  **host\_notification\_period**:      Cette directive définit le *nom
                                       court*de la
                                       [période](objects-reference.html#tim
                                       eperiod "nagios:objects-reference ↵"
                                       )
                                       durant laquelle le contact peut être
                                       notifié de problèmes ou de
                                       rétablissement d’hôtes. Considérez
                                       ceci comme “la période d’astreinte
                                       du contact” durant laquelle les
                                       notifications peuvent lui parvenir.
                                       Pour plus d’informations, vous
                                       pouvez lire le chapitre sur les
                                       “Périodes de temps”, qui décrit
                                       comment elles fonctionnent et quels
                                       sont les problèmes qui peuvent
                                       découler d’une utilisation
                                       incorrecte.

  **service\_notification\_period**:   Cette directive définit le *nom
                                       court*de la
                                       [période](objects-reference.html#tim
                                       eperiod "nagios:objects-reference ↵"
                                       )
                                       durant laquelle le contact peut être
                                       notifié de problèmes ou de
                                       rétablissement de services.
                                       Considérez ceci comme “la période
                                       d’astreinte du contact” durant
                                       laquelle les notifications peuvent
                                       lui parvenir. Pour plus
                                       d’informations, vous pouvez lire le
                                       chapitre sur les “Périodes de
                                       temps”, qui décrit comment elles
                                       fonctionnent et quels sont les
                                       problèmes qui peuvent découler d’une
                                       utilisation incorrecte.

  **host\_notification\_commands**:    Cette directive définit une liste de
                                       *noms courts* de
                                       [commandes](objects-reference.html#c
                                       ommand "nagios:objects-reference ↵")
                                       à
                                       utiliser pour notifier un contact
                                       d’un problème sur un hôte ou de son
                                       rétablissement. Les commandes
                                       multiples seront séparées par des
                                       virgules. Toutes les commandes de
                                       notification sont exécutées quand le
                                       contact doit être notifié. Le temps
                                       maximal durant lequel cette commande
                                       de notification peut s’exécuter est
                                       contrôlé par l’option
                                       notification\_timeout.

  **host\_notification\_options**:     Cette directive définit pour quel
                                       état de l’hôte les notifications
                                       doivent être envoyées. Les options
                                       valides sont une combinaison d’une
                                       ou plusieurs des valeurs suivantes :
                                       : **d** = envoi de la notification
                                       pour un état DOWN, **u** = envoi de
                                       la notification pour un état
                                       UNREACHABLE , **r** = envoi de la
                                       notification pour le retour à la
                                       normale (état OK) et **f** = envoi
                                       d’une notification lorsque l’hôte
                                       commence ou arrête d’osciller. Si
                                       vous spécifiez la valeur **n**
                                       (none), aucune notification ne sera
                                       envoyée.

  **service\_notification\_options**:  Cette directive définit pour quel
                                       état du service les notifications
                                       doivent être envoyées. Les options
                                       valides sont une combinaison d’une
                                       ou plusieurs des valeurs suivantes :
                                       **w**= envoi de la notification pour
                                       un état WARNING, **u** = envoi de la
                                       notification pour un état UNKNOWN ,
                                       **c**= envoi de la notification pour
                                       un état CRITIQUE et **r**= envoi de
                                       la notification pour le retour à la
                                       normale (état OK) et **f** = envoi
                                       d’une notification lorsque le
                                       service commence ou arrête
                                       d’osciller. Si vous spécifiez la
                                       valeur **n** (none), aucune
                                       notification ne sera envoyée. .

  **service\_notification\_commands**: Cette directive définit une liste de
                                       *noms courts* de
                                       [commandes](objects-reference.html#c
                                       ommand "nagios:objects-reference ↵")
                                       à
                                       utiliser pour notifier un contact
                                       d’un problème sur un service ou de
                                       son rétablissement. Les commandes
                                       multiples seront séparées par des
                                       virgules. Toutes les commandes de
                                       notification sont exécutées quand le
                                       contact doit être notifié. Le temps
                                       maximal durant lequel cette commande
                                       de notification peut s’exécuter est
                                       contrôlé par l’option
                                       notification\_timeout.

  **email**:                           Cette directive définit l’adresse
                                       email du contact. Selon la manière
                                       dont vous aurez défini la commande
                                       de notification, elle peut être
                                       utilisée pour émettre un email. Dans
                                       des circonstances adéquates, la
                                       macro \$CONTACTEMAIL\$ contient
                                       cette valeur.

  **pager**:                           Cette directive définit le numéro de
                                       pager du contact. Cela peut aussi
                                       être l’adresse email d’une
                                       passerelle vers un pager (c.a.d
                                       [[email protected]](../cdn-cgi/l/ema
                                       il-protection.html)
                                       ). Selon la manière dont vous aurez
                                       configuré la commande de
                                       notification, Il pourra être utilisé
                                       pour émettre un message vers un
                                       pager. Dans des circonstances
                                       adéquates, la macro \$CONTACTPAGER\$
                                       contient cette valeur.

  **address*x***:                      Les directives adresses sont
                                       utilisées pour définir les adresses
                                       d’un contact. Ces adresses peuvent
                                       être n’importe quoi - numéros de
                                       téléphone portable, adresses de
                                       messageries instantanées, etc. Cela
                                       dépend de comment vous avez
                                       configuré vos commandes de
                                       notifications, elles peuvent être
                                       utilisées pour envoyer des alertes
                                       aux contacts. Jusqu’à six adresses
                                       peuvent être définies en utilisant
                                       cette directive *address1* à
                                       *address6*). La macro
                                       \$CONTACTADDRESS*x*\$ contiendra
                                       cette valeur.
  ------------------------------------ ------------------------------------

contactgroup {#contactgroup .sectionedit23}
------------

Description:

Une définition de groupe de contacts permet de regrouper un ou plusieurs
[contacts](objects-reference.html#contact "nagios:objects-reference ↵")
pour émettre des notifications. Quand un hôte ou un service a un
problème ou se rétablit, Nagios recherche les groupes de contacts à qui
envoyer des notifications, et notifie tous les contacts de ces groupes.
Ceci peut sembler complexe, mais dans la plupart des cas, ce ne le sera
pas. On obtient ainsi une meilleure flexibilité dans la définition de
qui est notifié de quel problème. Les différents arguments d’une
définition de groupe de contacts sont détaillés ci-dessous.

Définition du Format:

Note: les directives requises sont en rouge, et les optionnelles en
noir.

define contactgroup{

contactgroup\_name

*contactgroup\_name*

alias

*alias*

members

*members*

}

Exemple de définition

~~~~ {.code}
define contactgroup{
    contactgroup_name       novell-admins
    alias           Novell Administrators
    members         jdoe,rtobert,tzach
    }
~~~~

Descriptions des directives

  ------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **contactgroup\_name**:   Cette directive définit le *nom court* utilisé pour identifier le groupe de contacts.
  **alias**:                Cette directive définit le nom long ou la description de ce groupe de contacts.
  **members**:              C’est une liste de *noms courts* de [contacts](objects-reference.html#contact "nagios:objects-reference ↵") faisant partie de ce groupe. Les noms doivent être séparés par des virgules. Cette directive peut être utilisée comme une alternative - ou en supplément - de la directive *contactgroups* de la définition d’un [contact](objects-reference.html#contact "nagios:objects-reference ↵").
  ------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

timeperiod {#timeperiod .sectionedit26}
----------

Description:

Une période est une liste de tranches horaires pour les différents jours
de la semaine, qui sont “valides” pour l’envoi des notifications et les
contrôles de service. Ces tranches sont elles-mêmes composées d’autres
tranches de temps pour chaque jour de la semaine, qui “tournent” une
fois que la semaine est terminée. On ne peut pas définir d’exception à
la définition hebdomadaire.

Définition du Format:

Note: les directives requises sont en rouge, et les optionnelles en
noir.

define timeperiod{

timeperiod\_name

*timeperiod\_name*

alias

*alias*

sunday

*timeranges*

monday

*timeranges*

tuesday

*timeranges*

wednesday

*timeranges*

thursday

*timeranges*

friday

*timeranges*

saturday

*timeranges*

}

Exemple de définition

~~~~ {.code}
define timeperiod{
    timeperiod_name     nonworkhours
    alias           Non-Work Hours
    sunday          00:00-24:00
    monday          00:00-09:00,17:00-24:00
    tuesday         00:00-09:00,17:00-24:00
    wednesday       00:00-09:00,17:00-24:00
    thursday        00:00-09:00,17:00-24:00
    friday          00:00-09:00,17:00-24:00
    saturday        00:00-24:00
    }
~~~~

Descriptions des directives

  ----------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **timeperiod\_name**:   Cette directive définit le *nom court* identifiant la période.
  **alias**:              Cette directive définit un nom long ou une description de la période.
  ***some*day**:          Cette directive définit une liste de tranches horaires (*sunday, friday, saturday*..) séparées par des points-virgules, qui sont “valides” pour un jour donné de la semaine. Notez que vous devez définir des tranches horaires pour les sept jours de la semaine (de Sunday à Saturday - dimanche à samedi). Les tranches horaires sont au format **HH:MM-HH:MM**, où les heures sont indiquées entre 0 et 24. Par exemple, **00:15-24:00** veut dire de zéro heure quinze ce jour jusqu’à minuit (une tranche de 23 heures et 45 minutes). Si vous désirez exclure une journée entière des périodes de temps, ne la mettez pas dans les définitions, simplement.
  ----------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

command {#command .sectionedit29}
-------

Description:

Une définition de commande, comme son nom l’indique, définit une
commande ![:-)](../lib/images/smileys/icon_smile.gif). Les commandes
qu’on peut définir sont les contrôles de service, les notifications de
service, les gestionnaires d’événements de service, les contrôles
d’hôte, les notifications d’hôte, et les gestionnaires d’événement
d’hôte. Les définitions de commande peuvent contenir des macros, mais
vous devez vous assurer de n’utiliser que des macros “valides” dans le
contexte de la commande. Vous trouverez plus d’informations sur les
macros disponibles et leur domaine de validité dans la doc Nagios. Les
différents arguments d’une définition de commande sont détaillés
ci-dessous.

Définition du Format:

Note: les directives requises sont en rouge, et les optionnelles en
noir.

define command{

command\_name

*command\_name*

command\_line

*command\_line*

}

Exemple de définition

~~~~ {.code}
define command{
    command_name    check_pop
    command_line    /usr/local/nagios/libexec/check_pop -H $HOSTADDRESS$    
    }
~~~~

Descriptions des directives

  -------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **command\_name**:   Cette directive définit le *nom court* identifiant la commande. Il est utilisé dans les définitions de [contact](objects-reference.html#contact "nagios:objects-reference ↵"), d’[hôte](objects-reference.html#host "nagios:objects-reference ↵"), et de [service](objects-reference.html#service "nagios:objects-reference ↵"), entre autres.
  **command\_line**:   Cette directive définit ce qu’exécute Nagios lorsque la commande est utilisée pour un contrôle de service ou d’hôte, pour une notification, ou pour un gestionnaire d’événement. Avant que la ligne de commande ne soit exécutée, toutes les macros valides sont remplacées par leur valeur. Référez-vous à la documentation sur les macros pour savoir quand elles sont valides. Notez que la ligne de commande *n’est pas* entourée de guillemets. De plus, si vous désirez passer le signe (\$) sur la ligne de commande, il faudra “l’échapper” avec un autre \$.Si vous souhaitez passer des arguments à la commande à la volée, vous pouvez utiliser la macro **\$ARGn\$** dans la directive *command\_line* de la définition de la commande et séparer les éléments individuels du nom de la commande (et de chaque autre élément) en utilisant le caractère ! dans les directives faisant référence à des commandes (host check command, service event handler command, etc). Plus d’informations sur comment passer des arguments à des commandes à la volée peuvent être trouvées dans la documentation à la page des macros.
  -------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

servicedependency {#servicedependency .sectionedit32}
-----------------

Description:

Les définitions de dépendances du service sont une fonctionnalité
avancée de Nagios qui permet de supprimer des notifications et des
contrôles actifs, à partir de l’état d’un ou plusieurs services. Elles
sont optionnelles et sont principalement destinées aux utilisateurs
avertis qui ont des configurations de supervision complexes. Pour plus
d’informations sur le fonctionnement des dépendances de service (Il est
important de le lire !) lisez la docs Nagios.

Définition du Format:

Note: les directives requises sont en rouge, et les optionnelles en
noir. Cependant, pour celles-ci, vous devez fournir au minimum un type
de critères à utiliser.

define servicedependency{

dependent\_host\_name

*host\_name*

dependent\_service\_description

*service\_description*

host\_name

*host\_name*

service\_description

*service\_description*

execution\_failure\_criteria

[o,w,u,c,n]

notification\_failure\_criteria

[o,w,u,c,n]

}

Exemple de définition

~~~~ {.code}
define servicedependency{
    host_name           WWW1
    service_description     Apache Web Server
    dependent_host_name     WWW1
    dependent_service_description   Main Web Site
    execution_failure_criteria  n
    notification_failure_criteria   w,u,c
    }
~~~~

Descriptions des directives

  -------------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **dependent\_host**:                   Cette directive définit le*nom court* de l’[hôte](objects-reference.html#host "nagios:objects-reference ↵") sur lequel le service *dépendant* tourne ou qui lui est associé.
  **dependent\_service\_description**:   Cette directive définit la *description* du [service](objects-reference.html#service "nagios:objects-reference ↵") *dépendant*.
  **host\_name**:                        Cette directive définit le *nom court* de l’[hôte](objects-reference.html#host "nagios:objects-reference ↵") sur lequel le service *dont nous dépendons* tourne ou qui lui est associé.
  **service\_description**:              cette directive définit la *description* du [service](objects-reference.html#service "nagios:objects-reference ↵") *dont nous dépendons*.
  **execution\_failure\_criteria**:      Ces directives définissent les situations dans lesquelles le service dépendant *ne doit pas*être exécuter. Si le service *dont nous dépendons* est dans un des états d’erreur spécifié, le service *dépendant* ne sera pas exécuté. Les valeurs valides sont les combinaisons de un ou plusieurs de ces états (les options multiples sont séparées par des virgules): **o** = non exécuté si état OK, **w** = non exécuté si état WARNING , **u** = non exécuté si état UNKNOWN, et **c** = non exécuté si état CRITICAL. Si vous spécifiez **n** (aucun) comme option, la dépendance d’exécution n’échouera jamais et le contrôle du service dépendant aura toujours lieu. Par exemple, si vous spécifiez **o,c,u** dans cette variable, la dépendance est en erreur si le service *dont nous dépendons* est dans un des états OK, CRITICAL, ou UNKNOWN et que le service *dépendant* n’est pas en exécution.
  **notification\_failure\_criteria**:   Ces directives définissent les situations dans lesquelles les notifications pour le service dépendant *ne doivent pas*être envoyées. Si le service *dont nous dépendons* est dans l’un des états d’erreur spécifiés, les notifications pour le service *dépendant* ne seront pas envoyées aux contacts. Les valeurs valides sont les combinaisons de un ou plusieurs de ces états : **o** = non exécuté si état OK, **w** = non exécuté si état WARNING , **u** = non exécuté si état UNKNOWN, et **c** = non exécuté si état CRITICAL. Si vous spécifiez **n** (aucun) comme option, la dépendance de notification n’échoue jamais et les notifications pour le service dépendant seront toujours envoyées. Par exemple, si vous spécifiez **w** dans ce champ, la dépendance est en erreur si le service *dont nous dépendons* est dans l’état WARNING et les notifications pour le service *dépendant* ne seront pas envoyées.
  -------------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

serviceescalation {#serviceescalation .sectionedit35}
-----------------

Description:

Une définition d’escalade pour un service est *complètement optionnelle*
et est utilisée pour escalader les notifications liées à un service
particulier. Vous trouverez plus d’informations sur le fonctionnement de
l’escalade dans la doc Nagios.

Définition du Format:

Note: les directives requises sont en rouge, et les optionnelles en
noir.

define serviceescalation{

host\_name

*host\_name*

service\_description

*service\_description*

contact\_groups

*contactgroup\_name*

first\_notification

\#

last\_notification

\#

notification\_interval

\#

escalation\_period

timeperiod\_name

escalation\_options

[w,u,c,r]

}

Exemple de définition

~~~~ {.code}
define serviceescalation{
    host_name       nt-3
    service_description Processor Load
    first_notification  4
    last_notification   0
    notification_interval   30
    contact_groups      all-nt-admins,themanagers
    }
~~~~

Descriptions des directives

  ----------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **host\_name**:               Cette directive définit le *nom court* de l’[hôte](objects-reference.html#host "nagios:objects-reference ↵") sur lequel le service auquel l’escalade doit s’appliquer est associé.
  **service\_description**:     Cette directive définit une description du [service](objects-reference.html#service "nagios:objects-reference ↵") auquel l’escalade doit s’appliquer.
  **first\_notification**:      Cette directive définit un nombre qui désigne la *première* notification à partir de laquelle cette escalade est effective. Par exemple, si vous mettez cette valeur à 3, cette escalade ne sera lancée que lorsque le service sera dans un état différent de OK depuis trois notifications.
  **last\_notification**:       C’est le nombre qui désigne la *dernière* notification avant que cette escalade ne soit plus effective. Par exemple, si vous mettez une valeur de 5, cette escalade ne sera pas utilisée si plus de cinq notifications ont été envoyées pour le service spécifié. Donner une valeur de 0 revient à utiliser éternellement cette escalade (sans tenir compte du nombre de notifications émises).
  **contact\_groups**:          Cette directive définit une liste de *noms courts* de [groupes de contacts](objects-reference.html#contactgroup "nagios:objects-reference ↵") à notifier quand une escalade a lieu pour ce service. Les groupes de contacts doivent être séparés par des virgules.
  **notification\_interval**:   Cette directive définit l’intervalle auquel les notifications doivent être faites tant que cette escalade est valide. Si vous donnez une valeur de 0 à cet intervalle, Nagios enverra la première notification lorsque cette définition d’escalade est valide, mais arrêtera ensuite toute émission de notifications pour l’hôte. Les notifications ne sont plus envoyées jusqu’à ce que le service se rétablisse. Ceci est utile si vous ne voulez plus de notifications après un certain temps. Note : si, pour un même service, plusieurs définitions d’escalade ont des plages de notifications qui se chevauchent, c’est l’intervalle de notification le plus petit qui est retenu.
  **escalation\_period**:       Cette directive est utilisée pour spécifier le *nom court* de la [période](objects-reference.html#timeperiod "nagios:objects-reference ↵") durant laquelle l’escalade est valide. Si cette directive n’est pas spécifiée, l’escalade sera considérée tout le temps comme valide.
  **escalation\_options**:      Cette directive est utilisée pour définir le critère qui détermine quand l’escalade de service est utilisée. L’escalade est utilisée uniquement si le service est dans un des états spécifiés par cette directive. Si cette directive n’est pas spécifiée, l’escalade sera considérée comme valide pour n’importe quel état. Les options valides sont une combinaison d’une ou de plusieurs options qui suivent : **r** = escalade pour un état UP, **w** = escalade pour un état WARNING, **u** = escalade pour un état UNKNOWN, et **c** = escalade pour un état CRITICAL. Exemple : Si vous spécifiez **w** dans ce champ, l’escalade sera uniquement utilisée lorsque le service se trouvera dans un état WARNING.
  ----------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

hostdependency {#hostdependency .sectionedit38}
--------------

Description:

Les définitions de dépendances d’hôte sont une fonctionnalité avancée de
Nagios qui permet de supprimer des notifications et des contrôles
actifs, à partir de l’état d’un ou plusieurs hôtes. Elles sont
optionnelles et sont principalement destinées aux utilisateurs avertis
qui ont des configurations de supervision complexes. Pour plus
d’informations sur le fonctionnement des dépendances de service, lisez
la doc Nagios.

Définition du Format:

Note: les directives requises sont en rouge, et les optionnelles en
noir.

define hostdependency{

dependent\_host\_name

*host\_name*

host\_name

*host\_name*

inherits\_parent

[0/1]

execution\_failure\_criteria

[o,d,u,p,n]

notification\_failure\_criteria

[o,d,u,p,n]

}

Exemple de définition

~~~~ {.code}
define hostdependency{
    host_name           WWW1
    dependent_host_name     DBASE1
    notification_failure_criteria   d,u
    }
~~~~

Descriptions des directives

  -------------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **dependent\_host**:                   Cette directive définit le *nom court* de l’hôte dépendant.
  **host\_name**:                        Cette directive définit le *nom court* de l’hôte dont *il y a dépendance*(Appelé également hôte maître)*.*
  **inherits\_parent**:                  Cette directive indique si la dépendance hérite des dépendances de l’hôte *dont il dépend lui même* (aussi appelé l’hôte maître). En d’autres mots si l’hôte maître est dépendant d’un autre hôte et que cette dépendance échoue alors cette dépendance aussi échouera.
  **execution\_failure\_criteria**:      Ces directives définissent les situations dans lesquelles le service dépendant *ne doit pas*être exécuté. Si l’hôte *maître* est dans un des états d’erreur spécifié, l’hôte *dépendant* ne sera pas contrôlé activement. Les valeurs valides sont les combinaisons de un ou plusieurs de ces états (les options multiples sont séparées par des virgules): **o** = pas de contrôle si l’état est UP, **d** = pas de contrôle si l’état est DOWN, **u** = pas de contrôle si l’état est UNREACHABLE, **p** = pas de contrôle si l’état n’est pas déterminé (typiquement lorsque l’hôte n’a pas encore été contrôlé). Si vous spécifiez **n** (none) comme option, les dépendances d’hôtes seront toujours contrôlées activement (si les autres options le permettent). Par exemple : si vous spécifier **u,d** dans ce champs, les hôtes *dépendants* ne seront contrôlés activement uniquement si l’hôte *maître* est dans un état UNREACHABLE ou DOWN. **n** (aucun) comme option, la dépendance d’exécution n’échouera jamais et le contrôle du service dépendant aura toujours lieu. Par exemple, si vous spécifiez **o,c,u** dans cette variable, la dépendance est en erreur si le service *dont nous dépendons* est dans un des états OK, CRITICAL, ou UNKNOWN et que le service *dépendant* n’est pas en exécution.
  **notification\_failure\_criteria**:   Cette directive définit les conditions pour lesquelles les notifications pour l’hôte dépendant *ne seront pas* envoyées. Les options valides sont une combinaison d’un ou plusieurs des critères suivants: **o** = n’est pas envoyée sur un état UP, **d** = n’est pas envoyé sur un état DOWN, et **u** = n’est pas envoyée sur un état UNREACHABLE. Si vous spécifiez **n** (aucun) comme option, la dépendance de notification n’échouera jamais et les notifications seront toujours envoyées. Exemple, si vous spécifiez **d** dans ce champ, les notifications pour cet hôte ne seront pas envoyées si l’hôte dont nous dépendons est dans un état DOWN.
  -------------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

hostescalation {#hostescalation .sectionedit41}
--------------

Description:

Une définition d’escalade pour un hôte est *complètement optionnelle* et
est utilisée pour escalader les notifications liées à un hôte
particulier. Vous trouverez plus d’informations sur le fonctionnement de
l’escalade dans la doc Nagios.

Définition du Format:

Note: les directives requises sont en rouge, et les optionnelles en
noir.

define hostescalation{

host\_name

*host\_name*

hostgroup\_name

*hostgroup\_name*

contact\_groups

*contactgroup\_name*

first\_notification

\#

last\_notification

\#

notification\_interval

\#

escalation\_period

timeperiod\_name

escalation\_options

[d,u,r]

}

Exemple de définition

~~~~ {.code}
define hostescalation{
    host_name       router-34
    first_notification  5
    last_notification   8
    notification_interval   60
    contact_groups      all-router-admins
    }
~~~~

Descriptions des directives

  ----------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **host\_name**:               Cette directive définit le *nom court* de l’[hôte](objects-reference.html#host "nagios:objects-reference ↵") auquel l’escalade s’appliquera.
  **hostgroup\_name**:          Cette directive est utilisée pour identifier le *nom court* du/des [groupe(s) d'hôtes](objects-reference.html#hostgroup "nagios:objects-reference ↵") sur lequel l’escalade sera appliquée. Les multiples groupes d’hôtes sont séparés par des virgules. Si cette directive est utilisée, l’escalade sera appliquée à tous les hôtes membres des groupes d’hôtes spécifiés.
  **first\_notification**:      C’est un nombre qui désigne la *première* notification à partir de laquelle cette escalade est effective. Par exemple, si vous mettez cette valeur à 3, cette escalade ne sera lancée que lorsque l’hôte sera dans un état différent de UP depuis trois notifications.
  **last\_notification**:       Cette directive définit le nombre qui désigne la *dernière* notification avant que cette escalade ne soit plus effective. Par exemple, si vous mettez une valeur de 5, cette escalade ne sera pas utilisée si plus de cinq notifications ont été envoyées pour le service spécifié. Donner une valeur de 0 revient à utiliser éternellement cette escalade (sans tenir compte du nombre de notifications émises).
  **contact\_groups**:          Cette directive définit une liste de *noms courts* de [groupes de contacts](objects-reference.html#contactgroup "nagios:objects-reference ↵") à notifier quand une escalade a lieu pour cet hôte. Les groupes de contacts doivent être séparés par des virgules.
  **notification\_interval**:   Cette directive définit l’Intervalle auquel les notifications doivent être faites quand cette escalade s’applique. Si vous donnez une valeur de 0 à cet intervalle, Nagios enverra la première notification lorsque cette définition d’escalade est valide, mais arrêtera ensuite toute émission de notifications pour l’hôte. Les notifications ne sont plus envoyées jusqu’à ce que l’hôte se rétablisse. Ceci est utile si vous ne voulez plus de notifications après un certain temps. Note : si pour un même hôte, plusieurs définitions d’escalade ont des plages de notifications qui se chevauchent, c’est l’intervalle de notification le plus petit qui est retenu.
  **escalation\_period**:       Cette directive est utilisée pour spécifier le *nom court* de la [période](objects-reference.html#timeperiod "nagios:objects-reference ↵") durant laquelle l’escalade est valide. Si cette directive n’est pas spécifiée, l’escalade est tout le temps considérée comme valide.
  **escalation\_options**:      Cette directive est utilisée pour définir le critère qui détermine quand l’escalade est utilisée. L’escalade est utilisée uniquement lorsque l’hôte se trouve dans un des états spécifiés dans la directive. Si la directive n’est pas spécifiée, l’escalade sera considérée valide pour tous les états. Les options valides sont une combinaison d’un ou plusieurs critères suivants : **r** = escalade pour un état UP, **d** = escalade pour un état DOWN et **u** = escalade pour un état UNREACHABLE. Exemple : si vous spécifiez **d** dans ce champ, l’escalade sera uniquement utilisée si l’hôte est dans l’état DOWN.
  ----------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

hostextinfo {#hostextinfo .sectionedit44}
-----------

Description:

Les informations complémentaires d’hôtes sont utilisées principalement
pour que l’image générée par les CGI‘s d’état, de cartographie d’états,
de monde des états, et d’informations complémentaires soit jolie. Elles
n’ont aucun effet sur la surveillance et sont totalement optionnelles.

Définition du Format:

Note: les variables requises sont en rouge, les variables optionnelles
sont en noir. Cependant, vous devez fournir au moins une variable
optionnelle dans chaque définition pour que celle-ci soit d’une utilité
quelconque.

define hostextinfo{

host\_name

*host\_name*

notes

*note\_string*

notes\_url

*url*

action\_url

*url*

icon\_image

*image\_file*

icon\_image\_alt

*alt\_string*

vrml\_image

*image\_file*

statusmap\_image

*image\_file*

2d\_coords

*x\_coord,y\_coord*

3d\_coords

*x\_coord,y\_coord,z\_coord*

}

Exemple de Definition:

~~~~ {.code}
define hostextinfo{
    host_name   netware1
        notes       This is the primary Netware file server
    notes_url   http://webserver.localhost.localdomain/hostinfo.pl?host=netware1
    icon_image  novell40.png 
    icon_image_alt  IntranetWare 4.11
    vrml_image  novell40.png
    statusmap_image novell40.gd2
    2d_coords   100,250
    3d_coords   100.0,50.0,75.0
    }
~~~~

Descriptions des Variables:

  ----------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **host\_name**:         Cette variable est utilisée pour identifier le *nom court* de l’hôte associé aux informations étendues.
  **notes**:              Cette directive est utilisée pour définir une note appartenant à l’hôte. Si vous spécifiez une note ici, vous pourrez la voir dans le CGI d’informations complémentaires (lorsque vous regardez les informations de l’hôte concerné).
  **notes\_url**:         Cette variable définit une URL optionnelle qui peut être utilisée pour fournir plus d’informations sur l’hôte. Si vous spécifiez une URL, vous verrez un lien “Notes About This Host” dans les CGI d’informations complémentaires (quand vous regarderez les informations à propose de cet hôte). N’importe quel URL valide put être employée. Si vous désirez utiliser des chemins relatifs, la racine sera la même que celle utilisée pour les CGIs (c.a.d */cgi-bin/nagios*/). Ceci peut être très utile si vous voulez donner des informations détaillées sur l’hôte, telles que les contacts en cas d’urgence, etc.. aux autres membres des équipes de support.
  **action\_url**:        Cette directive est utilisée pour définir une URL optionnelle qui peut être utilisée pour fournir plus d’actions à exécuter sur l’hôte. Si vous spécifiée une URL, vous verrez un lien dans les CGI d’informations complémentaires (quand vous regarderez les informations à propose de cet hôte). Si vous désirez utiliser des chemins relatifs, la racine sera la même que celle utilisée pour les CGIs (c.a.d */cgi-bin/nagios*/).
  **icon\_image**:        Cette variable définit le nom d’une image GIF, PNG, ou JPG qui sera associée avec cet hôte. Elle sera affichée dans les CGIs d’état et d’informations complémentaires. Pour un aspect correct, choisissez une taille de 40×40 pixels. les images des hôtes sont supposées être dans le sous-répertoire **logos/** de votre répertoire images HTML (c.a.d */usr/local/nagios/share/images/logos*).
  **icon\_image\_alt**:   Cette variable définit une chaine optionnelle qui est utilisée par l’étiquette ALT de l’image spécifiée par l’argument *\<icon\_image\>* . L’étiquette ALT est utilisée à la fois dans le CGI d’état et celui de la cartographie des états.
  **vrml\_image**:        Cette variable définit le nom d’une image GIF, PNG, ou JPG qui sera associée à cet hôte. Cette image sera utilisée comme texture pour l’hôte spécifié, dans le CGI du monde des états. Contrairement à l’image utilisée pour la variable *\<icon\_image\>*, celle-ci ne doit *pas* être transparente, sinon, l’objet représenté sera un peu étrange/bizarre. Les images pour ces hôtes sont supposées être dans le sous-répertoire **logos/** du répertoire des images HTML (c.a.d */usr/local/nagios/share/images/logos*).
  **statusmap\_image**:   Cette variable définit le nom d’une image au format GD2 qui sera associée à cet hôte. Elle sera affichée dans l’image crée par le CGI de cartographie des états. Vous pouvez spécifier une image JPEG, PNG, ou GIF cependant I suggère fortement d’utiliser une image au format GD2 qui gâchera moins de temps CPU lors de la génération de la cartographie des états. Les images GD2 peuvent être crées en utilisant le programme **pngtogd2** fournie via la [librairie gd](http://www.boutell.com/gd/ "http://www.boutell.com/gd/") de Thomas Boutell’s . Elles doivent être crées en format non compressé pour minimiser la charge CPU, quand le CGI génère l’image de la carte du réseau. Pour un aspect correct, choisissez une taille de 40×40 pixels. Vous pouvez laisser cette option vide si vous n’utilisez pas le CGI d’état. Les images sont supposées être dans le sous-répertoire **logos/** du répertoire des images HTML (c.a.d */usr/local/nagios/share/images/logos*).
  **2d\_coords**:         Cette variable définit les coordonnées à utiliser pour le dessin de l’hôte dans le CGI de cartographie des états. Elles doivent être des entiers positifs et correspondre aux pixels physiques de l’image générée. L’origine du dessin (0,0) est dans le coin supérieur gauche de l’écran et s’étend sur des coordonnées en x positives vers la droite en haut de l’image et sur des coordonnées en y positives le long du coté gauche vers le bas de l’image. Pour référence, notez que les icônes dessinées ont une taille d’environ 40×40 pixels (le texte prend un peu d’espace). Les coordonnées choisies désignent le coin supérieur gauche de l’icône de l’hôte. Note : ne vous inquiétez pas des coordonnées maximum en x et y que vous pouvez utiliser. Le CGI va calculer automatiquement les dimensions de l’image, à partir des plus grandes valeurs de x et y que vous aurez spécifiées.
  **3d\_coords**:         Cette variable définit les coordonnées à utiliser pour le dessin d’un hôte dans le CGI du monde des états. L’origine du dessin est (0.0,0.0,0.0). Pour référence, la taille des cubes représentant les hôtes est d’environ 0,5 unités par coté (le texte prend un peu de place). Les coordonnées que vous avez spécifiées pointent sur le centre du cube.
  ----------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

serviceextinfo {#serviceextinfo .sectionedit47}
--------------

Description:

Les informations complémentaires d’hôtes sont utilisées principalement
pour que l’image générée par les CGI d’état et d’informations
complémentaires soit jolie. Elles n’ont aucun effet sur la surveillance
et sont totalement optionnelles.

Format de Définition:

Note: les variables requises sont en rouge, les variables optionnelles
sont en noir. Cependant, vous devez fournir au moins une variable
optionnelle dans chaque définition pour que celle-ci soit d’une utilité
quelconque.

define serviceextinfo{

host\_name

*host\_name*

service\_description

*service\_description*

notes

*note\_string*

notes\_url

*url*

action\_url

*url*

icon\_image

*image\_file*

icon\_image\_alt

*alt\_string*

}

Exemple Définition:

~~~~ {.code}
define serviceextinfo{
    host_name       linux2
    service_description Log Anomalies
    notes           Security-related log anomalies on secondary Linux server
    notes_url       http://webserver.localhost.localdomain/serviceinfo.pl?host=linux2&service=Log+Anomalies
    icon_image      security.png 
    icon_image_alt      Security-Related Alerts
    }
~~~~

Descriptions des Variables:

  --------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **host\_name**:             Cette variable définit le *nom court* de l’hôte associé avec le service.
  **service\_description**:   Cette directive est la description du service associé aux informations étendues.
  **notes**:                  Cette directive est utilisée pour définir une note appartenant au service. Si vous spécifiez une note ici, vous pourrez la voir dans le CGI d’informations complémentaires (lorsque vous regardez les informations du service concerné).
  **notes\_url**:             Cette variable définit une URL optionnelle qui peut être utilisée pour fournir plus d’informations sur ce service. Si vous spécifiez une URL, vous verrez un lien “Notes About This Service” dans le CGI des informations complémentaires. (quand vous regarderez les informations de ce service). N’importe quelle URL valide peut être employée. si vous utilisez des chemins relatifs, la racine sera la même que celle utilisée pour accéder les CGIs (c.a.d */cgi-bin/nagios*/). Ceci peut être très utile pour mettre à disposition des informations détaillées sur le service, sur les contacts en cas d’urgence, etc. à disposition des autres membres de l’équipe.
  **action\_url**:            Cette directive est utilisée pour définir une URL optionnelle qui peut être utilisée pour fournir plus d’actions à exécuter sur le service. Si vous spécifiée une URL, vous verrez un lien dans les CGI d’informations complémentaires (quand vous regarderez les informations à propose de cet hôte). Si vous désirez utiliser des chemins relatifs, la racine sera la même que celle utilisée pour les CGIs (c.a.d */cgi-bin/nagios*/).
  **icon\_image**:            Cette variable définit le nom d’une image GIF, PNG, ou JPG associée à ce service. Elle sera utilisée par les CGI d’état et d’informations complémentaires. Pour un aspect correct, choisissez une image de taille 40×40 pixels. Les images des hôtes sont supposées être dans le sous-répertoire **logos/** du répertoire des images HTML (c.a.d */usr/local/nagios/share/images/logos*).
  **icon\_image\_alt**:       Une chaîne optionnelle utilisée par l’étiquette ALT de l’image définie par l’argument *\<icon\_image\>*. Cette étiquette est utilisée par les CGIs d’état, d’informations complémentaires et de cartographie des états.
  --------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

^[1)](objects-reference.html#fnt__1)^ Fully Qualified Domain Name, nom
de domaine complet

SOMMAIRE {#sommaire .sectionedit1}
--------

**[Accueil](../start.html "start")**

**[Supervision](../supervision/start.html "supervision:start")**

-   [Nagios](start.html "nagios:start")
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

**[Infrastructure](../infra/start.html "infra:start")**

**[Développement](../dev/start.html "dev:start")**

Nagios {#nagios .sectionedit1}
------

-   [Arborescence des
    fichiers](installation-layout.html "nagios:installation-layout")
-   [Commandes de remontée de
    contrôle](ocsp-ochp.html "nagios:ocsp-ochp")
-   [Données Nagios dans un ramdisk](ramdisk.html "nagios:ramdisk")
-   [Event Handlers](event_handlers.html "nagios:event_handlers")
-   [Gabarits d'objets de
    configuration](templates.html "nagios:templates")
-   [Installation Nagios 2 & 3 sur Ubuntu 6.0.6, 8.0.4 et 10.0.4
    LTS](ubuntu-install.html "nagios:ubuntu-install")
-   [Installation Nagios 3 sur Debian Squeeze
    6.0.3](debian-install.html "nagios:debian-install")
-   [Installation de Nagios 3.x sur CentOS
    5.3](nagios-centos-install.html "nagios:nagios-centos-install")
-   [Introduction aux objets de
    configuration](configobjects.html "nagios:configobjects")
-   [Introduction à
    Nagios](nagios-introduction.html "nagios:nagios-introduction")
-   [Liens Nagios](links.html "nagios:links")
-   [Mise en place complète de Nagios sur RHEL
    5.4](mise-en-place-complete-nagios-sur-rhel-5.4/start.html "nagios:mise-en-place-complete-nagios-sur-rhel-5.4:start")
-   [NAGIOS - Guide de démarrage pour
    débutant](nagios-debutant/start.html "nagios:nagios-debutant:start")
-   [Nagios Addons](addons/start.html "nagios:addons:start")
-   [Nagios
    Integration](integration/start.html "nagios:integration:start")
-   [Nagios Plugins](plugins/start.html "nagios:plugins:start")
-   [Nagios et les
    notifications](notifications.html "nagios:notifications")
-   [Outils de supervision d'un hôte
    Windows](windows-client.html "nagios:windows-client")
-   [Référence des objets de
    configuration](objects-reference.html "nagios:objects-reference")
-   [Superviser un hôte Windows avec
    NSClient++](nagios-nsclient-host.html "nagios:nagios-nsclient-host")
-   [Supervision Windows en mode
    passif](supervision-windows-passif.html "nagios:supervision-windows-passif")
-   [Supervision vmware esx](vmware_esx.html "nagios:vmware_esx")
-   [check-list de diagnostic](debug.html "nagios:debug")

-   [Afficher le texte
    source](objects-reference@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](objects-reference@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](objects-reference@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](objects-reference@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](objects-reference@do=media.html "Gestionnaire de médias")
-   [Index](objects-reference@do=index.html "Index [X]")
-   [Connexion](objects-reference@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de
    page](objects-reference.html#dokuwiki__top "Haut de page [T]")

nagios/objects-reference.txt · Dernière modification: 2013/03/29 09:39
(modification externe)

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

![](../lib/exe/indexer.php@id=nagios%253Aobjects-reference&1424859522)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
