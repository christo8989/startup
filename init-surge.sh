#!/bin/sh
# Install Surge #
echo '[start] Installing surge'
npm install -g surge
echo '[end] Installing surge'

# Promp User for surge CNAME #
echo
read -p 'What is your dev site? (I will append .surge.sh to it): ' CNAME
CNAME="$CNAME.surge.sh"
firstLine="var CNAME = '$CNAME';"

# Replace the first line of the gulpfile #
echo 'Replacing first line of gulpfile.js ...'
sed -i "1c \
$firstLine
" gulpfile.js

# Run surge #
 surge ./ $CNAME