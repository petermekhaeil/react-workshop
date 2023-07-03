# Building a React component library

## Getting Started

Using [Vite](https://vitejs.dev/) to create a library:

```bash
❯ npm create vite@latest
Need to install the following packages:
  create-vite@4.3.2
Ok to proceed? (y)
✔ Project name: … react-component
✔ Select a framework: › React
✔ Select a variant: › JavaScript
```

## Library Mode

Vite includes [Library Mode](https://vitejs.dev/guide/build.html#library-mode) that can be used to build a React component library:

```js
// vite.config.js
import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'MyReactComponent',
      fileName: 'my-react-component'
    },
    rollupOptions: {
      // externalised deps that shouldn't be bundled into the library
      external: ['react', 'react-dom'],
      output: {
        // global variables to use in the UMD build for externalized deps
        globals: {
          react: 'React'
        }
      }
    }
  },
  plugins: [react()]
});
```

`package.json` needs to be updated for applications to understand how to import the library:

```json
{
  "name": "react-component",
  "type": "module",
  "files": [
    "dist"
  ],
  "main": "./dist/my-react-component.umd.cjs",
  "module": "./dist/my-react-component.js",
  "exports": {
    ".": {
      "import": "./dist/my-react-component.js",
      "require": "./dist/my-react-component.umd.cjs"
    }
  }
}
```

## Build a component

```jsx
// ./src/button.jsx

export function Button(props) {
  const { children, ...rest } = props;
  return <button {...rest}>{children}</button>;
}

```

```js
// ./src/index.js
export { Button } from './button';
```

## Build the library

```bash
❯ npm run build

> react-component@0.0.0 build
> vite build

vite v4.3.9 building for production...
✓ 10 modules transformed.
dist/my-react-component.js  21.18 kB │ gzip: 6.31 kB
dist/my-react-component.umd.cjs  13.93 kB │ gzip: 5.44 kB
✓ built in 166ms
```

## Visual Testing

Use [Storybook](https://storybook.js.org/) to build and test UI components in isolation.

```bash
npx storybook@latest init
```

