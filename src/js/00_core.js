var LG=["ro","en","fr","it","es","pt","de","hu"];
var LN=["Română","English","Français","Italiano","Español","Português","Deutsch","Magyar"];
/* ---------- data (injected at build) ---------- */
var D=/*@DATA@*/null;
var U=D.U,E=D.E,TY=D.TY,SG=D.SG,RO=D.RO,ASP=D.ASP;
var EI=Object.create(null);E.forEach(function(e){EI[e.id]=e;});
var RD2=D.rd2||{mounts:{},extra:{}},OPT={},AXL=[],AXM=[];
for(var _k in RO)OPT[_k]=RO[_k];
for(var _k in RD2.extra){OPT[_k]=RD2.extra[_k];AXL.push(_k);}
for(var _k in RD2.mounts){var _id=(_k==="mer"&&EI.mmer)?"mmer":_k;OPT[_id]=RD2.mounts[_k];AXM.push(_id);}
function newR(){var r={palm:"",fin:""};for(var k in OPT)r[k]="";return r;}
function cleanR(o){var r=newR();if(!o||typeof o!=="object")return r;
 for(var k in r){var v=o[k];if(typeof v!=="string")continue;
  if(k==="palm"){if(/^(sq|lg|)$/.test(v))r[k]=v;}
  else if(k==="fin"){if(/^(sh|lg|)$/.test(v))r[k]=v;}
  else if(v===""||(/^\d+$/.test(v)&&OPT[k]&&+v<OPT[k].length))r[k]=v;}
 return r;}
