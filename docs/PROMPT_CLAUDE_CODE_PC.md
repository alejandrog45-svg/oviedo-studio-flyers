# PROMPT PARA CLAUDE CODE EN EL PC · OVIEDO STUDIO FLYERS

> Pégalo completo en Claude Code abierto en `W:\PROYECTOS CUENTA ALEJANDROG45`. Generado 2026-10-19 desde la sesión en la nube (estado verificado hasta el commit `6c4337f` de `main`).

---

Eres Claude Code en el PC de Alejandro. Tu trabajo en esta sesión: **clonar el proyecto OVIEDO STUDIO FLYERS en una carpeta nueva y propia, entender cómo funcionan localmente Git/GitHub y las cuentas, y dejarlo listo para trabajar, sin tocar NINGÚN otro proyecto.** Responde en español, breve (modo ahorro de tokens full).

## 0. REGLAS INNEGOCIABLES (blindaje)
1. **Aislamiento**: solo puedes escribir dentro de `W:\PROYECTOS CUENTA ALEJANDROG45\OVIEDO_STUDIO_FLYERS\` (carpeta nueva; si LEEME_RUTAS.md define otra convención de nombres, usa esa). **Prohibido** modificar, mover, borrar o ejecutar nada dentro de las demás carpetas (ej.: `CarbasGO`, `DATA TRANSPORTE`, `PLAN_MAESTRO_OVIEDO`, `PROYECTO SUSHI`, `Plataformas-anuncios-local`, `marcas-transporte-ops`, `_boveda`, `_respaldos`, `herramientas-portables`, `.claude`, `SECRETOS`). Léelas solo si LEEME_RUTAS lo exige y nunca imprimas su contenido sensible.
2. **Secretos**: no abras `SECRETOS\` ni `_boveda\`; si INVENTARIO_ACCESOS.html los nombra, solo anota *qué cuenta/servicio corresponde*, **nunca copies claves, tokens o contraseñas** a chat, repo, docs ni commits. Nada de secretos en `web/` ni en el repo (es público).
3. **No tocar configuración global**: no edites `~/.gitconfig`, credenciales de Windows, `.claude` global ni variables de entorno del sistema. Toda configuración Git va **solo en el repo clonado** (`git config --local`).
4. **Prohibido**: otros repos, Firebase, Cloudflare ajenos, servicios de pago o créditos (Flow/Banana, APIs), borrar archivos, usar el disco D. Costo cero: no gastes ni contrates nada sin preguntar.
5. **Nada se publica automáticamente**. Todo flyer exige revisión y aprobación humana.
6. **Safe Change**: antes de editar, declara `TOCO / RAZÓN / NO-TOCO`. **Antirretroceso**: no revertas ni degradas lo verificado (ver `docs/ESTADO_SESION.md`); valida antes de commit. Marca **NO VERIFICADO** lo que no pruebes. Ninguna IA se declara "integrada" sin prueba real.
7. Orden estricto: archivos nuevos en su carpeta, con README si es una carpeta nueva; temporales fuera del repo (carpeta de scratch o `%TEMP%`), nunca sueltos en la raíz.

## 1. FASE 1 · RECONOCIMIENTO (solo lectura, antes de clonar)
En `W:\PROYECTOS CUENTA ALEJANDROG45`:
1. Lee **`LEEME_RUTAS.md`** completo y extrae: convención de nombres, dónde va cada cosa, rutas permitidas/prohibidas, qué carpetas son de qué cuenta.
2. Abre **`INVENTARIO_ACCESOS.html`** (solo lectura): identifica qué cuentas existen (GitHub, Google/Drive, Cloudflare, Meta, ChatGPT, Gemini…) y cuál corresponde a este proyecto (cuenta **alejandrog45**). No copies ningún secreto.
3. Lee **`.gitconfig-alejandro`** (solo lectura): entiende cómo se separan las identidades Git (p. ej. `includeIf` por carpeta, nombre/correo por cuenta) y el helper de credenciales. Pregunta antes de asumir algo que no esté escrito.
4. Ejecuta (solo lectura): `git --version`, `git config --global --list --show-origin`, `git config --show-scope --get-regexp "credential|user|includeif"`, `gh auth status` (si existe `gh`), y `git config --list --show-origin` dentro de una carpeta hermana **solo si** LEEME_RUTAS lo permite. Resume el flujo local de Git/GitHub y las cuentas en 8–10 líneas.
5. Ejecuta el comando **`/inicio sesion proyectos`** (el usuario lo pidió como `/incio sesion proyectos ahorro tokens`): si existe como skill/comando en tu entorno, úsalo; si **no existe**, no lo inventes: dilo y realiza el equivalente leyendo LEEME_RUTAS + INVENTARIO y aplicando ahorro de tokens, reglas antirretroceso y blindaje.
6. **Para y reporta**: tabla con (a) ruta destino final, (b) identidad Git que usarás, (c) riesgos detectados, (d) lo que no pudiste verificar. **Espera el "ok" del usuario antes de clonar.**

## 2. FASE 2 · CLONAR (tras el ok)
```
cd "W:\PROYECTOS CUENTA ALEJANDROG45"
git clone https://github.com/alejandrog45-svg/oviedo-studio-flyers.git OVIEDO_STUDIO_FLYERS
cd OVIEDO_STUDIO_FLYERS
git config --local user.name  "<según .gitconfig-alejandro>"
git config --local user.email "<según .gitconfig-alejandro>"
git status -sb ; git log --oneline | head -5
```
- Verifica que `git remote -v` apunte **solo** a `alejandrog45-svg/oviedo-studio-flyers`. Si GitHub pide credenciales, usa el flujo de la cuenta **alejandrog45** descrito en el inventario (no pegues tokens en la consola compartida).
- Trabaja siempre en **ramas** (`claude/<tema>`), nunca directo a `main`. Flujo: rama → commit → push → PR → CI verde → merge a `main` = deploy automático en Cloudflare Pages. **Fusiona solo con autorización explícita del usuario.**
- Lee en este orden: `CLAUDE.md`, `docs/ESTADO_SESION.md`, `docs/CONOCIMIENTO_NEGOCIO.md`, `docs/INFORME_FINAL.md`, `docs/FLOW_BANANA_PROTOCOLO.md`, `docs/PUENTE_IA.md`.

## 3. CONOCIMIENTO DEL PROYECTO
**Qué es**: OVIEDO STUDIO = editor web independiente que compone flyers PNG para Ferretería Oviedo (El Manzano), Oviedo Expréss, Pádel Oviedo, Alianza Pádel y Feria Ferretera. Corre 100 % en el navegador (sin backend, sin cuentas, sin subir imágenes). Independiente de PLAN_MAESTRO_OVIEDO y de cualquier otro proyecto.
- Repo: `alejandrog45-svg/oviedo-studio-flyers` (público) · rama `main` · producción **https://oviedo-studio-flyers.pages.dev** (Cloudflare Pages: build `exit 0`, salida `web`, framework None). Las ramas generan vista previa `https://<rama>.oviedo-studio-flyers.pages.dev`.
- Archivos clave: `web/studio.html` + `web/studio.js` (editor), `web/approved.js` (plantilla Aprobado), `web/conoce.js` (plantilla Conoce nuestra ferretería), `web/qrcode.js` (qrcode-generator 1.4.4, MIT), `web/_headers` (CSP y cabeceras), `web/assets/{qr_canal_oviedo.png, iconos/, logos/}`. `web/index.html`+`main.js` = login Firebase heredado e inactivo (no tocar; decidir con el usuario si se retira).
- Plantillas: **Conoce nuestra ferretería** (foto interior a sangre, logo negro en placa, cinta de lema, título gigante, 4 categorías en círculos), **Aprobado** (cabecera con degradado, hero con corte diagonal, banda de marcas, contacto, redes, QR) y 4 "Básicas" (menor acabado, no para piezas finales). Formatos: Feed 1080×1350, Historia 1080×1920 (contenido importante antes de y≈1800).
- Marcas con datos oficiales cargados (fuente: reglas globales en Drive): El Manzano (WhatsApp +56 9 3862 3488, @oviedo_elmanzano, Carretera H66 KM 60 S/N, Las Cabras, /oviedoelmanzano, www.oviedo.cl); Oviedo Expréss (rotular "Cotiza Oviedo Express" con el WhatsApp de Oviedo); Pádel (reservas +56 9 5923 7808, @padel_rocks_rapel, Sector El Estero s/n, Las Cabras, "Despacho en el día · Retiro 15:30 hrs"); Alianza (ambos teléfonos, logos juntos en un bloque). Canal WhatsApp: https://whatsapp.com/channel/0029Vb9OFHXGU3BGa2dgUn0e (QR oficial **autorizado por el usuario** en `web/assets/qr_canal_oviedo.png`).
- Reglas de marca (inviolables): logo Oviedo y fachada intocables (no redibujar/recolorear/recortar/regenerar); Oviedo = Montserrat 800/900, rojo #E1141E→#9E0C14, negro, blanco; Pádel = Fraunces, verde #14693F/#0B3D26, rosa #F6A8C4, blanco (no mezclar paletas); logo **blanco** sobre fondos de color/oscuros, **negro** sobre fondos claros; cero líneas grises ni bordes sueltos; solo fotos reales; no inventar precios, fechas, descuentos, horarios (el horario 08:30–18:00 NO se agrega sin orden); promos de El Manzano no mencionan otras sucursales; un dato una sola vez por pieza; texto de pie ≥17 px; personas en foto solo con autorización; precios visibles en fotos solo si siguen vigentes; datos confirmados de la Feria 2026: 10 % en todos los productos, 6 de noviembre, +15 expositores.
- Fotos y material del usuario **no están en el repo** (es público: hay clientes y etiquetas de precio). Viven en el Drive del usuario y se cargan en el editor.

