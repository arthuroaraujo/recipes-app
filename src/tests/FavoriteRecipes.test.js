import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWith';

describe('Testando a tela de favoritos', () => {
  const favoritePage = '/favorite-recipes';
  const favId = '0-horizontal-favorite-btn';
  const shareId = '0-horizontal-share-btn';
  const allId = 'filter-by-all-btn';
  const newFavRecipes = {
    alcoholicOrNot: 'Optional alcohol',
    category: 'Ordinary Drink',
    id: '15997',
    image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    name: 'GG',
    nationality: '',
    type: 'drink',
  };
  test('Testando o botão de share', async () => {
    const mockClipboard = {
      writeText: jest.fn(),
    };
    global.navigator.clipboard = mockClipboard;

    localStorage
      .setItem('favoriteRecipes', JSON.stringify([newFavRecipes]));

    const { history } = renderWithRouter(<App />, { initialEntries: [favoritePage] });

    expect(history.location.pathname).toBe(favoritePage);

    await waitFor(() => {
      screen.findByTestId(allId);
    }, { timeout: 10000 });

    const shareButtonElement = screen.getByTestId(shareId);
    expect(shareButtonElement).toBeInTheDocument();
    userEvent.click(shareButtonElement);
  }, 20000);

  test('Testando se a receita já foi favoritada', async () => {
    localStorage
      .setItem('favoriteRecipes', JSON.stringify([newFavRecipes]));

    const { history } = renderWithRouter(<App />, { initialEntries: [favoritePage] });

    expect(history.location.pathname).toBe(favoritePage);

    await waitFor(() => {
      screen.findByTestId(allId);
    }, { timeout: 10000 });

    const favoriteButtonElement = screen.getByTestId(favId);
    expect(favoriteButtonElement).toBeInTheDocument();
    userEvent.click(favoriteButtonElement);
  }, 20000);

  test('Testando filtros', async () => {
    localStorage
      .setItem('favoriteRecipes', JSON.stringify([newFavRecipes]));

    const { history } = renderWithRouter(<App />, { initialEntries: [favoritePage] });

    expect(history.location.pathname).toBe(favoritePage);

    await waitFor(() => {
      screen.findByTestId(allId);
    }, { timeout: 10000 });

    const drinkFilter = screen.getByRole('button', { name: /drinks/i });
    expect(drinkFilter).toBeInTheDocument();
    userEvent.click(drinkFilter);

    const mealFilter = screen.getByRole('button', { name: /meals/i });
    expect(mealFilter).toBeInTheDocument();
    userEvent.click(mealFilter);

    const allFilter = screen.getByRole('button', { name: /all/i });
    expect(allFilter).toBeInTheDocument();
    userEvent.click(allFilter);
  }, 20000);

  test('Testando redirecionamento', async () => {
    localStorage
      .setItem('favoriteRecipes', JSON.stringify([newFavRecipes]));

    const { history } = renderWithRouter(<App />, { initialEntries: [favoritePage] });

    expect(history.location.pathname).toBe(favoritePage);

    await waitFor(() => {
      screen.findByTestId(allId);
    }, { timeout: 10000 });

    const firstDrink = screen.getByRole('img', { name: /gg/i });
    expect(firstDrink).toBeInTheDocument();
    userEvent.click(firstDrink);
  }, 20000);
}, 30000);
