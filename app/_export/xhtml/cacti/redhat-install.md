---
layout: page
---

### Table des matières {.toggle}

-   [Installation Cacti sur RedHat
    9](redhat-install.html#installation-cacti-sur-redhat-9)
    -   [Compilation Apache
        2.0.59](redhat-install.html#compilation-apache-2059)
    -   [Compilation PHP 4.4.4](redhat-install.html#compilation-php-444)
    -   [Compilation RRDTool
        1.2.15](redhat-install.html#compilation-rrdtool-1215)
    -   [Compilation Cactid
        0.8.6g](redhat-install.html#compilation-cactid-086g)

Installation Cacti sur RedHat 9 {#installation-cacti-sur-redhat-9 .sectionedit1}
===============================

Comme la redHat 9 est fournie avec PHP 4.2 et Apache 2.0.40, il faut
compiler un nouveau PHP et Apache2; PHP4.4 nécessitant une version
2.0.50 d’Apache.

Compilation Apache 2.0.59 {#compilation-apache-2059 .sectionedit2}
-------------------------

~~~~ {.code}
wget http://apache.cict.fr/httpd/httpd-2.0.59.tar.bz2
pushd httpd-2.0.59
./configure --enable-so --enable-cgi --enable-info --enable-rewrite --enable-speling --enable-usertrack --enable-deflate --enable-ssl --enable-mime-magic
make
make install
popd
~~~~

Compilation PHP 4.4.4 {#compilation-php-444 .sectionedit3}
---------------------

Ci-dessous le configure utilisé pour le php fourni avec la RedHat. Nous
l’utilisons comme point de départ pour notre configuration.

~~~~ {.code}
./configure '--host=i386-redhat-linux' '--build=i386-redhat-linux' '--target=i386-redhat-linux-gnu' '--program-prefix=' '--prefix=/usr/local/php' '--exec-prefix=/usr/local/php' '--bindir=/usr/local/php/bin' '--sbindir=/usr/local/php/sbin' '--sysconfdir=/usr/local/php/etc' '--datadir=/usr/local/php/share' '--includedir=/usr/local/php/include' '--libdir=/usr/local/php/lib' '--libexecdir=/usr/local/php/libexec' '--localstatedir=/usr/local/php/var' '--sharedstatedir=/usr/local/php/com' '--mandir=/usr/local/php/share/man' '--infodir=/usr/local/php/share/info' '--cache-file=../config.cache' '--with-config-file-path=/usr/local/php/etc' '--with-config-file-scan-dir=/usr/local/php/etc/php.d' '--enable-force-cgi-redirect' '--disable-debug' '--enable-pic' '--disable-rpath' '--enable-inline-optimization' '--with-bz2' '--with-db3' '--with-curl' '--with-dom=/usr' '--with-exec-dir=/usr/bin' '--with-freetype-dir=/usr' '--with-png-dir=/usr' '--with-gd' '--enable-gd-native-ttf' '--with-ttf' '--with-gdbm' '--with-gettext' '--with-ncurses' '--with-gmp' '--with-iconv' '--with-jpeg-dir=/usr' '--with-openssl' '--with-png' '--with-pspell' '--with-regex=system' '--with-xml' '--with-expat-dir=/usr' '--with-zlib' '--with-layout=GNU' '--enable-bcmath' '--enable-exif' '--enable-ftp' '--enable-magic-quotes' '--enable-safe-mode' '--enable-sockets' '--enable-sysvsem' '--enable-sysvshm' '--enable-discard-path' '--enable-track-vars' '--enable-trans-sid' '--enable-yp' '--enable-wddx' '--without-oci8' '--with-pear=/usr/local/php/share/pear' '--with-imap=shared' '--with-imap-ssl' '--with-kerberos=/usr/kerberos' '--with-ldap=shared' '--with-mysql=shared,/usr' '--with-pgsql=shared' '--with-snmp=shared,/usr' '--with-snmp=shared' '--enable-ucd-snmp-hack' '--with-unixODBC=shared' '--enable-memory-limit' '--enable-bcmath' '--enable-shmop' '--enable-versioning' '--enable-calendar' '--enable-dbx' '--enable-dio' '--enable-mcal' '--with-apxs2=/usr/local/apache2/bin/apxs'
~~~~

~~~~ {.code}
http://www.php.net/get/php-4.4.4.tar.bz2/from/a/mirror
pushd php-4.4.4
./configure '--host=i686-redhat-linux' '--build=i686-redhat-linux' '--target=i686-redhat-linux-gnu' '--program-prefix=' '--prefix=/usr/local/php' '--exec-prefix=/usr/local/php' '--bindir=/usr/local/php/bin' '--sbindir=/usr/local/php/sbin' '--sysconfdir=/usr/local/php/etc' '--datadir=/usr/local/php/share' '--includedir=/usr/local/php/include' '--libdir=/usr/local/php/lib' '--libexecdir=/usr/local/php/libexec' '--localstatedir=/usr/local/php/var' '--sharedstatedir=/usr/local/php/com' '--mandir=/usr/local/php/share/man' '--infodir=/usr/local/php/share/info' '--cache-file=../config.cache' '--with-config-file-path=/usr/local/php/etc' '--with-config-file-scan-dir=/usr/local/php/etc/php.d' '--enable-force-cgi-redirect' '--disable-debug' '--enable-pic' '--disable-rpath' '--enable-inline-optimization' '--with-bz2' '--with-curl' '--with-dom=/usr' '--with-exec-dir=/usr/bin' '--with-freetype-dir=/usr' '--with-png-dir=/usr' '--with-gd' '--enable-gd-native-ttf' '--with-ttf' '--with-gdbm' '--with-gettext' '--with-ncurses' '--with-gmp' '--with-iconv' '--with-jpeg-dir=/usr' '--with-openssl' '--with-png' '--with-pspell' '--with-regex=system' '--with-xml' '--with-expat-dir=/usr' '--with-zlib' '--with-layout=GNU' '--enable-bcmath' '--enable-exif' '--enable-ftp' '--enable-magic-quotes' '--enable-safe-mode' '--enable-sockets' '--enable-sysvsem' '--enable-sysvshm' '--enable-discard-path' '--enable-track-vars' '--enable-trans-sid' '--enable-yp' '--enable-wddx' '--without-oci8' '--with-pear=/usr/local/php/share/pear' '--with-imap' '--with-imap-ssl' '--with-kerberos=/usr/kerberos' '--with-ldap' '--with-mysql' '--with-pgsql' '--with-snmp' '--enable-ucd-snmp-hack' '--with-unixODBC' '--enable-memory-limit' '--enable-bcmath' '--enable-shmop' '--enable-versioning' '--enable-calendar' '--enable-dbx' '--enable-dio' '--enable-mcal' '--with-apxs2=/usr/local/apache2/bin/apxs'
make
make install
popd
~~~~

Compilation RRDTool 1.2.15 {#compilation-rrdtool-1215 .sectionedit4}
--------------------------

~~~~ {.code}
wget http://people.ee.ethz.ch/~oetiker/webtools/rrdtool/pub/rrdtool-1.2.15.tar.gz
tar -xzf rrdtool-1.2.15.tar.gz
pushd rrdtool-1.2.15
./Configure --prefix=/usr/local/rrdtool
make
make install
popd
~~~~

Compilation Cactid 0.8.6g {#compilation-cactid-086g .sectionedit5}
-------------------------
