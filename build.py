#!/usr/bin/env python3
"""Build chiromantia.html from src/template.html + src/data/*.json (+ patches applied separately)."""
import json,glob,os,sys,datetime,re
R=os.path.dirname(os.path.abspath(__file__))
def load(n): return json.load(open(f'{R}/src/data/{n}.json',encoding='utf-8'))
D={'U':load('ui'),'E':load('entries'),'TY':load('types'),'SG':load('signs'),'RO':load('reader'),'ASP':["life","head","heart","fate"]}
for extra in sorted(glob.glob(f'{R}/src/data/x_*.json')):
    D[os.path.basename(extra)[2:-5].upper() if False else os.path.basename(extra)[2:-5]]=json.load(open(extra,encoding='utf-8'))
if os.path.exists(f'{R}/src/data/aspects.json'): D['ASP']=load('aspects')
ver=open(f'{R}/src/VERSION').read().strip()
date=datetime.date.today().strftime('%d.%m.%Y')
iso=datetime.date.today().isoformat()
t=open(f'{R}/src/template.html',encoding='utf-8').read()
css=''.join(open(f,encoding='utf-8').read()+'\n' for f in sorted(glob.glob(f'{R}/src/css/*.css')))
js=''.join(open(f,encoding='utf-8').read()+'\n' for f in sorted(glob.glob(f'{R}/src/js/*.js')))
t=t.replace('/*@CSS@*/',css).replace('/*@JS@*/',js)
data=json.dumps(D,ensure_ascii=False,separators=(',',':')).replace('</','<\\/')
out=t.replace('/*@DATA@*/null',data).replace('@@VERSION@@',ver).replace('@@DATE@@',date).replace('@@ISODATE@@',iso)
dst=sys.argv[1] if len(sys.argv)>1 else f'{R}/dist/chiromantia.html'
open(dst,'w',encoding='utf-8').write(out)
print('built',dst,len(out),'bytes v'+ver)
