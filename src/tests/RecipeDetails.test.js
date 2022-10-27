import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWith';

describe('Testando a Recipe Details', () => {
  test('Testando para Drinks', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/drinks/11118'] });
  });
});
