http://stackoverflow.com/questions/30456472/iterm2-slide-down-over-full-screen-app
https://gist.github.com/cycold/dfb884337dc58c3d94606b578fccf3ea
两种方式: 
1.
> This command allows iTerm to work over fullscreen apps
> defaults write ~/Applications/iTerm.app/Contents/Info LSUIElement true 
> But it hides iTerm's context menu. To access Iterm's prefs, right-click to tab bar and select proper menu item.

2.
> if you use beta version of app, try Turn on Prefs>Advanced>Hide iTerm2 from the dock and from the ⌘-Tab app switcher
> dont forget to restart app


**注意**
此时会隐藏所有的菜单选项, 如果需要打开菜单,使用快捷键: `command + ,`, 退出使用: `command + q`

