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
Ver `docs/CONOCIMIENTO_NEGOCIO.md`. Estado y pendientes: `docs/ESTADO_SESION.md`. Flow/Banana: `docs/FLOW_BANANA_PROTOCOLO.md`.
