---
layout: page
---

[[[Développement Ruby](start@do=backlink.html)]]

[wiki monitoring-fr.org](../../start.html "[ALT+H]")

![Logo Monitoring](../../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../../start.html "start") »
[Développement](../start.html "dev:start") » [Développement
Ruby](start.html "dev:ruby:start")

### Table des matières {.toggle}

-   [Développement Ruby](start.html#developpement-ruby)
    -   [Gestion des gems](start.html#gestion-des-gems)
        -   [Désinstaller toutes les gems
            ruby](start.html#desinstaller-toutes-les-gems-ruby)
        -   [Travailler avec plusieurs versions de
            ruby](start.html#travailler-avec-plusieurs-versions-de-ruby)

Développement Ruby {#developpement-ruby .sectionedit1}
==================

Gestion des gems {#gestion-des-gems .sectionedit2}
----------------

### Désinstaller toutes les gems ruby {#desinstaller-toutes-les-gems-ruby .sectionedit3}

A vos risques et périls ! ![;-)](../../lib/images/smileys/icon_wink.gif)

~~~~ {.code .bash}
for x in `gem list --no-versions`; do gem uninstall $x -a -x -I; done
~~~~

### Travailler avec plusieurs versions de ruby {#travailler-avec-plusieurs-versions-de-ruby .sectionedit4}

Il arrive (par exemple pour tester un développement) que l’on ai besoin
de tester sous différentes version de ruby. RVM est fait pour cela

~~~~ {.code .bash}
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
~~~~

SOMMAIRE {#sommaire .sectionedit1}
--------

**[Accueil](../../start.html "start")**

**[Supervision](../../supervision/start.html "supervision:start")**

-   [Nagios](../../nagios/start.html "nagios:start")
-   [Centreon](../../centreon/start.html "centreon:start")
-   [Shinken](../../shinken/start.html "shinken:start")
-   [Zabbix](../../zabbix/start.html "zabbix:start")
-   [OpenNMS](../../opennms/start.html "opennms:start")
-   [EyesOfNetwork](../../eyesofnetwork/start.html "eyesofnetwork:start")
-   [Groundwork](../../groundwork/start.html "groundwork:start")
-   [Zenoss](../../zenoss/start.html "zenoss:start")
-   [Vigilo](../../vigilo/start.html "vigilo:start")
-   [Icinga](../../icinga/start.html "icinga:start")
-   [Cacti](../../cacti/start.html "cacti:start")
-   [Ressenti
    utilisateur](../../supervision/eue/start.html "supervision:eue:start")
-   [Ressenti utilisateur avec
    sikuli](../../sikuli/eue/start.html "sikuli:eue:start")

**[Hypervision](../../hypervision/start.html "hypervision:start")**

-   [Canopsis](../../canopsis/start.html "canopsis:start")

**[Sécurité](../../securite/start.html "securite:start")**

**[Infrastructure](../../infra/start.html "infra:start")**

**[Développement](../start.html "dev:start")**

-   [Afficher le texte
    source](start@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](start@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](start@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](start@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](start@do=media.html "Gestionnaire de médias")
-   [Index](start@do=index.html "Index [X]")
-   [Connexion](start@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de page](start.html#dokuwiki__top "Haut de page [T]")

dev/ruby/start.txt · Dernière modification: 2013/03/29 09:39
(modification externe)

[![CC Attribution-Noncommercial-Share Alike 3.0
Unported](../../lib/images/license/button/cc-by-nc-sa.png)](http://creativecommons.org/licenses/by-nc-sa/3.0/)

[![www.chimeric.de](../../lib/tpl/arctic/images/button-chimeric-de.png)](http://www.chimeric.de "www.chimeric.de")
[![Valid
CSS](../../lib/tpl/arctic/images/button-css.png)](http://jigsaw.w3.org/css-validator/check/referer "Valid CSS")
[![Driven by
DokuWiki](../../lib/tpl/arctic/images/button-dw.png)](http://wiki.splitbrain.org/wiki:dokuwiki "Driven by DokuWiki")
[![do yourself a favour and use a real browser - get
firefox!!](../../lib/tpl/arctic/images/button-firefox.png)](http://www.firefox-browser.de "do yourself a favour and use a real browser - get firefox")
[![Recent changes RSS
feed](../../lib/tpl/arctic/images/button-rss.png)](../../feed.php "Recent changes RSS feed")
[![Valid XHTML
1.0](../../lib/tpl/arctic/images/button-xhtml.png)](http://validator.w3.org/check/referer "Valid XHTML 1.0")

![](../../lib/exe/indexer.php@id=dev%253Aruby%253Astart&1424859837)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
