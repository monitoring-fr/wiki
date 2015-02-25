---
layout: page
---

[[[Installation de Shinken sur Ubuntu
server](shinken-ubuntu-install-with-nagios@do=backlink.html)]]

[wiki monitoring-fr.org](../start.html "[ALT+H]")

![Logo Monitoring](../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../start.html "start") »
[Shinken](start.html "shinken:start") » [Installation de Shinken sur
Ubuntu
server](shinken-ubuntu-install-with-nagios.html "shinken:shinken-ubuntu-install-with-nagios")

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
[page](shinken-ubuntu-install.html "shinken:shinken-ubuntu-install")
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

~~~~ {.code}
apt-get install python python-dev python-setuptools pyro  python-mysqldb python-json python-sqlite
~~~~

Paquets pouvant être utiles :

~~~~ {.code}
apt-get install git-core 
~~~~

Installation de Multiprocessing pyro :

~~~~ {.code}
wget http://pypi.python.org/packages/source/m/multiprocessing/multiprocessing-2.6.2.1.tar.gz
tar -xzf multiprocessing-2.6.2.1.tar.gz
cd multiprocessing-2.6.2.1
python setup.py install
~~~~

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

~~~~ {.code}
wget http://shinken-monitoring.org/pub/shinken-0.6.5.tar.gz
tar -xvf shinken-0.6.5.tar.gz
cd shinken-0.6.5
~~~~

Il est conseillé de recupérer les sources depuis le
[GIT](https://github.com/naparuba/shinken "https://github.com/naparuba/shinken"),
elles seront toujours au moins autant à jour que le lien précédent. Si
vous ne voulez pas risquer de télécharger des version + (en
developpement) ne l’utilisez pas bien sur ;)

### Installation par script {#installation-par-script .sectionedit4}

A l’aide votre éditeur préféré, vous allez pouvoir modifier les chemins
d’installation. Dans setup.cfg :

~~~~ {.code}
[install]
#sysconfigdir = /usr/local/nagios/
etc-path=/usr/local/nagios/etc
var-path=/usr/local/nagios/var
plugins-path=/usr/local/nagios/libexec
~~~~

Le chemin par défaut des plugins n’est peut être pas celui la. Pensez à
adapter au besoin

Il faut aussi modifier l’utilisateur par défaut si vous avez choisi de
garder nagios. Dans setup.py :

~~~~ {.code}
DEFAULT_OWNER = 'nagios'
DEFAULT_GROUP = 'nagios'
~~~~

Maintenant on peut lancer l’installation :

~~~~ {.code}
python setup.py install --install-scripts=/usr/local/nagios/bin
~~~~

### Bugs connus {#bugs-connus .sectionedit5}

L’installation faite est assez personnalisée, à ce jour, elle ne se fait
pas exactement comme il faudrait. Pour garder le style Nagios, il faut
effectuer quelques copies. Vous pouvez verifier avant d’effectuer la
copie que le fichiers ne sont pas dans le dossier de destination ;)

~~~~ {.code}
 
