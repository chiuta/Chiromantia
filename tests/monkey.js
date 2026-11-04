const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});
let bad=0,total=0;
for(let li=0;li<8;li++){const p=await b.newPage({viewport:{width:li%2?390:1100,height:800}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('file://'+process.argv[2]);await p.selectOption('select[data-act="lang"]',String(li));
let seed=li*7919+13;const rnd=n=>{seed=(seed*1103515245+12345)&0x7fffffff;return seed%n};
for(let i=0;i<120;i++){total++;
 const els=await p.$$('#app button:not([disabled]), #app select, #app input[type=text], #app input[type=checkbox]');if(!els.length)break;const el=els[rnd(els.length)];
 try{const tag=await el.evaluate(e=>e.tagName+(e.type||''));
  if(tag==='SELECT'){const n=await el.evaluate(e=>e.options.length);const act=await el.getAttribute('data-act');if(act==='lang')continue;await el.selectOption({index:rnd(n)},{timeout:800});}
  else if(tag==='INPUTtext'){const act=await el.getAttribute('data-act');if(act==='pnin'||act==='qs'||act==='calc'||act==='meas')await el.fill(['','12','7,5','abc','<b>x</b>','99999'][rnd(6)],{timeout:800});}
  else await el.click({timeout:800,trial:false});
 }catch(e){}
 const txt=await p.innerText('#app');if(/\bundefined\b|\bNaN\b|\[object/.test(txt)){bad++;console.log('BAD text lang',li,txt.match(/.{20}(undefined|NaN|\[object).{20}/s)?.[0]);break;}
}
if(errs.length){bad+=errs.length;console.log('lang',li,errs.slice(0,3));}
await p.close();}
console.log('monkey actions',total,'problems',bad);await b.close();})();
