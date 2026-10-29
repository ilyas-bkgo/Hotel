import { readFile, writeFile } from 'node:fs/promises';
import JSZip from 'jszip';
import { getWordpressThemeFiles } from '../src/utils/wordpressThemeGenerator.ts';

// The theme generator normally fetches public assets from the running site.
// Map those same URLs to the files copied by `npm run build` so CI/local builds
// can produce the exact WordPress archive without a browser or dev server.
globalThis.fetch = async (url) => {
  const assetPath = new URL(String(url), 'http://localhost').pathname.replace(/^\//, '');
  try {
    const data = await readFile(`dist/${assetPath}`);
    return new Response(data, { status: 200 });
  } catch {
    try {
      const data = await readFile(`public/${assetPath}`);
      return new Response(data, { status: 200 });
    } catch {
      return new Response('Asset not found', { status: 404 });
    }
  }
};

const zip = new JSZip();
const theme = zip.folder('residence-isni-theme');
for (const file of getWordpressThemeFiles()) theme.file(file.name, file.content);

const assets = [
  'assets/breakfast-menu.webp',
  'assets/images/surf_lesson_taghazout_1793212942727.jpg',
  'assets/images/isni/living-room.jpg',
  'assets/images/isni/kitchenette.jpg',
  'assets/images/isni/twin-bedroom.jpg',
  'assets/images/isni/family-suite.jpg',
  'assets/images/isni/dining-room.jpg',
  'assets/images/isni/balcony.jpg',
  'assets/theme-app/isni-app.js',
  'assets/theme-app/isni-app.css',
];
for (const asset of assets) {
  const response = await fetch(`/${asset}`);
  if (!response.ok) throw new Error(`Missing theme asset: ${asset}`);
  theme.file(asset, Buffer.from(await response.arrayBuffer()));
}

const archive = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE', compressionOptions: { level: 9 } });
await writeFile('residence-isni-theme.zip', archive);
console.log(`Created residence-isni-theme.zip (${archive.length} bytes)`);
