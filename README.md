# Oviedo Studio Flyers

Proyecto **independiente** para producción y control de flyers de Ferretería Oviedo El Manzano, Oviedo Expréss, Pádel Oviedo, Alianza Pádel y Feria Ferretera.

## Estado
- Base local V14 disponible en ZIP independiente en Google Drive.
- Editor web: pendiente de configuración y despliegue Firebase propio.
- Integraciones IA: accesos externos, **no** APIs autenticadas.
- Prohibido modificar, mover o borrar originales y otros proyectos.
- No subir contraseñas, tokens, claves privadas ni fotografías confidenciales al repositorio público.

## Biblioteca independiente
https://drive.google.com/drive/folders/1skgd6eeBI57Mfp3cmEm18IRCbkTzP70h

## Paquete V14
https://drive.google.com/file/d/1zUfjpIhd009TORS6f5LVyoyiMu5Fo3gy/view

**Aviso:** El ZIP V14 debe verificarse contra su manifiesto; la copia en Drive no ha sido cotejada byte a byte con la versión local.

## Protección de originales
Las fotografías y logos originales se utilizan como capas protegidas. Nunca regenerar la fachada, carpas, caseta, señalética ni marcas reales. Las piezas generadas por IA requieren aprobación expresa antes de publicación.

## Publicación
Cloudflare Pages despliega web/ desde main (build xit 0). Flujo: rama claude/<tema> -> PR -> CI verde -> fusión = despliegue. No hay Firebase en este proyecto (el login heredado se retiró el 2026-10-19). Claves de proveedor, nunca en HTML/JS público.

## Carpetas locales (ignoradas por git)
- material_fuente/: originales del usuario (solo lectura, ver su README y MANIFIESTO).
- salidas/: flyers exportados; salidas/aprobados/ los aprobados por el usuario.

## Operación
La cuenta personal de ChatGPT, Gemini, Claude o Meta AI no implica automáticamente permisos API o llamadas gratuitas.
