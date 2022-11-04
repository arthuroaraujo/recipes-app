import React, { useEffect, useState } from 'react';
import FavoriteCard from '../components/FavoriteCard';
import Header from '../components/Header';

function FavoriteRecipes() {
  const [favoriteHistory, setFavoriteHistory] = useState([]);
  const [originalArray, setOriginalArray] = useState([]);
  const [isStateChanged, setIsStateChanged] = useState(true);

  useEffect(() => {
    const prevFavRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setFavoriteHistory(prevFavRecipes);
    setOriginalArray(prevFavRecipes);
  }, [isStateChanged]);

  const handleFilterButtons = (typeOfRecipe) => {
    if (typeOfRecipe === 'meals') {
      const favMeals = originalArray.filter((e) => e.type === 'meal');
      setFavoriteHistory(favMeals);
    } else if (typeOfRecipe === 'drinks') {
      const favDrinks = originalArray.filter((e) => e.type === 'drink');
      setFavoriteHistory(favDrinks);
    } else {
      setFavoriteHistory(originalArray);
    }
  };

  return (
    <div className="main-content-favorite">
      <Header />
      <div className="filter-buttons-container">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => handleFilterButtons('all') }
        >
          All

        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => handleFilterButtons('meals') }
        >
          Meals

        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => handleFilterButtons('drinks') }
        >
          Drinks

        </button>
      </div>
      { favoriteHistory && favoriteHistory.map((e, index) => (
        <FavoriteCard
          id={ e?.id }
          key={ e?.id }
          index={ index }
          name={ e?.name || '' }
          imgSrc={ e?.image || '' }
          category={ e?.category || '' }
          nationality={ e?.nationality || '' }
          type={ e?.type || '' }
          setIsStateChanged={ setIsStateChanged }
          alcoholicOrNot={ e?.alcoholicOrNot || '' }
        />
      ))}
    </div>
  );
}

export default FavoriteRecipes;
