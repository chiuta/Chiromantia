/* ===== module: printable 1:1 worksheet ===== */
function wsSvg(){
 var s='<svg class="wsvg" xmlns="http://www.w3.org/2000/svg" width="190mm" height="262mm" viewBox="0 0 190 262" role="img" aria-label="'+esc(t("tWs"))+'"><rect x="0.5" y="0.5" width="189" height="261" fill="none" stroke="#000" stroke-width="0.4"/>';
 s+='<g stroke="#000" stroke-width="0.25">';
 for(var x=0;x<=180;x++){var L2=x%10===0?6:(x%5===0?4:2.2);s+='<line x1="'+(5+x)+'" y1="0.5" x2="'+(5+x)+'" y2="'+(0.5+L2)+'"/>';}
 for(var y=0;y<=250;y++){var L3=y%10===0?6:(y%5===0?4:2.2);s+='<line x1="0.5" y1="'+(5+y)+'" x2="'+(0.5+L3)+'" y2="'+(5+y)+'"/>';}
 s+='</g><g font-family="sans-serif" font-size="3" fill="#000">';
 for(var c=0;c<=18;c++)s+='<text x="'+(5+c*10+0.8)+'" y="10.5">'+c+'</text>';
 for(var d=1;d<=25;d++)s+='<text x="7.5" y="'+(5+d*10+1)+'">'+d+'</text>';
 s+='</g><text x="95" y="130" font-family="sans-serif" font-size="5" fill="#777" text-anchor="middle" font-style="italic">'+esc(t("wsTrace"))+'</text>';
 s+='<line x1="45" y1="30" x2="145" y2="30" stroke="#000" stroke-width="0.5"/><line x1="45" y1="28" x2="45" y2="32" stroke="#000" stroke-width="0.5"/><line x1="145" y1="28" x2="145" y2="32" stroke="#000" stroke-width="0.5"/><text x="95" y="26" font-family="sans-serif" font-size="3.2" text-anchor="middle" fill="#000">'+esc(t("wsCheck"))+'</text>';
 s+='<g font-family="sans-serif" font-size="4" fill="#000"><text x="12" y="212">'+esc(t("wsFill"))+'</text>';
 [["palmLen",0],["palmWid",1],["midLen",2],["idxLen",3],["ringLen",4]].forEach(function(f){var xx=12+(f[1]%2)*88,yy=222+Math.floor(f[1]/2)*12;s+='<text x="'+xx+'" y="'+yy+'">'+esc(t(f[0]))+':</text><line x1="'+(xx+44)+'" y1="'+(yy+0.5)+'" x2="'+(xx+78)+'" y2="'+(yy+0.5)+'" stroke="#000" stroke-width="0.3"/>';});
 return s+'</g></svg>';
}
function vWs(){
 return '<div class="row noprint"><button class="btn pri" data-act="wsprint">'+t("wsPrint")+'</button></div><p class="noprint">'+t("wsIntro")+'</p><div class="wscard">'+wsSvg()+'</div>';
}
ACT.wsprint=function(){document.body.classList.add("ws-only");var off=function(){document.body.classList.remove("ws-only");window.removeEventListener("afterprint",off);};window.addEventListener("afterprint",off);setTimeout(function(){window.print();},50);setTimeout(off,60000);};
MODS.push({id:"ws",tab:"tWs",view:vWs});
