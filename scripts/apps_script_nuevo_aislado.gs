/** Proyecto exclusivo Oviedo Studio. Solo inventario; nunca mover o borrar. */
const OVIEDO_STUDIO_FOLDER_ID='1skgd6eeBI57Mfp3cmEm18IRCbkTzP70h';
function configurarOviedoStudio(){
 PropertiesService.getScriptProperties().setProperty('OVIEDO_ROOT_FOLDER_ID',OVIEDO_STUDIO_FOLDER_ID);
 return {ok:true,folderId:OVIEDO_STUDIO_FOLDER_ID};
}
function listarRecursosOviedo(){
 const id=PropertiesService.getScriptProperties().getProperty('OVIEDO_ROOT_FOLDER_ID');
 if(id!==OVIEDO_STUDIO_FOLDER_ID)throw Error('Carpeta no autorizada');
 const root=DriveApp.getFolderById(id),out=[];
 function walk(folder,depth){
  if(depth>3)return;
  const files=folder.getFiles();
  while(files.hasNext()){const f=files.next();out.push({id:f.getId(),nombre:f.getName(),tipo:f.getMimeType(),ruta:folder.getName(),actualizado:f.getLastUpdated().toISOString(),url:f.getUrl()})}
  const sub=folder.getFolders();while(sub.hasNext())walk(sub.next(),depth+1);
 }
 walk(root,0);return out;
}
function crearInventarioOviedo(){
 const rows=listarRecursosOviedo(),folder=DriveApp.getFolderById(OVIEDO_STUDIO_FOLDER_ID);
 const csv=[['id','nombre','tipo','carpeta','actualizado','url'].join(',')];
 for(const x of rows)csv.push([x.id,x.nombre,x.tipo,x.ruta,x.actualizado,x.url].map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(','));
 const file=folder.createFile('INVENTARIO_OVIEDO_'+Utilities.formatDate(new Date(),'UTC','yyyyMMdd_HHmmss')+'.csv',csv.join('\n'),MimeType.CSV);
 return {total:rows.length,url:file.getUrl()};
}
// No doGet/doPost: no exponer endpoint público.
