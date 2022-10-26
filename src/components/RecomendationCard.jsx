import React from 'react';
import PropTypes from 'prop-types';

function RecomendationCard({ index, src, name }) {
  return (
    <div className="my-slides-fade" data-testid={ `${index}-recommendation-card` }>
      <img src={ src } alt={ name } />
      <h4 data-testid={ `${index}-recommendation-title` }>{ name }</h4>
    </div>
  );
}

RecomendationCard.propTypes = {
  index: PropTypes.number,
  src: PropTypes.string,
  name: PropTypes.string,
}.isRequired;

export default RecomendationCard;
