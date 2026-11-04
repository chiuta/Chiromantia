/* ===== module: guided reading v2 (two hands, extended aspects, profiles, export) ===== */
function selBox(name,opts,val){
 var s='<select data-act="rd" data-k="'+name+'"><option value="">'+t("choose")+'</option>';
 opts.forEach(function(o,i){s+='<option value="'+i+'"'+(String(val)===String(i)?" selected":"")+'>'+o+'</option>';});
 return s+'</select>';
}
var PN="",PNT="",CA=0,CB=1,DO={};INP.pnt=function(el){PNT=el.value.slice(0,300);};CHG.cmp=function(el){var v=+el.value;if(el.getAttribute("data-k")==="a")CA=v;else CB=v;render();};app.addEventListener("toggle",function(ev){var d=ev.target;if(d&&d.getAttribute&&d.getAttribute("data-d"))DO[d.getAttribute("data-d")]=d.open;},true);
function anySet(R,ks){return ks.some(function(k){return R[k]!=="";});}
var PN="";INP.pnin=function(el){PN=el.value.slice(0,40);};
var MLV=["mtLow","mtMid","mtHigh"];
function aspOpts(a){return OPT[a].map(function(o,i){return (EI[a]&&EI[a].k==="mounts"&&MLV[i]?t(MLV[i])+" — ":"")+L(o);});}
function readingLines(R){
 var lines=[],ty=null;
 if(R.palm&&R.fin){for(var i=0;i<TY.length;i++)if(TY[i].pal===R.palm&&TY[i].fin===R.fin)ty=TY[i];}
 if(ty)lines.push(L(ty.n)+" — "+L(ty.d));
 ASP.concat(AXL,AXM).forEach(function(a){var v=R[a];if(v!==""&&OPT[a]&&OPT[a][+v])lines.push(L(EI[a].n)+": "+L(OPT[a][+v]));});
 return lines;
}
function readingText(){return readingLines(S.R);}
function selGroup(R,keys){var h="";keys.forEach(function(a){h+='<label>'+L(EI[a].n)+selBox(a,aspOpts(a),R[a])+'</label>';});return h;}
/* share link + QR */
function codeKeys(){return ["palm","fin"].concat(ASP,AXL,AXM);}
function encR(R){return codeKeys().map(function(k){var v=R[k];if(v==="")return "-";if(k==="palm")return v==="sq"?"s":"l";if(k==="fin")return v==="sh"?"s":"l";return String(Math.min(9,+v));}).join("");}
function decR(s){var ks=codeKeys(),r=newR();if(typeof s!=="string"||s.length!==ks.length)return null;
 for(var i=0;i<ks.length;i++){var ch=s.charAt(i),k=ks[i];if(ch==="-")continue;
  if(k==="palm"){if(ch==="s")r.palm="sq";else if(ch==="l")r.palm="lg";else return null;}
  else if(k==="fin"){if(ch==="s")r.fin="sh";else if(ch==="l")r.fin="lg";else return null;}
  else if(/^[0-9]$/.test(ch)&&OPT[k]&&+ch<OPT[k].length)r[k]=ch;else return null;}
 return r;}
