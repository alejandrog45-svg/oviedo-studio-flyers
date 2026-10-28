# CIERRE OPERATIVO — OVIEDO STUDIO / CLAUDE MCP — 2026-10-26

## Regla principal
Continuar mañana SOLO con Claude hasta validación total. Luego Meta AI, ChatGPT y Gemini, de a uno y únicamente según capacidades verificadas. No editar otros proyectos, ni main, ni producción V1, ni fuentes fotográficas originales. Sin gasto adicional ni publicación sin autorización. No exponer tokens.

## Inventario de repositorios y despliegues
1. ChatGPT Sites (fuente privada, compositor actualizado): https://nexus-oviedo-studio.wisebud19.chatgpt.site/compositor/studio.html ; MCP Sites: https://nexus-oviedo-studio.wisebud19.chatgpt.site/mcp . OAuth con auth.openai.com; registro de cliente externo Claude/DCR sin resolver. No existe sincronización comprobada con GitHub.
2. Cloudflare Pages V1 (editor histórico): https://oviedo-studio-flyers.pages.dev/studio ; URL de deployment observada https://c3ee9ac3.oviedo-studio-flyers.pages.dev/studio ; proyecto Pages oviedo-studio-flyers, GitHub repo https://github.com/alejandrog45-svg/oviedo-studio-flyers rama main. Commit base verificado 467d43a38478acb2c1021a69238beee60b25824f. NO sustituir.
3. Respaldo GitHub: backup/pre-claude-mcp-2026-10-26 (commit 467d43a). Rama de desarrollo: claude/studio-v2-mcp-isolado-2026-10-26. PR #17 borrador https://github.com/alejandrog45-svg/oviedo-studio-flyers/pull/17 ; NO fusionar.
4. Nuevo Cloudflare Worker autónomo studio-claude-mcp; endpoint https://studio-claude-mcp.alejandrog45.workers.dev/mcp . Fuente de trabajo de Worker: mcp-claude/src/index.js en rama aislada; código de respaldo para estado (última confirmación GitHub) commit 10c79e853763d619d53b90524968d61fa14e1b13. En Cloudflare se pegó y desplegó manualmente; el Worker puede divergir del repositorio. NO hay despliegue automático verificado.
5. Claude Web cuenta del usuario: conector Oviedo Studio Claude MCP registrado usando encabezado authorization: Bearer [secreto SOLO guardado en Claude y Cloudflare]; permiso de ambas herramientas 'Requiere aprobación'. No documentar ni copiar su valor.

## Evidencias y diagnóstico
- Sin secreto configurado: /mcp devolvía server_not_configured.
- Secreto OVIEDO_MCP_TOKEN agregado como Secret runtime Producción y versión promocionada.
- Acceso anónimo: /mcp devuelve {"error":"unauthorized"}; confirma rechazo anónimo, no demuestra por sí solo pruebas completas de seguridad.
- Claude enumera y ejecuta consultar_estado y consultar_rutas. Prueba más reciente: consultar_estado terminó con snapshot:true, fuente 'Verified GitHub commit snapshot', commit histórico 467d43a debido a GitHub 403; consultar_rutas devolvió 28 rutas con source 'GitHub live API', snapshot:false; esta herramienta no informó SHA. No son datos consistentes del mismo commit.
- GitHub 403 intermitente: API de ramas/tree sin autenticación. NO resuelto definitivamente; el fallback histórico evita error pero no representa estado actual. Investigar límites rate limit y método de consulta con autenticación de solo lectura SIN añadir tokens al código.
- syncedWithSites:false; Sites privado NO CONECTADO; compositor V2 NO migrado a nueva URL. Las 2 herramientas no editan ni generan diseños.
- Selector Google Drive del editor de Cloudflare V1: NO CONECTADO; es OAuth distinto al de Claude MCP.
- Claude mostró 95 % del límite semanal. Evitar pruebas repetitivas; una sola prueba final después de corregir.
- La configuración de GitHub y Docs puede incluir textos traducidos por Chrome; copiar siempre código ORIGINAL sin traducción.
- Ninguna prueba constituye autorización para habilitar escritura ni edición automática.

## Inventario mínimo de áreas
web/: studio.html, studio.js, approved.js, conoce.js, drive.js, drive-config.js, qrcode.js, _headers, _redirects, assets/iconos, assets/logos, QR canal.
docs/: ALOJAMIENTO_SIN_FIREBASE, CONOCIMIENTO_NEGOCIO, DRIVE_SELECTOR, ESTADO_SESION, ESTADO_Y_SEGURIDAD, FLOW_BANANA_PROTOCOLO, INFORME_FINAL, PROMPT_CLAUDE_CODE_PC, PUENTE_IA.
mcp-claude/: src/index.js, wrangler.toml, README.md (solo rama de desarrollo).
Originales fotográficos y logos: usar como capas intocables, sin regeneración; fotos de Sites privadas no trasladadas. No mezclar proyectos.

## Orden de mañana
1. Comprobar repo, rama, PR #17, deploy actual Worker, secreto por nombre solamente y estado de Pages/Sites sin modificar.
2. Resolver GitHub 403, permitir lectura consistente del mismo commit en ambas herramientas; probar local antes de volver a desplegar; no presentar snapshot como actual.
3. Obtener material de Sites por vía autorizada y archivo fuente completo; inventariar compositor, CSS/JS, rutas e imágenes reales. No clonar por captura ni inventar originales.
4. Crear URL nueva e independiente para compositor actualizado (Pages V2), sin alterar V1. Verificar seguridad y licencia/origen de cada imagen. Aún no existe V2 comprobada.
5. Conectar Worker Claude a la nueva fuente V2 real de solo lectura. Registrar origen, versión, checksum/commit y sincronización SOLO si se prueba extremo a extremo.
6. Realizar QA visual de plantillas feed 1080x1350/historia 1080x1920, zonas seguras, originales logos, QR y exportaciones. Pedir aprobación explícita antes de cualquier producción/merge.
7. UNA prueba final Claude con consultar_estado y consultar_rutas; cerrar Claude solo si refleja compositor y rutas reales, no solo GitHub histórico.
8. Después, y no antes: Meta AI -> ChatGPT -> Gemini, por separado y según capacidad verificable.

## Regla de cambios
TOCO: solo documentos de cierre y rama de desarrollo cuando se apruebe. POR QUÉ: trazabilidad y continuidad. NO TOCO: main, Pages V1, Sites privado, Drive originales, otros repos, secretos, producción sin aprobación. Para la documentación de cierre se autoriza guardar archivos de inventario sin desplegar.

## URLs útiles
Repositorio: https://github.com/alejandrog45-svg/oviedo-studio-flyers
PR: https://github.com/alejandrog45-svg/oviedo-studio-flyers/pull/17
Rama de trabajo: https://github.com/alejandrog45-svg/oviedo-studio-flyers/tree/claude/studio-v2-mcp-isolado-2026-10-26
Cloudflare Worker: https://dash.cloudflare.com/81358d059af2349b5f3fa97b39ac49f4/workers/services/view/studio-claude-mcp/production
Drive biblioteca existente: https://drive.google.com/drive/folders/1skgd6eeBI57Mfp3cmEm18IRCbkTzP70h

ESTADO: cierre documental de 2026-10-26. Claude MCP conexión de consulta comprobada; sincronización real con Sites NO VERIFICADA/NO IMPLEMENTADA.