---
layout: page
title: Supervision de type End User Experience avec Cucumber & Watir
---

  **Rôle**            **Nom**
  ------------------- ------------------------------------------------------
  **Créateur**        Olivier JAN
  **Contributeurs**   Olivier JAN, Olivier LI-KIANG-CHEONG, David GUENAULT

Le but de ce tutoriel est d’avoir, de construire un [automate de tests
de bout en bout, également appelé End User
Experience](http://www.monitoring-fr.org/2011/05/cucumber-watir-webdriver-eue/ "http://www.monitoring-fr.org/2011/05/cucumber-watir-webdriver-eue/")

Pré-requis {#pre-requis .sectionedit3}
----------

1.  Un ordonnanceur de supervision de type Nagios (Shinken, Centreon,
    Icinga…) sur un serveur séparé de préférence pour ordonnancer les
    contrôles.
2.  Une installation fraîche d’une distribution Linux (ici une Ubuntu
    Desktop 10.04 64 bits LTS).

Tout le reste est expliqué dans ce qui suit ;)

Installation de la pile logicielle {#installation-de-la-pile-logicielle .sectionedit4}
----------------------------------

Nous avons donc comme point de départ une distribution Linux de type
desktop avec interface graphique et un navigateur Firefox. Il est bien
entendu que cette machine à accès aux sites à tester via probablement
une connexion Internet active. Vu que tous les éléments sont programmés
en Ruby, on installe fort logiquement Ruby et surtout ruby gems pour
pouvoir installer la suite et quelques dépendances. Nous installons une
version 1.8 de Ruby et de ces composants. Nous aurons également besoin
des librairies de développement Ruby.

~~~
sudo apt-get install ruby rubygems ruby-dev libxml2-dev libxslt-dev libssl-dev build-essential libruby-extras
~~~

Il est recommandé de mettre à jour les gems déjà installés par la
commande

~~~
sudo gem update
~~~

Et enfin, tout au moins sur notre Ubuntu qui ne possèdes pas une version
de Ruby Gems suffisament à jour (1.3.6 minimum), il faut les mettre à
jour comme ceci.

~~~
sudo gem install rubygems-update
cd /var/lib/gems/1.8/bin/
sudo ./update_rubygems
~~~

Cela nous installe une version 1.8.4 à l’heure de la rédaction de Ruby
Gems. Ensuite, les gems pour Cucumber-nagios, Cucumber, Watir et
Webdriver

~~~
sudo gem install cucumber cucumber-nagios watir watir-webdriver
~~~

Pour différentes raisons, on peut vouloir éviter qu’un serveur exécute
un serveur X. Il existe une possibilité de s’en passer sous GNU Linux en
installant un serveur X virtuel qui ne sera utilisé qu’à l’exécution des
scénarios. Cette pépite se nomme
[XVFB](http://en.wikipedia.org/wiki/Xvfb "http://en.wikipedia.org/wiki/Xvfb").

~~~
sudo apt-get install xvfb
sudo gem install headless
~~~

A ce moment là, il devient inutile d’installer une distribution desktop,
une version serveur suffit.

Nous allons voir un peu plus loin comment utiliser XVFB pour exécuter
nos scénarios en mode “headless” (c.a.d. sans serveur X).

Notre navigateur Firefox est désormais prêt à être scripté. Attaquons un
premier scénario basique sur wiki.monitoring-fr.org

Scénario d'exemple {#scenario-d-exemple .sectionedit5}
------------------

Nous allons rédiger un scénario d’exemple simple mais pas simpliste nous
permettant de vérifier que le wiki monitoring-fr.org est disponible,
qu’il est possible de se connecter avec un identifiant et un mot de
passe afin de rédiger de nouveaux tutoriaux comme celui-ci et enfin
d’effectuer une recherche parmi le contenu de celui-ci.

### Rédaction du scénario cucumber {#redaction-du-scenario-cucumber .sectionedit6}

Avant de commencer la rédaction des scénarii à proprement parler, il
convient de créer un dossier que vous nommerez comme bon vous semble
pour y stocker nos scénarii Cucumber et nos étapes (steps). Dans notre
cas, nous créons un dossier wiki comprenant deux sous-dossiers : support
et steps (ces deux noms sont obligatoires).

~~~
mkdir -p wiki/steps
mkdir -p wiki/support
~~~

Nous aurions pu utiliser la méthode d’auto-génération de ces dossiers
comme expliqué dans le [tutoriel
Cucumber](cucumber-nagios.html "nagios:plugins:cucumber-nagios") mais
avons préféré montrer que tout ceci pouvait se gérer manuellement. Le
dossier support contient un fichier env.rb qui permet de placer quelques
variables d’exécution bien senties dont je vous livrerais le contenu le
moment voulu.

La force de cucumber, est-il besoin de le rappeler, est de pouvoir
rédiger des tests en langage naturel… ou presque ;) et de décrire
ceux-ci par le comportement attendu de notre application. Nous allons
éclater notre test en deux scénarii complémentaires afin de pouvoir les
tester séparément ou enchaînés. Le premier est la séquence de connexion
(nom de fichier logging.feature)

~~~
vi logging.feature
~~~

~~~ {.file}
Feature: wiki Logging
  In order to write more content into the wiki
  I need to be able to log into the wiki

  Scenario: wiki Logging
    Given that I am on the wiki Connexionpage
    When I identify as "cucumber" with password "lepassequivabien"
    Then I should see "Déconnexion"
~~~

et le deuxième fort logiquement la séquence de recherche (fichier
search.feature).

~~~
vi search.feature
~~~

~~~ {.file}
Feature: wiki Search
  In order to find more about Shinken
  I need to be able to search wiki

  Scenario: wiki Search for Shinken
    Given that I am on the wiki Homepage
    When I search for "Shinken"
    Then I should see "Installation de Shinken"
~~~

Comme vous pouvez le constater, nous ne somme pas très éloignés de la
formulation que j’ai faite au départ de cette rédaction ci-dessus. Il
reste à faire correspondre ces “features” et “scénario” à des action
Watir qui piloteront le navigateur Firefox au travers de Webdriver.

### Correspondance scénario avec Watir {#correspondance-scenario-avec-watir .sectionedit7}

Je vous en ai parlé un peu avant, préparons notre environnement
d’exécution Watir en plaçant un fichier env.rb dans le dossier support
de notre dossier wiki qui contient ceci :

~~~ {.file}
begin require 'rspec/expectations'; rescue LoadError; require 'spec/expectations'; end

if ENV['FIREWATIR']
  require 'firewatir'
  Browser = FireWatir::Firefox.new
else
  case RUBY_PLATFORM
  when /darwin/
    require 'safariwatir'
    Browser = Watir::Safari.new
  when /x86_64-linux/
    require 'watir-webdriver'
    Browser = Watir::Browser.new(:firefox)
  when /win32|mingw/
    require 'watir'
    Browser = Watir::IE.new
  when /java/
    require 'celerity'
    Browser = Celerity::Browser.new
  else
    raise "This platform is not supported (#{PLATFORM})"
  end
end

# "before all"
browser = Browser

Before do
  @browser = browser
end

# "after all"
at_exit do
  browser.close
end
~~~

Nous allons maintenant rédiger nos “steps” en nous appuyant sur Cucumber
pour nous indiquer la marche à suivre. Si nous tentons d’exécuter nos
scénarii à ce moment, Cucumber va nous indiquer fort logiquement que
nous n’avons pas de “steps” correspondant à ceux-ci. Pratique :)

~~~
cd wiki
cucumber logging.feature 
~~~

retourne alors

~~~
Feature: wiki Logging
  In order to write more content into the wiki
  I need to be able to log into the wiki

  Scenario: wiki Logging                                # logging.feature:5
    Given that I am on the wiki Connexionpage           # logging.feature:6
    When I identify as "lidentifiant" with password "lepasse" # logging.feature:7
    Then I should see "Déconnexion"                     # logging.feature:8

1 scenario (1 undefined)
3 steps (3 undefined)
0m0.004s

You can implement step definitions for undefined steps with these snippets:

Given /^that I am on the wiki Connexionpage$/ do
  pending # express the regexp above with the code you wish you had
end

When /^I identify as "([^"]*)" with password "([^"]*)"$/ do |arg1, arg2|
  pending # express the regexp above with the code you wish you had
end

Then /^I should see "([^"]*)"$/ do |arg1|
  pending # express the regexp above with the code you wish you had
