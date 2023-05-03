# Testing React Applications

## Unit Testing

- [Vitest](https://vitest.dev/guide/) is a unit test framework powered by Vite.
- [jsdom](https://github.com/jsdom/jsdom) will allow HTML testing in Vitest.
- [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/) is a solution for testing React components.

```bash
npm install -D vitest
npm install -D jsdom
npm install -D @testing-library/react @testing-library/jest-dom
```

```js
// ./tests/setup.js
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
```

```js
// ./vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.js',
  },
});
```

```jsx
// ./src/App.test.tsx
import { render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('renders App component', () => {
    render(<App />);
  });
});
```
