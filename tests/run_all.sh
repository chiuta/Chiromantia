#!/bin/bash
# build + validate + syntax + smoke
cd "$(dirname "$0")/.."
python3 validate.py || exit 1
python3 build.py || exit 1
python3 - <<'PY'
import re
s=open('dist/chiromantia.html',encoding='utf-8').read()
open('/tmp/_c.js','w',encoding='utf-8').write(re.search(r'<script>(.*)</script>',s,re.S).group(1))
PY
node --check /tmp/_c.js || { echo "SYNTAX FAIL"; exit 1; }
node tests/smoke.js dist/chiromantia.html "$@"
