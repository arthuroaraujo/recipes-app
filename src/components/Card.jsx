import React from 'react';
import PropTypes from 'prop-types';

function Card({ index, src, name }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img data-testid={ `${index}-card-img` } src={ src } alt={ name } />
      <h4 data-testid={ `${index}-card-name` }>{ name }</h4>
    </div>
  );
}

Card.propTypes = {
  index: PropTypes.number,
  src: PropTypes.string,
  name: PropTypes.string,
}.isRequired;

export default Card;
