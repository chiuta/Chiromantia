/* ===== module: testable predictions ===== */
var PD={t:"",d:""};
INP.pdt=function(el){PD.t=el.value.slice(0,200);};
INP.pdd=function(el){PD.d=el.value;};
function vPred(){
 var t0=todayISO(),h='<div class="card"><p style="margin-top:0">'+t("pdIntro")+'</p><div class="form"><label>'+t("pdText")+'<textarea class="num" id="pdt" data-act="pdt" maxlength="200" rows="2" style="font-size:1rem">'+esc(PD.t)+'</textarea></label><label>'+t("pdDate")+'<input class="num" type="date" id="pdd" data-act="pdd" min="'+t0+'" value="'+esc(PD.d)+'"></label></div><div class="row"><button class="btn pri" data-act="pdadd">'+t("pdAdd")+'</button></div><p class="sub">'+t("pdLesson")+'</p></div>';
 h+='<div class="card" style="margin-top:14px">';
 if(!S.pr.length)return h+'<p class="sub" style="margin:0">'+t("pdEmpty")+'</p></div>';
 var y=S.pr.filter(function(x){return x.s==="y";}).length,n=S.pr.filter(function(x){return x.s==="n";}).length,u=S.pr.filter(function(x){return x.s==="u";}).length;
 if(y+n+u)h+='<p><strong>'+fill(t("pdStats"),{y:y,n:n,u:u})+'</strong></p>';
 h+='<ul class="plist">'+S.pr.map(function(x,i){var due=x.s==="p"&&x.d<=t0;
  return '<li><span class="pn">'+esc(x.t)+'</span><span class="pnn sub">'+fill(t("pdWhen"),{d:x.d})+' · '+t({p:"pdPend",y:"pdYes",n:"pdNo",u:"pdUnc"}[x.s])+'</span>'+(due?'<button class="btn pri" data-act="pdset" data-v="'+i+'" data-k="y">'+t("pdYes")+'</button><button class="btn" data-act="pdset" data-v="'+i+'" data-k="n">'+t("pdNo")+'</button><button class="btn" data-act="pdset" data-v="'+i+'" data-k="u">'+t("pdUnc")+'</button>':'')+'<button class="btn" data-act="pddel" data-v="'+i+'" aria-label="'+t("pdDel")+': '+esc(x.t.slice(0,30))+'">'+t("pdDel")+'</button></li>';}).join("")+'</ul></div>';
 return h;
}
ACT.pdadd=function(){var tx=PD.t.replace(/[\u0000-\u001f<>]/g," ").trim().slice(0,200);if(tx.length<5||!/^\d{4}-\d{2}-\d{2}$/.test(PD.d)||PD.d<=todayISO()){say(t("pdBad"));return;}
 if(S.pr.length>=20){var ri=-1;S.pr.forEach(function(q,i){if(ri<0&&q.s!=="p")ri=i;});if(ri<0){say(t("pdFull"));return;}S.pr.splice(ri,1);}S.pr.push({t:tx,d:PD.d,s:"p"});PD={t:"",d:""};save();render();say(t("pdAdd"));};
ACT.pdset=function(el){var i=+el.getAttribute("data-v"),k=el.getAttribute("data-k");if(S.pr[i]&&/^[ynu]$/.test(k)){S.pr[i].s=k;save();render();}};
ACT.pddel=function(el){var i=+el.getAttribute("data-v");if(i>=0&&i<S.pr.length){S.pr.splice(i,1);save();render();}};
MODS.push({id:"pred",tab:"tPred",view:vPred});
