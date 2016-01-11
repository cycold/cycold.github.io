https://docs.npmjs.com/getting-started/fixing-npm-permissions


You may receive an EACCES error when you try to install a package globally. This indicates that you do not have permission 
to write to the directories that npm uses to store global packages and commands.

You can fix this problem using one of two options:

Change the permission to npm's default directory.
Change npm's default directory to another directory.
You should back-up your computer before moving forward.

Option 1: Change the permission to npm's default directory

Find the path to npm's directory:

`npm config get prefix`
For many systems, this will be /usr/local.

Change the owner of npm's directories to the name of the current user (your username!):

`sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}`

