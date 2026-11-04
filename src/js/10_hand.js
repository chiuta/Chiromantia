/* ===== module: hand map ===== */
var FING=[["thumb",'<rect x="-17" y="-46" width="34" height="92" rx="17" transform="translate(64 266) rotate(-30)"/>'],
 ["idx",'<rect x="80" y="99" width="30" height="111" rx="15"/>'],
 ["mid",'<rect x="112" y="78" width="32" height="132" rx="16"/>'],
 ["ring",'<rect x="146" y="99" width="30" height="111" rx="15"/>'],
 ["lit",'<rect x="178" y="134" width="27" height="76" rx="13.5"/>']];
var PALM='<path d="M80 200H205L208 300Q205 358 145 372Q88 358 80 300Z"/>';
var MOUNTS=[["jup",95,206,14,8],["sat",127,203,14,8],["apo",161,205,13,8],["mmer",191,208,12,8],["mars",197,258,10,13],["mars",88,224,7,8],["moon",186,318,15,24],["ven",104,300,22,32]];
var LINES={life:"M92 238C138 262 132 318 128 354",head:"M95 246C130 256 170 266 203 278",heart:"M205 246C180 228 140 232 106 226",fate:"M140 362C140 322 137 280 130 238",sun:"M168 322C166 296 163 268 160 240",mer:"M128 336C152 312 176 286 190 256"};
var MINOR={girdle:"M112 219C124 212 138 213 146 220C156 227 168 226 180 216",intu:"M196 340C203 318 203 292 192 272",brac:"M104 350C132 357 164 357 190 350M114 360C134 365 160 365 180 360",rel:"M206 226L192 228M206 233L196 234",solo:"M84 224C86 214 94 212 102 214C108 216 110 220 110 224",trav:"M207 296L198 298M207 304L198 305",marsl:"M96 250C122 268 116 314 112 340"};
function handSVG(){
 var sel=S.sel,Ly=S.lay,second=false;
 var s='<svg class="hand has-sel" viewBox="0 0 300 400" role="group" aria-label="'+t("tHand")+'"><g'+(S.hand==="r"?' transform="translate(300 0) scale(-1 1)"':'')+'>';
 s+='<g fill="var(--outline)" stroke="var(--outline)" stroke-width="5" stroke-linejoin="round">'+PALM+FING.map(function(f){return f[1];}).join("")+'</g>';
 s+='<g fill="var(--skin)" stroke="none">'+PALM+'</g>';
 s+='<g class="'+(Ly.fingers?"":"hide")+'" fill="var(--skin)">';
 FING.forEach(function(f){var e=EI[f[0]];s+=f[1].replace("<rect",'<rect class="fg'+(sel===f[0]?" sel":"")+'" data-act="sel" data-id="'+f[0]+'" tabindex="-1" role="button" aria-pressed="'+(sel===f[0])+'" aria-label="'+L(e.n)+'"');});
 s+='</g><g class="'+(Ly.mounts?"":"hide")+'">';
 var seenMars=false;
 MOUNTS.forEach(function(m){var e=EI[m[0]];var dup=(m[0]==="mars"&&seenMars);if(m[0]==="mars")seenMars=true;
  s+='<ellipse class="mt'+(sel===m[0]?" sel":"")+'" data-act="sel" data-id="'+m[0]+'" cx="'+m[1]+'" cy="'+m[2]+'" rx="'+m[3]+'" ry="'+m[4]+'" fill="'+e.c+'" stroke="'+e.c+'" tabindex="-1"'+(dup?' aria-hidden="true"':' role="button" aria-pressed="'+(sel===m[0])+'" aria-label="'+L(e.n)+'"')+'/>';});
 s+='</g><g class="'+(Ly.minor?"":"hide")+'">';
 for(var mid in MINOR){var me=EI[mid];if(!me)continue;var msel=sel===mid;
  if(msel)s+='<path class="halo" d="'+MINOR[mid]+'" stroke="'+me.c+'"/>';
  s+='<path class="case'+(msel?" sel":"")+'" d="'+MINOR[mid]+'"/><path class="ln min'+(msel?" sel":"")+'" data-act="sel" data-id="'+mid+'" d="'+MINOR[mid]+'" stroke="'+me.c+'"/><path class="hit min" data-act="sel" data-id="'+mid+'" d="'+MINOR[mid]+'" tabindex="-1" role="button" aria-pressed="'+msel+'" aria-label="'+L(me.n)+'"/>';}
 s+='</g><g class="'+(Ly.lines?"":"hide")+'">';
 for(var id in LINES){var e2=EI[id],isel=sel===id;
  if(isel)s+='<path class="halo" d="'+LINES[id]+'" stroke="'+e2.c+'"/>';
  s+='<path class="case'+(isel?" sel":"")+'" d="'+LINES[id]+'"/><path class="ln'+(isel?" sel":"")+'" data-act="sel" data-id="'+id+'" d="'+LINES[id]+'" stroke="'+e2.c+'"/><path class="hit" data-act="sel" data-id="'+id+'" d="'+LINES[id]+'" tabindex="-1" role="button" aria-pressed="'+isel+'" aria-label="'+L(e2.n)+'"/>';}
 return s+'</g></g></svg>';
}
function vHand(){
 var e=EI[S.sel];
 var h='<div class="grid hand-grid"><div class="card">'+handSVG()+'<p class="cap" aria-hidden="true">'+L(e.n)+'</p><p class="sub kbd noprint">'+t("kbd")+'</p></div><div><div class="card">';
 h+='<div class="layers noprint" role="group" aria-label="'+t("layersLbl")+'">';
 ["lines","minor","mounts","fingers"].forEach(function(k){h+='<label><input type="checkbox" data-act="lay" data-k="'+k+'"'+(S.lay[k]?" checked":"")+'> '+t(k)+'</label>';});
 h+='<span class="seg" role="group" aria-label="'+t("handLbl")+'"><button data-act="hand" data-v="l" aria-pressed="'+(S.hand==="l")+'" class="'+(S.hand==="l"?"on":"")+'">'+t("lh")+'</button><button data-act="hand" data-v="r" aria-pressed="'+(S.hand==="r")+'" class="'+(S.hand==="r"?"on":"")+'">'+t("rh")+'</button></span></div>';
 h+='<div class="detail"><span class="chip" style="border-color:'+e.c+'">'+t(e.k)+'</span><h3>'+L(e.n)+'</h3><p>'+L(e.d)+'</p><div class="row noprint"><button class="btn'+(S.st[e.id]?' on':'')+'" data-act="std" data-k="'+e.id+'" aria-pressed="'+(S.st[e.id]===1)+'">'+(S.st[e.id]?'✓ '+t("stdDone"):t("stdMark"))+'</button><button class="btn" data-act="speak" data-k="'+e.id+'">'+t("spkRead")+'</button><button class="btn" data-act="spkstop">'+t("spkStop")+'</button></div></div></div>';
 var sn=E.filter(function(x){return S.st[x.id];}).length;
 h+='<div class="card noprint" style="margin-top:14px"><p class="sub" style="margin-bottom:4px"><strong>'+fill(t("stdProg"),{n:sn,m:E.length})+'</strong></p><div class="bar" aria-hidden="true"><i style="width:'+Math.round(sn*100/E.length)+'%"></i></div><p class="sub" style="margin-bottom:4px">'+t("tap")+'</p>';
 ["lines","minor","mounts","fingers"].forEach(function(k){h+='<div class="h3">'+t(k)+'</div><div class="chips">';E.filter(function(x){return x.k===k;}).forEach(function(x){h+='<button data-act="sel" data-id="'+x.id+'" aria-pressed="'+(S.sel===x.id)+'" class="'+(S.sel===x.id?"on":"")+'"><span class="dot" style="background:'+x.c+'"></span>'+L(x.n)+'</button>';});h+='</div>';});
 return h+'</div></div></div>';
}
function nearestHit(el,ev){
 try{var svg=el.closest("svg.hand");if(!svg||!ev||typeof ev.clientX!=="number"||!svg.getScreenCTM||!el.getTotalLength||(ev.clientX===0&&ev.clientY===0))return el;
  var m=svg.getScreenCTM().inverse(),pt=svg.createSVGPoint();pt.x=ev.clientX;pt.y=ev.clientY;var q=pt.matrixTransform(m);
  if(S.hand==="r"&&!svg.classList.contains("gm"))q={x:300-q.x,y:q.y};
  var best=el,bd=1e9;[].forEach.call(svg.querySelectorAll("path.hit"),function(h){if(!h.getClientRects().length)return;var n=h.getTotalLength(),k;for(var i=0;i<=40;i++){k=h.getPointAtLength(n*i/40);var d=(k.x-q.x)*(k.x-q.x)+(k.y-q.y)*(k.y-q.y);if(d<bd){bd=d;best=h;}}});
  return bd<400?best:el;}catch(e){return el;}
}
ACT.sel=function(el,ev){if(el.classList&&el.classList.contains("hit"))el=nearestHit(el,ev);var id=el.getAttribute("data-id");if(!EI[id])return;S.sel=id;if(EI[id].k in S.lay)S.lay[EI[id].k]=1;save();render();say(L(EI[id].n)+". "+L(EI[id].d));};
ACT.std=function(el){var id=el.getAttribute("data-k");if(!EI[id])return;if(S.st[id])delete S.st[id];else S.st[id]=1;save();render();say(S.st[id]?t("stdDone"):t("stdMark"));};
ACT.hand=function(el){S.hand=el.getAttribute("data-v")==="r"?"r":"l";save();render();};
CHG.lay=function(el){var k=el.getAttribute("data-k");if(k in S.lay){S.lay[k]=el.checked?1:0;save();render();}};
MODS.push({id:"hand",tab:"tHand",view:vHand,after:function(){
 var m=app.querySelector("svg.hand");if(!m)return;
 var vis=[].filter.call(m.querySelectorAll("[data-id][tabindex]"),function(n){return n.getAttribute("aria-hidden")!=="true"&&n.getClientRects().length;});
 var cur=vis.filter(function(n){return n.getAttribute("data-id")===S.sel;})[0]||vis[0];
 if(cur)cur.setAttribute("tabindex","0");
}});
