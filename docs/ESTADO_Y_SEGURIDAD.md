# Estado real y límites

- Repositorio independiente; no editar ni mover recursos de otros proyectos.
- Aplicación web: **desplegada** en https://oviedo-studio-flyers.pages.dev/studio.html (Cloudflare Pages, desde `main`), con CSP en `/studio` y `/studio.html`.
- Sin Firebase ni login: el acceso heredado (`web/index.html`, `web/main.js`, `firebase.json`) se retiró el 2026-10-19 por orden del usuario (recuperable en el historial de git).
- Drive: selector de solo lectura en el editor (`web/drive.js`); NO CONECTADO hasta crear el Client ID OAuth (`docs/DRIVE_SELECTOR.md`). Sin movimientos ni borrados.
- Integraciones ChatGPT, Gemini, Claude y Meta: **no conectadas por API**. Suscripciones personales no equivalen a créditos API.
- No publicar fotografías ni logos privados en este repositorio público (`material_fuente/` y `salidas/` están ignoradas).
- Los archivos originales se copian, jamás se mueven. Nunca poner secretos de API en frontend ni subirlos al repositorio.

## Próximos pasos
Ver la lista de pendientes al final de `docs/ESTADO_SESION.md`.
