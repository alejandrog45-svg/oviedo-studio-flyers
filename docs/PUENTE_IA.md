# Puente IA · cuenta Alejandro (plan original)

Regla: ninguna IA se declara "integrada" sin prueba real. Suscripción personal ≠ API ni créditos API.
No hay claves en el repo ni en el frontend. Nada se envía automáticamente; el usuario copia y pega.

| IA | Rol | Vía | Estado |
|---|---|---|---|
| Claude Code | Edita este repo, pruebas, docs, deploy vía PR | Sesión Claude Code con acceso al repo | **VERIFICADO** (commits/PR reales) |
| Gemini Plus / Google Flow (Banana) | Fondos y acabados decorativos, variaciones | Enlace manual a Flow (proyecto en ESTADO_SESION) | Acceso manual; Banana NO VERIFICADO, sin créditos gastados |
| ChatGPT | Copy alternativo, revisión de reglas/QA de texto | Enlace manual chatgpt.com | Acceso manual; NO VERIFICADO |
| Meta AI | Ideas de copy/variantes para redes | Enlace manual meta.ai | Acceso manual; NO VERIFICADO |

## Flujo común
1. Editor → "Preparar instrucciones" (incluye reglas de originalidad).
2. Copiar y pegar en la IA elegida; adjuntar solo copias de fotos/logos autorizados.
3. Importar resultado al editor (marcado "autenticidad pendiente") o usar solo el texto.
4. Revisión humana con lista QA de `FLOW_BANANA_PROTOCOLO.md`.

## Para integración real futura (requiere decisión y costo del usuario)
Backend seguro (p. ej. Cloudflare Worker) con claves como secretos del servidor, nunca en `web/`. No iniciar sin autorización.
