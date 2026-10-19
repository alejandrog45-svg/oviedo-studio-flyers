# Estado de sesión · 2026-10-19

## Verificado (en producción https://oviedo-studio-flyers.pages.dev, imágenes sintéticas)
- Chromium headless, escritorio 1280 y móvil emulado 390×844: Montserrat carga, 0 errores de consola, sin scroll horizontal.
- 3 plantillas × Feed/Historia × 2 vistas = 12 PNG exportados con dimensiones exactas 1080×1350 / 1080×1920.
- Sin secretos en el repo (.gitignore cubre claves/config).

## NO VERIFICADO
- Editor con fachada y logos oficiales de Drive (carpetas 03/04): descarga base64 por MCP demasiado costosa; hacerlo manualmente cargando los archivos en el editor.
- Móvil físico real (solo emulación).
- Lectura visual/legibilidad de los PNG (solo dimensiones y errores).
- Flow/Banana: sin ejecutar; requiere autorización de créditos.
- Fase 7 integraciones IA: ninguna integrada.

## Pendiente
1. Usuario: probar con fachada y logos oficiales y en su móvil.
2. Autorizar (o no) UNA prueba con Banana.
3. Revisión humana de cualquier flyer antes de aprobar.

## Antirretroceso: no tocar sin motivo
Bloqueo de exportación sin Montserrat, comprobación de dimensiones PNG, textos de revisión humana, flag `publicado:false` en ficha QA.

## Enlaces guardados
- Flow (proyecto + herramienta Oviedo Puente Flow): https://flow.google.com/project/f45f26cf-bc8b-40b6-ab1a-94fd98ac93eb/tool/c228322c-4960-41a2-bc5f-701860a8b116
  Acceso solo con cuenta Google del usuario; no es credencial. Sin ejecutar Banana.

## Flow/Banana (2026-10-19)
- Protocolo de originalidad: `docs/FLOW_BANANA_PROTOCOLO.md`. Flyer de referencia (5 bandas) definido como meta de calidad.
- "Preparar instrucciones" del editor ahora incluye estructura objetivo y reglas estrictas (probado local: texto generado, exporta PNG, 0 errores).
- Conexión API con Flow/Banana: NO existe/NO VERIFICADA. Banana sin ejecutar. Pendiente: autorización de créditos para UNA prueba.
- Imagen de referencia no se sube al repo público (contiene marcas de terceros).

## Plantilla Catálogo 5 bandas + puente IA (2026-10-19)
- Nueva plantilla "Catálogo · 5 bandas" (Feed e Historia): cabecera logo+título+mensaje, hero (foto original), 5 categorías (5 fotos en orden), contacto, redes. Probada: 4 plantillas × 2 formatos exportan PNG exactos, 0 errores. Verificada solo con imágenes de relleno; con fotos reales: NO VERIFICADO.
- Corregido defecto previo: `textBlock` no partía líneas (`/\\s+/` → `/\s+/`). Títulos ahora se ajustan en varias líneas. Mensaje de error de texto largo ahora cita el texto.
- Sección "Asistentes IA" (enlaces manuales Gemini, ChatGPT, Meta AI, Claude) + `docs/PUENTE_IA.md`. Solo Claude Code VERIFICADO; el resto acceso manual, sin API.
- Usuario autorizó (19-10-2026) UNA prueba con Banana. **NO EJECUTADA**: Flow exige la sesión Google del usuario y esta sesión no tiene acceso. Ejecutar manualmente con "Preparar instrucciones" (plantilla Catálogo) y registrar resultado aquí.

## Multi-marca (2026-10-19)
- Editor: selector de Marca (manzano, express, padel, alianza, feria) con WhatsApp/Instagram/Dirección editables y color de acento. Fuente por marca (Montserrat / Fraunces). El Manzano trae sus datos; las demás quedan vacías y el QA avisa. Ficha QA incluye marca, tipografía y contacto.
- Probado local: 4 plantillas × 2 formatos exportan (marca El Manzano); las 4 marcas cargan su fuente (Fraunces verificado); exportación Pádel con datos de prueba OK; 0 errores.
- NO VERIFICADO: colores verde/rosa exactos de Padel Rocks (requiere logo/reglas globales), logos de Express/Pádel, datos de contacto de otras marcas.

## Datos de marca cargados desde Drive (2026-10-19)
- BRANDS del editor usa datos oficiales (contacto, fuente, fondo y acento hex) de las reglas globales; QA por marca (Express: "Cotiza Oviedo Express"; Pádel/Alianza: logos originales, Fraunces, sin rojo). Acento Oviedo oficial #E1141E.
- Verificado local: 5 marcas × 4 plantillas × 2 formatos sin texto desbordado; Pádel catálogo visualmente correcto (Fraunces, verde).
- Instrucción del usuario: no pedir datos que ya están en Drive; buscar primero en Drive.
- NO VERIFICADO: logos reales de Express/Padel Rocks en el editor (pendiente cargar archivos desde Drive); QR del Canal (no implementado en el editor).

## Acceso a archivos de Drive (2026-10-19)
- Localizados en Drive (solo lectura): fachada_patio_2026-10-14_01 (03), logos Oviedo blanco y placa (04), ESCENARIO_2025, flyers de referencia Express/Pádel.
- Límite técnico: el conector de Drive entrega los binarios como base64 dentro del contexto de la sesión; no se guardan a disco. Reconstruirlos a mano no es fiable (intento con el logo de 14 KB falló y se descartó). Por eso la prueba con fotos/logos oficiales reales se hace cargándolos en el editor desde el navegador del usuario (el editor los procesa localmente).
- Opción futura (requiere crear un cliente OAuth de Google del proyecto): selector de Drive dentro del editor. No iniciado.

