import React, { useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabledButton, setIsDisabledButton] = useState(true);
  const [searchInput, setSearchInput] = useState(false);
  const [mealIngredients, setMealIngredients] = useState([]);
  const [cocktailIngredients, setCocktailIngredients] = useState([]);
  const [error, setError] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [drinksRecomendations, setDrinksRecomendations] = useState([]);
  const [mealsRecomendations, setMealsRecomendations] = useState([]);

  const requestMealIngredients = async (ingredient) => {
    const endPoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    const response = await fetch(endPoint);
    const { meals } = await response.json();
    if (meals === null) {
      setError(true);
    } else {
      setError(false);
      setMealIngredients(meals);
    }
  };

  const requestMealName = async (name = '') => {
    const endPoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
    const response = await fetch(endPoint);
    const { meals } = await response.json();
    if (meals === null) {
      setError(true);
    } else {
      setError(false);
      setMealIngredients(meals);
    }
  };

  const requestMealFirstLetter = async (firstLetter) => {
    const endPoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
    const response = await fetch(endPoint);
    const { meals } = await response.json();
    if (meals === null) {
      setError(true);
    } else {
      setError(false);
      setMealIngredients(meals);
    }
  };

  const requestCocktailIngredients = async (ingredient) => {
    const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    const response = await fetch(endPoint);
    const { drinks } = await response.json();
    if (drinks === null) {
      setError(true);
    } else {
      setError(false);
      setCocktailIngredients(drinks);
    }
  };

  const requestCocktailName = async (name) => {
    const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
    const response = await fetch(endPoint);
    const { drinks } = await response.json();
    if (drinks === null) {
      setError(true);
    } else {
      setError(false);
      setCocktailIngredients(drinks);
    }
  };

  const requestCocktailFirstLetter = async (firstLetter) => {
    const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;
    const response = await fetch(endPoint);
    const { drinks } = await response.json();
    if (drinks === null) {
      setError(true);
    } else {
      setError(false);
      setCocktailIngredients(drinks);
    }
  };

  const requestRecomendedMeal = async () => {
    const endPoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(endPoint);
    const { meals } = await response.json();
    setMealsRecomendations(meals);
  };

  const requestRecomendedCocktail = async () => {
    const endPoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(endPoint);
    const { drinks } = await response.json();
    setDrinksRecomendations(drinks);
  };

  const getTitle = useCallback((id) => {
    const { pathname } = location;
    switch (pathname) {
    case '/meals':
      return 'Meals';

    case '/drinks':
      return 'Drinks';

    case '/profile':
      return 'Profile';

    case '/done-recipes':
      return 'Done Recipes';

    case '/favorite-recipes':
      return 'Favorite Recipes';

    case `/meals/${id}`:
      return 'Recipe Details';

    case `/drinks/${id}`:
      return 'Recipe Details';

    case `/meals/${id}/in-progress`:
      return 'InProgress';

    case `/drinks/${id}/in-progress`:
      return 'InProgress';

    default:
      return 'Not Found';
    }
  }, [location]);

  return (
    <AppContext.Provider
      value={ useMemo(
        () => ({
          products,
          email,
          password,
          isDisabledButton,
          searchInput,
          mealIngredients,
          recipes,
          cocktailIngredients,
          error,
          categories,
          setCocktailIngredients,
          setProducts,
          setEmail,
          setPassword,
          setIsDisabledButton,
          getTitle,
          setSearchInput,
          setRecipes,
          setMealIngredients,
          requestMealIngredients,
          requestMealName,
          requestMealFirstLetter,
          requestCocktailIngredients,
          requestCocktailName,
          requestCocktailFirstLetter,
          setCategories,
          mealsRecomendations,
          requestRecomendedMeal,
          drinksRecomendations,
          requestRecomendedCocktail,
        }),
        [
          products,
          email,
          password,
          isDisabledButton,
          getTitle,
          searchInput,
          mealIngredients,
          cocktailIngredients,
          recipes,
          categories,
          error,
          mealsRecomendations,
          drinksRecomendations],
      ) }
    >
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default AppProvider;
