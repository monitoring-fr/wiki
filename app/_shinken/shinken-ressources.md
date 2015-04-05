---
layout: page
title: Ressources et Performances de Shinken
---

Page rédigée pour une version de Shinken 0.4.

Sur cette page, nous allons préciser les différentes ressources que
Shinken doit disposer afin de fonctionner correctement. Un descriptif
des performances de Zabbix est également présent, de manière à permettre
une meilleur estimation et compréhension des besoins.

Sources : site et wiki officiels de
[Shinken](http://www.shinken-monitoring.org/ "http://www.shinken-monitoring.org/").

Cette page a été rédigée par :

  **Rôle**        **Nom**
  --------------- ------------------
  **Rédacteur**   Romuald FRONTEAU

Ressources {#ressources .sectionedit3}
----------

### Matériels requis {#materiels-requis .sectionedit4}

Shinken doit disposer d’une configuration matérielle minimum pour
fonctionner telle que celles-ci :

  **Ressource**       **Configuration minimale**   **Configuration conseillée**
  ------------------- ---------------------------- ------------------------------
  **Processeur**                                   
  **Mémoire RAM**     xx Mo                        xx Mo
  **Espace disque**   xx Mo                        xx Mo

#### Processeur

#### Mémoires {#memoires}

#### Exemples de configurations matérielles {#exemples-de-configurations-materielles}

Voici quelques exemples de configurations matérielles avec le nombre
d’hôtes supervisables correspondant :

  **Type**   **Plateforme**   **Processeur**   **Mémoire RAM**   **Hôtes**
  ---------- ---------------- ---------------- ----------------- -----------
                                                                 

### Systèmes d'exploitation supportés {#systemes-d-exploitation-supportes .sectionedit7}

Shinken est développé pour fonctionner sur de nombreuses plateformes
différentes. Shinken est compatible sur les plateformes où Python est
installable. Il a testé sur les plateformes suivantes :

  **Plateforme**               **Shinken**
  ---------------------------- -------------
  **FreeBSD**                  Supporté
  **Linux**                    Supporté
  **Mac OS X**                 Supporté
  **Android**                  Supporté
  **Solaris**                  Supporté
  **Windows XP / Vista / 7**   Supporté

### Logiciels requis {#logiciels-requis .sectionedit9}

Pour fonctionner, Shinken a besoin de plusieurs applications
essentielles :

  **Logiciels**        **Versions**   **Descriptions**
  -------------------- -------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Python**           \>= 2.4        Si Python \< 2.6, installer la librarie python [multiprocessing](http://pypi.python.org/packages/source/m/multiprocessing/multiprocessing-2.6.2.1.tar.gz "http://pypi.python.org/packages/source/m/multiprocessing/multiprocessing-2.6.2.1.tar.gz")
  **Pyro**                            
  **Thruk ou Ninja**                  Une interface Web pour visualiser votre contenu à superviser

Stockages {#stockages .sectionedit11}
---------

### Modules supportés {#modules-supportes .sectionedit12}

Afin de stocker l’ensemble de ses données, Shinken peut les injecter
dans :

-   Oracle (via NDO)
-   MySQL (via NDO)
-   Merlin
-   CouchDB
-   Perfdata (hôtes & services)
-   LiveStatus

Performances {#performances .sectionedit13}
------------