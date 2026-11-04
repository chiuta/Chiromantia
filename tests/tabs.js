const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});
const p=await b.newPage({viewport:{width:390,height:800}});require('./_tab')(p);const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.argv[2]);
for(const id of ['fing','types','meas','derm','sci']){await p.click(`button[data-v="${id}"]`);await p.screenshot({path:`audit/shots_it7/${id}.png`,fullPage:false});}
await p.click('button[data-v="meas"]');
await p.fill('input[data-k="idx"]','7.1');await p.fill('input[data-k="ring"]','7.5');console.log((await p.textContent('#measres')));
await p.click('button[data-v="derm"]');await p.click('[data-act="dc"][data-k="loop"][data-v="1"]');console.log((await p.textContent('#dcbox')).slice(0,120));
await p.click('button[data-v="sci"]');await p.selectOption('[data-act="bnr"]','3');await p.click('[data-act="bnshow"]');console.log(await p.textContent('#bnres'));
console.log(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth?'OVERFLOW':'ok'),errs);await b.close();})();
