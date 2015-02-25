---
layout: page
---

[[[Postfix](postfix@do=backlink.html)]]

[wiki monitoring-fr.org](../start.html "[ALT+H]")

![Logo Monitoring](../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../start.html "start") »
[Infrastructure](start.html "infra:start") »
[Postfix](postfix.html "infra:postfix")

### Table des matières {.toggle}

-   [Postfix](postfix.html#postfix)
    -   [Pré-Requis](postfix.html#pre-requis)
    -   [Installation](postfix.html#installation)
    -   [Configuration](postfix.html#configuration)
        -   [Phase de Test](postfix.html#phase-de-test)
        -   [La solution](postfix.html#la-solution)
    -   [Explication du main.cf](postfix.html#explication-du-maincf)
    -   [Ça ne fonctionne toujours pas
        ?](postfix.html#ca-ne-fonctionne-toujours-pas)

[![](../assets/media/supervision/logo_postfix.gif)](../_detail/supervision/logo_postfix.gif@id=infra%253Apostfix.html "supervision:logo_postfix.gif")

Postfix {#postfix .sectionedit1}
=======

[Postfix](http://www.postfix.org "http://www.postfix.org") est un
élément étroitement lié à Nagios. Effectivement, il sert à l’envoi des
notifications vers votre serveur de messagerie.

Ayant remarqué que son paramétrage à l’air de poser certains problèmes
au sein de la communauté, nous allons y consacrer un peu de temps pour y
voir plus clair.

Je ferai donc l’installation sur mon poste (Ubuntu 9.04 sur ordinateur
portable) dans un premier temps pour pouvoir rédiger cette article.
J’explique un peu mon infra, je suis à la maison derrière une Box sans
aucun réglage particulier. Je n’ai pas toucher à ma Box depuis que je
suis chez mon FAI.

Ensuite je testerai un paramétrage pour un serveur toujours en Ubuntu
8.04 LTS se trouvant dans un environnement d’Entreprise.

Pré-Requis {#pre-requis .sectionedit2}
----------

Il nous faudra l’installation du binaire “mail” pour pouvoir faire notre
test d’envoi.

~~~~ {.code}
sudo apt-get install mailx
~~~~

Installation {#installation .sectionedit3}
------------

L’installation de postfix est simple et se fait à coup de APT

~~~~ {.code}
sudo apt-get install postfix
~~~~

Postfix va nous poser quelques questions concernant son paramétrage.

[![](../assets/media/supervision/postfix-install1.png)](../_detail/supervision/postfix-install1.png@id=infra%253Apostfix.html "supervision:postfix-install1.png")

Dans 90% des cas on prendra la configuration “Système sattelite” car on
veut envoyer nos e-mails via une autre machine qui fait serveur de
messagerie.

[![](../assets/media/supervision/postfix-install2.png)](../_detail/supervision/postfix-install2.png@id=infra%253Apostfix.html "supervision:postfix-install2.png")

[![](../assets/media/supervision/postfix-install3.png)](../_detail/supervision/postfix-install3.png@id=infra%253Apostfix.html "supervision:postfix-install3.png")

Le nom que l’on retrouve ci-dessous est le nom de votre machine (nom
présent dans le /etc/hosts ou /etc/hostname)

[![](../assets/media/supervision/postfix-install4.png)](../_detail/supervision/postfix-install4.png@id=infra%253Apostfix.html "supervision:postfix-install4.png")

Comme dans la plus part des cas, votre entreprise dispose soit de son
propre serveur de messagerie. Il faudra soit mettre l’adresse IP du
serveur ou le nom DNS.

**Bien vérifier que le nom DNS du serveur de messagerie répond au
ping.**

On fera le test avec Orange.

[![](../assets/media/supervision/postfix-install5.png)](../_detail/supervision/postfix-install5.png@id=infra%253Apostfix.html "supervision:postfix-install5.png")

Configuration {#configuration .sectionedit4}
-------------

Notre installation étant terminée, nous allons voir à quoi ressemble
notre fichier /etc/postfix/main.cf

~~~~ {.code}
# See /usr/share/postfix/main.cf.dist for a commented, more complete version

# Debian specific:  Specifying a file name will cause the first

# line of that file to be used as the name.  The Debian default

# is /etc/mailname.

#myorigin = /etc/mailname

smtpd_banner = $myhostname ESMTP $mail_name (Ubuntu)

biff = no

# appending .domain is the MUA's job.

append_dot_mydomain = no

# Uncomment the next line to generate "delayed mail" warnings

#delay_warning_time = 4h

readme_directory = no

# TLS parameters

smtpd_tls_cert_file=/etc/ssl/certs/ssl-cert-snakeoil.pem

smtpd_tls_key_file=/etc/ssl/private/ssl-cert-snakeoil.key

smtpd_use_tls=yes

smtpd_tls_session_cache_database = btree:${data_directory}/smtpd_scache

smtp_tls_session_cache_database = btree:${data_directory}/smtp_scache

# See /usr/share/doc/postfix/TLS_README.gz in the postfix-doc package for

# information on enabling SSL in the smtp client.

myhostname = rfronteau-laptop

alias_maps = hash:/etc/aliases

alias_database = hash:/etc/aliases

mydestination = rfronteau-laptop, localhost.localdomain, localhost

relayhost = smtp.orange.fr

mynetworks = 127.0.0.0/8 [::ffff:127.0.0.0]/104 [::1]/128

mailbox_size_limit = 0

recipient_delimiter = +

inet_interfaces = loopback-only
~~~~

### Phase de Test {#phase-de-test .sectionedit5}

Nous allons tester notre configuration brute pour voir si elle
fonctionne.

Pour tester rien de plus simple, nous allons utiliser le binaire
/usr/bin/mail pour vérifier que notre mail arrive bien chez Orange.

~~~~ {.code}
/usr/bin/mail [email protected]
/*  */!function(){try{var t="currentScript"in document?document.currentScript:function(){for(var t=document.getElementsByTagName("script"),e=t.length;e--;)if(t[e].getAttribute("cf-hash"))return t[e]}();if(t&&t.previousSibling){var e,r,n,i,c=t.previousSibling,a=c.getAttribute("data-cfemail");if(a){for(e="",r=parseInt(a.substr(0,2),16),n=2;a.length-n;n+=2)i=parseInt(a.substr(n,2),16)^r,e+=String.fromCharCode(i);e=document.createTextNode(e),c.parentNode.replaceChild(e,c)}}}catch(u){}}();/*  */
Subject: Test Nagios-fr

Appuyer sur "Entrer"
Apuyer sur "Ctrl+D"
Cc: 

Appuyer sur "Entrer"
Null message body; hope that's ok
~~~~

On a plus qu’à vérifier si notre message est bien arrivé.

Le message n’est pas arrivé.

**Si un problème vous arrive premier réflexe, allez voir le log. Les
logs ont beaucoup de choses à nous raconter et c’est souvent comme ça
qu’on arrive à comprendre ce qui se passe et comment le résoudre.**

Allons voir les logs :

~~~~ {.code}
Aug 28 10:52:39 rfronteau-laptop postfix/pickup[31977]: 51D486800CD: uid=1000 from=<rfronteau>

Aug 28 10:52:39 rfronteau-laptop postfix/cleanup[32436]: 51D486800CD: message-id=<20090828085239.51D486800CD@rfronteau-laptop>

Aug 28 10:52:39 rfronteau-laptop postfix/qmgr[31978]: 51D486800CD: from=<rfronteau@rfronteau-laptop>, size=326, nrcpt=1 (queue active)

Aug 28 10:52:39 rfronteau-laptop postfix/smtp[32438]: 51D486800CD: to=<[email protected]
/*  */!function(){try{var t="currentScript"in document?document.currentScript:function(){for(var t=document.getElementsByTagName("script"),e=t.length;e--;)if(t[e].getAttribute("cf-hash"))return t[e]}();if(t&&t.previousSibling){var e,r,n,i,c=t.previousSibling,a=c.getAttribute("data-cfemail");if(a){for(e="",r=parseInt(a.substr(0,2),16),n=2;a.length-n;n+=2)i=parseInt(a.substr(n,2),16)^r,e+=String.fromCharCode(i);e=document.createTextNode(e),c.parentNode.replaceChild(e,c)}}}catch(u){}}();/*  */>, relay=smtp.orange.fr[80.12.242.86]:25, delay=0.35, delays=0.04/0.01/0.25/0.06, dsn=5.5.2, status=bounced (host smtp.orange.fr[80.12.242.86] said: 504 5.5.2 <rfronteau@rfronteau-laptop>: Sender address rejected: need fully-qualified address (in reply to MAIL FROM command))

Aug 28 10:52:39 rfronteau-laptop postfix/cleanup[32436]: B94026800CE: message-id=<20090828085239.B94026800CE@rfronteau-laptop>

Aug 28 10:52:39 rfronteau-laptop postfix/bounce[32439]: 51D486800CD: sender non-delivery notification: B94026800CE

Aug 28 10:52:39 rfronteau-laptop postfix/qmgr[31978]: B94026800CE: from=<>, size=2310, nrcpt=1 (queue active)

Aug 28 10:52:39 rfronteau-laptop postfix/qmgr[31978]: 51D486800CD: removed

Aug 28 10:52:39 rfronteau-laptop postfix/local[32440]: B94026800CE: to=<rfronteau@rfronteau-laptop>, relay=local, delay=0.03, delays=0.01/0.01/0/0.01, dsn=2.0.0, status=sent (delivered to mailbox)

Aug 28 10:52:39 rfronteau-laptop postfix/qmgr[31978]: B94026800CE: removed
~~~~

Ce log est brute de décoffrage, tachons de l’analyser un peu:

~~~~ {.code}
Aug 28 10:52:39 rfronteau-laptop postfix/pickup[31977]: 51D486800CD: uid=1000 from=<rfronteau>

Aug 28 10:52:39 rfronteau-laptop postfix/cleanup[32436]: 51D486800CD: message-id=<20090828085239.51D486800CD@rfronteau-laptop>

Aug 28 10:52:39 rfronteau-laptop postfix/qmgr[31978]: 51D486800CD: from=<rfronteau@rfronteau-laptop>, size=326, nrcpt=1 (queue active)
~~~~

Notre mail de test a été placé dans la queue de départ courrier.

~~~~ {.code}
Aug 28 10:52:39 rfronteau-laptop postfix/smtp[32438]: 51D486800CD: to=<[email protected]
/*  */!function(){try{var t="currentScript"in document?document.currentScript:function(){for(var t=document.getElementsByTagName("script"),e=t.length;e--;)if(t[e].getAttribute("cf-hash"))return t[e]}();if(t&&t.previousSibling){var e,r,n,i,c=t.previousSibling,a=c.getAttribute("data-cfemail");if(a){for(e="",r=parseInt(a.substr(0,2),16),n=2;a.length-n;n+=2)i=parseInt(a.substr(n,2),16)^r,e+=String.fromCharCode(i);e=document.createTextNode(e),c.parentNode.replaceChild(e,c)}}}catch(u){}}();/*  */>, relay=smtp.orange.fr[80.12.242.86]:25, delay=0.35, delays=0.04/0.01/0.25/0.06, dsn=5.5.2, status=bounced (host smtp.orange.fr[80.12.242.86] said: 504 5.5.2 <rfronteau@rfronteau-laptop>: Sender address rejected: need fully-qualified address (in reply to MAIL FROM command))
~~~~

Notre courrier est rejeté par le serveur de messagerie Orange car notre
adresse d’envoyeur n’est pas complète (rfronteau@rfronteau-laptop),
leurs scripts de contrôle doivent attendre une adresse de la forme
[[email protected]](../cdn-cgi/l/email-protection.html)

pour limiter la pollution que les spams peuvent générer.

~~~~ {.code}
Aug 28 10:52:39 rfronteau-laptop postfix/cleanup[32436]: B94026800CE: message-id=<20090828085239.B94026800CE@rfronteau-laptop>

Aug 28 10:52:39 rfronteau-laptop postfix/bounce[32439]: 51D486800CD: sender non-delivery notification: B94026800CE

Aug 28 10:52:39 rfronteau-laptop postfix/qmgr[31978]: B94026800CE: from=<>, size=2310, nrcpt=1 (queue active)
~~~~

Postfix gère une notification de non-distribution du courrier

~~~~ {.code}
Aug 28 10:52:39 rfronteau-laptop postfix/qmgr[31978]: 51D486800CD: removed

Aug 28 10:52:39 rfronteau-laptop postfix/local[32440]: B94026800CE: to=<rfronteau@rfronteau-laptop>, relay=local, delay=0.03, delays=0.01/0.01/0/0.01, dsn=2.0.0, status=sent (delivered to mailbox)

Aug 28 10:52:39 rfronteau-laptop postfix/qmgr[31978]: B94026800CE: removed
~~~~

Postfix efface le courrier non partant.

### La solution {#la-solution .sectionedit6}

J’ai dû modifier le main.cf car je pense que les serveurs de messagerie
des FAI sont blindés question sécurité et doivent faire pas mal de
vérification.

myhostname = rfronteau-laptop.localdomain.fr

mydestination = rfronteau-laptop.localdomain.fr, localhost.localdomain,
localhost

J’ai mis localdomain.fr car à la maison je n’ai pas un nom de domaine.
Mais dans votre entreprise, vous devez avoir un nom de domaine style «
mon\_entreprise.fr »

Bah ça devra ressembler à ça:

myhostname = mon\_serveur.mon\_entreprise.fr

mydestination = mon\_serveur.mon\_entreprise.fr, localhost.localdomain,
localhost

Redémarrage de Postfix

/etc/init.d/postfix restart

Re-testez un envoi de mail.

~~~~ {.code}
Aug 28 11:02:45 rfronteau-laptop postfix/pickup[495]: C5FFA6800CD: uid=1000 from=<rfronteau>

Aug 28 11:02:45 rfronteau-laptop postfix/cleanup[501]: C5FFA6800CD: message-id=<[email protected]
/*  */!function(){try{var t="currentScript"in document?document.currentScript:function(){for(var t=document.getElementsByTagName("script"),e=t.length;e--;)if(t[e].getAttribute("cf-hash"))return t[e]}();if(t&&t.previousSibling){var e,r,n,i,c=t.previousSibling,a=c.getAttribute("data-cfemail");if(a){for(e="",r=parseInt(a.substr(0,2),16),n=2;a.length-n;n+=2)i=parseInt(a.substr(n,2),16)^r,e+=String.fromCharCode(i);e=document.createTextNode(e),c.parentNode.replaceChild(e,c)}}}catch(u){}}();/*  */>

Aug 28 11:02:45 rfronteau-laptop postfix/qmgr[496]: C5FFA6800CD: from=<[email protected]
/*  */!function(){try{var t="currentScript"in document?document.currentScript:function(){for(var t=document.getElementsByTagName("script"),e=t.length;e--;)if(t[e].getAttribute("cf-hash"))return t[e]}();if(t&&t.previousSibling){var e,r,n,i,c=t.previousSibling,a=c.getAttribute("data-cfemail");if(a){for(e="",r=parseInt(a.substr(0,2),16),n=2;a.length-n;n+=2)i=parseInt(a.substr(n,2),16)^r,e+=String.fromCharCode(i);e=document.createTextNode(e),c.parentNode.replaceChild(e,c)}}}catch(u){}}();/*  */>, size=371, nrcpt=1 (queue active)

Aug 28 11:02:46 rfronteau-laptop postfix/smtp[503]: C5FFA6800CD: to=<[email protected]
/*  */!function(){try{var t="currentScript"in document?document.currentScript:function(){for(var t=document.getElementsByTagName("script"),e=t.length;e--;)if(t[e].getAttribute("cf-hash"))return t[e]}();if(t&&t.previousSibling){var e,r,n,i,c=t.previousSibling,a=c.getAttribute("data-cfemail");if(a){for(e="",r=parseInt(a.substr(0,2),16),n=2;a.length-n;n+=2)i=parseInt(a.substr(n,2),16)^r,e+=String.fromCharCode(i);e=document.createTextNode(e),c.parentNode.replaceChild(e,c)}}}catch(u){}}();/*  */>, relay=smtp.orange.fr[80.12.242.61]:25, delay=0.55, delays=0.04/0.01/0.26/0.25, dsn=2.0.0, status=sent (250 2.0.0 Ok: queued as 8A94D80000AC)

Aug 28 11:02:46 rfronteau-laptop postfix/qmgr[496]: C5FFA6800CD: removed
~~~~

On a bien un retour de statut OK

Allons voir la boîte de test Orange

[![](../assets/media/supervision/postfix-boite_email-test.png@w=700)](../_detail/supervision/postfix-boite_email-test.png@id=infra%253Apostfix.html "supervision:postfix-boite_email-test.png")

Notre courrier est bien arrivé à destination.

Explication du main.cf {#explication-du-maincf .sectionedit7}
----------------------

La configuration de postfix n’est pas compliqué en soit, il y a juste 3
paramètres à modifier pour une configuration de type minimal =⇒ j’envoie
un mail à mon serveur smtp qui lui route ça sur ma boîte mail.

Ces 3 paramètres sont :

-   **myhostname**

Le nom du myhostname doit être équivalent au nom de votre machine (nom
qu’on retrouve dans /etc/hosts ou /etc/hostname). Pas mal de serveur de
messagerie auront des règles de vérification et de mise au rebus de
mails véreux. Il vaut mieux mettre votre nom de domaine en complément du
nom machine comme l’exemple ci-dessous:

Notre machine s’appelle “Serv\_Nagios01” Le domaine de notre société
s’appelle ….. aller pour l’exemple prenons le domaine monitoring-fr.org

Le myhostname devra être: myhostname =
**Serv\_Nagios01.monitoring-fr.org**

-   **mydestination**

Le mydestinitation doit être identique au myhostname. En aucun cas c’est
2 valeurs doivent être différentes car ça ne fonctionnera pas ou plus.

Le mydestination devra être: mydestination =
**Serv\_Nagios01.monitoring-fr.org**, localhost.localdomain, localhost

-   **relayhost**

le relayhost sert à renseigner l’IP ou le nom DNS du serveur de
messagerie utiliser pour router votre courrier.

**Bien vérifier que le nom DNS répond au ping !**

Pour l’exemple on pendra le SMTP de free: smtp.free.fr Le relayshost
devra être: relayhost = **smtp.free.fr**

Voilà comment avoir une configuration postfix minimale et fonctionnelle.

Ça ne fonctionne toujours pas ? {#ca-ne-fonctionne-toujours-pas .sectionedit8}
-------------------------------

Au sein d’une société parfois les stratégies de sécurité sont très
bridés donc quelques réflexes à avoir pour savoir si le port 25 n’est
pas bloquer.

-   Faire un ”*netstat -taupen*” sur votre serveur nagios pour voir si
    le port 25 est en écoute:

[![](../assets/media/supervision/postfix-netstat.png@w=700)](../_detail/supervision/postfix-netstat.png@id=infra%253Apostfix.html "supervision:postfix-netstat.png")

-   Rapprochez vous de l’administrateur réseau pour savoir si vous avez
    le droit de sortir via le port 25 de l’entreprise dans les cas où
    vous utilisez un serveur SMTP externe (FAI, Autre site externe au
    LAN …).

-   Assurez-vous que votre machine n’a pas de firewall.

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
    source](postfix@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](postfix@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](postfix@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](postfix@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](postfix@do=media.html "Gestionnaire de médias")
-   [Index](postfix@do=index.html "Index [X]")
-   [Connexion](postfix@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de page](postfix.html#dokuwiki__top "Haut de page [T]")

infra/postfix.txt · Dernière modification: 2013/03/29 09:39
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

![](../lib/exe/indexer.php@id=infra%253Apostfix&1424859534)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
