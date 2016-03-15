
" ----------按键重映射-----------------
" 将jj按键映射为esc (只在插入模式下有效,i表示insert)
" 这里要特别注意:不要把任何的空格或者注释放在inoremap 命令后面, 要不进入normal后会光标随机乱跳
" 注意i jj <Esc> 这种省略写法在某些vim环境中是不兼容的 需要写成: imap jj <Esc>

imap jj <Esc>

" 在插入模式下kk会在行尾部插入空格，这对跳出括号很有用
imap kk <Esc>A<Space>

" 移动到下一个 }
imap ;; <Esc>/[{}]<CR>:noh<CR>a

" 跳出所有括号
imap ki <Esc>}o
" ------------------------------------

imap kp <Esc>yypA
imap ko <Esc>o
imap kj <Esc>{i
imap kh <Esc>I
imap [  <Esc>a[]<Esc>i
imap ]  <Esc>a]
imap "  <Esc>a""<Esc>i
imap :  <Esc>a:<Space>

"imap <TAB> <ESC>%%li
"imap <CR> <Esc>o<Esc>

nnoremap [ {
nnoremap ] }
nnoremap ; A

" Find next { or }
":noremap ]] /[{}]<CR>:noh<CR>a

" Find prev { or }
":noremap [[ ?[{}]<CR>:noh<CR>a

" 将大写B映射为^键(只在正常模式下有效n表示normal)
nnoremap B ^

" 将大写$映射为^键(只在正常模式下有效)
nnoremap E $

" 取消$ 按键(只在正常模式下有效)
nnoremap $ <nop>

" 取消^ 按键(只在正常模式下有效)
nnoremap ^ <nop>

" 设置在正常模式下,ff取代 ctrl + f 向下翻页
nnoremap ff <C-f>

" 设置在正常模式下,mm取代 ctrl + b 向上翻页
nnoremap mm <C-b>


" -----------Vim配置-----------------

" Generic
syntax on                       " 开启语法高亮 syntax enable/on
set smarttab                    " 开启智能tab 即按一次backspace就会删除四个空格,即一个tab
set autoindent                  " 设置自动缩进
set number                      " 显示行号 set number/nu
set nocursorline                " highlight current line
set showmatch                   " higlight matching parenthesis set showmatch／sm
set showcmd                     " show command in bottom bar
set nowrap                      " 不自动换行
set shiftwidth=4                "设置缩进尺寸
set modelines=1
"colorscheme badwolf            " 颜色主题

" Searching
set ignorecase                  " ignore case when searching
set incsearch                   " search as characters are entered 在输入要搜索的文字时，vim会实时匹配
set hlsearch                    " highlight all matches 高亮显示所有的匹配结果
set smartcase                   " But case-sensitive if expression contains a capital letter.（如果搜索字符含有大些字母，则区分大小写）

" Misc
set ttyfast                     "faster redraw
set ambiwidth =double           "防止特殊字符无法正常显示
set nobackup                    "设置无自动备份文件 如index.php~
set noswapfile                  "设置无交换文件

"设置光标 http://vim.wikia.com/wiki/Configuring_the_cursor
highlight Cursor guibg=yellow   "设置光标颜色 省略 hi Cursor guibg=yellow

"highlight Cursor guifg=white guibg=black
"highlight iCursor guifg=white guibg=steelblue
"set guicursor=n-v-c:block-Cursor
"set guicursor+=i:ver100-iCursor
"set guicursor+=n-v-c:blinkon0
"set guicursor+=i:blinkwait10
"set guicursor=n-v-c:hor20-Cursor


" Configuration file for vim
set modelines=0                 " CVE-2007-2438
set nocompatible                " Use Vim defaults instead of 100% vi compatibility
set backspace=2                 " more powerful backspacing

" Don't write backup file if vim is being called by "crontab -e"
au BufWrite /private/tmp/crontab.* set nowritebackup nobackup
" Don't write backup file if vim is being called by "chpass"
au BufWrite /private/etc/pw.* set nowritebackup nobackup

" 设置光标形状(在iterm2下) http://vim.wikia.com/wiki/Change_cursor_shape_in_different_modes
let &t_SI = "\<Esc>]50;CursorShape=1\x7"
" let &t_SR = "\<Esc>]50;CursorShape=2\x7"
let &t_EI = "\<Esc>]50;CursorShape=0\x7"




