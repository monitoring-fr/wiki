---
layout: page
title: 'Installation de Ntop 3.3.10 sur RedHat'
---

Cette page a été réalisé avec l’aide de :

  **Rôle**        **Nom**
  --------------- ------------------
  **Rédacteur**   Romuald FRONTEAU

Pré-requis {#pre-requis .sectionedit3}
----------

Pour l’installation de ntop, nous avons besoin de quelques packages pour
que l’installation soit une réussite.

~~~
yum install gcc gcc-c++ make libpcap libpcap-devel gdbm-devel libgd-devel libpng-devel libtool libtool-libs rrdtool  rrdtool-devel libevent-devel intltool
~~~

Installation de Ntop {#installation-de-ntop .sectionedit4}
--------------------

-   **Récupération des sources**

Nous allons télécharger les sources de Ntop pour les installer sur notre
machine.

~~~
wget http://dfn.dl.sourceforge.net/project/ntop/ntop/ntop-3.3.10/ntop-3.3.10.tar.gz
~~~

-   **Compilation des sources**

Nous allons décompresser les sources puis compiler le tout.

~~~
tar -xvzf ntop-3.3.10.tar.gz

cd ntop-3.3.10

./autogen.sh --prefix=/usr/local/ntop --with-rrd-home=/chemin/de/votre/rrdtool

make

make install
~~~

-   **Attribution des droits**

Pour le fonctionnement de ntop, nous allons devoir créer un utilisateur
dédié et mettre les bons droits aux répertoires de l’interface Web.

~~~
useradd -M -s /sbin/nologin -r ntop

chown -R ntop:root /usr/local/ntop/var/top
chown -R ntop:ntop /usr/local/ntop/share/
~~~

Configuration {#configuration .sectionedit5}
-------------

-   **Paramétrage du compte admin Ntop**

~~~
/usr/local/ntop/bin/ntop -A
~~~

Retour :

~~~
Wed Dec 23 16:53:57 2009  NOTE: Interface merge enabled by default
Wed Dec 23 16:53:57 2009  Initializing gdbm databases


ntop startup - waiting for user response!


Please enter the password for the admin user:
Please enter the password again:
Wed Dec 23 16:54:17 2009  Admin user password has been set
~~~

-   **Démarrage de Ntop au boot**

Nous allons créer le démon ntop dans /etc/init.d/ntop avec le code
ci-dessous :

~~~
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
~~~

Ensuite, planifions le démarrage automatique du démon au boot du
serveur.

~~~
chkconfig --add ntop
~~~

Votre Ntop est maintenant accessible à l’url suivante :
<http://ip_serv_ntop:3000>

Ouverture du port 3000 {#ouverture-du-port-3000 .sectionedit6}
----------------------

Editez le fichier /etc/sysconfig/iptables :

~~~
# vi /etc/sysconfig/iptables
~~~

Ajoutez la ligne suivante :

~~~
-A RH-Firewall-1-INPUT -m state --state NEW -m tcp -p tcp --dport 3000 -j ACCEPT
~~~

Sauvegader et redémarrer le firewall :

~~~
# service iptables restart
~~~

Erreurs Eventuelles {#erreurs-eventuelles .sectionedit7}
-------------------

### configure: error: cannot find macro directory \`m4' {#configureerrorcannot-find-macro-directory-m4 .sectionedit8}

Le problème apparaît dans la version 3.3.10 de ntop et vient tout
bonnement du fait qu’il manque un répertoire dans l’archive des sources.
Voous aurez juste à faire dans votre répertoire ntop-3.3.10 :

~~~
mkdir m4
~~~

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