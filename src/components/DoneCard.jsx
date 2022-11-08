import React, { useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import '../styles/FavoriteCard.css';

function DoneCard({ index,
  name,
  imgSrc,
  category,
  id,
  type,
  nationality,
  alcoholicOrNot,
  tags,
  doneDate }) {
  const [isCopied, setIsCopied] = useState(false);
  const handleShareButton = () => {
    if (type) {
      copy(`http://localhost:3000/${type}s/${id}`);
      setIsCopied(true);
    }
  };

  return (
    <div className="done-card">
      <Link to={ `${type}s/${id}` }>
        <div className="image-container">
          <img data-testid={ `${index}-horizontal-image` } src={ imgSrc } alt={ name } />
        </div>
      </Link>
      <div className="done-info">
        <Link to={ `${type}s/${id}` }>
          <h4 data-testid={ `${index}-horizontal-name` }>{ name }</h4>
        </Link>
        <p
          data-testid={ `${index}-horizontal-top-text` }
        >
          { `${nationality} - ${category} - ${alcoholicOrNot}` }
        </p>
        <p
          data-testid={ `${index}-horizontal-done-date` }
        >
          { doneDate }
        </p>
        <div className="hash-container">
          { tags.slice(0, 2).map((e) => (
            <span
              key={ e }
              data-testid={ `${index}-${e}-horizontal-tag` }
            >
              { `#${e} ` }
            </span>
          )) }
        </div>
        <button
          type="button"
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          onClick={ handleShareButton }
          className="share-button"
        >
          <img src={ shareIcon } alt="search-button" />
        </button>
        { isCopied && <span>Link copied!</span>}
      </div>
    </div>
  );
}

DoneCard.propTypes = {
  index: PropTypes.number,
  imgSrc: PropTypes.string,
  name: PropTypes.string,
  category: PropTypes.string,
}.isRequired;

export default DoneCard;
