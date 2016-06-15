
1. 在window xp中,
```bat
@echo off
at 17:50 shutdown -f -s -t 15
```

> http://www.computerhope.com/shutdown.htm
> 
> shutdown命令语法: 
> Windows 8 syntax
> Usage: shutdown [/i | /l | /s | /r | /g | /a | /p | /h | /e | /o] [/hybrid] [/f] [/m \\computer][/t xxx][/d [p|u:]xx:yy [/c "comment"]] 
> No args Display this message (same as /?)
> /i  Display the graphical user interface (GUI).
> This must be the first option.
> /l  Log off. Note: The /l switch cannot be used with /m or /d options.
> /s  Shutdown the computer.
> /r  Full shutdown and restart the computer.
> /g  Full shutdown and restart the computer. After the system is rebooted, restart any registered applications.
> /a  Abort a system shutdown. But can only be used during the time-out period.
> /p  Turn off the local computer with no time-out or warning. Can be used with /d and /f options.
> /h  Hibernate the local computer. Can be used with the /f option.
> /hybrid Performs a shutdown of the computer and prepares it for fast startup.
> Must be used with /s option.
> /e  Document the reason for an unexpected shutdown of a computer.
> /o  Go to the advanced boot options menu and restart the computer.
> Must be used with /r option.
> /m \\computer   \\computer Specify the target computer.
> /t xxx  Set the time-out period before shutdown to xxx seconds. The valid range is 0-315360000 (10 years), with a default of 30. If the timeout period is greater than 0, the /f parameter is implied.
> /c "comment"    Comment on the reason for the restart or shutdown. Maximum of 512 characters allowed.
> /f  Force running applications to close without forewarning users. The /f parameter is implied when a value greater than 0 is specified for the /t parameter.
> /d [u] [p]:xx:yy    Provide the reason for the restart or shutdown.
> p indicates that the restart or shutdown is planned.
> u indicates that the reason is user defined.
> If neither p nor u is specified, the restart or shutdown is unplanned.
> xx is the major reason number (positive integer less than 256).
> yy is the minor reason number (positive integer less than 65536).

注意: 参数指定需要使用 '/', 不像xp中使用 '-'

> window10 中已经废弃at命令

2. 在window10 中,使用 `schtasks` 创建计划任务
`schtasks /?`  查看帮助

查看计划任务
`schtasks /Query`  或者查看/Query的帮助文档:  `schtasks /Query /?`
删除计划任务
`schtasks /Delete`  或者查看/Delete的帮助文档:  `schtasks /Delete /?`
创建计划任务
`schtasks /Create ` 或者查看/Create的帮助文档:  `schtasks /Create /?`

创建一个定时关机的任务,每天19:00 关机 
`schtasks /Create /SC DAILY /ST 19:00 /TN shutdown-at-19-00 /TR "shutdown /s /f /t 90 /c 'windows 将在90秒后自动关机...,\` shutdown /a \` 取消关机'"`

设置结束时间, 如果电脑有在休眠
`schtasks /Create /SC DAILY /ST 19:00 /ET 23:00 /TN shutdown-at-19-23 /TR "shutdown /s /f /t 90 /c 'windows 将在90秒后自动关机..., 使用shutdown /a 取消关机'"`

> 注意: /ST开始运行时间(24小时制), 注意如果是早上8点, 必须写成 `08:00`, 而不是 `8:00` 前面需要一个前导0
> shutdown 后面带的参数需要使用引号

删除此计划任务
`schtasks /Delete /TN shutdown-at-19-00`



windows 定时关机(在19:00-23:00)此时段关机
`schtasks /Create /SC Daily /ST 19:00 /ET 23:00 /TN shutdown-at-19-23 /TR "shutdown /s /f /t 90 /c 'windows will be shutdown after 90s, using shutdown /a abort this plan'"`









