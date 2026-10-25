// Plantilla "Feria" (V4, Claude): fondo oscuro, logo blanco, título medido por tinta, fachada/foto sin recortar (contain),
// foto B pequeña + "MUY PRONTO", QR y 5 iconos de redes. Solo compone imágenes aportadas; no regenera nada.
export function drawFeria(ctx,S){
const {W,H,T,I}=S,F='Montserrat',needs=[],errors=[],ROJO='#d71920',BL='#fff',GR='#c9c9c9',k=H/1920;
const font=(z,w=900)=>w+' '+z+'px '+F+', system-ui';
const ink=(s,x,base,z,col,o={})=>{ctx.font=font(z,o.w);ctx.letterSpacing=(o.sp||0)+'px';const m=ctx.measureText(s);ctx.fillStyle=col;ctx.textBaseline='alphabetic';ctx.textAlign='left';
const px=o.right?o.right-(m.actualBoundingBoxLeft+m.actualBoundingBoxRight)+m.actualBoundingBoxLeft:x+m.actualBoundingBoxLeft;ctx.fillText(s,px,base);ctx.letterSpacing='0px';return {w:m.actualBoundingBoxLeft+m.actualBoundingBoxRight,a:m.actualBoundingBoxAscent}};
const fit=(s,maxW,z0,w)=>{let z=z0;ctx.font=font(z,w);let m=ctx.measureText(s);while(m.actualBoundingBoxLeft+m.actualBoundingBoxRight>maxW&&z>12){z-=2;ctx.font=font(z,w);m=ctx.measureText(s)}return z};
const contain=(im,x,y,w,h)=>{const r=Math.min(w/im.width,h/im.height);ctx.drawImage(im,x+(w-im.width*r)/2,y+(h-im.height*r)/2,im.width*r,im.height*r)};
const Y=v=>Math.round(v*k);
ctx.fillStyle='#1b1b1d';ctx.fillRect(0,0,W,H);
ctx.fillStyle='rgba(255,255,255,.035)';for(let y=0;y<H;y+=6)ctx.fillRect(0,y,W,1);
// cabecera: logo blanco + sucursal
if(I.logo)contain(I.logo,60,Y(250),294,Y(118));else needs.push('Falta el logo blanco.');
ink(T.tag,0,Y(309)+10,fit(T.tag,520,30,700),BL,{w:700,sp:1.8,right:1020});
ctx.fillStyle=ROJO;ctx.fillRect(60,Y(392),960,6);
ink(T.kicker,60,Y(429)+30,42,GR,{w:800,sp:1.7});
// título: FERRETERA ancho completo, FERIA + 2026 + lugar
const z1=fit(T.t1,960,260,900),a=ink(T.t1,60,Y(846),z1,ROJO);const baseF=Y(846)-a.a-24;
const z2=Math.max(60,Math.min(fit(T.t2,430,400,900),Math.round((baseF-Y(478))*1.35)));
const b=ink(T.t2,60,baseF,z2,BL);const xs=60+b.w+28;
const z3=Math.round(z2*.55),c3=ink(T.year,xs,baseF,z3,ROJO);
ink(T.lugar,xs,baseF-c3.a-16,fit(T.lugar,1020-xs,44,800),BL,{w:800});
// foto principal sin recortar
ctx.fillStyle=ROJO;ctx.fillRect(0,Y(866),W,8);const py=Y(874),ph=Y(499);
ctx.fillStyle='#101012';ctx.fillRect(0,py,W,ph);
if(I.photo){contain(I.photo,0,py,W,ph);if(Math.max(I.photo.width,I.photo.height)<1400)needs.push('Foto principal de baja resolución.')}else needs.push('Carga la foto principal (fachada).');
ctx.fillStyle=ROJO;ctx.fillRect(0,py+ph,W,8);
// módulo inferior
const my=Y(1402);
ctx.fillStyle=BL;ctx.fillRect(60,my,116,Y(152));if(I.photoB)contain(I.photoB,64,my+4,108,Y(144));
ink('MUY PRONTO,',200,Y(1466),54,BL,{w:900});ink('MÁS INFORMACIÓN',200,Y(1526),54,ROJO,{w:900});
ctx.fillStyle=BL;ctx.fillRect(872,my+2,148,148);if(I.qr)contain(I.qr,878,my+8,136,136);else needs.push('Falta el QR.');
const keys=['instagram','facebook','whatsapp','canal','ubicacion'];
keys.forEach((n,i)=>{const cx=96+i*88,cy=Y(1610);ctx.fillStyle=BL;ctx.beginPath();ctx.arc(cx,cy,36,0,6.2832);ctx.fill();if(I.icons&&I.icons[n])contain(I.icons[n],cx-30,cy-30,60,60);else needs.push('Falta icono '+n+'.')});
ink(T.wa,540,Y(1590),22,BL,{w:700});ink(T.dir,540,Y(1618),22,BL,{w:700});ink(T.web,540,Y(1646),22,GR,{w:700});
return {needs,errors};
}
