brew install php56 --with-debug --with-fpm --with-gmp --with-homebrew-curl --with-homebrew-libxslt --with-homebrew-openssl --with-imap --with-libmysql --with-mssql --with-phpdbg --with-postgresql --with-thread-safety --with-tidy --with-mysql --with-mysqli --with-pdo_mysql --with-png-dir --with-zlib --with-jpeg-dir --with-freetype-dir --enable-fpm --enable-zip --with-gd --enable-gd-native-ttf --enable-mbstring --with-openssl --with-mcrypt --with-curl --enable-ftp --enable-soap --enable-sockets;


brew install php56
```
To enable PHP in Apache add the following to httpd.conf and restart Apache:
    LoadModule php5_module    /usr/local/opt/php56/libexec/apache2/libphp5.so

The php.ini file can be found in:
    /usr/local/etc/php/5.6/php.ini

✩✩✩✩ Extensions ✩✩✩✩

If you are having issues with custom extension compiling, ensure that
you are using the brew version, by placing /usr/local/bin before /usr/sbin in your PATH:

      PATH="/usr/local/bin:$PATH"

PHP56 Extensions will always be compiled against this PHP. Please install them
using --without-homebrew-php to enable compiling against system PHP.

✩✩✩✩ PHP CLI ✩✩✩✩

If you wish to swap the PHP you use on the command line, you should add the following to ~/.bashrc,
~/.zshrc, ~/.profile or your shell's equivalent configuration file:

      export PATH="$(brew --prefix homebrew/php/php56)/bin:$PATH"

✩✩✩✩ FPM ✩✩✩✩

To launch php-fpm on startup:
    mkdir -p ~/Library/LaunchAgents
    cp /usr/local/opt/php56/homebrew.mxcl.php56.plist ~/Library/LaunchAgents/
    launchctl load -w ~/Library/LaunchAgents/homebrew.mxcl.php56.plist

The control script is located at /usr/local/opt/php56/sbin/php56-fpm

OS X 10.8 and newer come with php-fpm pre-installed, to ensure you are using the brew version you need to make sure /usr/local/sbin is before /usr/sbin in your PATH:

  PATH="/usr/local/sbin:$PATH"

You may also need to edit the plist to use the correct "UserName".

Please note that the plist was called 'homebrew-php.josegonzalez.php56.plist' in old versions
of this formula.

To have launchd start homebrew/php/php56 at login:
  ln -sfv /usr/local/opt/php56/*.plist ~/Library/LaunchAgents
Then to load homebrew/php/php56 now:
  launchctl load ~/Library/LaunchAgents/homebrew.mxcl.php56.plist
==> Summary
🍺  /usr/local/Cellar/php56/5.6.18: 330 files, 48.9M
```

