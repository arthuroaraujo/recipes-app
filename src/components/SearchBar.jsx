import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import AppContext from '../context/AppContext';

function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const [searchRadio, setSearchRadio] = useState('');

  const { requestMealIngredients,
    requestMealName,
    requestMealFirstLetter,
    requestCocktailIngredients,
    requestCocktailName,
    requestCocktailFirstLetter,
    getTitle,
    mealIngredients,
    cocktailIngredients } = useContext(AppContext);

  const requestMeal = () => {
    switch (searchRadio) {
    case 'ingredient-search-radio':
      return requestMealIngredients(searchInput);

    case 'name-search-radio':
      return requestMealName(searchInput);

    default:
      return requestMealFirstLetter(searchInput);
    }
  };

  const requestCocktail = () => {
    switch (searchRadio) {
    case 'ingredient-search-radio':
      return requestCocktailIngredients(searchInput);

    case 'name-search-radio':
      return requestCocktailName(searchInput);

    default:
      return requestCocktailFirstLetter(searchInput);
    }
  };

  const handleClick = () => {
    const verifyName = getTitle();
    if (searchRadio === 'first-letter-search-radio' && searchInput.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else if (verifyName === 'Meals') {
      requestMeal();
    } else {
      requestCocktail();
    }
  };

  return (
    <div>
      {/* {mealIngredients.length === 1 && <Redirect
        to={ `/meals/${mealIngredients[0].idMeal}` }
      />}
      {cocktailIngredients.length === 1 && <Redirect
        to={ `/drinks/${cocktailIngredients[0].idDrink}` }
      />} */}
      <input
        data-testid="search-input"
        type="text"
        value={ searchInput }
        onChange={ ({ target }) => setSearchInput(target.value) }
      />
      <label htmlFor="ingredient-search-radio">
        Ingredient
        <input
          type="radio"
          name="search-radio"
          id="ingredient-search-radio"
          data-testid="ingredient-search-radio"
          value="ingredient-search-radio"
          onChange={ ({ target }) => setSearchRadio(target.value) }
        />
      </label>
      <label htmlFor="name-search-radio">
        Name
        <input
          type="radio"
          name="search-radio"
          id="name-search-radio"
          data-testid="name-search-radio"
          value="name-search-radio"
          onChange={ ({ target }) => setSearchRadio(target.value) }
        />
      </label>
      <label htmlFor="first-letter-search-radio">
        First letter
        <input
          type="radio"
          name="search-radio"
          id="first-letter-search-radio"
          data-testid="first-letter-search-radio"
          value="first-letter-search-radio"
          onChange={ ({ target }) => setSearchRadio(target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