end
~~~

Il nous faut créer le fichier logging\_steps.rb dans le dossier steps
avec le contenu suivant :

~~~
vi steps/logging_steps.rb
~~~

~~~ {.file}
Given /^that I am on the wiki Connexionpage$/ do
  @browser.goto('http://wiki.monitoring-fr.org/start?do=login')
end

When /^I identify as "([^"]*)" with password "([^"]*)"$/ do |id, password|
  @browser.text_field(:name, 'u').set(id)
  @browser.text_field(:name, 'p').set(password)
  @browser.button(:value, 'Connexion').click
end
Then /^I should see "([^"]*)"$/ do |text|
  @browser.text.include?(text).should == true 
end
~~~

Notez comment on retrouve à quelques modifications près les suggestions
de Cucumber quand nous avons testé le scénario sans “steps” écrits. Tout
ce qu’il y a entre le when et le end est du “code” Watir à proprement
parlé. Une référence des commandes possibles est disponible sur le [site
de
Watir](http://wiki.openqa.org/display/WTR/Cheat+Sheet "http://wiki.openqa.org/display/WTR/Cheat+Sheet").
Le deuxième fichier search\_steps.rb contient ceci :

~~~
vi steps/search_steps.rb
~~~

~~~ {.file}
Given /^that I am on the wiki Homepage$/ do
  @browser.goto('http://wiki.monitoring-fr.org')
end

When /^I search for "([^"]*)"$/ do |query|
  @browser.text_field(:name, 'id').set(query)
  @browser.button(:value, 'Rechercher').click
