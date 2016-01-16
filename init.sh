#!/bin/sh

# Initialize gulp #
echo '[start] Installing npm packages'
npm install
echo '[end] Installing npm packages'

# Initialize git #
sh init-git.sh

# Initialize surge #
sh init-surge.sh