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
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import path from 'path';
import { fileURLToPath } from 'url';

const _dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(_dirname, 'src/index.js'),
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

We need to set React as a peer dependency (and not a dependency) so we do not bundle it with the library when we build it. 

```json
{
  "peerDependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
```

## Build a React component

```jsx
// ./src/button.jsx
import classes from './button.module.css';

export function Button(props) {
  const { children, ...rest } = props;
  return (
    <button className={classes.button} {...rest}>
      {children}
    </button>
  );
}
```

Vite supports [CSS Modules](https://vitejs.dev/guide/features.html#css-modules):

```css
/* ./src/button.module.css */
.button {
  background-color: #4f46e5;
  color: #fff;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  height: 2.5rem;
  font-size: 14px;
  line-height: 1rem;
  border: 0;
  cursor: pointer;
  text-transform: none;
  margin: 0;
}
```

## Variant styling

Use [clsx](https://github.com/lukeed/clsx) to construct className strings. Combine classes together based on props:

```jsx
// ./src/button.jsx
import classes from './button.module.css';
import { clsx } from 'clsx';

export function Button(props) {
  const { children, variant, ...rest } = props;

  const classNames = clsx(classes.button, {
    [classes.outline]: variant === 'outline'
  });

  return (
    <button className={classNames} {...rest}>
      {children}
    </button>
  );
}
```

```css
/* ./src/button.module.css */
.button {
  background-color: #4f46e5;
  color: #fff;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  height: 2.5rem;
  font-size: 14px;
  line-height: 1rem;
  border: 0;
  cursor: pointer;
  text-transform: none;
  margin: 0;
}

.outline {
  background-color: transparent;
  border: 1px solid #4f46e5;
  color: #4f46e5;
}
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

Create a story for `Button`:

```js
// ./src/button.stories.js
import { Button } from './button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: 'Example/Button',
  component: Button,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs']
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary = {
  args: {
    children: 'Button Text'
  }
};
```

