import React, { useState, useEffect, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import InProgressCard from '../components/InProgressCard';
import AppContext from '../context/AppContext';
import '../components/recomendationCard.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function InProgress() {
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [recipeType, setRecipeType] = useState('');
  const [recipeType2, setRecipeType2] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [arrayOfIngredients, setArrayOfIngredients] = useState([]);
  const [arrayOfMeasures, setArrayOfMeasures] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const { id } = useParams();

  const { pathname } = useLocation();

  const { requestRecomendedCocktail,
    requestRecomendedMeal,
  } = useContext(AppContext);

  const ingredientsToArray = (ingredients) => {
    const newList = Object.keys(ingredients)
      .filter((e) => e.includes('strIngredient'));
    const ingredientList = [];
    newList.forEach((e) => {
      if (ingredients[e] !== null && ingredients[e] !== '') {
        return ingredientList.push(e);
      }
    });
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
      setRecipeType2('meal');
    } else {
      const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(endPoint);
      const { drinks } = await response.json();
      // console.log(drinks);
      setRecipeDetails(drinks[0]);
      ingredientsToArray(drinks[0]);
      setRecipeType('drinks');
      setRecipeType2('drink');
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

  const handleShareButton = () => {
    copy(`http://localhost:3000/${recipeType}/${id}`);
    setIsCopied(true);
  };

  useEffect(() => {
    const prevFavRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

    const isItFavorite = prevFavRecipes.find((e) => +(e.id) === +(id));

    if (isItFavorite) {
      setIsFavorited(true);
    }
  }, []);

  const handleFavoriteButton = () => {
    const prevFavRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

    const isItFavorite = prevFavRecipes.find((e) => +(e.id) === +(id));

    const newFavRecipes = {
      id: recipeDetails.idDrink || recipeDetails.idMeal,
      type: recipeType2,
      nationality: recipeDetails.strArea || '',
      category: recipeDetails.strCategory,
      alcoholicOrNot: recipeDetails.strAlcoholic || '',
      name: recipeDetails.strDrink || recipeDetails.strMeal,
      image: recipeDetails.strMealThumb || recipeDetails.strDrinkThumb };

    if (!isItFavorite) {
      localStorage
        .setItem('favoriteRecipes', JSON.stringify([...prevFavRecipes, newFavRecipes]));
      setIsFavorited(true);
    } else {
      const filteredFavRecipes = prevFavRecipes.filter((e) => +(e.id) !== +(id));
      setIsFavorited(false);
      localStorage
        .setItem('favoriteRecipes', JSON.stringify(filteredFavRecipes));
    }
  };

  return (
    <div>

      <Header />
      { isLoading ? <p>Loading...</p> : <InProgressCard
        id={ id }
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
      <div
        style={ { position: 'fixed',
          zIndex: 2,
          bottom: 0,
          marginLeft: '300px' } }
      >
        <button
          type="button"
          data-testid="share-btn"
          src={ shareIcon }
          onClick={ handleShareButton }
        >
          <img src={ shareIcon } alt="search-button" />
        </button>
        { isCopied && <span>Link copied!</span>}
        { isFavorited ? (
          <button
            type="button"
            data-testid="favorite-btn"
            src={ blackHeartIcon }
            onClick={ handleFavoriteButton }
          >
            <img src={ blackHeartIcon } alt="search-button" />
          </button>
        ) : (
          <button
            type="button"
            data-testid="favorite-btn"
            src={ whiteHeartIcon }
            onClick={ handleFavoriteButton }
          >
            <img src={ whiteHeartIcon } alt="search-button" />
          </button>
        ) }
        <button
          type="button"
          data-testid="finish-recipe-btn"
        >
          Finish Recipe
        </button>
      </div>
    </div>
  );
}

export default InProgress;
