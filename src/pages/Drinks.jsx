import React, { useContext } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import AppContext from '../context/AppContext';

function Drinks() {
  const { cocktailIngredients, error } = useContext(AppContext);
  const twelve = 12;

  const alertWarning = () => {
    if (cocktailIngredients.length === 0) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };

  return (
    <div>
      <Header />
      {error && alertWarning()}
      {cocktailIngredients ? cocktailIngredients
        .slice(0, twelve)
        .map((drink, index) => (
          <Card
            key={ drink.idDrink }
            name={ drink.strDrink }
            src={ drink.strDrinkThumb }
            index={ index }
          />
        )) : null}
    </div>
  );
}

export default Drinks;
