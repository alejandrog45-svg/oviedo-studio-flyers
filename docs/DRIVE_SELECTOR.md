# Selector de Drive del editor (solo lectura)

El editor puede cargar fotos y logos directamente desde las carpetas privadas de Drive del proyecto (Fotos, Logos oficiales, Marcas confirmadas, Íconos y QR, Aprobados, Raíz). Código: `web/drive.js`; configuración: `web/drive-config.js`.

## Estado
NO CONECTADO hasta que se complete la configuración de abajo (el botón queda desactivado y lo dice en pantalla).

## Configuración (la hace el dueño de la cuenta alejandrog45; Claude no ingresa credenciales)
1. Google Cloud Console (proyecto propio de Oviedo Studio, no otros proyectos): APIs y servicios -> Biblioteca -> activar **Google Drive API**.
2. Pantalla de consentimiento OAuth: tipo Externo, modo Pruebas, agregar como usuario de prueba alejandrog45@gmail.com. Alcance: `drive.readonly`.
3. Credenciales -> Crear ID de cliente OAuth -> **Aplicación web**. Orígenes autorizados de JavaScript: `https://oviedo-studio-flyers.pages.dev`. (No hace falta URI de redireccionamiento.)
4. Copiar SOLO el **Client ID** (público) en `web/drive-config.js` (`DRIVE_CLIENT_ID`). No usar ni pegar client secret ni API key.
5. Commit, PR y fusión; Cloudflare despliega. Abrir el editor, «Conectar con Google», elegir carpeta, marcar archivos y «Cargar seleccionados».

## Alcance y seguridad
- El alcance `drive.readonly` es de solo lectura pero cubre todo el Drive de la cuenta; el código solo consulta las carpetas fijadas en `drive.js` y el token vive en memoria (se pierde al cerrar la pestaña). Alternativa más estricta (Google Picker con alcance `drive.file`) exigiría una API key; no implementada.
- Los archivos se descargan al navegador y se cargan en los campos habituales; no se suben a ningún servidor.
- La ficha QA registra `origen_drive` (fileId, nombre y carpeta) por campo.
- CSP: `script-src` permite `https://accounts.google.com/gsi/client`; `connect-src` permite `https://www.googleapis.com`; `frame-src` permite `https://accounts.google.com`.
