/* ===== module: measurements (2D:4D etc.) ===== */
var MS=D.meas||null;
function measOut(){
 if(!MS||!MS.d24)return "";var m=S.meas,a=+m.idx,b=+m.ring,h="";
 if(a>0&&b>0){var r=a/b,ref=MS.d24[m.sex==="f"?"female":"male"][m.hand==="l"?"left":"right"],z=(r-ref.mean)/ref.sd;
  h+='<p><strong>'+t("ratioLbl")+':</strong> '+fmt(r,3)+'<br><strong>'+t("zLbl")+':</strong> '+fmt(z,1)+'</p>';
  if(S.unc>0){var rs=[],e=S.unc/100;for(var i=0;i<2000;i++)rs.push((a*(1+(Math.random()*2-1)*e))/(b*(1+(Math.random()*2-1)*e)));rs.sort(function(x,y){return x-y;});h+='<p class="sub">'+fill(t("unMeas"),{p:S.unc,a:fmt(rs[50],3),b:fmt(rs[1949],3)})+' '+t("unNote")+'</p>';}
  if(r<0.7||r>1.3)h+='<p><em>'+t("calcWarn")+'</em></p>';}
 if(MS.hand_height&&+m.hl>0&&+m.st>0){var q=(+m.hl)/((+m.st)*10),zz=(q-MS.hand_height.ratio_mean)/MS.hand_height.ratio_sd;
  h+='<p><strong>'+t("handLen")+' / '+t("statLbl")+':</strong> '+fmt(q,3)+' ('+t("zLbl")+': '+fmt(zz,1)+')</p>';}
 return h;
}
function vMeas(){
 if(!MS)return '<p>…</p>';var m=S.meas;
 var h='<div class="card"><p style="margin-top:0">'+t("measNote")+'</p><div class="form">';
 h+='<label>'+t("sexLbl")+'<select data-act="msx"><option value="m"'+(m.sex==="m"?" selected":"")+'>'+t("male")+'</option><option value="f"'+(m.sex==="f"?" selected":"")+'>'+t("female")+'</option></select></label>';
 h+='<label>'+t("handLbl")+'<select data-act="mhd"><option value="r"'+(m.hand==="r"?" selected":"")+'>'+t("rh")+'</option><option value="l"'+(m.hand==="l"?" selected":"")+'>'+t("lh")+'</option></select></label>';
 [["idx","idxLen"],["ring","ringLen"]].concat(MS.hand_height?[["hl","handLen"],["st","statLbl"]]:[]).forEach(function(f){h+='<label>'+t(f[1])+'<input class="num" type="text" inputmode="decimal" autocomplete="off" data-act="meas" data-k="'+f[0]+'" value="'+m[f[0]]+'"></label>';});
 h+='</div><label>'+t("unRel")+' <output>'+S.unc+'</output><input type="range" min="0" max="5" step="1" value="'+S.unc+'" data-act="unc"></label><div id="measres" aria-live="polite">'+measOut()+'</div>'+(MS.d24.src?'<p class="src">'+t("srcLbl")+': '+MS.d24.src+'</p>':'')+'</div>';
 h+=mlBlock();
 if(MS.tests&&MS.tests.length){h+='<div class="cards" style="margin-top:14px">';MS.tests.forEach(function(x){h+='<div class="card"><h4>'+L(x.n)+'</h4><p>'+L(x.d)+'</p></div>';});h+='</div>';}
 return h;
}
function mlBlock(){
 var h='<div class="card" style="margin-top:14px"><h3 style="margin-top:0">'+t("mlTitle")+'</h3><div class="row"><button class="btn" data-act="mlsave">'+t("mlSave")+'</button>'+(S.ml.length?'<button class="btn" data-act="mlclear">'+t("mlClear")+'</button>':'')+'</div>';
 if(!S.ml.length)return h+'<p class="sub">'+t("mlEmpty")+'</p></div>';
 ["l","r"].forEach(function(hd){var a=S.ml.filter(function(x){return x.h===hd;});if(!a.length)return;var mean=a.reduce(function(s,x){return s+x.r;},0)/a.length;h+='<p><strong>'+fill(t("mlMean"),{h:t(hd==="l"?"lh":"rh"),v:fmt(mean,3),n:a.length})+'</strong></p>';});
 h+=mlSpark()+'<ul class="plist">'+S.ml.map(function(x,i){return '<li><span class="pn">'+x.d+' · '+t(x.h==="l"?"lh":"rh")+' · '+fmt(x.r,3)+'</span><button class="btn" data-act="mldel" data-v="'+i+'" aria-label="'+t("mlDel")+' '+x.d+'">'+t("mlDel")+'</button></li>';}).join("")+'</ul>';
 return h+'</div>';
}
function mlSpark(){
 if(S.ml.length<2)return "";var W=300,H=70,v=S.ml.map(function(x){return x.r;}),mn=Math.min.apply(null,v)-0.01,mx=Math.max.apply(null,v)+0.01;
 var pts=S.ml.map(function(x,i){return (i*W/(S.ml.length-1)).toFixed(1)+","+(H-(x.r-mn)*H/(mx-mn)).toFixed(1);}).join(" ");
 return '<svg viewBox="0 0 '+W+' '+H+'" class="spark" role="img" aria-label="'+t("ratioLbl")+'"><polyline points="'+pts+'" fill="none" stroke="var(--accent)" stroke-width="2.5"/></svg>';
}
ACT.mlsave=function(){var a=+S.meas.idx,b=+S.meas.ring;if(!(a>0&&b>0)){say(t("calcWarn"));return;}var r=a/b;if(r<0.7||r>1.3){say(t("calcWarn"));return;}
 var d=new Date(),ds=d.getFullYear()+"-"+("0"+(d.getMonth()+1)).slice(-2)+"-"+("0"+d.getDate()).slice(-2);
 if(S.ml.length>=30)S.ml.shift();S.ml.push({d:ds,r:Math.round(r*1000)/1000,h:S.meas.hand==="l"?"l":"r"});save();render();say(t("mlSave"));};
ACT.mldel=function(el){var i=+el.getAttribute("data-v");if(i>=0&&i<S.ml.length){S.ml.splice(i,1);save();render();}};
ACT.mlclear=function(){S.ml=[];save();render();};
INP.meas=function(el){var k=el.getAttribute("data-k");if(k in S.meas){S.meas[k]=nv(el.value);save();var r=document.getElementById("measres");if(r)r.innerHTML=measOut();}};
CHG.msx=function(el){S.meas.sex=el.value==="f"?"f":"m";save();render();};
CHG.mhd=function(el){S.meas.hand=el.value==="l"?"l":"r";save();render();};
if(MS)MODS.push({id:"meas",tab:"tMeas",view:vMeas});
