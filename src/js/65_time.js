/* ===== module: life-line timeline (folk belief) ===== */
var TL=D.timeline||null,TLA=0;
function vTime(){
 if(!TL)return '<p>…</p>';
 var sc=TL.scale,cur=sc.filter(function(x){return x.age===TLA;})[0]||sc[0];
 var s='<svg class="hand tl" viewBox="0 0 300 400" role="img" aria-label="'+t("tTimeline")+'"><g fill="var(--outline)" stroke="var(--outline)" stroke-width="5" stroke-linejoin="round">'+PALM+FING.map(function(f){return f[1];}).join("")+'</g><g fill="var(--skin)">'+PALM+'</g>';
 s+='<path id="tlpath" d="'+LINES.life+'" fill="none" stroke="'+EI.life.c+'" stroke-width="4" stroke-linecap="round"/><g id="tlmk"></g></svg>';
 var h;
 h='<div class="grid hand-grid"><div class="card">'+s+'</div><div><div class="card"><p class="note-v" style="margin-top:0">'+L(TL.note)+'</p><p>'+L(TL.how)+'</p>';
 h+='<div class="chips" role="group" aria-label="'+t("tTimeline")+'">'+sc.map(function(x){return '<button data-act="tlage" data-v="'+x.age+'" aria-pressed="'+(x.age===TLA)+'" class="'+(x.age===TLA?"on":"")+'">'+x.age+'</button>';}).join("")+'</div>';
 h+='<p class="detail" aria-live="polite"><strong>'+cur.age+'</strong> — '+L(cur.n)+'</p>'+(TL.src?'<p class="src">'+t("srcLbl")+': '+TL.src+'</p>':'')+'</div></div></div>';
 return h;
}
ACT.tlage=function(el){var v=+el.getAttribute("data-v");if(v>=0&&v<=80&&v%10===0){TLA=v;render();}};
MODS.push({id:"time",tab:"tTimeline",view:vTime,after:function(){
 var p=document.getElementById("tlpath"),g=document.getElementById("tlmk");if(!p||!g||!p.getTotalLength)return;
 var n=p.getTotalLength(),h="";
 for(var a=0;a<=80;a+=10){var q=p.getPointAtLength(n*a/80);h+='<circle cx="'+q.x.toFixed(1)+'" cy="'+q.y.toFixed(1)+'" r="'+(a===TLA?7:4)+'" fill="'+(a===TLA?"var(--accent)":"var(--bg)")+'" stroke="var(--fg)" stroke-width="2"/>';
  if(a===TLA)h+='<text x="'+(q.x+10).toFixed(1)+'" y="'+(q.y+4).toFixed(1)+'" font-size="14" font-weight="700" fill="var(--fg)">'+a+'</text>';}
 g.innerHTML=h;
}});
