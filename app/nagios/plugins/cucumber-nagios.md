---
layout: page
title: Cucumber Nagios
---

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