## 4. CONEXIONES Y CUENTAS (estado real)
| Pieza | Estado |
|---|---|
| GitHub `alejandrog45-svg` | Operativo (repo, ramas, PR, merge) |
| Cloudflare Pages `oviedo-studio-flyers` | Operativo; despliega desde `main`; solo este proyecto |
| Google Drive (solo lectura de originales) | Carpeta raíz del proyecto id `1skgd6eeBI57Mfp3cmEm18IRCbkTzP70h`: 01 aprobados, 02 pendientes QA, 03 fotos originales, 04 logos oficiales (+ `MARCAS_CONFIRMADAS/` 13 logos y `ICONOS_REDES_Y_QR/`), 06 app, 07 packs, 08 documentación/reglas, 10 inventario. Reglas globales de flyers están en otra carpeta de Drive del usuario: léelas, no las modifiques |
| Flow / Banana (Gemini) | Acceso **manual** con la cuenta Google del usuario. Proyecto/herramienta: https://flow.google.com/project/f45f26cf-bc8b-40b6-ab1a-94fd98ac93eb/tool/c228322c-4960-41a2-bc5f-701860a8b116 . **No hay API**. Banana sin ejecutar (el usuario autorizó UNA prueba con créditos, aún pendiente: hazla solo con él presente, siguiendo `docs/FLOW_BANANA_PROTOCOLO.md`) |
| ChatGPT / Meta AI / Gemini | Enlaces manuales; **NO VERIFICADO**; sin claves ni API |
| Claude Code | Verificado (cloud y PC) |
Regla: ninguna integración por API sin decisión y costo aprobados por el usuario; las claves jamás van en `web/`.

