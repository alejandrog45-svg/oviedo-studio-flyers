// Selector de Drive del proyecto: SOLO LECTURA y SOLO las carpetas listadas abajo.
// El token vive únicamente en memoria; nada se guarda ni se envía a otro servidor. Los archivos se cargan en los
// mismos campos del editor (input file), así que toda la lógica de calidad existente se aplica igual.
import {DRIVE_CLIENT_ID} from './drive-config.js';
const $=id=>document.getElementById(id);
const FOLDERS=[['Fotos','1ZFwyaT7MSvlyotrB0GX07UBJeZ115Lcx'],['Logos oficiales','1YcLvMemWGlzNPR7QbwSdyRhMVbMC8HoC'],['Marcas confirmadas','1eZHDXMqrywmzSTo210r-vYj681jZjSz_'],['Íconos y QR','1SBA3M-NxlnryYjBiT0FOQMeSkH1JdFLN'],['Aprobados','1oy_I6cIzcLvQfm5qioH7a2DgiwZFaIJE'],['Raíz del proyecto','1skgd6eeBI57Mfp3cmEm18IRCbkTzP70h']];
const DEST=[['foto','Foto principal',0],['logo','Logo blanco',0],['logoNegro','Logo negro',0],['banner','Banner Oviedo Expréss',0],['producto','Foto de producto',0],['categorias','Fotos de categorías (en orden)',1],['marcas','Logos de marcas',1],['iconos','Íconos',1],['aliados','Aliados (1 o 2 logos)',1],['qrImg','QR del Canal',0]];
const SCOPE='https://www.googleapis.com/auth/drive.readonly',API='https://www.googleapis.com/drive/v3/files';
let token=null,client=null,lista=[];
window.driveOrigen=null;
const estado=t=>{$('driveEstado').textContent=t};
const sel=$('driveCarpeta'),dst=$('driveDestino'),box=$('driveLista');
if(sel&&dst){
FOLDERS.forEach(([n,id])=>sel.add(new Option(n,id)));DEST.forEach(([k,n])=>dst.add(new Option(n,k)));
const ok=!!DRIVE_CLIENT_ID;
$('driveConectar').disabled=!ok;
estado(ok?'Sin conectar. Pulsa «Conectar con Google» (solo lectura).':'NO CONECTADO: falta el Client ID de Google (web/drive-config.js). Ver docs/DRIVE_SELECTOR.md.');
const auth=()=>({headers:{Authorization:'Bearer '+token}});
const caducado=r=>{if(r.status===401||r.status===403){token=null;estado('Sesión de Drive caducada o sin permiso ('+r.status+'). Vuelve a conectar.');return true}return false};
const cargarGIS=()=>new Promise((res,rej)=>{if(window.google?.accounts?.oauth2)return res();const s=document.createElement('script');s.src='https://accounts.google.com/gsi/client';s.async=true;s.onload=res;s.onerror=()=>rej(new Error('No se pudo cargar Google Identity Services'));document.head.appendChild(s)});
async function listar(){if(!token)return estado('Primero conecta con Google.');estado('Listando…');box.textContent='';lista=[];
try{const q=encodeURIComponent(`'${sel.value}' in parents and trashed=false and mimeType contains 'image/'`);const r=await fetch(`${API}?q=${q}&fields=files(id,name,mimeType,size)&pageSize=200&orderBy=name&supportsAllDrives=false`,auth());if(caducado(r))return;if(!r.ok)throw Error('Drive HTTP '+r.status);lista=(await r.json()).files||[];
if(!lista.length){estado('Carpeta sin imágenes.');return}
lista.forEach((f,i)=>{const l=document.createElement('label');l.className='guide-toggle';const c=document.createElement('input');c.type='checkbox';c.value=i;l.append(c,document.createTextNode(' '+f.name+' ('+Math.round((f.size||0)/1024)+' kB)'));box.appendChild(l)});
estado(lista.length+' imagen(es). Marca las que quieras y elige el destino.')}catch(e){estado('Error al listar: '+e.message)}}
async function usar(){if(!token)return estado('Primero conecta con Google.');const idx=[...box.querySelectorAll('input:checked')].map(c=>lista[+c.value]);if(!idx.length)return estado('Marca al menos un archivo.');
const d=DEST.find(x=>x[0]===dst.value),inp=$(d[0]);if(!inp)return estado('Ese campo no existe en el editor.');if(!d[2]&&idx.length>1)return estado('«'+d[1]+'» admite un solo archivo.');
estado('Descargando '+idx.length+' archivo(s)…');
try{const dt=new DataTransfer();for(const f of idx){const r=await fetch(`${API}/${f.id}?alt=media`,auth());if(caducado(r))return;if(!r.ok)throw Error(f.name+': Drive HTTP '+r.status);const b=await r.blob();dt.items.add(new File([b],f.name,{type:b.type||f.mimeType}))}
inp.files=dt.files;inp.dispatchEvent(new Event('change',{bubbles:true}));
window.driveOrigen=window.driveOrigen||{};window.driveOrigen[d[0]]=idx.map(f=>({fileId:f.id,nombre:f.name,carpeta:sel.selectedOptions[0].text}));
estado('Cargado en «'+d[1]+'»: '+idx.map(f=>f.name).join(', ')+'. Origen Drive/fileId se registrará en la ficha QA.')}catch(e){estado('Error al descargar: '+e.message)}}
$('driveConectar').onclick=async()=>{try{estado('Abriendo autorización de Google…');await cargarGIS();client=client||google.accounts.oauth2.initTokenClient({client_id:DRIVE_CLIENT_ID,scope:SCOPE,callback:r=>{if(r.error){estado('Autorización rechazada: '+r.error);return}token=r.access_token;estado('Conectado (solo lectura).');listar()}});client.requestAccessToken()}catch(e){estado('Error: '+e.message)}};
$('driveListar').onclick=listar;$('driveUsar').onclick=usar;sel.onchange=()=>{box.textContent='';lista=[];if(token)listar()};
}
