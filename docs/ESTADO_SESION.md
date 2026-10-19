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

## Íconos por defecto (2026-10-19)
- Reemplazados los recortes de prueba por íconos limpios con fondo transparente (descarga autorizada: Wikimedia Commons + Material Design). Probado sin cargar ningún ícono: 60 exportaciones (5 marcas × 6 plantillas × feed/historia) sin errores; flyers "Conoce nuestra ferretería" regenerados.
- NO VERIFICADO: licencias de Instagram/Facebook en Commons; comparación con los íconos exactos de Drive (copiados a 04_LOGOS_OFICIALES/ICONOS_REDES_Y_QR).

## Logos por defecto (2026-10-19)
- Logos blanco y negro transparentes incorporados y conectados (se usan sin cargar nada). Probado sin cargar logos: 60 exportaciones sin errores.
- www.oviedo.cl y Red MTS bloquean la descarga (403/502); no se pudo bajar el logo vectorial oficial. NO VERIFICADO: calidad a tamaño grande; comparación con el vectorial oficial.

## Prompt para Claude Code en PC (2026-10-19)
- `docs/PROMPT_CLAUDE_CODE_PC.md`: prompt completo para clonar el proyecto en `W:\PROYECTOS CUENTA ALEJANDROG45\OVIEDO_STUDIO_FLYERS` sin tocar otros proyectos (revisa LEEME_RUTAS, INVENTARIO_ACCESOS y .gitconfig-alejandro, aplica ahorro de tokens, antirretroceso y blindaje). Rutas y nombres de carpetas del PC provienen de una captura del usuario: NO VERIFICADO desde la nube.

