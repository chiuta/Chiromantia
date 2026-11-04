/* ===== module: signs ===== */
function vSigns(){
 var h='<div class="cards">';
 SG.forEach(function(g){h+='<div class="card sgn"><svg class="ico" viewBox="0 0 60 60" aria-hidden="true">'+g.ic+'</svg><div><h3>'+L(g.n)+'</h3><p>'+L(g.d)+'</p></div></div>';});
 return h+'</div>';
}
MODS.push({id:"signs",tab:"tSigns",view:vSigns});
