---
layout: page
---

[[[Installation de Ntop 3.3.10 sur
RedHat](ntop-install-redhat@do=backlink.html)]]

[wiki monitoring-fr.org](../../start.html "[ALT+H]")

![Logo Monitoring](../../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../../start.html "start") »
[Supervision](../start.html "supervision:start") »
[Ntop](start.html "supervision:ntop:start") » [Installation de Ntop
3.3.10 sur
RedHat](ntop-install-redhat.html "supervision:ntop:ntop-install-redhat")

### Table des matières {.toggle}

-   [Installation de Ntop 3.3.10 sur
    RedHat](ntop-install-redhat.html#installation-de-ntop-3310-sur-redhat)
    -   [Pré-requis](ntop-install-redhat.html#pre-requis)
    -   [Installation de
        Ntop](ntop-install-redhat.html#installation-de-ntop)
    -   [Configuration](ntop-install-redhat.html#configuration)
    -   [Ouverture du port
        3000](ntop-install-redhat.html#ouverture-du-port-3000)
    -   [Erreurs
        Eventuelles](ntop-install-redhat.html#erreurs-eventuelles)
        -   [configure: error: cannot find macro directory
            \`m4'](ntop-install-redhat.html#configureerrorcannot-find-macro-directory-m4)
        -   [Erreur de récupérer des archives
            suivants](ntop-install-redhat.html#erreur-de-recuperer-des-archives-suivants)
        -   [ntop.h:417:19: error: evdns.h: No such file or
            directory](ntop-install-redhat.html#ntoph41719errorevdnshno-such-file-or-directory)

Installation de Ntop 3.3.10 sur RedHat {#installation-de-ntop-3310-sur-redhat .sectionedit1}
======================================

Cette page a été réalisé avec l’aide de :

  **Rôle**        **Nom**
  --------------- ------------------
  **Rédacteur**   Romuald FRONTEAU

Pré-requis {#pre-requis .sectionedit3}
----------

Pour l’installation de ntop, nous avons besoin de quelques packages pour
que l’installation soit une réussite.

~~~~ {.code}
yum install gcc gcc-c++ make libpcap libpcap-devel gdbm-devel libgd-devel libpng-devel libtool libtool-libs rrdtool  rrdtool-devel libevent-devel intltool
~~~~

Installation de Ntop {#installation-de-ntop .sectionedit4}
--------------------

-   **Récupération des sources**

Nous allons télécharger les sources de Ntop pour les installer sur notre
machine.

~~~~ {.code}
wget http://dfn.dl.sourceforge.net/project/ntop/ntop/ntop-3.3.10/ntop-3.3.10.tar.gz
~~~~

-   **Compilation des sources**

Nous allons décompresser les sources puis compiler le tout.

~~~~ {.code}
tar -xvzf ntop-3.3.10.tar.gz

cd ntop-3.3.10

./autogen.sh --prefix=/usr/local/ntop --with-rrd-home=/chemin/de/votre/rrdtool

make

make install
~~~~

-   **Attribution des droits**

Pour le fonctionnement de ntop, nous allons devoir créer un utilisateur
dédié et mettre les bons droits aux répertoires de l’interface Web.

~~~~ {.code}
useradd -M -s /sbin/nologin -r ntop

chown -R ntop:root /usr/local/ntop/var/top
chown -R ntop:ntop /usr/local/ntop/share/
~~~~

Configuration {#configuration .sectionedit5}
-------------

-   **Paramétrage du compte admin Ntop**

~~~~ {.code}
/usr/local/ntop/bin/ntop -A
~~~~

Retour :

~~~~ {.code}
Wed Dec 23 16:53:57 2009  NOTE: Interface merge enabled by default
Wed Dec 23 16:53:57 2009  Initializing gdbm databases


ntop startup - waiting for user response!


Please enter the password for the admin user:
Please enter the password again:
Wed Dec 23 16:54:17 2009  Admin user password has been set
~~~~

-   **Démarrage de Ntop au boot**

Nous allons créer le démon ntop dans /etc/init.d/ntop avec le code
ci-dessous :

~~~~ {.code}
#!/bin/sh
#
# chkconfig: 2345 93 83
#
# description: This shell script takes care of starting and stopping ntop.
# Source function library.
. /etc/rc.d/init.d/functions

# Source networking configuration.
. /etc/sysconfig/network

prog="/usr/local/ntop/bin/ntop"
name=ntop

# Check that networking is up.
[ ${NETWORKING} = "no" ] && exit 0

! [ -x $prog ] && echo $prog not found, aborting && exit 1


start () {
  # start daemon
  echo -n $"Starting $name: "
#NOTE:  You most likely will have to fix this up to reflect your network.
#       Do not run ntop until you have read the docs/1STRUN.txt file to set
#       the admin password!
  daemon $prog -d -L -u ntop -P /usr/local/ntop/var/ntop --skip-version-check --use-syslog=daemon
  RETVAL=$?
  echo
  [ $RETVAL = 0 ] && touch /var/lock/subsys/ntop
  return $RETVAL
}

stop () {
  # stop daemon
  echo -n $"Stopping $name: "
  killproc ntop
  RETVAL=$?
  echo
  [ $RETVAL = 0 ] && rm -f /var/lock/subsys/ntop
  return $RETVAL
}

restart () {
  stop
  start
}

case "$1" in
  start)
    start
  ;;

  stop)
    stop
  ;;

  restart)
    restart
  ;;

  condrestart)
    [ -f /var/lock/subsys/ntop ] && restart || :
  ;;

  status)
    status ntop
  ;;
  *)
    echo $"Usage: $0 {start|stop|restart|condrestart|status}"
    exit 1
esac

exit $RETVAL
~~~~

Ensuite, planifions le démarrage automatique du démon au boot du
serveur.

~~~~ {.code}
chkconfig --add ntop
~~~~

Votre Ntop est maintenant accessible à l’url suivante :
<http://ip_serv_ntop:3000>

Ouverture du port 3000 {#ouverture-du-port-3000 .sectionedit6}
----------------------

Editez le fichier /etc/sysconfig/iptables :

~~~~ {.code}
# vi /etc/sysconfig/iptables
~~~~

Ajoutez la ligne suivante :

~~~~ {.code}
-A RH-Firewall-1-INPUT -m state --state NEW -m tcp -p tcp --dport 3000 -j ACCEPT
~~~~

Sauvegader et redémarrer le firewall :

~~~~ {.code}
# service iptables restart
~~~~

Erreurs Eventuelles {#erreurs-eventuelles .sectionedit7}
-------------------

### configure: error: cannot find macro directory \`m4' {#configureerrorcannot-find-macro-directory-m4 .sectionedit8}

Le problème apparaît dans la version 3.3.10 de ntop et vient tout
bonnement du fait qu’il manque un répertoire dans l’archive des sources.
Voous aurez juste à faire dans votre répertoire ntop-3.3.10 :

~~~~ {.code}
mkdir m4
~~~~

### Erreur de récupérer des archives suivants {#erreur-de-recuperer-des-archives-suivants .sectionedit9}

Dans le autogen.sh, cette erreur se produit si votre machine ne possède
pas internet. Il faudra récupérer :

-   GeoIP.tar.gz
-   GeoIPASNum.dat.gz
-   GeoLiteCity.dat.gz
-   lua-5.1.4.tar.gz

Et les coller dans le répertoire source ntop-3.3.10 et relancer le
autogen.sh

### ntop.h:417:19: error: evdns.h: No such file or directory {#ntoph41719errorevdnshno-such-file-or-directory .sectionedit10}

L’erreur est dû à une version trop vieille de votre librairies libevent.
Il faut une version \>= 1.4

SOMMAIRE {#sommaire .sectionedit1}
--------

**[Accueil](../../start.html "start")**

**[Supervision](../start.html "supervision:start")**

-   [Nagios](../../nagios/start.html "nagios:start")
-   [Centreon](../../centreon/start.html "centreon:start")
-   [Shinken](../../shinken/start.html "shinken:start")
-   [Zabbix](../../zabbix/start.html "zabbix:start")
-   [OpenNMS](../../opennms/start.html "opennms:start")
-   [EyesOfNetwork](../../eyesofnetwork/start.html "eyesofnetwork:start")
-   [Groundwork](../../groundwork/start.html "groundwork:start")
-   [Zenoss](../../zenoss/start.html "zenoss:start")
-   [Vigilo](../../vigilo/start.html "vigilo:start")
-   [Icinga](../../icinga/start.html "icinga:start")
-   [Cacti](../../cacti/start.html "cacti:start")
-   [Ressenti utilisateur](../eue/start.html "supervision:eue:start")
-   [Ressenti utilisateur avec
    sikuli](../../sikuli/eue/start.html "sikuli:eue:start")

**[Hypervision](../../hypervision/start.html "hypervision:start")**

-   [Canopsis](../../canopsis/start.html "canopsis:start")

**[Sécurité](../../securite/start.html "securite:start")**

**[Infrastructure](../../infra/start.html "infra:start")**

**[Développement](../../dev/start.html "dev:start")**

Supervision {#supervision .sectionedit1}
-----------

-   [Commandes pour la
    supervision](../commands.html "supervision:commands")
-   [Dstat](../dstat.html "supervision:dstat")
-   [Installer ou activer
    SNMP](../snmp-install.html "supervision:snmp-install")
-   [Mode actif](../actif.html "supervision:actif")
-   [Mode passif](../passif.html "supervision:passif")
-   [Ntop](start.html "supervision:ntop:start")
-   [Panorama](../links.html "supervision:links")
-   [RRDTool](../rrdtool.html "supervision:rrdtool")
-   [SNMP](../snmp.html "supervision:snmp")
-   [Supervision Hardware IPMI](../ipmi.html "supervision:ipmi")
-   [Supervision du ressenti
    utilisateur](../eue/start.html "supervision:eue:start")
-   [Tableaux récapitulatifs des différents fichiers
    importants](../important-files.html "supervision:important-files")

-   [Afficher le texte
    source](ntop-install-redhat@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](ntop-install-redhat@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](ntop-install-redhat@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](ntop-install-redhat@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](ntop-install-redhat@do=media.html "Gestionnaire de médias")
-   [Index](ntop-install-redhat@do=index.html "Index [X]")
-   [Connexion](ntop-install-redhat@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de
    page](ntop-install-redhat.html#dokuwiki__top "Haut de page [T]")

supervision/ntop/ntop-install-redhat.txt · Dernière modification:
2013/03/29 09:39 (modification externe)

[![CC Attribution-Noncommercial-Share Alike 3.0
Unported](../../lib/images/license/button/cc-by-nc-sa.png)](http://creativecommons.org/licenses/by-nc-sa/3.0/)

[![www.chimeric.de](../../lib/tpl/arctic/images/button-chimeric-de.png)](http://www.chimeric.de "www.chimeric.de")
[![Valid
CSS](../../lib/tpl/arctic/images/button-css.png)](http://jigsaw.w3.org/css-validator/check/referer "Valid CSS")
[![Driven by
DokuWiki](../../lib/tpl/arctic/images/button-dw.png)](http://wiki.splitbrain.org/wiki:dokuwiki "Driven by DokuWiki")
[![do yourself a favour and use a real browser - get
firefox!!](../../lib/tpl/arctic/images/button-firefox.png)](http://www.firefox-browser.de "do yourself a favour and use a real browser - get firefox")
[![Recent changes RSS
feed](../../lib/tpl/arctic/images/button-rss.png)](../../feed.php "Recent changes RSS feed")
[![Valid XHTML
1.0](../../lib/tpl/arctic/images/button-xhtml.png)](http://validator.w3.org/check/referer "Valid XHTML 1.0")

![](../../lib/exe/indexer.php@id=supervision%253Antop%253Antop-install-redhat&1424859561)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
