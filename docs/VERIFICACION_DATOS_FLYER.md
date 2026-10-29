# Verificación de datos de flyers (teléfono y textos)

Herramienta local, gratuita y de solo lectura para comprobar flyers (PNG/JPG) contra los datos oficiales antes de publicar.
No usa IA, claves ni internet: lee el texto de cada imagen con el OCR de Windows y compara con `docs/DATOS_OFICIALES.json`.

## Por qué existe
El 29-10-2026 se encontraron piezas de la Feria 2026 con teléfonos equivocados (+56 9 3862 3448 y +56 9 8362 3548) y el texto «Ferreteris». El número oficial es **+56 9 3862 3488** (perfil de WhatsApp Business). Una prueba con IA solo lo detectó cuando se le dieron los datos oficiales; esta herramienta hace esa comparación de forma determinista y sin costo.

## Uso (Windows PowerShell 5.1)
```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\verificar_datos_flyer.ps1 -Carpeta "C:\ruta\flyers" -Salida informe.md [-Recursivo]
```
Código de salida: `0` sin problemas · `1` hay piezas a REVISAR · `2` error de uso.
Estados: **OK** (todos los teléfonos leídos son oficiales) · **REVISAR** (teléfono fuera de la lista, eliminado, con error conocido o texto con error conocido) · **SIN TELÉFONO LEÍDO** (no es error: revisar a mano) · **ERROR DE LECTURA**.

## Mantener los datos
Editar solo `docs/DATOS_OFICIALES.json` (lista de teléfonos válidos, eliminados y errores conocidos). La fuente de verdad es el perfil de WhatsApp Business del dueño; nunca copiar un teléfono desde otro flyer.

## Verificado (2026-10-29)
- Sintaxis válida en PowerShell 5.1 y JSON válido.
- 6 imágenes sintéticas con casos conocidos: número oficial → OK; +56 9 3862 3448 → REVISAR; +56 9 8362 3548 + «Ferreteris» → REVISAR; número eliminado → REVISAR; número oficial + pádel → OK; sin teléfono → SIN TELÉFONO LEÍDO; código de salida 1 (correcto).
- 3 flyers aprobados del 19-10 (`salidas/aprobados`): 3/3 OK, código 0.
- Barrido de 870 PNG y 235 JPG de W: con el mismo OCR: ninguna pieza local con 3448 o 8362 3548.
- No modifica `web/` ni ninguna imagen (solo lectura; `web/studio.js` idéntico a `main`).

## Límites (NO VERIFICADO)
El OCR no lee bien texto muy pequeño o sobre foto; no comprueba la composición ni la ortografía general (solo los textos de la lista de errores conocidos). No reemplaza la revisión humana.
