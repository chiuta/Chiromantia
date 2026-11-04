// Patch page.click so tab-button clicks open the collapsible mobile menu first.
const IDS='cal|blind|prt|pred|ws|listen|sim|hist|beg|hand|fing|types|signs|derm|meas|time|sci|photo|reader|cards|game|quiz|search|sheet|about';
const RX=new RegExp('^(button\\[data-v="('+IDS+')"\\]|nav \\[data-act=tab\\]\\[data-v="('+IDS+')"\\])$');
module.exports=function(page){const orig=page.click.bind(page);
 page.click=async function(sel,opts){
  if(typeof sel==='string'&&RX.test(sel)){
   const mb=page.locator('.menubtn');
   if(await mb.count()&&await mb.isVisible()&&(await mb.getAttribute('aria-expanded'))!=='true')await orig('.menubtn');
  }
  return orig(sel,opts);};
 return page;};
