---
layout: page
---

### Table des matières {.toggle}

-   [Zimbra](zimbra.html#zimbra)
    -   [Trucs et astuces](zimbra.html#trucs-et-astuces)
        -   [Récupérer la liste des
            alias](zimbra.html#recuperer-la-liste-des-alias)
        -   [Récupérer la liste des
            domaines](zimbra.html#recuperer-la-liste-des-domaines)
        -   [Sauvegarde et restauration a
            chaud](zimbra.html#sauvegarde-et-restauration-a-chaud)

Zimbra {#zimbra .sectionedit1}
======

Trucs et astuces {#trucs-et-astuces .sectionedit2}
----------------

### Récupérer la liste des alias {#recuperer-la-liste-des-alias .sectionedit3}

~~~ {.code .bash}
#!/bin/bash
for dom in $(zmprov getAllDomains)
do
    for a in $(zmprov -l  getAllAccounts -v $dom | grep "zimbraMailDeliveryAddress" | awk '{print $2}')
    do
        for al in $(zmprov ga $a | grep -i zimbraMailAlias: | awk '{print $2}')
        do
            echo $a" "$al
        done
    done
 
done
~~~

### Récupérer la liste des domaines {#recuperer-la-liste-des-domaines .sectionedit4}

~~~
zmprov getAllDomains
~~~

### Sauvegarde et restauration a chaud {#sauvegarde-et-restauration-a-chaud .sectionedit5}

Il suffit d’utiliser le script zmbkpose
[http://wiki.zimbra.com/wiki/HOT\_Backup\_and\_HOT\_Restore](http://wiki.zimbra.com/wiki/HOT_Backup_and_HOT_Restore "http://wiki.zimbra.com/wiki/HOT_Backup_and_HOT_Restore")

#### sauvegarde a chaud

##### Sauvegarde complète {#sauvegarde-complete}

~~~
zmbkpose -f
~~~

##### Sauvegarde incrémentale {#sauvegarde-incrementale}

~~~
zmbkpose -i
~~~

#### Restauration compte non existant

Le domaine doit exister !

~~~
zmbkpose -restoreAccount [email protected]
/*  */!function(){try{var t="currentScript"in document?document.currentScript:function(){for(var t=document.getElementsByTagName("script"),e=t.length;e--;)if(t[e].getAttribute("cf-hash"))return t[e]}();if(t&&t.previousSibling){var e,r,n,i,c=t.previousSibling,a=c.getAttribute("data-cfemail");if(a){for(e="",r=parseInt(a.substr(0,2),16),n=2;a.length-n;n+=2)i=parseInt(a.substr(n,2),16)^r,e+=String.fromCharCode(i);e=document.createTextNode(e),c.parentNode.replaceChild(e,c)}}}catch(u){}}();/*  */
~~~

#### Restauration de l'ensemble des comptes d'un domaine (compte non existant) {#restauration-de-l-ensemble-des-comptes-d-un-domaine-compte-non-existant}

Le domaine doit exister !

~~~
cd /opt/zimbra/backup/repertoiredesauvegarde
for a in $(ls -1 | grep domain.tld | grep tgz | sed -e "s/\.tgz//g"); do zmbkpose -restoreAccount $a ; done
~~~
