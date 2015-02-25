---
layout: page
---

### Table des matières {.toggle}

-   [Données Nagios dans un
    ramdisk](ramdisk.html#donnees-nagios-dans-un-ramdisk)
    -   [Quels fichiers](ramdisk.html#quels-fichiers)
    -   [Création ramdisk](ramdisk.html#creation-ramdisk)

Données Nagios dans un ramdisk {#donnees-nagios-dans-un-ramdisk .sectionedit1}
==============================

Comme le suggère la documentation officielle de Nagios, il est possible
d’améliorer les performances de Nagios et notamment son interface Web
par le biais de l’utilisation d’un ram disk pour stocker différentes
informations. Les infos de création du ramdisk proviennent de ce
[mini-howto](http://www.vanemery.com/Linux/Ramdisk/ramdisk.html "http://www.vanemery.com/Linux/Ramdisk/ramdisk.html").

Quels fichiers {#quels-fichiers .sectionedit2}
--------------

Le fichier le plus évident à placer en ram disk est **status.dat**. Tout
simplement parce que ce fichier est temporaire par nature et utilisé par
les cgi de l’interface. L’autres est le **dossier rw** et le fichier de
pipe qu’il contient **nagios.cmd**. Il ne faut pas oublier le fichier
temp\_file duquel découle le fichier de status.

Les autres candidats sont :

-   objects.cache
-   objects.precache
-   retention.dat
-   check\_result\_path

Le répertoire check\_result\_path est important également : il contient
les fichiers de résultats de Nagios, ils sont tepoiraires mais peuvent
représenter beaucoup d’I/O disques. Les tests sur objects.precache ne
montre aucun gain sur le calcul de configuration appelé par

~~~
/usr/local/nagios/bin/nagios -vps /usr/local/nagios/etc/nagios.cfg
~~~

Dans le cadre d’une utilisation des données de performance par un
fichier temporaire, il est également intéressant de placer ce fichier
^[1)](ramdisk.html#fn__1)^ dans le ramdisk. C’est un fichier temporaire
par excellence

Création ramdisk {#creation-ramdisk .sectionedit3}
----------------

~~~
sudo mkdir /tmp/ramdisk0
sudo mkfs.ext3 /dev/ram0
sudo mount /dev/ram0 /tmp/ramdisk0
sudo chmod ugoa+rwx /tmp/ramdisk0
~~~

Ces commandes peuvent être intégrées à /etc/rc.local pour une création
automatique au démarrage.

Pour créer un ramdisk d’une taille de 256 Mo, il faut ajouter le
paramètre ramdisk\_size=256000 à /boot/grub/menu.lst comme suit :

~~~
kernel          /vmlinuz-2.6.15-51-server root=/dev/mapper/Ubuntu-root ro quiet splash ramdisk_size=256000
~~~

Une fois formatté, il y aura 243 Mo utilisable.

Une autre solution consiste à utiliser l’espace monté en mémoire
/dev/shm qui est présent sur toutes les distributions.

^[1)](ramdisk.html#fnt__1)^ service-perfdata sur mon install
