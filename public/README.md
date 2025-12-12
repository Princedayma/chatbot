# Assets Directory

This directory contains auxiliary assets used throughout the application.

## Structure

```
public/
├── icons/          # Icon assets
├── images/         # Image assets
└── favicon.ico     # Site favicon
```

## Icons

Icons are primarily handled by `lucide-react` library. Custom icons can be placed in the `icons/` directory.

## Images

Application images, logos, and visual assets are stored here. Use Next.js Image component for optimization:

```tsx
import Image from 'next/image';

<Image src="/images/logo.png" alt="Logo" width={200} height={50} />
```

## Usage

All files in the `public/` directory are served from the root path:

```
/images/logo.png  →  public/images/logo.png
/icons/custom.svg →  public/icons/custom.svg
```
