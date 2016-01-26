http://stackoverflow.com/questions/3594823/mime-type-for-woff-fonts/

NGINX SOLUTION

file
`/etc/nginx/mime.types`
or
`/usr/local/nginx/conf/mime.types`
add
```
font/ttf                      ttf;
font/opentype                 otf;
application/font-woff         woff;
application/vnd.ms-fontobject eot;
```
remove
`application/octet-stream        eot;`
REFERENCES
Thanks to Mike Fulcher
http://drawingablank.me/blog/font-mime-types-in-nginx.html