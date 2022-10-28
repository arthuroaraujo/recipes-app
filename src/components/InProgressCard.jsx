import React, { useState } from 'react';
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
  unchangedArray }) {
  const [isDone, setIsDone] = useState(false);
  // const [checkboxIngredients, setCheckboxIngredients] = useState([]);
  const decoration = 'line-through solid rgb(0, 0, 0)';

  // const handleCheckbox = (id, ingredient) => {
  //   const prevCheckbox = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
  //   console.log(prevCheckbox);
  //   if (recipeType === 'meals') {
  //     const mealsCheckbox = {
  //     ...prevCheckbox,
  //     prevCheckbox[meals] }
  //   } else {
  //     const drinksCheckbox = {
  //     ...prevCheckbox,
  //     prevCheckbox[drinks] }
  //   }
  // };
  // localStorage
  //   .setItem('inProgressRecipes', JSON.stringify([]));

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
              onChange={ () => setIsDone((prev) => !prev) }
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
