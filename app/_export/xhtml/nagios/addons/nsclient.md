---
layout: page
---

### Table des matières {.toggle}

-   [NSClient++](nsclient.html#nsclient)
    -   [NSClient++ en mode
        nsclient](nsclient.html#nsclient-en-mode-nsclient)
        -   [Contrôle de l’espace disque restant sur
            C](nsclient.html#controle-de-l-espace-disque-restant-sur-c)
        -   [Contrôle de la mémoire
            utilisée](nsclient.html#controle-de-la-memoire-utilisee)
        -   [Contrôle de la durée écoulée depuis le dernier démarrage de
            la
            machine](nsclient.html#controle-de-la-duree-ecoulee-depuis-le-dernier-demarrage-de-la-machine)
        -   [Contrôle de la charge
            machine](nsclient.html#controle-de-la-charge-machine)
        -   [Contrôle de l’état de
            services](nsclient.html#controle-de-l-etat-de-services)
    -   [NSClient++ en mode NRPE](nsclient.html#nsclient-en-mode-nrpe)
        -   [Contrôle de la charge
            système](nsclient.html#controle-de-la-charge-systeme)
        -   [Contrôle de l’espace libre sur le disque
            dur](nsclient.html#controle-de-l-espace-libre-sur-le-disque-dur)
        -   [Contrôle de la
            mémoire](nsclient.html#controle-de-la-memoire)
        -   [Contrôle de l’état des
            services](nsclient.html#controle-de-l-etat-des-services)
    -   [NSClient++ en mode NSCA](nsclient.html#nsclient-en-mode-nsca)

NSClient++ {#nsclient .sectionedit1}
==========

[![](../../../../assets/media/addons/nswide.png)](../../../../_detail/addons/nswide.png@id=nagios%253Aaddons%253Ansclient.html "addons:nswide.png")[NSClient++](http://nsclient.org/nscp/ "http://nsclient.org/nscp/")
est un service pour toutes versions de Windows (NT, 2000, 2003, XP et
Vista) qui combine les fonctionnalités d’un agent de supervision dédié à
l’environnement Windows ainsi que les fonctions de transport
[NRPE](../../../../nagios/addons/nrpe.html "nagios:addons:nrpe") et
[NSCA](../../../../nagios/addons/nsca.html "nagios:addons:nsca") pour
cet environnement. Il est disponible en version 32 et 64 bits. Du fait
de ces triples fonctions, le fichier de configuration de NSClient++ est
assez long mais également assez simple. Il est aujourd’hui considéré
comme l’agent de supervision standard Nagios pour plateformes Windows.

L’installation de NSClient++ ne pose pas de problème grâce au format
d’installation .msi fourni. Il suffit de valider par le bouton next
chacun des écrans présentés. Le logiciel est installé par défaut dans le
répertoire C:\\Program Files\\NSClient++. Il contient le fichier
exécutable de service nsclient++, le répertoire modules contenant les
extensions de NSClient++ et le fichier de configuration NSC.ini. Une
entrée dans le menu Démarrer est également créée, permettant de stopper
et démarrer le service. Pour voir les compteurs disponibles sur l’hôte
supervisé, il est possible d’utiliser la commande suivante dans une
fenêtre DOS.

~~~
NSClient++ CheckSystem listpdh
~~~

Il faut impérativement modifier le fichier de configuration fourni pour
que NSClient++ puisse fonctionner. Le fichier est fourni entièrement
commenté. Il est constitué d’une section générale et de sections
spécifiques à chaque mode de fonctionnement de NSClient++.

~~~
[modules]
FileLogger.dll
CheckSystem.dll
CheckDisk.dll
NSClientListener.dll
NRPEListener.dll
SysTray.dll
CheckEventLog.dll
CheckHelpers.dll
CheckWMI.dll
NSCAAgent.dll
LUAScript.dll
CheckExternalScripts.dll
NRPEClient.dll
~~~

Ce premier bloc de configuration permet d’activer et de désactiver les
modules/extensions de NSClient++. Il faut bien sûr en activer au minimum
quelques uns pour pouvoir interroger la machine.

-   **FileLogger**: permet de journaliser les événements NSClient++ ; il
    est conseillé de l’activer,
-   **CheckSystem**: permet les contrôles de CPU, RAM et charge,
-   **CheckDisk**: permet les contrôles d’espace libre sur les disques
    durs,
-   **NSClientListener**: permet le mode de fonctionnement nsclient,
-   **NRPEListener**: permet le mode de fonctionnement NRPE,
-   **SysTray**: est un extension à la barre des tâches Windows qui
    permet de stopper, démarrer le service directement depuis celle-ci,
-   **CheckEventLog**: permet l’interrogation des fichiers journaux
    Windows,
-   **CheckHelpers**: ne produit aucun contrôle par lui-même mais permet
    de manipuler les sorties des autres de plusieurs façons,
-   **CheckWMI**: permet les interrogations de type WMI,
-   **NSCAAgent**: permet le mode fonctionnement NSCA,
-   **LUAScript**: permet d’exécuter des scripts en langage Lua
    ([http://www.lua.org/](http://www.lua.org/ "http://www.lua.org/")),
-   **CheckExternalScripts**: permet d’exécuter toutes sortes de scripts
    externes,
-   **NRPEClient**: permet un mode de fonctionnement proxy NRPE.

~~~
[Settings]
obfuscated_password=Jw0KAUUdXlAAUwASDAAB
password=secret-password
allowed_hosts=127.0.0.1/32,192.168.44.0/24,10.1.2.25
use_file=1
[log]
debug=1
file=NSC.log
date_mask=%Y-%m-%d %H:%M:%S
~~~

Ces deux nouveaux blocs de configuration contiennent les directives de
fonctionnement général de NSClient++. Celles-ci sont faciles à
comprendre. Deux directives pour un mot de passe qui devra être fourni à
chaque interrogation distante de la machine, l’une en clair et l’autre
masquée.

-   **allowed\_hosts**: contient la liste séparée par des virgules des
    hôtes ou sous-réseaux autorisés à se connecter sur la machine.
-   **use\_file**: indique si il faut utiliser le fichier de
    configuration ou plutôt des règles stockées dans le registre de
    Windows.
-   **debug**: permet de préciser si NSClient++ doit journaliser un
    maximum d’informations.
-   **file**: le nom et éventuellement le chemin d’accès du fichier
    journal.
-   **date\_mask**: est le format de date à utiliser dans ce journal.

NSClient++ en mode nsclient {#nsclient-en-mode-nsclient .sectionedit2}
---------------------------

Le premier mode de fonctionnement de NSClient++ est un mode
compatibilité destiné à honorer les développements faits sur cette
plateforme dans le temps. Il existait, à l’époque où Nagios s’appellait
encore NetSaint, un agent dédié Window nsclient interrogeable via le
plugin standard check\_nt. Ce mode possède son bloc de configuration
distinct dans le fichier de configuration.

~~~
[NSClient]
allowed_hosts=
port=12489
bind_to_address=
socket_timeout=30
~~~

-   **allowed\_hosts**: est la même directive que celle trouvée dans la
    section Settings. Il est possible de préciser de nouvelles adresses
    ou de laisser la directive vide pour utiliser la liste déclarée dans
    la section Settings.
-   **port**: indique le port d’écoute entrant du mode nsclient fixé par
    NSClient++ à 12489. Dans la version historique de nsclient, ce port
    d’écoute était le 1248 par défaut.
-   **bind\_to\_address**: permet de n’écouter que sur une interface
    réseau dans le cas où la machine en possède plusieurs. Il faut
    laisser cette directive vide pour écouter sur toutes les interfaces
    réseau de la machine.
-   **socket\_timeout**: est le temps maximum autorisé pour une
    interrogation avant de couper la connexion.

À ce stade, le fichier de configuration est suffisamment renseigné pour
fonctionner en mode nsclient. Depuis le serveur Nagios, il faut utiliser
le plugin standard check\_nt pour interroger le démon distant NSCLient++
en mode nsclient. Ce plugin possède de nombreuses options.

 -H, –hostname=HOST
:   Nom ou adresse IP de l’hôte à interroger.
 -p, –port=INTEGER
:   Port de connexion (défaut
:   1248). Du fait que c’est NSClient++ qui est le démon distant, cette
    option est à préciser systématiquement avec la valeur 12489. Si vous
    conservez sa valeur par défaut.
 -s \<password\>
:   Mot de passe nécessaire à la connexion.
 -w, –warning=INTEGER
:   Seuil d’avertissement.
 -c, –critical=INTEGER
:   Seuil critique.
 -v, –variable=STRING
:   Variable à interroger. Les variables possibles sont les suivantes :
 CLIENTVERSION
:   retourne la version de l’agent nsclient. Renvoie un état
    d’avertissement si cette valeur diffère de celle précisée avec
    l’option -l \<version\>.
 CPULOAD
:   charge moyenne système durant les x dernières minutes. Requiert le
    paramètre l avec la syntaxe suivante
:   -l \<intervalle minutes\>,\<seuil d’avertissement\>,\<seuil
    critique\>. \<intervall minutes\> doit être inférieur à 24\*60. Les
    seuils sont exprimés en pourcentage et jusqu’à dix requêtes peuvent
    être faites en un seul passage. Exemple
:   l 60,90,95,120,90,95
 UPTIME
:   Durée écoulée depuis le dernier démarrage de la machine.
 USEDDISKSPACE
:   Taille totale et pourcentage de disque dur utilisé. Requiert un
    paramètre l contenant la lettre du lecteur à interroger. Il est
    possible de passer des seuils avec les options -w et -c.
 MEMUSE
:   Mémoire utilisée. Il est possible de passer des seuils avec les
    options -w et -c.
 SERVICESTATE
:   Vérifier l’état (démarré ou arrêté) d’un ou de plusieurs services
    Windows. Requiert un paramètre l avec la syntaxe suivante
:   -l \<service1\>,\<service2\>,\<service3\>,… Il est possible de
    préciser -d SHOWALL pour avoir la liste des services démarrés dans
    le message retour.
 PROCSTATE
:   Vérifier si un ou plusieurs processus sont démarrés. La syntaxe est
    identique à celle de SERVICESTATE.
 COUNTER
:   Permet d’interroger n’importe quel compteur de performance sur
    Windows NT/2000. Requiert le paramètre l avec la syntaxe suivante
:   -l ”\<objet performance\>counter”,”\<description\>. Le paramètre
    \<description\> est optionnel. Si le paramètre \<description\> ne
    contient pas les signes ”%%”, il est utilisé comme label. Vu le
    nombre de possibilités offertes, il est donc tout à fait
    envisageable de superviser un hôte Windows de façon active
    uniquement avec ce mode.

~~~
/usr/local/nagios/libexec$ ./check_nt -H 192.168.10.100 -p 12489 -s giosna -v CLIENTVERSION NSClient++ 0.3.2.9 2008-05-17
~~~

Ce même appel qui vérifie en plus que la version installée correspond
bien à celle souhaitée.

~~~
/usr/local/nagios/libexec$ ./check_nt -H 192.168.10.100 -p 12489 -s giosna -v CLIENTVERSION -l "NSClient++ 0.3.2.9 2008-05-17" 
NSClient++ 0.3.2.9 2008-05-17
~~~

La logique d’utilisation est toujours la même avec l’utilisation du
paramètre -l qui permet de préciser les valeurs à interroger. Voici
quelques exemples permettant de contrôler les aspects système habituels
d’une machine Windows.

### Contrôle de l’espace disque restant sur C {#controle-de-l-espace-disque-restant-sur-c .sectionedit3}

~~~
/usr/local/nagios/libexec$ ./check_nt -H 192.168.10.100 -p 12489 -s giosna -v USEDDISKSPACE -l C -w 10 -c 5
C:\ - total: 9,99 Gb - used: 1,81 Gb (18%) - free 8,17 Gb (82%) | ’C:\ Used Space’=1,81Gb;0,00;0,00;0.00;9,99
~~~

### Contrôle de la mémoire utilisée {#controle-de-la-memoire-utilisee .sectionedit4}

~~~
usr/local/nagios/libexec$ ./check_nt -H 192.168.10.100 -p 12489 -s giosna -v MEMUSE -w 10 -c 5
Memory usage: total:922,18 Mb - used: 100,87 Mb (11%) - free: 821,31 Mb (89%) | ’Memory usage’=100,87Mb;92,22;46,11;0.00;922,18
~~~

### Contrôle de la durée écoulée depuis le dernier démarrage de la machine {#controle-de-la-duree-ecoulee-depuis-le-dernier-demarrage-de-la-machine .sectionedit5}

~~~
/usr/local/nagios/libexec$ ./check_nt -H 192.168.10.100 -p 12489 -s giosna -v UPTIME System Uptime - 0 day(s) 1 hour(s) 16 minute(s)
~~~

### Contrôle de la charge machine {#controle-de-la-charge-machine .sectionedit6}

Avec une interrogation qui permet un mode de calcul assez proche de
celui observé sur machine Linux/Unix, soit une moyenne sur la dernière
minute, les 5 et les 15 dernières minutes. Les seuils d’avertissement
(90) et critique (95) sont précisés pour chacune des valeurs
interrogées.

~~~
/usr/local/nagios/libexec$ ./check_nt -H 192.168.10.100 -p 12489 -s giosna -v CPULOAD -l 1,90,95,5,90,95,15,90,95
CPU Load 0% (1 min average) 0% (5 min average) 0% (15 min average) | ’1 min avg Load’=0%;90;95;0;100 ’5 min avg Load’=0%;90;95;0;100 ’15 min avg Load’=0%;90;95;0;100
~~~

### Contrôle de l’état de services {#controle-de-l-etat-de-services .sectionedit7}

Le nom des services interrogés apparaît dans le message retour parce que
l’option -d SHOWALL est précisée.

~~~
/usr/local/nagios/libexec$ ./check_nt -H 192.168.44.200 -p 12489 -s giosna -v SERVICESTATE -d SHOWALL -l W32Time,"Services IPSec",NSClientpp
W32Time: Started - Services IPSec: Started - NSClientpp: Started
~~~

Le même contrôle sans l’option -d SHOWALL donne :

~~~
/usr/local/nagios/libexec$ ./check_nt -H 192.168.44.200 -p 12489 -s giosna -v SERVICESTATE -l W32Time,"Services IPSec",NSClientpp
OK: All services are running.
~~~

Pour contrôler des processus, la syntaxe est la même que SERVICESTATE vu
précédemment y compris pour l’utilisation de -d SHOWALL. Le plugin ne
permet pas de connaître le nombre d’occurrence du même processus. Il
contrôle qu’au moins un est présent en mémoire.

~~~
/usr/local/nagios/libexec$ ./check_nt -H 192.168.44.200 -p 12489 -s giosna -v PROCSTATE -d SHOWALL -l svchost.exe,nsclient++.exe
svchost.exe: Running - nsclient++.exe: Running
~~~

Pour transformer ces appels en commandes et services Nagios, il est soit
possible de définir une commande Nagios générique au check\_nt, soit de
spécialiser la commande en fonction du contrôle qui est à effectuer pour
avoir moins de paramètres à préciser dans le service correspondant.

~~~
define command{
command_name check_nt
command_line $USER1$/check_nt -H $HOSTADDRESS$ -s giosna
-p 12489 -v $ARG1$ $ARG2$
}
~~~

Cette commande est générique puisqu’elle permet d’appeler tout type de
contrôle check\_nt avec l’inconvénient de devoir préciser l’argument -l
et -d SHOWALL au niveau du service comme ceci.

~~~
define service{
use generic-service
host_name winserver
service_description CPU Load
check_command check_nt!CPULOAD!-l 1,90,95,5,90,95,15,90,95
}
~~~

En spécialisant la commande comme ceci,

~~~
define command{
command_name check_nt_load
command_line $USER1$/check_nt -H $HOSTADDRESS$ -s giosna -p 12489 -v CPULOAD -l 1,$ARG1$,5,$ARG1$,15,$ARG1$
}
~~~

Alors la définition de service devient plus évidente.

~~~
define service{
use generic-service
host_name winserver
service_description CPU Load
check_command check_nt_load!90,95
}
~~~

À chacun de voir suivant ses besoins et ses goûts le mode de
configuration pour Nagios le plus approprié, mais la spécialisation des
commandes permet vraiment de pouvoir avoir des services plus lisibles.

NSClient++ en mode NRPE {#nsclient-en-mode-nrpe .sectionedit8}
-----------------------

Après le mode de compatibilité que nous venons de voir, nous allons voir
comment NSClient++ peut jouer le rôle d’un agent NRPE; à savoir un moyen
de transport pour des contrôle effectués localement. Par rapport au mode
de fonctionnement précédent, ce mode a l’avantage de pouvoir utiliser
tous scripts Visual Basic, Perl ou DOS présents sur la machine et de ne
pas se cantonner aux interrogations prévues par un agent spécialisé. Ce
mode permet en plus d’encrypter les données pendant le transport, ce qui
n’est pas le cas du premier mode vu. La particularité du mode NRPE de
NSClient++ par rapport au démon équivalent Linux/Unix, c’est qu’il n’y a
pas obligatoirement besoin de scripts externes puisqu’il est possible
par ce moyen d’interroger les différents modules de NSClient++. Cette
double possibilité se retrouve au niveau des blocs de configuration de
NRPE pour NSClient++. La section NRPE contient les directives
habituelles de réglages de démon comme la liste des hôtes autorisés à se
connecter ou la possibilité de soumettre des arguments aux commandes.
Ces directives sont les mêmes que celles du démon sur plateforme
Linux/Unix, nous n’y revenons donc pas.

~~~
[NRPE]
port=5666
command_timeout=60
allow_arguments=0
allow_nasty_meta_chars=0
use_ssl=1
bind_to_address=
allowed_hosts=
socket_timeout=30
~~~

Plus intéressante est la section Check System. Elle permet de fixer la
taille du tampon utilisé pour le contrôle de la CPU et la fréquence de
celui-ci avec les directives CPUBufferSize et CheckResolution. Il est
conseillé d’utiliser un tampon bien dimensionné par rapport aux valeurs
souhaitées. Ainsi, pour nos exemples, nous avons utilisé les compteurs
1,5 et 15 minutes. Une valeur de 20m est donc largement suffisante. La
résolution est exprimée en dixième de sonde, une valeur de 10 prélève
donc une valeur toutes les secondes. Les cinq lignes suivantes servent à
régler le comportement du contrôle de service quand l’option ShowAll est
précisée. C’est le cas de la commande alias\_service qui est décrite
dans la section External Alias du fichier de configuration.

~~~
[Check System]
CPUBufferSize=20m
CheckResolution=10
check_all_services[SERVICE_BOOT_START]=ignored
check_all_services[SERVICE_SYSTEM_START]=ignored
check_all_services[SERVICE_AUTO_START]=started
check_all_services[SERVICE_DEMAND_START]=ignored
check_all_services[SERVICE_DISABLED]=stopped
~~~

Le bloc External Script règle le comportement de NSClient++ quand il
s’agit d’exécuter des scripts extérieurs à celui-ci.Il faut que le
module CheckExternalScripts soit activé en début de fichier de
configuration pour que ce bloc et le bloc External Alias soient
fonctionnels. Les options sont les mêmes que le bloc NRPE.

~~~
[External Script]
command_timeout=60
allow_arguments=0
allow_nasty_meta_chars=0
script_dir=c:\my\script\dir
Le bloc External Scripts permet de spécifier le couple nom de commande NRPE et script à exécuter.
[External Scripts]
check_es_ok=scripts\ok.bat
check_vbs_sample=cscript.exe //T:30 //NoLogo scripts\check_vb.vbs
~~~

Le bloc External Alias permet de définir des commandes accessibles via
les modules internes de NSClient++ sous forme nom de commande NRPE et
injection Nclient++.

~~~
[External Alias]
alias_cpu=checkCPU warn=90 crit=95 time=1m time=5m time=15m
alias_disk=CheckDriveSize MinWarn=10% MinCrit=5% CheckAll
FilterType=FIXED
alias_service=checkServiceState CheckAll
alias_mem=checkMem MaxWarn=80% MaxCrit=90% ShowAll type=physical
~~~

Le bloc includes permet comme son nom l’indique d’inclure des fichiers
de configuration secondaires à celui-ci. Ces directives sont
intéressantes quand il existe beaucoup de définitions de commandes NRPE.
Elles sont alors déportées dans l’un de ces fichiers de configuration
secondaires afin d’alléger la lecture du fichier principal.

~~~
[includes]
myotherfile.ini
real.ini
~~~

Le bloc NRPE Handlers est une reprise des blocs External Scripts et
External Alias mais au format traditionnel NRPE. L’écriture peut être
faite dans le format tel que connu sur Linux/Unix ou sous forme
simplifiée propre à NSClient++. Les deux premières définitions sont
ainsi identiques.

~~~
[NRPE Handlers]
command[check_cpu]=inject checkCPU warn=90 crit=95 time=1m time=5m
time=15m
check_cpu=inject checkCPU warn=90 crit=95 time=1m time=5m time=15m
check_disk=inject CheckDriveSize MinWarn=10% MinCrit=5% CheckAll
FilterType=FIXED
check_service=inject checkServiceState CheckAll
check_mem=inject checkMem MaxWarn=80% MaxCrit=90% ShowAll
type=physical
check_ok=scripts\ok.bat
check_vbs=cscript.exe //T:30 //NoLogo scripts\check_vb.vbs
~~~

Il est évident en voyant ce foisonnement de possibilités que certaines
d’entre elles se recoupent. Cela est dû à la nature particulière de
NSClient++ qui essaie à la fois de reprendre les protocoles « standards
» de Nagios comme NRPE tout en développant de nouvelles directions
propres aux systèmes Windows. De ce fait, la section NRPE Handlers
reprend les mêmes contrôles que ceux exprimés dans les sections External
Scripts et External Alias. Il est souvent judicieux de choisir parmi ces
méthodes plutôt que de toutes les utiliser pour clarifier l’organisation
des commandes de contrôle. Nous allons maintenant reprendre les
principaux contrôles vus avec le mode nsclient mais cette fois-ci en
mode NRPE. Les définitions à déclarer dans le fichier de configuration
de NSClient++ sont données plus haut dans les blocs correspondant de
l’explication du fichier de configuration.

### Contrôle de la charge système {#controle-de-la-charge-systeme .sectionedit9}

~~~
/usr/local/nagios/libexec$ ./check_nrpe -H 192.168.10.100 -c alias_cpu
OK CPU Load ok.|’1m’=3;90;95; ’5m’=0;90;95; ’15m’=0;90;95;
~~~

### Contrôle de l’espace libre sur le disque dur {#controle-de-l-espace-libre-sur-le-disque-dur .sectionedit10}

~~~
/usr/local/nagios/libexec$ ./check_nrpe -H 192.168.44.200 -c alias_disk
OK: All drives within bounds.|’C:\’=82%;10;5;
~~~

### Contrôle de la mémoire {#controle-de-la-memoire .sectionedit11}

~~~
/usr/local/nagios/libexec$ ./check_nrpe -H 192.168.44.200 -c alias_mem
OK: physical memory: 141M|’physical memory’=36%;80;90;
~~~

### Contrôle de l’état des services {#controle-de-l-etat-des-services .sectionedit12}

~~~
/usr/local/nagios/libexec$ ./check_nrpe -H 192.168.44.200 -c alias_service
OK: All services are running.
~~~

Côté serveur Nagios, la configuration de la commande Nagios étant déjà
faite, il ne reste qu’à créer des services sur le modèle d’un service
check\_nrpe.

NSClient++ en mode NSCA {#nsclient-en-mode-nsca .sectionedit13}
-----------------------

Le troisième mode à voir avec NSClient++ est le dernier introduit dans
le logiciel. Il permet d’interroger localement la machine et de
soumettre ses résultats à intervalles réguliers à Nagios via le
protocole NSCA. Il en implémente la partie send\_nsca. C’est donc tout
naturellement que le fichier de configuration de NSClient++ contient un
bloc spécifique à ce mode de fonctionnement. Le bloc NSCA Agent fixe le
comportement de NSClient++ en mode NSCA. La directive de configuration
avec une valeur à 300 signifie que les résultats sont envoyés toutes les
300 secondes, soit 5 minutes au serveur Nagios. La directive hostname
permet de préciser un nom de machine plutôt que celui récupéré par la
variable d’environnement Windows %COMPUTERNAME%. Les autres directives
ont déjà été vues lors de la présentation de NSCA et send\_nsca.

~~~
[NSCA Agent]
interval=300
encryption_method=14
password=
bind_to_address=
hostname=
nsca_host=192.168.0.1
nsca_port=5667
~~~

Le deuxième bloc de configuration concerne les déclarations de contrôle
à faire dans ce mode. À chaque fois, il faut préciser le nom du service
qui est à impacter dans Nagios et la commande NSClient++ à exécuter pour
le contrôle.

~~~
[NSCA Commands]
my_cpu_check=checkCPU warn=80 crit=90 time=20m time=10s time=4
my_mem_check=checkMem MaxWarn=80% MaxCrit=90% ShowAll type=page
my_svc_check=checkServiceState CheckAll exclude=wampmysqld
exclude=MpfService
host_check=check_ok
~~~

Le principal intérêt de ce mode est bien évidemment la réduction de la
bande passante réseau consommée qu’il occasionne. Si les contrôles
fournis en standard par NSClient++ ne suffisent plus, il est possible
d’écrire ses propres contrôles soit par des commandes appropriées pour
dialoguer avec les modules de NSClient++ soit d’écrire ses propres
scripts dans un langage supporté par la plateforme. Microsoft fournit
gratuitement un outil précieux pour la réalisation de ces objectifs avec
Scriptomatic
([http://www.microsoft.com/technet/scriptcenter/tools/scripto2.mspx](http://www.microsoft.com/technet/scriptcenter/tools/scripto2.mspx "http://www.microsoft.com/technet/scriptcenter/tools/scripto2.mspx")),
qui permet de générer automatiquement des scripts d’interrogation WMI.
WMI fournit normalement tous les compteurs possibles et imaginables pour
la supervision, c’est donc un mode de collecte à privilégier.
