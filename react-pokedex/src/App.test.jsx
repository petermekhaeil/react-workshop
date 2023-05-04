import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

describe('App', () => {
  it('renders App component', async () => {
    render(<App />);

    // output the rendered HTML
    screen.debug();

    // test if elements exist
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText('Add')).toBeInTheDocument();

    // fire events
    await userEvent.type(screen.getByRole('textbox'), 'pikachu');
    await userEvent.click(screen.getByText('Add'));

    // wait for update
    waitFor(() => expect(screen.getByText(/pikachu/)).toBeInTheDocument());
  });
});
