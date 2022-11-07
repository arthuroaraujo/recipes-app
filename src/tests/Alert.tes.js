import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWith';

describe('Testando o alert em Recipe Details', () => {
  const searchTopBtn = 'search-top-btn';
  const searchInput = 'search-input';
  const execSearchButton = 'exec-search-btn';
  const nameSearchRadio = 'name-search-radio';

  test('Testando pesquisa errada em drinks', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    const searchButtonElement = screen.getByTestId(searchTopBtn);
    userEvent.click(searchButtonElement);

    const searchBarElement = screen.getByTestId(searchInput);
    const radioNameElement = screen.getByTestId(nameSearchRadio);
    const getResultButtonElement = screen.getByTestId(execSearchButton);

    userEvent.type(searchBarElement, 'Beef and Mustard Pie');
    userEvent.click(radioNameElement);
    userEvent.click(getResultButtonElement);

    userEvent.click(searchButtonElement);
  }, 10000);
});
