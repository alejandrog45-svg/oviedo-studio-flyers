# Oviedo Studio · Claude MCP aislado (solo lectura)

> **ADVERTENCIA: NO DESPLEGAR DESDE AQUI SIN ORDEN EXPRESA DEL DUEÑO.**
> - El Worker de produccion es `studio-claude-mcp` (conector MCP real; secretos `OVIEDO_MCP_TOKEN` y `GITHUB_READ_TOKEN` solo en Cloudflare). Version activa al 2026-10-28: `2de1fd50`.
> - `wrangler.toml` es **seguro por defecto**: nombre de prueba y sin direccion publica. Un `wrangler deploy` accidental NO reemplaza produccion.
> - La configuracion fiel a produccion es `wrangler.produccion.toml`. Solo con `--config wrangler.produccion.toml`, con orden expresa y habiendo anotado la version activa para poder volver atras.
> - Nunca `wrangler secret` desde aqui sin orden expresa. Nunca secretos en el repositorio.
> - Guardia obligatoria antes de cualquier commit en esta carpeta: `node --test mcp-claude/test/blindaje.test.mjs` (todo OK).

Este Worker es **independiente** de ChatGPT Sites y de Cloudflare Pages V1. No conecta ni sincroniza el código de Sites. Solo consulta el repositorio público en GitHub. No proporciona edición, exportación ni escritura.

## Seguridad
- Crear el secret OVIEDO_MCP_TOKEN en Cloudflare Worker; un valor aleatorio de al menos 32 caracteres. No escribirlo en el repositorio ni enviarlo al chat.
- Todas las solicitudes a /mcp requieren Authorization: Bearer <token>. Sin secreto configurado el servidor devuelve 503; sin token devuelve 401.
- Herramientas: consultar_estado y consultar_rutas. Solo GET a GitHub API, sin permisos de escritura.
- Antes de registrar en Claude verificar que su modalidad de conector acepta encabezados personalizados Bearer. Si no, implementar OAuth compatible en nuevo Worker; nunca desactivar la autenticación.

## Desplegar (solo con aprobación explícita)
En la carpeta mcp-claude ejecutar npx wrangler deploy, después configurar el secreto con wrangler secret put OVIEDO_MCP_TOKEN. No ejecutar deploy en la rama main ni modificar Pages.

## Pruebas obligatorias
1. Sin token: 401. Token incorrecto: 401. Sin secret: 503.
2. initialize: respuesta MCP con capacidades tools. tools/list: exactamente dos herramientas.
3. tools/call consultar_estado: GitHub devuelve SHA real. consultar_rutas: rutas reales.
4. tools/call desconocida: error. Método no soportado: error.
5. Claude: conectar desde cuenta alejandrog45, ejecutar ambas herramientas, capturar evidencia y verificar que ninguna operación edita archivos.

NO VERIFICADO: compatibilidad exacta del cliente web Claude con esta autenticación; no afirmar integrado antes de prueba real.

## Continuación 2026-10-26 — control de consistencia (sin desplegar)
Commit del código: c9d9193caa327adeca3c7490fd2a0a228c1746ee
- consultar_rutas: obtiene el commit de main con /branches/main y consulta /git/trees/{commit}; devuelve commit junto con las rutas. Cada herramienta puede ejecutarse en instantes diferentes: comparar ambos SHA; si son diferentes, repetir solo cuando sea necesario.
- Ambas usan opcionalmente GITHUB_READ_TOKEN como secreto de Cloudflare para reducir 403 por limitación de API anónima. Crear un token GitHub de solo lectura y alcance mínimo, si es necesario y autorizado; guardarlo SOLO en secretos de Worker. El repositorio es público: no permitir Contents:write ni acciones de escritura.
- Si las lecturas fallan, respuesta marcada snapshot:true con SHA histórico y advertencia. No confundir con sincronización de Sites.
- NO se ha verificado este cambio con el Worker publicado ni Claude. No promover, fusionar ni reemplazar el despliegue de producción sin autorización explícita.
- Consultas previas: Claude conectado con encabezado Authorization Bearer. No alterar OVIEDO_MCP_TOKEN.

## Actualizacion 2026-10-28 — codigo real desplegado y service binding V2 (version 2de1fd50)
- Este repo estaba desactualizado: el Worker publicado `studio-claude-mcp` (version 0.3.0) ya incluia `v2Status()`, que comprueba 5 rutas de V2 (`https://nexus-oviedo-studio-v2.alejandrog45.workers.dev`) y las devuelve en el bloque `v2` de ambas herramientas. `src/index.js` es ahora ese codigo real.
- Problema resuelto: la comprobacion daba 404 falso en todas las rutas porque un Worker no puede llamar por `fetch` al `workers.dev` de otro Worker de la misma cuenta (error 1042). Solucion: service binding `V2` -> `nexus-oviedo-studio-v2` (`[[services]]` en `wrangler.toml`); `v2Status(env)` usa `env.V2.fetch` y sigue las redirecciones. Sin binding conserva el `fetch` anterior.
- Verificado por el conector tras el despliegue: `/`, `/nexus`, `/compositor/studio.html`, `/compositor/materiales.html` y `/conexiones.html` devuelven 200.
- Configuracion: `wrangler.toml` es la version SEGURA (name `oviedo-studio-claude-mcp-prueba`, `workers_dev = false`); `wrangler.produccion.toml` refleja el Worker real (`name = "studio-claude-mcp"`, compat 2026-10-26, binding `V2`). Los secretos siguen solo en Cloudflare Secrets; nada de esto los incluye.
- Volver atras en Cloudflare: Implementaciones -> restaurar `cae9101b` (original, con el 404 falso) o `528f79fe` (solo binding).
- Desplegar a produccion solo con aprobacion explicita y `--config wrangler.produccion.toml`; el `wrangler.toml` por defecto ya no puede reemplazar el Worker real (prueba `test/blindaje.test.mjs`).
- Copia de respaldo local (fuera del repo): `W:\PROYECTOS CUENTA ALEJANDROG45\_respaldos\mcp-worker-desplegado_2026-10-28\`.