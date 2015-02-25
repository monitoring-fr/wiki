---
layout: page
---

### Table des matières {.toggle}

-   [Diverses solutions de
    supervision](start.html#diverses-solutions-de-supervision)
    -   [Ganglia](start.html#ganglia)
        -   [Présentation](start.html#presentation)
        -   [Documentation](start.html#documentation)
    -   [Hyperic](start.html#hyperic)
        -   [Présentation](start.html#presentation1)
        -   [Documentation](start.html#documentation1)

Diverses solutions de supervision {#diverses-solutions-de-supervision .sectionedit1}
=================================

Dans ce dossier, figure un ensemble de documentations et de tutoriels
sur la mise en place de différentes solutions de supervision.

Pour toutes questions, informations complémentaires, rendez-vous sur le
[forum](http://forums.monitoring-fr.org/ "http://forums.monitoring-fr.org/")
du site.

Ce dossier a été réalisé avec l’aide de :

  **Rôle**           **Nom**
  ------------------ ------------------
  **Créateur**       Ludovic VALENTIN
  **Contributeur**   Romuald FRONTEAU

Ganglia {#ganglia .sectionedit3}
-------

[![logo\_ganglia.jpg](../../../assets/media/supervision/logo_ganglia.jpg "logo_ganglia.jpg")](../../../_detail/supervision/logo_ganglia.jpg@id=various%253Astart.html "supervision:logo_ganglia.jpg")

### Présentation {#presentation .sectionedit4}

[Ganglia](http://ganglia.sourceforge.net/ "http://ganglia.sourceforge.net/")
est une interface de supervision pour les clusters de serveurs. Il peut
enregistré une multitude de données et les personnaliser comme vous les
avez définis. Il travaille de façon distribuée avec chaque machine
collectant ses statistiques grâce au démon de collecte **Gmond**. Chaque
données collectées par le démon sont extraites grâce à un metadata démon
du nom de **Gmetad** tournant soit sur chaque machine supervisé ou sur
une machine séparée.

Ganglia possède une interface Web en php affichant les données provenant
de gmetad en forme de jolis graphiques.

### Documentation {#documentation .sectionedit5}

**[Installation de Ganglia sur Ubuntu 8.0.4
LTS](../../../various/ganglia-ubuntu-install.html "various:ganglia-ubuntu-install")**

Hyperic {#hyperic .sectionedit6}
-------

[![](../../../assets/media/supervision/logo_hyperic.jpg)](../../../_detail/supervision/logo_hyperic.jpg@id=various%253Astart.html "supervision:logo_hyperic.jpg")

### Présentation {#presentation1 .sectionedit7}

[Hyperic](http://www.hyperic.com "http://www.hyperic.com") est conçu
pour diriger des applications web et une infrastructure. La capacité
unique d’Hyperic est d’automatiquement découvrir et contrôler le
logiciel et les ressources de réseau, sans tenir compte du type de
machine ou de l’endroit. Ce qui vous donne une vue unifiée de la
performance et l’état de santé de votre IT.

La société Hyperic étant été racheté par la société SpringSource,
Hyperic complète l’éventail de produit de cette dernière.

Hyperic permet de monitorer une très grande variété de ressources :

-   OS
-   serveurs web et proxys
-   serveurs d’applications
-   bases de données
-   MOM
-   technologies Microsoft (AD, Exchange, .NET)
-   produits de virtualisation
-   ressources réseau
-   et bien d’autres comme Alfresco par exemple

### Documentation {#documentation1 .sectionedit8}

**[Installation de Hyperic HQ sur Ubuntu 8.0.4
LTS](../../../various/hyperic-ubuntu-install.html "various:hyperic-ubuntu-install")**
