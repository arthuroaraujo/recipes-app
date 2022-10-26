import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWith';

describe('Testando a Search Bar para Drinks', () => {
  const searchTopBtn = 'search-top-btn';
  const searchInput = 'search-input';
  const execSearchButton = 'exec-search-btn';
  const nameSearchRadio = 'name-search-radio';
  const firstLetterSearchRadio = 'first-letter-search-radio';
  const pageTitle = 'page-title';
  test('Testando a Search Bar e botão Ingredients', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    expect(history.location.pathname).toBe('/drinks');
    expect(await screen.findByTestId(pageTitle)).toBeInTheDocument();

    const searchButtonElement = screen.getByTestId(searchTopBtn);
    userEvent.click(searchButtonElement);

    const searchBarElement = screen.getByTestId(searchInput);

    const radioIngredientElement = screen.getByTestId('ingredient-search-radio');

    const getResultButtonElement = screen.getByTestId(execSearchButton);

    userEvent.type(searchBarElement, 'whiskey');
    userEvent.click(radioIngredientElement);
    userEvent.click(getResultButtonElement);
  });

  test('Testando a Search Bar e botão Name', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    expect(history.location.pathname).toBe('/drinks');
    expect(await screen.findByTestId(pageTitle)).toBeInTheDocument();

    const searchButtonElement = screen.getByTestId(searchTopBtn);
    userEvent.click(searchButtonElement);

    const searchBarElement = screen.getByTestId(searchInput);

    const radioNameElement = screen.getByTestId(nameSearchRadio);

    const getResultButtonElement = screen.getByTestId(execSearchButton);

    userEvent.type(searchBarElement, 'margarita');
    userEvent.click(radioNameElement);
    userEvent.click(getResultButtonElement);
  });

  test('Testando a Search Bar e botão First Letter', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    expect(history.location.pathname).toBe('/drinks');
    expect(await screen.findByTestId(pageTitle)).toBeInTheDocument();

    const searchButtonElement = screen.getByTestId(searchTopBtn);
    userEvent.click(searchButtonElement);

    const searchBarElement = screen.getByTestId(searchInput);

    const radioFirstLetterElement = screen.getByTestId(firstLetterSearchRadio);

    const getResultButtonElement = screen.getByTestId(execSearchButton);

    userEvent.type(searchBarElement, 'm');
    userEvent.click(radioFirstLetterElement);
    userEvent.click(getResultButtonElement);
  });
  test('Testando a Search Bar e botão Name', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    expect(history.location.pathname).toBe('/drinks');
    expect(await screen.findByTestId(pageTitle)).toBeInTheDocument();

    const searchButtonElement = screen.getByTestId(searchTopBtn);
    userEvent.click(searchButtonElement);

    const searchBarElement = screen.getByTestId(searchInput);

    const radioNameElement = screen.getByTestId(nameSearchRadio);

    const getResultButtonElement = screen.getByTestId(execSearchButton);

    userEvent.type(searchBarElement, 'blue margarita');
    userEvent.click(radioNameElement);
    userEvent.click(getResultButtonElement);

    expect(await screen.findByRole('heading', {
      name: /blue margarita/i,
    })).toBeInTheDocument();
    expect(history.location.pathname).toBe('/drinks/11118');
  });

  test('Testando a Search Bar e botão First Letter errado', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    expect(history.location.pathname).toBe('/drinks');
    expect(await screen.findByTestId(pageTitle)).toBeInTheDocument();

    const searchButtonElement = screen.getByTestId(searchTopBtn);
    userEvent.click(searchButtonElement);

    const searchBarElement = screen.getByTestId(searchInput);

    const radioFirstLetterElement = screen.getByTestId(firstLetterSearchRadio);

    const getResultButtonElement = screen.getByTestId(execSearchButton);

    userEvent.type(searchBarElement, 'mm');
    userEvent.click(radioFirstLetterElement);
    userEvent.click(getResultButtonElement);
  });
});
