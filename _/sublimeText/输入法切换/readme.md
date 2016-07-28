http://bellstar.iteye.com/blog/2071179

编译：输入法切换

`name=changeInputMethod; gcc "$name".m -o "$name" -l objc -framework foundation -framework carbon`

注意将变异好的脚本放入：changeInputMethod
`/usr/local/bin/` 下

keybind
```
{"keys": ["escape"],
    "command": "run_multiple_commands",
    "context": [{
        "key": "setting.command_mode",
        "operand": false
    }, {
        "key": "setting.is_widget",
        "operand": false
    }]
},

或者：
{ "keys": ["escape"], 
    "command": "run_multiple_commands",
    "context":
    [
        { "key": "setting.command_mode", "operand": false },
        { "key": "setting.is_widget", "operand": false }
    ],
    "args": {  
        "commands": [  
            {"command": "subprocess_in_cwd", "args": {"cmd": "/usr/local/bin/changeInputMethod U.S.", "wait": true}, "context": "window"},  
            {"command": "exit_insert_mode"}  
        ]  
    } 
},

```
