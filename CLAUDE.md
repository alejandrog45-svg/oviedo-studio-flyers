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
- LEGADO V1 (no publicar): https://oviedo-studio-flyers.pages.dev/studio.html (CSP activa). Sin Firebase ni login (retirado 2026-10-19). Selector de Drive solo lectura: `docs/DRIVE_SELECTOR.md` (NO CONECTADO hasta crear el Client ID OAuth).
- Cuenta: GitHub `alejandrog45-svg` (usar `gh.cmd` de W:). Flujo: rama `claude/<tema>` -> PR -> CI Cloudflare verde -> fusión (el usuario autorizó fusionar directo en esta sesión; en sesiones nuevas pedir autorización).
- Carpetas locales ignoradas por git: `material_fuente/` (originales; README y MANIFIESTO) y `salidas/` (`salidas/aprobados/` = aprobados por el usuario). No copiar originales al repo.
- Pendientes y estado detallado: final de `docs/ESTADO_SESION.md` (sección CIERRE).

## Auditoría documental 2026-10-27

La auditoría transversal de W: está registrada en `W:\PROYECTOS CUENTA ALEJANDROG45\_ARCHIVO_DOCUMENTAL\2026-11-12_docs_historicos\INVENTARIO_DOCUMENTACION_2026-10-27.md`. Este proyecto sigue aislado de Plan Maestro y Nexus. No mover el piloto, `material_fuente`, `entregas_vigentes` ni respaldos hasta verificar referencias internas.

## Auditoría individual 3 — 2026-10-27

- Git verificado en lectura: identidad `alejandrog45@gmail.com`, cuenta GitHub `alejandrog45-svg`, rama `main` igual a `origin/main` (`467d43a`, 0 adelante/0 atrás).
- El raíz publica Cloudflare Pages `oviedo-studio-flyers` desde `web/`; el Worker V2 `nexus-oviedo-studio-v2` es otra capa y no se mezcla con este repo.
- El piloto `PROTOTIPO DE PRUEBA NO EDITAR PROYECTO\PILOTO_GEMINI_GENUINO` es una carpeta local no seguida por este repo raíz. Se conserva intacto; es fuente de criterios y entregas, no destino de movimientos.
- 30 archivos Python del piloto pasan análisis de sintaxis. Sus regresiones generativas no se ejecutaron porque crean fixtures/exportaciones en disco; queda pendiente una ejecución controlada si se autoriza.
- No se movió, borró, renombró, publicó, desplegó ni modificó ningún material o rama en esta auditoría.

## Estado actualizado de continuidad — 01-11-2026

