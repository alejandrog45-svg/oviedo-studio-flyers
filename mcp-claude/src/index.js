// Cloudflare Worker: MCP read-only; independent from the private ChatGPT Sites deployment.
// Required secret: OVIEDO_MCP_TOKEN, set through Cloudflare Secrets, NEVER in GitHub.
const REPO = "alejandrog45-svg/oviedo-studio-flyers";
const GH = "https://api.github.com/repos/" + REPO;
const ROUTES_SNAPSHOT_SHA = "467d43a38478acb2c1021a69238beee60b25824f";
const ROUTES_SNAPSHOT = ["docs/ALOJAMIENTO_SIN_FIREBASE.md","docs/CONOCIMIENTO_NEGOCIO.md","docs/DRIVE_SELECTOR.md","docs/ESTADO_SESION.md","docs/ESTADO_Y_SEGURIDAD.md","docs/FLOW_BANANA_PROTOCOLO.md","docs/INFORME_FINAL.md","docs/PROMPT_CLAUDE_CODE_PC.md","docs/PUENTE_IA.md","web/_headers","web/_redirects","web/approved.js","web/assets/iconos/README.md","web/assets/iconos/icono_canal_whatsapp.png","web/assets/iconos/icono_facebook.png","web/assets/iconos/icono_instagram.png","web/assets/iconos/icono_ubicacion.png","web/assets/iconos/icono_whatsapp.png","web/assets/logos/README.md","web/assets/logos/logo_oviedo_blanco.png","web/assets/logos/logo_oviedo_negro.png","web/assets/qr_canal_oviedo.png","web/conoce.js","web/drive-config.js","web/drive.js","web/qrcode.js","web/studio.html","web/studio.js"];
const HEADERS = {"content-type":"application/json","cache-control":"no-store","x-content-type-options":"nosniff"};
const TOOLS = [
 {name:"consultar_estado",description:"Consulta el estado público versionado del proyecto Oviedo Studio sin modificar archivos.",inputSchema:{type:"object",properties:{},additionalProperties:false}},
 {name:"consultar_rutas",description:"Enumera rutas versionadas del repositorio Oviedo Studio; solo lectura.",inputSchema:{type:"object",properties:{},additionalProperties:false}}
];
function reply(v,status=200,extra={}) { return new Response(JSON.stringify(v),{status,headers:{...HEADERS,...extra}}); }
function error(id,code,message){return {jsonrpc:"2.0",id,error:{code,message}};}
function eq(a,b){const x=new TextEncoder().encode(a),y=new TextEncoder().encode(b);let z=x.length^y.length;for(let i=0;i<Math.max(x.length,y.length);i++)z|=(x[i]||0)^(y[i]||0);return z===0;}
async function github(path,env){
 const headers={"accept":"application/vnd.github+json","user-agent":"oviedo-studio-mcp-readonly"};
 // Optional, read-only token. Store only as Worker secret, never in source code.
 if(env.GITHUB_READ_TOKEN)headers.authorization="Bearer "+env.GITHUB_READ_TOKEN;
 const r=await fetch(GH+path,{headers});
 if(!r.ok)throw Error("GitHub status "+r.status);
 return await r.json();
}
export default {
 async fetch(request,env){
  const url=new URL(request.url);
  if(url.pathname!=="/mcp")return reply({error:"not_found"},404);
  if(!env.OVIEDO_MCP_TOKEN || env.OVIEDO_MCP_TOKEN.length<32)return reply({error:"server_not_configured"},503);
  const auth=request.headers.get("authorization")||"";
  if(!auth.startsWith("Bearer ") || !eq(auth.slice(7),env.OVIEDO_MCP_TOKEN))return reply({error:"unauthorized"},401,{"www-authenticate":'Bearer realm="Oviedo Studio MCP"'});
  if(request.method==="GET")return reply({error:"stream_not_supported"},405,{"allow":"POST"});
  if(request.method!=="POST")return reply({error:"method_not_allowed"},405,{"allow":"POST"});
  let body;try{body=await request.json();}catch{return reply(error(null,-32700,"Invalid JSON"),400);}
  if(!body||body.jsonrpc!=="2.0"||typeof body.method!=="string")return reply(error(body?.id??null,-32600,"Invalid Request"),400);
  if(body.method==="notifications/initialized")return new Response(null,{status:202});
  const id=body.id??null;
  if(body.method==="initialize")return reply({jsonrpc:"2.0",id,result:{protocolVersion:"2025-03-26",capabilities:{tools:{listChanged:false}},serverInfo:{name:"oviedo-studio-claude-readonly",version:"0.2.0"}}});
  if(body.method==="ping")return reply({jsonrpc:"2.0",id,result:{}});
  if(body.method==="tools/list")return reply({jsonrpc:"2.0",id,result:{tools:TOOLS}});
  if(body.method==="tools/call"){
   const name=body.params?.name;
   if(!TOOLS.some(t=>t.name===name))return reply(error(id,-32602,"Unknown tool"));
   if(body.params?.arguments && Object.keys(body.params.arguments).length)return reply(error(id,-32602,"Arguments not allowed"));
   try{
    let out;
    if(name==="consultar_estado"){
     try {
      const b=await github("/branches/main",env);
      out={repository:REPO,branch:"main",commit:b.commit.sha,source:"GitHub live API",snapshot:false,editor:"https://oviedo-studio-flyers.pages.dev/studio",sitesOriginal:"private, not connected",syncedWithSites:false,mode:"read-only"};
     } catch (lookupError) {
      out={repository:REPO,branch:"main",commit:ROUTES_SNAPSHOT_SHA,source:"Verified GitHub commit snapshot",snapshot:true,snapshotCommit:ROUTES_SNAPSHOT_SHA,warning:"Live GitHub branch lookup unavailable: "+String(lookupError.message)+". Commit shown is historical, not current.",editor:"https://oviedo-studio-flyers.pages.dev/studio",sitesOriginal:"private, not connected",syncedWithSites:false,mode:"read-only"};
     }
    }
    else {
      try {
       const b=await github("/branches/main",env);
       const commit=b.commit.sha;
       const tree=await github("/git/trees/"+commit+"?recursive=1",env);
       out={repository:REPO,branch:"main",commit,paths:tree.tree.filter(f=>f.type==="blob").map(f=>f.path).filter(p=>p.startsWith("web/")||p.startsWith("docs/")),source:"GitHub live API",snapshot:false,syncedWithSites:false};
      } catch (lookupError) {
       out={repository:REPO,branch:"main",commit:ROUTES_SNAPSHOT_SHA,paths:ROUTES_SNAPSHOT,source:"Verified GitHub tree snapshot",snapshot:true,snapshotCommit:ROUTES_SNAPSHOT_SHA,warning:"Live GitHub tree lookup unavailable: "+String(lookupError.message)+". Paths are historical, not current.",syncedWithSites:false};
      }
    }
    return reply({jsonrpc:"2.0",id,result:{content:[{type:"text",text:JSON.stringify(out)}],isError:false}});
   }catch(e){return reply({jsonrpc:"2.0",id,result:{content:[{type:"text",text:"Read-only lookup failed: "+String(e.message)}],isError:true}});}
  }
  return reply(error(id,-32601,"Method not found"));
 }
};
