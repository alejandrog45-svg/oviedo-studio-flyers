// Plantilla "Aprobado": estructura de los flyers aprobados (cabecera, hero con corte diagonal, marcas, contacto, redes, QR).
// Solo compone imágenes originales aportadas por el usuario; no genera ni altera logos, fotos ni íconos.
const ORDER=['perfimet','odis','soquina','weber','san.?juan','hyundai','dewalt','sika','volcan','schneider','mts','femoglas','hoffens'];
export const THEMES={
rojo:{top:'#f4252f',b1:'#e1141e',b2:'#9e0c14',t2:'#ffffff',pre:'#ffffff',strip:'#e1141e',band1:'#e1141e',band2:'#9e0c14',rib1:'#e1141e',rib2:'#9e0c14',hl:'#e1141e',lines:'rgba(255,255,255,.06)',dark:'#0e0e10'},
negro:{top:'#2a2b31',b1:'#1b1c20',b2:'#060607',t2:'#ee2b36',pre:'#ffffff',strip:'#e1141e',band1:'#e1141e',band2:'#9e0c14',rib1:'#e1141e',rib2:'#9e0c14',hl:'#ee2b36',lines:'rgba(255,255,255,.05)',dark:'#0e0e10'},
verde:{top:'#1d7e4d',b1:'#14693f',b2:'#0b3d26',t2:'#f6a8c4',pre:'#f6a8c4',strip:'#f6a8c4',band1:'#14693f',band2:'#0b3d26',rib1:'#e1141e',rib2:'#9e0c14',hl:'#f6a8c4',lines:'rgba(255,255,255,.06)',dark:'#0b1f16'}};
export const rank=name=>{const n=name.toLowerCase(),i=ORDER.findIndex(k=>new RegExp(k).test(n));return i<0?99:i};
export const iconKey=name=>{const n=name.toLowerCase();if(/canal/.test(n))return'canal';if(/whatsapp/.test(n))return'whatsapp';if(/insta/.test(n))return'instagram';if(/face|fb/.test(n))return'facebook';if(/ubic|pin|mapa|location/.test(n))return'ubicacion';return null};
export function drawApproved(ctx,S){
const {W,H,story,T,I,O}=S,th=THEMES[S.tema]||THEMES.rojo,F='Montserrat',needs=[],errors=[];
const R=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(x,y,w,h)};
const RR=(x,y,w,h,r,c)=>{ctx.fillStyle=c;ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill()};
const font=(z,w=800,st='normal',fam=F)=>st+' '+w+' '+z+'px '+fam+', system-ui';
const measure=(s,z,w,st,sp,fam)=>{ctx.font=font(z,w,st,fam);ctx.letterSpacing=sp+'px';const m=ctx.measureText(s).width;ctx.letterSpacing='0px';return m};
const txt=(s,x,y,size,color,o={})=>{if(!s)return 0;const w=o.weight??800,st=o.style??'normal',sp=o.sp??0,fam=o.fam??F;let z=size;
if(o.maxW){const mn=o.min??18;while(measure(s,z,w,st,sp,fam)>o.maxW&&z>mn)z-=2;if(measure(s,z,w,st,sp,fam)>o.maxW)errors.push('Texto demasiado largo («'+s.slice(0,24)+'»): acórtalo.')}
ctx.font=font(z,w,st,fam);ctx.letterSpacing=sp+'px';ctx.fillStyle=color;if(o.shadow){ctx.shadowColor='rgba(0,0,0,.38)';ctx.shadowBlur=o.shadow;ctx.shadowOffsetY=Math.max(2,o.shadow/3)}ctx.textAlign=o.align??'left';ctx.textBaseline='top';ctx.fillText(s,x,y);ctx.shadowColor='transparent';ctx.shadowBlur=0;ctx.shadowOffsetY=0;ctx.letterSpacing='0px';return z};
const contain=(im,x,y,w,h,pos=.5,sc=1)=>{const k=Math.min(w/im.width,h/im.height)*sc;ctx.drawImage(im,x+(w-im.width*k)/2,y+(h-im.height*k)*pos,im.width*k,im.height*k)};
const cover=(im,x,y,w,h,pos=.5)=>{const k=Math.max(w/im.width,h/im.height);ctx.drawImage(im,x+(w-im.width*k)/2,y+(h-im.height*k)*pos,im.width*k,im.height*k)};
const hdrH=story?470:380,socH=story?432:330,conH=story?150:132,marH=story&&O.showMarcas?262:0,stripH=story?58:46;
const heroBot=H-socH-conH-marH-stripH,conY=heroBot+stripH+marH,socY=conY+conH;
// fondo y rayas
ctx.fillStyle=th.b2;ctx.fillRect(0,0,W,H);const g=ctx.createLinearGradient(0,0,W*.35,hdrH+40);g.addColorStop(0,th.top);g.addColorStop(.55,th.b1);g.addColorStop(1,th.b2);ctx.fillStyle=g;ctx.fillRect(0,0,W,hdrH+40);
ctx.save();ctx.beginPath();ctx.rect(0,0,W,hdrH+20);ctx.clip();ctx.strokeStyle=th.lines;ctx.lineWidth=3;for(let x=-hdrH;x<W+hdrH;x+=18){ctx.beginPath();ctx.moveTo(x,hdrH+20);ctx.lineTo(x+(hdrH+20)*.7,0);ctx.stroke()}ctx.restore();
// cabecera (se escala sola si el contenido no cabe)
let t1=T.t1,t2=T.t2;if(t1&&!t2){const w=t1.split(/\s+/);if(w.length>=3){let best=1,bd=1e9;for(let q=1;q<w.length;q++){const d=Math.abs(w.slice(0,q).join(' ').length-w.slice(q).join(' ').length);if(d<bd){bd=d;best=q}}t1=w.slice(0,best).join(' ');t2=w.slice(best).join(' ')}}
const pill=I.aliados.length>=2,B={logo:story?112:84,gap:story?22:14,ph:story?84:70,pre:story?44:38,s1:story?82:66,s2:story?90:74};
const need=B.logo+B.gap+(pill?B.ph+14:0)+(T.pre?B.pre:0)+(t1?B.s1*1.08:0)+(t2?B.s2*1.05:0),k=Math.min(1,(hdrH-(story?34:26)-(story?46:40))/need);
let y=story?34:26;const logoH=B.logo*k;
if(I.logo)contain(I.logo,(W-440*k)/2,y,440*k,logoH,.5,O.logoScale);else needs.push('Falta logo oficial.');
y+=logoH+B.gap*k;
if(pill){const ph=B.ph*k,pw=620*k,px=(W-pw)/2,tx=px+(290*k)+ph+6;RR(px,y,pw,ph,ph/2,'#ffffff');contain(I.aliados[0],px+26*k,y+8*k,250*k,ph-16*k);contain(I.aliados[1],px+290*k,y+6*k,ph-12*k,ph-12*k);
txt('ALIANZA',tx,y+ph*.2,15*k,'#c0507a',{weight:800,sp:3,min:10});txt('Padel Rocks Rapel',tx,y+ph*.2+20*k,28*k,'#0b3d26',{weight:900,fam:'Fraunces',maxW:px+pw-tx-20,min:14});y+=ph+14*k}
if(T.pre){txt(T.pre,W/2,y,(story?25:22)*Math.max(k,.85),th.pre,{align:'center',weight:800,sp:7,maxW:W-70});y+=B.pre*k}
const z1=txt(t1,W/2,y,B.s1*k,'#ffffff',{align:'center',weight:900,maxW:W-60,shadow:14});y+=z1?z1*1.06:0;
if(t2){const z2=txt(t2,W/2,y,B.s2*k,th.t2,{align:'center',weight:900,maxW:W-60,shadow:14});y+=z2*1.05}
// zona inferior oscura + hero + franja
R(0,heroBot-26,W,stripH+26,th.dark);
ctx.save();ctx.beginPath();ctx.moveTo(0,hdrH+16);ctx.lineTo(W,hdrH-14);ctx.lineTo(W,heroBot-24);ctx.lineTo(0,heroBot);ctx.closePath();ctx.clip();R(0,hdrH-14,W,heroBot-hdrH+14,'#0b0b0d');
if(I.photo){const ht=hdrH-14,hh=heroBot-ht,kc=Math.max(W/I.photo.width,hh/I.photo.height),vis=(W/(I.photo.width*kc))*(hh/(I.photo.height*kc)),zm=(O.zoom||100)/100;if(O.cover||vis>=.85||zm>1){const k=kc*zm;ctx.drawImage(I.photo,(W-I.photo.width*k)*(O.focoX??.5),ht+(hh-I.photo.height*k)*O.photoY,I.photo.width*k,I.photo.height*k)}else{ctx.save();ctx.filter='blur(22px)';cover(I.photo,-30,ht-30,W+60,hh+60,.5);ctx.filter='none';R(0,ht,W,hh,'rgba(0,0,0,.45)');ctx.restore();contain(I.photo,0,ht,W,hh,O.photoY,O.photoScale)}}else{txt('Carga una fotografía original',W/2,(hdrH+heroBot)/2-14,30,'#8b929e',{align:'center'})}ctx.restore();
ctx.fillStyle=th.strip;ctx.beginPath();ctx.moveTo(0,heroBot+26);ctx.lineTo(W,heroBot);ctx.lineTo(W,heroBot+stripH);ctx.lineTo(0,heroBot+stripH);ctx.closePath();ctx.fill();
// cinta inclinada
if(T.ribbon){const rh=story?58:50,rz=story?26:22,tw=measure(T.ribbon,rz,900,'italic',1.5,F),rw=Math.min(W-60,tw+100),rx=(W-rw)/2,ry=hdrH-rh/2-4,dx=rh*.25;
ctx.save();ctx.translate(W/2,ry+rh/2);ctx.rotate(-.03);ctx.translate(-W/2,-(ry+rh/2));ctx.shadowColor='rgba(0,0,0,.55)';ctx.shadowBlur=16;ctx.shadowOffsetY=6;
const rg=ctx.createLinearGradient(rx,0,rx+rw,0);rg.addColorStop(0,th.rib1);rg.addColorStop(1,th.rib2);ctx.fillStyle=rg;ctx.beginPath();ctx.moveTo(rx+dx,ry);ctx.lineTo(rx+rw,ry);ctx.lineTo(rx+rw-dx,ry+rh);ctx.lineTo(rx,ry+rh);ctx.closePath();ctx.fill();ctx.shadowColor='transparent';
txt(T.ribbon,W/2,ry+(rh-rz)/2+1,rz,'#ffffff',{align:'center',weight:900,style:'italic',sp:1.5,maxW:rw-110});ctx.restore()}
// marcas
if(marH){const my=heroBot+stripH;R(0,my,W,marH,'#ffffff');const dm=th.strip==='#f6a8c4'?'#e1141e':th.strip,mt=measure('MARCAS CONFIRMADAS',26,800,'normal',4,F);txt('MARCAS CONFIRMADAS',W/2+2,my+22,26,'#1b1b1f',{align:'center',weight:800,sp:4});txt('◆',W/2-mt/2-30,my+22,24,dm,{align:'center'});txt('◆',W/2+mt/2+34,my+22,24,dm,{align:'center'});
const cw=(W-60)/7,bh=76,rows=[I.marcas.slice(0,7),I.marcas.slice(7,13)];rows.forEach((row,r)=>{const x0=(W-row.length*cw)/2;row.forEach((im,i)=>contain(im,x0+i*cw+10,my+72+r*(bh+16),cw-20,bh))});
if(I.marcas.length<13)needs.push('Faltan logos de marcas confirmadas ('+I.marcas.length+'/13).')}
// contacto
const cg=ctx.createLinearGradient(0,0,W,0);cg.addColorStop(0,th.band1);cg.addColorStop(1,th.band2);ctx.fillStyle=cg;ctx.fillRect(0,conY,W,conH);
const cy=conY+conH/2,ic=story?64:56;
RR(36,cy-ic/2,ic,ic,ic/2,'#ffffff');if(I.icons.ubicacion)contain(I.icons.ubicacion,36,cy-ic/2,ic,ic);else{ctx.fillStyle=th.band1;ctx.beginPath();ctx.arc(36+ic/2,cy-6,13,0,7);ctx.fill();ctx.beginPath();ctx.moveTo(36+ic/2-10,cy+2);ctx.lineTo(36+ic/2+10,cy+2);ctx.lineTo(36+ic/2,cy+22);ctx.fill();RR(36+ic/2-5,cy-11,10,10,5,'#fff')}

