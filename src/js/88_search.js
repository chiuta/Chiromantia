/* ===== module: search & glossary ===== */
var GL=D.gloss||[],QS="",IDXC=null;
function norm(x){x=String(x||"").toLowerCase();try{x=x.normalize("NFD").replace(/[̀-ͯ]/g,"");}catch(e){}return x;}
function buildIdx(){
 var r=[];
 function add(tab,id,tl,n,d,kind){if(!n)return;r.push({tab:tab,id:id,tl:tl,n:L(n),d:L(d),k:kind||"",key:norm(L(n)+" "+(d?L(d):""))});}
 E.forEach(function(e){add("hand",e.id,"tHand",e.n,e.d,t(e.k));});
 SG.forEach(function(g){add("signs",g.id,"tSigns",g.n,g.d);});
 TY.concat(D.types7||[]).forEach(function(y){add("types",y.id,"tTypes",y.n,y.d);});
 (D.fdet||[]).forEach(function(x){add("fing",x.id,"tFing",x.n,x.d);});
 (D.derm||[]).forEach(function(x){add("derm",x.id,"tDerm",x.n,x.d);});
 ((D.meas&&D.meas.tests)||[]).forEach(function(x){add("meas",x.id,"tMeas",x.n,x.d);});
 ((D.sci&&D.sci.claims)||[]).forEach(function(x){add("sci",x.id,"tSci",x.n,x.d);});
 ((D.sci&&D.sci.cold)||[]).forEach(function(x){add("sci",x.id,"tSci",x.n,x.d);});
 GL.forEach(function(x){add("search",x.id,"tGloss",x.t,x.d);});
 return r;
}
function hits(q){
 if(!IDXC||IDXC.li!==S.li)IDXC={li:S.li,a:buildIdx()};
 var w=norm(q).split(/\s+/).filter(Boolean);if(!w.length)return [];
 return IDXC.a.filter(function(x){return w.every(function(z){return x.key.indexOf(z)>=0;});}).slice(0,60);
}
function mark(s,q){var w=norm(q).split(/\s+/).filter(function(z){return z.length>1;}),o=esc(s);if(!w.length)return o;
 var ns=norm(s);if(ns.length!==s.length)return o;
 var res="",i=0;while(i<s.length){var m=0;for(var k=0;k<w.length;k++){if(ns.substr(i,w[k].length)===w[k]&&w[k].length>m)m=w[k].length;}
  if(m){res+="<mark>"+esc(s.substr(i,m))+"</mark>";i+=m;}else{res+=esc(s[i]);i++;}}
 return res;}
function resList(){
 var q=QS.trim();
 if(q.length<2){
  if(!GL.length)return "";
  return '<h3 class="h3">'+t("tGloss")+'</h3><dl class="gl">'+GL.slice().sort(function(a,b){return L(a.t).localeCompare(L(b.t),LG[S.li]);}).map(function(x){return '<dt id="g_'+x.id+'">'+esc(L(x.t))+'</dt><dd>'+esc(L(x.d))+(x.see&&x.see.length?' <span class="sub">'+t("glSee")+': '+x.see.map(function(id){var g=GL.filter(function(y){return y.id===id;})[0];return g?'<a href="#g_'+id+'">'+esc(L(g.t))+'</a>':"";}).filter(Boolean).join(", ")+'</span>':'')+'</dd>';}).join("")+'</dl>';}
 var H=hits(q);
 if(!H.length)return '<p>'+t("srchNone")+'</p>';
 return '<p class="sub" role="status">'+t("srchHits").replace("{n}",H.length)+'</p><ul class="hits">'+H.map(function(x){return '<li class="card"><span class="chip">'+t(x.tl)+(x.k?" · "+esc(x.k):"")+'</span><h4>'+mark(x.n,q)+'</h4><p>'+mark(x.d,q)+'</p><button class="btn" data-act="goto" data-v="'+x.tab+'" data-k="'+x.id+'">'+t("srchGo")+'</button></li>';}).join("")+'</ul>';
}
function vSearch(){
 return '<div class="card srch"><label>'+t("srch")+'<input type="search" class="num" id="qs" data-act="qs" maxlength="60" placeholder="'+t("srchPh")+'" autocomplete="off" value="'+esc(QS)+'"></label></div><div id="sres">'+resList()+'</div>';
}
INP.qs=function(el){QS=el.value.slice(0,60);var r=document.getElementById("sres");if(r)r.innerHTML=resList();};
ACT.goto=function(el){var tab=el.getAttribute("data-v"),id=el.getAttribute("data-k");
 if(!MODS.some(function(m){return m.id===tab;}))return;
 S.tab=tab;if(tab==="hand"&&EI[id]){S.sel=id;if(EI[id].k in S.lay)S.lay[EI[id].k]=1;}
 NM=false;save();render();var m=document.getElementById("main");if(m)m.focus({preventScroll:true});window.scrollTo(0,0);};
MODS.push({id:"search",tab:"tSearch",view:vSearch});
