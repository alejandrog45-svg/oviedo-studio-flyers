import {drawApproved,rank,iconKey} from './approved.js';
import {drawConoce} from './conoce.js';
const $=id=>document.getElementById(id);const c=$('cv'),ctx=c.getContext('2d');let photo=null,logo=null,photoName='',logoName='',photoSource='original';const W=1080;let fontReady=false,FONT='Montserrat',BG='#111318';
const PIE_PAD='Cómo llegar: busca «Padelrocksrapel» en Google Maps · Despacho en el día · Retiro 15:30 hrs',PIE_MZ='Cómo llegar: busca «Oviedo Ferreterias El Manzano» en Google Maps';
const BRANDS={manzano:{tag:'EL MANZANO',label:'Oviedo · Sucursal El Manzano',font:'Montserrat',bg:'#111318',accent:'#e1141e',wa:'+56 9 3862 3488',ig:'@oviedo_elmanzano',dir:'Carretera H66 KM 60 S/N, Las Cabras',lugar:'SUCURSAL OVIEDO EL MANZANO',waLabel:'WhatsApp',fb:'/oviedoelmanzano',web:'www.oviedo.cl',pie:PIE_MZ,tema:'rojo'},express:{tag:'EXPRESS',label:'Oviedo Expréss (Cotiza Oviedo Express)',font:'Montserrat',bg:'#111318',accent:'#e1141e',wa:'+56 9 3862 3488',ig:'@padel_rocks_rapel',dir:'Sector El Estero s/n, Las Cabras',lugar:'OVIEDO EXPRESS',waLabel:'Cotiza Oviedo Express',fb:'',web:'www.oviedo.cl',pie:PIE_PAD,tema:'rojo'},padel:{tag:'PADEL ROCKS',label:'Pádel Oviedo · Padel Rocks Rapel',font:'Fraunces',bg:'#0b3d26',accent:'#14693f',wa:'+56 9 5923 7808 · +56 9 3862 3488',ig:'@padel_rocks_rapel',dir:'Sector El Estero s/n, Las Cabras',lugar:'PADEL OVIEDO',waLabel:'Reservas pádel',wa2Label:'Cotiza Oviedo Express',fb:'',web:'',pie:PIE_PAD,tema:'verde'},alianza:{tag:'ALIANZA',label:'Alianza Padel Rocks Rapel · Oviedo Expréss',font:'Montserrat',bg:'#111318',accent:'#e1141e',wa:'+56 9 5923 7808 · +56 9 3862 3488',ig:'@padel_rocks_rapel',dir:'Sector El Estero s/n, Las Cabras',lugar:'PADEL OVIEDO',waLabel:'Reservas pádel',wa2Label:'Cotiza Oviedo Express',fb:'',web:'',pie:PIE_PAD,tema:'verde'},feria:{tag:'EL MANZANO',label:'Feria Ferretera · Oviedo El Manzano',font:'Montserrat',bg:'#111318',accent:'#e1141e',wa:'+56 9 3862 3488',ig:'@oviedo_elmanzano',dir:'Carretera H66 KM 60 S/N, Las Cabras',lugar:'SUCURSAL OVIEDO EL MANZANO',waLabel:'WhatsApp',fb:'/oviedoelmanzano',web:'www.oviedo.cl',pie:PIE_MZ,tema:'rojo'}};
function fitText(s,maxWidth,size){ctx.font='800 '+size+'px '+FONT+', system-ui';while(ctx.measureText(s).width>maxWidth&&size>24){size-=2;ctx.font='800 '+size+'px '+FONT+', system-ui'}return size}
function centerText(s,y,size,color='#fff'){ctx.fillStyle=color;ctx.font='800 '+fitText(s,980,size)+'px '+FONT+', system-ui';ctx.textAlign='center';ctx.fillText(s,W/2,y)}
let qrDefault=null,logoDark=null,logoDarkName='',marcas=[],icons={},qrImg=null,aliados=[],qrBottom=0,cats=[],product=null,productName='',layoutErrors=[];
const value=(id,fallback)=>$(id)?.value??fallback;
function rect(x,y,w,h,color){ctx.fillStyle=color;ctx.fillRect(x,y,w,h)}
function contained(im,x,y,w,h,scale=1,position=.5){if(!im)return;const k=Math.min(w/im.width,h/im.height)*scale;ctx.drawImage(im,x+(w-im.width*k)/2,y+(h-im.height*k)*position,im.width*k,im.height*k)}
function textBlock(text,x,y,width,height,size,color='#fff',align='left'){
ctx.fillStyle=color;ctx.textAlign=align;ctx.textBaseline='top';let lines=[];
for(;size>=18;size-=2){ctx.font='800 '+size+'px '+FONT+', system-ui';lines=[];let line='';for(const word of text.toUpperCase().split(/\s+/)){const candidate=line?line+' '+word:word;if(ctx.measureText(candidate).width>width&&line){lines.push(line);line=word}else line=candidate}if(line)lines.push(line);if(lines.length*size*1.18<=height&&lines.every(l=>ctx.measureText(l).width<=width))break}
if(size<18){layoutErrors.push('Texto demasiado largo («'+text.slice(0,24)+'»): acorta el título o mensaje.');return}
lines.forEach((line,i)=>ctx.fillText(line,align==='center'?x+width/2:x,y+i*size*1.18));
}
function fitHero(im,x,y,w,h,pos,sc){const kc=Math.max(w/im.width,h/im.height),vis=(w/(im.width*kc))*(h/(im.height*kc));ctx.save();ctx.beginPath();ctx.rect(x,y,w,h);ctx.clip();
if(vis>=.85){ctx.drawImage(im,x+(w-im.width*kc)/2,y+(h-im.height*kc)*pos,im.width*kc,im.height*kc)}else{ctx.filter='blur(22px)';const k=Math.max((w+60)/im.width,(h+60)/im.height);ctx.drawImage(im,x+(w-im.width*k)/2,y+(h-im.height*k)/2,im.width*k,im.height*k);ctx.filter='none';ctx.fillStyle='rgba(0,0,0,.45)';ctx.fillRect(x,y,w,h);contained(im,x,y,w,h,sc,pos)}
ctx.restore()}
function conoceDraw(story,H){
const mk=value('marca','manzano'),b=BRANDS[mk],up=t=>String(t||'').toUpperCase(),defs=['HERRAMIENTAS/Y ACCESORIOS','MATERIALES/DE CONSTRUCCIÓN','PLOMERÍA/Y GAS','PINTURAS/Y TERMINACIONES'],lab=String(value('catConoce','')).split('|').map(t=>t.trim()),
O={photoY:Number(value('photoY',50))/100,focoX:Number(value('heroX',50))/100,zoom:Number(value('heroZoom',100))},qr=$('qrCanal')?.checked&&!$('qrHide')?.checked?(qrImg||qrDefault):null;
ctx.textBaseline='top';const r=drawConoce(ctx,{W,H,story,T:{tag:b.tag,lema:value('lema',''),t1:up(value('titulo','')),t2:up(value('titulo2','')),dir:value('dir',''),wa:value('wa',''),ig:value('ig',''),cats:defs.map((d,i)=>lab[i]||d)},I:{logo:logoDark||logo,photo,cats:cats.slice(0,4),icons,qr},O});
layoutErrors=r.errors;const needs=[...r.needs];if(photoSource==='flow')needs.push('Imagen de Flow: autenticidad pendiente.');if(mk==='express')needs.push('Oviedo Expréss: rotular "Cotiza Oviedo Express" con el WhatsApp de Oviedo.');if(photo&&photo.width<1400&&photo.height<1400)needs.push('Foto de baja resolución: puede verse borrosa en pantalla completa.');needs.push('Revisa etiquetas de precio y personas visibles en las fotos (precios solo si siguen vigentes; personas solo con autorización).');needs.push(...layoutErrors);
$('qa').textContent=(needs.length?needs.join(' '):'Composición lista para revisar.')+' No aprobado: verifica originales, datos, personas en foto y legibilidad antes de publicar.';
if($('layoutStatus'))$('layoutStatus').textContent=(story?'Historia 1080×1920.':'Feed 1080×1350.')+' Plantilla Conoce nuestra ferretería: foto interior a sangre; ajusta zoom y enfoque.';
if($('safeOverlay'))$('safeOverlay').hidden=true}
function approvedDraw(story,H){
const mk=value('marca','manzano'),b=BRANDS[mk],up=t=>String(t||'').toUpperCase(),O={cover:!!$('cover')?.checked,showMarcas:$('showMarcas')?.checked!==false,photoY:Number(value('photoY',50))/100,photoScale:Number(value('photoScale',100))/100,logoScale:Number(value('logoScale',100))/100,zoom:Number(value('heroZoom',100)),focoX:Number(value('heroX',50))/100,qrGen:$('qrCanal')?.checked&&typeof qrcode==='function'?(r,bt,a)=>drawQR(r,bt,a):null};
ctx.textBaseline='top';const r=drawApproved(ctx,{W,H,story,tema:value('tema','rojo'),T:{pre:up(value('pre','')),t1:up(value('titulo','')),t2:up(value('titulo2','')),ribbon:up(value('sub','')),lugar:b.lugar,dir:value('dir',''),wa:value('wa',''),waLabel:b.waLabel,wa2Label:b.wa2Label,web:value('web',''),ig:value('ig',''),fb:value('fb',''),pie:value('pie','')},I:{logo,photo,marcas,icons,qr:$('qrHide')?.checked?null:(qrImg||qrDefault),aliados},O});
layoutErrors=r.errors;const needs=[...r.needs];if(!photo)needs.unshift('Falta foto original.');if(photo&&photo.height>photo.width*.9)needs.push('Foto vertical en hero horizontal: se muestra completa con fondo desenfocado; para más impacto usa una foto horizontal.');if(O.cover)needs.push('Foto recortada para rellenar: verifica que el logo OVIEDO y PATIO CONSTRUCTOR queden completos.');if(!(qrImg||qrDefault)&&!O.qrGen&&!$('qrHide')?.checked)needs.push('Sin QR del Canal.');if(photoSource==='flow')needs.push('Imagen de Flow: autenticidad pendiente.');if(mk==='express')needs.push('Oviedo Expréss: rotular "Cotiza Oviedo Express" con el WhatsApp de Oviedo.');if(mk==='padel'||mk==='alianza')needs.push('Pádel: logos originales, Fraunces, verde/rosa; verificar contraste.');needs.push(...layoutErrors);
if(O.qrGen)needs.push('QR del Canal generado: probar con un teléfono antes de aprobar.');
$('qa').textContent=(needs.length?needs.join(' '):'Composición lista para revisar.')+' No aprobado: verifica originales, datos y legibilidad antes de publicar.';
if($('layoutStatus'))$('layoutStatus').textContent=(story?'Historia 1080×1920.':'Feed 1080×1350.')+' Plantilla Aprobado: la zona segura de Historia no se aplica; verifica el contenido importante antes de y≈1800.';
if($('safeOverlay'))$('safeOverlay').hidden=true}
const CANAL='https://whatsapp.com/channel/0029Vb9OFHXGU3BGa2dgUn0e';
function roundRect(x,y,w,h,r,color){ctx.fillStyle=color;ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill()}
function drawQR(right,bottom,accent){const aim=qrImg&&Math.abs(qrImg.width/qrImg.height-1)<.05?qrImg:qrDefault;if(aim){const qw=214,qh=258,cx=right-qw,cy=bottom-qh;roundRect(cx,cy,qw,qh,22,'#ffffff');contained(aim,cx+10,cy+10,qw-20,qw-20);roundRect(cx+8,cy+qw-4,qw-16,38,8,accent);textBlock('¡SÍGUELO!',cx+8,cy+qw+6,qw-16,22,22,'#fff','center');return}const q=qrcode(0,'H');q.addData(CANAL);q.make();const n=q.getModuleCount(),m=4,qz=4,side=(n+2*qz)*m,pad=12,labelH=44,cw=side+2*pad,ch=side+2*pad+labelH,cx=right-cw,cy=bottom-ch;
roundRect(cx,cy,cw,ch,18,accent);const ox=cx+pad+qz*m,oy=cy+pad+qz*m;roundRect(cx+pad,cy+pad,side,side,10,'#fff');
const eye=(r,c)=>(r<7&&c<7)||(r<7&&c>=n-7)||(r>=n-7&&c<7);
ctx.fillStyle='#0d0d0d';for(let r=0;r<n;r++)for(let c=0;c<n;c++)if(!eye(r,c)&&q.isDark(r,c)){ctx.beginPath();ctx.roundRect(ox+c*m,oy+r*m,m,m,m*.3);ctx.fill()}
const deep='#'+[1,3,5].map(i=>Math.round(parseInt(accent.slice(i,i+2),16)*.55).toString(16).padStart(2,'0')).join('');
for(const [r,c]of[[0,0],[0,n-7],[n-7,0]]){roundRect(ox+c*m,oy+r*m,7*m,7*m,m*1.4,deep);roundRect(ox+(c+1)*m,oy+(r+1)*m,5*m,5*m,m*.8,'#fff');roundRect(ox+(c+2)*m,oy+(r+2)*m,3*m,3*m,m*.8,deep)}
textBlock('¡SÍGUELO!',cx+pad,cy+pad+side+8,side,labelH-14,24,'#fff','center')}
function draw(){
const story=value('tipo','feed')==='story',H=story?1920:1350,x=story?60:48,top=story?250:48,w=W-2*x,bottom=story?1670:1302,template=value('plantilla','institucional'),red=value('accent','#e1141e'),ink=BG;
c.width=W;c.height=H;layoutErrors=[];rect(0,0,W,H,ink);ctx.textBaseline='top';
if(template==='aprobado'){approvedDraw(story,H);return}
if(template==='conoce'){conoceDraw(story,H);return}
let subject;if(template!=='catalogo'){const badgeY=top,headlineY=top+166,headlineH=template==='evento'?230:205,photoY=headlineY+headlineH+40,footerY=bottom-160,photoH=footerY-photoY-28;
rect(x,badgeY,w,132,'#fff');
const logoW=360*Number(value('logoScale',100))/100,logoX=value('logoPosition','left')==='center'?x+(w-logoW)/2:value('logoPosition','left')==='right'?x+w-logoW-26:x+26;
if(logoDark||logo)contained(logoDark||logo,logoX,badgeY+18,logoW,96);else textBlock('Carga el logo oficial',x+28,badgeY+38,w-56,70,30,'#555');
if(template==='evento'){rect(x,headlineY-12,w,headlineH+24,red);textBlock(value('titulo',''),x+28,headlineY+5,w-56,headlineH-15,Number(value('titleSize',72)));}
else {rect(x,headlineY-15,70,7,red);textBlock(value('titulo',''),x,headlineY,w,headlineH,Number(value('titleSize',72)),template==='producto'?'#fff':'#fff');}
subject=template==='producto'?product:photo;
rect(x,photoY,w,photoH,template==='producto'?'#fff':'#20242b');
if(subject)contained(subject,x,photoY,w,photoH,Number(value('photoScale',100))/100,Number(value('photoY',50))/100);
else textBlock(template==='producto'?'Carga una fotografía de producto':'Carga una fotografía original',x+32,photoY+photoH/2-30,w-64,100,30,'#8b929e','center');
qrBottom=photoY+photoH-12;rect(x,footerY-14,w,6,red);textBlock(value('sub',''),x,footerY+8,w,62,32,'#fff');
textBlock(value('wa',''),x,footerY+72,w*.52,42,29);
textBlock(value('ig',''),x+w*.52,footerY+75,w*.48,40,25);
textBlock(value('dir',''),x,footerY+119,w,38,22,'#d9dce1');
}else{subject=photo;
const hh=170,g=8,lw=Math.min(400,w*.4),tx=x+lw+g,tw=w-lw-g,redesH=56,contH=84,catH=240,redesY=bottom-redesH,contY=redesY-g-contH,catY=contY-g-catH,heroY=top+hh+g,heroH=catY-g-heroY;
rect(x,top,lw,hh,'#fff');if(logoDark||logo)contained(logoDark||logo,x+14,top+14,lw-28,hh-28);else textBlock('Carga el logo oficial',x+16,top+60,lw-32,60,22,'#555');
rect(tx,top,tw,hh,red);textBlock(value('titulo',''),tx+20,top+14,tw-40,hh-72,Number(value('titleSize',72)));textBlock(value('sub',''),tx+20,top+hh-48,tw-40,36,24);
qrBottom=heroY+heroH-12;rect(x,heroY,w,heroH,'#20242b');if(photo)fitHero(photo,x,heroY,w,heroH,Number(value('photoY',50))/100,Number(value('photoScale',100))/100);else textBlock('Carga una fotografía original',x+32,heroY+heroH/2-30,w-64,100,30,'#8b929e','center');
const t5=(w-4*g)/5;const CATS_DEF=['MATERIALES DE CONSTRUCCIÓN','HERRAMIENTAS Y MAQUINARIAS','PINTURAS Y TERMINACIONES','BAÑOS Y COCINAS','ELECTRICIDAD E ILUMINACIÓN'],catTxt=String(value('catTxt','')).split('|').map(t=>t.trim());CATS_DEF.map((d,i)=>catTxt[i]||d).forEach((l,i)=>{const cx=x+i*(t5+g);rect(cx,catY,t5,150,'#fff');if(cats[i])contained(cats[i],cx,catY,t5,150);rect(cx,catY+150,t5,6,red);textBlock(l,cx+4,catY+164,t5-8,72,22,'#fff','center')});
rect(x,contY,w,contH,'#fff');textBlock(value('wa',''),x+24,contY+22,w*.4,44,34,ink);textBlock((value('marca','manzano')==='manzano'?'Sucursal El Manzano · ':'')+value('dir',''),x+w*.42,contY+14,w*.56-20,60,22,ink);
rect(x,redesY,w,redesH,red);textBlock(value('ig','')+(value('marca','manzano')==='manzano'?' · Ferreterías Oviedo El Manzano · Canal de WhatsApp':''),x+16,redesY+8,w-32,44,20,'#fff','center')}
if($('qrCanal')?.checked&&typeof qrcode==='function')drawQR(x+w-12,qrBottom,red);
const needs=[];if(!subject)needs.push(template==='producto'?'Falta foto de producto.':'Falta foto original.');if(!(logoDark||logo))needs.push('Falta logo oficial.');else if(!logoDark)needs.push('Falta el logo negro: sobre el fondo claro se está usando el logo blanco.');if(photoSource==='flow'&&template!=='producto')needs.push('Imagen de Flow: autenticidad pendiente.');const mk=value('marca','manzano');if(!value('wa','')||!value('ig','')||!value('dir',''))needs.push('Faltan datos de contacto de la marca (WhatsApp, Instagram o dirección).');if(mk==='padel'||mk==='alianza')needs.push('Pádel: usar logos originales (Padel Rocks Rapel'+(mk==='alianza'?' y Oviedo Expréss juntos en un bloque':'')+'), Fraunces, verde/rosa sin rojo; verificar contraste.');if(mk==='express')needs.push('Oviedo Expréss: rotular "Cotiza Oviedo Express" con el WhatsApp de Oviedo.');if(mk==='manzano'&&/sucursal/i.test(value('titulo','')+' '+value('sub',''))&&!/manzano/i.test(value('titulo','')+' '+value('sub','')))needs.push('El Manzano: no mencionar otras sucursales.');if(template==='catalogo'&&cats.length<5)needs.push('Faltan fotos de categorías ('+cats.length+'/5).');if($('qrCanal')?.checked)needs.push('QR del Canal: probar con un teléfono antes de aprobar.');needs.push(...layoutErrors);
$('qa').textContent=(needs.length?needs.join(' '):'Composición lista para revisar.')+' No aprobado: verifica originales, datos y legibilidad antes de publicar.';
if($('layoutStatus'))$('layoutStatus').textContent=(story?'Historia: 250 px arriba y abajo; 60 px laterales.':'Feed: margen interior de 48 px.')+' Las fotos y logos se muestran completos, sin deformación. '+(template==='producto'?'La plantilla usa la foto de producto independiente.':'');
if($('safeOverlay'))$('safeOverlay').hidden=!story||!$('safeGuides').checked;
}
async function load(input,cb){const f=input.files?.[0];if(!f)return;const url=URL.createObjectURL(f);try{const im=new Image();await new Promise((resolve,reject)=>{im.onload=resolve;im.onerror=reject;im.src=url});cb(im,f.name);draw()}catch(e){alert('No se pudo abrir la imagen')}finally{URL.revokeObjectURL(url)}}
$('foto').onchange=()=>load($('foto'),(i,n)=>{photo=i;photoName=n;photoSource='original'});$('logo').onchange=()=>load($('logo'),(i,n)=>{logo=i;logoName=n});if($('logoNegro'))$('logoNegro').onchange=()=>load($('logoNegro'),(i,n)=>{logoDark=i;logoDarkName=n});for(const id of ['tipo','titulo','sub','plantilla','titleSize','photoScale','photoY','logoPosition','logoScale','safeGuides','qrCanal','qrHide','lema','catConoce','heroZoom','heroX','catTxt','pre','titulo2','fb','web','pie','tema','cover','showMarcas','accent','wa','ig','dir'].filter(id=>$(id)))$(id).addEventListener('input',draw);
const loadImgs=async fl=>{const out=[];for(const f of fl){const u=URL.createObjectURL(f);try{const im=new Image();await new Promise((a,b)=>{im.onload=a;im.onerror=b;im.src=u});out.push({im,name:f.name})}catch(e){alert('No se pudo abrir '+f.name)}finally{URL.revokeObjectURL(u)}}return out};
if($('marcas'))$('marcas').onchange=async()=>{marcas=(await loadImgs([...$('marcas').files])).sort((a,b)=>rank(a.name)-rank(b.name)).slice(0,13).map(x=>x.im);draw()};
if($('iconos'))$('iconos').onchange=async()=>{icons={};for(const x of await loadImgs([...$('iconos').files])){const k=iconKey(x.name);if(k)icons[k]=x.im}draw()};
if($('qrImg'))$('qrImg').onchange=()=>load($('qrImg'),i=>{qrImg=i});
if($('aliados'))$('aliados').onchange=async()=>{aliados=(await loadImgs([...$('aliados').files])).slice(0,2).map(x=>x.im);draw()};
if($('categorias'))$('categorias').onchange=async()=>{cats=[];for(const f of [...$('categorias').files].slice(0,5)){const u=URL.createObjectURL(f);try{const im=new Image();await new Promise((a,b)=>{im.onload=a;im.onerror=b;im.src=u});cats.push(im)}catch(e){alert('No se pudo abrir '+f.name)}finally{URL.revokeObjectURL(u)}}draw()};
if($('producto'))$('producto').onchange=()=>load($('producto'),(i,n)=>{product=i;productName=n});
if($('resetLayout'))$('resetLayout').onclick=()=>{for(const [id,v]of Object.entries({heroZoom:100,heroX:50,titleSize:72,photoScale:100,photoY:50,logoPosition:'left',logoScale:100}))if($(id))$(id).value=v;draw()};
let exportUrl=null;
$('export').onclick=()=>{if(!fontReady){$('fontStatus').textContent=FONT+' no está disponible. Comprueba tu conexión y recarga antes de exportar.';return}if(!(value('plantilla','institucional')==='producto'?product:photo)){alert('Carga la fotografía requerida por la plantilla');return}if(layoutErrors.length){alert(layoutErrors.join(' '));return}
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
$('manifest').onclick=()=>{const data={proyecto:'Oviedo Studio',marca:value('marca','manzano'),tipografia:FONT,contacto:{whatsapp:value('wa',''),instagram:value('ig',''),direccion:value('dir','')},version_editor:'0.2',plantilla:value('plantilla','institucional'),producto_original:productName,ajustes:{titulo_px:value('titleSize',72),foto_escala:value('photoScale',100),foto_posicion:value('photoY',50),logo_posicion:value('logoPosition','left'),logo_escala:value('logoScale',100)},fecha:new Date().toISOString(),foto_original:photoSource==='original'?photoName:null,imagen:photoName,origen_imagen:photoSource,logo_original:logoName,logo_negro:logoDarkName,formato:[c.width,c.height],titulo:$('titulo').value,mensaje:$('sub').value,origenes_verificados:false,aprobado_por_usuario:false,publicado:false};download(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}),'ficha-qa.json')};

