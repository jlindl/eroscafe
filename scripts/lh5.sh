#!/usr/bin/env bash
# Median of 5 Lighthouse mobile runs. Usage: scripts/lh5.sh <url> <outPrefix>
EDGE="C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
for i in 1 2 3 4 5; do
  CHROME_PATH="$EDGE" npx lighthouse "$1" --quiet --chrome-flags="--headless=new --no-sandbox" --form-factor=mobile --only-categories=performance,accessibility,best-practices,seo --output=json --output-path="$2-$i.json" >/dev/null 2>&1
done
node -e "
const fs=require('fs');const runs=[1,2,3,4,5].map(i=>{try{return JSON.parse(fs.readFileSync(process.argv[1]+'-'+i+'.json','utf8'))}catch{return null}}).filter(Boolean);
const med=(a)=>{const s=[...a].sort((x,y)=>x-y);return s[Math.floor(s.length/2)]};
const cat=(k)=>runs.map(r=>Math.round(r.categories[k].score*100));
const aud=(k)=>runs.map(r=>r.audits[k].numericValue);
console.log('runs',runs.length);
for(const k of ['performance','accessibility','best-practices','seo'])console.log(k,'median',med(cat(k)),'all',cat(k).join(','));
console.log('LCP median s',(med(aud('largest-contentful-paint'))/1000).toFixed(2),'TBT median ms',Math.round(med(aud('total-blocking-time'))),'CLS median',med(aud('cumulative-layout-shift')).toFixed(3));
" "$2"
