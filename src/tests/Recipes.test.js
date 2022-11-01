import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWith';

const ordinary = 'Ordinary Drink-category-filter';
describe('Testes da tela principal de receitas para drinks', () => {
  test('Testa se as 12 primeiras receitas são renderizadoas corretamente', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/drinks'] });
    expect(history.location.pathname).toBe('/drinks');

    await waitFor(() => {
      screen.findByRole('button', { name: /cocoa/i });
    }, { timeout: 8000 });
    const allCards = await screen.findAllByTestId(/recipe-card/i, { exact: false });
    expect(allCards).toHaveLength(12);
  }, 10000);

  test('Testando a Search Bar e botão Ingredients', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    expect(history.location.pathname).toBe('/drinks');

    await waitFor(() => {
      screen.getByTestId(ordinary);
    });
    const ordinaryButton = screen.getByTestId(ordinary);
    userEvent.click(ordinaryButton);

    const cocktailsButton = screen.getByTestId('Cocktail-category-filter');
    userEvent.click(cocktailsButton);

    const shakeButton = screen.getByTestId('Shake-category-filter');
    userEvent.click(shakeButton);

    const otherButton = screen.getByTestId('Other/Unknown-category-filter');
    userEvent.click(otherButton);

    const allButton = screen.getByTestId('All-category-filter');
    userEvent.click(allButton);

    const cocoaButton = screen.getByTestId('Cocoa-category-filter');
    userEvent.click(cocoaButton);

    await waitFor(() => {
      screen.getByRole('img', { name: /castillian hot chocolate/i });
    }, { timeout: 8000 });

    userEvent.click(cocoaButton);

    userEvent.click(allButton);
  }, 20000);
});

describe('Testes da tela principal de receitas para meals', () => {
  test('Testa se as 12 primeiras receitas são renderizadoas corretamente', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });
    expect(history.location.pathname).toBe('/meals');

    waitFor(() => {
      // screen.findByRole('button', { name: /breakfast/i });
      screen.findByTestId('0-recipe-card');
    }, { timeout: 10000 });

    const allCards = await screen.findAllByTestId(/recipe-card/i, { exact: false });
    expect(allCards).toHaveLength(12);
  }, 12000);

  test('Testando a Search Bar e botão Ingredients', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });

    expect(history.location.pathname).toBe('/meals');

    await waitFor(() => {
      screen.getByTestId('Beef-category-filter');
    });
    const beefButton = screen.getByTestId('Beef-category-filter');
    userEvent.click(beefButton);

    const breakfastButton = screen.getByTestId('Breakfast-category-filter');
    userEvent.click(breakfastButton);

    const chickenButton = screen.getByTestId('Chicken-category-filter');
    userEvent.click(chickenButton);

    const dessertButton = screen.getByTestId('Dessert-category-filter');
    userEvent.click(dessertButton);

    const allButton = screen.getByTestId('All-category-filter');
    userEvent.click(allButton);

    const goatButton = screen.getByTestId('Goat-category-filter');
    userEvent.click(goatButton);

    // await waitFor(() => {
    //   screen.getByRole('img', { name: /mbuzi choma \(roasted goat\)/i });
    // }, { timeout: 8000 });

    userEvent.click(goatButton);
    userEvent.click(allButton);
  }, 20000);
});