cp -R /etc/shinken/* /usr/local/nagios/etc
cp -R /var/lib/shinken/* /usr/local/nagios/var/
cp  libexec/* /usr/local/nagios/libexec

rm -rf /etc/shinken
rm -rf /var/lib/shinken
rm -rf /usr/lib/shinken/
~~~~

Pensez à vérifier les copies avant suppression.

L’installation ne modifie pas tous les fichiers correctement. Il faut
modifier le fichier commands.cfg et remplacer chaque occurrence
\$PLUGINSDIR\$ par \$USER1\$ (cf resource.cfg) Sinon, on peut taper la
ligne suivante :

~~~~ {.code}
sed -i -e "s/\$PLUGINSDIR/\$USER1/g" /usr/local/nagios/etc/commands.cfg
~~~~

qui le fait automatiquement :)

### Finalisation de l'Installation {#finalisation-de-l-installation .sectionedit6}

Pensez à modifier les droits et les propriétaires sur les dossiers :

~~~~ {.code}
chmod -R 755 /usr/local/nagios/
chown -R nagios:nagios /usr/local/nagios/
~~~~

Il est possible que certains plugins que vous aviez sous Nagios doivent
avoir des droits / propriétaires différents pour s’exécuter correctement

Si vous aviez check\_icmp et check\_dhcp alors il faudra modifier leur
droits.

~~~~ {.code}
chown root:nagios /usr/local/nagios/libexec/check_icmp  
chown root:nagios /usr/local/nagios/libexec/check_dhcp
chmod u+s /usr/local/nagios/libexec/check_icmp
chmod u+s /usr/local/nagios/libexec/check_dhcp
~~~~

### Test de bon fonctionnement {#test-de-bon-fonctionnement .sectionedit7}

On peut lancer shinken via la commande suivante:

~~~~ {.code}
/etc/init.d/shinken restart
~~~~

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

SOMMAIRE {#sommaire .sectionedit1}
--------

**[Accueil](../start.html "start")**

**[Supervision](../supervision/start.html "supervision:start")**

-   [Nagios](../nagios/start.html "nagios:start")
-   [Centreon](../centreon/start.html "centreon:start")
-   [Shinken](start.html "shinken:start")
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

Shinken {#shinken .sectionedit1}
-------

-   [Comment activer et utiliser le module
    livestatus](enable_livestatus_module.html "shinken:enable_livestatus_module")
-   [Configuration et
    lancement](shinken-architecture-config.html "shinken:shinken-architecture-config")
-   [Fonctionnement de
    Shinken](shinken-work.html "shinken:shinken-work")
-   [Instalation de shinken les yeux
    fermés](shinken-10min-start.html "shinken:shinken-10min-start")
-   [Installation Shinken 0.8 sur Debian
    Squeeze](shinken-debian-squeeze-install.html "shinken:shinken-debian-squeeze-install")
-   [Installation de Shinken par
    script](install-script.html "shinken:install-script")
-   [Installation de Shinken sur
    CentOS](shinken-centos-install.html "shinken:shinken-centos-install")
-   [Installation de Shinken sur Debian
    Lenny](shinken-debian-install.html "shinken:shinken-debian-install")
-   [Installation de Shinken sur Ubuntu
    server](shinken-ubuntu-install-with-nagios.html "shinken:shinken-ubuntu-install-with-nagios")
-   [Installation de Shinken sur Ubuntu server 10.04
    LTS](shinken-ubuntu-install.html "shinken:shinken-ubuntu-install")
-   [Interface Shinken](shinken-use-ui.html "shinken:shinken-use-ui")
-   [Introduction à
    Shinken](shinken-introduction.html "shinken:shinken-introduction")
-   [Les architectures avancées de
    Shinken](shinken-advanced-architecture.html "shinken:shinken-advanced-architecture")
-   [Ressources et Performances de
    Shinken](shinken-ressources.html "shinken:shinken-ressources")
-   [Shinken en haute disponiblité sur 2
    noeuds](shinken-ha-2noeuds.html "shinken:shinken-ha-2noeuds")

-   [Afficher le texte
    source](shinken-ubuntu-install-with-nagios@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](shinken-ubuntu-install-with-nagios@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](shinken-ubuntu-install-with-nagios@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](shinken-ubuntu-install-with-nagios@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](shinken-ubuntu-install-with-nagios@do=media.html "Gestionnaire de médias")
-   [Index](shinken-ubuntu-install-with-nagios@do=index.html "Index [X]")
-   [Connexion](shinken-ubuntu-install-with-nagios@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de
    page](shinken-ubuntu-install-with-nagios.html#dokuwiki__top "Haut de page [T]")

shinken/shinken-ubuntu-install-with-nagios.txt · Dernière modification:
2013/03/29 09:39 (modification externe)

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

![](../lib/exe/indexer.php@id=shinken%253Ashinken-ubuntu-install-with-nagios&1424859528)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
