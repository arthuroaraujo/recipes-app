import React, { } from 'react';
import drinkImage from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/BottomMenu.css';

function BottomMenu() {
  return (
    <footer data-testid="footer">
      <a href="/drinks">
        <img
          src={ drinkImage }
          alt="Bebidas"
          data-testid="drinks-bottom-btn"
        />

      </a>
      <a href="/meals">
        <img
          src={ mealIcon }
          alt="Comidas"
          data-testid="meals-bottom-btn"
        />

      </a>
    </footer>
  );
}

export default BottomMenu;
