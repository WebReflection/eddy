#!/usr/bin/env bash
# curl -O https://raw.github.com/WebReflection/eddy/master/node-eddy.sh && sh node-eddy.sh

echo ""
curl -O https://raw.github.com/WebReflection/eddy/master/build/eddy.node.js
# copy eddy in the lib folder so it will be natively available
mv eddy.node.js lib/eddy.js
echo ""

# if it wasn't already included, include it
if grep lib/eddy.js node.gyp; then
  echo "lib/eddy.js already included in node.gyp"
else
  sed -e "s/\('library_files': \[\)/\1'lib\/eddy.js',/" node.gyp>node.gyp-modified
  mv node.gyp-modified node.gyp
fi

# if it wasn't required by the very first required module in node
if grep ";require('eddy');" lib/events.js; then
  echo "lib/events.js already requiring eddy.js"
else
  echo ";require('eddy');" >> ./lib/events.js
fi

echo "  ----------------------------------------------------"
echo "  eddy.js is now in core, don't forget to make install"
echo "  ----------------------------------------------------"