const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});
const ctx=await b.newContext();const p=await ctx.newPage();require('./_tab')(p);const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.setItem('chiromantia.v1',JSON.stringify({sel:'constructor',tab:'__proto__',li:99,RH:{l:{life:'9999',palm:'<img src=x onerror=alert(1)>'},r:null},prof:[{n:'<img src=x onerror=window.__x=1>',RH:{l:{},r:{}}}],calc:{pl:'<b>'},lay:'x'}))}catch(e){}});
await p.goto('file://'+process.argv[2]+'#hand/constructor');
const body=await p.innerText('#app');
const mm=body.match(/.{30}(undefined|\bNaN\b).{30}/);console.log(mm&&mm[0],/undefined|\bNaN\b/.test(body),'xss?',await p.evaluate(()=>!!window.__x),errs);
await p.click('button[data-v="reader"]');console.log('profile imgs',await p.locator('.plist img').count());
await b.close();})();
