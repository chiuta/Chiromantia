/* ===== module: listen to the map (sonification) ===== */
var AC=null,AOS=null;
function bez(d){var n=d.match(/-?\d+(\.\d+)?/g).map(Number);var p=[];for(var i=0;i<=40;i++){var u=i/40,v=1-u;p.push([v*v*v*n[0]+3*v*v*u*n[2]+3*v*u*u*n[4]+u*u*u*n[6],v*v*v*n[1]+3*v*v*u*n[3]+3*v*u*u*n[5]+u*u*u*n[7]]);}return p;}
function lsStop(){try{if(AOS){AOS.stop();AOS=null;}}catch(e){AOS=null;}}
function lsPlay(id){
 var Ctx=window.AudioContext||window.webkitAudioContext;if(!Ctx||!LINES[id]){say(t("lsNoAudio"));return;}
 try{if(!AC)AC=new Ctx();if(AC.state==="suspended")AC.resume();lsStop();
  var pts=bez(LINES[id]),dur=3,now=AC.currentTime+0.05,osc=AC.createOscillator(),g=AC.createGain(),pan=AC.createStereoPanner?AC.createStereoPanner():null;
  var fr=new Float32Array(pts.length),pn=new Float32Array(pts.length);
  pts.forEach(function(q,i){fr[i]=220*Math.pow(2,(1-q[1]/400)*2.2);var x=(S.hand==="r"?300-q[0]:q[0]);pn[i]=Math.max(-1,Math.min(1,x/150-1));});
  osc.type="sine";osc.frequency.setValueCurveAtTime(fr,now,dur);
  g.gain.setValueAtTime(0,now);g.gain.linearRampToValueAtTime(0.25,now+0.1);g.gain.setValueAtTime(0.25,now+dur-0.15);g.gain.linearRampToValueAtTime(0,now+dur);
  if(pan){pan.pan.setValueCurveAtTime(pn,now,dur);osc.connect(pan);pan.connect(g);}else osc.connect(g);
  g.connect(AC.destination);osc.start(now);osc.stop(now+dur+0.05);AOS=osc;say(L(EI[id].n));
 }catch(e){say(t("lsNoAudio"));}
}
function vListen(){
 var h='<div class="card"><p style="margin-top:0">'+t("lsIntro")+'</p><div class="row">'+Object.keys(LINES).map(function(id){return '<button class="btn" data-act="lsplay" data-k="'+id+'"><span class="dot" style="background:'+EI[id].c+'" aria-hidden="true"></span>'+fill(t("lsPlay"),{n:L(EI[id].n)})+'</button>';}).join("")+'<button class="btn" data-act="lsstop">'+t("lsStop")+'</button></div></div>';
 return h+'<div class="card" style="margin-top:14px"><h3 style="margin-top:0">'+t("lsDescH")+'</h3><p>'+t("lsDesc")+'</p></div>';
}
ACT.lsplay=function(el){lsPlay(el.getAttribute("data-k"));};
ACT.lsstop=function(){lsStop();};
MODS.push({id:"listen",tab:"tListen",view:vListen});
