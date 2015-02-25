---
layout: page
---

### Table des matières {.toggle}

-   [Gabarits d'objets de
    configuration](templates.html#gabarits-d-objets-de-configuration)
    -   [Timeperiods](templates.html#timeperiods)

Gabarits d'objets de configuration {#gabarits-d-objets-de-configuration .sectionedit1}
==================================

Des gabarits prêts à l’emploi pour différents objets de configuration
Nagios. A utiliser sans modération aucune !!!

Timeperiods {#timeperiods .sectionedit2}
-----------

Les vacances françaises pour Nagios 3

~~~
define timeperiod{
        name                    fr-holidays
        timeperiod_name         fr-holidays
        alias                   French Holidays

        january 1               00:00-00:00     ; Nouvel an
        monday 2 april          00:00-00:00     ; Lundi de paques (2eme lundi avril)
        may 1                   00:00-00:00     ; Fete du travail
        may 8                   00:00-00:00     ; Victoire 45
        thursday 3 may          00:00-00:00     ; Ascension (3eme jeudi mai)
        july 14                 00:00-00:00     ; Fete nationale
        august 15               00:00-00:00     ; Assomption
        november 1              00:00-00:00     ; Toussaint  
        november 11             00:00-00:00     ; Armistice 18
        december 25             00:00-00:00     ; Noel
        }
~~~