## Seguridad (2026-10-19)
- `web/_headers` con CSP y cabeceras; probado local. Informe: `docs/INFORME_FINAL.md`.

## QR del Canal + consola limpia (2026-10-19)
- Opción "QR del Canal" (apagada por defecto) en todas las plantillas: librería `qrcode-generator` 1.4.4 (MIT) en `web/qrcode.js`, corrección H, zona de silencio blanca, ojos en tono oscuro de la marca, tarjeta "¡SÍGUELO!". Enlace: canal WhatsApp de El Manzano.
- Verificación por software: zxing-cpp decodifica el QR correcto en 16/16 PNG (manzano y padel × 4 plantillas × feed/historia). OpenCV es inconsistente según el fondo (no usarlo como criterio).
- NO VERIFICADO: lectura con un teléfono real (regla 21 de las reglas globales lo exige antes de aprobar); sin insignia central.
- Consola: 0 errores/avisos (favicon vacío en línea). Con CSP real sirviendo desde Cloudflare: OK.

## CIERRE · producción (2026-10-19)
- PR #1 fusionado a `main` (788c69d) por instrucción expresa del usuario. Producción https://oviedo-studio-flyers.pages.dev verificada: cabeceras CSP y QR presentes; prueba completa (4 plantillas × feed/historia, marca El Manzano + exportación Pádel) sin errores ni avisos de consola.
- Pendiente del usuario: probar con fotos/logos oficiales de Drive cargados en el editor; probar el QR con un teléfono; ejecutar la prueba Banana en Flow (protocolo en FLOW_BANANA_PROTOCOLO.md); decidir retirar login heredado (web/index.html, main.js).

## Plantilla Aprobado (2026-10-19)
- `web/approved.js` + integración en `studio.js/html`. Probada con la fachada real adjunta y recortes de los flyers aprobados (solo scratchpad): Historia y Feed se acercan a los aprobados (rojo, negro y verde Pádel/Alianza). 5 marcas × 5 plantillas × 2 formatos = 50 exportaciones, 0 errores de texto ni consola (con CSP).
- Defectos corregidos al probar: rombos de "Marcas", columnas de contacto (dos WhatsApp en Pádel/Alianza), cabecera con bloque de Alianza (escala sola), título largo repartido en 2 líneas.
- 18 activos originales copiados a Drive del proyecto (ver CONOCIMIENTO_NEGOCIO). Pruebas con esos archivos exactos desde el navegador del usuario: NO VERIFICADO (los de prueba fueron recortes de flyers).
- NO VERIFICADO: logo Oviedo blanco transparente real y wordmark/círculo originales; QR con teléfono.

## Logo blanco/negro + hero con fotos verticales (2026-10-19)
- Dos campos de logo (blanco / negro). Plantillas con placa blanca usan el negro; Aprobado usa el blanco. QA avisa si falta el negro sobre fondo claro. Ficha QA incluye logo_negro.
- Hero de Aprobado: si la foto no rellena, se muestra completa sobre un fondo desenfocado de la misma foto (original intacto). Probado con fotos reales verticales y horizontales (aportadas por el usuario).
- NO VERIFICADO: logo negro oficial (la prueba usó un recorte del banner Oviedo Express).

## Catálogo con material real (2026-10-19)
- Probado con el logo negro real, la fachada real y 5 fotos de categoría reales del letrero del usuario. Hallazgos corregidos: rótulos de categoría fijos (ahora editables con `|`) y hero con bandas oscuras (ahora rellena si recorta <15 %, si no completa con fondo desenfocado de la propia foto).
- 50 exportaciones (5 marcas × 5 plantillas × feed/historia) sin errores.
- NO VERIFICADO: logo blanco transparente oficial desde Drive; QR con teléfono; Banana.

## Pulido de calidad de la plantilla Aprobado (2026-10-19)
- Comparación lado a lado con el flyer rojo aprobado: diferencias detectadas y corregidas: foto acercada con zoom/enfoque (sliders nuevos), borde superior diagonal del hero, franja inferior más fina, sombra en títulos, degradado más profundo en cabecera.
- "Aprobado" es ahora la plantilla por defecto y recomendada; las otras 4 quedan como "Básica" (menor acabado; no usar para piezas finales).
- 50 exportaciones sin errores. La calidad final depende también de usar los activos originales de Drive (logos, íconos, QR) y fotos nítidas; las pruebas usaron recortes de baja resolución.
- NO VERIFICADO: comparación con los activos exactos de Drive; QR con teléfono; Banana.

## Conoce nuestra ferretería + QR oficial (2026-10-19)
- Nueva plantilla "Conoce nuestra ferretería" (`web/conoce.js`), por defecto junto a Aprobado. Probada con logo negro real, fotos reales del local y recortes para las categorías: 5 marcas × 6 plantillas × feed/historia = 60 exportaciones sin errores.
- QR autorizado incorporado (`web/assets/qr_canal_oviedo.png`); verificado por software (zxing) dentro de las piezas finales (Historia y Feed).
- Entregados al usuario: flyer Historia 1080×1920 y Feed 1080×1350 "Conoce nuestra ferretería" (El Manzano). Pendiente del usuario: aprobación humana, lectura del QR con teléfono (la confirmación del usuario es sobre el QR oficial), y cargar los íconos originales de Drive (en la prueba se usaron recortes).
- NO VERIFICADO: logo/íconos exactos de Drive en la pieza final; Banana.
