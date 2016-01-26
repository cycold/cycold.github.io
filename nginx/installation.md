brew install nginx
==> Installing nginx dependency: pcre
==> Downloading https://homebrew.bintray.com/bottles/pcre-8.37.yosemite.bottle.tar.gz
######################################################################## 100.0%
==> Pouring pcre-8.37.yosemite.bottle.tar.gz
🍺  /usr/local/Cellar/pcre/8.37: 146 files, 5.9M
==> Installing nginx
==> Downloading https://homebrew.bintray.com/bottles/nginx-1.8.0.yosemite.bottle.tar.gz
######################################################################## 100.0%
==> Pouring nginx-1.8.0.yosemite.bottle.tar.gz
==> Caveats
Docroot is: /usr/local/var/www

The default port has been set in /usr/local/etc/nginx/nginx.conf to 8080 so that
nginx can run without sudo.

nginx will load all files in /usr/local/etc/nginx/servers/.


To have launchd start nginx at login:
    ln -sfv /usr/local/opt/nginx/*.plist ~/Library/LaunchAgents
Then to load nginx now:
    launchctl load ~/Library/LaunchAgents/homebrew.mxcl.nginx.plist
Or, if you don't want/need launchctl, you can just run:
    nginx
==> Summary
🍺  /usr/local/Cellar/nginx/1.8.0: 7 files, 964K

启动nginx
`nginx`

nginx -s signal

```
stop — fast shutdown
quit — graceful shutdown
reload — reloading the configuration file
reopen — reopening the log files
```

