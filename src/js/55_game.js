/* ===== module: map game ===== */
var GM={on:false,ord:[],i:0,ok:0,fb:"",ans:false};
var GT=[];
function gtargets(){return E.filter(function(e){return e.k==="lines"||e.k==="mounts"||e.k==="fingers";});}
function gstart(){var a=gtargets().map(function(e){return e.id;});for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),x=a[i];a[i]=a[j];a[j]=x;}
 GM={on:true,ord:a.slice(0,10),i:0,ok:0,fb:"",ans:false};}
function gsvg(){
 var s='<svg class="hand gm" viewBox="0 0 300 400" role="group" aria-label="'+t("tGame")+'"><g fill="var(--outline)" stroke="var(--outline)" stroke-width="5" stroke-linejoin="round">'+PALM+FING.map(function(f){return f[1];}).join("")+'</g><g fill="var(--skin)">'+PALM+'</g>';
 FING.forEach(function(f){s+=f[1].replace("<rect",'<rect class="fg" fill="var(--skin)" data-act="gpick" data-id="'+f[0]+'"');});
 MOUNTS.forEach(function(m){var e=EI[m[0]];s+='<ellipse class="mt" data-act="gpick" data-id="'+m[0]+'" cx="'+m[1]+'" cy="'+m[2]+'" rx="'+m[3]+'" ry="'+m[4]+'" fill="'+e.c+'" fill-opacity=".35" stroke="'+e.c+'"/>';});
 for(var id in LINES){s+='<path class="ln" d="'+LINES[id]+'" stroke="'+EI[id].c+'" fill="none"/><path class="hit" data-act="gpick" data-id="'+id+'" d="'+LINES[id]+'"/>';}
 return s+'</svg>';
}
function vGame(){
 var h='<div class="card">';
 if(!GM.on)return h+'<div class="row"><button class="btn pri" data-act="gstart">'+t("gStart")+'</button></div></div>';
 if(GM.i>=GM.ord.length)return h+'<p id="gres" tabindex="-1"><strong>'+fill(t("gScore"),{n:GM.ok,m:GM.ord.length})+'</strong></p><div class="row"><button class="btn pri" data-act="gstart">'+t("gAgain")+'</button></div></div>';
 var id=GM.ord[GM.i],tg=EI[id];
 h+='<p class="sub">'+(GM.i+1)+' / '+GM.ord.length+'</p><p id="gq" tabindex="-1"><strong>'+fill(t("gPrompt"),{n:esc(L(tg.n))})+'</strong></p>';
 h+='<div class="grid hand-grid"><div>'+gsvg()+'</div><div><p id="gfb" role="status" aria-live="polite">'+esc(GM.fb)+'</p>';
 if(!GM.ans){h+='<label>'+t("gSelect")+'<select id="gsel" data-act="gsel"><option value="">'+t("choose")+'</option>'+gtargets().map(function(e){return '<option value="'+e.id+'">'+esc(L(e.n))+'</option>';}).join("")+'</select></label><div class="row"><button class="btn" data-act="gcheck">'+t("gCheck")+'</button></div>';}
 else h+='<div class="row"><button class="btn pri" data-act="gnext">'+t("gNext")+'</button></div>';
 return h+'</div></div></div>';
}
function gresolve(pick){
 if(!GM.on||GM.ans||GM.i>=GM.ord.length||!EI[pick])return;
 var id=GM.ord[GM.i],ok=(pick===id)||(id==="mars"&&pick==="mars");
 if(ok)GM.ok++;GM.fb=ok?t("gOK"):fill(t("gNo"),{n:L(EI[id].n)});GM.ans=true;render();say(GM.fb);
}
ACT.gstart=function(){gstart();render();var q=document.getElementById("gq");if(q)q.focus({preventScroll:true});};
ACT.gpick=function(el,ev){var t0=el;if(el.classList&&el.classList.contains("hit")&&ev&&typeof nearestHit==="function")t0=nearestHit(el,ev);gresolve(t0.getAttribute("data-id"));};
ACT.gcheck=function(){var s=document.getElementById("gsel");if(s&&s.value)gresolve(s.value);};
ACT.gnext=function(){GM.i++;GM.fb="";GM.ans=false;render();var q=document.getElementById("gq")||document.getElementById("gres");if(q)q.focus({preventScroll:true});};
MODS.push({id:"game",tab:"tGame",view:vGame});
