/* ===== module: quiz ===== */
var QZ=D.quiz||null,Q={cat:"all",i:0,sel:-1,ok:0,n:0,done:false,ord:[]};
function qpool(){return QZ.filter(function(q){return Q.cat==="all"||q.cat===Q.cat;});}
function qstart(c){Q.cat=c;var p=qpool();Q.ord=p.map(function(_,i){return i;});
 for(var i=Q.ord.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),x=Q.ord[i];Q.ord[i]=Q.ord[j];Q.ord[j]=x;}
 Q.ord=Q.ord.slice(0,10);Q.i=0;Q.sel=-1;Q.ok=0;Q.n=Q.ord.length;Q.done=false;}
function vQuiz(){
 if(!QZ)return '<p>…</p>';
 var cats=["all","lines","mounts","fingers","types","derm","sci"],h='<div class="card"><label>'+t("qCat")+'<select data-act="qcat">'+cats.map(function(c){return '<option value="'+c+'"'+(Q.cat===c?" selected":"")+'>'+(c==="all"?t("qAll"):t(({lines:"lines",mounts:"mounts",fingers:"fingers",types:"tTypes",derm:"tDerm",sci:"tSci"})[c]))+'</option>';}).join("")+'</select></label>';
 if(!Q.ord.length){return h+'<div class="row"><button class="btn pri" data-act="qstart">'+t("qStart")+'</button></div></div>';}
 if(Q.done){return h+'<p id="qres" tabindex="-1"><strong>'+t("qScore")+': '+Q.ok+' '+t("qOf")+' '+Q.n+'</strong></p><div class="row"><button class="btn pri" data-act="qstart">'+t("qRetry")+'</button></div></div>';}
 var q=qpool()[Q.ord[Q.i]];
 h+='<p class="sub">'+(Q.i+1)+' '+t("qOf")+' '+Q.n+'</p><div class="qf" role="group" aria-labelledby="qlg"><div class="qlg" id="qlg">'+L(q.q)+'</div>';
 q.o.forEach(function(o,i){var st="";if(Q.sel>=0){st=i===q.a?" good":(i===Q.sel?" bad":"");}
  h+='<button type="button" class="opt'+st+'" data-act="qpick" data-v="'+i+'"'+(Q.sel>=0?' aria-disabled="true"':'')+'><span class="mk" aria-hidden="true">'+(st===" good"?"✓":st===" bad"?"✗":"○")+'</span><span>'+(st===" good"?'<span class="sr">'+t("qCorrect")+' </span>':st===" bad"?'<span class="sr">'+t("qWrong")+' </span>':"")+L(o)+'</span></button>';});
 h+='</div>';
 if(Q.sel>=0)h+='<p id="qfb" tabindex="-1" aria-live="polite"><strong>'+(Q.sel===q.a?t("qCorrect"):t("qWrong"))+'</strong> '+L(q.e)+'</p><div class="row"><button class="btn pri" data-act="qnext">'+t("qNext")+'</button></div>';
 return h+'</div>';
}
CHG.qcat=function(el){var c=el.value;if(/^(all|lines|mounts|fingers|types|derm|sci)$/.test(c)){Q.cat=c;Q.ord=[];render();}};
ACT.qstart=function(){qstart(Q.cat);render();};
ACT.qpick=function(el){var v=+el.getAttribute("data-v");if(Q.sel>=0)return;var q=qpool()[Q.ord[Q.i]];Q.sel=v;if(v===q.a)Q.ok++;render();var f=document.getElementById("qfb");if(f)f.focus({preventScroll:true});say((v===q.a?t("qCorrect"):t("qWrong"))+" "+L(q.e));};
ACT.qnext=function(){if(Q.i+1>=Q.n){Q.done=true;}else{Q.i++;}Q.sel=-1;render();var r=document.getElementById("qres");if(r)r.focus({preventScroll:true});};
if(QZ&&QZ.length)MODS.push({id:"quiz",tab:"tQuiz",view:vQuiz});
