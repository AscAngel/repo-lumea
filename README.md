# LUMEA · Repositorio del proyecto

Sitio estático en React + TypeScript + Vite para leer dos PDF directamente en la página. El primero es una exportación del Google Doc y el segundo, una exportación de la presentación de Canva.

## Agregar los documentos

Guarda ambos archivos en **`public/recursos/` de este proyecto** (`RepoEnLinea`, no `L.U.M.E.A/web`). Usa exactamente estos nombres:

| Origen | Nombre en `public/recursos/` |
| --- | --- |
| Google Docs → Archivo → Descargar → Documento PDF | `lumea.pdf` |
| Canva → Compartir → Descargar → PDF | `lumea-presentation.pdf` |

La página detecta cada PDF y lo muestra en un lector integrado. Mientras no exista un archivo, muestra una portada ilustrativa. No hay que cambiar el código si usas esos nombres. Para actualizar el contenido, sustituye el PDF y haz un nuevo push.

Si quieres ajustar los títulos o las rutas, edita `src/resources.ts`.

## Verlo en local

Requiere Node.js 22 o superior.

```powershell
npm install
npm run dev
```

Abre la URL indicada por Vite, normalmente `http://localhost:5173/`. Después de copiar o sustituir los PDF, recarga la página. Para comprobar la versión de publicación:

```powershell
npm run build
npm run preview
```

## Publicar en GitHub Pages

El workflow `.github/workflows/pages.yml` compila y publica cada push a `main` o `master`. Vite ajusta la ruta base al nombre del repositorio durante GitHub Actions.

1. Sube todos los archivos del proyecto, incluidos los PDF, `.github/workflows/pages.yml` y `package-lock.json`.
2. En **Settings → Pages → Build and deployment → Source**, selecciona **GitHub Actions**. El workflow intenta habilitar Pages automáticamente; si la primera ejecución no puede hacerlo, selecciona esa opción manualmente y vuelve a ejecutar el workflow.
3. Revisa el resultado en **Actions → Publicar LUMEA en GitHub Pages**.

`node_modules/` y `dist/` están excluidos de Git.
