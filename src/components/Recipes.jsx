import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Card from './Card';

function Recipes() {
  const [recipes, setRecipes] = useState([]);

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
      .then((data) => setRecipes(data[recipeUrl].splice(0, twelve)));
  }, []);

  return (
    <>
      {recipes.map((recipe, i) => (
        <Card
          link={ `/${recipeUrl}/${recipe.idMeal || recipe.idDrink}` }
          key={ recipeUrl === 'meals' ? recipe.idMeal : recipe.idDrink }
          index={ i }
          src={ recipeUrl === 'meals' ? recipe.strMealThumb : recipe.strDrinkThumb }
          name={ recipeUrl === 'meals' ? recipe.strMeal : recipe.strDrink }
        />
      ))}
    </>
  );
}

export default Recipes;
