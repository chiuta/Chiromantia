/* ===== module: hand types (+ calculator) ===== */
var T7=D.types7||[],CALC=D.calc||null;
function curType(){var p=S.R.palm,f=S.R.fin;if(!p||!f)return null;for(var i=0;i<TY.length;i++){if(TY[i].pal===p&&TY[i].fin===f)return TY[i];}return null;}
function calcOut(){
 if(!CALC)return "";var c=S.calc,pl=+c.pl,pw=+c.pw,ml=+c.ml;
 if(!(pl>0&&pw>0&&ml>0))return "";
 var r1=pw/pl,r2=ml/pl,palm=r1>=1/CALC.sqMaxRatio?"sq":"lg",fin=r2>=CALC.longFingerMinRatio?"lg":"sh";
 var ty=TY.filter(function(y){return y.pal===palm&&y.fin===fin;})[0];
 var h='<p><strong>'+t("palmShape")+':</strong> '+(palm==="sq"?t("sq"):t("lg"))+' ('+fmt(r1,2)+')<br><strong>'+t("fingLen")+':</strong> '+(fin==="lg"?t("lgF"):t("sh"))+' ('+fmt(r2,2)+')<br><strong>'+L(ty.n)+'</strong> — '+L(ty.d)+'</p>';
 if(r2<0.4||r2>1.3||r1<0.45||r1>1.45)h+='<p><em>'+t("calcWarn")+'</em></p>';
 if(S.unc>0){var st=0,N=2000,e=S.unc/100;for(var i=0;i<N;i++){var a=pl*(1+(Math.random()*2-1)*e),b=pw*(1+(Math.random()*2-1)*e),m2=ml*(1+(Math.random()*2-1)*e);if(((b/a)>=1/CALC.sqMaxRatio?"sq":"lg")===palm&&((m2/a)>=CALC.longFingerMinRatio?"lg":"sh")===fin)st++;}
  h+='<p class="sub">'+fill(t("unCalc"),{p:S.unc,v:Math.round(st*100/N)})+' '+t("unNote")+'</p>';}
 return h+'<button class="btn" data-act="calcuse">'+t("calcUse")+'</button>';
}
function vTypes(){
 var ct=curType(),h='';
 if(T7.length)h+='<h3 class="h3">'+t("tyH4")+'</h3>';
 h+='<div class="cards">';
 TY.forEach(function(y){h+='<div class="card'+(ct&&ct.id===y.id?" match":"")+'" style="border-left:6px solid '+y.c+'"><h4>'+L(y.n)+'</h4><p>'+L(y.d)+'</p></div>';});
 h+='</div>';
 if(T7.length){h+='<h3 class="h3">'+t("tyH7")+'</h3><div class="cards">';
  T7.forEach(function(y){h+='<div class="card" style="border-left:6px solid '+y.c+'"><h4>'+L(y.n)+'</h4><p class="sub">'+L(y.s)+'</p><p>'+L(y.d)+'</p></div>';});h+='</div>';}
 if(CALC){h+='<h3 class="h3">'+t("calcT")+'</h3><div class="card"><p style="margin-top:0">'+t("calcHow")+'</p><div class="form">';
  [["pl","palmLen"],["pw","palmWid"],["ml","midLen"]].forEach(function(f){h+='<label>'+t(f[1])+'<input class="num" type="text" inputmode="decimal" autocomplete="off" data-act="calc" data-k="'+f[0]+'" value="'+S.calc[f[0]]+'"></label>';});
  h+='</div><label>'+t("unRel")+' <output>'+S.unc+'</output><input type="range" min="0" max="5" step="1" value="'+S.unc+'" data-act="unc"></label><p class="sub">'+L(CALC.rule)+'</p><div id="calcres" aria-live="polite">'+calcOut()+'</div></div>';}
 return h;
}
INP.unc=function(el){var v=+el.value;if(v>=0&&v<=5&&v%1===0){S.unc=v;save();var o=el.parentNode.querySelector("output");if(o)o.textContent=v;var r=document.getElementById("calcres");if(r)r.innerHTML=calcOut();var m=document.getElementById("measres");if(m)m.innerHTML=measOut();}};
INP.calc=function(el){var k=el.getAttribute("data-k");if(k in S.calc){S.calc[k]=nv(el.value);save();var r=document.getElementById("calcres");if(r)r.innerHTML=calcOut();}};
ACT.calcuse=function(){var c=S.calc,pl=+c.pl,pw=+c.pw,ml=+c.ml;S.R.palm=(pw/pl)>=1/CALC.sqMaxRatio?"sq":"lg";S.R.fin=(ml/pl)>=CALC.longFingerMinRatio?"lg":"sh";S.done=false;save();say(t("calcUse"));render();};
MODS.push({id:"types",tab:"tTypes",view:vTypes});
