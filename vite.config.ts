import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    react(),
    // Gzip/Brotli compression
    viteCompression({ algorithm: 'gzip', ext: '.gz' }),
    viteCompression({ algorithm: 'brotliCompress', ext: '.br' })
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    target: 'esnext',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-dom/client'],
          'framer': ['framer-motion'],
          'lenis': ['lenis'],
          'lucide-icons': ['lucide-react'],
          'jspdf': ['jspdf', 'jspdf-autotable']
        },
        // Optimize chunk loading
        inlineDynamicImports: false,
        // Reduce chunk count for faster initial load
        experimentalMinChunkSize: 5000,
      }
    },
    chunkSizeWarningLimit: 600,
    // Preload strategy
    modulePreload: {
      polyfill: true
    },
  },
  server: {
    port: 3000,
    host: true,
    // Serve static files from public directory
    fs: {
      allow: ['..', 'public']
    }
  },
  publicDir: 'public',
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'lenis']
  },
  // Enable advanced optimizations
  esbuild: {
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
    legalComments: 'none',
  }
})
