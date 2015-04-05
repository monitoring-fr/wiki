---
layout: page
title: 'Ntop'
---

[![](..//assets/media/supervision/ntop_logo.png)](..//_detail/supervision/ntop_logo.png@id=supervision%253Antop%253Astart.html "supervision:ntop_logo.png")

Cette page a été réalisé avec l’aide de :

  **Rôle**        **Nom**
  --------------- ------------------
  **Rédacteur**   Romuald FRONTEAU

Introduction {#introduction .sectionedit3}
------------

[Ntop](http://www.ntop.org "http://www.ntop.org") (Network TOP) est un
outil libre de supervision réseau. C’est une application qui produit des
informations sur le trafic d’un réseau en temps réel (comme pourrait le
faire la commande top avec les processus).

Il capture et analyse les trames d’une interface donnée, et permet
d’observer une majeure partie des caractéristiques du trafic (entrant et
sortant) et accepte pour cela, notamment deux modes de fonctionnement:
Une interface web et un mode interactif.

Ntop est développé par Luca Deri. La version courante est la 3.3.x.
C’est une application portable sur la plupart des plates-formes Unix :
Linux (Debian, RedHat, Slackware, SuSe), IRIX, Solaris (i386 et SPARC),
HP-UX 11.X, FreeBSD 3.X, AIX 4.1, et Windows 95/98/NT (Luca Deri a
développé une libpcap pour Win32).

Il s’appuie sur la bibliothèque nommée “libpcap” pour effectuer le
capture des trames (bibliothèque de capture portable du domaine public
pour les systèmes Unix).

Quelques fonctionnalités de Ntop :

-   Tableau des hosts connus
-   Utilisation des protocoles réseaux
-   Charge bande passante par host
-   Graphes journaliers, hebdomadaire, mensuels, annuels
-   Et bien plus encore …

### Schéma Fonctionnel {#schema-fonctionnel .sectionedit4}

Sources [Site Officiel de
Ntop](http://www.ntop.org "http://www.ntop.org")

[![](..//assets/media/supervision/ntop/ntop_world.png)](..//_detail/supervision/ntop/ntop_world.png@id=supervision%253Antop%253Astart.html "supervision:ntop:ntop_world.png")

Documentation {#documentation .sectionedit5}
-------------

**[Chapitre 1 - Installation de Ntop 3.3.10 sur
RedHat](ntop-install-redhat.html "supervision:ntop:ntop-install-redhat")**

**[Chapitre 2 - Présentation de l'interface de Ntop
3.3.10](ntop-interface-web.html "supervision:ntop:ntop-interface-web")**