## Auditoría de calidad con fotos reales (2026-10-19, PC)
- Probado local con fachada (1536x709) y terraza pádel (1536x1152) del usuario (solo scratchpad, nada en el repo): 6 exportaciones, 0 errores de consola.
- Defectos hallados y corregidos (rama `claude/calidad-export`): Conoce exportaba con 4 círculos de categoría vacíos -> ahora bloquea; Historia Aprobado exportaba con banda "Marcas confirmadas" vacía -> ahora bloquea (o desmarcar la banda); aviso de foto ampliada >x1.15 (la fachada panorámica se ampliaba x1.18 en Conoce).
- NO VERIFICADO / PENDIENTE de decisión del usuario: (1) fotos de este PC miden 1536 px máx.: usar originales de Drive; (2) pieza Pádel usa logo Oviedo + cinta roja sobre verde: falta logo Padel Rocks y confirmar paleta de cinta; (3) Historia: logo (y≈40) y pie (y≈1863) caen dentro de los 250 px libres que exige CONOCIMIENTO_NEGOCIO; (4) texto "SUCURSAL EL MANZANO" aparece 2 veces en Aprobado (regla "un dato una sola vez").
- Pendiente 2 (logo vectorial): el archivo local `oviedo-ferreterias-logo-blanco-hd.jpg` (4320x1792) es en realidad la versión NEGRA sobre blanco. Los logos se dibujan a <=440 px en lienzos de 1080 px; los PNG de 1000 px ya dan >=2,3x de margen: sin ganancia visible, no se reemplaza. Sigue sin existir el vectorial oficial ni el logo blanco oficial de Drive (NO VERIFICADO).
- Pendiente 3 (QR): zxing-cpp decodifica el enlace oficial del Canal en todas las piezas Aprobado exportadas (Feed/Historia, El Manzano y Pádel). Conoce lo trae apagado por defecto. Lectura con teléfono real: NO VERIFICADA (la hace el usuario). Observación: la pieza Pádel lleva el QR/rótulo del Canal de Ferreterías Oviedo.
- Zona segura de Historia (2026-10-19): Aprobado y Conoce en modo Historia mantienen logo, texto, íconos y QR dentro de y=250..1670 (fondos y foto sangran). Verificado con exportación y guías: Feed Aprobado idéntico píxel a píxel al anterior; Feed Conoce sin cambios de código. Compromiso: en Historia Aprobado con banda de marcas la foto principal queda baja (~240 px); sin banda (desmarcar) queda ~500 px. Pendiente de ojo humano: valorar si se prefiere compactar la banda de marcas.
- Pádel (2026-10-19): el logo Padel Rocks original (PADEL_ROCKS_RAPEL_EST2024_3D_ORIGINAL.png, 1051x1034, opaco con esquinas grises) se recorta en círculo (solo la forma ya circular del logo) en la cabecera Aprobado cuando la marca es Pádel y el logo es casi cuadrado; la banda «Marcas confirmadas» queda apagada por defecto en Pádel (no aplica). La cinta roja NO es defecto: las piezas Alianza aprobadas la usan. Originales usados desde PLAN_MAESTRO_OVIEDO\...\00_MARCA_ORIGINAL_Y_BRANDING e iconos de E:\ANIVERSARIO OVIEDO 2026 (solo lectura, sin copias en el repo). Piezas de prueba en `salidas/` (ignorada por git).
- Pendiente: QR/rótulo «Canal WhatsApp Ferreterías Oviedo» sigue apareciendo en la pieza Pádel; decidir con el usuario si Pádel usa su propio QR (E:\alianza-padel-oviedo\assets\logos\qr-reservas-padel-rocks.png, 1 KB, no probado).
- Pádel sin QR por defecto (2026-10-19, decisión del usuario): al elegir Pádel se oculta el QR del Canal de Ferreterías Oviedo y el ítem «Canal WhatsApp Ferreterías Oviedo»; sin QR la fila de redes y el pie se centran. Verificado: zxing sin QR en Pádel Feed/Historia; Feed El Manzano idéntico píxel a píxel y con su QR.
- Logo Oviedo Expréss y WhatsApp (2026-10-19): marca Express dibuja el logo opaco sobre placa blanca; Pádel admite 1 logo en «aliados» (pastilla blanca con el logo Express bajo el círculo Padel Rocks); Alianza usa los 2. Verificado Feed/Historia: ambos WhatsApp visibles en Pádel y Alianza, número en Express. El único logo Express completo disponible (OVIEDO_EXPRESS_ORIGINAL.png, 176x73) es de baja resolución: el editor avisa; PEDIR original en mayor tamaño. OVIEDO_EXPRESS_Tu_ferreteria_mas_cerca_ORIGINAL.png (417x95) está RECORTADO (le falta la mitad de «EXPRESS»): no usar.
- Material real local (2026-10-19): el usuario dejó 4 carpetas en la raíz (FOTOS ANIVERSARIO 2025, MATERIAL ANIVERSARIO 2026, MATERIAL BUENO, MATERIAL2; ~300 MB, excluidas de git con .git/info/exclude, NO movidas). Probado con originales: Conoce (hero EXHIBICION 4000x1800 + 4 fotos de categoría: EXHIBICION/CARRETILLA/SALA BAÑO/PINTURA) Feed e Historia sin avisos y con calidad profesional; Aprobado Historia con los 13 logos oficiales de LOGOS_MARCAS_CONFIRMADAS (RGBA 288-1497 px) y hero relleno con fachada_aerea_alianza.jpg 4000x2250: nítido, sin bandas borrosas. Con fotos panorámicas y la banda de marcas activa conviene marcar «Rellenar el hero».
- Logo Oviedo Expréss: NO existe suelto en mayor tamaño en ese material; solo dentro de los banners «Atendemos aquí» (695x346 y 170x517). El máximo utilizable sigue siendo OVIEDO_EXPRESS_ORIGINAL.png (176x73). Pedir vectorial/PNG grande al diseñador.
- Recomendación pendiente de OK: mover las 4 carpetas a una subcarpeta `material_fuente/` (ignorada por git, con README) y documentar en LEEME_RUTAS; no se hizo sin orden del dueño.
- Orden (2026-10-19, a pedido del usuario): las 4 carpetas de material se movieron a `material_fuente/` (ignorada por git; 317 archivos verificados antes/después; MANIFIESTO.md con rutas originales). Entrada añadida en LEEME_RUTAS.md (respaldo previo en _respaldos\oviedo-studio-flyers_2026-10-19\).
- Íconos (2026-10-19): Instagram y Facebook por defecto ahora salen de la tira «ICONOS REDES.png» del usuario (200x200, máscara exacta), sin la licencia dudosa de Wikimedia. Los íconos sueltos oficiales (73-81 px) NO se usaron: bajaban la calidad. WhatsApp, ubicación y Canal sin cambios. Verificado: exportación Aprobado Feed y Conoce Historia sin errores y con bordes limpios. NO VERIFICADO: licencia/uso del WhatsApp del repo frente al original del usuario (el original tiene halo).
- Banner Oviedo Expréss (2026-10-19, decisión del usuario): nuevo campo «Banner Oviedo Expréss» en el editor; el banner «Cotiza y compra aquí» (691x345, el de mejor resolución disponible) se dibuja sobre la foto principal a tamaño nativo como máximo (nunca se amplía) en la plantilla Aprobado. Verificado Express Feed/Historia y Pádel Feed. La placa blanca del logo Express solo se usa con un logo opaco cargado y sin banner. Material del tótem Sucursal El Manzano guardado en material_fuente\MATERIAL EXPRESS Y TOTEM 2026-10-19 (sin uso aún).
- CSP en producción (2026-10-19): la regla de /studio.html solo aplicaba a la respuesta 308; la página servida es /studio (200) y NO tenía CSP. Probado local con la CSP sobre la página real: 6 plantillas exportan, 0 errores. Arreglo: añadir regla /studio en _headers.
- Flyer de prueba (2026-10-19): generado desde PRODUCCIÓN (https://oviedo-studio-flyers.pages.dev/studio, con CSP y campo de banner ya desplegados; PRs #9 y #10 fusionados) con material real de material_fuente: Conoce Feed 1080x1350 e Historia 1080x1920 (hero PINTURA, 4 categorías reales, QR del Canal) y Aprobado Historia con fachada aérea 4000x2250 y los 13 logos de marcas. QR decodificado por software en las 3. Salidas en salidas/2026-10-19_flyer-prueba-produccion/ (ignorada por git). NO VERIFICADO: lectura del QR con teléfono; aprobación humana; personas en fotos.
- APROBACIÓN (2026-10-19, usuario): los 3 flyers de prueba quedaron APROBADOS y el QR del Canal CONFIRMADO por el usuario (cierra el pendiente «QR leído con teléfono real»). Copias en salidas/aprobados/2026-10-19_el-manzano/ (ignorada por git). Pendientes que siguen: logo Oviedo Expréss grande (se usa el banner 691 px), móvil físico, login heredado, prueba Banana con el usuario.
- Selector de Drive en el editor (2026-10-19, decisión del usuario; la herramienta de Flow se elimina): web/drive.js + web/drive-config.js + sección «Drive del proyecto». Solo lectura (drive.readonly), solo 6 carpetas fijas, token en memoria, carga en los mismos campos del editor y registra origen_drive (fileId/nombre/carpeta) en la ficha QA. CSP ampliada (accounts.google.com/gsi/client, googleapis.com, frame accounts.google.com). Probado con Drive SIMULADO bajo la CSP real: conectar, listar, foto, 4 categorías en orden, exportar y ficha, 0 errores. ESTADO REAL: NO CONECTADO hasta que el dueño cree el Client ID OAuth (ver docs/DRIVE_SELECTOR.md) y lo ponga en drive-config.js. NO VERIFICADO con Google real.

## CIERRE 2026-10-19 (sesión PC, Claude Code)
- Hecho y en producción (PR #8-#13): bloqueos de exportación (círculos y banda de marcas vacíos), aviso de foto ampliada, zona segura de Historia, Pádel (logo circular, sin QR), logo/banner Oviedo Expréss, íconos oficiales Instagram/Facebook, CSP real en /studio, selector de Drive (NO CONECTADO), login heredado retirado (index.html, main.js, firebase-config.example.js, firebase.json; recuperable en git). 3 flyers APROBADOS por el usuario y QR confirmado.
- Verificación final: ver sección «Verificación de cierre» más abajo.
- PENDIENTES (otra sesión): (1) usuario crea el Client ID OAuth y lo pone en web/drive-config.js; probar el selector con Google real; (2) usuario aporta logo Oviedo Expréss en mayor tamaño (hoy: banner 691 px); (3) probar el editor en un móvil físico; (4) prueba única con Banana en Flow con el usuario presente; (5) titular real de la pieza Aprobado (la aprobada usa «Tu proyecto empieza aquí»); (6) revisar datos de la marca Express (hoy usa @padel_rocks_rapel y pie de Pádel por las reglas globales); (7) tótem Sucursal El Manzano guardado, sin uso; (8) evaluar compactar la banda de marcas en Historia (la foto del hero queda baja); (9) confirmar que el usuario eliminó la herramienta de Flow.

### Verificación de cierre (2026-10-19, tras PR #14 · main e90f020)
- Producción: / -> 302 al editor; /studio 200 con CSP; /studio.html 308; /index.html y /firebase-config.js 404; /drive.js y /approved.js 200. /main.js aún 200 por copia en la caché de Cloudflare (s-maxage 7 días; en origen da 404; archivo inerte, sin secretos).
- Vista previa del PR #14: las 6 plantillas exportan 1080x1350 con 0 errores de consola.
- Repo: árbol limpio, raíz solo con docs/, material_fuente/ (ignorada), salidas/ (ignorada), scripts/, web/, .gitignore, CLAUDE.md, README.md.
- Rutas documentadas verificadas en W: (LEEME_RUTAS.md e INVENTARIO_ACCESOS.html actualizados; respaldos previos en _respaldos\oviedo-studio-flyers_2026-10-19\).
- NO VERIFICADO: selector de Drive con Google real; QR por teléfono lo confirmó el usuario.
