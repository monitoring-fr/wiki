---
layout: page
title: Développement Ruby
---

Gestion des gems {#gestion-des-gems .sectionedit2}
----------------

### Désinstaller toutes les gems ruby {#desinstaller-toutes-les-gems-ruby .sectionedit3}

A vos risques et périls ! ![;-)](../../lib/images/smileys/icon_wink.gif)

~~~ {.code .bash}
for x in `gem list --no-versions`; do gem uninstall $x -a -x -I; done
~~~

### Travailler avec plusieurs versions de ruby {#travailler-avec-plusieurs-versions-de-ruby .sectionedit4}

Il arrive (par exemple pour tester un développement) que l’on ai besoin
de tester sous différentes version de ruby. RVM est fait pour cela

~~~ {.code .bash}
########################################################################
# RVM : Install multiple ruby versions the easy way (debian like distro)
# note that ruby will be installed in your home folder
# so it does not affect your system ruby version
########################################################################
 
# install compilation tools and git
sudo apt-get update
sudo apt-get install build-essential git
 
# install rvm with latest ruby stable release (this take a long time ...)
curl -L https://get.rvm.io | bash -s stable --ruby
source ~/.profile
echo "source $HOME/.rvm/scripts/rvm" >> ~/.bash_profile
 
# install ruby prerequisites (rvm will request your root or sudo password)
rvm requirement run
 
# install ruby 1.9.2 
rvm install 1.9.2
 
# enable ruby 1.9.2 as the default ruby version
rvm use 1.9.2 --default
~~~