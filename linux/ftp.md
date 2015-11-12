首先查看FTP的进程有没有运行，
ps aux | grep ftp
看看有没有燃气proftpd, vsftpd等ftp的守护进程，如果没有运行请查看你的安装配置是否有问题。

如果有请查看守护进程是否在正确的端口监听，
netstat -tunpal | grep ftp
看看有没有ftp的守护进程在监听类似诸如21这样的端口，如果没有或者监听的端口不正确，请检查程序的配置等是否有问题。

如果有在21或者类似端口在监听，仍然不能正确执行远端ftp访问，请查看防火墙是否开放相应的端口，
cat /etc/sysconfig/iptbles | grep 21（文件与端口请自行确定）

如果有开放端口，请查看系统日志文件，相关的文件可能会有
/var/log/message
/var/log/vsftpd.log