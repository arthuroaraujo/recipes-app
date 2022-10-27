import React, { useState, useEffect, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import Header from '../components/Header';
import InstructionCard from '../components/InstructionCard';
import RecomendationCard from '../components/RecomendationCard';
import AppContext from '../context/AppContext';
import '../components/recomendationCard.css';

function RecipeDetails() {
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [recipeType, setRecipeType] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [arrayOfIngredients, setArrayOfIngredients] = useState([]);
  const [arrayOfMeasures, setArrayOfMeasures] = useState([]);
  const [imagIndex, setImgIndex] = useState(0);

  const { id } = useParams();

  const { pathname } = useLocation();

  const { requestRecomendedCocktail,
    requestRecomendedMeal,
    mealsRecomendations,
    drinksRecomendations } = useContext(AppContext);

  const six = 6;
  const minusOne = -1;

  const ingredientsToArray = (ingredients) => {
    const ingredientList = Object.keys(ingredients)
      .filter((e) => e.includes('strIngredient'));
    setArrayOfIngredients([...ingredientList]);
    const ingredientMeasure = Object.keys(ingredients)
      .filter((e) => e.includes('strMeasure'));
    setArrayOfMeasures([...ingredientMeasure]);
  };

  const requestByID = async () => {
    if (pathname.includes('meals')) {
      const endPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(endPoint);
      const { meals } = await response.json();
      setRecipeDetails(meals[0]);
      ingredientsToArray(meals[0]);
      setRecipeType('meals');
    } else {
      const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(endPoint);
      const { drinks } = await response.json();
      // console.log(drinks);
      setRecipeDetails(drinks[0]);
      ingredientsToArray(drinks[0]);
      setRecipeType('drinks');
    }
  };

  useEffect(() => {
    if (recipeDetails.length === 0) {
      requestByID();
      setIsLoading(true);
    }
    // console.log('alo');
    setIsLoading(false);
  }, [recipeDetails, isLoading, arrayOfIngredients, arrayOfMeasures]);

  useEffect(() => {
    if (pathname.includes('meals')) {
      requestRecomendedCocktail();
    } else {
      requestRecomendedMeal();
    }
  }, []);

  const plusSlides = (nextMove) => {
    console.log(imagIndex, 'primeiro');
    if (imagIndex === six && nextMove === 1) {
      setImgIndex(0);
    } else if (imagIndex === 0 && nextMove === minusOne) {
      setImgIndex(six);
    } else if (nextMove === minusOne) {
      setImgIndex((prev) => prev - 1);
    } else { setImgIndex((prev) => prev + 1); }
  };

  return (
    <div>

      <Header />
      { isLoading ? <p>Loading...</p> : <InstructionCard
        unchangedArray={ recipeDetails }
        imgSrc={ recipeDetails.strMealThumb || recipeDetails.strDrinkThumb || [] }
        name={ recipeDetails.strDrink || recipeDetails.strMeal || [] }
        mealCategory={ recipeDetails.strCategory || [] }
        drinkCategory={ recipeDetails.strAlcoholic || [] }
        instruction={ recipeDetails.strInstructions || [] }
        recipeType={ recipeType }
        videoSrc={ recipeDetails.strSource || [] }
        ingredientsArray={ arrayOfIngredients }
        measuresArray={ arrayOfMeasures }
      /> }
      <div className="slideshow-container">
        {console.log(drinksRecomendations)}
        {recipeType === 'meals'
          ? drinksRecomendations
            .slice(0, six)
            .map((e, index) => (
              <RecomendationCard
                key={ index }
                index={ index }
                src={ e.strDrinkThumb }
                name={ e.strDrink }
                imagIndex={ imagIndex }
                // isVisible={ isVisible } // variavel que vai definir visibilidade
              />
            ))
          : mealsRecomendations
            .slice(0, six)
            .map((e, index) => (
              <RecomendationCard
                key={ index }
                index={ index }
                src={ e.strMealThumb }
                name={ e.strMeal }
                imagIndex={ imagIndex }
                // isVisible={ isVisible } // variavel que vai definir visibilidade
              />
            ))}
        <button
          type="button"
          className="prev"
          onClick={ () => plusSlides(minusOne) }
        >
          &#10094;

        </button>
        <button
          type="button"
          className="next"
          onClick={ () => plusSlides(1) }
        >
          &#10095;

        </button>
      </div>
    </div>
  );
}

export default RecipeDetails;
