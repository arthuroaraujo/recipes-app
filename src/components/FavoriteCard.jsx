import React, { useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
// import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/FavoriteCard.css';

function FavoriteCard({ index,
  name,
  imgSrc,
  category,
  id,
  type,
  nationality,
  setIsStateChanged,
  alcoholicOrNot }) {
  const [isCopied, setIsCopied] = useState(false);
  const handleShareButton = () => {
    if (type) {
      copy(`http://localhost:3000/${type}s/${id}`);
      setIsCopied(true);
    }
  };

  const handleFavoriteButton = () => {
    const prevFavRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    const filteredFavRecipes = prevFavRecipes.filter((e) => +(e.id) !== +(id));

    localStorage
      .setItem('favoriteRecipes', JSON.stringify(filteredFavRecipes));
    setIsStateChanged((prev) => !prev);
  };

  return (
    <div className="favorite-card">
      <Link to={ `${type}s/${id}` }>
        <div className="image-container">
          <img data-testid={ `${index}-horizontal-image` } src={ imgSrc } alt={ name } />
        </div>
      </Link>
      <div className="favorite-info">
        <Link to={ `${type}s/${id}` }>
          <h4 data-testid={ `${index}-horizontal-name` }>{ name }</h4>
        </Link>
        <h4
          data-testid={ `${index}-horizontal-top-text` }
        >
          { `${nationality} - ${category} - ${alcoholicOrNot}` }
        </h4>
        <button
          type="button"
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          onClick={ handleShareButton }
        >
          <img src={ shareIcon } alt="search-button" />
        </button>
        { isCopied && <span>Link copied!</span>}
        <button
          type="button"
          data-testid={ `${index}-horizontal-favorite-btn` }
          src={ blackHeartIcon }
          onClick={ handleFavoriteButton }
        >
          <img src={ blackHeartIcon } alt="search-button" />
        </button>
      </div>
    </div>
  );
}

FavoriteCard.propTypes = {
  index: PropTypes.number,
  imgSrc: PropTypes.string,
  name: PropTypes.string,
  category: PropTypes.string,
}.isRequired;

export default FavoriteCard;
