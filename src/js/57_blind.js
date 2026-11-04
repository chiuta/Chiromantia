/* ===== module: blind test (Barnum self-experiment) ===== */
var BL={on:false,items:[],i:0,r:[],done:false};
var BLK=null;
function blKeys(){return ASP.concat(AXL,AXM);}
function blLine(k,v){return L(EI[k].n)+": "+L(OPT[k][+v]);}
function rnd(n){return Math.floor(Math.random()*n);}
function shuf(a){for(var i=a.length-1;i>0;i--){var j=rnd(i+1),x=a[i];a[i]=a[j];a[j]=x;}return a;}
function blStart(){
 var R=S.RH.l,mine=blKeys().filter(function(k){return R[k]!==""&&OPT[k];}),items=[];
 var n=mine.length>=3?3:0,all=blKeys();
 if(n){var gr=[[],[],[]];mine.forEach(function(k,i){gr[i%3].push(k);});gr.forEach(function(g){items.push({m:1,ls:g.map(function(k){return {k:k,v:R[k]};})});});
  var pool=shuf(all.filter(function(k){return !R[k];}).concat(all)),used={};
  gr.forEach(function(g){var ls=[];shuf(all.slice()).some(function(k){if(ls.length>=g.length)return true;if(used[k])return false;used[k]=1;ls.push({k:k,v:String(rnd(OPT[k].length))});return false;});items.push({m:0,ls:ls});});
 }else{for(var i=0;i<6;i++){var ks=shuf(all.slice()).slice(0,2);items.push({m:0,ls:ks.map(function(k){return {k:k,v:String(rnd(OPT[k].length))};})});}}
 BL={on:true,items:shuf(items),i:0,r:[],done:false,full:!!n};
}
function vBlind(){
 var R=S.RH.l,cnt=blKeys().filter(function(k){return R[k]!=="";}).length;
 var h='<div class="card"><p style="margin-top:0">'+t("blIntro")+'</p>';
 if(!BL.on)return h+(cnt<3?'<p class="sub">'+t("blNeed")+'</p>':'')+'<div class="row"><button class="btn pri" data-act="blstart">'+t("blStart")+'</button></div></div>';
 if(BL.done){
  var ms=BL.items.map(function(x,i){return {m:x.m,r:BL.r[i]};}),avg=function(m){var a=ms.filter(function(x){return x.m===m;});return a.length?a.reduce(function(s,x){return s+x.r;},0)/a.length:null;};
  h+='<h3 id="blres" tabindex="-1">'+t("blRes")+'</h3>';
  if(BL.full)h+='<p>'+fill(t("blMean"),{k:t("blMine"),v:fmt(avg(1),1)})+'<br>'+fill(t("blMean"),{k:t("blRand"),v:fmt(avg(0),1)})+'</p>';
  else h+='<p>'+fill(t("blMean"),{k:t("blRand"),v:fmt(avg(0),1)})+'</p><p class="sub">'+t("blNeed")+'</p>';
  h+='<ul>'+BL.items.map(function(x,i){return '<li><strong>'+(x.m?t("blMine"):t("blRand"))+' · '+BL.r[i]+'/5</strong><br>'+x.ls.map(function(l){return esc(blLine(l.k,l.v));}).join("<br>")+'</li>';}).join("")+'</ul><p><em>'+t("blLesson")+'</em></p><div class="row"><button class="btn pri" data-act="blstart">'+t("blAgain")+'</button></div></div>';
  return h;}
 var it=BL.items[BL.i];
 h+='<p class="sub">'+(BL.i+1)+' / '+BL.items.length+'</p><blockquote class="bq" id="blq" tabindex="-1">'+it.ls.map(function(l){return esc(blLine(l.k,l.v));}).join("<br>")+'</blockquote><p>'+t("blRate")+'</p><div class="row" role="group" aria-label="'+t("blRate")+'">';
 for(var k=1;k<=5;k++)h+='<button class="btn" data-act="blrate" data-v="'+k+'">'+k+'</button>';
 return h+'</div></div>';
}
ACT.blstart=function(){blStart();render();var q=document.getElementById("blq");if(q)q.focus({preventScroll:true});};
ACT.blrate=function(el){var v=+el.getAttribute("data-v");if(!(v>=1&&v<=5)||!BL.on||BL.done)return;BL.r[BL.i]=v;BL.i++;if(BL.i>=BL.items.length)BL.done=true;render();var q=document.getElementById("blres")||document.getElementById("blq");if(q)q.focus({preventScroll:true});};
MODS.push({id:"blind",tab:"tBlind",view:vBlind});
