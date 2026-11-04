/* ===== module: fingerprints & creases ===== */
var DM=D.derm||[],DF=D.derm_freq||null;
var DMIC={dp_loop_ulnar:'<path d="M14 52V30Q14 12 30 12Q46 12 46 30V40M22 52V32Q22 20 30 20Q38 20 38 32V40M30 52V30"/>',dp_loop_radial:'<path d="M46 52V30Q46 12 30 12Q14 12 14 30V40M38 52V32Q38 20 30 20Q22 20 22 32V40M30 52V30"/>',dp_whorl:'<circle cx="30" cy="30" r="22"/><circle cx="30" cy="30" r="15"/><circle cx="30" cy="30" r="8"/><circle cx="30" cy="30" r="2"/>',dp_arch_plain:'<path d="M8 50Q30 26 52 50M8 40Q30 16 52 40M8 30Q30 6 52 30"/>',dp_arch_tented:'<path d="M8 52L30 10L52 52M14 52L30 24L46 52M20 52L30 38L40 52"/>'};
function bar(k,lab){var n=S.dc[k],tot=S.dc.loop+S.dc.whorl+S.dc.arch,p=tot?Math.round(n*100/tot):0,rf=DF&&DF[k]?Math.round(DF[k][0]*100)+"–"+Math.round(DF[k][1]*100)+" %":"";
 return '<div class="cnt"><span class="cl">'+t(lab)+'</span><button class="btn" data-act="dc" data-k="'+k+'" data-v="-1" aria-label="− '+t(lab)+'">−</button><output aria-live="polite">'+n+'</output><button class="btn" data-act="dc" data-k="'+k+'" data-v="1" aria-label="+ '+t(lab)+'">+</button><span class="bar" aria-hidden="true"><i style="width:'+p+'%"></i></span><span class="pc">'+(tot?p+" %":"")+(rf?' · '+t("cntRef").split(" ")[0]+' '+rf:'')+'</span></div>';}
function vDerm(){
 var G=[["pattern","gPattern"],["fact","gFact"],["crease","gCrease"],["count","gCount"]],h="";
 G.forEach(function(g){var it=DM.filter(function(x){return x.g===g[0];});if(!it.length&&g[0]!=="count")return;
  h+='<h3 class="h3">'+t(g[1])+'</h3><div class="cards">';
  it.forEach(function(x){var ic=DMIC[x.id];h+='<div class="card'+(ic?' sgn':'')+(x.id==="dc_med"?' note':'')+'">'+(ic?'<svg class="ico" viewBox="0 0 60 60" aria-hidden="true">'+ic+'</svg><div>':'')+'<h4>'+L(x.n)+'</h4><p>'+L(x.d)+'</p>'+(x.src?'<p class="src">'+t("srcLbl")+': '+x.src+'</p>':'')+(ic?'</div>':'')+'</div>';});
  h+='</div>';
  if(g[0]==="count")h+='<div class="card" style="margin-top:12px" id="dcbox">'+bar("loop","cntLoop")+bar("whorl","cntWhorl")+bar("arch","cntArch")+'<p class="sub">'+t("cntTotal")+': <output>'+(S.dc.loop+S.dc.whorl+S.dc.arch)+'</output> · <button class="btn" data-act="dcreset">'+t("cntReset")+'</button></p></div>';});
 return h;
}
ACT.dc=function(el){var k=el.getAttribute("data-k"),v=+el.getAttribute("data-v");if(!(k in S.dc)||(v!==1&&v!==-1))return;S.dc[k]=Math.max(0,Math.min(99,S.dc[k]+v));save();render();};
ACT.dcreset=function(){S.dc={loop:0,whorl:0,arch:0};save();render();};
if(DM.length)MODS.push({id:"derm",tab:"tDerm",view:vDerm});
