import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWith';

describe('Testando a tela NotFound', () => {
  test('Testando o botão de share', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/done-recipesasas'] });

    expect(history.location.pathname).toBe('/done-recipesasas');

    await waitFor(() => {
      screen.findByText(/not found/i);
    }, { timeout: 10000 });

    const notFound = screen.getByText(/not found/i);
    expect(notFound).toBeInTheDocument();
  }, 20000);
}, 30000);
