# CLAUDE.md · OVIEDO STUDIO (leer primero)

## Aislamiento (Regla 0)
Solo: repo `alejandrog45-svg/oviedo-studio-flyers`, rama `main`, Cloudflare Pages `oviedo-studio-flyers`.
Prohibido: otros repos, Firebase, Cloudflare ajenos, servicios de pago, borrar archivos, publicar claves. Nunca disco D.
Sin relación con PLAN_MAESTRO_OVIEDO.

## Reglas de trabajo
- Safe Change: declarar TOCO / RAZÓN / NO-TOCO antes de editar.
- Ahorro de tokens (modo full): respuestas breves, no releer lo ya conocido, no descargar binarios grandes por MCP.
- Antirretroceso: no revertir ni degradar lo verificado (ver `docs/ESTADO_SESION.md`); validar antes de commit.
- Datos faltantes: buscar PRIMERO en Drive (solo lectura); no pedírselos al usuario.
- Costo cero: no gastar créditos (Flow/Banana) ni contratar planes sin preguntar.
- Marcar NO VERIFICADO lo no probado. Ninguna IA se declara integrada sin prueba real.
- Nada se publica automáticamente; revisión humana antes de aprobar.
- Al cerrar sesión: actualizar este archivo, `docs/CONOCIMIENTO_NEGOCIO.md` y `docs/ESTADO_SESION.md`; commit + deploy.

## Despliegue
Cloudflare Pages: build `exit 0`, salida `web`, despliega desde `main`. Ramas de trabajo → PR → merge a main = deploy.

## Conocimiento del negocio
Plantillas Conoce/Aprobado y activos (QR oficial en web/assets): ver `docs/CONOCIMIENTO_NEGOCIO.md` (sección Plantilla Aprobado). Ver `docs/CONOCIMIENTO_NEGOCIO.md`. Estado y pendientes: `docs/ESTADO_SESION.md`. Flow/Banana: `docs/FLOW_BANANA_PROTOCOLO.md`.

## Estado y rutas (cierre 2026-10-19)
- Producción: https://oviedo-studio-flyers.pages.dev/studio.html (CSP activa). Sin Firebase ni login (retirado 2026-10-19). Selector de Drive solo lectura: `docs/DRIVE_SELECTOR.md` (NO CONECTADO hasta crear el Client ID OAuth).
- Cuenta: GitHub `alejandrog45-svg` (usar `gh.cmd` de W:). Flujo: rama `claude/<tema>` -> PR -> CI Cloudflare verde -> fusión (el usuario autorizó fusionar directo en esta sesión; en sesiones nuevas pedir autorización).
- Carpetas locales ignoradas por git: `material_fuente/` (originales; README y MANIFIESTO) y `salidas/` (`salidas/aprobados/` = aprobados por el usuario). No copiar originales al repo.
- Pendientes y estado detallado: final de `docs/ESTADO_SESION.md` (sección CIERRE).

## Blindaje del conector MCP (mcp-claude) — 2026-10-28
- Worker de produccion: `studio-claude-mcp` (secretos `OVIEDO_MCP_TOKEN` y `GITHUB_READ_TOKEN` solo en Cloudflare). NUNCA `wrangler deploy` ni `wrangler secret` desde `mcp-claude/` sin orden expresa del dueño.
- `mcp-claude/wrangler.toml` es seguro por defecto (nombre de prueba, sin workers.dev). La config de produccion es `mcp-claude/wrangler.produccion.toml`, solo con `--config`.
- Antes de tocar `mcp-claude/`: `node --test mcp-claude/test/blindaje.test.mjs` (debe pasar). El codigo del repo es el desplegado: se cambia primero aqui, con prueba, y despues, con orden, en Cloudflare.
- Volver atras en Cloudflare: Implementaciones -> `cae9101b` (original), `528f79fe` (binding) o `2de1fd50` (actual).