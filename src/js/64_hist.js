/* ===== module: history of chirology ===== */
var HS=D.hist||null,HK={tradition:"✦",text:"❦",science:"⚗",critique:"⚑"};
function vHist(){
 var h='<div class="card"><p style="margin:0">'+t("hsIntro")+'</p></div><ol class="tlv">';
 HS.forEach(function(x){h+='<li class="card"><span class="hy">'+esc(x.y)+'</span><h4><span aria-hidden="true">'+(HK[x.kind]||"")+'</span> '+esc(L(x.n))+'</h4><p>'+esc(L(x.d))+'</p>'+(x.src?'<p class="src">'+t("srcLbl")+': '+esc(x.src)+'</p>':'')+'</li>';});
 return h+'</ol>';
}
if(HS&&HS.length)MODS.push({id:"hist",tab:"tHist",view:vHist});
