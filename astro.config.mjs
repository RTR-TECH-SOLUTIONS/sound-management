// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// Demo publicat pe GitHub Pages (repo RTR-TECH-SOLUTIONS/sound-management), servit pe https://demo.mrwebsites.ro/sound-management/.
// TODO(real): pe domeniul clientului (soundmanagement.ro) se pune domeniul în `site`
// și se șterge `base`. Linkurile interne trec prin u() din src/data/site.ts, deci restul merge neschimbat.
export default defineConfig({
  site: 'https://demo.mrwebsites.ro',
  base: '/sound-management',
  devToolbar: { enabled: false },
  vite: {
    plugins: [tailwindcss()]
  }
});
