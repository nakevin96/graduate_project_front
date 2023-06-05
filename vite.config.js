import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import svgr from '@honkhonk/vite-plugin-svgr';
import compression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [svgr(), react(), compression({algorithm: 'brotliCompress', ext: '.br'})],
    build: {
        rollupOptions: {
            treeshake: true
        }
    }
});
