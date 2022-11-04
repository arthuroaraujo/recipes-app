import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWith';

describe('Testando a tela de favoritos', () => {
  const favoritePage = '/favorite-recipes';
  const favId = '0-horizontal-favorite-btn';
  const shareId = '0-horizontal-share-btn';
  test('Testando o botão de share', async () => {
    const mockClipboard = {
      writeText: jest.fn(),
    };
    global.navigator.clipboard = mockClipboard;
    const newFavRecipes = {
      alcoholicOrNot:
'Optional alcohol',
      category:
'Ordinary Drink',
      id:
'15997',
      image:
'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
      name:
'GG',
      nationality:
'',
      type:
'drink',
    };

    localStorage
      .setItem('favoriteRecipes', JSON.stringify([newFavRecipes]));

    const { history } = renderWithRouter(<App />, { initialEntries: [favoritePage] });

    expect(history.location.pathname).toBe(favoritePage);

    await waitFor(() => {
      screen.findByTestId('filter-by-all-btn');
    }, { timeout: 10000 });

    const shareButtonElement = screen.getByTestId(shareId);
    expect(shareButtonElement).toBeInTheDocument();
    userEvent.click(shareButtonElement);
  }, 20000);
  test('Testando se a receita já foi favoritada', async () => {
    const newFavRecipes = {
      alcoholicOrNot:
'Optional alcohol',
      category:
'Ordinary Drink',
      id:
'15997',
      image:
'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
      name:
'GG',
      nationality:
'',
      type:
'drink',
    };

    localStorage
      .setItem('favoriteRecipes', JSON.stringify([newFavRecipes]));

    const { history } = renderWithRouter(<App />, { initialEntries: [favoritePage] });

    expect(history.location.pathname).toBe(favoritePage);

    await waitFor(() => {
      screen.findByTestId('filter-by-all-btn');
    }, { timeout: 10000 });

    const favoriteButtonElement = screen.getByTestId(favId);
    expect(favoriteButtonElement).toBeInTheDocument();
    userEvent.click(favoriteButtonElement);
  }, 20000);
}, 30000);
