import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWith';

describe('Testando a tela de profile', () => {
  test('Testando o botão de logout', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals/52977/in-progress'] });

    expect(history.location.pathname).toBe('/meals/52977/in-progress');

    await waitFor(() => {
      screen.findByRole('img', { name: /corba/i });
    }, { timeout: 10000 });

    const firstIngredient = await screen.findAllByRole('checkbox');
    expect(firstIngredient[0]).toBeInTheDocument();
    userEvent.click(firstIngredient[0]);

    expect(firstIngredient[1]).toBeInTheDocument();
    userEvent.click(firstIngredient[1]);

    userEvent.click(firstIngredient[0]);

    userEvent.click(firstIngredient[2]);
  }, 20000);
}, 30000);
