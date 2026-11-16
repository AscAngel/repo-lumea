# LUMEA · Repositorio del proyecto

Sitio estático en React + TypeScript + Vite para presentar dos documentos y un video. Está preparado para GitHub Pages.

## Verlo en local

Requiere Node.js 22 o superior.

```powershell
npm install
npm run dev
```

Abre la URL que muestra Vite, normalmente `http://localhost:5173/`. Para comprobar la versión de publicación:

```powershell
npm run build
npm run preview
```

## Agregar los archivos

1. Copia los documentos y el video a `public/recursos/`.
2. Abre `src/resources.ts` y asigna la ruta `file` a cada documento y a `projectVideo`.
3. Ajusta los títulos y formatos. Si tienes una imagen de portada, agrega su ruta en `cover`.

Ejemplo de documento:

```ts
{ id: 'documento-01', number: '01', title: 'Memoria del proyecto', format: 'PDF', file: 'recursos/memoria.pdf', cover: 'recursos/memoria.jpg' }
```

Ejemplo de video:

```ts
export const projectVideo: VideoResource = {
  title: 'Demostración de LUMEA',
  file: 'recursos/demostracion.mp4',
  cover: 'recursos/demostracion.jpg',
}
```

Los PDF muestran su primera página en la tarjeta si no se asigna una portada. Para Word se recomienda una portada, ya que el navegador no muestra el documento dentro de la página. Los MP4/WebM locales se reproducen en la sección de video. También se puede usar una URL pública HTTPS para el video.

Los archivos se agregan al repositorio y se publican con el siguiente push. Esta página no almacena archivos enviados desde el navegador.

## Publicar en GitHub Pages

El workflow `.github/workflows/pages.yml` compila y publica cada push a `main` o `master`. Vite ajusta la ruta base al nombre del repositorio durante GitHub Actions.

1. Sube los archivos de esta carpeta al repositorio, incluidos `.github/workflows/pages.yml` y `package-lock.json`.
2. En **Settings → Pages → Build and deployment → Source**, selecciona **GitHub Actions**. El workflow intenta habilitar Pages automáticamente; si la primera ejecución no puede hacerlo, selecciona esa opción manualmente y vuelve a ejecutar el workflow.
3. Revisa el resultado en **Actions → Publicar LUMEA en GitHub Pages**.

`node_modules/` y `dist/` están excluidos de Git.
