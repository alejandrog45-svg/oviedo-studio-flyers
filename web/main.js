import {initializeApp} from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js';
import {getAuth,GoogleAuthProvider,signInWithPopup,signOut,onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js';
const $=id=>document.getElementById(id);let auth,provider,token;
try{const {firebaseConfig}=await import('./firebase-config.js');auth=getAuth(initializeApp(firebaseConfig));provider=new GoogleAuthProvider();provider.addScope('https://www.googleapis.com/auth/drive.metadata.readonly');
$('login').onclick=async()=>{try{const r=await signInWithPopup(auth,provider);token=GoogleAuthProvider.credentialFromResult(r)?.accessToken;$('state').textContent='Autorización concedida para esta sesión';}catch(e){$('state').textContent=e.message}};
$('logout').onclick=()=>signOut(auth);
onAuthStateChanged(auth,u=>{$('login').disabled=!!u;$('logout').disabled=!u;$('drive').disabled=!u;$('user').textContent=u?.email||'Sin sesión';if(!u)token=null});
$('drive').onclick=async()=>{if(!token){$('result').textContent='Vuelve a iniciar sesión para autorizar Drive';return}try{const folder='1skgd6eeBI57Mfp3cmEm18IRCbkTzP70h';const q=encodeURIComponent(`'${folder}' in parents and trashed = false`);const r=await fetch(`https://www.googleapis.com/drive/v3/files?q=${q}&fields=files(id,name,mimeType),nextPageToken&pageSize=100`,{headers:{Authorization:'Bearer '+token}});if(!r.ok)throw Error('Drive HTTP '+r.status);$('result').textContent=JSON.stringify(await r.json(),null,2)}catch(e){$('result').textContent=e.message}};
}catch(e){$('state').textContent='Firebase aún no configurado: '+e.message}