txt(T.lugar,36+ic+16,cy-30,story?27:23,'#ffffff',{weight:900,maxW:(String(T.wa||'').includes('·')?335:385)});txt(T.dir,36+ic+16,cy+4,story?20:18,'#ffffff',{weight:600,maxW:(String(T.wa||'').includes('·')?335:385)});
const nums=String(T.wa||'').split('·').map(t=>t.trim()).filter(Boolean),two=nums.length>1,tmax=two?335:385,wx=two?(story?462:452):(story?535:520);
const wa=(x,num,label,w,ics)=>{if(I.icons.whatsapp)contain(I.icons.whatsapp,x,cy-ics/2,ics,ics);else if(!needs.includes('Falta ícono original de WhatsApp.'))needs.push('Falta ícono original de WhatsApp.');txt(num,x+ics+10,cy-26,story?29:26,'#ffffff',{weight:900,maxW:w});txt(label,x+ics+10,cy+10,story?19:17,'#ffffff',{weight:700,maxW:w,min:13})};
if(two){const cw=(W-36-wx)/2,ics=story?56:50;wa(wx,nums[0],T.waLabel,cw-ics-20,ics);wa(wx+cw,nums[1],T.wa2Label||'',cw-ics-20,ics)}else wa(wx,nums[0]||'',T.waLabel,W-36-(wx+ic+10)-(T.web?190:0),ic);
if(T.web&&!two){txt('MÁS INFORMACIÓN',W-36,cy-24,17,'#ffffff',{align:'right',weight:700});txt(T.web,W-36,cy,story?27:23,'#ffffff',{align:'right',weight:900,maxW:210})}
// redes
const sg=ctx.createLinearGradient(0,socY,0,H);sg.addColorStop(0,'#141416');sg.addColorStop(1,'#060607');ctx.fillStyle=sg;ctx.fillRect(0,socY,W,socH);
{const parts=[['SÍGUENOS Y SÉ ','#ffffff'],['EL PRIMERO','#'+(th.hl.slice(1))],[' EN ENTERARTE','#ffffff']],z=story?30:26;let tw=0;parts.forEach(p=>tw+=measure(p[0],z,800,'normal',1.5,F));let x=(W-tw)/2;parts.forEach(p=>{txt(p[0],x,socY+(story?28:22),z,p[1],{weight:800,sp:1.5});x+=measure(p[0],z,800,'normal',1.5,F)})}
const items=[{k:'instagram',t:'Instagram',s:T.ig},T.fb?{k:'facebook',t:'Facebook',s:T.fb}:null,{k:'canal',t:'Canal WhatsApp',s:'Ferreterías Oviedo'}].filter(Boolean);
const isz=story?88:70,iy=socY+(story?92:76);items.forEach((it,i)=>{const cx=40+780*(i+.5)/items.length;if(I.icons[it.k])contain(I.icons[it.k],cx-isz/2,iy,isz,isz);else needs.push('Falta ícono original de '+it.t+'.');
txt(it.t,cx,iy+isz+10,story?25:22,'#ffffff',{align:'center',weight:800,maxW:230});txt(it.s,cx,iy+isz+(story?42:36),story?19:17,'#d9dce1',{align:'center',weight:600,maxW:230})});
const qw=214,qh=story?258:240,qx=W-36-qw,qy=socY+(story?70:56);
if(I.qr){RR(qx,qy,qw,qh,22,'#ffffff');if(Math.abs(I.qr.width/I.qr.height-1)<.05){contain(I.qr,qx+10,qy+10,qw-20,qw-20);RR(qx+8,qy+qw-4,qw-16,38,8,th.band1);txt('¡SÍGUELO!',qx+qw/2,qy+qw+6,22,'#ffffff',{align:'center',weight:900,style:'italic'})}else contain(I.qr,qx,qy,qw,qh)}else if(O.qrGen){O.qrGen(W-36,qy+qh+24,th.band1)}
if(T.pie)txt(T.pie,420,H-(story?64:46),story?18:16,'#e6e6e6',{align:'center',weight:600,maxW:780,min:12});
return {needs,errors};
}
