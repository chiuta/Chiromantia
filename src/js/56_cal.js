/* ===== module: calibrated measurement from photo ===== */
var CAL={img:null,w:0,h:0,pts:[],cx:0,cy:0};
var CST=["stCard1","stCard2","stWrist","stMidBase","stMidTip","stIdxBase","stIdxTip","stRingBase","stRingTip","stPalmA","stPalmB"];
function cdist(a,b){return Math.sqrt((a[0]-b[0])*(a[0]-b[0])+(a[1]-b[1])*(a[1]-b[1]));}
function calResults(){
 if(CAL.pts.length<CST.length)return null;var P=CAL.pts,mm=85.6/cdist(P[0],P[1]);if(!(mm>0)||!isFinite(mm))return null;
 var o={mm:mm,pl:cdist(P[2],P[3])*mm,ml:cdist(P[3],P[4])*mm,il:cdist(P[5],P[6])*mm,rl:cdist(P[7],P[8])*mm,pw:cdist(P[9],P[10])*mm};return ["pl","ml","il","rl","pw"].every(function(k){return o[k]>5&&o[k]<999;})?o:null;
}
function vCal(){
 var h='<div class="card"><p style="margin-top:0">'+t("calIntro")+'</p><div class="row"><label class="btn pri filebtn">'+t("phLoad")+'<input type="file" accept="image/*" data-act="calfile" class="sr"></label><label class="btn filebtn">'+t("phCam")+'<input type="file" accept="image/*" capture="environment" data-act="calfile" class="sr"></label></div></div>';
 if(!CAL.img)return h;
 var n=CAL.pts.length,res=calResults();
 h+='<div class="card" style="margin-top:14px"><div class="phwrap">';
 h+='<canvas id="calc" class="phc" tabindex="0" width="'+CAL.w+'" height="'+CAL.h+'" role="application" aria-label="'+t("tCal")+(n<CST.length?' — '+fill(t("calStep"),{n:n+1,m:CST.length,p:t(CST[n])}):'')+'"></canvas></div>';
 if(n<CST.length)h+='<p role="status" aria-live="polite"><strong>'+fill(t("calStep"),{n:n+1,m:CST.length,p:t(CST[n])})+'</strong></p><p class="sub">'+t("calKbd")+'</p>';
 h+='<div class="row"><button class="btn" data-act="calundo">'+t("calUndo")+'</button><button class="btn" data-act="calreset">'+t("calReset")+'</button></div>';
 if(res){
  h+='<h3>'+t("calDone")+'</h3><ul class="plist"><li><span class="pn">'+t("palmLen")+'</span><span>'+fmt(res.pl,1)+' mm</span></li><li><span class="pn">'+t("palmWid")+'</span><span>'+fmt(res.pw,1)+' mm</span></li><li><span class="pn">'+t("midLen")+'</span><span>'+fmt(res.ml,1)+' mm</span></li><li><span class="pn">'+t("idxLen")+'</span><span>'+fmt(res.il,1)+' mm</span></li><li><span class="pn">'+t("ringLen")+'</span><span>'+fmt(res.rl,1)+' mm</span></li><li><span class="pn">'+t("ratioLbl")+'</span><span>'+fmt(res.il/res.rl,3)+'</span></li></ul>';
  h+='<p class="sub">'+fill(t("calPx"),{v:fmt(res.mm,2)})+' '+t("calErr")+'</p><div class="row"><button class="btn pri" data-act="caluse" data-v="c">'+t("calUseC")+'</button><button class="btn" data-act="caluse" data-v="m">'+t("calUseM")+'</button></div>';
 }
 return h+'</div>';
}
function calDraw(){
 var c=document.getElementById("calc");if(!c||!CAL.img)return;var g=c.getContext("2d");g.clearRect(0,0,c.width,c.height);g.drawImage(CAL.img,0,0,c.width,c.height);
 var s=Math.max(c.width/300,1.5);g.lineWidth=s;g.font="bold "+Math.round(11*s)+"px system-ui,sans-serif";
 var pr=[[0,1,"#ffd400"],[2,3,"#ff4d4d"],[3,4,"#4da3ff"],[5,6,"#2ecc71"],[7,8,"#c07aff"],[9,10,"#ff9f43"]];
 pr.forEach(function(q){if(CAL.pts[q[0]]&&CAL.pts[q[1]]){g.strokeStyle=q[2];g.beginPath();g.moveTo(CAL.pts[q[0]][0],CAL.pts[q[0]][1]);g.lineTo(CAL.pts[q[1]][0],CAL.pts[q[1]][1]);g.stroke();}});
 CAL.pts.forEach(function(p,i){g.fillStyle="#fff";g.strokeStyle="#000";g.beginPath();g.arc(p[0],p[1],4*s,0,6.2832);g.fill();g.stroke();g.fillStyle="#000";g.fillText(String(i+1),p[0]+5*s,p[1]-5*s);});
 if(CAL.pts.length<CST.length&&document.activeElement===c){g.strokeStyle="#fff";g.lineWidth=s;g.beginPath();g.moveTo(CAL.cx-12*s,CAL.cy);g.lineTo(CAL.cx+12*s,CAL.cy);g.moveTo(CAL.cx,CAL.cy-12*s);g.lineTo(CAL.cx,CAL.cy+12*s);g.stroke();g.strokeStyle="#000";g.lineWidth=s*0.5;g.stroke();}
}
function calPlace(x,y){if(CAL.pts.length>=CST.length)return;CAL.pts.push([Math.max(0,Math.min(CAL.w,x)),Math.max(0,Math.min(CAL.h,y))]);var f=CAL.pts.length>=CST.length;render();if(!f){var c=document.getElementById("calc");if(c)c.focus({preventScroll:true});}}
function calBind(){
 var c=document.getElementById("calc");if(!c)return;calDraw();
 c.addEventListener("pointerdown",function(ev){if(ev.button>0)return;var r=c.getBoundingClientRect(),sc=Math.min(r.width/c.width,r.height/c.height),ox=(r.width-c.width*sc)/2,oy=(r.height-c.height*sc)/2,x=(ev.clientX-r.left-ox)/sc,y=(ev.clientY-r.top-oy)/sc;ev.preventDefault();if(!(sc>0)||x<0||y<0||x>c.width||y>c.height)return;calPlace(x,y);});
 c.addEventListener("focus",calDraw);c.addEventListener("blur",calDraw);
 c.addEventListener("keydown",function(ev){var k=ev.key,st=ev.shiftKey?1:Math.max(3,Math.round(c.width/120));
  if(k==="ArrowLeft")CAL.cx-=st;else if(k==="ArrowRight")CAL.cx+=st;else if(k==="ArrowUp")CAL.cy-=st;else if(k==="ArrowDown")CAL.cy+=st;
  else if(k==="Enter"||k===" "){ev.preventDefault();calPlace(CAL.cx,CAL.cy);return;}else return;
  ev.preventDefault();CAL.cx=Math.max(0,Math.min(CAL.w,CAL.cx));CAL.cy=Math.max(0,Math.min(CAL.h,CAL.cy));calDraw();});
}
CHG.calfile=function(el){var f=el.files&&el.files[0];el.value="";if(!f)return;
 if(!/^image\//.test(f.type)||f.size>25e6){say(t("impErr"));return;}
 var u=URL.createObjectURL(f),im=new Image();
 im.onload=function(){URL.revokeObjectURL(u);if(!im.naturalWidth||im.naturalWidth*im.naturalHeight>60e6){say(t("impErr"));return;}
  var sc=Math.min(1,1400/Math.max(im.naturalWidth,im.naturalHeight)),oc=document.createElement("canvas");oc.width=CAL.w=Math.max(1,Math.round(im.naturalWidth*sc));oc.height=CAL.h=Math.max(1,Math.round(im.naturalHeight*sc));
  oc.getContext("2d").drawImage(im,0,0,oc.width,oc.height);CAL.img=oc;CAL.pts=[];CAL.cx=CAL.w/2;CAL.cy=CAL.h/2;render();};
 im.onerror=function(){URL.revokeObjectURL(u);say(t("impErr"));};im.src=u;};
ACT.calundo=function(){CAL.pts.pop();render();};
ACT.calreset=function(){CAL.pts=[];render();};
ACT.caluse=function(el){var r=calResults();if(!r)return;
 if(el.getAttribute("data-v")==="c"){S.calc={pl:fmt(r.pl,1),pw:fmt(r.pw,1),ml:fmt(r.ml,1)};}
 else{S.meas.idx=fmt(r.il,1);S.meas.ring=fmt(r.rl,1);}
 save();say(t("calUsed"));};
MODS.push({id:"cal",tab:"tCal",view:vCal,after:calBind});