if($('flowPrompt')){
$('flowPrompt').onclick=()=>{$('flowBrief').value=[
'Oviedo Studio · instrucciones para Google Flow',
'Formato: '+(c.height===1920?'Historia 1080 × 1920; 250 px libres arriba y abajo, 60 px a los lados.':'Feed 1080 × 1350.'),
'Título: '+$('titulo').value,
'Mensaje: '+$('sub').value,
'Usar únicamente fotografías y logotipos originales autorizados. Si no están adjuntos, solicitarlos; no inventarlos.',
'Logos intocables. No redibujar ni alterar letras, colores o proporciones. No regenerar fachadas, vehículos, canchas, instalaciones ni productos reales.',
'No inventar precios, SKU, descuentos, fechas ni características comerciales.',
'Diseño limpio y legible. Tipografía '+FONT+' (Oviedo: Montserrat 800/900, rojo #E1141E, negro, blanco; Pádel: Fraunces, verde #14693F/#0B3D26, rosa #F6A8C4, blanco; sin mezclar paletas). No recortar fotos, logos ni textos.',
'Marca: '+BRANDS[value('marca','manzano')].label+'. Contacto: '+(value('dir','')||'(sin dirección)')+'. WhatsApp '+(value('wa','')||'(sin dato)')+'. Instagram '+(value('ig','')||'(sin dato)')+'. Usar solo estos datos; no inventar otros.',
value('marca','manzano')==='manzano'?'Canal oficial: https://whatsapp.com/channel/0029Vb9OFHXGU3BGa2dgUn0e. Promos de El Manzano: no mencionar otras sucursales.':'Usar solo logos y datos oficiales de esta marca; no mezclar con otras sucursales o marcas.',
'Estructura objetivo: cabecera con logo y título; fotografía real protagonista; franja de 5 categorías con fotos originales (materiales, herramientas, pinturas, baños y cocinas, electricidad); contacto; redes. Paleta rojo/negro/blanco, trazos de pincel, sin líneas grises.',
'Originalidad estricta: usar solo imágenes adjuntas; marcas de terceros solo si aparecen en fotos originales; no corregir ni agregar texto; no mencionar otras sucursales. Flow solo para fondos y acabados decorativos.',
'Entregar como propuesta pendiente de revisión. No publicar automáticamente.'
].join('\n\n')};
$('flowImage').onchange=()=>load($('flowImage'),(i,n)=>{photo=i;photoName=n;photoSource='flow'});
}
draw();
function loadFont(){fontReady=false;const f=FONT;if($('fontStatus'))$('fontStatus').textContent='Cargando tipografía '+f+'…';return Promise.all([document.fonts.load('800 62px '+f),document.fonts.load('900 62px Montserrat'),document.fonts.load('italic 900 62px Montserrat'),document.fonts.load('900 62px Fraunces')]).then(rs=>{if(f!==FONT)return;fontReady=rs[0].length>0&&rs[1].length>0&&rs[2].length>0;if($('fontStatus'))$('fontStatus').textContent=fontReady?f+' cargada · exportación disponible.':'No se pudo cargar '+f+'; exportación bloqueada.';draw()}).catch(()=>{if($('fontStatus'))$('fontStatus').textContent='No se pudo cargar '+f+'; exportación bloqueada.'})}
const SUBS={manzano:'SUCURSAL EL MANZANO',express:'COTIZA OVIEDO EXPRESS',padel:'PADEL ROCKS RAPEL',alianza:'ALIANZA PADEL ROCKS RAPEL',feria:'FERIA FERRETERA'};
if($('plantilla'))$('plantilla').addEventListener('change',()=>{const v=$('plantilla').value,d=document.querySelector('details');if(d)d.open=v==='aprobado'||v==='conoce';if(v==='conoce'&&$('titulo').value==='TU PROYECTO EMPIEZA AQUÍ'){$('titulo').value='CONOCE NUESTRA';$('titulo2').value='FERRETERÍA'}else if(v!=='conoce'&&$('titulo').value==='CONOCE NUESTRA'&&$('titulo2').value==='FERRETERÍA'){$('titulo').value='TU PROYECTO EMPIEZA AQUÍ';$('titulo2').value=''}draw()});
if($('marca'))$('marca').onchange=()=>{const b=BRANDS[$('marca').value];if($('sub')&&Object.values(SUBS).includes($('sub').value))$('sub').value=SUBS[$('marca').value];FONT=b.font;BG=b.bg;if($('accent'))$('accent').value=b.accent;for(const k of ['wa','ig','dir','fb','web','pie','tema'])if($(k))$(k).value=b[k];draw();loadFont()};
loadFont();
{const im=new Image();im.onload=()=>{qrDefault=im;draw()};im.src='./assets/qr_canal_oviedo.png'}
