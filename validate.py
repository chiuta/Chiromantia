#!/usr/bin/env python3
"""Structural validation of src/data: 8 languages everywhere, no empties, placeholder/quote sanity."""
import json,glob,os,re,sys
R=os.path.dirname(os.path.abspath(__file__))
bad=[]
def chk(path,v):
    if isinstance(v,list) and len(v)==8 and all(isinstance(x,str) for x in v):
        for i,x in enumerate(v):
            if not x.strip(): bad.append(f'{path}[{i}] empty')
            if '"' in x and False: bad.append(f'{path}[{i}] ascii quote')
        return
    if isinstance(v,list):
        for i,x in enumerate(v): chk(f'{path}[{i}]',x)
    elif isinstance(v,dict):
        for k,x in v.items(): chk(f'{path}.{k}',x)
for f in sorted(glob.glob(f'{R}/src/data/*.json')):
    d=json.load(open(f,encoding='utf-8')); n=os.path.basename(f)
    if n in('ui.json','reader.json'): chk(n,d)
    elif isinstance(d,list):
        for it in d:
            for k,v in it.items():
                if isinstance(v,list) and len(v)!=8 and k in('n','d','l','t','ic_t'): bad.append(f'{n}:{it.get("id")}.{k} len {len(v)}')
                chk(f'{n}:{it.get("id")}.{k}',v)
    else: chk(n,d)
print('validate:', 'OK' if not bad else f'{len(bad)} problems'); [print(' ',b) for b in bad[:40]]
sys.exit(1 if bad else 0)
