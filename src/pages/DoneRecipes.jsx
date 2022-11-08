import React, { useEffect, useState } from 'react';
import DoneCard from '../components/DoneCard';
import Header from '../components/Header';
import '../styles/DoneRecipes.css';

function DoneRecipes() {
  const [doneHistory, setDoneHistory] = useState([]);
  const [originalArray, setOriginalArray] = useState([]);

  useEffect(() => {
    const prevDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setDoneHistory(prevDoneRecipes);
    setOriginalArray(prevDoneRecipes);
  }, []);

  const handleFilterButtons = (typeOfRecipe) => {
    if (typeOfRecipe === 'meals') {
      const favMeals = originalArray.filter((e) => e.type === 'meal');
      setDoneHistory(favMeals);
    } else if (typeOfRecipe === 'drinks') {
      const favDrinks = originalArray.filter((e) => e.type === 'drink');
      setDoneHistory(favDrinks);
    } else {
      setDoneHistory(originalArray);
    }
  };

  return (
    <div className="main-content-done">
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
      { doneHistory && doneHistory.map((e, index) => (
        <DoneCard
          id={ e?.id }
          key={ e?.id }
          index={ index }
          name={ e?.name }
          imgSrc={ e?.image }
          category={ e?.category }
          nationality={ e?.nationality || '' }
          type={ e?.type }
          alcoholicOrNot={ e?.alcoholicOrNot }
          doneDate={ e?.doneDate }
          tags={ e?.tags }
        />
      ))}
    </div>
  );
}

export default DoneRecipes;
