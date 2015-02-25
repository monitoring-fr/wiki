---
layout: page
---

### Table des matières {.toggle}

-   [Installation de Shinken sur Ubuntu
    server](shinken-ubuntu-install-with-nagios.html#installation-de-shinken-sur-ubuntu-server)
    -   [Pré Requis](shinken-ubuntu-install-with-nagios.html#pre-requis)
    -   [Installation](shinken-ubuntu-install-with-nagios.html#installation)
        -   [Installation par
            script](shinken-ubuntu-install-with-nagios.html#installation-par-script)
        -   [Bugs
            connus](shinken-ubuntu-install-with-nagios.html#bugs-connus)
        -   [Finalisation de
            l'Installation](shinken-ubuntu-install-with-nagios.html#finalisation-de-l-installation)
        -   [Test de bon
            fonctionnement](shinken-ubuntu-install-with-nagios.html#test-de-bon-fonctionnement)

Installation de Shinken sur Ubuntu server {#installation-de-shinken-sur-ubuntu-server .sectionedit1}
=========================================

L’installation présentée ci dessous a été effectuée sur un serveur
Ubuntu 8.04 (oui, c’est pas récent :)), il est possible que certaines
commandes indiquées soient différentes ou bien inutiles. Cette
installation suppose d’avoir déjà installé Nagios si ce n’est pas le
cas, allez plutôt voir cette
[page](../../../shinken/shinken-ubuntu-install.html "shinken:shinken-ubuntu-install")
(sera bientôt mise à jour).

Un peu de connaissance sur Nagios est requise pour que l’installation se
déroule correctement

Tout au long de l’installation on est supposé être root. Si ce n’est pas
le cas faite des sudo

Pré Requis {#pre-requis .sectionedit2}
----------

Il faut avoir installé un minimum de chose sur votre distribution pour
installer les pré requis (build-essentials par exemple).

Les paquets suivants doivent être installés :

~~~
apt-get install python python-dev python-setuptools pyro  python-mysqldb python-json python-sqlite
~~~

Paquets pouvant être utiles :

~~~
apt-get install git-core 
~~~

Installation de Multiprocessing pyro :

~~~
wget http://pypi.python.org/packages/source/m/multiprocessing/multiprocessing-2.6.2.1.tar.gz
tar -xzf multiprocessing-2.6.2.1.tar.gz
cd multiprocessing-2.6.2.1
python setup.py install
~~~

Il est temps de dire au revoir à votre Nagios et de l’arrêter (snif).
Supprimez le du démarrage si nécéssaire. (/etc/init.d/nagios stop et
update-rc.d nagios remove)

Pensez à faire un backup de votre configuration de Nagios et tout ce que
vous jugez nécessaire. La direction n’est pas responsable des commandes
entrées :).

Installation {#installation .sectionedit3}
------------

C’est la que l’existence de Nagios rentre en compte et que vous avez un
certain choix. Ici, il a été choisi d’installer Shinken dans
l’arborescence Nagios pour une migration plus facile. Si cela vous fait
bondir, changez le. Autre choix réalisé, l’installer avec un utilisateur
Nagios. Encore une fois la raison est le coup de migration. Dans le cas
de l’utilisation de Nagios dans un environnement de production, nagios
peut être très dépendant sur le reste. Le fait de devoir changer
l’utilisateur en shinken peut être fastidieux dans un environnement
“sécurisé” (gestion de droits etc)

Parenthèse fermée, passons à l’installation de Shinken.

Récupération des sources Shinken les plus récentes (0.6.5 à ce jour) :

~~~
wget http://shinken-monitoring.org/pub/shinken-0.6.5.tar.gz
tar -xvf shinken-0.6.5.tar.gz
cd shinken-0.6.5
~~~

Il est conseillé de recupérer les sources depuis le
[GIT](https://github.com/naparuba/shinken "https://github.com/naparuba/shinken"),
elles seront toujours au moins autant à jour que le lien précédent. Si
vous ne voulez pas risquer de télécharger des version + (en
developpement) ne l’utilisez pas bien sur ;)

### Installation par script {#installation-par-script .sectionedit4}

A l’aide votre éditeur préféré, vous allez pouvoir modifier les chemins
d’installation. Dans setup.cfg :

~~~
[install]
#sysconfigdir = /usr/local/nagios/
etc-path=/usr/local/nagios/etc
var-path=/usr/local/nagios/var
plugins-path=/usr/local/nagios/libexec
~~~

Le chemin par défaut des plugins n’est peut être pas celui la. Pensez à
adapter au besoin

Il faut aussi modifier l’utilisateur par défaut si vous avez choisi de
garder nagios. Dans setup.py :

~~~
DEFAULT_OWNER = 'nagios'
DEFAULT_GROUP = 'nagios'
~~~

Maintenant on peut lancer l’installation :

~~~
python setup.py install --install-scripts=/usr/local/nagios/bin
~~~

### Bugs connus {#bugs-connus .sectionedit5}

L’installation faite est assez personnalisée, à ce jour, elle ne se fait
pas exactement comme il faudrait. Pour garder le style Nagios, il faut
effectuer quelques copies. Vous pouvez verifier avant d’effectuer la
copie que le fichiers ne sont pas dans le dossier de destination ;)

~~~
 
cp -R /etc/shinken/* /usr/local/nagios/etc
cp -R /var/lib/shinken/* /usr/local/nagios/var/
cp  libexec/* /usr/local/nagios/libexec

rm -rf /etc/shinken
rm -rf /var/lib/shinken
rm -rf /usr/lib/shinken/
~~~

Pensez à vérifier les copies avant suppression.

L’installation ne modifie pas tous les fichiers correctement. Il faut
modifier le fichier commands.cfg et remplacer chaque occurrence
\$PLUGINSDIR\$ par \$USER1\$ (cf resource.cfg) Sinon, on peut taper la
ligne suivante :

~~~
sed -i -e "s/\$PLUGINSDIR/\$USER1/g" /usr/local/nagios/etc/commands.cfg
~~~

qui le fait automatiquement :)

### Finalisation de l'Installation {#finalisation-de-l-installation .sectionedit6}

Pensez à modifier les droits et les propriétaires sur les dossiers :

~~~
chmod -R 755 /usr/local/nagios/
chown -R nagios:nagios /usr/local/nagios/
~~~

Il est possible que certains plugins que vous aviez sous Nagios doivent
avoir des droits / propriétaires différents pour s’exécuter correctement

Si vous aviez check\_icmp et check\_dhcp alors il faudra modifier leur
droits.

~~~
chown root:nagios /usr/local/nagios/libexec/check_icmp  
chown root:nagios /usr/local/nagios/libexec/check_dhcp
chmod u+s /usr/local/nagios/libexec/check_icmp
chmod u+s /usr/local/nagios/libexec/check_dhcp
~~~

### Test de bon fonctionnement {#test-de-bon-fonctionnement .sectionedit7}

On peut lancer shinken via la commande suivante:

~~~
/etc/init.d/shinken restart
~~~

Elle effectue le démarrage de chaque élément de Shinken ainsi qu’une
vérification de conf.

Le fichier de log se trouve dans /usr/local/nagios/var/. Si vous
regardez les logs, vous devriez avoir quelques warnings. Si vous n’avez
pas les plugins Nagios installés, vous devriez avoir des erreurs.

Vous pouvez passer maintenant à la modification de nagios.cfg pour
intégrer votre ancienne conf Nagios.

Pensez bien à lire la [documentation
officielle](http://www.shinken-monitoring.org/wiki/official/start "http://www.shinken-monitoring.org/wiki/official/start")
pour savoir les paramètres inutilisés / non implémentés ;)
