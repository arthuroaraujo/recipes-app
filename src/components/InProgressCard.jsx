import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/InProgress.css';

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
  unchangedArray,
  id,
  setIngredQnt,
  setIngredDoneQnt }) {
  const [recipeHistory, setRecipeHistory] = useState({});

  useEffect(() => {
    const progressData = JSON
      .parse(localStorage.getItem('inProgressRecipes')) || { drinks: {}, meals: {} };
    setRecipeHistory(progressData);
  }, []);

  useEffect(() => {
    if (recipeHistory[recipeType]) {
      // console.log(ingredientsArray.length);
      // console.log(recipeHistory[recipeType][id].length);
      setIngredQnt(ingredientsArray?.length);
      setIngredDoneQnt(recipeHistory[recipeType][id]?.length);
    }
  }, [recipeType]);

  const handleCheckbox = (ingredient) => {
    let newOjectIngredientes = { ...recipeHistory };

    if (!newOjectIngredientes[recipeType][id]) {
      newOjectIngredientes = {
        ...recipeHistory,
        [recipeType]: {
          ...recipeHistory[recipeType],
          [id]: [...recipeHistory[recipeType][id] || [], ingredient],
        },
      };
    } else {
      const isItDone = newOjectIngredientes[recipeType][id]
        .find((e) => e === ingredient);
      if (isItDone === undefined) {
        newOjectIngredientes = {
          ...recipeHistory,
          [recipeType]: {
            ...recipeHistory[recipeType],
            [id]: [...recipeHistory[recipeType][id] || [], ingredient],
          },
        };
      } else {
        const indexOfIngredients = newOjectIngredientes[recipeType][id]
          .indexOf(ingredient);
        newOjectIngredientes[recipeType][id].splice(indexOfIngredients, 1);
      }
    }
    setRecipeHistory(newOjectIngredientes);
    localStorage.setItem('inProgressRecipes', JSON.stringify(newOjectIngredientes));
    setIngredDoneQnt(newOjectIngredientes[recipeType][id]?.length);
    // console.log(newOjectIngredientes[recipeType][id].length);
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
            className={ recipeHistory[recipeType][id]
              ?.find((el) => el
              === `${unchangedArray[e]} - ${unchangedArray[measuresArray[index]]}`)
              ? 'label-checkbox' : 'label-checkbox-2' }
          >
            <input
              name={ `${index}-ingredients-checkbox` }
              type="checkbox"
              data-testid={ `${index}-ingredient-name-and-measure` }
              onChange={ () => handleCheckbox(
                `${unchangedArray[e]} - ${unchangedArray[measuresArray[index]]}`,
              ) }
              checked={ recipeHistory[recipeType][id]
                ?.find((el) => el
                === `${unchangedArray[e]} - ${unchangedArray[measuresArray[index]]}`) }
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