function shareUrl(){return location.href.split("#")[0]+"#p="+encR(S.RH.l)+"."+encR(S.RH.r);}
function loadShared(code){var m=/^p=([-sl0-9]{1,60})\.([-sl0-9]{1,60})$/.exec(code||"");if(!m)return false;var a=decR(m[1]),b=decR(m[2]);if(!a||!b)return false;var ks=codeKeys();if(anySet(S.RH.l,ks)||anySet(S.RH.r,ks)){if(S.prof.length>=12)S.prof.shift();S.prof.push(cleanProf({n:"⟲ "+todayISO(),note:"",RH:S.RH}));}S.RH={l:a,r:b};try{history.replaceState(null,"",location.pathname+location.search+"#reader");}catch(e){}setRH();S.done=true;S.tab="reader";return true;}
var QRON=false;
function qrSvg(txt){try{var q=qrcode(0,"L");q.addData(txt);q.make();var n=q.getModuleCount(),m=4,d="";for(var y=0;y<n;y++)for(var x=0;x<n;x++)if(q.isDark(y,x))d+="M"+(x+m)+" "+(y+m)+"h1v1h-1z";return '<svg class="qr" viewBox="0 0 '+(n+2*m)+' '+(n+2*m)+'" role="img" aria-label="QR"><rect width="100%" height="100%" fill="#fff"/><path d="'+d+'" fill="#000"/></svg>';}catch(e){return "";}}
ACT.sharecopy=function(el){var u=shareUrl(),ok=function(){say(t("shCopied"));el.textContent=t("shCopied");setTimeout(function(){el.textContent=t("shLink");},1500);};
 var fb=function(){var ta=document.createElement("textarea");ta.value=u;ta.style.position="fixed";ta.style.opacity="0";document.body.appendChild(ta);ta.select();try{document.execCommand("copy");ok();}catch(e){}document.body.removeChild(ta);};
 if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(u).then(ok,fb);}else fb();};
