import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import Card from './Card';

function Recipes() {
  const [recipesGeneral, setRecipesGeneral] = useState([]);
  const { recipes } = useContext(AppContext);

  const { location: { pathname } } = useHistory();
  let url;
  const recipeUrl = pathname.substring(1);
  const twelve = 12;

  if (pathname === '/meals') {
    url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  } else {
    url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  }

  useEffect(() => {
    fetch(url).then((response) => response.json())
      .then((data) => setRecipesGeneral(data[recipeUrl].splice(0, twelve)));
  }, []);

  return (
    <div>
      {recipes.length > 0 ? recipes.map((recipe, i) => (
        <Card
          link={ `/${recipeUrl}/${recipe.idMeal || recipe.idDrink}` }
          key={ recipeUrl === 'meals' ? recipe.idMeal : recipe.idDrink }
          index={ i }
          src={ recipeUrl === 'meals' ? recipe.strMealThumb : recipe.strDrinkThumb }
          name={ recipeUrl === 'meals' ? recipe.strMeal : recipe.strDrink }
        />
      )) : recipesGeneral.map((recipe2, i) => (
        <Card
          link={ `/${recipeUrl}/${recipe2.idMeal || recipe2.idDrink}` }
          key={ recipeUrl === 'meals' ? recipe2.idMeal : recipe2.idDrink }
          index={ i }
          src={ recipeUrl === 'meals' ? recipe2.strMealThumb : recipe2.strDrinkThumb }
          name={ recipeUrl === 'meals' ? recipe2.strMeal : recipe2.strDrink }
        />
      ))}
    </div>
  );
}

export default Recipes;
