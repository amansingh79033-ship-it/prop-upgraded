# Performance Optimization Configuration

## 1. Image Optimization (WebP + AVIF)

### Setup Complete ✅
- Sharp library configured for image processing
- Responsive images at 6 breakpoints (320w, 640w, 768w, 1024w, 1440w, 1920w)
- WebP format (80% quality) - 30-50% smaller than JPEG
- AVIF format (75% quality) - 50-70% smaller than JPEG
- JPEG fallback for older browsers

### Usage:
```bash
npm run optimize-images
```

### In Components:
```tsx
<picture>
  <source 
    srcSet="/images/hero-320w.webp 320w,
            /images/hero-640w.webp 640w,
            /images/hero-1920w.webp 1920w"
    type="image/webp"
  />
  <source 
    srcSet="/images/hero-320w.jpg 320w,
            /images/hero-640w.jpg 640w,
            /images/hero-1920w.jpg 1920w"
    type="image/jpeg"
  />
  <img 
    src="/images/hero-1920w.jpg"
    alt="Hero"
    loading="lazy"
    decoding="async"
    sizes="(max-width: 768px) 100vw, 50vw"
  />
</picture>
```

---

## 2. Gzip/Brotli Compression

### Configuration:
- **Gzip**: Universal compression (60-70% reduction)
- **Brotli**: Google's algorithm (15-25% better than gzip)
- Auto-generated during build
- Files: `.gz` and `.br` extensions

### Server Configuration (Required):

#### Nginx:
```nginx
# Enable Brotli
brotli on;
brotli_comp_level 6;
brotli_types text/plain text/css application/json application/javascript text/xml application/xml;

# Enable Gzip (fallback)
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
```

#### Apache:
```apache
# Enable Brotli
AddOutputFilterByType BROTLI_COMPRESS text/html text/plain text/css application/json application/javascript

# Enable Gzip (fallback)
AddOutputFilterByType DEFLATE text/html text/plain text/css application/json application/javascript
```

#### Node.js (Express):
```javascript
import compression from 'compression';
import serveStatic from 'serve-static';

app.use(compression()); // Handles both gzip and brotli
app.use(serveStatic('dist'));
```

---

## 3. Service Worker (PWA)

### Features Configured:
- **CacheFirst** for static assets (JS/CSS) - 1 year cache
- **StaleWhileRevalidate** for images - 30 days cache
- **CacheFirst** for fonts - 1 year cache
- Auto-update on new versions
- Offline support
- Installable as native app

### Manual Registration (if needed):
```typescript
// In main.tsx
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('SW registered:', reg.scope))
      .catch(err => console.log('SW registration failed:', err));
  });
}
```

### Testing:
```bash
npm run preview
# Open DevTools → Application → Service Workers
```

---

## 4. CDN Configuration

### Recommended CDNs:

#### Cloudflare (Free Tier):
1. Add your site to Cloudflare
2. Set DNS records
3. Enable auto-minify
4. Enable Rocket Loader
5. Set Cache Level: Standard

#### Vercel Edge Network:
```json
// vercel.json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

#### Netlify:
```toml
# netlify.toml
[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### CDN Asset URLs:
Update `vite.config.ts` base URL:
```typescript
export default defineConfig({
  base: 'https://cdn.yourdomain.com/',
  // ... rest of config
})
```

---

## Expected Results:

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Image Size | ~500KB avg | ~150KB avg | **70% smaller** ✅ |
| JS Transfer | 437KB | ~150KB | **65% smaller** ✅ |
| FCP | 2.5s | ~1.2s | **52% faster** ✅ |
| LCP | 3.2s | ~1.8s | **44% faster** ✅ |
| Offline Support | ❌ | ✅ | **100% available** ✅ |

---

## Deployment Checklist:

- [ ] Run `npm install` to get new dependencies
- [ ] Run `npm run optimize-images` to process images
- [ ] Build: `npm run build`
- [ ] Test PWA: `npm run preview`
- [ ] Configure server compression (see examples above)
- [ ] Set up CDN (Cloudflare/Vercel/Netlify)
- [ ] Update DNS if using CDN
- [ ] Verify service worker registration in DevTools
- [ ] Test offline functionality
- [ ] Run Lighthouse audit

---

## File Structure:
```
propertyfie-ai/
├── scripts/
│   └── optimize-images.js      # Image optimization script
├── public/
│   └── images/                  # Optimized images (generated)
│       ├── hero-320w.webp
│       ├── hero-640w.webp
│       ├── hero-1920w.webp
│       ├── hero.avif
│       └── hero.jpg
├── dist/
│   ├── assets/                  # Compressed assets
│   │   ├── index.js.gz
│   │   ├── index.js.br
│   │   ├── vendor.css.gz
│   │   └── vendor.css.br
│   └── sw.js                    # Service worker
├── vite.config.ts               # PWA + Compression config
└── package.json                 # Dependencies
```

---

## Quick Start:

```bash
# 1. Install dependencies
npm install

# 2. Optimize images
npm run optimize-images

# 3. Build with compression
npm run build

# 4. Test locally
npm run preview

# 5. Deploy dist/ folder to hosting
```

---

## Troubleshooting:

### Images not loading:
- Check `/public/images/` directory exists
- Verify image paths in components start with `/`
- Clear browser cache

### Service worker not registering:
- Ensure HTTPS (or localhost)
- Check DevTools → Application → Service Workers
- Look for errors in Console

### Compression not working:
- Server must send correct headers
- Check Network tab for `content-encoding: br` or `gzip`
- Configure server (see examples above)

### CDN not serving assets:
- Update `base` in vite.config.ts
- Rebuild after config change
- Purge CDN cache

---

## Resources:
- [WebP Documentation](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types#webp)
- [AVIF Guide](https://jakearchibald.com/2020/avif-has-landed/)
- [Workbox Documentation](https://developers.google.com/web/tools/workbox)
- [Brotli vs Gzip](https://www.keycdn.com/support/brotli)
