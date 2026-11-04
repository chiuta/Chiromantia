/* ===== module: flashcards (Leitner) ===== */
var CD=null,CDK=null,CDF=false;
function cardPool(){var p=[];E.forEach(function(e){p.push({k:"e:"+e.id,f:L(e.n),b:L(e.d)});});SG.forEach(function(g){p.push({k:"s:"+g.id,f:L(g.n),b:L(g.d)});});(D.gloss||[]).forEach(function(x){p.push({k:"g:"+x.id,f:L(x.t),b:L(x.d)});});return p;}
function boxOf(k){return S.lt[k]||0;}
function pickCard(){var p=cardPool(),low=5;p.forEach(function(c){var b=boxOf(c.k);if(b<low)low=b;});
 var cand=p.filter(function(c){return boxOf(c.k)===low&&c.k!==CDK;});if(!cand.length)cand=p.filter(function(c){return boxOf(c.k)===low;});
 if(low>=4&&cand.length===p.length)return null;
 return cand[Math.floor(Math.random()*cand.length)]||null;}
function vCards(){
 var p=cardPool(),m=p.filter(function(c){return boxOf(c.k)>=4;}).length;
 var h='<div class="card"><p class="sub" style="margin-top:0">'+t("cdIntro")+'</p><p><strong>'+fill(t("cdProg"),{n:m,m:p.length})+'</strong></p><div class="bar" aria-hidden="true"><i style="width:'+Math.round(m*100/p.length)+'%"></i></div>';
 if(!CD||CD.k!==CDK)CD=pickCard();if(CD)CDK=CD.k;
 if(CD){h+='<div class="fc" id="fc" tabindex="-1" aria-live="polite"><h4>'+esc(CD.f)+'</h4>'+(CDF?'<p>'+esc(CD.b)+'</p>':'')+'</div><div class="row">';
  if(!CDF)h+='<button class="btn pri" data-act="cdflip">'+t("cdFlip")+'</button>';
  else h+='<button class="btn pri" data-act="cdans" data-v="1">'+t("cdKnew")+'</button><button class="btn" data-act="cdans" data-v="0">'+t("cdMiss")+'</button>';
  h+='</div>';}
 else h+='<p><strong>'+fill(t("cdProg"),{n:p.length,m:p.length})+'</strong></p>';
 return h+'<div class="row"><button class="btn" data-act="cdreset">'+t("cdReset")+'</button></div></div>';
}
ACT.cdflip=function(){CDF=true;render();var f=document.getElementById("fc");if(f)f.focus({preventScroll:true});};
ACT.cdans=function(el){if(!CD)return;var ok=el.getAttribute("data-v")==="1",b=boxOf(CD.k);S.lt[CD.k]=ok?Math.min(4,b+1):0;save();CDF=false;CD=null;render();var f=document.getElementById("fc");if(f)f.focus({preventScroll:true});};
ACT.cdreset=function(){S.lt={};save();CD=null;CDK=null;CDF=false;render();};
MODS.push({id:"cards",tab:"tCards",view:vCards});
