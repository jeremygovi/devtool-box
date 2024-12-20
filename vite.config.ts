import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import os from 'os';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Permet d'accepter des connexions externes (utile en Docker)
    port: 5173, // Définit le port à utiliser
    setupMiddlewares: (middlewares, server) => {
      middlewares.use('/api/system-info', (req, res) => {
        const totalMemory = os.totalmem();
        const freeMemory = os.freemem();
        const usedMemory = totalMemory - freeMemory;
        const cpuUsage = os.loadavg()[0]; // Load average sur 1 minute

        res.setHeader('Content-Type', 'application/json');
        res.end(
          JSON.stringify({
            hostname: os.hostname(),
            platform: os.platform(),
            arch: os.arch(),
            cpuUsage: Math.round((cpuUsage / os.cpus().length) * 100), // En pourcentage
            memoryUsage: {
              total: Math.round(totalMemory / 1024 / 1024), // Converti en Mo
              used: Math.round(usedMemory / 1024 / 1024),
              free: Math.round(freeMemory / 1024 / 1024),
            },
          })
        );
      });
      return middlewares;
    },
  },
});
