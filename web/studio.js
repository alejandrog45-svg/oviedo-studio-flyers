const $=id=>document.getElementById(id);const c=$('cv'),ctx=c.getContext('2d');let photo=null,logo=null,photoName='',logoName='',photoSource='original';const W=1080;let fontReady=false;
function fitText(s,maxWidth,size){ctx.font='800 '+size+'px Montserrat, system-ui';while(ctx.measureText(s).width>maxWidth&&size>24){size-=2;ctx.font='800 '+size+'px Montserrat, system-ui'}return size}
function centerText(s,y,size,color='#fff'){ctx.fillStyle=color;ctx.font='800 '+fitText(s,980,size)+'px Montserrat, system-ui';ctx.textAlign='center';ctx.fillText(s,W/2,y)}
let cats=[],product=null,productName='',layoutErrors=[];
const value=(id,fallback)=>$(id)?.value??fallback;
function rect(x,y,w,h,color){ctx.fillStyle=color;ctx.fillRect(x,y,w,h)}
function contained(im,x,y,w,h,scale=1,position=.5){if(!im)return;const k=Math.min(w/im.width,h/im.height)*scale;ctx.drawImage(im,x+(w-im.width*k)/2,y+(h-im.height*k)*position,im.width*k,im.height*k)}
function textBlock(text,x,y,width,height,size,color='#fff',align='left'){
ctx.fillStyle=color;ctx.textAlign=align;ctx.textBaseline='top';let lines=[];
for(;size>=18;size-=2){ctx.font='800 '+size+'px Montserrat, system-ui';lines=[];let line='';for(const word of text.toUpperCase().split(/\s+/)){const candidate=line?line+' '+word:word;if(ctx.measureText(candidate).width>width&&line){lines.push(line);line=word}else line=candidate}if(line)lines.push(line);if(lines.length*size*1.18<=height&&lines.every(l=>ctx.measureText(l).width<=width))break}
if(size<18){layoutErrors.push('Texto demasiado largo («'+text.slice(0,24)+'»): acorta el título o mensaje.');return}
lines.forEach((line,i)=>ctx.fillText(line,align==='center'?x+width/2:x,y+i*size*1.18));
}
function draw(){
const story=value('tipo','feed')==='story',H=story?1920:1350,x=story?60:48,top=story?250:48,w=W-2*x,bottom=story?1670:1302,template=value('plantilla','institucional'),red='#d71932',ink='#111318';
c.width=W;c.height=H;layoutErrors=[];rect(0,0,W,H,ink);ctx.textBaseline='top';
let subject;if(template!=='catalogo'){const badgeY=top,headlineY=top+166,headlineH=template==='evento'?230:205,photoY=headlineY+headlineH+40,footerY=bottom-160,photoH=footerY-photoY-28;
rect(x,badgeY,w,132,'#fff');
const logoW=360*Number(value('logoScale',100))/100,logoX=value('logoPosition','left')==='center'?x+(w-logoW)/2:value('logoPosition','left')==='right'?x+w-logoW-26:x+26;
if(logo)contained(logo,logoX,badgeY+18,logoW,96);else textBlock('Carga el logo oficial',x+28,badgeY+38,w-56,70,30,'#555');
if(template==='evento'){rect(x,headlineY-12,w,headlineH+24,red);textBlock(value('titulo',''),x+28,headlineY+5,w-56,headlineH-15,Number(value('titleSize',72)));}
else {rect(x,headlineY-15,70,7,red);textBlock(value('titulo',''),x,headlineY,w,headlineH,Number(value('titleSize',72)),template==='producto'?'#fff':'#fff');}
subject=template==='producto'?product:photo;
rect(x,photoY,w,photoH,template==='producto'?'#fff':'#20242b');
if(subject)contained(subject,x,photoY,w,photoH,Number(value('photoScale',100))/100,Number(value('photoY',50))/100);
else textBlock(template==='producto'?'Carga una fotografía de producto':'Carga una fotografía original',x+32,photoY+photoH/2-30,w-64,100,30,'#8b929e','center');
rect(x,footerY-14,w,6,red);textBlock(value('sub',''),x,footerY+8,w,62,32,'#fff');
textBlock('+56 9 3862 3488',x,footerY+72,w*.52,42,29);
textBlock('@oviedo_elmanzano',x+w*.52,footerY+75,w*.48,40,25);
textBlock('Carretera H66 KM 60 S/N, Las Cabras',x,footerY+119,w,38,22,'#d9dce1');
}else{subject=photo;
const hh=170,g=8,lw=Math.min(400,w*.4),tx=x+lw+g,tw=w-lw-g,redesH=56,contH=84,catH=240,redesY=bottom-redesH,contY=redesY-g-contH,catY=contY-g-catH,heroY=top+hh+g,heroH=catY-g-heroY;
rect(x,top,lw,hh,'#fff');if(logo)contained(logo,x+14,top+14,lw-28,hh-28);else textBlock('Carga el logo oficial',x+16,top+60,lw-32,60,22,'#555');
rect(tx,top,tw,hh,red);textBlock(value('titulo',''),tx+20,top+14,tw-40,hh-72,Number(value('titleSize',72)));textBlock(value('sub',''),tx+20,top+hh-48,tw-40,36,24);
rect(x,heroY,w,heroH,'#20242b');if(photo)contained(photo,x,heroY,w,heroH,Number(value('photoScale',100))/100,Number(value('photoY',50))/100);else textBlock('Carga una fotografía original',x+32,heroY+heroH/2-30,w-64,100,30,'#8b929e','center');
const t5=(w-4*g)/5;['MATERIALES DE CONSTRUCCIÓN','HERRAMIENTAS Y MAQUINARIAS','PINTURAS Y TERMINACIONES','BAÑOS Y COCINAS','ELECTRICIDAD E ILUMINACIÓN'].forEach((l,i)=>{const cx=x+i*(t5+g);rect(cx,catY,t5,150,'#fff');if(cats[i])contained(cats[i],cx,catY,t5,150);rect(cx,catY+150,t5,6,red);textBlock(l,cx+4,catY+164,t5-8,72,22,'#fff','center')});
rect(x,contY,w,contH,'#fff');textBlock('+56 9 3862 3488',x+24,contY+22,w*.4,44,34,ink);textBlock('Sucursal El Manzano · Carretera H66 KM 60 S/N, Las Cabras',x+w*.42,contY+14,w*.56-20,60,22,ink);
rect(x,redesY,w,redesH,red);textBlock('@oviedo_elmanzano · Ferreterías Oviedo El Manzano · Canal de WhatsApp',x+16,redesY+8,w-32,44,20,'#fff','center')}
const needs=[];if(!subject)needs.push(template==='producto'?'Falta foto de producto.':'Falta foto original.');if(!logo)needs.push('Falta logo oficial.');if(photoSource==='flow'&&template!=='producto')needs.push('Imagen de Flow: autenticidad pendiente.');if(template==='catalogo'&&cats.length<5)needs.push('Faltan fotos de categorías ('+cats.length+'/5).');needs.push(...layoutErrors);
$('qa').textContent=(needs.length?needs.join(' '):'Composición lista para revisar.')+' No aprobado: verifica originales, datos y legibilidad antes de publicar.';
if($('layoutStatus'))$('layoutStatus').textContent=(story?'Historia: 250 px arriba y abajo; 60 px laterales.':'Feed: margen interior de 48 px.')+' Las fotos y logos se muestran completos, sin deformación. '+(template==='producto'?'La plantilla usa la foto de producto independiente.':'');
if($('safeOverlay'))$('safeOverlay').hidden=!story||!$('safeGuides').checked;
}
async function load(input,cb){const f=input.files?.[0];if(!f)return;const url=URL.createObjectURL(f);try{const im=new Image();await new Promise((resolve,reject)=>{im.onload=resolve;im.onerror=reject;im.src=url});cb(im,f.name);draw()}catch(e){alert('No se pudo abrir la imagen')}finally{URL.revokeObjectURL(url)}}
$('foto').onchange=()=>load($('foto'),(i,n)=>{photo=i;photoName=n;photoSource='original'});$('logo').onchange=()=>load($('logo'),(i,n)=>{logo=i;logoName=n});for(const id of ['tipo','titulo','sub','plantilla','titleSize','photoScale','photoY','logoPosition','logoScale','safeGuides'].filter(id=>$(id)))$(id).addEventListener('input',draw);
if($('categorias'))$('categorias').onchange=async()=>{cats=[];for(const f of [...$('categorias').files].slice(0,5)){const u=URL.createObjectURL(f);try{const im=new Image();await new Promise((a,b)=>{im.onload=a;im.onerror=b;im.src=u});cats.push(im)}catch(e){alert('No se pudo abrir '+f.name)}finally{URL.revokeObjectURL(u)}}draw()};
if($('producto'))$('producto').onchange=()=>load($('producto'),(i,n)=>{product=i;productName=n});
if($('resetLayout'))$('resetLayout').onclick=()=>{for(const [id,v]of Object.entries({titleSize:72,photoScale:100,photoY:50,logoPosition:'left',logoScale:100}))if($(id))$(id).value=v;draw()};
let exportUrl=null;
$('export').onclick=()=>{if(!fontReady){$('fontStatus').textContent='Montserrat no está disponible. Comprueba tu conexión y recarga antes de exportar.';return}if(!(value('plantilla','institucional')==='producto'?product:photo)){alert('Carga la fotografía requerida por la plantilla');return}if(layoutErrors.length){alert(layoutErrors.join(' '));return}
const name='oviedo-studio-'+$('tipo').value+'.png',width=c.width,height=c.height;
c.toBlob(blob=>{if(!blob){$('qa').textContent='No se pudo generar el PNG. Intenta nuevamente.';return}
let panel=$('exportResult');if(!panel){panel=document.createElement('section');panel.id='exportResult';panel.setAttribute('aria-label','Archivo PNG exportado');$('cv').parentElement.append(panel)}
if(exportUrl)URL.revokeObjectURL(exportUrl);exportUrl=URL.createObjectURL(blob);
const url=exportUrl,title=document.createElement('h2'),status=document.createElement('p'),preview=new Image(),link=document.createElement('a');
title.textContent='PNG exportado · pendiente de revisión';status.setAttribute('role','status');status.textContent='Comprobando archivo PNG…';
preview.alt='Vista del archivo '+name;preview.style.cssText='display:block;max-width:100%;max-height:600px;object-fit:contain;margin:12px auto';
link.textContent='Guardar PNG exportado';link.download=name;link.href=url;
preview.onload=()=>{status.textContent=preview.naturalWidth===width&&preview.naturalHeight===height?'PNG comprobado: '+preview.naturalWidth+' × '+preview.naturalHeight+' píxeles · '+blob.size+' bytes. Foto, logo y textos requieren revisión humana.':'Las dimensiones del PNG no coinciden. No publicar.'};
preview.onerror=()=>{status.textContent='No se pudo comprobar el PNG. No publicar.'};panel.replaceChildren(title,status,preview,link);preview.src=url;download(blob,name)
},'image/png')};
function download(blob,name){const u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),2000)}
$('manifest').onclick=()=>{const data={proyecto:'Oviedo Studio',version_editor:'0.2',plantilla:value('plantilla','institucional'),producto_original:productName,ajustes:{titulo_px:value('titleSize',72),foto_escala:value('photoScale',100),foto_posicion:value('photoY',50),logo_posicion:value('logoPosition','left'),logo_escala:value('logoScale',100)},fecha:new Date().toISOString(),foto_original:photoSource==='original'?photoName:null,imagen:photoName,origen_imagen:photoSource,logo_original:logoName,formato:[c.width,c.height],titulo:$('titulo').value,mensaje:$('sub').value,origenes_verificados:false,aprobado_por_usuario:false,publicado:false};download(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}),'ficha-qa.json')};

