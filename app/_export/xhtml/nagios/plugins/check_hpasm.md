---
layout: page
---

### Table des matières {.toggle}

-   [check\_hpasm](check_hpasm.html#check_hpasm)

### check\_hpasm {#check_hpasm .sectionedit1}

check\_hpasm est un plugin développé par consol.de et permettant de
vérifier la santé des serveurs HP Proliant et Blade. Il se base sur
hpasm pour récupérer l’état hardware du serveur hp supervisé. hpasm peut
être assez mal vu en raison de sa lourdeur dans sa distribution
officielle, mais il existe toujours une alternative qui est une version
légère de hpasm. Celle ci est disponible sur le site de hp et il existe
même un dépot Debian. Nous allons voir comment mettre cela en place sous
Debian squeeze.

#### Ajout du dépot sur Debian {#ajout-du-depot-sur-debian}

Le dépôt est défini pour squeeze mais le support est également assuré
pour d’autres versions

-   Editer le fichier /etc/apt/sources.list et ajouter la ligne suivante
    :

~~~~ {.code}
deb http://downloads.linux.hp.com/SDR/downloads/ProLiantSupportPack/Debian squeeze/current non-free
~~~~

-   créer un fichier hp.key.pub et copier/coller le contenu suivant

~~~~ {.code}
-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: GnuPG v1.4.0 (MingW32)

mQGiBEIxWpoRBADb06sJgnD7MJnm2Ny1nmTFLDSZ8vkubP+pmfn9N9TE26oit+KI
OnVTRVbSPl3F15wTjSBGR453MEfnzp1NrMk1GIa/m1nKAmgQ4t1714C4jQab0to+
gP51XhPhtAGt7BggorQw2RXa4KdTCh8ByOIaDKRYcESmMazSZ+Pscy2XRwCgm771
21RCM0RcG2dmHZZgKH8fTscD/RiY3CHI2jJl9WosIYXbZpOySzrLn0lRCRdNdpew
Y5m1f3lhqoSvJk7pXjs4U+3XlOlUhgWl5HiXuWSVyPu2ilfGdfgpJslawI85fBQg
Ul5kcrjLHHsApeG8oGStFJE2JAc+0D+whmGmJbjWKwuZJmgpm9INplA4h1BYJbx+
6A3MBACFiMTttDPpJ+5eWr1VSZwxCZNqvPWmjpL5Nh9F8xzE7q+ad2CFKSebvRrv
Jf7Y2m+wY9bmo5nJ3wHYEX3Aatt+QVF10G6wTdIz/Ohm/Pc4Li4NhzYOv7FKxVam
97UN0O8Rsl4GhE2eE8H+Q3QYFvknAWoTj3Rq3/A5FA6FsRFhxbQwSGV3bGV0dC1Q
YWNrYXJkIENvbXBhbnkgKEhQIENvZGVzaWduaW5nIFNlcnZpY2UpiGQEExECACQF
AkIxWpoCGwMFCRLMAwAGCwkIBwMCAxUCAwMWAgECHgECF4AACgkQUnvFOiaJuIc1
2wCgj2UotUgSegPHmcKdApY+4WFaz/QAnjI58l5bDD8eElBCErHVoq9uPMczuQIN
BEIxWqUQCADnBXqoU8QeZPEy38oI0GrN2q7nvS+4UBQeIRVy8x+cOqDRDcE8PHej
7NtxP698U0WFGK47GszjiV4WTnvexuJk0B5AMEBHana8fVj7uRUcmyYZqOZd7EXn
Q3Ivi8itfkTICkhZi7bmGsSF0iJ0eAI5n2bCqJykNQvJ6a3dWJKP8EgaBCZj+TGL
WWJHDZsrn8g4BeaNS/MbmsCLAk8N6bWMGzAKfgxUraMCwuZ9fVyHFavHdeChUtna
qnF4uw0hHLaGWmTJjziXVvVC1a8+inTxPZkVpAvD0A+/LNlkP7TtAdaVOJqv3+a3
ybMQL851bRTFyt+H0XGHhzhhtuu9+DyfAAMFCADRWGxIfniVG7O4wtwLD3sWzR/W
LmFlJYu4s9rSDgn3NDjigQzZoVtbuv3Z9IZxBMoYa50MuybuVDp55z/wmxvYoW2G
25kOFDKx/UmkKkUBLdokb5V1p9j5SJorGBSfsNAHflhmBhyuMP4CDISbBUSN7oO1
Oj41jNxpqhy+8ayygSVcTNwMe909J/HdC//xFANLDhjKPf3ZAulWNhOvjTlpF46B
yt1l8ZNinIeE7CFL7H+LlMl2Ml6wsOkrxsSauBis6nER4sYVqrMdzpUU2Sr2hj6Q
sJ+9TS+IURcnxL/M851KCwLhwZKdphQjT3mXXsoCx/l3rI6cxpwYgjiKiZhOiE8E
GBECAA8FAkIxWqUCGwwFCRLMAwAACgkQUnvFOiaJuIenewCdHcEvMxBYprqRjKUw
04EypyFtZTgAn0wds0nbpd2+VZ5WHbVRfU4y5Y5Y
=+cX+ 
-----END PGP PUBLIC KEY BLOCK-----
~~~~

-   Ajouter la clé

~~~~ {.code}
apt-key add hp.key.pub
~~~~

#### Installation de hp-health

~~~~ {.code}
apt-get update
apt-get install hp-health
~~~~

#### Installation de l'agent snmp {#installation-de-l-agent-snmp}

check\_hpasm fonctionne selon deux modes (local ou distant). En local il
utilise hpasmcli pour récupérer les informations. En distant il utilise
l’agent snmp hp installé via le packet hp-snmp-agents du dépot hp.

~~~~ {.code}
apt-get install snmp snmpd hp-snmp-agents
~~~~

-   Editer le fichier /etc/snmp/snmpd.conf
-   commenter la ligne : com2sec paranoid default public
-   décommenter la ligne : \#com2sec readonly default public

~~~~ {.code}
/sbin/hpsnmpconfig
This configuration script will configure SNMP to integrate with the HP SIM and
the HP System Management Homepage by editting the snmpd.conf file. The HP-SNMP-Agents can also exist in a more secure
SNMP environment (e.g. VACM) that you have previously configured. See the
hp-snmp-agents(4) man page for specific details on how to configure the VACM entries
in the 'snmpd.conf' file. You may press <ctrl+c> now to exit now if needed.

Do you wish to use an existing snmpd.conf (y/n) (Blank is n): y
~~~~

#### Installation de check\_hpasm

le plugin est disponible sur le site :
[http://labs.consol.de/lang/en/nagios/check\_hpasm](http://labs.consol.de/lang/en/nagios/check_hpasm "http://labs.consol.de/lang/en/nagios/check_hpasm").
Vous aurez besoin de make pour la phase de construction

~~~~ {.code}
apt-get install make
wget http://labs.consol.de/wp-content/uploads/2011/10/check_hpasm-4.3.tar.gz
tar zxvf check_hpasm-4.3.tar.gz
cd check_hpasm-4.3
./configure && make
cp plugins-scripts/check_hpasm /usr/local/nagios/libexec
chmod +x /usr/local/nagios/libexec/check_hpasm
~~~~

#### Tests

pensez a redémarrer les agents hp ou vous ne pourrez pas utiliser le
check en mode snmp

-   en local

~~~~ {.code}
./check_hpasm --perfdata=short
OK - System: 'proliant dl120 g7', S/N: 'XXXXXXX', ROM: 'J01 04/21/2011', hardware working fine | fan_1=37% fan_2=37% fan_3=37% fan_4=37% fan_5=46% fan_6=46% fan_7=46% fan_8=46% temp_1=20;42;42 temp_2=40;74;74 temp_3=25;87;87 temp_4=31;80;80 temp_5=29;80;80 temp_6=35;60;60 temp_7=29;90;90 temp_8=37;85;85 temp_9=28;80;80 temp_10=25;80;80 temp_11=29;66;66 temp_12=29;95;95 temp_13=29;95;95 temp_14=30;62;62 temp_15=26;55;55 temp_16=28;95;95
~~~~

-   en mode snmp

~~~~ {.code}
./check_hpasm -H localhost -C public --perfdata=short --snmpwalk /usr/bin/snmpwalk
~~~~
