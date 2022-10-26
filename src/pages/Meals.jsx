import React, { useContext } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import AppContext from '../context/AppContext';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

function Meals() {
  const { mealIngredients, error, searchInput } = useContext(AppContext);
  const twelve = 12;

  const alertWarning = () => {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  };

  return (
    <div className="content-container">
      <Header />
      {searchInput && mealIngredients.length !== 0 ? null : <Recipes />}
      {error && alertWarning()}
      {mealIngredients ? mealIngredients
        .slice(0, twelve)
        .map((meal, index) => (
          <Card
            key={ meal.idMeal }
            name={ meal.strMeal }
            src={ meal.strMealThumb }
            index={ index }
          />
        )) : null}
      <Footer />
    </div>
  );
}

export default Meals;
