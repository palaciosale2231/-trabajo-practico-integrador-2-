# Trabajo Práctico Integrador N° II

Frontend para el sistema de blog del Trabajo Práctico Integrador N° I. Está
desarrollado con React, Vite, React Router y Tailwind CSS.

## Requisitos

- Node.js y npm.
- El backend del TP I iniciado en `http://localhost:3001`.

Repositorio del backend:  
https://github.com/palaciosale2231/trabajo-practico-integrador-1

## Iniciar el frontend

Desde la carpeta del proyecto:

```powershell
cd mi-proyecto
npm install
Copy-Item .env.example .env.local
npm run dev
```

Vite inicia normalmente en `http://localhost:5173`. Para cambiar la dirección
del backend, configura `VITE_API_URL` en `.env.local`; por defecto es
`http://localhost:3001/api`.

Comprobaciones disponibles:

```powershell
npm run lint
npm run build
```

## Integración con el backend

Las operaciones usan `fetch` con `credentials: 'include'` y esperan los
endpoints `/api/articles`, `/api/auth/login`, `/api/auth/register` y
`/api/auth/logout`.

El backend debe permitir CORS para `http://localhost:5173` con
`credentials: true`, habilitar el análisis de cookies y montar sus routers de
autenticación y artículos bajo `/api/auth` y `/api/articles`. En la versión
publicada actualmente, `app.js` solo monta el router de usuarios y no configura
CORS; además, la ruta de artículos debe sincronizar los nombres de archivo y
exportaciones del controlador antes de poder montarse. Estos cambios se hacen
en el repositorio del backend, no en este frontend.

## Estructura

El código de la aplicación está en `mi-proyecto/src`, organizado en
`components`, `hooks`, `pages` y `router`. La sesión del frontend se conserva en
`localStorage` mediante `isLogged`; el JWT permanece en una cookie HTTP-only
administrada por el backend.

## Ramas

El trabajo se organizó en `main`, `develop`, `desarrollo-pantallas` y
`proteccion-rutas`, integrando ambas ramas de trabajo a `develop` y finalmente
`develop` a `main`.
