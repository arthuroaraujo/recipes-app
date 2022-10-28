import React from 'react';
import PropTypes from 'prop-types';

function RecomendationCard({ index, src, name, imagIndex }) {
  return (
    <div>
      {(imagIndex === index || imagIndex === index - 1) ? (
        <div
          className="mySlides"
          data-testid={ `${index}-recommendation-card` }
          style={ { display: 'block' } }
        >
          <img src={ src } alt={ name } />
          <h4 data-testid={ `${index}-recommendation-title` }>{ name }</h4>
        </div>
      ) : (
        <div
          className="mySlides"
          data-testid={ `${index}-recommendation-card` }
          style={ { display: 'none' } }
        >
          <img src={ src } alt={ name } />
          <h4 data-testid={ `${index}-recommendation-title` }>{ name }</h4>
        </div>
      )}
    </div>
  );
}

RecomendationCard.propTypes = {
  index: PropTypes.number,
  src: PropTypes.string,
  name: PropTypes.string,
}.isRequired;

export default RecomendationCard;
