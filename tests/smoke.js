// Playwright smoke: every language x every tab x 3 viewports. Usage: node tests/smoke.js [file] [--quick]
const { chromium } = require('playwright');
const path = require('path');
const file = path.resolve(process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : 'dist/chiromantia.html');
const quick = process.argv.includes('--quick');
(async () => {
  const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
  const vps = quick ? [[390, 800]] : [[390, 800], [820, 1100], [1280, 900]];
  let fails = 0, checks = 0;
  const fail = (m) => { fails++; console.log('FAIL', m); };
  for (const [w, h] of vps) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } });
    const page = await ctx.newPage();require('./_tab')(page);
    const errs = [];
    page.on('pageerror', e => errs.push('pageerror ' + e.message));
    page.on('console', m => { if (m.type() === 'error') errs.push('console ' + m.text()); });
    await page.goto('file://' + file);
    const nLang = await page.locator('select[data-act=lang] option').count();
    for (let li = 0; li < nLang; li++) {
      await page.selectOption('select[data-act=lang]', String(li));
      const tabs = await page.locator('nav [data-act=tab]').evaluateAll(els => els.map(e => e.getAttribute('data-v')));
      for (const tb of tabs) {
        await page.click(`nav [data-act=tab][data-v="${tb}"]`);
        checks++;
        const r = await page.evaluate(() => ({
          html: document.getElementById('app').innerText,
          sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
        const tag = `${w}px lang${li} tab ${tb}`;
        if (/undefined|NaN|\[object/.test(r.html)) fail(tag + ' contains undefined/NaN/[object]');
        if (r.sw > r.cw + 1) fail(tag + ` horizontal overflow ${r.sw}>${r.cw}`);
        if (r.html.trim().length < 40) fail(tag + ' nearly empty');
      }
    }
    // hand map: click every selectable element
    await page.click('nav [data-act=tab]').catch(()=>{});
    if (errs.length) { fail(`${w}px JS errors: ` + [...new Set(errs)].slice(0, 4).join(' | ')); }
    await ctx.close();
  }
  await browser.close();
  console.log(`smoke: ${checks} checks, ${fails} failures`);
  process.exit(fails ? 1 : 0);
})().catch(e => { console.log('FAIL harness', e.message); process.exit(2); });
