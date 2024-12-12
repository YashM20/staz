# Next.js Configuration

## Configuration Overview
```typescript
const nextConfig: NextConfig = {
  experimental: {
    // Experimental features
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
}
```

## Key Features
1. **Image Optimization**
   - Remote image patterns
   - Automatic optimization
   - Placeholder support

2. **App Router**
   - Server components
   - Client components
   - Hybrid rendering

3. **API Routes**
   - Route handlers
   - API middleware
   - Type-safe endpoints 