if($('flowPrompt')){
$('flowPrompt').onclick=()=>{$('flowBrief').value=[
'Oviedo Studio · instrucciones para Google Flow',
'Formato: '+(c.height===1920?'Historia 1080 × 1920; 250 px libres arriba y abajo, 60 px a los lados.':'Feed 1080 × 1350.'),
'Título: '+$('titulo').value,
'Mensaje: '+$('sub').value,
'Usar únicamente fotografías y logotipos originales autorizados. Si no están adjuntos, solicitarlos; no inventarlos.',
'Logos intocables. No redibujar ni alterar letras, colores o proporciones. No regenerar fachadas, vehículos, canchas, instalaciones ni productos reales.',
'No inventar precios, SKU, descuentos, fechas ni características comerciales.',
'Diseño limpio y legible. Tipografía Montserrat para Oviedo. No recortar fotos, logos ni textos.',
'Contacto El Manzano: Carretera H66 KM 60 S/N, Las Cabras. WhatsApp +56 9 3862 3488. Instagram @oviedo_elmanzano.',
'Canal oficial: https://whatsapp.com/channel/0029Vb9OFHXGU3BGa2dgUn0e',
'Estructura objetivo: cabecera con logo y título; fotografía real protagonista; franja de 5 categorías con fotos originales (materiales, herramientas, pinturas, baños y cocinas, electricidad); contacto; redes. Paleta rojo/negro/blanco, trazos de pincel, sin líneas grises.',
'Originalidad estricta: usar solo imágenes adjuntas; marcas de terceros solo si aparecen en fotos originales; no corregir ni agregar texto; no mencionar otras sucursales. Flow solo para fondos y acabados decorativos.',
'Entregar como propuesta pendiente de revisión. No publicar automáticamente.'
].join('\n\n')};
$('flowImage').onchange=()=>load($('flowImage'),(i,n)=>{photo=i;photoName=n;photoSource='flow'});
}
draw();
document.fonts.load('800 62px Montserrat').then(fonts=>{fontReady=fonts.length>0;if($('fontStatus'))$('fontStatus').textContent=fontReady?'Montserrat cargada · exportación disponible.':'No se pudo cargar Montserrat; exportación bloqueada.';draw()}).catch(()=>{if($('fontStatus'))$('fontStatus').textContent='No se pudo cargar Montserrat; exportación bloqueada.'});
