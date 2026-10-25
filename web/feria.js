// Plantilla "Feria Ferretera" estilo muestra (Claude): fondo negro con brochazos rojos, logo en placa oscura,
// cintas de brocha, placa blanca de título, foto sin recorte, barra de contacto, botón web y QR. Solo compone imágenes aportadas.
export function drawFeria(ctx,S){
const {W,H,T,I}=S,F='Montserrat',needs=[],errors=[],RED='#e1141e',DEEP='#8f0b12',k=H/1920;
const Y=v=>Math.round(v*k);
const font=(z,w=900,st='normal')=>st+' '+w+' '+z+'px '+F+', system-ui';
let seed=7;const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;
const fit=(s,maxW,z0,w,st)=>{let z=z0;ctx.font=font(z,w,st);while(ctx.measureText(s).width>maxW&&z>12){z-=2;ctx.font=font(z,w,st)}return z};
const txt=(s,x,y,z,col,o={})=>{ctx.font=font(z,o.w??900,o.st);ctx.fillStyle=col;ctx.textAlign=o.align??'left';ctx.textBaseline='middle';
if(o.sh){ctx.shadowColor='rgba(0,0,0,.55)';ctx.shadowBlur=o.sh;ctx.shadowOffsetY=o.sh/3}ctx.fillText(s,x,y);ctx.shadowColor='transparent';ctx.shadowBlur=0;ctx.shadowOffsetY=0};
const contain=(im,x,y,w,h)=>{const r=Math.min(w/im.width,h/im.height);ctx.drawImage(im,x+(w-im.width*r)/2,y+(h-im.height*r)/2,im.width*r,im.height*r)};
const brush=(x,y,w,h,skew,sd,c1,c2)=>{const g=ctx.createLinearGradient(x,0,x+w,0);g.addColorStop(0,c1);g.addColorStop(1,c2);ctx.fillStyle=g;ctx.beginPath();
const sp=[.9,.35,.8,.2,.95,.5,.7,.3],n=sp.length;ctx.moveTo(x+skew,y);
for(let i=0;i<n;i++){const t=i/(n-1);ctx.lineTo(x+skew*(1-t)-sp[(i+sd)%n]*26,y+h*t+(i%2?6:-4))}
ctx.lineTo(x+w*.5,y+h+4);for(let i=n-1;i>=0;i--){const t=i/(n-1);ctx.lineTo(x+w+skew*(1-t)+sp[(i+sd+3)%n]*26,y+h*t+(i%2?-6:4))}
ctx.lineTo(x+w*.5+skew,y-4);ctx.closePath();ctx.fill()};
const streaks=(y0,y1,n,a)=>{for(let i=0;i<n;i++){const y=y0+rnd()*(y1-y0),x=-80+rnd()*W,l=160+rnd()*520,t=2+rnd()*14,sk=40+rnd()*90;
ctx.fillStyle='rgba(225,20,30,'+(a*(.4+rnd()*.6))+')';ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+l,y-sk);ctx.lineTo(x+l+8,y-sk+t);ctx.lineTo(x+6,y+t);ctx.closePath();ctx.fill()}};
// fondo
ctx.fillStyle='#0b0b0c';ctx.fillRect(0,0,W,H);
for(const [yy,hh,sd] of [[0,Y(430),1],[Y(1640),Y(280),4]]){ctx.save();ctx.beginPath();ctx.rect(0,yy,W,hh);ctx.clip();
brush(-60,yy+hh*.1,W*.7,hh*.5,90,sd,RED,DEEP);brush(W*.35,yy+hh*.3,W*.8,hh*.55,-80,sd+2,DEEP,RED);streaks(yy,yy+hh,46,.8);ctx.restore()}
const vg=ctx.createLinearGradient(0,0,0,H);vg.addColorStop(0,'rgba(0,0,0,.15)');vg.addColorStop(.5,'rgba(0,0,0,.5)');vg.addColorStop(1,'rgba(0,0,0,.15)');ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);
// logo en placa oscura
const lw=540,lh=Y(250),lx=(W-lw)/2,ly=Y(120);
ctx.fillStyle='#0a0a0b';ctx.beginPath();ctx.roundRect(lx,ly,lw,lh,28);ctx.fill();
if(I.logo)contain(I.logo,lx+22,ly+16,lw-44,lh-32);else needs.push('Falta el logo blanco.');
// cinta SE VIENE LA
const ry=Y(430),rh=Y(170);ctx.save();ctx.translate(W/2,ry+rh/2);ctx.rotate(-.045);ctx.translate(-W/2,-(ry+rh/2));
brush(10,ry,W-20,rh,70,2,RED,DEEP);txt(T.kicker,W/2+6,ry+rh/2+4,fit(T.kicker,W-250,Y(135),900,'italic'),'#fff',{align:'center',st:'italic',sh:10});ctx.restore();
// placa blanca de título
const py=Y(640),ph=Y(190);ctx.fillStyle='#fff';ctx.beginPath();ctx.roundRect(24,py,W-48,ph,34);ctx.fill();
ctx.strokeStyle=RED;ctx.lineWidth=5;ctx.beginPath();ctx.roundRect(40,py+14,W-80,ph-28,26);ctx.stroke();
txt(T.t2,66,py+ph*.46,fit(T.t2,400,Y(150),900),RED,{st:'italic'});
const x2=520,w2=W-56-x2;txt(T.t1,x2,py+ph*.40,fit(T.t1,w2,Y(112),900),'#0b0b0c');
const sub=T.lugar+' '+T.year,zs=fit(sub,w2-130,Y(46),900);txt(sub,x2+w2/2,py+ph*.78,zs,'#0b0b0c',{align:'center'});
ctx.fillStyle='#0b0b0c';ctx.fillRect(x2,py+ph*.78-2,34,5);ctx.fillRect(x2+w2-34,py+ph*.78-2,34,5);
// foto principal sin recorte
const fy=py+ph+Y(8),fh=Y(500);ctx.fillStyle='#101012';ctx.fillRect(0,fy,W,fh);
if(I.photo){contain(I.photo,0,fy,W,fh);if(Math.max(I.photo.width,I.photo.height)<1400)needs.push('Foto principal de baja resolución.')}else needs.push('Carga la foto principal (fachada).');
// cinta MUY PRONTO
const my=fy+fh+Y(20),mh=Y(160);ctx.save();ctx.translate(W/2,my+mh/2);ctx.rotate(-.035);ctx.translate(-W/2,-(my+mh/2));
brush(14,my,W-28,mh,60,5,RED,DEEP);txt(T.pronto,W/2+4,my+mh/2+4,fit(T.pronto,W-200,Y(84),900,'italic'),'#fff',{align:'center',st:'italic',sh:10});ctx.restore();
// barra de contacto
const by=my+mh+Y(40),bh=Y(120);ctx.fillStyle='#0a0a0b';ctx.fillRect(0,by,W,bh);ctx.fillStyle=RED;ctx.fillRect(0,by,W,4);ctx.fillRect(0,by+bh-4,W,4);
const ic=(n,x,s)=>{if(I.icons&&I.icons[n])contain(I.icons[n],x,by+(bh-s)/2,s,s);else needs.push('Falta icono '+n+'.')};
ic('ubicacion',30,Y(76));txt('SUCURSAL EL MANZANO',112,by+bh*.34,fit('SUCURSAL EL MANZANO',290,Y(30),900),'#fff');txt(T.dir,112,by+bh*.68,fit(T.dir,300,Y(24),600),'#e8e8e8',{w:600});
ctx.fillStyle='rgba(255,255,255,.35)';ctx.fillRect(432,by+16,3,bh-32);ctx.fillRect(752,by+16,3,bh-32);
ic('whatsapp',456,Y(70));txt(T.wa,540,by+bh/2,fit(T.wa,200,Y(32),900),'#fff');
ic('instagram',772,Y(70));txt(T.ig,856,by+bh/2,fit(T.ig,200,Y(26),700),'#fff',{w:700});
// base: facebook + canal, botón web, QR
const wy=by+bh+Y(40),wh=Y(80),ww=380,wx=(W-ww)/2;
ctx.fillStyle=RED;ctx.beginPath();ctx.roundRect(wx,wy,ww,wh,wh/2);ctx.fill();
ctx.strokeStyle='#fff';ctx.lineWidth=3;const gx=wx+52,gy=wy+wh/2,gr=wh*.28;ctx.beginPath();ctx.arc(gx,gy,gr,0,6.2832);ctx.moveTo(gx-gr,gy);ctx.lineTo(gx+gr,gy);ctx.moveTo(gx,gy-gr);ctx.lineTo(gx,gy+gr);ctx.ellipse(gx,gy,gr*.45,gr,0,0,6.2832);ctx.stroke();
txt(T.web,wx+92,wy+wh/2+2,fit(T.web,ww-120,Y(38),900),'#fff');
for(const [n,x] of [['facebook',40],['canal',40+Y(92)]]){ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(x+Y(36),wy+wh/2,Y(38),0,6.2832);ctx.fill();if(I.icons&&I.icons[n])contain(I.icons[n],x+Y(8),wy+wh/2-Y(28),Y(56),Y(56));else needs.push('Falta icono '+n+'.')}
const qs=Y(140);ctx.fillStyle='#fff';ctx.fillRect(W-40-qs,wy+wh/2-qs/2,qs,qs);if(I.qr)contain(I.qr,W-40-qs+6,wy+wh/2-qs/2+6,qs-12,qs-12);else needs.push('Falta el QR.');
return {needs,errors};
}
