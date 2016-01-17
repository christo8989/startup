#!/bin/sh
# Initialize Aliases for git #
echo '[start] Add git aliases'

# ALIAS 
git config --global alias.alias 'config --get-regexp ^alias\.'
git config --global alias.aliasadd 'config --global --'
git config --global alias.aliasrm 'config --global --unset --'
git config --global alias.aliasrmall 'config --global --remove-section alias'

# ADD
git config --global alias.sadd '!git add $1 && git status'
git config --global alias.resetall '!git reset -q HEAD && git status'

# LOG
git config --global alias.last 'log -l HEAD'


# Print out Aliases #
echo
git alias
echo
echo '[end] Add git aliases'

echo