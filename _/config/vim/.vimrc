" Configuration file for vim
set modelines=0   " CVE-2007-2438

" Normally we use vim-extensions. If you want true vi-compatibility
" remove change the following statements
set nocompatible  " Use Vim defaults instead of 100% vi compatibility
set backspace=2   " more powerful backspacing

" Don't write backup file if vim is being called by "crontab -e"
au BufWrite /private/tmp/crontab.* set nowritebackup nobackup
" Don't write backup file if vim is being called by "chpass"
au BufWrite /private/etc/pw.* set nowritebackup nobackup

" 配置参考
" http://dougblack.io/words/a-good-vimrc.html#colors
" https://github.com/dougblack/dotfiles/blob/master/.vimrc

" 开启语法高亮
syntax on
syntax enable

" 颜色主题
"colorscheme badwolf

" 按键重映射
" 将jj按键映射为esc (只在插入模式下有效,i表示insert)
" 这里要特别注意:不要把任何的空格或者注释放在inoremap 命令后面要不进入normal后会光标随机乱跳
" 参考:http://vim.wikia.com/wiki/Avoid_the_escape_key
" inoremap jj <esc>
imap ii <Esc>
nnoremap j gj
nnoremap k gk
"将大写B映射为^键(只在正常模式下有效n表示normal)
nnoremap B ^
"将大写$映射为^键(只在正常模式下有效)
nnoremap E $
"取消$ 按键(只在正常模式下有效)
nnoremap $ <nop>
"取消^ 按键(只在正常模式下有效)
nnoremap ^ <nop>
"设置在正常模式下,ff取代 ctrl + f 向下翻页
nnoremap ff <C-f>
"设置在正常模式下,bb取代 ctrl + b 向上翻页
nnoremap bb <C-b>

" Spaces & Tabs
"set ts=4                       " tabstop 的简写
set tabstop=4                   " 4 space tab
set expandtab                   " use spaces for tabs
set softtabstop=4               " 4 space tab
set smarttab                    "开启智能tab 即按一次backspace就会删除四个空格,即一个tab
set autoindent                  "设置自动缩进
"set sw=4                       "shiftwidth的简写
set shiftwidth=4                "设置缩进尺寸
set modelines=1

" UI Layout
set nowrap                      "不自动换行
set number                      " show line numbers 显示行号
set showcmd                     " show command in bottom bar
set nocursorline                " highlight current line
set wildmenu
"set lazyredraw
set showmatch                   " higlight matching parenthesis

" Searching
set ignorecase                  " ignore case when searching
set incsearch                   " search as characters are entered 在输入要搜索的文字时，vim会实时匹配
set hlsearch                    " highlight all matches 高亮显示所有的匹配结果

" Misc
set ttyfast                     "faster redraw
set ambiwidth =double           "防止特殊字符无法正常显示
set nobackup                    "设置无自动备份文件 如index.php~
set noswapfile                  "设置无交换文件






