/* ===== module: cold-reading simulator ===== */
var SIM=D.sim||null,SM={on:false,s:null,i:0,ok:0,used:[],pick:-1};
function smStart(){var sc=JSON.parse(JSON.stringify(SIM[Math.floor(Math.random()*SIM.length)]));sc.turns.forEach(function(t){shuf(t.opts);});SM={on:true,s:sc,i:0,ok:0,used:[],pick:-1};}
function techInfo(id){var c=((D.sci&&D.sci.cold)||[]).filter(function(x){return x.id===id;})[0];return c;}
function vSim(){
 var h='<div class="card"><p style="margin-top:0">'+t("smIntro")+'</p>';
 if(!SM.on)return h+'<div class="row"><button class="btn pri" data-act="smstart">'+t("smStart")+'</button></div></div>';
 var s=SM.s;
 if(SM.i>=s.turns.length){
  h+='<h3 id="smres" tabindex="-1">'+t("smDebrief")+'</h3><p><strong>'+fill(t("smScore"),{n:SM.ok,m:s.turns.length})+'</strong></p><ul>';
  var seen={};SM.used.forEach(function(id){if(seen[id])return;seen[id]=1;var c=techInfo(id);if(c)h+='<li><strong>'+esc(L(c.n))+'.</strong> '+esc(L(c.d))+'</li>';});
  return h+'</ul><p><em>'+t("smLesson")+'</em></p><div class="row"><button class="btn pri" data-act="smstart">'+t("smAgain")+'</button></div></div>';}
 var tn=s.turns[SM.i];
 h+='<p class="sub">'+(SM.i+1)+' / '+s.turns.length+' · '+esc(L(s.n))+'</p>'+(SM.i===0?'<p>'+esc(L(s.ctx))+'</p>':'')+'<p id="smq" tabindex="-1"><strong>'+esc(L(tn.ctx))+'</strong></p>';
 if(SM.pick<0){h+='<p>'+t("smPick")+'</p><div class="optl">'+tn.opts.map(function(o,i){return '<button class="btn" data-act="smpick" data-v="'+i+'">'+esc(L(o.t))+'</button>';}).join("")+'</div>';}
 else{var o=tn.opts[SM.pick],c=techInfo(o.tech);h+='<blockquote class="bq">'+esc(L(o.t))+'</blockquote><p role="status" aria-live="polite"><strong>'+esc(L(o.r))+'</strong></p><p class="sub">'+t("smTech")+': '+esc(c?L(c.n):o.tech)+'</p><div class="row"><button class="btn pri" data-act="smnext">'+t("smNext")+'</button></div>';}
 return h+'</div>';
}
ACT.smstart=function(){smStart();render();var q=document.getElementById("smq");if(q)q.focus({preventScroll:true});};
ACT.smpick=function(el){var i=+el.getAttribute("data-v"),tn=SM.s.turns[SM.i];if(SM.pick>=0||!tn||!tn.opts[i])return;SM.pick=i;if(tn.opts[i].good)SM.ok++;SM.used.push(tn.opts[i].tech);render();var q=document.querySelector("#app [role=status]");if(q){q.tabIndex=-1;q.focus({preventScroll:true});}};
ACT.smnext=function(){SM.i++;SM.pick=-1;render();var q=document.getElementById("smq")||document.getElementById("smres");if(q)q.focus({preventScroll:true});};
if(SIM&&SIM.length)MODS.push({id:"sim",tab:"tSim",view:vSim});
