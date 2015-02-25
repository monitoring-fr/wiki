---
layout: page
---

[[[check\_jmx](check_jmx@do=backlink.html)]]

[wiki monitoring-fr.org](../../start.html "[ALT+H]")

![Logo Monitoring](../../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../../start.html "start") »
[Nagios](../start.html "nagios:start") » [Nagios
Plugins](start.html "nagios:plugins:start") »
[check\_jmx](check_jmx.html "nagios:plugins:check_jmx")

### Table des matières {.toggle}

-   [check\_jmx](check_jmx.html#check_jmx)

check\_jmx {#check_jmx .sectionedit1}
==========

1 / Récupérer le plugin check\_jmx vers le lien suivants:
[http://exchange.nagios.org/directory/Plugins/Java-Applications-and-Servers/check\_jmx/details](http://exchange.nagios.org/directory/Plugins/Java-Applications-and-Servers/check_jmx/details "http://exchange.nagios.org/directory/Plugins/Java-Applications-and-Servers/check_jmx/details")

2 / Créer le script shell check\_jmx

~~~~ {.code}
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
~~~~

ATTENTION a bien spécifier le chemin vers la commande java chez moi
c’est /data/jdk/bin/java

ATTENTION grâce à ce script shell vous pourrez grapher les données JMX
dans PNP4Nagios comme moi ou un autre grapheur !

3 / Le rendre executable avec un chmod oug+x

4 / Définir les variables JMX sur la WEBAPP dans le fichier setenv.sh du
tomcat

~~~~ {.code}
  
-Dcom.sun.management.jmxremote.port=%my.jmx.port% \
-Dcom.sun.management.jmxremote.ssl=false \
-Dcom.sun.management.jmxremote.authenticate=false
~~~~

vi setenv.sh

~~~~ {.code}
# JMX
JAVA_OPTS="$JAVA_OPTS -XX:+UseConcMarkSweepGC
export JAVA_OPTS="$JAVA_OPTS -XX:ParallelGCThreads=32 -XX:+AggressiveOpts -XX:-UseParallelGC -XX:+UseTLAB
-XX:-DisableExplicitGC -XX:+ScavengeBeforeFullGC -XX:+UseFastAccessorMethods"
~~~~

ou

~~~~ {.code}
# JMX
export JAVA_OPTS="$JAVA_OPTS -XX:ParallelGCThreads=2 -XX:+AggressiveOpts -XX:-UseParallelGC -XX:+UseTLAB -XX:-DisableExplicitGC -XX:+ScavengeBeforeFullGC -XX:+UseFastAccessorMethods -XX:+PrintGCDetails"
export CATALINA_OPTS="$CATALINA_OPTS -Dcom.sun.management.jmxremote.port=1620"
export CATALINA_OPTS="$CATALINA_OPTS -Dcom.sun.management.jmxremote.ssl=false"
export CATALINA_OPTS="$CATALINA_OPTS -Dcom.sun.management.jmxremote.authenticate=false"
~~~~

ATTENTION a spécifier un port JMX ”%my.jmx.port%”, moi j’ai utilisé le
port 1620 les autres options servent a spécifier une authentification
JMX et/ou spécifier un certificat SSL. Personnellement je n’ai ni
utilisé d’authentification ni de certificats SSL.

5 / Redémarrer la JVM

4 / Définir les commandes dans le fichier nrpe.cfg

ATTENTION a spécifier l’IP du votre serveur TOMCAT

~~~~ {.code}
#### Définition d'un check_nb_thread
command[check_nb_thread_crm]=/usr/local/nagios//libexec/plugin/check_jmx -U service:jmx:rmi:///jndi/rmi://XXX.XXX.XXX.XXX:1620  /jmxrmi -O java.lang:type=Threading -A ThreadCount
~~~~

~~~~ {.code}
#### Définition d'un check_nb_HeapMemoryUsage
command[check_HeapMemoryUsage_crm]=/usr/local/nagios//libexec/plugin/check_jmx -U service:jmx:rmi:///jndi/rmi://XXX.XXX.XXX.XXX:1620/jmxrmi -O java.lang:type=Memory -A HeapMemoryUsage -K used -vvv -w 90000000 -c 100000000
~~~~

~~~~ {.code}
#### Définition d'un check_nb_NonHeapMemoryUsage
command[check_NonHeapMemoryUsage_crm]=/usr/local/nagios//libexec/plugin/check_jmx -U service:jmx:rmi:///jndi/rmi://XXX.XXX.XXX.XXX:1620/jmxrmi -O java.lang:type=Memory -A NonHeapMemoryUsage -K used -vvv -w 50000000 -c 80000000
~~~~

~~~~ {.code}
#### Définition d'un check_nb_GCTime
command[check_GCTime_crm]=/usr/local/nagios//libexec/plugin/check_jmx -U service:jmx:rmi:///jndi/rmi://XXX.XXX.XXX.XXX:1620/jmxrmi -O java.lang:type=GarbageCollector,name=Copy -A CollectionTime -K used -vvv
~~~~

~~~~ {.code}
#### Définition d'un check_nb_GCCount
command[check_GCCount_crm]=/usr/local/nagios//libexec/plugin/check_jmx -U service:jmx:rmi:///jndi/rmi://XXX.XXX.XXX.XXX:1620/jmxrmi -O java.lang:type=GarbageCollector,name=Copy -A CollectionCount -K used -vvv
~~~~

ENJOY IT !

Jacques-Olivier

SOMMAIRE {#sommaire .sectionedit1}
--------

**[Accueil](../../start.html "start")**

**[Supervision](../../supervision/start.html "supervision:start")**

-   [Nagios](../start.html "nagios:start")
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
-   [Ressenti
    utilisateur](../../supervision/eue/start.html "supervision:eue:start")
-   [Ressenti utilisateur avec
    sikuli](../../sikuli/eue/start.html "sikuli:eue:start")

**[Hypervision](../../hypervision/start.html "hypervision:start")**

-   [Canopsis](../../canopsis/start.html "canopsis:start")

**[Sécurité](../../securite/start.html "securite:start")**

**[Infrastructure](../../infra/start.html "infra:start")**

**[Développement](../../dev/start.html "dev:start")**

Nagios Plugins {#nagios-plugins .sectionedit1}
--------------

-   [Best of plugins compatibles
    Nagios](bestof.html "nagios:plugins:bestof")
-   [Cucumber
    Nagios](cucumber-nagios.html "nagios:plugins:cucumber-nagios")
-   [Supervision de type End User Experience avec Cucumber &
    Watir](cucumber-nagios-watir.html "nagios:plugins:cucumber-nagios-watir")
-   [check\_apt](check_apt.html "nagios:plugins:check_apt")
-   [check\_by\_ssh](check_by_ssh.html "nagios:plugins:check_by_ssh")
-   [check\_citrix\_lic](check_citrix_lic.html "nagios:plugins:check_citrix_lic")
-   [check\_dnsbl](check_dnsbl.html "nagios:plugins:check_dnsbl")
-   [check\_esx3](check_esx3.html "nagios:plugins:check_esx3")
-   [check\_esx3\_dp](check_esx3_dp.html "nagios:plugins:check_esx3_dp")
-   [check\_hpasm](check_hpasm.html "nagios:plugins:check_hpasm")
-   [check\_http](check_http.html "nagios:plugins:check_http")
-   [check\_jmx](check_jmx.html "nagios:plugins:check_jmx")
-   [check\_multi](check_multi.html "nagios:plugins:check_multi")
-   [check\_prelude](check_prelude.html "nagios:plugins:check_prelude")
-   [check\_procs](check_procs.html "nagios:plugins:check_procs")
-   [check\_procs2](check_procs2.html "nagios:plugins:check_procs2")
-   [check\_rrd](../../plugins/check_rrd.html "nagios:plugins:check_rrd")
-   [check\_webpage.rb](check_webpage.rb.html "nagios:plugins:check_webpage.rb")

-   [Afficher le texte
    source](check_jmx@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](check_jmx@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](check_jmx@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](check_jmx@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](check_jmx@do=media.html "Gestionnaire de médias")
-   [Index](check_jmx@do=index.html "Index [X]")
-   [Connexion](check_jmx@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de page](check_jmx.html#dokuwiki__top "Haut de page [T]")

nagios/plugins/check\_jmx.txt · Dernière modification: 2013/03/29 09:39
(modification externe)

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

![](../../lib/exe/indexer.php@id=nagios%253Aplugins%253Acheck_jmx&1424859574)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
