---
layout: page
---

### Table des matières {.toggle}

-   [SEC](sec.html#sec)
    -   [Installation](sec.html#installation)
        -   [Démarrage](sec.html#demarrage)
    -   [Configuration](sec.html#configuration)
        -   [Exemple de traitement des interruptions
            SNMP](sec.html#exemple-de-traitement-des-interruptions-snmp)

SEC {#sec .sectionedit1}
===

[SEC](http://www.estpak.ee/~risto/sec/ "http://www.estpak.ee/~risto/sec/")
(Simple Event Correlator) est un programme écrit en PERL qui permet de
surveiller des fichiers de logs pour y détecter des motifs intéressants
en supervision. Il est aussi utilisé pour corréler certains évènements
afin de diminuer le nombre de fausses alertes. Il est en ce sens à
ranger dans la même catégorie que Swatch.

SEC est un logiciel multiplateforme de corrélations d’évènements Open
Source créé pour combler le fossé entre les logiciels commerciaux dédiés
à cet usage et les solutions “maison” qui sont souvent quelques scripts
shell écrits au fil du temps. SEC accepte les entrées d’un fichier, d’un
tube nommé ou de l’entrée standard et peut donc être employer comme
couche de corrélation par tous programmes écrivant ses sorties
d’évènements dans un flux de fichier. La configuration de SEC est
stockée comme règles dans des fichiers texte, chaque règle décrivant
l’évènement sur lequel réagir, l’action à mener et optionellement une
expression booléenne dont la valeur décide de l’application de la règle
à un moment donné. Les expressions régulières, les sous routines Perl,
etc peuvent être utilisées pour définir les conditions de l’évènement.
SEC peut lui-même produire des évènements en sortie en exécutant des
scripts shell ou des programmes externes (snmptrap ou courrier
électronique) et/ou en écrivant des messages vers des tubes ou des
fichiers.

SEC est utilisé avec succès dans des domaines aussi variés que la
gestion des réseaux, le monitoring système, la sécurité des données, la
détection d’intrusions, la surveillance et l’analyse de fichiers
journaux, etc. SEC est utilisé ou intégré dans des produits aussi
différents que HP OpenView NNM et Operations, CiscoWorks, BMC Patrol,
Nagios, SNMPTT, Snort IDS, Prelude IDS, etc.

Les types de règles de corrélation suivants sont implémentées dans SEC.

-   **Single** : Détecte un motif et exécute une action parmi celles
    supportées par SEC.
-   **SingleWithScript** : Détecte un motif et exécute une action parmi
    celle supportée par SEC en fonction du code de sortie d’un script ou
    programme externe.
-   **SingleWithSuppress** : Détecte un motif et exécute une action
    parmi celles supportées par SEC, mais ignore les motifs détectés
    suivants pendant « t » secondes suivantes.
-   **Pair** : Détecte un motif et exécute une action parmi celles
    supportées par SEC, ignore les motifs détectés suivants jusqu’à la
    détection d’un motif différent. Exécute une action à l’arrivée du
    deuxième motif.
-   **PairWithWindow** : Détecte un motif et attend pendant « t »
    secondes un motif différent. Si ce deuxième motif n’est pas détecté
    au bout de ce temps, exécute une action. Si ce deuxième motif est
    détecté dans le laps de temps, exécute une autre action.
-   **SingleWithThreshold** : Compte le nombre de motifs semblables
    pendant « t » secondes et si un certain seuil est dépassé, exécute
    une action et ignore les nouveaux motifs pendant le reste du temps.
    La fenêtre de temps précisée avec « t » est coulissante.
-   **SingleWith2Thresholds** : La même règle que précédemment combiné à
    deux fenêtres de temps.
-   **Suppress** : Supprime le motif détecté. Est utilisé pour ne pas
    présenté ce motif aux règles suivantes.
-   **Calendar** : Exécute une action à une certaine date et heure.

Ce tutoriel a été réalisé par :

  **Rôle**        **Nom**
  --------------- -------------
  **Rédacteur**   Olivier JAN

Installation {#installation .sectionedit3}
------------

L’installation que je propose permet de faire fonctionner SEC avec
l’utilisateur Nagios et non root. Pour installer SEC, il suffit de
décompresser l’archive et de la placer où bon vous semble. Attention
donc aux chemins donnés ci-dessous qui peuvent varier en fonction de
votre installation.

~~~~ {.code}
sudo mv sec.pl /usr/local/sec/bin/
~~~~

Création du dossier pour recevoir les fichiers de configuration.

~~~~ {.code}
sudo mkdir /usr/local/sec/etc
~~~~

Pour ma part, j’adopte le layout suivant:

-   sec.pl est renommé en sec et placé dans */usr/local/sec/bin/sec*
-   Les fichiers de configuration vont dans */usr/local/sec/etc*/
-   Le fichier de log de sec va dans */usr/local/nagios/var/sec.log*
-   Le fichier de pid est créé dans */usr/local/nagios/var/run/sec.pid*

### Démarrage {#demarrage .sectionedit4}

Si l’installation est simple, il faut par contre se débrouiller pour que
SEC soit lancé automatiquement au démarrage de la machine. Aucun script
n’est fourni. Il est possible de mettre la commande de démarrage dans
/etc/rc.local ou de créer un script de démarrage à place dans
/etc/init.d/. Tiens, en voilà [un
justement](../../../../assets/media/integration/sec-init.tar.gz "integration:sec-init.tar.gz")
![:-D](../../../../lib/images/smileys/icon_biggrin.gif)… sommaire mais
fonctionnel.

Au passage, suivant les fichiers de logs à surveiller, SEC peut être
démarré avec les droits et privilèges de l’utilisateur nagios
^[1)](sec.html#fn__1)^ plutôt que ceux de root. Le démarrage suivant
exécute sec pour le compte de l’utilisateur nagios.

~~~~ {.code}
sudo -u nagios /usr/local/sec/bin/sec -conf=/usr/local/sec/etc/*.cfg -input=/var/log/syslog -log=/usr/local/nagios/var/sec.log -pid=/usr/local/nagios/var/run/sec.pid -detach 
~~~~

Le terminal renvoie le message suivant

~~~~ {.code}
SEC (Simple Event Correlator) 2.4.2 
Changing working directory to / 
Reading configuration from /usr/local/sec/etc/monit.cfg 
7 rules loaded from /usr/local/sec/etc/monit.cfg 
Reading configuration from /usr/local/sec/etc/snmp.cfg 
1 rules loaded from /usr/local/sec/etc/snmp.cfg 
~~~~

Explications des options et arguments employés dans le démarrage de SEC.

-   **-conf** pour spécifier le chemin des fichiers de configuration
    soit */usr/local/sec/etc/\*.cfg*. Cette directive permet la prise en
    compte tous les fichiers se finissant par .cfg dans le dossier
    spécifié.
-   **-input**, qui peut être répété autant de fois que nécessaires
    permet de préciser les fichiers journaux à surveiller en entrée du
    programme. Ici */var/log/syslog*. Dans cet exemple, l’utilisateur
    nagios doit avoir un accès en lecture sur ce fichier.
-   **-log** permet de préciser le fichier journal à utiliser pour SEC.
    Il est précisé ici dans */usr/local/nagios/var/sec.log*.
-   **-pid** précise le chemin du numéro d’identification de processus
    de SEC, donc */usr/local/nagios/var/run/sec.pid* dans l’exemple.
-   **-detach** permet de faire fonctionner SEC en mode démon.

Sec est opérationnel. A chaque modifications des règles, donc des
fichiers de configuration de SEC, il faut le redémarrer.

Configuration {#configuration .sectionedit5}
-------------

La configuration de SEC est composé d’un ensemble de fichiers de
déclarations de règles qu’il est possible d’organiser comme bon vous
semble. Voici quelques exemples de ce qu’il est possible de faire avec
SEC et comment l’intégrer avec Nagios.

### Exemple de traitement des interruptions SNMP {#exemple-de-traitement-des-interruptions-snmp .sectionedit6}

Soit les deux évènements suivants observés dans le fichier
/etc/snmptt/snmptt.log.

~~~~ {.code}
Sun May 18 22:31:33 2008 nsNotifyShutdown Normal "Status Events" ubuntu - An indication that the agent is in the process of being shut down. 
Sun May 18 22:31:35 2008 coldStart Normal "Status Events" ubuntu - A coldStart trap signifies that the SNMP entity,
~~~~

Il s’agit d’interruptions reçues et interprétées par le couple
SNMPD/SNMPTT en provenance de la machine ubuntu (on sait comme ça quelle
machine impactée dans Nagios). Ils indiquent l’arrêt et le redémarrage
du démon snmpd sur une machine de type Linux Ununtu.

![:!:](../../../../lib/images/smileys/icon_exclaim.gif) Il est possible
de se passer de SNMPTT et de réagir directement sur l’OID de
l’interruption reçue. C’est même plus facile de construire les patterns
comme ceux vus plus bas.

Est-il utile d’envoyer à Nagios deux messages; un d’état critique pour
l’arrêt de snmpd et un d’état ok pour le démarrage? N’est-il pas plus
judicieux de n’envoyer un message CRITICAL qu’au cas où le service ne
redémarre pas et un message d’informations OK lorsqu’il n’a fait que
stopper, démarrer (ce qu’on appelle un redémarrage
![;-)](../../../../lib/images/smileys/icon_wink.gif).

Une simple règle SEC va nous permettre d’envoyer un seul message OK
comme quoi le service snmpd a été redémarré avec succès si les deux
messages se succèdent dans un laps de temps de 10 secondes par exemple
et un message critique comme quoi le serveur n’a pas redémarré si le
deuxième message n’arrive pas. Nous allons réaliser cette opération avec
une règle SEC de type PairWithWindow.

~~~~ {.code}
type=PairWithWindow 
ptype=RegExp 
pattern=.*?\s+nsNotifyShutdown\s+Normal\s+"Status Events"\s+(.*)\s+-\s+.*? 
desc=$0 
action=shellcmd /bin/echo -e "$1\tsnmp\t2\tSNMP CRITICAL - Service did not restart in 10 seconds\n" | /usr/local/nagios/bin/send_nsca -H localhost -c /usr/local/nagios/etc/send_nsca.cfg 
ptype2=RegExp 
pattern2=.*?\s+coldStart\s+Normal\s+"Status Events"\s+(.*)\s+-\s+.*? 
desc2=$0 
action2=shellcmd /bin/echo -e "$1\tsnmp\t0\tSNMP OK - Service restarted sucessfully\n" | /usr/local/nagios/bin/send_nsca -H localhost -c /usr/local/nagios/etc/send_nsca.cfg
window=10
~~~~

Un petit mot sur les options de règles utilisées

-   **type** permet de préciser le type de règles SEC à utiliser
-   **ptype** est le type d’expression régulières à utiliser pour
    détecter le motif. Habituellement fixé à RegExp.
-   **pattern** est la partie la plus importante et le plus délicate à
    régler dans SEC. Elle permet de préciser le type de motif à
    détecter. A vos manuels d’expressions régulières Perl
    ![;-)](../../../../lib/images/smileys/icon_wink.gif)
-   **desc**=\$0 est la ligne telle qu’elle a été analysé par SEC.
-   **action**=shellcmd représente la commande à exécuter lorsque la
    régle est percutée. Dans cet exemple, c’est un appel classique à
    send\_nsca mais cela peut être n’importe quel script ou binaire avec
    ou sans arguments.

Le résultat apparaît dans /usr/local/nagios/var/sec.log.

~~~~ {.code}
Sun May 18 23:41:12 2008: Executing shell command '/bin/echo -e "/bin/echo -e "ubuntu\tsnmp\t0\tSNMP OK - Service restarted sucessfully\n" | /usr/local/nagios/bin/send_nsca -H localhost -c /usr/local/nagios/etc/send_nsca.cfg' 
Sun May 18 23:41:12 2008: Child 7237 created for command '/bin/echo -e "/bin/echo -e "ubuntu\tsnmp\t0\tSNMP OK - Service restarted sucessfully\n" | /usr/local/nagios/bin/send_nsca -H localhost -c /usr/local/nagios/etc/send_nsca.cfg' 
Sun May 18 23:42:11 2008: Executing shell command '/bin/echo -e "/bin/echo -e "ubuntu\tsnmp\t2\tSNMP CRITICAL - Service did not restart in 30 seconds\n" | /usr/local/nagios/bin/send_nsca -H localhost -c /usr/local/nagios/etc/send_nsca.cfg' 
Sun May 18 23:42:11 2008: Child 7456 created for command '/bin/echo -e "/bin/echo -e "ubuntu\tsnmp\t2\tSNMP CRITICAL - Service did not restart in 10 seconds\n" | /usr/local/nagios/bin/send_nsca -H localhost -c /usr/local/nagios/etc/send_nsca.cfg'
~~~~

^[1)](sec.html#fnt__1)^ ou autre