- Cuenta y aislamiento: W:, `alejandrog45@gmail.com`, GitHub `alejandrog45-svg`; este proyecto sigue separado de Nexus V2, Plan Maestro, E: y Firebase.
- Git local verificado: `main...origin/main`, último commit local `0e9af58`; quedan sin seguimiento `PROTOTIPO DE PRUEBA NO EDITAR PROYECTO/`. No se publica ni se elimina sin revisión del dueño.
- Rutas vigentes de trabajo: `material_fuente\MATERIAL ANIVERSARIO 2026\`, `material_fuente\CAMPANAS_2026\`, `_ARCHIVO_CAMPANAS\ANIVERSARIO_2026\local\OVIEDO_STUDIO_FLYERS\salidas\FLAYER CONFIRMADOS Y CORREGIDOS 01-11-2026\`, `_ARCHIVO_CAMPANAS\ANIVERSARIO_2026\local\OVIEDO_STUDIO_FLYERS\salidas\GIF_MARCAS_2026-11-01\` y `_ARCHIVO_CAMPANAS\ANIVERSARIO_2026\local\OVIEDO_STUDIO_FLYERS\salidas\locucion_aniversario_2026\`.
- Control de originales: el GIF de 20 marcas queda obsoleto; el conjunto vigente es el de 23 marcas. No regenerar ni publicar piezas sin aprobación expresa.
- Gemini CLI, puente local y Worker `nexus-oviedo-studio-v2` son infraestructura aparte; no se consideran integración de este repo ni se mezclan con Cloudflare Pages `oviedo-studio-flyers`.
- Respaldo de esta actualización: `_respaldos\docs-antes-2026-11-01\`.


## Orden explícita del dueño — regla transversal 2026-11-02
- Toda mejora, integración, conexión, commit, push o deploy de este proyecto requiere orden expresa concreta; no se reutiliza autorización de otra tarea.
- Declarar `TOCO / ARCHIVO / RAZÓN / NO TOCO`, respaldar y verificar antes y después. Sin orden: `BLOQUEADO-PROHIBIDO`.

## Audio nuevo para flyer aprobado — 2026-11-03
- Estado: HECHO-VERIFICADO. Se crearon dos variantes nuevas de locución para Feria Ferretera El Manzano 2026, ambas WAV de 40,0 segundos exactos.
- Ruta: `_ARCHIVO_CAMPANAS/ANIVERSARIO_2026/local/OVIEDO_STUDIO_FLYERS/salidas/locucion_aniversario_2026/14_FERIA_2026_INSTAGRAM_40S/`.
- Variante A: `feria_2026_instagram_40s_variante_A_venta_directa.wav`; variante B: `feria_2026_instagram_40s_variante_B_fiesta_manazano.wav`.
- Guiones y control: `guion_variante_A_venta_directa.txt`, `guion_variante_B_fiesta_manazano.txt` y `MANIFIESTO.md` en la misma carpeta.
- QA: 40,0 s exactos, WAV mono 24 kHz/16-bit; originales e históricos preservados. No se ejecutó publicación, commit, push ni deploy.
- Registro Drive: carpeta `https://drive.google.com/drive/folders/1uxT3w7iE69g2ODKmJZ4tDck2jjknyjAc`; ambos WAV y el manifiesto quedaron cargados allí.
- Guía operativa para Gemini, Meta y Claude: `_ARCHIVO_CAMPANAS/ANIVERSARIO_2026/local/OVIEDO_STUDIO_FLYERS/salidas/locucion_aniversario_2026/GUIA_USO_IA_Y_CONEXIONES.md`; el punto de entrada debe permanecer disponible también en Drive.
- Guía sincronizada en Drive: `https://drive.google.com/file/d/1DXxYttW5ujfuRBdKkdhmy7OPM0zrtvUR/view?usp=drivesdk`; README: `https://drive.google.com/file/d/15AdXdKBIl9en1tQmb9r9us3xIiyA6cvw/view?usp=drivesdk`.

## Cierre de entrega aprobada — 2026-11-03
- Estado: HECHO-VERIFICADO. El usuario aprobó la variante Feria Ferretera El Manzano 2026 para Instagram Feed en 1080×1350 PNG.
- Ruta local: `_ARCHIVO_CAMPANAS/ANIVERSARIO_2026/local/OVIEDO_STUDIO_FLYERS/salidas/aprobados/2026-11-03_feria-instagram/feria_2026_instagram_feed_1080x1350_aprobado_header_foto_ancho_completo.png`.
- Manifiesto local: `_ARCHIVO_CAMPANAS/ANIVERSARIO_2026/local/OVIEDO_STUDIO_FLYERS/salidas/aprobados/2026-11-03_feria-instagram/MANIFIESTO.md`.
- Drive: carpeta `https://drive.google.com/drive/folders/1fqOhR_fU4aF2OF8eyrWCgUBC9j3OlGrN`; archivo `https://drive.google.com/file/d/1t-2ZCsEwty8DlO3ltm1CyzNhwRlg6-rT/view?usp=drivesdk`.
- Verificación: SHA-256 `64BD46BEEAA42ECE2D52DDC5FF90B28BFB05968D6D1CB6718FA7FD7B19222CA4`; originales, históricos y diseño aprobado preservados.
- No se ejecutaron commit, push, publicación ni deploy.


## Estado de publicacion vigente — 2026-11-05