ACT.shareqr=function(){QRON=!QRON;render();};
function vReader(){
 var R=S.R,oh=S.rh==="l"?"r":"l";
 var h='<div class="card noprint"><p style="margin-top:0">'+t("readIntro")+'</p>';
 h+='<div class="seg" role="group" aria-label="'+t("handLbl")+'"><button class="btn'+(S.rh==="l"?" on":"")+'" data-act="rdhand" data-v="l" aria-pressed="'+(S.rh==="l")+'">'+t("leftHand")+'</button><button class="btn'+(S.rh==="r"?" on":"")+'" data-act="rdhand" data-v="r" aria-pressed="'+(S.rh==="r")+'">'+t("rightHandX")+'</button></div>';
 h+='<div class="form">';
 h+='<label>'+t("palmShape")+selBox("palm",[t("sq"),t("lg")],R.palm==="sq"?0:R.palm==="lg"?1:"")+'</label>';
 h+='<label>'+t("fingLen")+selBox("fin",[t("sh"),t("lgF")],R.fin==="sh"?0:R.fin==="lg"?1:"")+'</label>';
 h+=selGroup(R,ASP)+'</div>';
 if(AXL.length)h+='<details data-d="x"'+((DO.x!==undefined?DO.x:anySet(R,AXL))?" open":"")+'><summary>'+t("tRd2Extra")+'</summary><div class="form">'+selGroup(R,AXL)+'</div></details>';
 if(AXM.length)h+='<details data-d="m"'+((DO.m!==undefined?DO.m:anySet(R,AXM))?" open":"")+'><summary>'+t("tRd2Mounts")+'</summary><div class="form">'+selGroup(R,AXM)+'</div></details>';
 h+='<div class="row"><button class="btn pri" data-act="gen">'+t("gen")+'</button><button class="btn" data-act="reset">'+t("reset")+'</button></div></div>';
 if(S.done){var Ls=readingLines(R),Lo=readingLines(S.RH[oh]);
  h+='<div class="card" style="margin-top:14px"><div class="reading" id="reading" tabindex="-1"><h3>'+t("readTitle")+' — '+t(S.rh==="l"?"leftHand":"rightHandX")+'</h3>'+(Ls.length?'<ul>'+Ls.map(function(x){return "<li>"+x+"</li>";}).join("")+'</ul>':'<p>'+t("readEmpty")+'</p>');
  if(Lo.length)h+='<h3>'+t("handCmp")+' — '+t(oh==="l"?"leftHand":"rightHandX")+'</h3><ul>'+Lo.map(function(x){return "<li>"+x+"</li>";}).join("")+'</ul>';
  h+='<em>'+t("readNote")+'</em></div>';
  if(Ls.length||Lo.length)h+='<div class="row noprint"><button class="btn" data-act="copy">'+t("copy")+'</button><button class="btn" data-act="print">'+t("print")+'</button><button class="btn" data-act="shimg">'+t("shImg")+'</button><button class="btn" data-act="speak" data-k="reading">'+t("spkRead")+'</button><button class="btn" data-act="spkstop">'+t("spkStop")+'</button></div>';
  h+='</div><p class="pnote">'+t("disc")+'</p>';}
 /* profiles */
 h+='<div class="card noprint" style="margin-top:14px"><h3 style="margin-top:0">'+t("tProfiles")+'</h3><div class="form"><label>'+t("profName")+'<input class="num" style="font-size:16px" type="text" maxlength="40" id="pname" data-act="pnin" autocomplete="off" value="'+PN.replace(/&/g,"&amp;").replace(/"/g,"&quot;")+'"></label><label>'+t("pfNote")+'<textarea class="num" id="pnote" data-act="pnt" maxlength="300" rows="2" style="font-size:1rem">'+PNT.replace(/&/g,"&amp;").replace(/</g,"&lt;")+'</textarea></label></div><div class="row"><button class="btn" data-act="profsave">'+t("profSave")+'</button><button class="btn" data-act="expjson">'+t("expJson")+'</button><label class="btn filebtn">'+t("impJson")+'<input type="file" accept="application/json,.json" data-act="impjson" class="sr"></label></div>';
 h+=S.prof.length?'<ul class="plist">'+S.prof.map(function(q,i){return '<li><span class="pn"></span><span class="pnn sub"></span><button class="btn" data-act="profload" data-v="'+i+'">'+t("profLoad")+'</button><button class="btn" data-act="profdel" data-v="'+i+'">'+t("profDel")+'</button></li>';}).join("")+'</ul>':'<p class="sub">'+t("profEmpty")+'</p>';
 h+='</div>';
 if(location.protocol==='file:')h+='<div class="card noprint" style="margin-top:14px"><p class="sub" style="margin:0">'+t("shLocal")+'</p></div>';else h+='<div class="card noprint" style="margin-top:14px"><div class="row"><button class="btn" data-act="sharecopy">'+t("shLink")+'</button><button class="btn" data-act="shareqr" aria-expanded="'+QRON+'">'+t(QRON?"shQRHide":"shQR")+'</button></div>'+(QRON?'<div class="qrbox">'+qrSvg(shareUrl())+'</div>':'')+'<p class="sub">'+t("shareNote")+'</p></div>';
 h+=cmpBlock();
 return h;
}
function cmpBlock(){
 if(S.prof.length<2)return '<div class="card noprint" style="margin-top:14px"><h3 style="margin-top:0">'+t("pfCompare")+'</h3><p class="sub">'+t("pfNeed")+'</p></div>';
 var a=S.prof[Math.min(CA,S.prof.length-1)],b=S.prof[Math.min(CB,S.prof.length-1)],hd=S.rh;
 function opts(k,v){return S.prof.map(function(q,i){return '<option value="'+i+'"'+(i===v?" selected":"")+'>'+esc(q.n)+'</option>';}).join("");}
 var h='<div class="card noprint" style="margin-top:14px"><h3 style="margin-top:0">'+t("pfCompare")+' — '+t(hd==="l"?"leftHand":"rightHandX")+'</h3><div class="form"><label>'+t("pfA")+'<select data-act="cmp" data-k="a">'+opts("a",Math.min(CA,S.prof.length-1))+'</select></label><label>'+t("pfB")+'<select data-act="cmp" data-k="b">'+opts("b",Math.min(CB,S.prof.length-1))+'</select></label></div><table class="cmp"><tbody>';
 ["palm","fin"].concat(ASP,AXL,AXM).forEach(function(k){
  function val(q){var v=q.RH[hd][k];if(v==="")return "—";if(k==="palm")return v==="sq"?t("sq"):t("lg");if(k==="fin")return v==="sh"?t("sh"):t("lgF");return OPT[k]&&OPT[k][+v]?L(OPT[k][+v]):"—";}
  var va=val(a),vb=val(b),same=va===vb;
  var nm=k==="palm"?t("palmShape"):k==="fin"?t("fingLen"):L(EI[k].n);
  h+='<tr'+(same?' class="same"':'')+'><th scope="row">'+nm+'</th><td>'+(same&&va!=="—"?'<span class="sub">'+t("pfSame")+'</span> ':'')+va.slice(0,90)+'</td><td>'+(same?'':vb.slice(0,90))+'</td></tr>';});
 return h+'</tbody></table></div>';
}
function fillNames(){var n=document.querySelectorAll(".plist .pn"),m=document.querySelectorAll(".plist .pnn");for(var i=0;i<n.length;i++){n[i].textContent=S.prof[i]?S.prof[i].n:"";if(m[i])m[i].textContent=S.prof[i]?S.prof[i].note:"";}}
ACT.gen=function(){S.done=true;render();var r=document.getElementById("reading");if(r){r.focus({preventScroll:true});r.scrollIntoView({behavior:RM?"auto":"smooth",block:"start"});}say(t("readTitle"));};
ACT.reset=function(){S.RH[S.rh]=newR();setRH();S.done=false;save();render();};
ACT.rdhand=function(el){var v=el.getAttribute("data-v");if(v!=="l"&&v!=="r")return;S.rh=v;setRH();save();render();};
ACT.print=function(){window.print();};
ACT.copy=function(el){
 var oh=S.rh==="l"?"r":"l",txt=t("readTitle")+" — "+t(S.rh==="l"?"leftHand":"rightHandX")+"\n"+readingLines(S.R).map(function(x){return "• "+x;}).join("\n");
 var lo=readingLines(S.RH[oh]);if(lo.length)txt+="\n\n"+t("handCmp")+" — "+t(oh==="l"?"leftHand":"rightHandX")+"\n"+lo.map(function(x){return "• "+x;}).join("\n");
 txt+="\n"+t("readNote");
 var ok=function(){el.textContent=t("copied");say(t("copied"));setTimeout(function(){el.textContent=t("copy");},1500);};
 var fb=function(){var ta=document.createElement("textarea");ta.value=txt;ta.style.position="fixed";ta.style.opacity="0";document.body.appendChild(ta);ta.select();try{document.execCommand("copy");ok();}catch(e){}document.body.removeChild(ta);};
 if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(txt).then(ok,fb);}else{fb();}
};
CHG.rd=function(el){var k=el.getAttribute("data-k"),v=el.value;
 if(k==="palm")S.R.palm=v===""?"":(v==="0"?"sq":"lg");
 else if(k==="fin")S.R.fin=v===""?"":(v==="0"?"sh":"lg");
 else if(k in S.R)S.R[k]=(/^\d+$/.test(v)&&OPT[k]&&+v<OPT[k].length)?v:"";
 save();render();};
