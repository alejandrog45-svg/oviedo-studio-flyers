#!/usr/bin/env python3
"""Composición no destructiva: nunca regenera fotografías."""
from PIL import Image,ImageOps,ImageDraw,ImageFont
from pathlib import Path
import argparse,json,hashlib
p=argparse.ArgumentParser();p.add_argument('--foto',required=True);p.add_argument('--salida',required=True);p.add_argument('--titulo',default='FERIA FERRETERA');p.add_argument('--mensaje',default='EL MANZANO 2026');p.add_argument('--logo');a=p.parse_args()
W,H=1080,1350;canvas=Image.new('RGB',(W,H),'#111318');d=ImageDraw.Draw(canvas)
font='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
def f(n):
 try:return ImageFont.truetype(font,n)
 except:return ImageFont.load_default()
def line(s,y,n,color='white'):
 while d.textbbox((0,0),s,font=f(n))[2]>1000 and n>16:n-=2
 d.text((W//2,y),s,fill=color,font=f(n),anchor='mt')
d.rectangle((0,0,W,12),fill='#e21b30')
if a.logo:
 logo=Image.open(a.logo).convert('RGBA');logo.thumbnail((320,130));canvas.paste(logo,((W-logo.width)//2,24),logo)
else:line('OVIEDO · FERRETERÍAS',65,42)
line(a.titulo,183,57);d.rounded_rectangle((50,258,1030,345),radius=16,fill='#db162e');line(a.mensaje,279,44)
foto=Image.open(a.foto).convert('RGB');fondo=Image.new('RGB',(1020,710),'#24272d');real=ImageOps.contain(foto,(1020,710));fondo.paste(real,((1020-real.width)//2,(710-real.height)//2));canvas.paste(fondo,(30,366));d.rectangle((28,364,1052,1078),outline='white',width=3)
d.rectangle((0,1100,1080,1108),fill='#db162e');line('MUY PRONTO, MÁS INFORMACIÓN',1140,34);line('Carretera H66 KM 60 S/N, Las Cabras',1202,24);line('+56 9 3862 3488 · @oviedo_elmanzano',1248,24)
canvas.save(a.salida);digest=hashlib.sha256(Path(a.foto).read_bytes()).hexdigest();print(json.dumps({'salida':a.salida,'foto_sha256':digest,'dimensiones':[W,H]}))
