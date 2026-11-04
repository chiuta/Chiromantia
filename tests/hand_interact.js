// Click every selectable element on the hand map (both hands), check selection state + no errors.
const { chromium } = require('playwright'); const path=require('path');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});
const c=await b.newContext({viewport:{width:390,height:900}}); const p=await c.newPage();require('./_tab')(p); const errs=[];
p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+path.resolve('dist/chiromantia.html'));await p.click('button[data-v="hand"]');
let fails=0,n=0;
for(const hand of ['l','r']){
 await p.click(`[data-act=hand][data-v=${hand}]`);
 const ids=await p.$$eval('.chips [data-act=sel]',els=>els.map(e=>e.getAttribute('data-id')));
 for(const id of ids){
  await p.click(`.chips [data-act=sel][data-id="${id}"]`); n++;
  const r=await p.evaluate((id)=>({sel:document.querySelectorAll('svg.hand .sel').length,svgHas:!!document.querySelector('svg.hand [data-id="'+id+'"]:not(.hide)'),
    vis:[...document.querySelectorAll('svg.hand [data-id="'+id+'"]')].some(e=>e.getClientRects().length>0),cap:document.querySelector('.cap').textContent}),id);
  if(!r.vis){fails++;console.log('FAIL not visible on map',hand,id);} if(r.sel<1){fails++;console.log('FAIL no .sel',hand,id);}
 }
}
// click directly on the map (centre of a visible hit element)
for(const id of ['life','heart','jup','idx','girdle']){
 await p.click(`.chips [data-act=sel][data-id="life"]`);
 const box=await p.locator(`svg.hand [data-id="${id}"]`).first().boundingBox(); n++;
 if(!box){fails++;console.log('FAIL no box',id);continue;}
}
if(errs.length){fails++;console.log('FAIL errors',errs)}
console.log(`hand_interact: ${n} checks, ${fails} failures`);await b.close();process.exit(fails?1:0);})();
