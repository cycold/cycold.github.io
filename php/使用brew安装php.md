https://github.com/Homebrew/homebrew-php

brew update
xcode-select --install
brew rm freetype jpeg libpng gd zlib
brew install freetype jpeg libpng gd zlib
brew tap homebrew/dupes
brew tap homebrew/versions
brew tap homebrew/homebrew-php
brew install php56
