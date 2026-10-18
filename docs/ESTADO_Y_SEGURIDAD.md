# Estado real y límites

- Repositorio independiente; no editar ni mover recursos de otros proyectos.
- Aplicación web: código preparado, **no desplegada**.
- Firebase: falta crear proyecto exclusivo, configurar Google Auth y dominio autorizado.
- Drive: lectura de metadatos mediante consentimiento OAuth, sin movimientos ni borrados.
- Integraciones ChatGPT, Gemini, Claude y Meta: **no conectadas por API**. Suscripciones personales no equivalen a créditos API.
- No publicar fotografías ni logos privados en este repositorio público.
- Los archivos originales se copian, jamás se mueven. Cotejar SHA-256 antes de aprobar.
- Nunca poner secretos de API en frontend ni subirlos al repositorio.

## Próximos pasos
1. Crear Firebase Spark nuevo con nombre Oviedo Studio Flyers.
2. Registrar app web, habilitar Google Sign-In, configurar OAuth y restricciones de Drive.
3. Incorporar la configuración pública Firebase en despliegue seguro.
4. Probar autenticación, autorización Drive y acceso a subcarpetas.
5. Solo entonces desplegar con Firebase CLI apuntando al proyecto **nuevo**.
