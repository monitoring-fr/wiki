---
layout: page
title: Redondance avec Heartbeat et Mon
---

1. Architecture générale {#architecture-generale .sectionedit2}
------------------------

[![](/assets/media/supervision/opennms/redondante-01.png)](/_detail/supervision/opennms/redondante-01.png@id=opennms%253Aredondance.html "supervision:opennms:redondante-01.png")

2. Description de la solution {#description-de-la-solution .sectionedit3}
-----------------------------

Le fonctionnement de la redondance décrite ici est le suivant :

-   Tous les équipements envoient leurs alarmes (traps SNMP) aux deux
    serveurs OpenNMS (Maître et esclave)
-   Les deux serveurs OpenNMS possèdent chacun 2 cartes réseaux :
    -   eth0 qui est l’interface d’accès à OpenNMS
    -   eth1 qui est l’interface pour la liaison dédiée Heartbeat entre
        les deux serveurs
-   L’accès à l’application OpenNMS du serveur maître s’effectue à
    partir de l’adresse IP publique sur eth0
-   L’accès à l’application OpenNMS du serveur esclave s’effectue à
    partir de l’adresse IP publique sur eth0
-   L’accès à l’application OpenNMS du serveur en cours de
    fonctionnement (sans ce soucier du maître ou de l’esclave) est
    l’adresse IP virtuelle sur eth0

3. Scénario {#scenario .sectionedit4}
-----------

1.  L’adresse IP virtuelle est positionnée sur le serveur maître
2.  Un problème est détecté par Mon, il en informe Heartbeat qui va
    faire basculer l’adresse IP virtuelle sur le serveur esclave
3.  L’utilisateur, qui utilise l’adresse IP virtuelle pour accéder à
    OpenNMS, a juste besoin de se re-loger
4.  Le retour a la normal nécessite l’intervention de l’administrateur

4. Configuration des équipements {#configuration-des-equipements .sectionedit5}
--------------------------------

Les équipements doivent être configurés pour envoyer leurs alarmes
(traps SNMP) aux deux serveurs OpenNMS.

5. Heartbeat {#heartbeat .sectionedit6}
------------

Heartbeat permet de partager et de gérer l’allocation des ressources
entre plusieurs serveurs. Nous l’utiliserons ici pour partager une
adresse IP virtuelle entre deux serveurs. Le transfert de l’adresse IP
virtuelle entre le serveur maître et le serveur esclave s’effectue
lorsque le serveur maître ne répond plus au ping sur son interface
dédiée heartbeat.

### 5.1 Installation {#installation .sectionedit7}

Pour installer **Heartbeat** avec yum, tapez la commande suivante :

~~~
yum install heartbeat*
~~~

### 5.2 Configuration de Heartbeat {#configuration-de-heartbeat .sectionedit8}

Dans la configuration ci-dessous, le serveur **maître** possède le nom
de machine **MASTER-SERVER** et le serveur **esclave** possède le nom de
machine **SLAVE-SERVER**.

#### 5.2.1 Fichier authkeys

Le fichier authkeys permet au différents serveurs Heartbeat de
s’authentifier.

Une version du fichier est présente dans le répertoire
*/usr/share/doc/heartbeat-x.x.x*.

Copiez-le dans le répertoire */etc/ha.d* sur le serveur **maître** et
sur le serveur **esclave** et éditez-le pour qu’il contienne les
éléments ci-dessous :

~~~
auth 1
1 sha1 password
~~~

Remplacez **password** par le mot de passe de votre choix puis exécutez
la commande suivante :

~~~
chmod 600 /etc/ha.d/authkeys
~~~

#### 5.2.2 Fichier ha.cf {#fichier-hacf}

Le fichier **ha.cf** est le fichier de configuration générale de
Heartbeat.

Une version du fichier est présente dans le répertoire
*/usr/share/doc/heartbeat-x.x.x*.

Copiez ce fichier et placez-le dans le répertoire */etc/ha.d* sur le
serveur **maître** et sur le serveur **esclave** et éditez-le pour qu’il
contienne les éléments ci-dessous :

~~~
keepalive 2
deadtime 10
warntime 6
initdead 60

udpport 694

ucast eth1 IP_A_MODIFIER

auto_failback off

node    MASTER-SERVER
node    SLAVE-SERVER
~~~

**IP\_A\_MODIFIER** est à remplacer par :

-   *sur le serveur maître :* l’adresse IP du serveur esclave sur le
    lien dédié (par exemple 192.168.0.2)
-   *sur le serveur esclave :* l’adresse IP du serveur maître sur le
    lien dédié (par exemple 192.168.0.1)

#### 5.2.3 Fichier haresources

Le fichier **haresources** est le fichier de configuration qui contient
les ressources qui sont gérées par Heartbeat.

Une version du fichier est présente dans le répertoire
*/usr/share/doc/heartbeat-x.x.x*.

Copiez ce fichier et placez-le dans le répertoire */etc/ha.d* sur le
serveur **maître** et sur le serveur **esclave** et ajoutez les lignes
suivantes :

~~~
MASTER-SERVER IPaddr2::IP_A_MODIFIER
~~~

**IP\_A\_MODIFIER** est à remplacer par l’adresse IP virtuelle publique.
Celle-ci sera utilisé pour accéder au serveur OpenNMS.

6. Mon {#mon .sectionedit9}
------

Mon est utilisé pour piloter heartbeat en cas de défaillance logicielle.
Ceci permet d’ajouter la fonction de bascule de l’adresse IP virtuelle
en cas de problème logicielle.

### 6.1 Installation {#installation1 .sectionedit10}

Les packages rpm de **Mon** sont disponibles
[ici](http://dag.wieers.com/rpm/packages/mon/ "http://dag.wieers.com/rpm/packages/mon/").

### 6.2 Configuration {#configuration .sectionedit11}

*La configuration se compose :*

-   D’un fichier de configuration principal mon.cf ;
-   De script **monitor** dont le but est de tester une ressource (http,
    sql, …) ;
-   De script d’action lorsqu’un monitor détecte un problème. Dans le
    cas présent, l’arrêt de heartbeat sur le serveur qui pose problème
    permet de basculer l’adresse IP virtuelle ;

L’installation et la configuration de **Mon** est à réaliser uniquement
sur le serveur **maître**. Le paquet perl-DBD-Pg est nécessaire pour le
bon fonctionnement du monitor sql. Pour un serveur 32bits :

~~~
yum install perl-DBD-Pg.i386
~~~

#### 6.2.1 Fichier mon.cf {#fichier-moncf}

Créer le fichier */etc/mon/mon.cf* suivant sur le serveur **maître** :

~~~
### global options
cfbasedir   = /etc/mon
pidfile     = /var/run/mon.pid
statedir    = /var/lib/mon/state.d
logdir      = /var/lib/mon/log.d
dtlogfile   = /var/lib/mon/log.d/downtime.log
alertdir    = /usr/lib/mon/alert.d
mondir      = /usr/lib/mon/mon.d
maxprocs    = 20
histlength  = 100
randstart   = 60s
authtype    = pam
userfile    = /etc/mon/userfile

### group definitions (hostnames or IP addresses)
hostgroup servers localhost

watch servers
   service http
        interval 1m
        monitor http.monitor -p 8980 -u /opennms
        period wd {Mon-Sun}
          alertevery 1m
          alert http-master-notrunning.alert
    service postgresql
        interval 1m
        monitor sql.monitor --mode postgresql --username=opennms --database=opennms
        period wd {Mon-Sun}
          alertevery 1m
          alert pgsql-master-notrunning.alert
~~~

#### 6.2.2 Fichier http.monitor {#fichier-httpmonitor}

Créer le fichier **http.monitor** dans le répertoire
*/usr/lib/mon/mon.d* :

~~~ {.code .perl}
#!/usr/bin/perl
#
# Use try to connect to a http server.
# For use with "mon".
#
# http.monitor [-p port] [-t secs] [-u url] [-a agent] [-o] host [host...]
#
#    -p port       TCP port to connect to (defaults to 80)
#    -t secs       timeout, defaults to 30
#    -u url        path to get, defaults to "/"
#    -a agent      User-Agent, default to "mon.d/http.monitor"
#    -o            omit http headers from healthy hosts
#    -m regex      match regex in response (header + content)
#
# Jon Meek
# American Cyanamid Company
# Princeton, NJ
#
# $Id: http.monitor,v 1.1.1.1.4.1 2007/05/08 11:05:48 trockij Exp $
#
#    Copyright (C) 1998, Jim Trocki
#
#    This program is free software; you can redistribute it and/or modify
#    it under the terms of the GNU General Public License as published by
#    the Free Software Foundation; either version 2 of the License, or
#    (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU General Public License for more details.
#
#    You should have received a copy of the GNU General Public License
#    along with this program; if not, write to the Free Software
#    Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
#
use Getopt::Std;
use English;
use Data::Dumper;
 
sub httpGET;
 
getopts ("p:t:u:a:m:o");
$PORT = $opt_p || 80;
$TIMEOUT = $opt_t || 30;
$URL = $opt_u || "/";
$USERAGENT = $opt_a || "mon.d/http.monitor";
$MATCHRE = $opt_m;
 
my %good;
my %bad;
 
exit 0 if (!@ARGV);
 
foreach my $host (@ARGV) {
    my $result = httpGET ($host, $PORT);
 
    if (!$result->{"ok"}) {
        $bad{$host} = $result;
    } else {
        $good{$host} = $result;
    }
}
 
my $ret;
 
if (keys %bad) {
    $ret = 1;
    print join (" ", sort keys %bad), "\n";
} else {
    $ret = 0;
    print "\n";
}
 
foreach my $h (keys %bad) {
    print "HOST $h: $bad{$h}->{error}\n";
    if ($bad{$h}->{"header"} ne "") {
    print $bad{$h}->{"header"}, "\n";
    }
    print "\n";
}
 
if (!$opt_o)
{
    foreach my $h (keys %good) {
    print "HOST $h: ok\n";
    print $good{$h}->{"header"}, "\n";
    print "\n";
    }
}
 
exit $ret;
 
 
sub httpGET {
    use Socket;
    use Sys::Hostname;
 
    my($Server, $Port) = @_;
    my($ServerOK, $TheContent);
 
    $TheContent = '';
 
    my $Path = $URL;
 
    my $result = {
        "ok" => 0,
    "error" => undef,
    "header" => undef,
    };
 
###############################################################
    eval {
    local $SIG{ALRM} = sub { die "Timeout Alarm" };
    alarm $TIMEOUT;
 
    my $err = &OpenSocket($Server, $Port); # Open a connection to the server
 
    if ($err ne "") { # Failure to open the socket
        $result = {
            "ok" => 0,
        "error" => $err,
        "header" => undef,
        };
 
        return undef;
    }
 
    print S "GET $Path HTTP/1.0\r\n";
    print S "Host: $Server\r\n";
    print S "User-Agent: $USERAGENT\r\n\r\n";
 
    while ($in = <S>) {
        $TheContent .= $in;  # Store data for later processing
    }
 
    close(S);
    alarm 0; # Cancel the alarm
    };
 
    ($result->{"header"}) = ($TheContent =~ /^(.*?)\r?\n\r?\n/s);
 
    if ($TheContent =~ /^HTTP\/([\d\.]+)\s+(200|30[12]|401)\b/) {
    $result->{"ok"} = 1;
    } else {
    $result->{"ok"} = 0;
    $result->{"error"} = "HTTP response code failure";
    }
 
    if ($MATCHRE ne "") {
    if ($TheContent =~ /$MATCHRE/s) {
        $result->{"ok"} = 1;
    } else {
        $result->{"ok"} = 0;
        $result->{"error"} = $error = "Regex match failed";
    }
    }
 
    if ($EVAL_ERROR and ($EVAL_ERROR =~ /^Timeout Alarm/)) {
    $result->{"ok"} = 0;
    $result->{"error"} = "timeout after $TIMEOUT seconds";
    }
 
    return $result;
}
 
#
# Make a Berkeley socket connection between this program and a TCP port
# on another (or this) host. Port can be a number or a named service
#
# returns "" on success, or an error string on failure
#
sub OpenSocket {
    my ($host, $port) = @_;
 
    my $proto = (getprotobyname('tcp'))[2];
 
    return ("could not get protocol") if (!defined $proto);
 
    my $conn_port;
 
    if ($port =~ /^\d+$/) {
        $conn_port = $port;
 
    } else {
    $conn_port = (getservbyname($port, 'tcp'))[2];
    return ("could not getservbyname for $port")
        if (!defined $conn_port);
    }
 
    my $host_addr = (gethostbyname($host))[4];
 
    return ("gethostbyname failure")
            if (!defined $host_addr);
 
    my $that = sockaddr_in ($conn_port, $host_addr);
 
    if (!socket (S, &PF_INET, &SOCK_STREAM, $proto)) {
        return ("socket: $!");
    }
 
    if (!connect (S, $that)) {
        return ("connect: $!");
    }
 
    select(S); $| = 1; select(STDOUT);
 
    "";
}
~~~

Ce fichier doit être en mode exécutable :

~~~
chmod -u+x http.monitor
~~~

#### 6.2.3 Fichier sql.monitor {#fichier-sqlmonitor}

Créer le fichier **sql.monitor** dans le répertoire */usr/lib/mon/mon.d*
:

~~~ {.code .perl}
#!/usr/bin/perl
#
# $Id: msql-mysql.monitor,v 1.1.1.1.4.1 2007/05/08 11:22:29 trockij Exp $
#
# arguments:
#
# [--mode [msql|mysql]] --username=username --password=password
#     --database=database --port=#
# hostname
#
# a monitor to determine if a mSQL or MySQL database server is operational
#
# Rather than use tcp.monitor to ensure that your SQL server is responding
# on the proper port, this attempts to connect to and list the databases
# on a given database server.
#
# The single argument, --mode [msql|mysql] is inferred from the script name
# if it is named mysql.monitor or msql.monitor.  Thus, the following two are
# equivalent:
#
# ln msql-mysql.monitor msql.monitor
# ln msql-mysql.monitor mysql.monitor
# msql.monitor hostname
# mysql.monitor hostname
#
# and
#
# msql-mysql.monitor --mode msql hostname
# msql-mysql.monitor --mode mysql hostname
#
# use the syntax that you feel more comfortable with.
#
# This monitor requires the perl5 DBI, DBD::mSQL and DBD::mysql modules,
# available from CPAN (http://www.cpan.org)
#
#    Copyright (C) 1998, ACC TelEnterprises
#    Written by James FitzGibbon <[email protected]
/*  */!function(){try{var t="currentScript"in document?document.currentScript:function(){for(var t=document.getElementsByTagName("script"),e=t.length;e--;)if(t[e].getAttribute("cf-hash"))return t[e]}();if(t&&t.previousSibling){var e,r,n,i,c=t.previousSibling,a=c.getAttribute("data-cfemail");if(a){for(e="",r=parseInt(a.substr(0,2),16),n=2;a.length-n;n+=2)i=parseInt(a.substr(n,2),16)^r,e+=String.fromCharCode(i);e=document.createTextNode(e),c.parentNode.replaceChild(e,c)}}}catch(u){}}();/*  */>
#
#    This program is free software; you can redistribute it and/or modify
#    it under the terms of the GNU General Public License as published by
#    the Free Software Foundation; either version 2 of the License, or
#    (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU General Public License for more details.
#
#    You should have received a copy of the GNU General Public License
#    along with this program; if not, write to the Free Software
#    Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
#
 
use DBI;
use Getopt::Long;
use POSIX ':signal_h';
 
my @details=();
my @failures=();
 
my $mask = POSIX::SigSet->new( SIGALRM );
my $action = POSIX::SigAction->new( 
       sub { die "connect timeout" },        # the handler code ref
       $mask,
       # not using (perl 5.8.2 and later) 'safe' switch or sa_flags
);
 
GetOptions( \%options, "mode=s", "port=i", "username=s", "password=s", "database=s", "timeout=i" );
 
# uncomment these two lines and provide suitable information if you don't
# want to pass sensitive information on the command line
#$options{username} ||= "username";
#$options{password} ||= "password";
 
$options{timeout} = 60 if ! $options{timeout};
 
if( $0 =~ m/\/msql\.monitor$/ || $options{mode} =~ m/msql/i ) { 
    $mode = "mSQL";
    $options{port} = 1114 if ! $options{port};
} elsif( $0 =~ m/\/mysql\.monitor/ || $options{mode} =~ m/mysql/i) {
    $mode = "mysql";
    $options{port} = 3306 if ! $options{port};
} elsif( $0 =~ m/\/postgresql\.monitor/ || $options{mode} =~ m/postgresql/i) {
    $mode = "Pg";
    $options{port} = 5432 if ! $options{port};
} else {
    print "invalid mode $mode!\n";
    exit 1;
}
 
for $host( @ARGV ) {
    my $dbh = 0;
    my $oldaction = POSIX::SigAction->new();
    sigaction( 'ALRM', $action, $oldaction );
    eval {
        alarm $options{timeout};
        if ($mode == "postgresql") {
            $dbh = DBI->connect( "DBI:$mode:dbname=$options{database};host=$host;port=$options{port}", "$options{username}", "$options{password}", { PrintError => 0 } );
        }
        else {
            $dbh = DBI->connect( "DBI:$mode:$options{database}:$host:$options{port}", $options{username}, $options{password}, { PrintError => 0 } );
        }     
        alarm 0;
    };
    alarm 0;
        sigaction( 'ALRM', $oldaction );
    if ($@) {
        push( @failures, $host);
        push( @details, "$host: Could not connect to $mode server on $options{port}: $@\n");
        next;
    } elsif( ! $dbh ) {
        push( @failures, $host);
            push( @details, "$host: Could not connect to $mode server on $options{port}: " . $DBI::errstr . "\n");
        next;
    }
    @tables = $dbh->tables();
    if( $#tables < 0 ) {
        push( @failures, $host);
        push( @details, "$host: No tables found for database $options{database}\n");
    }
    $dbh->disconnect();
}
 
if (@failures)
{
    print join (" ", sort @failures), "\n";
    print sort @details if (scalar @details > 0);
 
    exit 1;
 
}
 
else
{
    exit 0;
}
~~~

Ce fichier doit être en mode exécutable :

~~~
chmod -u+x sql.monitor
~~~

#### 6.2.4 Fichier http-master-notrunning.alert {#fichier-http-master-notrunningalert}

Créer le fichier **http-master-notrunning.alert** dans le répertoire
*/usr/lib/mon/alert.d* :

~~~ {.code .bash}
#!/bin/bash
 
/etc/init.d/heartbeat stop
~~~

Ce fichier doit être en mode exécutable :

~~~
chmod -u+x http-master-notrunning.alert
~~~

#### 6.2.5 pgsql-master-notrunning.alert {#pgsql-master-notrunningalert}

Créer le fichier **pgsql-master-notrunning.alert** dans le répertoire
*/usr/lib/mon/alert.d* :

~~~ {.code .bash}
#!/bin/bash
 
/etc/init.d/heartbeat stop
~~~

Ce fichier doit être en mode exécutable :

~~~
chmod -u+x pgsql-master-notrunning.alert
~~~