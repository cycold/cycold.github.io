export CLICOLOR=1
export PATH="/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/git/bin"

# source nvm
. ~/.nvm/nvm.sh

# mongod config
MONGODB_HOME=/opt/mongodb-osx-x86_64-3.0.6
PATH=$PATH:$MONGODB_HOME/bin

# mysql
MYSQL_HOME=/usr/local/mysql
PATH=$PATH:$MYSQL_HOME/bin

# EDITOR
EDITOR=/usr/bin/vim

#Android sdk
ANDROID_SDK=/Users/icewater/Library/Android/sdk
PATH=$PATH:$ANDROID_SDK/platform-tools
PATH=$PATH:$ANDROID_SDK/tools

# Set personal aliase
alias cls="clear"
alias ll="ls -l"
alias la="ls -a"
alias tree="tree -L 1"

export PS1="\w $ "
