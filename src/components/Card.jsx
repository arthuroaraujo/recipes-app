import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Card({ index, src, name, link }) {
  return (
    <div
      data-testid={ `${index}-recipe-card` }
    >
      <Link to={ link }>
        <img data-testid={ `${index}-card-img` } src={ src } alt={ name } />
        <h4 data-testid={ `${index}-card-name` }>{ name }</h4>
      </Link>
    </div>
  );
}

Card.propTypes = {
  index: PropTypes.number,
  src: PropTypes.string,
  name: PropTypes.string,
}.isRequired;

export default Card;
