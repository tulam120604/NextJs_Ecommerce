import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';
import dotenv from 'dotenv';

dotenv.config();
export default defineConfig({
  server: {
    port: +(process.env.PORT_SERVER || 2000),
  },
  plugins: [
    ...VitePluginNode({
      adapter: 'express',
      appPath: './src/app.js',
      exportName: 'viteNodeApp',
      initAppOnBoot: false,
      tsCompiler: 'esbuild',
      swcOptions: {}
    })
  ],
  optimizeDeps: {
  },
});