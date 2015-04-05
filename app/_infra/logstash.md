---
layout: page
title: Logstash
---

  **Rôle**            **Nom**
  ------------------- -------------
  **Créateur**        Olivier JAN
  **Contributeurs**   Olivier JAN

D’après l’auteur de
[Logstash](http://www.logstash.net "http://www.logstash.net"), Logsatsh
est un outil pour gérer des événements et des fichiers journaux. Vous
pouvez l’utiliser pour collecter des fichiers journaux, les analyser et
les stocker pour une utilisation ultérieure (la recherche par exemple).
Même si Logstash possède sa propre interface de consultation, je laisse
ce rôle à [Graylog2](graylog2.html "infra:graylog2") et vais donc
exposer ici (un peu tant l’outil est puissant donc un peu complexe)
l’utilisation de Logstash en agent de collecte ,de pré et
post-traitement des fichiers journaux.

Installation {#installation .sectionedit3}
------------

Rien à installer, passez votre chemin :) Il suffit de télécharger
l’archive et de lancer le programme pour qu’il fonctionne. Pour ce petit
guide de démarrage avec Logstash, je le pose dans le dossier logstash de
mon répertoire personnel. Je profite pour créer un répertoire *etc* pour
Logstash.

~~~
cd ~/ && mkdir logstash && cd logstash && mkdir etc
wget http://semicomplete.com/files/logstash/logstash-1.1.0-monolithic.jar
~~~

Premier pas {#premier-pas .sectionedit4}
-----------

Nous allons illustrer ces premiers par un problème classique : Faire
suivre les fichiers journaux de connexion apache vers un serveur de type
syslog. Nous allons utiliser Logstash comme agent intermédiaire entre
Apache et Graylog2 pour le voir analyser et enrichir les fichiers
journaux de celui-ci. Une illustration avec une ligne de log typique
Apache2

~~~
192.168.20.4 - - [15/Feb/2012:11:52:14 +0100] "POST /health/currentthroughput HTTP/1.0" 200 11 "http://graylog2.demo.monitoring-fr.org/messages?utf8=%E2%9C%93&filters%5Bmessage%5D=correlated&filters%5Bdate%5D=&filters%5Bfacility%5D=&filters%5Bseverity%5D=&filters%5Bhost%5D=" "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.46 Safari/535.11"
~~~

### Pré-requis {#pre-requis .sectionedit5}

Pour comprendre la suite de ce guide, il faut d’abord installer un
serveur de centralisation de fichiers journaux au format syslog comme
l’excellent [Graylog2](graylog2.html "infra:graylog2"). Nous allons
d’ailleurs utiliser les particularités de celui-ci comme le format GELF
donc autant utiliser celui-ci. Mais avec un peu d’adaptation, n’importe
quel serveur syslog peut faire l’affaire.

### Configuration {#configuration .sectionedit6}

La configuration de Logstash fonctionne sur le principe de blocs de
configuration faisant coïncider la chaîne de traitement suivante :

1.  Input
2.  Filter
3.  Output

Logique somme toute. Vous trouverez la liste de ce séléments supportés
dans la [doc
Logstash](http://logstash.net/docs/1.1.0/ "http://logstash.net/docs/1.1.0/")
Voici à titre d’exemple un extrait de fichier de configuration pour un
input pointant vers un fichier de log Apache sur Ubuntu/Debian

~~~
input {
  file {
    type => "apache-log"
    path => "/var/log/apache2/access.log"
  }
 }
~~~

L’une des choses les plus importantes et que j’ai mis du temps à
comprendre personnellement est l’importance de l’attribut “type”. Au
final, c’est juste une chaîne de caractères pour laquelle vous avez
toute liberté de choix mais qui va servir à construire la chaîne “input
- filter - output”. C’est l’élément de liaison (ou constitutif) d’une
chaîne de traitement. Nous allons y revenir.

Le bloc donné en exemple ci-dessus est inséré dans le fichier
*\~/logstash/etc/apache.conf*. Il constitue le premier bloc de notre
fichier de configuration et nous avons encore les blocs filter et output
à gérer.

Pour notre sortie “output”, nous allons envoyer le résultat de notre
collecte et analyse vers Graylog2 via son protocole GELF. Si vous un
simple serveur syslog, vous pouvez faire la même chose via l’output
Sysylog de Logstash.

~~~
 output {
  gelf {
    type => "apache-log"
    host => "localhost"
    facility => "apache"
    level => "INFO"
    sender => "%{@source_host}"
  }
 }
~~~

Nous pouvons déjà démarrer le démon logstash en mode agent et voir ce
qui se passe

~~~
sudo java -jar logstash-1.1.0-monolithic.jar agent -f ~/logstash/etc/
~~~

À ce stade, vous devriez avoir vos logs Apache qui arrive dans
l’interface Graylog2. Notez donc que seul un “input - output” en chaîne
de traitement fonctionne. Mais ce serait passer à côté de la puissance
de filtrage de l’outil.

![](/assets/media/infra/apache-log-graylog.png)

Nous allons donc ajouter ce bloc de configuration à notre fichier

~~~
filter {
  grok {
    type => "apache-log"
    pattern => "%{COMBINEDAPACHELOG}"
  }
}
~~~

Il faut redémarrer Logstash après cette modification de configuration.
Dès qu’une connexion Apache est reçu, nous pouvons observé sur la sortie
standard de Logstash le message suivant

~~~
 "@message" => "10.10.10.4 - - [15/Feb/2012:16:07:49 +0100] \"POST /health/currentthroughput HTTP/1.0\" 200 11 \"http://graylog2.demo.monitoring-fr.org/messages\" \"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.46 Safari/535.11\""
}
{
         "@source" => "file://kvm1087/var/log/apache2/access.log",
           "@type" => "apache-log",
           "@tags" => [],
         "@fields" => {
           "clientip" => [
            [0] "10.10.10.4"
        ],
              "ident" => [
            [0] "-"
        ],
               "auth" => [
            [0] "-"
        ],
          "timestamp" => [
            [0] "15/Feb/2012:16:07:49 +0100"
        ],
               "ZONE" => [
            [0] "+0100"
        ],
               "verb" => [
            [0] "POST"
        ],
            "request" => [
            [0] "/health/currentmqsize"
        ],
        "httpversion" => [
            [0] "1.0"
        ],
           "response" => [
            [0] "200"
        ],
              "bytes" => [
            [0] "11"
        ],
           "referrer" => [
            [0] "http://graylog2.demo.monitoring-fr.org/messages"
        ],
              "agent" => [
            [0] "\"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.46 Safari/535.11\""
        ]
    },
      "@timestamp" => "2012-02-15T15:07:50.185000Z",
    "@source_host" => "kvm1087",
    "@source_path" => "/var/log/apache2/access.log",
~~~

On peut voir sur la sortie de Logstash que l’ensemble est désormais
finement analyser et que chaque partie devient une paire clé/valeur
représentant une partie de message. je disais puissant :)

Exemple avancé {#exemple-avance .sectionedit7}
--------------

Nous avons utilisé Logstash comme agent de pré-processing de fichiers
journaux. Nous allons l’utiliser maintenant en post-processing et le
coupler avec [Simple Event
Correlator](../nagios/integration/sec.html "nagios:integration:sec"). Ce
circuit doit permettre de faire de la corrélation sur les événements
arrivant dans Graylog2. Voilà une des chaînes de liaison possible pour
ce faire.

Syslog =⇒ Graylog2 =⇒ Stream Graylog2 =⇒ Forwarder UDP =⇒ Logstash
syslog input =⇒ Logstash file ouptput =⇒ SEC file input =⇒ SEC =⇒ SEC
action shellcmd =⇒ Logstash TCP input =⇒ Logstash syslog output =⇒
Graylog2.

### Configuration Graylog2 {#configuration-graylog2 .sectionedit8}

Il faut d’abord créer un stream, peut importe lequel. J’ai chois pour ma
part de filtrer tout ce qui vient d’un hôte en particulier.

![](/assets/media/infra/graylog2-stream.png)

Ensuite, il faut créer un forwarder de type UDP pour ce stream

![](/assets/media/infra/graylog2-forwarder.png)

Je fais suivre sur localhost port 5140 dans cet exemple. Terminé pour la
partie configuration de Graylog2 pour notre exemple avancé.

### Configuration Logstash {#configuration-logstash .sectionedit9}

Côté Logstash, nous allons construire un nouveau fichier de
configuration *\~/logstash/etc/sec-correlation.conf* qui pourra tout à
fait cohabiter et être chargé simultanément avec le précédent pour
Apache2. Logstash sait en effet chargé plusieurs fichiers de
configurations situés dans un répertoire.

Nous allons avoir deux “input”

-   Un pour récupérer le stream forwardé de graylog2 (input UDP)
-   Un pour récupérer le flux TCP venant de SEC (input TCP)

et deux “output”

-   Un pour envoyer les messages forwardés vers un fichier pour être
    traités par SEC (output file)
-   Un pour envoyer les messages reçus de SEC par le flux TCP vers
    Graylog2 (output GELF)

Voici la portion du fichier de configuration Logstash correspondant pour
les “input”. Notez les “type” libellés “to-sec” et “from-sec” qui
correspondront côté sortie. En “input”, nos deux serveurs Syslog UDP et
TCP écoutent respectivement sur les ports 5140 et 5141.

~~~
input {
  syslog {
    type => "to-sec"
    host => "127.0.0.1"
    port => "5140"
  }
  tcp {
    data_timeout => "5"
    debug => "true"
    host => "127.0.0.1"
    mode => "server"
    port => "5141"
    type => "from-sec"
  }
 }
~~~

Et pour les “output”

~~~
 output {
  file {
    type => "to-sec"
    path => "/opt/sec/log/input.log"
  }
  gelf {
    type => "from-sec"
    host => "localhost"
    facility => "sec-correlated"
    level => "INFO"
    sender => "%{@source_host}"
  }
 }
~~~

En “ouptut”, nous fournissons le fichier */opt/sec/log/input.log* en
entrée de SEC et nous sortons au format GELF vers Graylog2. La boucle
est bouclée. Notre circuit est en place côté Logstash. Redémarrage et
configuration de SEC.

### Configuration SEC {#configuration-sec .sectionedit10}

Je passerais l’utilisation et la configuration basique de SEC pour me
concentrer uniquement à ce qui est nécessaire dans notre contexte. Et
encore, nous ne sommes pas sur une vraie règle de corrélation mais juste
à la mise en place de notre chaîne de liaison.

Voici le contenu du fichier de configuration de SEC

~~~
type=Single
ptype=RegExp
pattern=rsyslog\s+(\S+)
desc=$0
action=shellcmd /bin/echo -e "Event correlated by SEC via TCP\n" | /bin/nc 127.0.0.1 5141
~~~

Cette configuration réagira sur tout message de notre stream Graylog2
contenant le mot “rsyslog” et renverra un nouvel événement contenant
“Event correlated by SEC via TCP” via netcat à notre “input” Logsatsh
TCP sur le port 5141.

Ne pas oublier de (re)démarrer SEC avec le fichier
*/opt/sec/log/input.log* (celui écrit par Logstash) en input comme
ci-dessous

~~~
/opt/sec/bin/sec -conf=/opt/sec/etc/*.conf -input=/opt/sec/log/input.log -pid=/opt/sec/run/sec.pid -detach -syslog=daemon
~~~

Il suffit maintenant de redémarrer le service rsyslog sur le serveur
capté dans le stream syslog pour voir apparaître au final dans Graylog2
l’écran suivant

![](/assets/media/infra/graylog2-sec.png)

Il vous reste du boulot pour améliorer tout ça mais la base est là ;)

Conclusion {#conclusion .sectionedit11}
----------

Même si nos deux exemples restent un peu théoriques, ceux-ci n’avaient
d’autre ambition que de présenter la puissance et la flexibilité de
Logsatsh en pré et en post-traitement. La variété des entrées sorties
(AMQP, XMPP, Twitter…) et la puissance des filtres de cet outil combiné
à la richesse de l’interface d’un Graylog2 permet vraiment d’envisager
le traitement, l’archivage et la centralisation des fichiers journaux,
même les plus “pourris” sous un angle nouveau… Et intéressant.