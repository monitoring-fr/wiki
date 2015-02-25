---
layout: page
---

### Table des matières {.toggle}

-   [check\_esx3\_dp](check_esx3_dp.html#check_esx3_dp)
    -   [Principe de
        fonctionnement](check_esx3_dp.html#principe-de-fonctionnement)
    -   [Usage](check_esx3_dp.html#usage)
    -   [Implantation dans
        Nagios](check_esx3_dp.html#implantation-dans-nagios)

check\_esx3\_dp {#check_esx3_dp .sectionedit1}
===============

Ce dossier a été réalisé avec l’aide de :

  **Rôle**       **Nom**
  -------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Auteur**     David Piscitelli
  **Download**   [https://github.com/monitoring-fr/Plugins/blob/master/check\_esx3\_dp/check\_esx3\_dp.tar.gz](https://github.com/monitoring-fr/Plugins/blob/master/check_esx3_dp/check_esx3_dp.tar.gz "https://github.com/monitoring-fr/Plugins/blob/master/check_esx3_dp/check_esx3_dp.tar.gz")

Ce plugin est un fork du plugin check\_esx3.pl pour palier au
problématique de ressources qu’il consomme. Effectivement après avoir
appliqué ce plugin sur une batterie d’esx assez conséquente, la charge
sur le poller Nagios augmente considérablement. Le but de ce plugin est
de reprendre le principe de check\_mk pour minimiser les ressources
consommées.

en cours de rédaction

Principe de fonctionnement {#principe-de-fonctionnement .sectionedit3}
--------------------------

Usage {#usage .sectionedit4}
-----

Implantation dans Nagios {#implantation-dans-nagios .sectionedit5}
------------------------