function emptyR(r){for(var k in r)if(r[k]!=="")return false;return true;}
/* ---------- registries ---------- */
var MODS=[],ACT={},CHG={},INP={};
var app=document.getElementById("app"),NM=false;
/* ---------- state ---------- */
var KEY="chiromantia.v1";
var S={li:0,theme:"",tab:"beg",hand:"l",lay:{lines:1,minor:0,mounts:1,fingers:1},sel:"life",RH:{l:newR(),r:newR()},rh:"l",R:null,prof:[],fs:0,hc:0,st:{},lt:{},ml:[],pr:[],unc:2,done:false,calc:{pl:"",pw:"",ml:""},meas:{idx:"",ring:"",sex:"m",hand:"r",hl:"",st:""},dc:{loop:0,whorl:0,arch:0},bn:{r:"",show:false}};
function loadState(){
 try{var raw=localStorage.getItem(KEY);
  if(raw){var o=JSON.parse(raw);if(!o||typeof o!=="object")return;
   if(typeof o.li==="number"&&o.li>=0&&o.li<8&&o.li%1===0)S.li=o.li;
   if(o.theme==="dark"||o.theme==="light")S.theme=o.theme;
   if(o.hand==="l"||o.hand==="r")S.hand=o.hand;
   if(typeof o.tab==="string")S.tab=o.tab;
   if(typeof o.sel==="string"&&EI[o.sel])S.sel=o.sel;
   var NUM=/^\d{0,4}(\.\d{0,2})?$/;
   if(o.calc&&typeof o.calc==="object"){["pl","pw","ml"].forEach(function(k){if(typeof o.calc[k]==="string"&&NUM.test(o.calc[k]))S.calc[k]=o.calc[k];});}
   if(o.meas&&typeof o.meas==="object"){["idx","ring","hl","st"].forEach(function(k){if(typeof o.meas[k]==="string"&&NUM.test(o.meas[k]))S.meas[k]=o.meas[k];});
    if(o.meas.sex==="m"||o.meas.sex==="f")S.meas.sex=o.meas.sex;if(o.meas.hand==="r"||o.meas.hand==="l")S.meas.hand=o.meas.hand;}
   if(o.dc&&typeof o.dc==="object"){["loop","whorl","arch"].forEach(function(k){var v=o.dc[k];if(typeof v==="number"&&v>=0&&v<=99&&v%1===0)S.dc[k]=v;});}
   if(o.lay&&typeof o.lay==="object"){["lines","minor","mounts","fingers"].forEach(function(k){if(o.lay[k]===0||o.lay[k]===1)S.lay[k]=o.lay[k];});}
   if(o.RH&&typeof o.RH==="object"){S.RH.l=cleanR(o.RH.l);S.RH.r=cleanR(o.RH.r);}else if(o.R)S.RH.l=cleanR(o.R);
   if(o.rh==="l"||o.rh==="r")S.rh=o.rh;
   if(Array.isArray(o.prof)){S.prof=o.prof.slice(0,12).filter(function(q){return q&&typeof q.n==="string"&&q.RH;}).map(function(q){return cleanProf(q);});}
   if(typeof o.unc==="number"&&o.unc>=0&&o.unc<=5&&o.unc%1===0)S.unc=o.unc;
   if(Array.isArray(o.pr)){S.pr=o.pr.slice(0,20).filter(function(x){return x&&typeof x.t==="string"&&/^\d{4}-\d{2}-\d{2}$/.test(x.d)&&(x.s==="p"||x.s==="y"||x.s==="n"||x.s==="u");}).map(function(x){return {t:x.t.replace(/[\u0000-\u001f<>]/g," ").slice(0,200),d:x.d,s:x.s};});}
   if(o.fs===0||o.fs===1||o.fs===2)S.fs=o.fs;if(o.hc===0||o.hc===1)S.hc=o.hc;
   if(o.st&&typeof o.st==="object"){for(var sk in o.st){if(EI[sk]&&o.st[sk]===1)S.st[sk]=1;}}
   if(o.lt&&typeof o.lt==="object"){var ln=0;for(var lk in o.lt){if(ln++>400)break;var lv=o.lt[lk];if(/^[egs]:[A-Za-z0-9_]{1,30}$/.test(lk)&&typeof lv==="number"&&lv>=0&&lv<=4&&lv%1===0)S.lt[lk]=lv;}}
   if(Array.isArray(o.ml)){S.ml=o.ml.slice(0,30).filter(function(m){return m&&/^\d{4}-\d{2}-\d{2}$/.test(m.d)&&typeof m.r==="number"&&m.r>0.5&&m.r<1.5&&(m.h==="l"||m.h==="r");}).map(function(m){return {d:m.d,r:Math.round(m.r*1000)/1000,h:m.h};});}
  }else{var nl=(navigator.language||"ro").slice(0,2).toLowerCase();var ix=LG.indexOf(nl);if(ix>=0)S.li=ix;}
 }catch(e){}
}
function cleanProf(q){return {n:String(q.n||"").replace(/[\u0000-\u001f<>]/g,"").slice(0,40),note:typeof q.note==="string"?q.note.replace(/[\u0000-\u001f<>]/g," ").slice(0,300):"",RH:{l:cleanR(q.RH&&q.RH.l),r:cleanR(q.RH&&q.RH.r)}};}
function setRH(){S.R=S.RH[S.rh];}
function save(){try{localStorage.setItem(KEY,JSON.stringify({li:S.li,theme:S.theme,tab:S.tab,hand:S.hand,lay:S.lay,sel:S.sel,RH:S.RH,rh:S.rh,prof:S.prof,fs:S.fs,hc:S.hc,st:S.st,lt:S.lt,ml:S.ml,pr:S.pr,unc:S.unc,calc:S.calc,meas:S.meas,dc:S.dc}));}catch(e){}}
function t(k){var r=U[k];return r?(r[S.li]||r[1]||k):k;}
function L(a){return a?(a[S.li]||a[1]||""):"";}
var RM=!!(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches);
function curTheme(){return S.theme||(window.matchMedia&&matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");}
function applyTheme(){document.documentElement.setAttribute("data-theme",curTheme());document.documentElement.lang=LG[S.li];document.documentElement.style.fontSize=[100,115,130][S.fs]+"%";if(S.hc)document.documentElement.setAttribute("data-contrast","high");else document.documentElement.removeAttribute("data-contrast");}
/* live region (lives outside #app so it survives re-render) */
function say(m){var l=document.getElementById("live");if(!l)return;l.textContent="";setTimeout(function(){l.textContent=m;},30);}
/* focus preservation across full re-render */
function focusKey(el){
 if(!el||el===document.body||!app.contains(el))return null;
 var f={a:el.getAttribute("data-act"),id:el.getAttribute("data-id"),k:el.getAttribute("data-k"),v:el.getAttribute("data-v"),tag:el.tagName,n:0};
 var q=fkQuery(f);if(q){f.n=[].indexOf.call(app.querySelectorAll(q),el);if(f.n<0)f.n=0;}
 return f;
}
function fkQuery(f){
 if(!f.a&&!f.id)return "";
 return (f.tag||"")+(f.a?'[data-act="'+f.a+'"]':"")+(f.id?'[data-id="'+f.id+'"]':"")+(f.k?'[data-k="'+f.k+'"]':"")+(f.v?'[data-v="'+f.v+'"]':"");
}
function restoreFocus(f){
 if(!f)return;var q=fkQuery(f);if(!q)return;
 var n=app.querySelectorAll(q);if(n.length){var el=n[f.n]||n[0];try{el.focus({preventScroll:true});}catch(e){}}
}
function nv(v){v=String(v==null?"":v).replace(",",".");return /^\d{0,4}(\.\d{0,2})?$/.test(v)?v:"";}
function fmt(x,d){return (Math.round(x*Math.pow(10,d))/Math.pow(10,d)).toFixed(d);}
function curMod(){for(var i=0;i<MODS.length;i++){if(MODS[i].id===S.tab)return MODS[i];}return MODS[0];}
function icon(name){
 if(name==="theme")return '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 0 18z" style="fill:currentColor"/></svg>';
 return "";
}
function render(){
 applyTheme();
 var f=focusKey(document.activeElement),y=window.scrollY,mod=curMod();
 var h='<header><div><h1>CHIROMANTIA</h1><p class="sub">'+t("sub")+'</p></div><div class="ctl"><select data-act="lang" aria-label="'+t("langLbl")+'">'+LN.map(function(n,i){return '<option lang="'+LG[i]+'" value="'+i+'"'+(i===S.li?" selected":"")+'>'+n+'</option>';}).join("")+'</select><button class="btn" data-act="fs" aria-label="'+t("fsLbl")+' ('+[100,115,130][S.fs]+'%)">Aa</button><button class="btn" data-act="hc" aria-pressed="'+(S.hc===1)+'" aria-label="'+t("hcLbl")+'">HC</button><button class="btn" data-act="theme" aria-label="'+t("themeLbl")+'" aria-pressed="'+(curTheme()==="dark")+'">'+icon("theme")+'</button></div></header>';
 h+='<ul class="badges" aria-label="'+t("bdLbl")+'"><li>'+t("bdOff")+'</li><li>'+t("bdLang")+'</li><li>'+t("bdMit")+'</li><li>'+t("bdFree")+'</li></ul>';
 h+='<button class="btn menubtn" data-act="menu" aria-expanded="'+(NM?"true":"false")+'" aria-controls="nav">☰ '+t(mod.tab)+'</button>';
 h+='<nav id="nav" class="'+(NM?"open":"")+'" aria-label="'+t("tNav")+'">'+MODS.map(function(m){return '<button data-act="tab" data-v="'+m.id+'"'+(S.tab===m.id?' class="on" aria-current="page"':'')+'>'+t(m.tab)+'</button>';}).join("")+'</nav>';
 var due=dueCount();if(due)h+='<div class="due" role="status"><span>'+fill(t("pdDue"),{n:due})+'</span> <button class="btn" data-act="goto" data-v="pred" data-k="">'+t("tPred")+'</button></div>';
 h+='<main id="main" tabindex="-1"><h2 class="sr">'+t(mod.tab)+'</h2>'+mod.view()+'</main>';
 h+='<footer>MIT · © Alexandru-Ionuț Chiuță (Alexio) · '+t("ver")+': @@VERSION@@ · '+t("upd")+': @@DATE@@</footer>';
 app.innerHTML=h;
 var sk=document.getElementById("skip");if(sk)sk.textContent=t("skip");
 if(mod.after)mod.after();
 restoreFocus(f);window.scrollTo(0,y);
}
/* ---------- events ---------- */
function hit(el){while(el&&el!==app){if(el.getAttribute&&el.getAttribute("data-act"))return el;el=el.parentNode;}return null;}
app.addEventListener("click",function(ev){
 var el=hit(ev.target);if(!el)return;var a=el.getAttribute("data-act");
 if(ACT[a])ACT[a](el,ev);
});
app.addEventListener("change",function(ev){
 var el=ev.target,a=el.getAttribute&&el.getAttribute("data-act");if(!a)return;
 if(CHG[a])CHG[a](el,ev);
});
app.addEventListener("input",function(ev){
 var el=ev.target,a=el.getAttribute&&el.getAttribute("data-act");if(!a)return;
 if(INP[a])INP[a](el,ev);
});
app.addEventListener("keydown",function(ev){
 var el=ev.target;if(!el.getAttribute)return;
 var map=el.closest&&el.closest("svg.hand");
 if(map&&el.hasAttribute("data-id")){
  var k=ev.key;
  if(k==="Enter"||k===" "){ev.preventDefault();ACT.sel(el,ev);return;}
  if(k==="ArrowRight"||k==="ArrowDown"||k==="ArrowLeft"||k==="ArrowUp"||k==="Home"||k==="End"){
   var all=[].filter.call(map.querySelectorAll("[data-id][tabindex]"),function(n){return n.getAttribute("aria-hidden")!=="true"&&n.getClientRects().length;});
   var i=all.indexOf(el);if(i<0)return;
   var d=(k==="ArrowRight"||k==="ArrowDown")?1:(k==="Home"?-i:(k==="End"?all.length-1-i:-1));
   ev.preventDefault();var nx=all[(i+d+all.length)%all.length];
   all.forEach(function(n){n.setAttribute("tabindex","-1");});nx.setAttribute("tabindex","0");nx.focus();
  }
 }
});
ACT.menu=function(){NM=!NM;render();};
ACT.tab=function(el){NM=false;try{if(typeof lsStop==="function")lsStop();}catch(e){}S.tab=el.getAttribute("data-v");save();say(t(curMod().tab));try{history.replaceState(null,"","#"+S.tab);}catch(e){}render();var m=document.getElementById("main");if(m)m.scrollIntoView&&0;};
ACT.fs=function(){S.fs=(S.fs+1)%3;save();render();};
ACT.hc=function(){S.hc=S.hc?0:1;save();render();};
var SPL={ro:"ro-RO",en:"en-US",fr:"fr-FR",it:"it-IT",es:"es-ES",pt:"pt-PT",de:"de-DE",hu:"hu-HU"};
function speak(txt){
 if(!window.speechSynthesis||typeof SpeechSynthesisUtterance==="undefined"){say(t("spkNo"));return;}
 try{speechSynthesis.cancel();var u=new SpeechSynthesisUtterance(String(txt).slice(0,4000));u.lang=SPL[LG[S.li]];speechSynthesis.speak(u);}catch(e){say(t("spkNo"));}
}
ACT.speak=function(el){var id=el.getAttribute("data-k");var tx="";if(id==="reading"){var r=document.getElementById("reading");tx=r?r.innerText:"";}else if(EI[id])tx=L(EI[id].n)+". "+L(EI[id].d);if(tx)speak(tx);};
ACT.spkstop=function(){try{speechSynthesis.cancel();}catch(e){}};
function todayISO(){var d=new Date();return d.getFullYear()+"-"+("0"+(d.getMonth()+1)).slice(-2)+"-"+("0"+d.getDate()).slice(-2);}
function dueCount(){var t0=todayISO();return S.pr.filter(function(x){return x.s==="p"&&x.d<=t0;}).length;}
function esc(x){return String(x).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");}
function fill(s,o){return String(s).replace(/\{(\w+)\}/g,function(m,k){return o[k]!==undefined?o[k]:m;});}
ACT.theme=function(){S.theme=curTheme()==="dark"?"light":"dark";save();render();};
CHG.lang=function(el){var v=+el.value;if(v>=0&&v<8){S.li=v;save();render();}};
