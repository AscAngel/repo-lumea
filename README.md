# L.U.M.E.A. | Project Resources

A React, TypeScript, and Vite site that presents two project PDFs in embedded readers. The site is ready for GitHub Pages.

## Resources

| Resource | File |
| --- | --- |
| Earth Analog Identification and Evaluation (technical report) | `public/recursos/lumea.pdf` |
| Preparing for the Moon and Mars (project presentation) | `public/recursos/lumea-presentation.pdf` |

Both PDFs are included in the repository and open inside the page. To publish an updated version, replace the matching file and push the change. Titles and paths are defined in `src/resources.ts`.

## Project team

- Katia Alejandra Ávalos García
- Diego Iván Hernández Muñoz
- Luis Angel De la Cruz Ascencio

## Run locally

Node.js 22 or newer is required.

```powershell
npm install
npm run dev
```

Open the URL printed by Vite, usually `http://localhost:5173/`. To test the production build:

```powershell
npm run build
npm run preview
```

## Publish with GitHub Pages

The workflow in `.github/workflows/pages.yml` builds and deploys each push to `main` or `master`. Vite sets the asset base path from the GitHub repository name during the workflow.

1. Push the project files, including both PDFs, `.github/workflows/pages.yml`, and `package-lock.json`.
2. In **Settings → Pages → Build and deployment → Source**, select **GitHub Actions**. The workflow also tries to enable Pages automatically. If the first run cannot enable it, select GitHub Actions manually and rerun the workflow.
3. Check **Actions → Deploy L.U.M.E.A. to GitHub Pages** for the published URL.

`node_modules/` and `dist/` are ignored by Git.
