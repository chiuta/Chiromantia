/* ===== module: fingers & nails ===== */
var FD=D.fdet||[];
var TIPIC={tip_conic:'<path d="M22 54V28Q22 12 30 8Q38 12 38 28V54"/>',tip_square:'<path d="M20 54V18Q20 14 24 14H36Q40 14 40 18V54"/>',tip_spatulate:'<path d="M24 54V32Q24 27 16 23V14H44V23Q36 27 36 32V54"/>',tip_pointed:'<path d="M22 54V30Q22 16 30 6Q38 16 38 30V54"/>',tip_round:'<path d="M20 54V28A10 10 0 0 1 40 28V54"/>'};
var PHALSVG='<svg class="phal" viewBox="0 0 120 150" role="img" aria-label="1 · 2 · 3"><rect x="40" y="6" width="40" height="138" rx="20" fill="var(--skin)" stroke="var(--outline)" stroke-width="3"/><path d="M40 52H80M40 98H80" stroke="var(--outline)" stroke-width="3"/><g font-size="20" font-weight="700" fill="var(--fg)" text-anchor="middle"><text x="60" y="38">1</text><text x="60" y="84">2</text><text x="60" y="130">3</text></g></svg>';
function vFing(){
 var G=[["tip","gTip"],["nail","gNail"],["joint","gJoint"],["gap","gGap"],["phal","gPhal"],["thumb","gThumb"]],h="";
 G.forEach(function(g){var items=FD.filter(function(x){return x.g===g[0];});if(!items.length)return;
  h+='<h3 class="h3">'+t(g[1])+'</h3>'+(g[0]==="phal"?'<div class="phalbox">'+PHALSVG+'</div>':'')+'<div class="cards">';
  items.forEach(function(x){var ic=TIPIC[x.id];
   h+='<div class="card'+(ic?' sgn':'')+(x.id==="nail_med"?' note':'')+'">'+(ic?'<svg class="ico" viewBox="0 0 60 60" aria-hidden="true">'+ic+'</svg><div>':'')+'<h4>'+L(x.n)+'</h4><p>'+L(x.d)+'</p>'+(ic?'</div>':'')+'</div>';});
  h+='</div>';});
 return h||'<p>…</p>';
}
if(FD.length)MODS.push({id:"fing",tab:"tFing",view:vFing});
