// @ts-check
import { defineConfig } from 'astro/config';

// Static site for Cloudflare Pages.
// Build command: `npm run build`  →  output dir: `dist`
export default defineConfig({
  site: 'https://pippin-player.pages.dev',
  output: 'static',
  build: {
    format: 'directory',
  },
});