/* profiles */
ACT.profsave=function(){var n=(document.getElementById("pname").value||"").replace(/[\u0000-\u001f<>]/g,"").trim().slice(0,40);
 if(!n||emptyR(S.RH.l)&&emptyR(S.RH.r)){say(t("readEmpty"));return;}
 var q=cleanProf({n:n,note:PNT,RH:{l:S.RH.l,r:S.RH.r}}),i=S.prof.findIndex?S.prof.findIndex(function(x){return x.n===n;}):-1;
 if(i>=0)S.prof[i]=q;else{if(S.prof.length>=12)S.prof.shift();S.prof.push(q);}
 PN="";PNT="";save();render();fillNames();say(t("profSave"));};
ACT.profload=function(el){var q=S.prof[+el.getAttribute("data-v")];if(!q)return;S.RH={l:cleanR(q.RH.l),r:cleanR(q.RH.r)};setRH();S.done=true;save();render();fillNames();};
ACT.profdel=function(el){var i=+el.getAttribute("data-v");if(i>=0&&i<S.prof.length){S.prof.splice(i,1);save();render();fillNames();}};
ACT.expjson=function(){var blob=new Blob([JSON.stringify({app:"chiromantia",v:1,RH:S.RH,prof:S.prof},null,1)],{type:"application/json"}),u=URL.createObjectURL(blob),a=document.createElement("a");
 a.href=u;a.download="chiromantia-profiles.json";document.body.appendChild(a);a.click();document.body.removeChild(a);setTimeout(function(){URL.revokeObjectURL(u);},2000);};
