# Alojamiento independiente sin Firebase

## Cloudflare Pages (recomendado)
1. Crear cuenta Cloudflare si es necesario.
2. Workers & Pages > Create > Pages > Connect to Git.
3. Conectar exclusivamente alejandrog45-svg/oviedo-studio-flyers.
4. Rama main, framework None, build command: exit 0, output directory: web.
5. Desplegar y verificar /studio.html.

No habilitar permisos sobre todos los repositorios cuando se pueda seleccionar solo este.

## GitHub Pages (temporal)
Se requiere workflow GitHub Actions para publicar la carpeta web, o moverla a /docs.

## Seguridad
- La versión beta es un editor local en navegador, sin backend y sin autenticación. No cargar archivos confidenciales en dispositivos compartidos.
- Los archivos seleccionados se procesan localmente; el código actual no los envía al servidor.
- No guardar secretos de IA en el frontend ni conectar APIs directamente con claves visibles.
- Nunca usar recursos ni credenciales de otros proyectos.
- La exportación requiere revisión y aprobación humana antes de publicación.
