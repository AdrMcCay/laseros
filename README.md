# LaserOS — home-screen app

This folder is LaserOS as an installable web app. It works offline once opened.

## Put it online (GitHub Pages, free)

1. On github.com create a new repository, for example `laseros` (public, or private with a paid plan).
2. Upload everything in this folder to the repository root: `index.html`, `manifest.webmanifest`, `sw.js`, and the `icons`, `fonts` and `vendor` folders.
3. In the repository go to **Settings → Pages**, set **Source** to *Deploy from a branch*, pick `main` and `/ (root)`, and save.
4. After a minute the app is at `https://<your-github-name>.github.io/laseros/`.

## Install it on an iPhone or iPad

Open that address in **Safari**, tap **Share**, then **Add to Home Screen**. LaserOS then opens full screen from its own icon and works without signal.

## Updating

Upload the new files over the old ones. Each build has a new `sw.js`, so phones pick up the update the next time the app is opened with a connection.

## Notes

- Saved files (PNG, PDF, MP4, CSV, spectra, zip, settings JSON, reports) open the iPhone share sheet: choose *Save to Files*, *Save Video* or AirDrop.
- Two fingers pinch-zoom the 3D trajectories, the detector plot and the image-plate scan.
- Each app has its own link, e.g. `…/laseros/#focal`, `#bcal` or `#tpa`.
