#!/usr/bin/env bash
# Create a private GitHub repo with the token Git Credential Manager holds for github.com, add it as origin and push.
# The token is never printed. Usage: scripts/github-create.sh <owner> <repo> <description>
set -e
OWNER="$1"; REPO="$2"; DESC="$3"
TOKEN=$(printf "protocol=https\nhost=github.com\n\n" | git credential fill | sed -n 's/^password=//p')
[ -n "$TOKEN" ] || { echo "no github credential found"; exit 1; }
OUT=$(mktemp)
STATUS=$(curl -s -o "$OUT" -w "%{http_code}" -X POST https://api.github.com/user/repos \
  -H "Authorization: Bearer $TOKEN" -H "Accept: application/vnd.github+json" -H "X-GitHub-Api-Version: 2022-11-28" \
  -d "{\"name\":\"$REPO\",\"description\":\"$DESC\",\"private\":true,\"has_issues\":false,\"has_wiki\":false,\"has_projects\":false}")
unset TOKEN
echo "create status $STATUS"
# Node on Windows needs a Windows path for the temp file
NODE_OUT=$(cygpath -w "$OUT" 2>/dev/null || echo "$OUT")
node -e "const j=JSON.parse(require('fs').readFileSync(process.argv[1],'utf8'));console.log(j.html_url?('html_url '+j.html_url+' private '+j.private):('message '+(j.message||'-')))" "$NODE_OUT" || true
rm -f "$OUT"
git remote remove origin 2>/dev/null || true
git remote add origin "https://github.com/$OWNER/$REPO.git"
git push -u origin main
