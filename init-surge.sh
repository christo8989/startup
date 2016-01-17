#!/bin/sh
# Install Surge #
echo '[start] Installing surge'
npm install -g surge
echo '[end] Installing surge'

# Create CNAME from param1 #
CNAME="$1.surge.sh"
firstLine="var CNAME = '$CNAME';"

# Replace the first line of the gulpfile #
echo 'Replacing first line of gulpfile.js ...'
sed -i "1c \
$firstLine
" gulpfile.js

# Run surge #
mkdir ./dev
echo 'Succesfully created the project. :)' > ./dev/index.html
surge ./dev $CNAME
 
echo