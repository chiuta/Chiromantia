/* ===== module: science & critical thinking ===== */
var SC=D.sci||null,LVL=["○","✕","◐","●"],LVC=["var(--lv0)","var(--lv1)","var(--lv2)","var(--lv3)"];
function vSci(){
 if(!SC)return '<p>…</p>';var h='<h3 class="h3">'+t("hClaims")+'</h3><div class="cards">';
 SC.claims.forEach(function(c){h+='<div class="card"><p class="lvl" style="color:'+LVC[c.lvl]+'"><span aria-hidden="true">'+LVL[c.lvl]+'</span> '+t("lvl"+c.lvl)+'</p><h4>'+L(c.n)+'</h4><p>'+L(c.d)+'</p>'+(c.src?'<p class="src">'+t("srcLbl")+': '+c.src+'</p>':'')+'</div>';});
 h+='</div><h3 class="h3">'+t("hBarnum")+'</h3><div class="card"><p style="margin-top:0">'+t("barnumIntro")+'</p><blockquote class="bq">'+SC.barnum.map(function(b){return L(b.t);}).join(" ")+'</blockquote>';
 if(!S.bn.show){h+='<label>'+t("barnumRate")+'<select data-act="bnr"><option value="">'+t("choose")+'</option>'+[0,1,2,3,4,5].map(function(i){return '<option value="'+i+'"'+(String(S.bn.r)===String(i)?" selected":"")+'>'+i+'</option>';}).join("")+'</select></label><div class="row"><button class="btn pri" data-act="bnshow">'+t("barnumShow")+'</button></div>';}
 else{h+='<p id="bnres" tabindex="-1"><strong>'+t("barnumRes").replace("{r}",S.bn.r===""?"–":S.bn.r)+'</strong></p><div class="row"><button class="btn" data-act="bnagain">'+t("barnumAgain")+'</button></div>';}
 h+='</div>';
 if(SC.cold&&SC.cold.length){h+='<h3 class="h3">'+t("hCold")+'</h3><div class="cards">';SC.cold.forEach(function(c){h+='<div class="card"><h4>'+L(c.n)+'</h4><p>'+L(c.d)+'</p></div>';});h+='</div>';}
 return h;
}
CHG.bnr=function(el){S.bn.r=/^[0-5]$/.test(el.value)?el.value:"";};
ACT.bnshow=function(){S.bn.show=true;render();var r=document.getElementById("bnres");if(r)r.focus({preventScroll:true});};
ACT.bnagain=function(){S.bn={r:"",show:false};render();};
if(SC)MODS.push({id:"sci",tab:"tSci",view:vSci});
