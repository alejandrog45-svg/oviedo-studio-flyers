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