- V1 Cloudflare Pages (https://oviedo-studio-flyers.pages.dev/studio y studio.html): LEGADO. No borrar ni publicar ahi.
- V2 Worker (https://nexus-oviedo-studio-v2.alejandrog45.workers.dev), repo alejandrog45-svg/nexus-oviedo-studio-v2, carpeta NEXUS_OVIEDO_STUDIO_V2, version activa 93c4fac5-d6c6-4eb6-8512-68534c8ae03c: ACTIVO.
- Los FLYERS APROBADOS siguen en salidas\aprobados; este repositorio V1 no es la fuente de produccion del panel activo.

## 24 marcas (FullSello) — 2026-11-05
- Se sumó FullSello a última hora: ahora son **24** marcas (antes 23). Reemplaza lo dicho arriba sobre "el conjunto vigente es el de 23".
- Logo: `material_fuente\RECURSOS_COMPARTIDOS\LOGOS_MARCAS_CONFIRMADAS\logo_fullsello_USUARIO_20261105.jpeg`; control: `CONTROL_LOGOS_MARCAS_2026.csv/.md` (24 participantes).
- GIF de 24 y Drive: los hace Codex por el canal IA; ver `docs\ORDEN_CODEX_GIF24_DRIVE_2026-11-05.md` (en `W:\PROYECTOS CUENTA ALEJANDROG45\docs\`) y su cierre. Flyers NO actualizados (siguen con 23). Respaldo: `C:\ARCHIVO_IA\backups\gif24_2026-11-05\`.
- Cierre 2026-11-05 (HECHO-VERIFICADO): GIF de 24 en `_ARCHIVO_CAMPANAS\ANIVERSARIO_2026\local\OVIEDO_STUDIO_FLYERS\salidas\GIF_MARCAS_2026-11-05\` (SHA-256 `89EAD497E166A497640E5F326DA9887D5D4995B8C732E84493850B30FA0BA693`, igual en Drive MARCAS_CONFIRMADAS, que tiene 24 logos `logo_*`); este es el GIF vigente, los de 20 y 23 son historial. Detalle y hashes: `_ARCHIVO_CAMPANAS\ANIVERSARIO_2026\local\OVIEDO_STUDIO_FLYERS\salidas\GIF_MARCAS_2026-11-05\MANIFIESTO.md`. No se hizo commit, push ni deploy.

## Informe stock/precio por marca — 2026-11-05
- HECHO-VERIFICADO: `_ARCHIVO_CAMPANAS\ANIVERSARIO_2026\local\OVIEDO_STUDIO_FLYERS\salidas\informe_stock_marcas_2026-11-05\informe_stock_marcas.html` (24 marcas, 2460 filas, datos ERP en vivo 19:37, filtro por marca e impresión por marca). Código en `informe_stock_marcas\`. Copia en Drive `11_CAMPANAS\FERIA_ANIVERSARIO_2026\INFORME_STOCK_MARCAS_2026-11-05\`. Detalle en `INDICE_MAESTRO.md` (W:). No se hizo commit, push ni deploy.

## Informe de marcas v2 — 2026-11-06
- Ver `INDICE_MAESTRO.md` (W:) sección "Informe de marcas v2". Foto con datos: solo dueño. ZIP sin datos: login Justime (diseño tipo Justime), descarga real ERP NO VERIFICADA. Descuento 10% PROVISORIO. v2 no subida a Drive. Sin commit/push/deploy; E: solo lectura.

## Informe de marcas v3 — entrega final 2026-11-06
- Archivo único `_ARCHIVO_CAMPANAS\ANIVERSARIO_2026\local\OVIEDO_STUDIO_FLYERS\salidas\informe_stock_marcas_2026-11-05\informe_stock_marcas.html` (login estilo Justime + "Solo entregar"; precios estáticos, stock en vivo opcional vía `informe_stock_marcas\app\servidor.ps1`, NO VERIFICADO con ERP real). Diseño aprobado por el dueño: mantenerlo. Detalle en `INDICE_MAESTRO.md` (W:). Sin commit/push/deploy; contiene precios: no publicar.
- Corrección 2026-11-06: entrada = solo botón "Entrar" (sin login ni stock en vivo); ver `INDICE_MAESTRO.md` (W:).

## Cierre video post aniversario — 2026-11-11
- Carpeta `_ARCHIVO_CAMPANAS\ANIVERSARIO_2026\local\NEXUS_OVIEDO_STUDIO_V2\material\video_post_aniversario\` ordenada (ver su `MANIFIESTO.md`). Guiones v7.1/v7.2/v7.3 (video de 49,29 s) y sus MP3 en `audios_borrador\v7_49s\`: 48,68 / 45,48 / 45,96 s. 24 marcas, "noveno aniversario de Oviedo Ferreterías El Manzano" al abrir y cerrar; pronunciación: Hiundái, eme te ese, Fe-mo-glás, Wéser (con w).
- HECHO-VERIFICADO: generación y conversión. PENDIENTE DEL DUEÑO: escuchar, elegir versión y, si quiere, ajustar v7.2/v7.3 al largo exacto con ffmpeg. Drive: carpeta "Oviedo Studio - Audios". Sin commit, push ni deploy (la carpeta salidas\ está fuera de git).
- APROBADO por el dueño 2026-11-11: las tres versiones v7 (guion y audio) se usarán las tres. No existe video de 49,29 s: era solo el largo objetivo del audio; el audio se adaptará después al video original (88,96 s, intacto). Cierre documentado en Drive, GitHub (docs/) y `INDICE_MAESTRO.md`.
