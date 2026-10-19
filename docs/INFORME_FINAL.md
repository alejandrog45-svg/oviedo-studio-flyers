# Informe final · Oviedo Studio (2026-10-19)

## Fase 6 · Reglas de marca — HECHO
Reglas de Drive (copia del proyecto + reglas globales, solo lectura) en `docs/CONOCIMIENTO_NEGOCIO.md`; datos, fuentes y colores por marca cargados en el editor con QA por marca.

## Fase 7 · Integraciones IA — acceso manual (sin API)
| IA | Estado |
|---|---|
| Claude Code | VERIFICADO (opera el repo, PR y deploy de vista previa) |
| Gemini / Flow / Banana | Enlace + instrucciones estrictas; Banana NO EJECUTADA (créditos autorizados, falta sesión de Flow del usuario) |
| ChatGPT | Enlace manual; NO VERIFICADO |
| Meta AI | Enlace manual; NO VERIFICADO |
Ninguna se declara integrada por API.

## Fase 8 · Seguridad
- Sin secretos en el repo (búsqueda de claves/tokens/credenciales; `.gitignore` cubre config y claves).
- Editor 100 % local: imágenes no salen del navegador; sin backend ni cuentas; única dependencia externa: Google Fonts.
- Añadido `web/_headers`: nosniff, no-referrer, X-Frame-Options DENY, Permissions-Policy vacía y CSP restrictiva en `/studio.html` (solo self + Google Fonts, sin eval ni scripts externos). Probado con servidor local que aplica la CSP: exportación y fuentes OK.
- `web/index.html` + `main.js` (login Firebase/Drive) es código heredado inactivo: sin `firebase-config.js` no funciona; `/` redirige al editor. No se tocó. Recomendación: retirarlo si no se usará (decisión del usuario; no se borra nada).
- Nada se publica automáticamente; ficha QA con `aprobado_por_usuario:false`, `publicado:false`.

## Fase 9 · Estado
Verificado: ver `ESTADO_SESION.md`. NO VERIFICADO: fotos/logos oficiales reales en el editor, móvil físico, legibilidad visual con material real, QR del Canal (no implementado), Banana, ChatGPT/Meta AI/Gemini.
Próximos pasos: (1) probar con originales de Drive; (2) ejecutar la prueba Banana en Flow con el protocolo; (3) implementar QR del Canal con prueba en teléfono; (4) decidir retirar el login heredado.
