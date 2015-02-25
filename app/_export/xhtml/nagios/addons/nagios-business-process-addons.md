---
layout: page
---

### Table des matières {.toggle}

-   [Nagios Business Process
    Addon](nagios-business-process-addons.html#nagios-business-process-addon)
    -   [Installation de Nagios Business Process
        Addon](nagios-business-process-addons.html#installation-de-nagios-business-process-addon)
    -   [Utilisation de Nagios Business Process
        Addon](nagios-business-process-addons.html#utilisation-de-nagios-business-process-addon)

Nagios Business Process Addon {#nagios-business-process-addon .sectionedit1}
=============================

En cours de rédaction

Nagios Business Process Addon apporte à Nagios une dimension orientée
application (ou métier …). Il permet d’agréger des résultats de
contrôles techniques à l’aide d’opérateurs logiques (et, ou ….) afin de
présenter l’état d’une ou plusieurs applications. Cela mérite un
exemple.

Prenons le cas d’une société qui vend des tee shirt en ligne. Qu’est ce
qui va définir que le métier de cette société est disponible ? De quoi a
besoin la société pour que son commerce fonctionne ? La réponse peut
paraitre simple, et elle l’est. Il faut simplement que, du point de vue
de l’acheteur, le site de vente en ligne soit disponible et permette de
valider de bout en bout le processus d’achat. Maintenant qu’est ce qui
va définir que le site est disponible ?

-   Il faut que lorsque je tape l’adresse du site, celui réponde bien
    sur l’adresse IP du serveur qui héberge le site de commerce
    électronique (**DNS**).
-   Il faut également que le site s’affiche. Donc le **serveur web**
    doit être démarré et la **base de donnée** qui stocke le catalogue
    également.
-   Il faut également que le **tiers permettant d’enregistrer le
    paiement** électronique de la commande soit disponible.

Nous venons de définir les différents éléments constituant notre
application. Pour que le métier fonctionne il faut que les DNS et le
serveur web et la base de données et le tiers enregistrant les paiements
soit disponible. Nagios ne permet pas de définir nativement ce genre de
chaîne de liaison. Nagios Business Process Addon est la pour palier ce
manque.

Installation de Nagios Business Process Addon {#installation-de-nagios-business-process-addon .sectionedit2}
---------------------------------------------

Utilisation de Nagios Business Process Addon {#utilisation-de-nagios-business-process-addon .sectionedit3}
--------------------------------------------