end

Then /^I should see "([^"]*)"$/ do |text|
  @browser.text.include?(text).should == true
end
~~~

C’est en place. Exécutons de nouveau

~~~
cucumber logging.feature 
~~~

Nous avons alors une sortie beaucoup plus conforme à nos attentes :)
Notre scénario logging fonctionne parfaitement comme nous l’indique la
sortie ci-dessous.

~~~
Feature: wiki Logging
  In order to write more content into the wiki
  I need to be able to log into the wiki

  Scenario: wiki Logging                                # logging.feature:5
    Given that I am on the wiki Connexionpage           # steps/logging_steps.rb:1
    When I identify as "cucumber" with password "lepassequivabien" # steps/logging_steps.rb:9
    Then I should see "Déconnexion"                     # steps/search_steps.rb:10

1 scenario (1 passed)
3 steps (3 passed)
0m8.078s
~~~

Il reste maintenant la partie traditionnelle de branchement de ces deux
scénarii à notre ordonnanceur de supervision.

### Et en français c'est possible ? {#et-en-francais-c-est-possible .sectionedit8}

Oui m’sieur c’est possible et en plus c’est très simple à mettre en
place :

tout d’abord il va falloir connaitre les mots clés disponible :

~~~ {.code .bash}
cucumber --i18n fr
      | feature          | "Fonctionnalité"                       |
      | background       | "Contexte"                             |
      | scenario         | "Scénario"                             |
      | scenario_outline | "Plan du scénario", "Plan du Scénario" |
      | examples         | "Exemples"                             |
      | given            | "* ", "Soit ", "Etant donné "          |
      | when             | "* ", "Quand ", "Lorsque ", "Lorsqu'"  |
      | then             | "* ", "Alors "                         |
      | and              | "* ", "Et "                            |
      | but              | "* ", "Mais "                          |
      | given (code)     | "Soit", "Etantdonné"                   |
      | when (code)      | "Quand", "Lorsque", "Lorsqu"           |
      | then (code)      | "Alors"                                |
      | and (code)       | "Et"                                   |
      | but (code)       | "Mais"                                 |