## 5. FLUJO DE TRABAJO LOCAL
1. `git switch main && git pull --ff-only` → `git switch -c claude/<tema>`.
2. Probar localmente: `cd web && python -m http.server 8780` (o `npx serve web`) → `http://localhost:8780/studio.html`. Para verificación automática: Playwright con Chromium (`npm i -D playwright` **en una carpeta temporal fuera del repo**, no ensuciar el proyecto), exportando PNG de las 5 marcas × plantillas × Feed/Historia y comprobando 0 errores de consola y dimensiones exactas 1080×1350 / 1080×1920. QR: decodificar con zxing (`pip install zxing-cpp opencv-python-headless`), esperado el enlace del Canal. Las pruebas usan imágenes de prueba, nunca material privado en el repo.
3. Antes de cada commit: `node --check` de `web/*.js`, regresión completa, revisar el diff (sin secretos ni fotos privadas) y actualizar `docs/ESTADO_SESION.md`.
4. Commit con mensaje claro → push → PR → esperar CI de Cloudflare en verde → informar al usuario → merge solo si él lo autoriza.
5. Verificar producción tras el merge (cabeceras CSP, archivos nuevos y prueba completa contra https://oviedo-studio-flyers.pages.dev).
6. Al cerrar cada sesión: actualizar `CLAUDE.md`, `docs/CONOCIMIENTO_NEGOCIO.md` y `docs/ESTADO_SESION.md`; commit + deploy.

## 6. PENDIENTES (por prioridad)
1. **Pruebas del usuario con material real**: cargar en el editor las fotos y los logos/íconos originales desde Drive y validar la calidad frente a los flyers aprobados (hay una plantilla "Aprobado" y "Conoce nuestra ferretería" ya alineadas con ellos).
2. **Logo vectorial oficial** de Oviedo (SVG o PNG grande): www.oviedo.cl bloquea la descarga automática (403); los logos actuales en `web/assets/logos/` son PNG transparentes derivados de JPG de ≈1300–1500 px y pueden verse suaves a tamaño grande. Si el usuario lo consigue, reemplazarlos.
3. **QR del Canal leído con un teléfono real** (las reglas de Drive lo exigen antes de aprobar; ya se decodifica por software).
4. **Prueba única con Banana en Flow** (autorizada, pendiente; con el usuario).
5. Licencias NO VERIFICADAS de los íconos de Instagram/Facebook (Wikimedia Commons); reemplazar por los originales de Drive si es posible (`web/assets/iconos/README.md`).
6. Probar en un **móvil físico** (hasta ahora solo emulación).
7. Decidir si se retira el login heredado (`web/index.html`, `web/main.js`).
8. Mejoras posibles: plantillas para Pádel/Alianza con logos originales reales, más formatos (1080×1080), selector de Drive dentro del editor (requiere cliente OAuth propio del proyecto; no iniciado).

## 7. LO QUE DEBES ENTREGAR AHORA
Una vez hecha la Fase 1: un reporte corto con (1) flujo local Git/cuentas entendido, (2) ruta destino y identidad Git, (3) riesgos y dudas, (4) confirmación de que no tocaste nada fuera de la carpeta nueva. Luego espera el ok del usuario para la Fase 2.
