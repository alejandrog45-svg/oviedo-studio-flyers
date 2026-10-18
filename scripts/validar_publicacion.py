#!/usr/bin/env python3
from pathlib import Path
from PIL import Image
import argparse,json,hashlib
p=argparse.ArgumentParser();p.add_argument('imagen');p.add_argument('--manifest');a=p.parse_args()
im=Image.open(a.imagen);issues=[]
if im.size not in [(1080,1350),(1080,1920)]:issues.append('Dimensiones fuera de formatos permitidos')
if im.mode not in ('RGB','RGBA'):issues.append('Modo de color inesperado')
if im.format!='PNG':issues.append('Exportación debe ser PNG')
if a.manifest:
 data=json.loads(Path(a.manifest).read_text(encoding='utf-8'))
 if not data.get('aprobado_por_usuario'):issues.append('Falta aprobación humana')
 if not data.get('origenes_verificados'):issues.append('Falta verificar procedencia')
print(json.dumps({'archivo':a.imagen,'dimensiones':im.size,'sha256':hashlib.sha256(Path(a.imagen).read_bytes()).hexdigest(),'incidencias':issues,'apto_para_publicar':not issues and bool(a.manifest)},ensure_ascii=False,indent=2))
raise SystemExit(bool(issues))
