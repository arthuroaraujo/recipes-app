import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { MemoryRouter } from 'react-router-dom';
import App from '../App';
// import Drinks from '../pages/Drinks';

describe('Testando a Search Bar', () => {
  const searchTopBtn = 'search-top-btn';
  const searchInput = 'search-input';
  const execSearchButton = 'exec-search-btn';
  const nameSearchRadio = 'name-search-radio';
  const firstLetterSearchRadio = 'first-letter-search-radio';
  test('Testando a Search Bar e botão Ingredients', () => {
    render(<App />);

    const emailElement = screen.getByTestId('email-input');
    const passwordElement = screen.getByTestId('password-input');
    const buttonElement = screen.getByTestId('login-submit-btn');

    userEvent.type(emailElement, 'email@email.com');
    userEvent.type(passwordElement, '1234567');
    userEvent.click(buttonElement);

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
  test('Testando a Search Bar e botão Name', () => {
    render(<App />);

    const searchButtonElement = screen.getByTestId(searchTopBtn);
    userEvent.click(searchButtonElement);

    const searchBarElement = screen.getByTestId(searchInput);
    const radioNameElement = screen.getByTestId(nameSearchRadio);
    const getResultButtonElement = screen.getByTestId(execSearchButton);

    userEvent.type(searchBarElement, 'margarita');
    userEvent.click(radioNameElement);
    userEvent.click(getResultButtonElement);
  });
  test('Testando a Search Bar e botão First Letter', () => {
    render(<App />);

    const searchButtonElement = screen.getByTestId(searchTopBtn);
    userEvent.click(searchButtonElement);

    const searchBarElement = screen.getByTestId(searchInput);
    const radioFirstLetterElement = screen.getByTestId(firstLetterSearchRadio);
    const getResultButtonElement = screen.getByTestId(execSearchButton);

    userEvent.type(searchBarElement, 'c');
    userEvent.click(radioFirstLetterElement);
    userEvent.click(getResultButtonElement);
  });
  // test('Testando a Search Bar e botão First Letter', async () => {
  //   // render(<App />, { wrapper: BrowserRouter });
  //   const route = '/drinks';
  //   render(
  //     <MemoryRouter initialEntries={ [route] }>
  //       <App />
  //     </MemoryRouter>,
  //   );

  //   const searchButtonElement = screen.getByTestId(searchTopBtn);
  //   userEvent.click(searchButtonElement);

  //   const searchBarElement = screen.getByTestId(searchInput);
  //   const radioNameElement = screen.getByTestId(nameSearchRadio);
  //   const getResultButtonElement = screen.getByTestId(execSearchButton);

  //   userEvent.type(searchBarElement, 'margarita');
  //   userEvent.click(radioNameElement);
  //   userEvent.click(getResultButtonElement);

  //   // const view = screen.getByTestId('0-recipe-card');

  //   // within(view).getByRole('img', {
  //   //   name: /margarita/i,
  //   // });

  //   await waitFor(() => {
  //     expect(screen.queryByTestId('0-recipe-card')).toBeInTheDocument();
  //   }, { timeout: 9000 });
  // }, 10000);
});
