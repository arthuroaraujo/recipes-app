import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWith';

describe('Testando a Recipe Details', () => {
  const searchTopBtn = 'search-top-btn';
  const searchInput = 'search-input';
  const execSearchButton = 'exec-search-btn';
  const nameSearchRadio = 'name-search-radio';
  // const firstLetterSearchRadio = 'first-letter-search-radio';
  // const pageTitle = 'page-title';
  test('Testando o Carousel', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    const searchButtonElement = screen.getByTestId(searchTopBtn);
    userEvent.click(searchButtonElement);

    const searchBarElement = screen.getByTestId(searchInput);

    const radioNameElement = screen.getByTestId(nameSearchRadio);

    const getResultButtonElement = screen.getByTestId(execSearchButton);

    userEvent.type(searchBarElement, 'blue margarita');
    userEvent.click(radioNameElement);
    userEvent.click(getResultButtonElement);

    await waitFor(() => screen.findByRole('heading', {
      name: /blue margarita/i,
    }), { timeout: 10000 });

    expect(screen.getByRole('heading', {
      name: /blue margarita/i,
    })).toBeInTheDocument();

    const recipePhoto = screen.getByTestId('recipe-photo');
    expect(recipePhoto).toBeInTheDocument();

    await waitFor(() => screen.getByRole('heading', {
      name: /corba/i,
    }), { timeout: 10000 });

    const corba = screen.getByRole('heading', {
      name: /corba/i,
    });
    expect(corba).toBeInTheDocument();

    const arrowButton = screen.getByRole('button', {
      name: /❯/i,
    });
    expect(arrowButton).toBeInTheDocument();
    userEvent.click(arrowButton);

    const arrowButton2 = screen.getByRole('button', {
      name: /❮/i,
    });
    expect(arrowButton2).toBeInTheDocument();
    userEvent.click(arrowButton2);
    userEvent.click(arrowButton2);
    userEvent.click(arrowButton);
  }, 10000);
  test('Testando os Botões de Share e Favorite', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    const searchButtonElement = screen.getByTestId(searchTopBtn);
    userEvent.click(searchButtonElement);

    const searchBarElement = screen.getByTestId(searchInput);

    const radioNameElement = screen.getByTestId(nameSearchRadio);

    const getResultButtonElement = screen.getByTestId(execSearchButton);

    userEvent.type(searchBarElement, 'Whitecap Margarita');
    userEvent.click(radioNameElement);
    userEvent.click(getResultButtonElement);

    await waitFor(() => screen.findByRole('heading', {
      name: /Whitecap Margarita/i,
    }), { timeout: 10000 });

    const favoriteButtonElement = screen.getByTestId('favorite-btn');
    expect(favoriteButtonElement).toBeInTheDocument();
    userEvent.click(favoriteButtonElement);
    userEvent.click(favoriteButtonElement);

    // const shareButtonElement = screen.getByTestId('share-btn');
    // expect(shareButtonElement).toBeInTheDocument();
    // userEvent.click(shareButtonElement);

    const startRecipeButtonElement = screen.getByTestId('start-recipe-btn');
    expect(startRecipeButtonElement).toBeInTheDocument();
    userEvent.click(startRecipeButtonElement);

    // Testar o click, localStorage e o RecomentationCard
  }, 10000);
});
