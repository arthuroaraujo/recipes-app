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

  const getTitle = useCallback((id) => {
    const { pathname } = location;
    // const pathnameList = pathname.split('/');
    // const id = pathnameList[pathnameList.length - 1];
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
      return 'Recipe';

    case `/drinks/${id}`:
      return 'Recipe';

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
        }),
        [products,
          email,
          password,
          isDisabledButton,
          getTitle,
          searchInput,
          mealIngredients,
          cocktailIngredients,
          recipes,
          error],
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
