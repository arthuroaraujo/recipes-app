import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWith';

describe('Testes da tela principal de receitas', () => {
  test('Testa se as 12 primeiras receitas são renderizadoas corretamente', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals');
    const arrayData = [];

    waitFor(() => {
      for (let i = 0; i < 12; i += 1) {
        arrayData.push(screen.getByTestId(`${i}-recipe-card`));
      }

      arrayData.forEach((data) => {
        expect(data).toBeInTheDocument();
      });
    }, 2000);
  });
});
