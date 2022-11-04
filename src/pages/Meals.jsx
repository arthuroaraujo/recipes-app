import React, { useContext } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import AppContext from '../context/AppContext';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import Categories from '../components/Categories';
import '../styles/Recipes.css';

function Meals() {
  const { mealIngredients,
    error,
    searchInput } = useContext(AppContext);
  const twelve = 12;

  const alertWarning = () => {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  };

  return (
    <>
      <Header />
      <div className="content-container content">
        <Categories />
        <main className="main-content">
          {searchInput && mealIngredients.length !== 0 ? null : <Recipes />}
          {error && alertWarning()}
          {mealIngredients ? mealIngredients
            .slice(0, twelve)
            .map((meal, index) => (
              <Card
                link={ `/meals/${meal.idMeal}` }
                key={ meal.idMeal }
                name={ meal.strMeal }
                src={ meal.strMealThumb }
                index={ index }
              />
            )) : null}
        </main>
      </div>
      <Footer />
    </>
  );
}

export default Meals;