CHG.impjson=function(el){var f=el.files&&el.files[0];el.value="";if(!f||f.size>200000){say(t("impErr"));return;}
 var fr=new FileReader();fr.onload=function(){try{var o=JSON.parse(fr.result);if(!o||o.app!=="chiromantia")throw 0;
  if(o.RH){S.RH={l:cleanR(o.RH.l),r:cleanR(o.RH.r)};setRH();}
  if(Array.isArray(o.prof)){o.prof.slice(0,12).forEach(function(q){if(q&&typeof q.n==="string"&&q.RH&&S.prof.length<12)S.prof.push(cleanProf(q));});}
  save();render();fillNames();say(t("impJson"));}catch(e){say(t("impErr"));}};fr.onerror=function(){say(t("impErr"));};fr.readAsText(f);};
ACT.shimg=function(){
 var W=1080,P=60,c=document.createElement("canvas");c.width=W;var g=c.getContext("2d");
 var lines=readingLines(S.R),title=t("readTitle")+" — "+t(S.rh==="l"?"leftHand":"rightHandX");
 function wrap(txt,font,maxW){g.font=font;var w=txt.split(" "),out=[],cur="";w.forEach(function(x){var tt=cur?cur+" "+x:x;if(g.measureText(tt).width>maxW&&cur){out.push(cur);cur=x;}else cur=tt;});if(cur)out.push(cur);return out;}
 var blocks=[];lines.forEach(function(x){blocks.push(wrap("• "+x,"30px system-ui,sans-serif",W-2*P));});
 var note=wrap(t("readNote"),"italic 24px system-ui,sans-serif",W-2*P);
 var H=P+70+blocks.reduce(function(a,b){return a+b.length*42+14;},0)+note.length*34+P+40;c.height=Math.max(H,400);
 g.fillStyle="#faf6ef";g.fillRect(0,0,W,c.height);g.fillStyle="#8a4b2a";g.font="bold 44px system-ui,sans-serif";g.fillText("CHIROMANTIA",P,P+30);
 g.fillStyle="#2a2420";g.font="bold 30px system-ui,sans-serif";g.fillText(title.slice(0,60),P,P+75);
 var y=P+125;g.font="30px system-ui,sans-serif";
 blocks.forEach(function(bl){bl.forEach(function(ln){g.fillText(ln,P,y);y+=42;});y+=14;});
 g.fillStyle="#6b5f55";g.font="italic 24px system-ui,sans-serif";note.forEach(function(ln){g.fillText(ln,P,y);y+=34;});
 g.font="20px system-ui,sans-serif";g.fillText("MIT · © Alexandru-Ionuț Chiuță (Alexio)",P,c.height-P+10);
 c.toBlob(function(b){if(!b)return;var u=URL.createObjectURL(b),a=document.createElement("a");a.href=u;a.download="chiromantia-reading.png";document.body.appendChild(a);a.click();document.body.removeChild(a);setTimeout(function(){URL.revokeObjectURL(u);},2000);},"image/png");
};
MODS.push({id:"reader",tab:"tReader",view:vReader,after:fillNames});
