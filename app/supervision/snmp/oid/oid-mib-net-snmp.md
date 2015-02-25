---
layout: page
title: 'Net-SNMP OID MIB'
---

Le tableau ci-dessous fournit la liste des OID utiles issus de la MIB
Net-SNMP.

  ---------------------- -------------------------- --------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Nom**                **OID**                    **Type**        **Description**

  dskPercentNode         1.3.6.1.4.1.2021.9.1.10    Integer32       Pourcentage d’inodes utilisés sur le disque

  dskPercent             1.3.6.1.4.1.2021.9.1.9     Integer32       Pourcentage d’espace utilisé sur le disque

  ssCpuRawIdle           1.3.6.1.4.1.2021.11.53.0   Counter32       idle CPU time.

  hrStorageSize          1.3.6.1.2.1.25.2.3.1.5     Integer32       The size of the storage represented by this entry, in units of hrStorageAllocationUnits. This object is writable to allow remote configuration of the size of the storage area in those cases where such an operation makes sense and is possible on the underlying system. For example, the amount of main memory allocated to a buffer pool might be modified or the amount of disk space allocated to virtual memory might be modified

  hrStorageUsed          1.3.6.1.2.1.25.2.3.1.6     Integer32       The amount of the storage represented by this entry that is allocated, in units of hrStorageAllocationUnits.

  memTotalFree           1.3.6.1.4.1.2021.4.11.0    Integer32       Mémoire totale disponible sur l’hôte

  memAvailSwap           1.3.6.1.4.1.2021.4.4.0                     Espace de swap disponible sur l’hôte.

  laLoad                 1.3.6.1.4.1.2021.10.1.3    DisplayString   La charge moyenne sur 1,5 et 10 minutes (une par ligne)

  hrSystemProcesses      1.3.6.1.2.1.25.1.6.0       Gauge32         The number of process contexts currently loaded or running on this system.

  hrSystemNumUsers       1.3.6.1.2.1.25.1.5.0       Gauge32         The number of user sessions for which this host is storing state information. A session is a collection of processes requiring a single act of user authentication and possibly subject to collective job control.

  hrSystemMaxProcesses   1.3.6.1.2.1.25.1.7.0       Integer32       The maximum number of process contexts this system can support. If there is no fixed maximum, the value should be zero. On systems that have a fixed maximum, this object can help diagnose failures that occur when this maximum is reached

  hrMemorySize           1.3.6.1.2.1.25.2.2.0       KBytes          The amount of physical read-write main memory, typically RAM, contained by the host.

  hrSystemUptime         1.3.6.1.2.1.25.1.1.0       TimeTicks       The amount of time since this host was last initialized. Note that this is different from sysUpTime in the SNMPv2-MIB [RFC1907] because sysUpTime is the uptime of the network management portion of the system.

  sysUpTime              1.3.6.1.2.1.1.3            TimeTicks       The time (in hundredths of a second) since the network management portion of the system was last re-initialized.

  ifInOctets             1.3.6.1.2.1.2.2.1.10       Counter32       The total number of octets received on the interface, including framing characters. Discontinuities in the value of this counter can occur at re-initialization of the management system, and at other times as indicated by the value of ifCounterDiscontinuityTime

  ifInErrors             1.3.6.1.2.1.2.2.1.14       Counter32       For packet-oriented interfaces, the number of inbound packets that contained errors preventing them from being deliverable to a higher-layer protocol. For character-oriented or fixed-length interfaces, the number of inbound transmission units that contained errors preventing them from being deliverable to a higher-layer protocol.\
                                                                     Discontinuities in the value of this counter can occur at re-initialization of the management system, and at other times as indicated by the value of ifCounterDiscontinuityTime

  ifOutOctets            1.3.6.1.2.1.2.2.1.16       Counter32       The total number of octets transmitted out of the interface, including framing characters.\
                                                                     Discontinuities in the value of this counter can occur at re-initialization of the management system, and at other times as indicated by the value of ifCounterDiscontinuityTime

  ifOutErrors            1.3.6.1.2.1.2.2.1.20       Counter32       Pour les interfaces orientées paquets, le nombre de paquets sortants non transmis pour cause d’erreurs. Pour les interfaces orientées caractères, le nombre d’unités de transmissions sortantes non transmises pour cause d’eereurs.\
                                                                     Discontinuities in the value of this counter can occur at re-initialization of the management system, and at other times as indicated by the value of ifCounterDiscontinuityTime.
  ---------------------- -------------------------- --------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------