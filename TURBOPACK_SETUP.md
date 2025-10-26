# Turbopack Setup for JSON Schema Tour

This document explains the Turbopack configuration for faster development builds.

## What was changed

1. **Updated `next.config.mjs`** to include Turbopack configuration:
   - Added experimental Turbopack rules for MDX processing
   - Configured path aliases for better module resolution
   - Maintained compatibility with existing MDX setup

2. **Updated `package.json`** with new scripts:
   - `next-dev-turbo`: Runs Next.js with the `--turbo` flag
   - `dev:turbo`: Runs both Turbopack dev server and content watching concurrently

## Usage

To use Turbopack for development:

```bash
# Run with Turbopack (faster builds)
pnpm run dev:turbo

# Or just the Next.js server with Turbopack
pnpm run next-dev-turbo
```

To use the regular Webpack build:
```bash
# Regular development (slower builds)
pnpm run dev
```

## Hydration Issues Fixed

The following hydration issues were resolved for Turbopack compatibility:

1. **IconLink Component**: Added proper SSR handling for `window.matchMedia`
2. **Chakra UI Theme**: Disabled `useSystemColorMode` to prevent color mode mismatches  
3. **ContinueBtn Component**: Added hydration-safe localStorage access
4. **Monaco Editor**: Used dynamic import with `ssr: false` to prevent DOM mismatches

## Known Warnings

You may see this warning when using Turbopack:
```
⚠ ./lib/server-functions.ts:28:23
lint TP1004 fs.readFileSync(???*0*, "utf-8") is very dynamic
```

This is expected and doesn't affect functionality. It's related to dynamic file system operations in the server-side code generation functions.

## Benefits

- **Faster builds**: Turbopack provides significantly faster build times compared to Webpack
- **Better development experience**: Hot reload and incremental compilation are faster
- **Full compatibility**: All existing features work including MDX processing, content watching, and hot module replacement

## Configuration Details

The Turbopack configuration in `next.config.mjs`:
- Handles `.mdx` files with the `@mdx-js/loader`
- Provides path aliases for module resolution
- Maintains compatibility with the existing MDX and React setup