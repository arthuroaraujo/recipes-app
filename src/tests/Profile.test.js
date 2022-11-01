import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWith';

describe('Testando a tela de profile', () => {
  test('Testando o botão de logout', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/profile'] });

    expect(history.location.pathname).toBe('/profile');

    const logoutButton = screen.getByTestId('profile-logout-btn');

    userEvent.click(logoutButton);
  });
  test('Testando o botão de favorite recipes', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/profile'] });

    expect(history.location.pathname).toBe('/profile');

    const favoriteButton = screen.getByTestId('profile-favorite-btn');

    userEvent.click(favoriteButton);
  });
});
