/* ===== boot ===== */
loadState();setRH();
try{var hs=(location.hash||"").slice(1);if(/^p=/.test(hs)&&loadShared(hs)){save();setTimeout(function(){say(t("shLoaded"));},300);}}catch(e){}
try{var hh=(location.hash||"").slice(1).split("/");if(hh[0]&&MODS.some(function(m){return m.id===hh[0];})){S.tab=hh[0];if(hh[0]==="hand"&&hh[1]&&EI[hh[1]])S.sel=hh[1];}}catch(e){}
if(!MODS.some(function(m){return m.id===S.tab;}))S.tab=MODS[0].id;
render();
window.addEventListener("hashchange",function(){try{var hh=(location.hash||"").slice(1);if(/^p=/.test(hh)&&loadShared(hh)){save();say(t("shLoaded"));render();return;}var h=hh.split("/");if(h[0]&&h[0]!==S.tab&&MODS.some(function(m){return m.id===h[0];})){S.tab=h[0];if(h[0]==="hand"&&h[1]&&EI[h[1]])S.sel=h[1];save();render();}}catch(e){}});
