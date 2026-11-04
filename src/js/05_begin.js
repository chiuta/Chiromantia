/* ===== module: beginner guide ===== */
var BG=0,BGS=[["bg1t","bg1d","life"],["bg2t","bg2d","head"],["bg3t","bg3d","ven"],["bg4t","bg4d",""],["bg5t","bg5d",""]];
function vBeg(){
 var s=BGS[BG],h='<div class="card"><h3 style="margin-top:0">'+t("bgTitle")+'</h3><p class="sub" role="status">'+fill(t("bgStep"),{n:BG+1,m:BGS.length})+'</p><div class="bar" aria-hidden="true"><i style="width:'+Math.round((BG+1)*100/BGS.length)+'%"></i></div>';
 h+='<h4 id="bgh" tabindex="-1">'+t(s[0])+'</h4><p>'+t(s[1])+'</p><div class="row">';
 if(BG>0)h+='<button class="btn" data-act="bgmove" data-v="-1">'+t("bgPrev")+'</button>';
 if(s[2])h+='<button class="btn" data-act="bgsee" data-k="'+s[2]+'">'+t("bgSee")+'</button>';
 else if(BG===3)h+='<button class="btn" data-act="goto" data-v="types" data-k="">'+t("tTypes")+'</button>';
 else if(BG===4)h+='<button class="btn" data-act="goto" data-v="sci" data-k="">'+t("tSci")+'</button>';
 if(BG<BGS.length-1)h+='<button class="btn pri" data-act="bgmove" data-v="1">'+t("bgNext")+'</button>';
 return h+'</div></div>';
}
ACT.bgmove=function(el){var d=+el.getAttribute("data-v");if(d!==1&&d!==-1)return;BG=Math.max(0,Math.min(BGS.length-1,BG+d));render();var h=document.getElementById("bgh");if(h)h.focus({preventScroll:true});};
ACT.bgsee=function(el){ACT.goto({getAttribute:function(k){return k==="data-v"?"hand":el.getAttribute("data-k");}});};
MODS.push({id:"beg",tab:"tBeg",view:vBeg});
