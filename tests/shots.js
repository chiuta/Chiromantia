const { chromium } = require('playwright'); const path=require('path');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});
const file='file://'+path.resolve('dist/chiromantia.html'); const out=process.argv[2]||'audit/shots';
require('fs').mkdirSync(out,{recursive:true});
for(const [name,w,h,theme,li,sel,hand] of [['m_light_life',390,900,'light',0,'life','l'],['m_dark_jup',390,900,'dark',1,'jup','r'],['d_light_fate',1280,900,'light',2,'fate','l']]){
 const c=await b.newContext({viewport:{width:w,height:h},colorScheme:theme}); const p=await c.newPage();
 await p.addInitScript(([t,l,s,hd])=>{localStorage.setItem('chiromantia.v1',JSON.stringify({li:l,theme:t,sel:s,hand:hd}))},[theme,li,sel,hand]);
 await p.goto(file); await p.waitForTimeout(300); await p.screenshot({path:`${out}/${name}.png`}); await c.close();}
await b.close();})();
