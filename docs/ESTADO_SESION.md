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
