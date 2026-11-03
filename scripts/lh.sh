#!/usr/bin/env bash
# Usage: scripts/lh.sh <url> <out.json>
EDGE="C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
CHROME_PATH="$EDGE" npx lighthouse "$1" --quiet --chrome-flags="--headless=new --no-sandbox" --form-factor=mobile --only-categories=performance,accessibility,best-practices,seo --output=json --output-path="$2" >/dev/null 2>&1
node -e "
const r=require(process.argv[1]);const c=r.categories;console.log(Object.keys(c).map(k=>k+' '+Math.round(c[k].score*100)).join(' | '));
console.log(['largest-contentful-paint','total-blocking-time','cumulative-layout-shift','speed-index'].map(a=>a+' '+r.audits[a].displayValue).join(' | '));
const f=Object.values(r.audits).filter(a=>a.score!==null&&a.score<0.9&&!['informative','notApplicable','manual'].includes(a.scoreDisplayMode)).map(a=>a.id);console.log('below 0.9:',f.join(', '));" "$(pwd)/$2"