~~~

La colonne de gauche donne les mots clés de référence, et la colonne de
droite donne les mots clés “traduits”. Les mots clés suffixé par (code)
correspondent à la traduction des mots utilisés dans la rédaction des
“steps”.

Reprenons notre scénario d’oirgine :

~~~
Feature: wiki Logging
  In order to write more content into the wiki
  I need to be able to log into the wiki

  Scenario: wiki Logging
    Given that I am on the wiki Connexionpage
    When I identify as "cucumber" with password "lepassequivabien"
    Then I should see "Déconnexion"
~~~

la “traduction” en français donnera :

~~~
# language: fr
Fonctionnalité: authentification wiki
  Afin d'écrire plus de contenu dans le wiki
  J'ai besoin d'être capable de m'authentifier dans le wiki
  
  Scénario: authentification wiki
    Etant donné que je suis sur la page de connexion du wiki
    Quand je m'identifie en tant que "cucumber" avec le mot de passe "lepassquivabien"
    Alors je devrais voir "Déconnexion"
~~~

notez la première ligne, **\# language: fr**, qui permet de spécifier le
langage dans lequel est rédigé le scénario. Il y en à d’autre (nombreux)
que vous pouvez lister de la manière suivante :

~~~ {.code .bash}
cucumber --i18n help
~~~

Ensuite nous allons traduire les “steps”

A l’origine nous avions ceci

~~~
Given /^that I am on the wiki Connexionpage$/ do
  @browser.goto('http://wiki.monitoring-fr.org/start?do=login')
end

When /^I identify as "([^"]*)" with password "([^"]*)"$/ do |id, password|
  @browser.text_field(:name, 'u').set(id)
  @browser.text_field(:name, 'p').set(password)
  @browser.button(:value, 'Connexion').click
end
Then /^I should see "([^"]*)"$/ do |text|
  @browser.text.include?(text).should == true 
end
~~~

Et le résultat dans la “langue de molière” (ou presque) et le suivant :

~~~
Etantdonné /^que je suis sur la page de connexion du wiki$/ do
  @browser.goto('http://wiki.monitoring-fr.org/start?do=login')
end

Quand /^je m'identifie en tant que "([^"]*)" avec le mot de passe "([^"]*)"$/ do |id, password|
  @browser.text_field(:name, 'u').set(id)
  @browser.text_field(:name, 'p').set(password)
  @browser.button(:value, 'Connexion').click
end
Alors /^je devrais voir "([^"]*)"$/ do |text|
  @browser.text.include?(text).should == true 
end
~~~

L’exécution du scénario se fait exactement de la même manière que pour
l’original.

Simple non ?

Mise en place du contrôle {#mise-en-place-du-controle .sectionedit9}
-------------------------

Il faut installer par la méthode qui vous convient [le démon
NRPE](../ubuntu-install.html "nagios:ubuntu-install") sur la machine
automate. C’est à travers ce protocole que nous ferons nos demandes de
contrôles depuis le serveur de type Nagios. Vous pouvez néanmoins faire
ces demandes par n’importe quel autre protocole à votre disposition
(SSH, NSClient++ pour un automate Windows avec Explorer ;))

### Configuration automate {#configuration-automate .sectionedit10}

Nous allons donc faire correspondre l’appel de nos scénarii à des appels
de type commandes NRPE sur notre automate de supervision en ajoutant
dans le fichier de configuration NRPE les éléments suivants :

