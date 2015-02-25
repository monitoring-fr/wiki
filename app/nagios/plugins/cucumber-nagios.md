---
layout: page
---

[[[Cucumber Nagios](cucumber-nagios@do=backlink.html)]]

[wiki monitoring-fr.org](../../start.html "[ALT+H]")

![Logo Monitoring](../../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../../start.html "start") »
[Nagios](../start.html "nagios:start") » [Nagios
Plugins](start.html "nagios:plugins:start") » [Cucumber
Nagios](cucumber-nagios.html "nagios:plugins:cucumber-nagios")

### Table des matières {.toggle}

-   [Cucumber Nagios](cucumber-nagios.html#cucumber-nagios)
    -   [Installation](cucumber-nagios.html#installation)
    -   [Créer un projet](cucumber-nagios.html#creer-un-projet)
    -   [Créer un scénario](cucumber-nagios.html#creer-un-scenario)
    -   [Préparation au
        déploiement](cucumber-nagios.html#preparation-au-deploiement)
    -   [Vérification du
        fonctionnement](cucumber-nagios.html#verification-du-fonctionnement)

Cucumber Nagios {#cucumber-nagios .sectionedit1}
===============

[cucumber-nagios](http://auxesis.github.com/cucumber-nagios/ "http://auxesis.github.com/cucumber-nagios/")
est le nom d’un programme écrit en ruby qui permet de raccorder cucumber
à Nagios, Icinga & Shinken et qui permet à ces solutions de supervision
de pratiquer ce que les anglo-saxons appellent le “Behaviour Driven
Monitoring” qu’il est possible de traduire par [Supervison pilotée par
le
comportement](http://www.monitoring-fr.org/2011/03/behaviour-driven-monitoring/ "http://www.monitoring-fr.org/2011/03/behaviour-driven-monitoring/").
C’est donc d’un type de supervision de type Ressenti utilisateur ou
supervision de bout en bout ou encore de End User Experience dont il
s’agit.

Installation {#installation .sectionedit2}
------------

L’installation ne pose aucun souci particulier puisqu’il suffit
d’utiliser les gems ruby pour cela. L’ensemble des dépendances
nécessaires est installé en même temps.

~~~
sudo gem install cucumber-nagios
~~~

Créer un projet {#creer-un-projet .sectionedit3}
---------------

Une fois l’installation faîte, il est temps de créer un premier projet.
Un projet au sens cucumber est un ensemble de scénarios qui permettent
de tester le comportement d’une application. Application est utilisé ici
au sens large du terme et recouvre également un site web par exemple.
Nous allons tester différents éléments de monitoring-fr.org.

~~~
cucumber-nagios-gen project monitoring-fr.org
~~~

Voilà notre répertoire de projet monitoring-fr.org créé et voici ce
qu’il contient

~~~
monitoring-fr.org/:
features  Gemfile  README

monitoring-fr.org/features:
steps  support

monitoring-fr.org/features/steps:
amqp_steps.rb  benchmark_steps.rb  command_steps.rb  dns_steps.rb  file_steps.rb  http_header_steps.rb  http_steps.rb  ping_steps.rb  ssh_steps.rb
~~~

Créer un scénario {#creer-un-scenario .sectionedit4}
-----------------

Un scénario est appelé “feature” dans le jargon cucumber et nous allons
en créer un premier simple qui va permettre de tester la page d’accueil
du site principal du domaine monitoring-fr.org. Pour cela nous nous
déplaçons dans le répertoire monitoring-fr.org

~~~
cd monitoring-fr.org
~~~

et nous lançons une nouvelle commande

~~~
cucumber-nagios-gen feature www.monitoring-fr.org homepage
~~~

Nous obtenons alors un nouveau dossier
[www.monitoring-fr.org](http://www.monitoring-fr.org "http://www.monitoring-fr.org")
dans le dossier features de notre répertoire contenant un fichier
homepage.feature dont voici le contenu.

~~~
Feature: www.monitoring-fr.org
  It should be up

  Scenario: Visiting home page
    When I go to "http://www.monitoring-fr.org"
    Then the request should succeed
~~~

C’est notre scénario écrit en simple anglais; et c’est là toute la
puissance de cucumber. Il est possible comme nous le verrons plus tard
d’écrire ses scénarios en français (non testé mais documenté). À côté du
fichier de feature se trouve un dossier steps contenant les étapes du
scénario écrits pour webrat. Cela permet d’étendre les possibilités de
scénario pour cucumber.

Préparation au déploiement {#preparation-au-deploiement .sectionedit5}
--------------------------

Maintenant que nous avons un premier scénario (simplissime soit), il est
temps de penser au déploiement de celui-ci sur notre serveur Nagios
compatible que nous ne souhaitons pas polluer par tout un tas de gems.
Aussi allons-nous les embarquer avec notre projet pour rendre celui-ci
indépendant. Un simple

~~~
bundle install
~~~

nous permet cela. **La seule contrainte de ce principe est d’avoir sur
le serveur Nagios compatible de production les paquets RubyGems et le
gem bundler**.

Vérification du fonctionnement {#verification-du-fonctionnement .sectionedit6}
------------------------------

Toujours depuis notre répertoire projet, nous lançon un simple

~~~
cucumber-nagios features/www.monitoring-fr.org/homepage.feature
~~~

qui nous retourne une ligne formatée à la Nagios like

~~~
CUCUMBER OK - Critical: 0, Warning: 0, 2 okay | passed=2; failed=0; nosteps=0; total=2; time=0
~~~

Ce tutoriel n’a fait qu’introduire Cucumber, son installation et son
mode de fonctionnement. Un tutoriel complet pour utiliser
[cucumber-nagios dans le cadre de la supervision de bout est en
bout](cucumber-nagios-watir.html "nagios:plugins:cucumber-nagios-watir")
est aussi disponible.

SOMMAIRE {#sommaire .sectionedit1}
--------

**[Accueil](../../start.html "start")**

**[Supervision](../../supervision/start.html "supervision:start")**

-   [Nagios](../start.html "nagios:start")
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

**[Développement](../../dev/start.html "dev:start")**

Nagios Plugins {#nagios-plugins .sectionedit1}
--------------

-   [Best of plugins compatibles
    Nagios](bestof.html "nagios:plugins:bestof")
-   [Cucumber
    Nagios](cucumber-nagios.html "nagios:plugins:cucumber-nagios")
-   [Supervision de type End User Experience avec Cucumber &
    Watir](cucumber-nagios-watir.html "nagios:plugins:cucumber-nagios-watir")
-   [check\_apt](check_apt.html "nagios:plugins:check_apt")
-   [check\_by\_ssh](check_by_ssh.html "nagios:plugins:check_by_ssh")
-   [check\_citrix\_lic](check_citrix_lic.html "nagios:plugins:check_citrix_lic")
-   [check\_dnsbl](check_dnsbl.html "nagios:plugins:check_dnsbl")
-   [check\_esx3](check_esx3.html "nagios:plugins:check_esx3")
-   [check\_esx3\_dp](check_esx3_dp.html "nagios:plugins:check_esx3_dp")
-   [check\_hpasm](check_hpasm.html "nagios:plugins:check_hpasm")
-   [check\_http](check_http.html "nagios:plugins:check_http")
-   [check\_jmx](check_jmx.html "nagios:plugins:check_jmx")
-   [check\_multi](check_multi.html "nagios:plugins:check_multi")
-   [check\_prelude](check_prelude.html "nagios:plugins:check_prelude")
-   [check\_procs](check_procs.html "nagios:plugins:check_procs")
-   [check\_procs2](check_procs2.html "nagios:plugins:check_procs2")
-   [check\_rrd](../../plugins/check_rrd.html "nagios:plugins:check_rrd")
-   [check\_webpage.rb](check_webpage.rb.html "nagios:plugins:check_webpage.rb")

-   [Afficher le texte
    source](cucumber-nagios@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](cucumber-nagios@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](cucumber-nagios@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](cucumber-nagios@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](cucumber-nagios@do=media.html "Gestionnaire de médias")
-   [Index](cucumber-nagios@do=index.html "Index [X]")
-   [Connexion](cucumber-nagios@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de
    page](cucumber-nagios.html#dokuwiki__top "Haut de page [T]")

nagios/plugins/cucumber-nagios.txt · Dernière modification: 2013/04/11
17:23 par Olivier Jan

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

![](../../lib/exe/indexer.php@id=nagios%253Aplugins%253Acucumber-nagios&1424859574)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
