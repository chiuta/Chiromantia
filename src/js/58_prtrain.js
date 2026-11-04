/* ===== module: fingerprint pattern trainer (procedural) ===== */
var PT={on:false,i:0,ok:0,type:"",seed:null,ans:"",n:10};
function ptGen(type){
 var P=[],r=function(a,b){return a+Math.random()*(b-a);},rot=r(-14,14),cx=100+r(-6,6),s=Math.random()<0.5?-1:1;
 if(type==="whorl"){var cy=118+r(-8,8),k=r(0.9,1.1);for(var i=1;i<=15;i++){P.push('<ellipse cx="'+cx+'" cy="'+cy+'" rx="'+(i*6.2*k).toFixed(1)+'" ry="'+(i*7.4/k).toFixed(1)+'"/>');}}
 else if(type==="loop"){var w0=r(5,6.2),yc=r(120,140);for(var j=1;j<=14;j++){var w=j*w0;P.push('<path d="M'+(cx-w)+' 300 L'+(cx-w)+' '+yc.toFixed(1)+' A'+w.toFixed(1)+' '+w.toFixed(1)+' 0 0 1 '+(cx+w)+' '+yc.toFixed(1)+' L'+(cx+w)+' 300"/>');}}
 else{var tented=Math.random()<0.4,A=r(26,42);for(var q=0;q<=17;q++){var yb=40+q*13,d="M-20 "+yb;for(var x=-20;x<=220;x+=6){var u=(x-cx)/50,off=tented?A*Math.max(0,1-Math.abs(u)*1.0):A*Math.exp(-u*u);d+=" L"+x+" "+(yb-off*(1-q/26)).toFixed(1);}P.push('<path d="'+d+'"/>');}}
 var tr=type==="loop"?'rotate('+(s*r(8,22)).toFixed(1)+' '+cx+' 150)':'rotate('+rot.toFixed(1)+' 100 120)';
 return '<svg class="pr" viewBox="0 0 200 240" role="img" aria-label="'+esc(t("prQ"))+'"><defs><clipPath id="pc"><ellipse cx="100" cy="120" rx="82" ry="104"/></clipPath></defs><g clip-path="url(#pc)"><g transform="'+tr+'" fill="none" stroke="var(--fg)" stroke-width="2.6" stroke-linecap="round">'+P.join("")+'</g></g><ellipse cx="100" cy="120" rx="82" ry="104" fill="none" stroke="var(--outline)" stroke-width="3"/></svg>';
}
function ptNew(){var ts=["loop","whorl","arch"];PT.type=ts[Math.floor(Math.random()*3)];PT.svg=ptGen(PT.type);PT.ans="";}
function vPrt(){
 var h='<div class="card"><p style="margin-top:0">'+t("prIntro")+'</p>';
 if(!PT.on)return h+'<div class="row"><button class="btn pri" data-act="ptstart">'+t("gStart")+'</button></div></div>';
 if(PT.i>=PT.n)return h+'<p id="ptres" tabindex="-1"><strong>'+fill(t("gScore"),{n:PT.ok,m:PT.n})+'</strong></p><div class="row"><button class="btn pri" data-act="ptstart">'+t("gAgain")+'</button></div></div>';
 h+='<p class="sub">'+(PT.i+1)+' / '+PT.n+'</p><div class="prbox">'+PT.svg+'</div><p id="ptq" tabindex="-1"><strong>'+t("prQ")+'</strong></p>';
 if(!PT.ans)h+='<div class="row">'+[["loop","cntLoop"],["whorl","cntWhorl"],["arch","cntArch"]].map(function(x){return '<button class="btn" data-act="ptans" data-v="'+x[0]+'">'+t(x[1])+'</button>';}).join("")+'</div>';
 else{var ok=PT.ans===PT.type;h+='<p role="status" aria-live="polite"><strong>'+(ok?t("gOK"):fill(t("gNo"),{n:t({loop:"cntLoop",whorl:"cntWhorl",arch:"cntArch"}[PT.type])}))+'</strong> '+t("prExp")+'</p><div class="row"><button class="btn pri" data-act="ptnext">'+t("gNext")+'</button></div>';}
 return h+'</div>';
}
ACT.ptstart=function(){PT={on:true,i:0,ok:0,n:10};ptNew();render();var q=document.getElementById("ptq");if(q)q.focus({preventScroll:true});};
ACT.ptans=function(el){var v=el.getAttribute("data-v");if(PT.ans||!/^(loop|whorl|arch)$/.test(v))return;PT.ans=v;if(v===PT.type)PT.ok++;render();var q=document.querySelector("#app [role=status]");if(q){q.tabIndex=-1;q.focus({preventScroll:true});}};
ACT.ptnext=function(){PT.i++;if(PT.i<PT.n)ptNew();render();var q=document.getElementById("ptq")||document.getElementById("ptres");if(q)q.focus({preventScroll:true});};
MODS.push({id:"prt",tab:"tPrint",view:vPrt});
