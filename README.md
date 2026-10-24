# CHAI Consultoría — sitio de validación

## Publicar en GitHub Pages
1. Sube el contenido de esta carpeta a la raíz de un repositorio.
2. Settings → Pages → Source: rama `main`, carpeta `/ (root)`.
3. Abre la URL `https://<usuario>.github.io/<repo>/` (las rutas son relativas, funciona en subcarpeta).

## Reemplazar assets (mismo nombre de archivo)
- `assets/video/banda.mp4` + `assets/img/banda-poster.jpg`: video horizontal 16:9 de la banda.
- `assets/img/team-*.jpg`: fotos del equipo (idealmente ≥ 1000 px de ancho).
- `assets/video/ceo-odoo.mp4` + `assets/img/ceo-odoo-poster.jpg`: video de la CEO.

## Al lanzar a producción
- En `index.html`: cambiar `noindex, nofollow` por `index, follow` y descomentar el canonical.

## Migración a Odoo 19
- Quitar el Bootstrap del CDN (Odoo trae el suyo, el sitio se probó con 5.1.3).
- Acotar las reglas generales de `chai.css` (`section`, `footer`, `label`, `details`, `html`) bajo `#chai-site`.
- Header/footer como plantillas del Website Builder; `chai.js` como componente del sitio público.
