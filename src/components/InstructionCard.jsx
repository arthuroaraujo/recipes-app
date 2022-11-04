import React from 'react';
import PropTypes from 'prop-types';

function InstructionCard({
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
  return (
    <div className="instruction-card content">
      <div className="img-container">
        <img data-testid="recipe-photo" src={ imgSrc } alt={ name } />
      </div>
      <h2 data-testid="recipe-title">{ name }</h2>
      {recipeType === 'meals' ? <p data-testid="recipe-category">{ mealCategory }</p>
        : <p data-testid="recipe-category">{ drinkCategory }</p>}
      <ul>
        {ingredientsArray
          .filter((ingr) => unchangedArray[ingr] !== ''
          && unchangedArray[ingr] !== null).map((e, index) => (
            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ index }
            >
              { `${unchangedArray[e]} - ` }
              { unchangedArray[measuresArray[index]] }
            </li>
          ))}
      </ul>
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

InstructionCard.propTypes = {
  index: PropTypes.number,
  src: PropTypes.string,
  name: PropTypes.string,
  category: PropTypes.string,
  ingredients: PropTypes.string,
  instruction: PropTypes.string,
}.isRequired;

export default InstructionCard;
