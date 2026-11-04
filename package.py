#!/usr/bin/env python3
"""Build release folder dist/pkg: html + PWA files + READMEs + LICENSE + CHANGELOG."""
import os,shutil,datetime,json,subprocess,sys
R=os.path.dirname(os.path.abspath(__file__));os.chdir(R)
subprocess.check_call([sys.executable,'build.py'])
LG=['ro','en','fr','it','es','pt','de','hu']
TABKEYS=['tBeg','tHand','tFing','tTypes','tSigns','tDerm','tPrint','tMeas','tCal','tTimeline','tSci','tBlind','tSim','tPred','tPhoto','tReader','tCards','tGame','tQuiz','tSearch','tListen','tWs','tSheet','tHist','tAbout']
ver=open('src/VERSION').read().strip();date=datetime.date.today().strftime('%d.%m.%Y')
P='dist/pkg';shutil.rmtree(P,ignore_errors=True);os.makedirs(P)
shutil.copy('dist/chiromantia.html',P+'/chiromantia.html')
shutil.copy('dist/chiromantia.html',P+'/index.html')
open(P+'/icon.svg','w').write('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" rx="96" fill="#8b4a2b"/><path d="M150 330V190q0-22 20-22t20 22v-10q0-24 20-24t20 24v-6q0-24 20-24t20 24v10q0-20 18-20t18 20v96q0 90-76 106-78-14-80-96-30-36-54-72 0-16 16-16 14 0 30 20z" fill="#f4e4d3"/><path d="M200 300q40 20 60 70" stroke="#8b4a2b" stroke-width="12" fill="none" stroke-linecap="round"/></svg>')
json.dump({"name":"CHIROMANTIA","short_name":"Chiromantia","start_url":"./index.html","scope":"./","display":"standalone","background_color":"#f7efe6","theme_color":"#8b4a2b","icons":[{"src":"icon.svg","sizes":"any","type":"image/svg+xml","purpose":"any"}]},open(P+'/manifest.webmanifest','w'),indent=1)
open(P+'/sw.js','w').write('''const C="chiromantia-%s";const A=["./","./index.html","./chiromantia.html","./manifest.webmanifest","./icon.svg"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));});
'''%ver)
for f in sorted(os.listdir('patches/readme')) if os.path.isdir('patches/readme') else []:
    s=open('patches/readme/'+f,encoding='utf-8').read().replace('@@VERSION@@',ver).replace('@@DATE@@',date)
    code=f.split('.')[1]
    if code in LG:
        li=LG.index(code);ui=json.load(open('src/data/ui.json',encoding='utf-8'))
        tabs=[ui[k][li] for k in TABKEYS if k in ui]
        sec='\n## '+ui['tNav'][li]+'\n\n'+' · '.join(tabs)+'\n'
        i=s.rfind('\n',0,s.rfind('@@VERSION@@')) if False else -1
        marker=[l for l in s.split('\n') if ver in l and date in l]
        if marker:
            k=s.rfind(marker[-1]);s=s[:k]+sec.lstrip('\n')+'\n'+s[k:]
        else:s+=sec
    open(P+'/'+f,'w',encoding='utf-8').write(s)
shutil.copy('CHANGELOG.md',P+'/CHANGELOG.md')
shutil.copytree('src',P+'/src');[shutil.copy(f,P+'/'+f) for f in ('build.py','validate.py')]
y=datetime.date.today().year
open(P+'/LICENSE','w',encoding='utf-8').write(f'''MIT License

Copyright (c) {y} Alexandru-Ionuț Chiuță (Alexio)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
''')
print('package',P,sorted(os.listdir(P)))
