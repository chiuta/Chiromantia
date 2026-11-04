/* ===== module: about ===== */
function vAbout(){
 return '<div class="card about"><h3>'+t("hDisc")+'</h3><p>'+t("disc")+'</p><h3>'+t("hHist")+'</h3><p>'+t("hist")+'</p><h3>'+t("hTips")+'</h3><p>'+t("tips")+'</p>'+(D.ethics?'<h3>'+t("tEthics")+'</h3><ul>'+D.ethics.map(function(x){return '<li><strong>'+L(x.n)+'.</strong> '+L(x.d)+'</li>';}).join("")+'</ul>':'')+'<h3>'+t("tCredits")+'</h3><p>'+t("credTxt")+'</p><p>'+t("free")+'</p><p><a href="https://buymeacoffee.com/echo.of.the.strings" target="_blank" rel="noopener noreferrer">'+t("bmc")+'</a></p></div>';
}
MODS.push({id:"about",tab:"tAbout",view:vAbout});
