---
layout: page
title: check\_by\_ssh
---

Attention, je modifie le document, les informations sont mouvantes, …
(Pierre, le 24/03/2010)

Pour effectuer des check\_by\_ssh avec Nagios, il faut au préalable
procéder à l’échange de clés entre le serveur nagios et l’hôte
supervisé.

Génération des clefs sur le serveur nagios {#generation-des-clefs-sur-le-serveur-nagios .sectionedit2}
------------------------------------------

Sur le serveur nagios, se connecter avec l’utilisateur `nagios` et
entrer la commande suivante :

~~~
su - nagios
cd ~
mkdir .ssh
ssh-keygen -b 2048 -t rsa
~~~

le terminal renvoie alors, laissez le chemin par défaut (normalement, il
vous propose répertoire `.ssh` du home de l’utilisateur `nagios`)

~~~
Generating public/private rsa key pair.
Enter file in which to save the key (/home/nagios/.ssh/id_rsa):
~~~

Appuyer trois fois sur entrée pour valider la création de cette double
clé public privé. Vous venez de genere un jeux de clefs (public,
private) pour votre serveur nagios, elles vont permettre une
autentification transparente (sans saisie des mots de passe).

Mise en place de la clef public sur les serveurs à auditer {#mise-en-place-de-la-clef-public-sur-les-serveurs-a-auditer .sectionedit3}
----------------------------------------------------------

Ensuite, créer un répertoire ssh dans le répertoire de départ de la
machine serveur distante si il n’existe pas gràce à la commande :

~~~
ssh user@serveur_distant "mkdir .ssh; chmod 0700 .ssh"
~~~

Enfin, envoyer la partie publique de la clé créée sur la machine locale
avec

~~~
scp .ssh/id_rsa.pub user@machine_distante:.ssh/authorized_keys2
~~~

**ATTENTION :** Sous peine de se prendre des erreurs à la connexion, les
autorisations sur les répertoires et fichiers doivent être strictement
positionnés comme suit (à exécuter en tant que utilisateur nagios):

~~~
chmod go-w ~/
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
~~~

Maintenant, l’utilisateur nagios peut se connecter à l’hôte à superviser
sans mot de passe

### Testons {#testons .sectionedit4}

Localisons le fichier `check_by_ssh` sur le serveur nagios, afin de
l’exécuter à la main.

~~~
$ cd /usr/local/nagios/libexec
$ ./check_by_ssh -H serveur_distant -l user -C ls
~~~

Définition de commande {#definition-de-commande .sectionedit5}
----------------------

~~~
# 'check_ssh_smtp' command definition
define command{
        command_name    check_ssh_smtp
        command_line    $USER1$/check_by_ssh -H $HOSTADDRESS$ -i $USER6$ -C "$USER1$/check_smtp -H 127.0.0.1"
        }
~~~

![:!:](../../lib/images/smileys/icon_exclaim.gif) Pour que cette
commande fonctionne correctement, il est à noter que le répertoire
libexec ^[1)](check_by_ssh.html#fn__1)^ qui est défini par la variable
\$USER1\$ doit être situé au même endroit sur le serveur Nagios et
l’hôte supervisé. la macro nagios \$USER6\$ contient la clef qui va être
utilisée lors de l’appel ssh comme /home/ojan/.ssh/id\_rsa par exemple.

Définition de service {#definition-de-service .sectionedit6}
---------------------

~~~
define service{
        use                             ssh-service         ; Name of service template to use
        host_name                       *
        service_description             MAIL:SMTP
        check_command                   check_ssh_smtp!
        }
~~~

^[1)](check_by_ssh.html#fnt__1)^ généralement en /usr/local/nagios/libexec