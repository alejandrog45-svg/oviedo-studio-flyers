// Plantilla "Conoce nuestra ferretería": foto interior a sangre, logo en placa, cinta de lema, título grande,
// 4 categorías en círculos con fotos reales, onda roja y barra de contacto. Solo compone imágenes aportadas.
export function drawConoce(ctx,S){
const {W,H,story,T,I,O}=S,F='Montserrat',needs=[],errors=[],red='#e1141e',deep='#9e0c14';
const font=(z,w=800,st='normal')=>st+' '+w+' '+z+'px '+F+', system-ui';
const measure=(s,z,w,st,sp)=>{ctx.font=font(z,w,st);ctx.letterSpacing=(sp||0)+'px';const m=ctx.measureText(s).width;ctx.letterSpacing='0px';return m};
const txt=(s,x,y,size,color,o={})=>{if(!s)return 0;const w=o.weight??800,st=o.style??'normal',sp=o.sp??0;let z=size;
if(o.maxW){const mn=o.min??16;while(measure(s,z,w,st,sp)>o.maxW&&z>mn)z-=2;if(measure(s,z,w,st,sp)>o.maxW)errors.push('Texto demasiado largo («'+s.slice(0,24)+'»): acórtalo.')}
ctx.font=font(z,w,st);ctx.letterSpacing=sp+'px';ctx.fillStyle=color;ctx.textAlign=o.align??'left';ctx.textBaseline='top';
if(o.shadow){ctx.shadowColor='rgba(0,0,0,.45)';ctx.shadowBlur=o.shadow;ctx.shadowOffsetY=Math.max(2,o.shadow/3)}
ctx.fillText(s,x,y);ctx.shadowColor='transparent';ctx.shadowBlur=0;ctx.shadowOffsetY=0;ctx.letterSpacing='0px';return z};
const RR=(x,y,w,h,r,c)=>{ctx.fillStyle=c;ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill()};
const contain=(im,x,y,w,h)=>{const k=Math.min(w/im.width,h/im.height);ctx.drawImage(im,x+(w-im.width*k)/2,y+(h-im.height*k)/2,im.width*k,im.height*k)};
const cover=(im,x,y,w,h,fx=.5,fy=.5,zoom=1)=>{const k=Math.max(w/im.width,h/im.height)*zoom;ctx.drawImage(im,x+(w-im.width*k)*fx,y+(h-im.height*k)*fy,im.width*k,im.height*k)};
// brocha: paralelogramo con extremos irregulares
const brush=(x,y,w,h,skew,seed,c1,c2)=>{const g=ctx.createLinearGradient(x,0,x+w,0);g.addColorStop(0,c1);g.addColorStop(1,c2);ctx.fillStyle=g;ctx.beginPath();
const sp=[.9,.35,.8,.2,.95,.5,.7,.3],n=sp.length;ctx.moveTo(x+skew,y);
for(let i=0;i<n;i++){const t=i/(n-1);ctx.lineTo(x+skew*(1-t)-sp[(i+seed)%n]*26,y+h*t+(i%2?6:-4))}
ctx.lineTo(x+w*.5,y+h+4);for(let i=n-1;i>=0;i--){const t=i/(n-1);ctx.lineTo(x+w+skew*(1-t)+sp[(i+seed+3)%n]*26,y+h*t+(i%2?-6:4))}
ctx.lineTo(x+w*.5+skew,y-4);ctx.closePath();ctx.fill()};
const fy=v=>Math.round(H*v);
// foto a sangre + degradados
const heroH=fy(story?.62:.62);
ctx.fillStyle='#0a0a0b';ctx.fillRect(0,0,W,H);
if(I.photo){ctx.save();ctx.beginPath();ctx.rect(0,0,W,heroH);ctx.clip();ctx.filter='brightness(1.07) contrast(1.06) saturate(1.1)';cover(I.photo,0,0,W,heroH,O.focoX,O.photoY,Math.max(1,O.zoom/100));ctx.filter='none';ctx.restore()}else{ctx.fillStyle='#20242b';ctx.fillRect(0,0,W,heroH);txt('Carga una fotografía original',W/2,heroH/2-14,30,'#8b929e',{align:'center'});needs.push('Falta foto original.')}
let g=ctx.createLinearGradient(0,0,0,fy(.2));g.addColorStop(0,'rgba(0,0,0,.55)');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(0,0,W,fy(.2));
g=ctx.createLinearGradient(0,fy(.38),0,heroH+fy(.04));g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(.7,'rgba(8,8,9,.88)');g.addColorStop(1,'#0a0a0b');ctx.fillStyle=g;ctx.fillRect(0,fy(.38),W,heroH-fy(.38)+fy(.04));
// placa de logo + etiqueta de sucursal
const px=40,py=story?56:40,pw=story?430:380,ph=story?150:130;
ctx.save();ctx.shadowColor='rgba(0,0,0,.4)';ctx.shadowBlur=18;ctx.shadowOffsetY=6;RR(px,py,pw,ph,10,'#ffffff');ctx.restore();
if(I.logo)contain(I.logo,px+16,py+10,pw-32,ph-20);else needs.push('Falta el logo negro para la placa blanca.');
RR(px,py+ph,pw,story?64:54,0,red);txt(T.tag,px+pw/2,py+ph+(story?9:7),story?42:36,'#ffffff',{align:'center',weight:900,sp:1,maxW:pw-30});
// lema en cinta de brocha (arriba derecha)
if(T.lema){const words=T.lema.split(/\s+/),mid=Math.ceil(words.length/2),l1=words.slice(0,mid).join(' '),l2=words.slice(mid).join(' '),bw=story?440:380,bh=story?190:160,bx=W-bw-34,by=story?60:46;
ctx.save();ctx.translate(bx+bw/2,by+bh/2);ctx.rotate(-.12);ctx.translate(-(bx+bw/2),-(by+bh/2));ctx.shadowColor='rgba(0,0,0,.5)';ctx.shadowBlur=18;ctx.shadowOffsetY=8;brush(bx,by,bw,bh,38,1,red,deep);ctx.shadowColor='transparent';
txt(l1,bx+bw/2+8,by+bh*.12,story?64:54,'#ffffff',{align:'center',weight:900,style:'italic',maxW:bw-70,shadow:8});txt(l2,bx+bw/2-6,by+bh*.5,story?64:54,'#ffffff',{align:'center',weight:900,style:'italic',maxW:bw-70,shadow:8});ctx.restore()}
// título: banda "CONOCE NUESTRA" + gigante "FERRETERÍA"
const bandY=fy(story?.527:.512),bandH=story?112:86;
ctx.save();ctx.shadowColor='rgba(0,0,0,.55)';ctx.shadowBlur=20;ctx.shadowOffsetY=8;brush(70,bandY,W-140,bandH,36,3,red,deep);ctx.restore();
txt(T.t1,W/2,bandY+(bandH-(story?66:52))/2,story?66:52,'#ffffff',{align:'center',weight:900,style:'italic',maxW:W-290,shadow:6});
const tz=story?210:150,ty=bandY+bandH+(story?4:2);
const z2=txt(T.t2,W/2,ty,tz,'#ffffff',{align:'center',weight:900,maxW:W-90,shadow:22,min:60});
const sw=ty+z2*1.02;ctx.fillStyle=red;ctx.beginPath();ctx.moveTo(90,sw+6);ctx.quadraticCurveTo(W/2,sw-30,W-80,sw+8);ctx.quadraticCurveTo(W/2,sw+26,90,sw+16);ctx.closePath();ctx.fill();
// categorías en círculos
const cr=story?78:60,cy=fy(story?.765:.755)+(story?0:0),labs=T.cats;
labs.forEach((l,i)=>{const cx=W*(2*i+1)/8;ctx.save();ctx.beginPath();ctx.arc(cx,cy,cr,0,Math.PI*2);ctx.closePath();ctx.clip();ctx.fillStyle='#1b1d22';ctx.fillRect(cx-cr,cy-cr,cr*2,cr*2);if(I.cats[i])cover(I.cats[i],cx-cr,cy-cr,cr*2,cr*2);ctx.restore();
ctx.strokeStyle=red;ctx.lineWidth=story?9:7;ctx.beginPath();ctx.arc(cx,cy,cr,0,Math.PI*2);ctx.stroke();
const parts=String(l).split('/');txt((parts[0]||'').trim(),cx,cy+cr+(story?18:14),story?28:23,'#ffffff',{align:'center',weight:900,maxW:240,min:16});txt((parts[1]||'').trim(),cx,cy+cr+(story?50:40),story?25:20,'#ffffff',{align:'center',weight:600,maxW:240,min:14})});
if(I.cats.filter(Boolean).length<4)needs.push('Faltan fotos de categorías ('+I.cats.filter(Boolean).length+'/4).');
// onda roja
const wy=fy(story?.862:.862);ctx.fillStyle=red;ctx.beginPath();ctx.moveTo(0,wy+30);ctx.bezierCurveTo(W*.25,wy-28,W*.6,wy+70,W,wy+8);ctx.lineTo(W,wy+46);ctx.bezierCurveTo(W*.6,wy+104,W*.25,wy+10,0,wy+62);ctx.closePath();ctx.fill();
// contacto
const cyy=H-(story?112:76)-(story?20:6),ic=story?64:52;
const pin=(x,y)=>{ctx.fillStyle=red;ctx.beginPath();ctx.arc(x+16,y+14,15,0,7);ctx.fill();ctx.beginPath();ctx.moveTo(x+4,y+22);ctx.lineTo(x+28,y+22);ctx.lineTo(x+16,y+46);ctx.fill();ctx.fillStyle='#0a0a0b';ctx.beginPath();ctx.arc(x+16,y+14,6,0,7);ctx.fill()};
if(I.icons.ubicacion)contain(I.icons.ubicacion,40,cyy,40,56);else pin(40,cyy+2);
const parts=String(T.dir||'').split(',');const d1=parts.length>1?parts.slice(0,-1).join(',')+',':T.dir,d2=parts.length>1?parts[parts.length-1].trim():'';
let dz=story?28:23;for(const t of [d1,d2])while(measure(t,dz,700,'normal',0)>242&&dz>13)dz-=1;txt(d1,100,cyy+2,dz,'#ffffff',{weight:700});txt(d2,100,cyy+2+Math.round(dz*1.22),dz,'#ffffff',{weight:700});
const igw=story?200:176,ix=W-36-(ic+10+igw),wx=story?372:350,wnx=wx+ic+10;
if(I.icons.whatsapp)contain(I.icons.whatsapp,wx,cyy-4,ic,ic);else needs.push('Falta ícono original de WhatsApp.');
const nums=String(T.wa||'').split('·').map(t=>t.trim()).filter(Boolean);if(nums.length>1){txt(nums[0],wnx,cyy-4,story?28:23,'#ffffff',{weight:900,maxW:ix-16-wnx,min:16});txt(nums[1],wnx,cyy+(story?28:23),story?28:23,'#ffffff',{weight:900,maxW:ix-16-wnx,min:16})}else txt(nums[0]||'',wnx,cyy+(story?10:6),story?34:28,'#ffffff',{weight:900,maxW:ix-16-wnx,min:18});
if(I.icons.instagram)contain(I.icons.instagram,ix,cyy-4,ic,ic);else needs.push('Falta ícono original de Instagram.');
txt(T.ig,ix+ic+10,cyy+(story?18:13),story?21:18,'#ffffff',{weight:700,maxW:igw,min:13});
// QR (opcional) a la izquierda, bajo la etiqueta
if(I.qr){const qw=story?190:160,qh=qw+(story?44:38),qx=40,qy=py+ph+(story?64:54)+22;RR(qx,qy,qw,qh,18,'#ffffff');contain(I.qr,qx+10,qy+10,qw-20,qw-20);RR(qx+8,qy+qw-4,qw-16,story?34:30,8,red);txt('¡SÍGUELO!',qx+qw/2,qy+qw+(story?2:1),story?22:19,'#ffffff',{align:'center',weight:900,style:'italic'})}
return {needs,errors};
}
