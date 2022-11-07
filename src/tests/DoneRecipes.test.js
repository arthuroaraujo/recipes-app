import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWith';

describe('Testando a tela de receitas feitas', () => {
  const doneRecipe = '/done-recipes';
  // const doneId = '0-horizontal-favorite-btn';
  const shareId = '0-horizontal-share-btn';
  const allId = 'filter-by-all-btn';
  const newDoneRecipes = {
    alcoholicOrNot: '',
    category: 'Vegetarian',
    doneDate: '2022-11-05T00:00:26.948Z',
    id: '52771',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    name: 'Spicy Arrabiata Penne',
    nationality: 'Italian',
    tags: ['Pasta', 'Curry'],
    type: 'meal',
  };
  test('Testando o botão de share', async () => {
    const mockClipboard = {
      writeText: jest.fn(),
    };
    global.navigator.clipboard = mockClipboard;

    localStorage
      .setItem('doneRecipes', JSON.stringify([newDoneRecipes]));

    const { history } = renderWithRouter(<App />, { initialEntries: [doneRecipe] });

    expect(history.location.pathname).toBe(doneRecipe);

    await waitFor(() => {
      screen.findByTestId(allId);
    }, { timeout: 10000 });

    const shareButtonElement = screen.getByTestId(shareId);
    expect(shareButtonElement).toBeInTheDocument();
    userEvent.click(shareButtonElement);
  }, 20000);

  test('Testando filtros', async () => {
    localStorage
      .setItem('doneRecipes', JSON.stringify([newDoneRecipes]));

    const { history } = renderWithRouter(<App />, { initialEntries: [doneRecipe] });

    expect(history.location.pathname).toBe(doneRecipe);

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
      .setItem('doneRecipes', JSON.stringify([newDoneRecipes]));

    const { history } = renderWithRouter(<App />, { initialEntries: [doneRecipe] });

    expect(history.location.pathname).toBe(doneRecipe);

    await waitFor(() => {
      screen.findByTestId(allId);
    }, { timeout: 10000 });

    const firstMeat = screen.getByRole('img', { name: /spicy arrabiata penne/i });
    expect(firstMeat).toBeInTheDocument();
    userEvent.click(firstMeat);
  }, 20000);

  test('Testando tela vazia', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: [doneRecipe] });

    expect(history.location.pathname).toBe(doneRecipe);

    await waitFor(() => {
      screen.findByTestId(allId);
    }, { timeout: 10000 });
  }, 20000);
}, 30000);
