/* ===== module: photo annotation (local only) ===== */
var PH={img:null,w:0,h:0,strokes:[],cur:null,col:"life",on:false,tp:{on:1,x:0,y:0,s:100,r:0,o:70,f:0}};
var TPK={x:[-50,50,1],y:[-50,50,1],s:[40,160,1],r:[-45,45,1],o:[20,100,5]};
function tpFlip(){return PH.tp.f?1:0;}
var PHC=["life","head","heart","fate","sun","mer"];
function tplPanel(){
 var h='<div class="tpl"><label class="chk"><input type="checkbox" data-act="phtpon"'+(PH.tp.on?" checked":"")+'> '+t("phTpl")+'</label>';
 if(PH.tp.on){h+='<p class="sub">'+t("phTplHint")+'</p><div class="form">'+[["x","phX"],["y","phY"],["s","phScale"],["r","phRot"],["o","phOp"]].map(function(k){var r=TPK[k[0]];return '<label>'+t(k[1])+' <output>'+PH.tp[k[0]]+'</output><input type="range" min="'+r[0]+'" max="'+r[1]+'" step="'+r[2]+'" value="'+PH.tp[k[0]]+'" data-act="phtp" data-k="'+k[0]+'"></label>';}).join("")+'</div><div class="row"><label class="chk"><input type="checkbox" data-act="phflip"'+(PH.tp.f?" checked":"")+'> '+t("phFlip")+'</label><button class="btn" data-act="phtpreset">'+t("phReset")+'</button></div>';}
 return h+'</div>';
}
function vPhoto(){
 var h='<div class="card"><p style="margin-top:0">'+t("phPrivacy")+'</p><div class="row"><label class="btn pri filebtn">'+t("phLoad")+'<input type="file" accept="image/*" data-act="phfile" class="sr"></label><label class="btn filebtn">'+t("phCam")+'<input type="file" accept="image/*" capture="environment" data-act="phfile" class="sr"></label></div></div>';
 if(PH.img){
  h+='<div class="card" style="margin-top:14px"><div class="phwrap"><canvas id="phc" class="phc" width="'+PH.w+'" height="'+PH.h+'" role="img" aria-label="'+t("tPhoto")+' — '+t("phA11y")+'"></canvas></div>';
  h+='<div class="row"><button class="btn" data-act="phmode" aria-pressed="'+PH.on+'">'+t("phMode")+'</button></div><p class="sub">'+t("phHint")+'</p>';
  h+='<div class="chips" role="group" aria-label="'+t("phColor")+'">'+PHC.map(function(k){return '<button data-act="phcol" data-v="'+k+'" aria-pressed="'+(PH.col===k)+'" class="'+(PH.col===k?"on":"")+'"><span class="dot" style="background:'+EI[k].c+'" aria-hidden="true"></span>'+L(EI[k].n)+'</button>';}).join("")+'</div>';
  h+=tplPanel();
  h+='<div class="row"><button class="btn" data-act="phundo">'+t("phUndo")+'</button><button class="btn" data-act="phclear">'+t("phClear")+'</button><button class="btn pri" data-act="phexp">'+t("phExport")+'</button><button class="btn" data-act="phdrop">'+t("phDrop")+'</button></div></div>';
 }
 return h;
}
var TPP=null;
function phTpl(g,c){
 if(typeof Path2D==="undefined")return;
 if(!TPP){var pd=PALM.match(/d="([^"]+)"/);TPP={palm:new Path2D(pd?pd[1]:""),lines:{}};for(var k in LINES)TPP.lines[k]=new Path2D(LINES[k]);}
 var T=PH.tp,sc=(c.height*0.8/400)*(T.s/100),cx=c.width/2+T.x*c.width/100,cy=c.height/2+T.y*c.height/100;
 g.save();g.translate(cx,cy);g.rotate(T.r*Math.PI/180);g.scale(sc*(tpFlip()?-1:1),sc);g.translate(-150,-200);g.globalAlpha=T.o/100;
 g.lineWidth=3/sc*Math.max(1,c.width/400);g.strokeStyle="#fff";g.shadowColor="rgba(0,0,0,.8)";g.shadowBlur=3;
 g.stroke(TPP.palm);
 [[80,99,30,111],[112,78,32,132],[146,99,30,111],[178,134,27,76]].forEach(function(r){g.beginPath();if(g.roundRect)g.roundRect(r[0],r[1],r[2],r[3],r[2]/2);else g.rect(r[0],r[1],r[2],r[3]);g.stroke();});
 g.beginPath();if(g.roundRect){g.save();g.translate(64,266);g.rotate(-Math.PI/6);g.roundRect(-17,-46,34,92,17);g.restore();}g.stroke();
 g.shadowBlur=0;g.lineWidth=4/sc*Math.max(1,c.width/400);
 for(var k in TPP.lines){g.strokeStyle=EI[k].c;g.stroke(TPP.lines[k]);}
 g.restore();
}
function phDraw(){
 var c=document.getElementById("phc");if(!c||!PH.img)return;var g=c.getContext("2d");
 g.clearRect(0,0,c.width,c.height);g.drawImage(PH.img,0,0,c.width,c.height);
 g.lineCap="round";g.lineJoin="round";
 if(PH.tp.on)phTpl(g,c);
 g.lineCap="round";g.lineJoin="round";
 PH.strokes.concat(PH.cur?[PH.cur]:[]).forEach(function(s){if(!s.p.length)return;
  g.lineWidth=Math.max(3,c.width/150);g.strokeStyle=EI[s.k].c;g.beginPath();g.moveTo(s.p[0][0],s.p[0][1]);
  for(var i=1;i<s.p.length;i++)g.lineTo(s.p[i][0],s.p[i][1]);if(s.p.length===1)g.lineTo(s.p[0][0]+.1,s.p[0][1]);g.stroke();});
}
function phPt(c,ev){var r=c.getBoundingClientRect();return [(ev.clientX-r.left)*c.width/r.width,(ev.clientY-r.top)*c.height/r.height];}
function phBind(){PH.cur=null;
 var c=document.getElementById("phc");if(!c)return;phDraw();
 c.style.touchAction=PH.on?"none":"auto";
 c.addEventListener("pointerdown",function(ev){if(!PH.on||ev.button>0)return;try{c.setPointerCapture(ev.pointerId);}catch(e){}PH.cur={k:PH.col,p:[phPt(c,ev)]};phDraw();ev.preventDefault();});
 c.addEventListener("pointermove",function(ev){if(!PH.cur)return;var q=phPt(c,ev),l=PH.cur.p[PH.cur.p.length-1];if(Math.abs(q[0]-l[0])+Math.abs(q[1]-l[1])>1.5&&PH.cur.p.length<4000){PH.cur.p.push(q);phDraw();}});
 var end=function(){if(PH.cur){PH.strokes.push(PH.cur);PH.cur=null;if(PH.strokes.length>300)PH.strokes.shift();phDraw();}};
 c.addEventListener("pointerup",end);c.addEventListener("pointercancel",end);
}
CHG.phfile=function(el){var f=el.files&&el.files[0];if(!f)return;
 if(!/^image\//.test(f.type)||f.size>25e6){say(t("impErr"));return;}
 var u=URL.createObjectURL(f),im=new Image();
 im.onload=function(){if(im.naturalWidth*im.naturalHeight>60e6||!im.naturalWidth){URL.revokeObjectURL(u);say(t("impErr"));return;}var m=1000,sc=Math.min(1,m/Math.max(im.naturalWidth,im.naturalHeight));PH.w=Math.max(1,Math.round(im.naturalWidth*sc));PH.h=Math.max(1,Math.round(im.naturalHeight*sc));var oc=document.createElement("canvas");oc.width=PH.w;oc.height=PH.h;oc.getContext("2d").drawImage(im,0,0,PH.w,PH.h);PH.img=oc;PH.strokes=[];PH.tp.f=S.hand==="r"?1:0;PH.cur=null;URL.revokeObjectURL(u);render();};
 im.onerror=function(){URL.revokeObjectURL(u);say(t("impErr"));};im.src=u;};
CHG.phtpon=function(el){PH.tp.on=el.checked?1:0;render();};
CHG.phflip=function(el){PH.tp.f=el.checked?1:0;phDraw();};
INP.phtp=function(el){var k=el.getAttribute("data-k"),r=TPK[k];if(!r)return;var v=+el.value;if(v!==v)return;PH.tp[k]=Math.max(r[0],Math.min(r[1],v));var o=el.parentNode.querySelector("output");if(o)o.textContent=PH.tp[k];phDraw();};
ACT.phtpreset=function(){PH.tp={on:1,x:0,y:0,s:100,r:0,o:70,f:S.hand==="r"?1:0};render();};
ACT.phmode=function(){PH.on=!PH.on;PH.cur=null;render();};
ACT.phcol=function(el){var k=el.getAttribute("data-v");if(PHC.indexOf(k)>=0){PH.col=k;render();}};
ACT.phundo=function(){PH.strokes.pop();phDraw();};
ACT.phclear=function(){PH.strokes=[];phDraw();};
ACT.phdrop=function(){PH.img=null;PH.strokes=[];render();};
ACT.phexp=function(){var c=document.getElementById("phc");if(!c)return;c.toBlob(function(b){if(!b)return;var u=URL.createObjectURL(b),a=document.createElement("a");a.href=u;a.download="chiromantia-palm.png";document.body.appendChild(a);a.click();document.body.removeChild(a);setTimeout(function(){URL.revokeObjectURL(u);},2000);},"image/png");};
MODS.push({id:"photo",tab:"tPhoto",view:vPhoto,after:phBind});
