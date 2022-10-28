import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function InProgressCard({
  imgSrc,
  name,
  mealCategory,
  drinkCategory,
  instruction,
  recipeType,
  videoSrc,
  ingredientsArray,
  measuresArray,
  unchangedArray, id }) {
  const [isDone, setIsDone] = useState(false);
  const [recipeHistory, setRecipeHistory] = useState({ drinks: {}, meals: {} });
  // const [checkboxIngredients, setCheckboxIngredients] = useState([]);
  const decoration = 'line-through solid rgb(0, 0, 0)';

  useEffect(() => {
    const progressData = JSON
      .parse(localStorage.getItem('inProgressRecipes')) || { drinks: {}, meals: {} };
    setRecipeHistory(progressData);
  }, []);

  // adicionado objeto atualizado
  // falta não adicionar ingredientes duplicado
  // falta verificar o checkbox com os dados já existentes
  const handleCheckbox = (ingredient) => {
    let newOjectIngredientes = { ...recipeHistory };

    if (recipeType === 'meals') {
      newOjectIngredientes = {
        ...recipeHistory,
        meals: {
          ...recipeHistory.meals,
          [id]: [...recipeHistory.meals[id] || [], ingredient],
        },
      };
    }

    if (recipeType === 'drinks') {
      newOjectIngredientes = {
        ...recipeHistory,
        drinks: {
          ...recipeHistory.drinks,
          [id]: [...recipeHistory.drinks[id] || [], ingredient],
        },
      };
    }

    // console.log(newOjectIngredientes);
    setRecipeHistory(newOjectIngredientes);
    localStorage.setItem('inProgressRecipes', JSON.stringify(newOjectIngredientes));
  };

  return (
    <div>
      <img data-testid="recipe-photo" src={ imgSrc } alt={ name } />
      <h2 data-testid="recipe-title">{ name }</h2>
      {recipeType === 'meals' ? <p data-testid="recipe-category">{ mealCategory }</p>
        : <p data-testid="recipe-category">{ drinkCategory }</p>}
      {ingredientsArray
        .filter((e) => e !== '')
        .map((e, index) => (
          <label
            htmlFor={ `${index}-ingredients-checkbox` }
            key={ index }
            data-testid={ `${index}-ingredient-step` }
            style={ { textDecoration: isDone ? decoration : 'none',
            } }
          >
            <input
              name={ `${index}-ingredients-checkbox` }
              type="checkbox"
              data-testid={ `${index}-ingredient-name-and-measure` }
              onClick={ () => handleCheckbox(
                `${unchangedArray[e]} - ${unchangedArray[measuresArray[index]]}`,
              ) }
            />
            { `${unchangedArray[e]} - ` }
            { unchangedArray[measuresArray[index]] }
          </label>
        ))}
      <p data-testid="instructions">{ instruction }</p>
      { recipeType === 'meals' ? (
        <video
          data-testid="video"
          width="320"
          height="240"
          controls
        >
          <source src={ videoSrc } type="video/mp4" />
          <track
            kind="captions"
          />
        </video>
      ) : null}
    </div>
  );
}
InProgressCard.propTypes = {
  index: PropTypes.number,
  src: PropTypes.string,
  name: PropTypes.string,
  category: PropTypes.string,
  ingredients: PropTypes.string,
  instruction: PropTypes.string,
}.isRequired;
export default InProgressCard;
