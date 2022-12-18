import { defineConfig } from 'vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/In-browser-markdown-editor/',
  plugins: [
    react(),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), 'src/assets')],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]',

      // **
      // * custom insert position
      // * @default body-last
      // /
      inject: 'body-last',

      // **
      // * custom dom id
      // * @default __svg__icons__dom__
      // /
      customDomId: '__svg__icons__dom__',
    }),
  ],
});
