---
layout: page
---

### Table des matières {.toggle}

-   [Découverte et supervision des services (capsd et
    pollerd)](services.html#decouverte-et-supervision-des-services-capsd-et-pollerd)
    -   [1. Configuration de la découverte des
        services](services.html#configuration-de-la-decouverte-des-services)
        -   [1.1 Configuration
            générale](services.html#configuration-generale)
        -   [1.2 Liste des modules de découverte
            disponibles](services.html#liste-des-modules-de-decouverte-disponibles)
        -   [1.3 Exemple de
            configuration](services.html#exemple-de-configuration)
        -   [1.5 Prise en compte des
            modifications](services.html#prise-en-compte-des-modifications)
        -   [1.6 Fichier de log](services.html#fichier-de-log)
        -   [1.7 Pour aller plus
            loin](services.html#pour-aller-plus-loin)
    -   [2. Configuration de la supervision des
        services](services.html#configuration-de-la-supervision-des-services)
        -   [2.1 Configuration
            générale](services.html#configuration-generale1)
        -   [2.2 Liste des modules de supervision
            disponibles](services.html#liste-des-modules-de-supervision-disponibles)
        -   [2.3 Packages et
            services](services.html#packages-et-services)
        -   [2.4 Prise en compte des
            modifications](services.html#prise-en-compte-des-modifications1)
        -   [2.5 Fichier de log](services.html#fichier-de-log1)
        -   [2.6 Pour aller plus
            loin](services.html#pour-aller-plus-loin1)
    -   [3. Exemples de
        configuration](services.html#exemples-de-configuration)
        -   [3.1 Supervision d'un service Windows avec agent NSClient++
            (avec
            password)](services.html#supervision-d-un-service-windows-avec-agent-nsclient-avec-password)
        -   [3.2 Supervision d'un process Windows avec agent NSClient++
            (avec
            password)](services.html#supervision-d-un-process-windows-avec-agent-nsclient-avec-password)
        -   [3.3 Supervision d'un service avec un agent
            NRPE](services.html#supervision-d-un-service-avec-un-agent-nrpe)
        -   [3.4 Supervision d'un service Windows avec un agent
            SNMP](services.html#supervision-d-un-service-windows-avec-un-agent-snmp)
        -   [3.5 Supervision d'un process Windows ou Linux avec un agent
            SNMP](services.html#supervision-d-un-process-windows-ou-linux-avec-un-agent-snmp)

Découverte et supervision des services (capsd et pollerd) {#decouverte-et-supervision-des-services-capsd-et-pollerd .sectionedit1}
=========================================================

Le processus de découverte des services présents sur les équipements
réseaux et sur les serveurs est géré par le démon capsd. Le supervision
des services découverts est géré par le démon pollerd.

1. Configuration de la découverte des services {#configuration-de-la-decouverte-des-services .sectionedit2}
----------------------------------------------

La configuration de la découverte des services s’effectue dans le
fichier **capsd-configuration.xml** situé dans le répertoire
**/opt/opennms/etc**.

### 1.1 Configuration générale {#configuration-generale .sectionedit3}

Extrait du fichier capsd-configuration.xml par défaut d’OpenNMS :

~~~ {.code .xml}
<capsd-configuration rescan-frequency="86400000"
                     initial-sleep-time="30000"
                     max-suspect-thread-pool-size="6"
                     max-rescan-thread-pool-size="3">
...
~~~

Les paramètres sont les suivants :

-   *rescan-frequency :* Fréquence entre chaque découverte de service
    pour un équipement. La valeur par défaut est 24 heures en
    millisecondes ;
-   *initial-sleep-time :* Délai avant de lancer la découverte des
    services lors d’un redémarrage d’OpenNMS. La valeur par défaut est 5
    minutes en millisecondes ;
-   *max-suspect-thread-pool-size :* Nombre de thread maximum utilisé
    pour la découverte des services d’une interface ;
-   *max-rescan-thread-pool-size :* Nombre de thread maximum utilisé
    pour le rescan des services d’une interface déjà découvert
    précédemment ;

### 1.2 Liste des modules de découverte disponibles {#liste-des-modules-de-decouverte-disponibles .sectionedit4}

La liste des modules de découverte disponibles sont les suivants :

-   org.opennms.netmgt.capsd.plugins.BgpSessionPlugin
-   org.opennms.netmgt.capsd.plugins.CiscoIpSlaPlugin
-   org.opennms.netmgt.capsd.plugins.CitrixPlugin
-   org.opennms.netmgt.capsd.plugins.DhcpPlugin
-   org.opennms.netmgt.capsd.plugins.DiskUsagePlugin
-   org.opennms.netmgt.capsd.plugins.DnsPlugin
-   org.opennms.netmgt.capsd.plugins.DominoIIOPPlugin
-   org.opennms.netmgt.capsd.plugins.DominoIIOPPlugin.DominoConnectionConfig
-   org.opennms.netmgt.capsd.plugins.FtpPlugin
-   org.opennms.netmgt.capsd.plugins.FtpResponse
-   org.opennms.netmgt.capsd.plugins.HostResourceSwRunPlugin
-   org.opennms.netmgt.capsd.plugins.HttpPlugin
-   org.opennms.netmgt.capsd.plugins.HttpsPlugin
-   org.opennms.netmgt.capsd.plugins.IcmpPlugin
-   org.opennms.netmgt.capsd.plugins.ImapPlugin
-   org.opennms.netmgt.capsd.plugins.JBossPlugin
-   org.opennms.netmgt.capsd.plugins.JDBCPlugin
-   org.opennms.netmgt.capsd.plugins.JDBCStoredProcedurePlugin
-   org.opennms.netmgt.capsd.plugins.JMXPlugin
-   org.opennms.netmgt.capsd.plugins.Jsr160Plugin
-   org.opennms.netmgt.capsd.plugins.K5Plugin
-   org.opennms.netmgt.capsd.plugins.LdapPlugin
-   org.opennms.netmgt.capsd.plugins.LoopPlugin
-   org.opennms.netmgt.capsd.plugins.MSExchangePlugin
-   org.opennms.netmgt.capsd.plugins.MX4JPlugin
-   org.opennms.netmgt.capsd.plugins.NotesHttpPlugin
-   org.opennms.netmgt.capsd.plugins.NrpePlugin
-   org.opennms.netmgt.capsd.plugins.NsclientPlugin
-   org.opennms.netmgt.capsd.plugins.NtpPlugin
-   org.opennms.netmgt.capsd.plugins.OpenManageChassisPlugin
-   org.opennms.netmgt.capsd.plugins.Pop3Plugin
-   org.opennms.netmgt.capsd.plugins.RadiusAuthPlugin
-   org.opennms.netmgt.capsd.plugins.SmbPlugin
-   org.opennms.netmgt.capsd.plugins.SmtpPlugin
-   org.opennms.netmgt.capsd.plugins.SnmpPlugin
-   org.opennms.netmgt.capsd.plugins.SshPlugin
-   org.opennms.netmgt.capsd.plugins.TcpPlugin
-   org.opennms.netmgt.capsd.plugins.Win32ServicePlugin

### 1.3 Exemple de configuration {#exemple-de-configuration .sectionedit5}

Chaque service à découvrir est configuré dans le fichier
**capsd-configuration.xml** entre les balises **protocol-plugin**.

Voici la configuration pour la découverte du service ICMP :

~~~ {.code .xml}
<protocol-plugin protocol="ICMP" class-name="org.opennms.netmgt.capsd.plugins.IcmpPlugin" scan="on">
    <property key="timeout" value="2000" />
    <property key="retry" value="1" />
</protocol-plugin>
~~~

Les différents paramètres sont les suivants :

-   *protocol :* nom du service tel qu’il sera affiché dans l’interface
    après découverte ;
-   *class-name* : nom de la classe java du module de découverte utilisé
    (voir la liste des modules de découverte disponibles ci-dessus) ;
-   *scan* : permet d’activer (on) ou de désactiver la découverte d’un
    service (off) ;
-   *property :* paramètres du module de découverte ;
    -   *key :* nom du paramètre ;
    -   *value :* valeur du paramètre ;

### 1.5 Prise en compte des modifications {#prise-en-compte-des-modifications .sectionedit6}

Pour que les modifications soient prises en compte, vous devez
redémarrer **OpenNMS**. Pour cela, tapez la commande suivante :

~~~
shell> service opennms restart
~~~

### 1.6 Fichier de log {#fichier-de-log .sectionedit7}

Le fichier de log utilisé par le démon **capsd** est par défaut
**/opt/opennms/logs/daemon/capsd.log**.

### 1.7 Pour aller plus loin {#pour-aller-plus-loin .sectionedit8}

Pour aller plus loin, je vous invite à consulter la page suivante :
[http://www.opennms.org/wiki/Discovery\#Capabilities](http://www.opennms.org/wiki/Discovery#Capabilities "http://www.opennms.org/wiki/Discovery#Capabilities")

2. Configuration de la supervision des services {#configuration-de-la-supervision-des-services .sectionedit9}
-----------------------------------------------

La configuration de la supervision des services s’effectue dans le
fichier **poller-configuration.xml** situé dans le répertoire
**/opt/opennms/etc**.

### 2.1 Configuration générale {#configuration-generale1 .sectionedit10}

Extrait du fichier **poller-configuration.xml** par défaut d’OpenNMS :

~~~ {.code .xml}
<poller-configuration threads="30"
                      serviceUnresponsiveEnabled="true"> 
  <node-outage status="on">
    <critical-service name="ICMP" />
  </node-outage
...
~~~

Les paramètres sont les suivants :

-   *threads :* nombre de threads utilisé pour la supervision des
    services ;
-   *serviceUnresponsiveEnabled :* permet de diminuer les faux positifs
    ;
-   *node-outage :* permet de déterminer le service qui génèrera une
    interruption réseaux ;

### 2.2 Liste des modules de supervision disponibles {#liste-des-modules-de-supervision-disponibles .sectionedit11}

La liste des modules de supervision disponibles sont les suivants :

-   org.opennms.netmgt.poller.monitors.AvailabilityMonitor
-   org.opennms.netmgt.poller.monitors.BgpSessionMonitor
-   org.opennms.netmgt.poller.monitors.CiscoIpSlaMonitor
-   org.opennms.netmgt.poller.monitors.CitrixMonitor
-   org.opennms.netmgt.poller.monitors.DhcpMonitor
-   org.opennms.netmgt.poller.monitors.DiskUsageMonitor
-   org.opennms.netmgt.poller.monitors.DnsMonitor
-   org.opennms.netmgt.poller.monitors.DominoIIOPMonitor
-   org.opennms.netmgt.poller.monitors.FtpMonitor
-   org.opennms.netmgt.poller.monitors.GpMonitor
-   org.opennms.netmgt.poller.monitors.HostResourceSwRunMonitor
-   org.opennms.netmgt.poller.monitors.HttpMonitor
-   org.opennms.netmgt.poller.monitors.HttpsMonitor
-   org.opennms.netmgt.poller.monitors.IcmpMonitor
-   org.opennms.netmgt.poller.monitors.ImapMonitor
-   org.opennms.netmgt.poller.monitors.IPv4Monitor
-   org.opennms.netmgt.poller.monitors.JBossMonitor
-   org.opennms.netmgt.poller.monitors.JDBCMonitor
-   org.opennms.netmgt.poller.monitors.JDBCStoredProcedureMonitor
-   org.opennms.netmgt.poller.monitors.JMXMonitor
-   org.opennms.netmgt.poller.monitors.Jsr160Monitor
-   org.opennms.netmgt.poller.monitors.LdapMonitor
-   org.opennms.netmgt.poller.monitors.LoopMonitor
-   org.opennms.netmgt.poller.monitors.MailTransportMonitor
-   org.opennms.netmgt.poller.monitors.MailTransportParameters
-   org.opennms.netmgt.poller.monitors.MX4JMonitor
-   org.opennms.netmgt.poller.monitors.NrpeMonitor
-   org.opennms.netmgt.poller.monitors.NsclientMonitor
-   org.opennms.netmgt.poller.monitors.NtpMonitor
-   org.opennms.netmgt.poller.monitors.OmsaStorageMonitor
-   org.opennms.netmgt.poller.monitors.OpenManageChassisMonitor
-   org.opennms.netmgt.poller.monitors.PageSequenceMonitor
-   org.opennms.netmgt.poller.monitors.PageSequenceMonitor.HttpPage
-   org.opennms.netmgt.poller.monitors.PageSequenceMonitor.HttpPageSequence
-   org.opennms.netmgt.poller.monitors.PageSequenceMonitor.HttpResponseRange
-   org.opennms.netmgt.poller.monitors.PageSequenceMonitor.PageSequenceHttpGetMethod
-   org.opennms.netmgt.poller.monitors.PageSequenceMonitor.PageSequenceHttpPostMethod
-   org.opennms.netmgt.poller.monitors.PageSequenceMonitor.PageSequenceMonitorParameters
-   org.opennms.netmgt.poller.monitors.PassiveServiceMonitor
-   org.opennms.netmgt.poller.monitors.PercMonitor
-   org.opennms.netmgt.poller.monitors.Pop3Monitor
-   org.opennms.netmgt.poller.monitors.RadiusAuthMonitor
-   org.opennms.netmgt.poller.monitors.SmbMonitor
-   org.opennms.netmgt.poller.monitors.SmtpMonitor
-   org.opennms.netmgt.poller.monitors.SnmpMonitor
-   org.opennms.netmgt.poller.monitors.SnmpMonitorStrategy
-   org.opennms.netmgt.poller.monitors.SshMonitor
-   org.opennms.netmgt.poller.monitors.StrafePingMonitor
-   org.opennms.netmgt.poller.monitors.TcpMonitor
-   org.opennms.netmgt.poller.monitors.TimeoutTracker
-   org.opennms.netmgt.poller.monitors.TrivialTimeMonitor
-   org.opennms.netmgt.poller.monitors.Win32ServiceMonitor

### 2.3 Packages et services {#packages-et-services .sectionedit12}

Toujours dans ce fichier, un package permet de configurer les services à
superviser sur un groupe d’équipement.

#### 2.3.1 Configuration d'un package {#configuration-d-un-package}

~~~ {.code .xml}
<package name="example1">
    <filter>IPADDR != '0.0.0.0'</filter>
    <include-range begin="1.1.1.1" end="254.254.254.254" />
    <rrd step="300">
      <rra>RRA:AVERAGE:0.5:1:2016</rra>
      <rra>RRA:AVERAGE:0.5:12:1488</rra>
      <rra>RRA:AVERAGE:0.5:288:366</rra>
      <rra>RRA:MAX:0.5:288:366</rra>
      <rra>RRA:MIN:0.5:288:366</rra>
    </rrd>
...
~~~

-   *name :* nom du package ;
-   *filter :* permet de définir des filtres pour la sélection des
    équipements qui sont concernés par ce package ;
-   *include-range :* permet de définir des plages d’adresses IP des
    équipements qui sont concernés par ce package ;
-   *rrd :* configuration de l’agrégation des indicateurs stockés dans
    les fichiers RRD ;

#### 2.3.2 Configuration d'un service {#configuration-d-un-service}

Exemple de configuration de la supervision du service **ICMP** :

A l’intérieur d’un package :

~~~ {.code .xml}
<service name="ICMP" interval="300000" user-defined="false" status="on">
      <parameter key="retry" value="2" />
      <parameter key="timeout" value="3000" />
      <parameter key="rrd-repository" value="/opt/opennms/share/rrd/response" />
~~~

Les paramètres sont les suivants :

-   *name :* nom du service ;
-   *interval :* délai en millisecondes entre chaque test de service ;
-   *status :* permet d’activer (on) ou de désactiver la supervision
    d’un service (off) ;
-   *property :* paramètres du module de découverte ;
    -   *key :* nom du paramètre ;
    -   *value :* valeur du paramètre ;

A la fin du fichier de configuration :

~~~ {.code .xml}
<monitor service="ICMP" class-name="org.opennms.netmgt.poller.monitors.IcmpMonitor" />
~~~

Les paramètres sont les suivants :

-   *service :* nom du service ;
-   *class-name :* nom de la classe java du module de supervision
    utilisé (voir la liste des modules de supervision disponibles
    ci-dessus) ;

### 2.4 Prise en compte des modifications {#prise-en-compte-des-modifications1 .sectionedit13}

Pour que les modifications soient prises en compte, vous devez
redémarrer **OpenNMS**. Pour cela, tapez la commande suivante :

~~~
shell> service opennms restart
~~~

### 2.5 Fichier de log {#fichier-de-log1 .sectionedit14}

Le fichier de log utilisé par le démon **pollerd** est par défaut
**/opt/opennms/logs/daemon/poller.log**.

### 2.6 Pour aller plus loin {#pour-aller-plus-loin1 .sectionedit15}

Pour aller plus loin, je vous invite à consulter la page suivante :
[http://www.opennms.org/wiki/Polling\_Configuration\_How-To](http://www.opennms.org/wiki/Polling_Configuration_How-To "http://www.opennms.org/wiki/Polling_Configuration_How-To")

3. Exemples de configuration {#exemples-de-configuration .sectionedit16}
----------------------------

Voici quelques exemples de configuration des fichiers pour supervisés
des services couramment utilisés.

### 3.1 Supervision d'un service Windows avec agent NSClient++ (avec password) {#supervision-d-un-service-windows-avec-agent-nsclient-avec-password .sectionedit17}

Rajouter dans le fichier /opt/opennms/etc/capsd-configuration.xml :

~~~ {.code .xml}
 <protocol-plugin protocol="NSC-ClientDHCP" class-name="org.opennms.protocols.nsclient.capsd.NsclientPlugin" scan="on" user-defined="false">
        <property key="banner" value="*" />
        <property key="port" value="12489" />
        <property key="timeout" value="3000" />
        <property key="retry" value="2" />
        <property key="password" value="motdepasse" />
        <property key="command" value="SERVICESTATE" />
        <property key="parameter" value="Client DHCP" />
 </protocol-plugin>
~~~

Rajouter dans le fichier /opt/opennms/etc/poller-configuration.xml :

~~~ {.code .xml}
 <service name="NSC-ClientDHCP" interval="300000" user-defined="false" status="on">
      <parameter key="port" value="12489"/>
      <parameter key="retry" value="2"/>
      <parameter key="timeout" value="3000"/>
      <parameter key="password" value="motdepasse"/>
      <parameter key="command" value="SERVICESTATE" />
      <parameter key="parameter" value="Client DHCP"/>
 </service>
~~~

à la fin du fichier :

~~~ {.code .xml}
 <monitor service="NSC-ClientDHCP" class-name="org.opennms.protocols.nsclient.monitor.NsclientMonitor" />
~~~

-   Remplacer “NSC-ClientDHCP” par le nom du service supervisé.
-   Remplacer “motdepasse” par le mot de passe défini dans le fichier
    nsclient.ini (ou NSC.ini) du serveur supervisé.
-   Enlever les lignes contenant “password” s’il n’y a pas de mot de
    passe pour interroger l’agent NSClient.
-   Remplacer “Client DHCP” par le ou les services à superviser (il faut
    utiliser le nom complet affiché dans les propriétés du service
    windows).
-   Vérifier que l’adresse IP d’OpenNMS est déclarée dans le fichier
    nsclient.ini (ou NSC.ini) de l’agent NSClient (allowed\_hosts).
-   Installer le module opennms-plugin-protocol-nsclient pour les
    versions d’OpenNMS à partir de 1.10.X
-   Remplacer “org.opennms.protocols.nsclient.capsd.NsclientPlugin” par
    “org.opennms.netmgt.capsd.plugins.NsclientPlugin” dans le fichier
    capsd-configuration.xml pour les versions d’OpenNMS antérieure à de
    1.10.X
-   Remplacer “org.opennms.protocols.nsclient.monitor.NsclientMonitor”
    par “org.opennms.netmgt.poller.monitors.NsclientMonitor” dans le
    fichier poller-configuration.xml pour les versions d’OpenNMS
    antérieure à de 1.10.X

### 3.2 Supervision d'un process Windows avec agent NSClient++ (avec password) {#supervision-d-un-process-windows-avec-agent-nsclient-avec-password .sectionedit18}

Rajouter dans le fichier /opt/opennms/etc/capsd-configuration.xml :

~~~ {.code .xml}
 <protocol-plugin protocol="NSC-VirtualBox" class-name="org.opennms.protocols.nsclient.capsd.NsclientPlugin" scan="on" user-defined="false">
        <property key="banner" value="*" />
        <property key="port" value="12489" />
        <property key="timeout" value="3000" />
        <property key="retry" value="2" />
        <property key="password" value="motdepasse" />
        <property key="command" value="PROCSTATE" />
        <property key="parameter" value="VirtualBox.exe" />
 </protocol-plugin>
~~~

Rajouter dans le fichier /opt/opennms/etc/poller-configuration.xml :

~~~ {.code .xml}
 <service name="NSC-VirtualBox" interval="300000" user-defined="false" status="on">
      <parameter key="port" value="12489"/>
      <parameter key="retry" value="2"/>
      <parameter key="timeout" value="3000"/>
      <parameter key="password" value="motdepasse"/>
      <parameter key="command" value="PROCSTATE" />
      <parameter key="parameter" value="VirtualBox.exe"/>
 </service>
~~~

à la fin du fichier :

~~~ {.code .xml}
 <monitor service="NSC-VirtualBox" class-name="org.opennms.protocols.nsclient.monitor.NsclientMonitor" />
~~~

-   Remplacer “NSC-VirtualBox” par le nom du service supervisé.
-   Remplacer “motdepasse” par le mot de passe défini dans le fichier
    NSC.ini du serveur supervisé.
-   Enlever les lignes contenant “password” s’il n’y a pas de mot de
    passe pour interroger l’agent NSClient.
-   Remplacer “VirtualBox.exe” par le ou les process à superviser (il
    faut utiliser le nom affiché dans la colonne “Nom de l’image” de
    l’onglet “Processus” du gestionnaire des tâches de windows).
-   Vérifier que l’adresse IP d’OpenNMS est déclarée dans le fichier
    NSC.ini de l’agent NSClient (allowed\_hosts).
-   Installer le module opennms-plugin-protocol-nsclient pour les
    versions d’OpenNMS à partir de 1.10.X
-   Remplacer “org.opennms.protocols.nsclient.capsd.NsclientPlugin” par
    “org.opennms.netmgt.capsd.plugins.NsclientPlugin” dans le fichier
    capsd-configuration.xml pour les versions d’OpenNMS antérieure à de
    1.10.X
-   Remplacer “org.opennms.protocols.nsclient.monitor.NsclientMonitor”
    par “org.opennms.netmgt.poller.monitors.NsclientMonitor” dans le
    fichier poller-configuration.xml pour les versions d’OpenNMS
    antérieure à de 1.10.X

### 3.3 Supervision d'un service avec un agent NRPE {#supervision-d-un-service-avec-un-agent-nrpe .sectionedit19}

Rajouter dans le fichier /opt/opennms/etc/capsd-configuration.xml :

~~~ {.code .xml}
 <protocol-plugin protocol="NRPE-winserv" class-name="org.opennms.netmgt.capsd.plugins.NrpePlugin" scan="on">
        <property key="timeout" value="2000" />
        <property key="retry" value="1" />
        <property key="command" value="nt_services" />
 </protocol-plugin>
~~~

Rajouter dans le fichier /opt/opennms/etc/poller-configuration.xml :

~~~ {.code .xml}
 <service name="NRPE-winserv" interval="30000" user-defined="true" status="on">
      <parameter key="retry" value="2" />
      <parameter key="timeout" value="3000" />
      <parameter key="command" value="nt_services" />
 </service>
~~~

à la fin du fichier :

~~~ {.code .xml}
 <monitor service="NRPE-winserv" class-name="org.opennms.netmgt.poller.monitors.NrpeMonitor"/>
~~~

-   Remplacer “NRPE-winserv” par le nom du service supervisé.
-   Remplacer “nt\_services” par la commande définie dans le fichier
    nrpe.cfg présent sur le serveur supervisé.
-   Vérifier que l’adresse IP d’OpenNMS est déclarée dans le fichier
    nrpe.cfg présent sur le serveur supervisé (allowed\_hosts).

### 3.4 Supervision d'un service Windows avec un agent SNMP {#supervision-d-un-service-windows-avec-un-agent-snmp .sectionedit20}

Rajouter dans le fichier /opt/opennms/etc/capsd-configuration.xml :

~~~ {.code .xml}
      <protocol-plugin protocol="SNMP-ClientDHCP" class-name="org.opennms.netmgt.capsd.plugins.Win32ServicePlugin" scan="on" >
        <property key="timeout" value="2000" />
        <property key="retry" value="1" />
        <property key="service-name" value="Client DHCP" />
    </protocol-plugin>
~~~

Rajouter dans le fichier /opt/opennms/etc/poller-configuration.xml :

~~~ {.code .xml}
    <service name="SNMP-ClientDHCP" interval="30000" user-defined="false" status="on">
      <parameter key="retry" value="2" />
      <parameter key="timeout" value="3000" />
      <parameter key="port" value="161" />
      <parameter key="service-name" value="Client DHCP" />
    </service>
~~~

à la fin du fichier :

~~~ {.code .xml}
  <monitor service="SNMP-ClientDHCP" class-name="org.opennms.netmgt.poller.monitors.Win32ServiceMonitor" />
~~~

-   Remplacer “SNMP-ClientDHCP” par le nom du service supervisé.
-   Remplacer “Client DHCP” par le service à superviser (il faut
    utiliser le nom complet affiché dans les propriétés du service
    windows).
-   Vérifier que le nom de communauté de l’agent SNMP est configuré dans
    le fichier /opt/opennms/etc/snmp-config.xml pour le serveur
    supervisé (sauf si c’est “public”).
-   Utiliser la commande snmpwalk pour vérifier la présence du service
    dans la table svSvcTable (1.3.6.1.4.1.77.1.2.3) ligne svSvcName
    (1.3.6.1.4.1.77.1.2.3.1.1) lorsque le service windows est démarré :

~~~ {.code .xml}
  snmpwalk -v2c -c public <adresse_IP agent> 1.3.6.1.4.1.77.1.2.3.1.1 |grep "Client DHCP"
~~~

### 3.5 Supervision d'un process Windows ou Linux avec un agent SNMP {#supervision-d-un-process-windows-ou-linux-avec-un-agent-snmp .sectionedit21}

Rajouter dans le fichier /opt/opennms/etc/capsd-configuration.xml :

~~~ {.code .xml}
<protocol-plugin protocol="SNMP-VirtualBox" class-name="org.opennms.netmgt.capsd.plugins.HostResourceSwRunPlugin" scan="on" user-defined="false">
     <property key="timeout" value="2000" />
     <property key="retry" value="1" />
     <property key="service-name" value="VirtualBox.exe" />
</protocol-plugin>
~~~

Rajouter dans le fichier /opt/opennms/etc/poller-configuration.xml :

~~~ {.code .xml}
   <service name="SNMP-VirtualBox" interval="300000" user-defined="false" status="on">
    <parameter key="retry" value="1"/>
    <parameter key="timeout" value="3000"/>
    <parameter key="service-name" value="VirtualBox.exe"/>
   </service>
~~~

à la fin du fichier :

~~~ {.code .xml}
  <monitor service="SNMP-VirtualBox" class-name="org.opennms.netmgt.poller.monitors.HostResourceSwRunMonitor"/>
~~~

-   Remplacer “SNMP-VirtualBox” par le nom du service supervisé.
-   Remplacer “VirtualBox.exe” par le ou les process à superviser (il
    faut utiliser le nom affiché dans la colonne “Nom de l’image” de
    l’onglet “Processus” du gestionnaire des tâches pour windows).
-   Vérifier que le nom de communauté de l’agent SNMP est configuré dans
    le fichier /opt/opennms/etc/snmp-config.xml pour le serveur
    supervisé (sauf si c’est “public”).
-   Utiliser la commande snmpwalk pour vérifier la présence du service
    dans la table hrSWRunTable (1.3.6.1.2.1.25.4.2) ligne hrSWRunName
    (1.3.6.1.2.1.25.4.2.1.2) lorsque le process est démarré :

~~~ {.code .xml}
  snmpwalk -v2c -c public <adresse_IP agent> 1.3.6.1.2.1.25.4.2.1.2 |grep "VirtualBox.exe"
~~~
