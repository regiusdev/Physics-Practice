#!/bin/sh
# Stamp every local CSS/JS link in the HTML pages with a fresh ?v= so browsers
# fetch the new files after an update instead of mixing old and new.
# Run from the repo root before committing changes to assets/ or data/.
set -e
v=$(date +%Y%m%d%H%M)
for f in *.html; do
  sed -i.bak -E "s#((src|href)=\"(assets|data)/[^\"?]+\.(js|css|svg))(\?v=[0-9]+)?\"#\1?v=$v\"#g" "$f"
  rm -f "$f.bak"
done
echo "Assets stamped with v=$v"
