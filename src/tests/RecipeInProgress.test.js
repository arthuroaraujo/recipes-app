import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWith';

describe('Testando a tela de progresso', () => {
  const drinkPage = '/drinks/15997/in-progress';
  const mealPage = '/meals/52977/in-progress';
  const mealPage2 = '/meals/53060/in-progress';
  const favId = 'favorite-btn';

  test('Testando os checkbox e botão de compartilhar - meals', async () => {
    // Referência: https://stackoverflow.com/questions/62351935/how-to-mock-navigator-clipboard-writetext-in-jest
    const mockClipboard = {
      writeText: jest.fn(),
    };
    global.navigator.clipboard = mockClipboard;
    const { history } = renderWithRouter(<App />, { initialEntries: [mealPage] });

    expect(history.location.pathname).toBe(mealPage);

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

    const shareButtonElement = screen.getByTestId('share-btn');
    expect(shareButtonElement).toBeInTheDocument();
    userEvent.click(shareButtonElement);
  }, 20000);

  test('Testando botão de favoritos e finalizar receita - drinks', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: [drinkPage] });

    expect(history.location.pathname).toBe(drinkPage);

    await waitFor(() => {
      screen.findByRole('img', { name: /gg/i });
    }, { timeout: 10000 });

    const ingredientsList = await screen.findAllByRole('checkbox');
    expect(ingredientsList[0]).toBeInTheDocument();
    userEvent.click(ingredientsList[0]);

    expect(ingredientsList[1]).toBeInTheDocument();
    userEvent.click(ingredientsList[1]);

    userEvent.click(ingredientsList[2]);

    const favoriteButtonElement = screen.getByTestId(favId);
    expect(favoriteButtonElement).toBeInTheDocument();
    userEvent.click(favoriteButtonElement);

    const finishButton = screen.getByRole('button', { name: /finish recipe/i });
    userEvent.click(finishButton);
  }, 20000);

  test('Testando botão de favoritos e finalizar receita - meals', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: [mealPage2] });

    expect(history.location.pathname).toBe(mealPage2);

    await waitFor(() => {
      screen.findByRole('img', { name: /burek/i });
    }, { timeout: 10000 });

    const ingredientsList = await screen.findAllByRole('checkbox');
    expect(ingredientsList[0]).toBeInTheDocument();
    userEvent.click(ingredientsList[0]);

    expect(ingredientsList[1]).toBeInTheDocument();
    userEvent.click(ingredientsList[1]);

    userEvent.click(ingredientsList[2]);
    userEvent.click(ingredientsList[3]);
    userEvent.click(ingredientsList[4]);
    userEvent.click(ingredientsList[5]);

    const favoriteButtonElement = screen.getByTestId(favId);
    expect(favoriteButtonElement).toBeInTheDocument();
    userEvent.click(favoriteButtonElement);

    const finishButton = screen.getByRole('button', { name: /finish recipe/i });
    userEvent.click(finishButton);
  }, 20000);

  test('Testando se a receita já for favorita quando carregada - drinks', async () => {
    const newFavRecipes = {
      id: 15997,
    };

    localStorage
      .setItem('favoriteRecipes', JSON.stringify([newFavRecipes]));

    const { history } = renderWithRouter(<App />, { initialEntries: [drinkPage] });

    expect(history.location.pathname).toBe(drinkPage);

    await waitFor(() => {
      screen.findByRole('img', { name: /gg/i });
    }, { timeout: 10000 });

    const favoriteButtonElement = screen.getByTestId(favId);
    expect(favoriteButtonElement).toBeInTheDocument();
    userEvent.click(favoriteButtonElement);
  }, 20000);

  test('Testando se a receita já for favorita quando carregada - meals', async () => {
    const newFavRecipes = {
      id: 53060,
    };

    localStorage
      .setItem('favoriteRecipes', JSON.stringify([newFavRecipes]));

    const { history } = renderWithRouter(<App />, { initialEntries: [mealPage2] });

    expect(history.location.pathname).toBe(mealPage2);

    await waitFor(() => {
      screen.findByRole('img', { name: /burek/i });
    }, { timeout: 10000 });

    const favoriteButtonElement = screen.getByTestId(favId);
    expect(favoriteButtonElement).toBeInTheDocument();
    userEvent.click(favoriteButtonElement);
  }, 20000);
}, 30000);
