import { copyFile, mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const html = await readFile('dist/index.html', 'utf8');
const jsPath = html.match(/<script[^>]+src="([^"]+\.js)"/i)?.[1];
const cssPath = html.match(/<link[^>]+href="([^"]+\.css)"/i)?.[1];
if (!jsPath || !cssPath) throw new Error('Vite build is missing the application JS or CSS entry.');

for (const target of ['public/assets/theme-app', 'dist/assets/theme-app']) {
  await mkdir(target, { recursive: true });
  await copyFile(path.join('dist', jsPath.replace(/^\//, '')), path.join(target, 'isni-app.js'));
  await copyFile(path.join('dist', cssPath.replace(/^\//, '')), path.join(target, 'isni-app.css'));
}
