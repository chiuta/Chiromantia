/* ===== module: printable cheat sheet ===== */
function first(x){var s=L(x),i=s.search(/[.!?]\s/);return i>0&&i<160?s.slice(0,i+1):s.slice(0,140);}
function vSheet(){
 var h='<div class="row noprint"><button class="btn pri" data-act="print">'+t("shPrint")+'</button></div><div class="card sheet"><h3 style="margin-top:0">CHIROMANTIA — '+t("tSheet")+'</h3>';
 ["lines","minor","mounts","fingers"].forEach(function(k){h+='<h4>'+t(k)+'</h4><ul class="sh">'+E.filter(function(e){return e.k===k;}).map(function(e){return '<li><span class="dot" style="background:'+e.c+'" aria-hidden="true"></span><strong>'+esc(L(e.n))+'</strong> — '+esc(first(e.d))+'</li>';}).join("")+'</ul>';});
 h+='<h4>'+t("tTypes")+'</h4><ul class="sh">'+TY.map(function(y){return '<li><strong>'+esc(L(y.n))+'</strong> — '+esc(first(y.d))+'</li>';}).join("")+'</ul>';
 return h+'<p class="sub"><em>'+t("shNote")+'</em></p></div>';
}
MODS.push({id:"sheet",tab:"tSheet",view:vSheet});
