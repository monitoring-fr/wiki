---
layout: page
---

### Table des matières {.toggle}

-   [check\_jmx](check_jmx.html#check_jmx)

check\_jmx {#check_jmx .sectionedit1}
==========

1 / Récupérer le plugin check\_jmx vers le lien suivants:
[http://exchange.nagios.org/directory/Plugins/Java-Applications-and-Servers/check\_jmx/details](http://exchange.nagios.org/directory/Plugins/Java-Applications-and-Servers/check_jmx/details "http://exchange.nagios.org/directory/Plugins/Java-Applications-and-Servers/check_jmx/details")

2 / Créer le script shell check\_jmx

~~~
#!/bin/sh
#
# Nagios plugin to monitor Java JMX (http://java.sun.com/jmx)attributes.
# 
RDIR=`dirname $0`
OUTPUT=`/data/jdk/bin/java -cp $RDIR/jmxquery.jar org.nagios.JMXQuery $@`
EXIT_STATUS=$?
STATUS=`echo $OUTPUT`
VALUE=`echo $OUTPUT | awk '{print $NF}'`
echo "$STATUS | $VALUE"
#/app/jdk/bin/java -cp $RDIR/jmxquery.jar org.nagios.JMXQuery $@
#java -cp $RDIR/jmxquery.jar org.nagios.JMXQuery $@
~~~

ATTENTION a bien spécifier le chemin vers la commande java chez moi
c’est /data/jdk/bin/java

ATTENTION grâce à ce script shell vous pourrez grapher les données JMX
dans PNP4Nagios comme moi ou un autre grapheur !

3 / Le rendre executable avec un chmod oug+x

4 / Définir les variables JMX sur la WEBAPP dans le fichier setenv.sh du
tomcat

~~~
  
-Dcom.sun.management.jmxremote.port=%my.jmx.port% \
-Dcom.sun.management.jmxremote.ssl=false \
-Dcom.sun.management.jmxremote.authenticate=false
~~~

vi setenv.sh

~~~
# JMX
JAVA_OPTS="$JAVA_OPTS -XX:+UseConcMarkSweepGC
export JAVA_OPTS="$JAVA_OPTS -XX:ParallelGCThreads=32 -XX:+AggressiveOpts -XX:-UseParallelGC -XX:+UseTLAB
-XX:-DisableExplicitGC -XX:+ScavengeBeforeFullGC -XX:+UseFastAccessorMethods"
~~~

ou

~~~
# JMX
export JAVA_OPTS="$JAVA_OPTS -XX:ParallelGCThreads=2 -XX:+AggressiveOpts -XX:-UseParallelGC -XX:+UseTLAB -XX:-DisableExplicitGC -XX:+ScavengeBeforeFullGC -XX:+UseFastAccessorMethods -XX:+PrintGCDetails"
export CATALINA_OPTS="$CATALINA_OPTS -Dcom.sun.management.jmxremote.port=1620"
export CATALINA_OPTS="$CATALINA_OPTS -Dcom.sun.management.jmxremote.ssl=false"
export CATALINA_OPTS="$CATALINA_OPTS -Dcom.sun.management.jmxremote.authenticate=false"
~~~

ATTENTION a spécifier un port JMX ”%my.jmx.port%”, moi j’ai utilisé le
port 1620 les autres options servent a spécifier une authentification
JMX et/ou spécifier un certificat SSL. Personnellement je n’ai ni
utilisé d’authentification ni de certificats SSL.

5 / Redémarrer la JVM

4 / Définir les commandes dans le fichier nrpe.cfg

ATTENTION a spécifier l’IP du votre serveur TOMCAT

~~~
#### Définition d'un check_nb_thread
command[check_nb_thread_crm]=/usr/local/nagios//libexec/plugin/check_jmx -U service:jmx:rmi:///jndi/rmi://XXX.XXX.XXX.XXX:1620  /jmxrmi -O java.lang:type=Threading -A ThreadCount
~~~

~~~
#### Définition d'un check_nb_HeapMemoryUsage
command[check_HeapMemoryUsage_crm]=/usr/local/nagios//libexec/plugin/check_jmx -U service:jmx:rmi:///jndi/rmi://XXX.XXX.XXX.XXX:1620/jmxrmi -O java.lang:type=Memory -A HeapMemoryUsage -K used -vvv -w 90000000 -c 100000000
~~~

~~~
#### Définition d'un check_nb_NonHeapMemoryUsage
command[check_NonHeapMemoryUsage_crm]=/usr/local/nagios//libexec/plugin/check_jmx -U service:jmx:rmi:///jndi/rmi://XXX.XXX.XXX.XXX:1620/jmxrmi -O java.lang:type=Memory -A NonHeapMemoryUsage -K used -vvv -w 50000000 -c 80000000
~~~

~~~
#### Définition d'un check_nb_GCTime
command[check_GCTime_crm]=/usr/local/nagios//libexec/plugin/check_jmx -U service:jmx:rmi:///jndi/rmi://XXX.XXX.XXX.XXX:1620/jmxrmi -O java.lang:type=GarbageCollector,name=Copy -A CollectionTime -K used -vvv
~~~

~~~
#### Définition d'un check_nb_GCCount
command[check_GCCount_crm]=/usr/local/nagios//libexec/plugin/check_jmx -U service:jmx:rmi:///jndi/rmi://XXX.XXX.XXX.XXX:1620/jmxrmi -O java.lang:type=GarbageCollector,name=Copy -A CollectionCount -K used -vvv
~~~

ENJOY IT !

Jacques-Olivier
