# Centro de Mando — Guayaquil City F.C.

Aplicación web de gestión de tareas del Departamento, conectada a Supabase
(base de datos + login) y lista para publicar en Netlify.

## Cómo se publica (resumen)

1. Subir esta carpeta a un repositorio de GitHub **del club**.
2. En Netlify: "Add new site" → "Import an existing project" → elegir el repositorio.
3. Netlify detecta la configuración (`netlify.toml`) y construye solo. Build:
   - Command: `npm run build`
   - Publish: `dist`
4. Al terminar, Netlify entrega una dirección web. Esa es la app.

## Cómo crear usuarios del equipo (opción 1: solo el administrador crea cuentas)

En el panel de Supabase:
1. Menú izquierdo → **Authentication** → **Users**.
2. Botón **Add user** → **Create new user**.
3. Escribir correo y una contraseña inicial. Repetir por cada persona del equipo.

La app no tiene registro abierto: solo entra quien tenga una cuenta creada aquí.

## Datos de conexión

Están en `src/supabaseClient.js`. La *publishable key* es segura de incluir en el
código. La *secret key* NUNCA va aquí ni se comparte.

## Hacer cambios después

El código vive en el repositorio de GitHub del club. Para cambiar algo:
reemplazar el archivo correspondiente en el repositorio → Netlify reconstruye solo.

## Estructura

- `src/App.jsx` — la aplicación (Inicio, calendario, tablero, subtareas, bitácora, catálogos).
- `src/Login.jsx` — pantalla de ingreso.
- `src/main.jsx` — punto de entrada; decide si mostrar login o la app.
- `src/supabaseClient.js` — conexión a Supabase.
