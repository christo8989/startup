#!/bin/sh

# Create CNAME from param1 #
CNAME="$1.surge.sh"
firstLine="var CNAME = '$CNAME';"

# Replace the first line of the gulpfile #
echo 'Replacing first line of gulpfile.js ...'
sed -i "1c \
$firstLine
" gulpfile.js

# Run surge #
# Eventually, I should run gulp here. (dev-build is the default)
mkdir ./dev
echo 'Succesfully created the project. :)' > ./dev/index.html
surge ./dev $CNAME
 
echo