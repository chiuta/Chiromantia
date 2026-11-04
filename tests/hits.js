const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});
let ok=0,bad=[];
for(const [vp,hand] of [[{width:1100,height:900},'l'],[{width:1100,height:900},'r'],[{width:390,height:1500},'l']]){
 const p=await b.newPage({viewport:vp});require('./_tab')(p);await p.goto('file://'+process.argv[2]);await p.click('button[data-v="hand"]');
 if(hand==='r')await p.click('[data-act="hand"][data-v="r"]');
 for(const id of ['life','head','heart','fate','sun','mer']){
  for(const f of [0.2,0.4,0.6,0.8]){
   const pt=await p.evaluate(([id,f])=>{const h=document.querySelector(`path.hit[data-id="${id}"]`);const n=h.getTotalLength();const q=h.getPointAtLength(n*f);const m=h.getScreenCTM();const r=h.ownerSVGElement.createSVGPoint();r.x=q.x;r.y=q.y;const s=r.matrixTransform(m);return [s.x,s.y]},[id,f]);
   await p.mouse.click(pt[0],pt[1]);
   const sel=await p.evaluate(()=>document.querySelector('.detail h3')?.textContent);
   const want=await p.evaluate(id=>document.querySelector(`.chips [data-id="${id}"]`).textContent.trim(),id);
   if(sel&&want.includes(sel))ok++;else bad.push([hand,vp.width,id,f,sel]);
  }}
 await p.close();}
console.log('hits ok',ok,'bad',bad.length,JSON.stringify(bad.slice(0,8)));await b.close();})();
