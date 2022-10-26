import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';

function Recipes() {
  const { recipes, setRecipes } = useContext(AppContext);
  const { location: { pathname } } = useHistory();
  let url;
  const recipe = pathname.substring(1);
  const twelve = 12;

  if (pathname === '/meals') {
    url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  } else {
    url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  }

  useEffect(() => {
    fetch(url).then((response) => response.json())
      .then((data) => setRecipes(data[recipe].slice(0, twelve)));
  }, []);

  return (
    recipes.map((meal, i) => (
      <div key={ i } data-testid={ `${i}-recipe-card` }>
        <img src={ meal.strMealThumb } alt="comida" data-testid={ `${i}-card-img` } />
        <h4 data-testid={ `${i}-card-name` }>
          { meal.strMeal }
        </h4>
        {meal.idMeal}
      </div>))
  );
}

export default Recipes;
