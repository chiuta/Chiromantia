const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});
const ctx=await b.newContext({viewport:{width:1100,height:1400},acceptDownloads:true,permissions:['clipboard-read','clipboard-write']});const p=await ctx.newPage();require('./_tab')(p);const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
const fail=[];const ck=(c,m)=>{if(!c)fail.push(m)};
await p.addInitScript(()=>{if(!localStorage.getItem('chiromantia.v1')){const t=new Date(Date.now()-864e5*3);const d=t.toISOString().slice(0,10);localStorage.setItem('chiromantia.v1',JSON.stringify({li:1,pr:[{t:'I will receive a letter this week',d,s:'p'}]}))}});
await p.goto(process.argv[2]);
ck(await p.locator('.due').count()===1,'due banner');
// predictions
await p.click('button[data-v="pred"]');ck(await p.locator('button[data-act="pdset"]').count()===3,'pred due buttons');await p.click('[data-act="pdset"][data-k="n"]');
ck((await p.textContent('main')).includes('1 no'),'pred stats');ck(await p.locator('.due').count()===0,'banner gone');
const fut=new Date(Date.now()+864e5*5).toISOString().slice(0,10);
await p.fill('#pdt','Next Monday I will meet an old friend');await p.fill('#pdd',fut);await p.click('[data-act="pdadd"]');
ck((await p.locator('.plist li').count())===2,'pred add');
// calibration
await p.click('button[data-v="cal"]');await p.setInputFiles('input[data-act="calfile"]','/tmp/p.png');await p.waitForSelector('#calc');
for(let i=0;i<11;i++){const bb=await p.locator('#calc').boundingBox();await p.mouse.click(bb.x+10+i*18,bb.y+20+i*14);}
ck((await p.textContent('main')).includes('mm'),'cal results');
await p.click('[data-act="caluse"][data-v="c"]');
ck(JSON.parse(await p.evaluate(()=>JSON.stringify(JSON.parse(localStorage.getItem('chiromantia.v1')).calc))).pl!=='','cal use');
// keyboard placing
await p.click('[data-act="calreset"]');await p.focus('#calc');await p.keyboard.press('ArrowRight');await p.keyboard.press('Enter');ck(/Step 2/.test(await p.textContent('main')),'cal keyboard');
// uncertainty
await p.click('button[data-v="types"]');await p.fill('input[data-k="pl"]','18');await p.fill('input[data-k="pw"]','14');await p.fill('input[data-k="ml"]','15');
ck(/simulations/.test(await p.textContent('#calcres')),'unc calc');
await p.click('button[data-v="meas"]');await p.fill('input[data-k="idx"]','7.1');await p.fill('input[data-k="ring"]','7.5');ck(/95%/.test(await p.textContent('#measres')),'unc meas');
// blind
await p.click('button[data-v="blind"]');await p.click('[data-act="blstart"]');for(let i=0;i<6;i++)await p.click('[data-act="blrate"][data-v="3"]');ck(await p.locator('#blres').count()===1,'blind result');
// fingerprint trainer
await p.click('button[data-v="prt"]');await p.click('[data-act="ptstart"]');for(let i=0;i<10;i++){await p.click('[data-act="ptans"][data-v="loop"]');await p.click('[data-act="ptnext"]');}ck(await p.locator('#ptres').count()===1,'trainer');
// worksheet
await p.click('button[data-v="ws"]');ck(await p.locator('svg.wsvg').count()===1,'ws');
// listen
await p.click('button[data-v="listen"]');await p.click('[data-act="lsplay"]');await p.click('[data-act="lsstop"]');
// simulator + history
await p.click('button[data-v="sim"]');await p.click('[data-act="smstart"]');for(let i=0;i<4;i++){await p.click('[data-act="smpick"][data-v="0"]');await p.click('[data-act="smnext"]');}ck(await p.locator('#smres').count()===1,'sim');
await p.click('button[data-v="hist"]');ck(await p.locator('ol.tlv li').count()>=12,'hist');
// reader share
await p.click('button[data-v="reader"]');await p.selectOption('select[data-k="life"]','1');await p.selectOption('select[data-k="head"]','2');
await p.click('[data-act="shareqr"]');ck(await p.locator('svg.qr path').count()===1,'qr');
await p.click('[data-act="sharecopy"]');const link=await p.evaluate(()=>navigator.clipboard.readText());ck(/#p=/.test(link),'link '+link);
const p2=await ctx.newPage();p2.on('pageerror',e=>errs.push(e.message));await p2.goto(link);await p2.waitForTimeout(500);
ck(await p2.evaluate(()=>JSON.parse(localStorage.getItem('chiromantia.v1')).RH.l.life)==='1','shared load');
const p3=await ctx.newPage();await p3.goto(process.argv[2]+'#p=zz.<script>');ck(await p3.evaluate(()=>!!document.querySelector('main')),'hostile hash ok');
console.log(fail.length?'FAIL '+fail:'features2 ok',errs);await b.close();})();
