---
layout: page
title: Installation de Oinkmaster sur Ubuntu
---

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

~~~
$ sudo wget http://prdownloads.sourceforge.net/oinkmaster/oinkmaster-2.0.tar.gz?download
$ sudo tar –zxf oinkmaster-2.0.tar.gz
$ sudo cd oinkmaster.2.0
$ sudo cp oinkmaster.pl /usr/local/bin
$ sudo cp oinkmaster.conf /etc/snort
~~~

Configuration {#configuration .sectionedit4}
-------------

Le fichier de configuration de Oinkmaster :

~~~
$ sudo vim /etc/snort/oinkmaster.conf
~~~

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

~~~
$ sudo vim /etc/snort/oinkmaster.conf
~~~

Dans ce fichier, il faut alors définir le ou les url de mises à jour des
règles. Pour les règles de SNORT, l’url nécessite le code oink.

~~~
http://www.snort.org/pub-in/oinkmaster.cgi/<oinkcode>/snortrules-snapshot-x.x.tar.gz
~~~

Soit un exemple plus concret :

~~~
http://www.snort.org/pub-in/oinkmaster.cgi/8515c042b41ad0a2170373bf41a5d5e42e01df7f/snortrules-snapshot-2.8.tar.gz
~~~

Pour les règles Emerging, pas besoin de code, l’url est donc plus simple
à déclarée.

~~~
http://emergingthreats.net/rules/emerging.rules.tar.gz
~~~

Ces deux url sont à ajouter au fichier oinkmaster, chacune précédée par
un « url = ». Exemple:

~~~
url = http://www.snort.org/pub-in/oinkmaster.cgi/8515c042b41ad0a2170373bf41a5d5e42e01df7f/snortrules-snapshot-2.8.tar.gz
url = http://emergingthreats.net/rules/emerging.rules.tar.gz
~~~

### Optimisation {#optimisation .sectionedit6}

#### Exclure des fichiers de la mise à jour {#exclure-des-fichiers-de-la-mise-a-jour}

Par défaut, certains fichiers de Snort (règles, …) sont conservés, et
protégés de toute nouvelle mise à jour. Ainsi, par exemple,
**snort.conf** est exclu de la mise à jour, ce qui permet de conserver
notamment les paramètres du fichier de configuration. Si jamais une
nouvelle version du fichier était téléchargé, toutes les données
seraient perdues, car réécrite par le nouveau. Pour éviter cela, il faut
éditer le fichier de configuration de Oinkmaster :

~~~
skipfile local.rules
~~~

Ici, le fichier **local.rules** est exclu de la mise à jour.

Utilisation {#utilisation .sectionedit7}
-----------

Pour lancer la mise à jour des règles.

~~~
$ sudo /usr/local/bin/oinkmaster.pl –C /etc/snort/oinkmaster –o /etc/snort/rules –b /etc/snort/rules_backup
~~~

Afin d’automatiser les mises à jour, il est possible d’utiliser Cron :

~~~
$ sudo crontab -e -u root
~~~

Et y ajouter cette ligne :

~~~
00 11 * * * /usr/local/bin/oinkmaster.pl -C /etc/snort/oinkmaster -o /etc/snort/rules -b /etc/snort/rules_backup
~~~

Elle permet ainsi d’automatiser la mise à jour quotidienne, par exemple,
à 11h00.

Le fichier ainsi créé se trouve dans :

~~~
$ sudo vim /var/spool/cron/crontabs/root 
~~~