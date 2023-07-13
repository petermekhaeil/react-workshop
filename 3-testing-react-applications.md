# Testing React Applications

## Unit Testing

[Vitest](https://vitest.dev/guide/) is a unit test framework powered by Vite.

### Example

```js
import { describe, it, expect } from 'vitest';

describe('something truthy and falsy', () => {
  it('true to be true', () => {
    expect(true).toBe(true);
  });

  it('false to be false', () => {
    expect(false).toBe(false);
  });
});
```

### Setup

- Install Vitest:
  
```bash
npm install -D vitest
```

- Add a `test` script to `package.json`:

```json
"scripts": {
  "test": "vitest"
}
```

## Testing React Components

[react-testing-library](https://testing-library.com/docs/react-testing-library/intro/) is a solution for testing React components. It allows testing of components on how they are intended to be used, rather than testing implementation details.

### Setup 

**Step 1:** Install required dependencies:

```bash
npm install -D jsdom
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

**Step 2:** Configure Vitest to use `jsdom` as an environment and to include a new test setup file:

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

**Step 3:** Add a test setup file:

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

### Example Test

```jsx
// ./src/App.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

describe('App', () => {
  it('renders App component', async () => {
    render(<App />);

    // test if elements exist
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText('Add')).toBeInTheDocument();
  });
});
```


## Mocking API Requests

- [Mock Service Worker (MSW)](https://mswjs.io/) intercepts requests and allows to test different responses for your tests.
- Because Vitest runs in a Node, Web APIs are not available, so `fetch` will be undefined (Node.js < 18). We can polyfill using [whatwg-fetch](https://www.npmjs.com/package/whatwg-fetch).

### Setup

```bash
npm install -D msw
npm install -D whatwg-fetch
```

### Configuration

We can use it in our test file:

```jsx
import { afterAll, afterEach, beforeAll } from 'vitest';
import { setupServer } from 'msw/node';
import { graphql, rest } from 'msw';
import 'whatwg-fetch';

const server = setupServer();

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());
```

## Putting it all together

```jsx
import { afterAll, afterEach, beforeAll } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { graphql, rest } from 'msw';
import 'whatwg-fetch';
import App from './App';

const server = setupServer();

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());

describe('App', () => {
  it('renders App component', async () => {
    server.use(
      rest.get('https://pokeapi.co/api/v2/pokemon/*', (req, res, ctx) => {
        return res(ctx.json({ id: 25, name: 'pikachu' }), ctx.status(200));
      }),
    );

    render(<App />);

    // test if elements exist
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText('Add')).toBeInTheDocument();

    // input text and click Add
    await userEvent.type(screen.getByRole('textbox'), 'pikachu');
    await userEvent.click(screen.getByText('Add'));

    // wait for assertion to pass
    await waitFor(() =>
      expect(screen.getByTextId('pikachu')).toBeInTheDocument(),
    );
  });
});
```
