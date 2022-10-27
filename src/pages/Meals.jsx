import React, { useContext } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import AppContext from '../context/AppContext';
import Footer from '../components/Footer';

function Meals() {
  const { mealIngredients,
    error,
    drinksRecomendations } = useContext(AppContext);
  const twelve = 12;

  const alertWarning = () => {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  };

  return (
    <div className="content-container">
      <Header />
      {console.log(drinksRecomendations)}
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
