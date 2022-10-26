import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWith';

describe('Testando a Search Bar para Meals', () => {
  const searchTopBtn = 'search-top-btn';
  const searchInput = 'search-input';
  const execSearchButton = 'exec-search-btn';
  const nameSearchRadio = 'name-search-radio';
  const firstLetterSearchRadio = 'first-letter-search-radio';
  const pageTitle = 'page-title';
  test('Testando a Search Bar e botão Ingredients', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });

    expect(history.location.pathname).toBe('/meals');
    expect(await screen.findByTestId(pageTitle)).toBeInTheDocument();

    // const emailElement = screen.getByTestId('email-input');
    // const passwordElement = screen.getByTestId('password-input');
    // const buttonElement = screen.getByTestId('login-submit-btn');

    // userEvent.type(emailElement, 'email@email.com');
    // userEvent.type(passwordElement, '1234567');
    // userEvent.click(buttonElement);

    const searchButtonElement = screen.getByTestId(searchTopBtn);
    userEvent.click(searchButtonElement);

    const searchBarElement = screen.getByTestId(searchInput);
    expect(searchBarElement).toBeInTheDocument();

    const radioIngredientElement = screen.getByTestId('ingredient-search-radio');
    expect(radioIngredientElement).toBeInTheDocument();

    const radioNameElement = screen.getByTestId(nameSearchRadio);
    expect(radioNameElement).toBeInTheDocument();

    const radioFirstLetterElement = screen.getByTestId(firstLetterSearchRadio);
    expect(radioFirstLetterElement).toBeInTheDocument();

    const getResultButtonElement = screen.getByTestId(execSearchButton);
    expect(getResultButtonElement).toBeInTheDocument();

    userEvent.type(searchBarElement, 'chicken');
    userEvent.click(radioIngredientElement);
    userEvent.click(getResultButtonElement);
  });
  test('Testando a Search Bar e botão Name', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });

    expect(history.location.pathname).toBe('/meals');
    expect(await screen.findByTestId(pageTitle)).toBeInTheDocument();

    const searchButtonElement = screen.getByTestId(searchTopBtn);
    userEvent.click(searchButtonElement);

    const searchBarElement = screen.getByTestId(searchInput);
    const radioNameElement = screen.getByTestId(nameSearchRadio);
    const getResultButtonElement = screen.getByTestId(execSearchButton);

    userEvent.type(searchBarElement, 'beef');
    userEvent.click(radioNameElement);
    userEvent.click(getResultButtonElement);
  });
  test('Testando a Search Bar e botão First Letter', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });

    expect(history.location.pathname).toBe('/meals');
    expect(await screen.findByTestId(pageTitle)).toBeInTheDocument();

    const searchButtonElement = screen.getByTestId(searchTopBtn);
    userEvent.click(searchButtonElement);

    const searchBarElement = screen.getByTestId(searchInput);
    const radioFirstLetterElement = screen.getByTestId(firstLetterSearchRadio);
    const getResultButtonElement = screen.getByTestId(execSearchButton);

    userEvent.type(searchBarElement, 'c');
    userEvent.click(radioFirstLetterElement);
    userEvent.click(getResultButtonElement);
  });
  test('Testando a Search Bar e botão Name', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });

    expect(history.location.pathname).toBe('/meals');
    expect(await screen.findByTestId(pageTitle)).toBeInTheDocument();

    const searchButtonElement = screen.getByTestId(searchTopBtn);
    userEvent.click(searchButtonElement);

    const searchBarElement = screen.getByTestId(searchInput);

    const radioNameElement = screen.getByTestId(nameSearchRadio);

    const getResultButtonElement = screen.getByTestId(execSearchButton);

    userEvent.type(searchBarElement, 'Beef and Mustard Pie');
    userEvent.click(radioNameElement);
    userEvent.click(getResultButtonElement);

    expect(await screen.findByRole('heading', {
      name: /Beef and Mustard Pie/i,
    })).toBeInTheDocument();
    expect(history.location.pathname).toBe('/meals/52874');
  });
});