~~~
command[check_wiki]=/usr/bin/cucumber-nagios /home/admin/EUE/production/wiki/
command[check_wiki_search]=/usr/bin/cucumber-nagios /home/admin/EUE/production/wiki/search.feature
command[check_wiki_logging]=/usr/bin/cucumber-nagios /home/admin/EUE/production/wiki/logging.feature
~~~

Notez le premier appel qui pointe vers notre dossier wiki et qui permet
d’enchaîner toutes les “features” présentes dans celui-ci. Les deux
autres appels précisent chacun quant à eux une “feature” particulière.
Nous utilisons dans ces appels cucumber-nagios et plus cucumber de façon
à avoir une sortie moins verbeuse et compatible avec le format de sortie
de Nagios. C’est à ça qu’il sert et n’est donc qu’une surcouche au final
de cucumber. Le reste ne devrait pas vous surprendre.

### Configuration Nagios {#configuration-nagios .sectionedit11}

Comme nous allons le voir, c’est un check\_nrpe que nous utilisons pour
déclencher nos scénarii sur notre automate… Logique :) Dans un
ordonnanceur type Nagios, nous avons besoin à minima d’une commande au
sens Nagios du terme, d’un hôte et d’un service pour pouvoir faire un
contrôle. Je vous passe le fichier de configuration de l’hôte qui est
habituel et je m’attarde sur la commande et le service que j’ai essayé
de rendre pratique en utilisant des macros personnalisées.

~~~
# 'check_watir' command definition
define command{
        command_name    check_watir
        command_line    $USER1$/check_nrpe -H $_SERVICEROBOT_IP$ -t $_SERVICETIMEOUT$ -c $ARG1$
        }
~~~

Je définis dans le fichier de commande check\_watir ci-dessus deux
macros \$\_SERVICEROBOT\_IP\$ et \$\_SERVICETIMEOUT\$ qui vont contenir
respectivement l’adresse IP de notre automate et la valeur de timeout du
script, celle-ci pouvant être personnalisé par type de scénario à
exécuter. Pratique car un scénario peut durer 10 secondes comme une
minute ou plus dans le cadre de l’EUE. En \$ARG1\$, le nom de la
commande NRPE telle qu’a été définie sur notre automate ci-dessus.

~~~
define service{
        use                             eue-service
        host_name                       wiki
        service_description             Search Feature
        check_command                   check_watir!check_wiki_search
        _TIMEOUT                        60       
        _ROBOT_IP                       192.168.3.4
        }
~~~

La définition de service ci-dessus contient les deux macros
personnalisées qui seront passées à la commande vu plus haut. J’hérite
d’un template eue-service toutes les propriétés du service non précisé
ci-dessous.

Au final, Nagios ordonnancera le check suivant à l’intervalle que vous
voulez en substituant les macros par leurs valeurs définies dans le
service.

~~~
/usr/local/nagios/libexec/check_nrpe -H 192.168.3.4 -t 60 -c check_wiki_search
~~~

Pour une sortie Nagios compatible donc, y compris données de performance
;)

~~~
CUCUMBER OK - Critical: 0, Warning: 0, 3 okay | passed=3; failed=0; nosteps=0; total=3; time=5
~~~

Il vous restera à industrialiser les fichiers via templates pour avoir
une supervision de type EUE parfaitement opérationnelle.

Comme dans les cas de tests, cucumber exécute les features dans l’ordre
alphabétique. Il vaut mieux alors préfixer les features avec une
séquence de chiffre dans l’ordre d’exécution pour éviter tout problème
(par exemple : 000\_login.feature, 001\_search.feature,
002\_logout.feature). Par contre le nommage des steps n’a pas a suivre
cette numérotation.

Faites attention à la façon dont vous rédigez vos features, les lignes
de scéanrios doivent être toutes différentes et si ce n’est pas le cas
cucumber risque de vous jeter.