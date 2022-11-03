import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { BiDish, BiDrink } from 'react-icons/bi';
import { GiKnifeFork } from 'react-icons/gi';
import AppContext from '../context/AppContext';
import profile from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../styles/Header.css';

function Header() {
  const history = useHistory();
  const { id } = useParams();
  const { getTitle,
    searchInput,
    setSearchInput } = useContext(AppContext);
  const pages = ['Profile', 'Done Recipes', 'Favorite Recipes'];

  const handleClick = () => {
    history.push('/profile');
  };

  return (
    <header>
      <div className="header">
        <div className="logo">
          <BiDish
            style={ { height: '60px', width: '60px' } }
          />
        </div>
        <p>JSON.foodify()</p>
        <div className="container-search-icon">
          <button
            type="button"
            data-testid="profile-top-btn"
            src={ profile }
            onClick={ handleClick }
          >
            <img
              src={ profile }
              alt="profile-button"
              className="img-profile-search"
            />

          </button>
          {pages.includes(getTitle()) ? null : (
            <button
              type="button"
              data-testid="search-top-btn"
              src={ search }
              onClick={ () => setSearchInput((prevState) => !prevState) }
            >
              <img
                className="img-profile-search"
                src={ search }
                alt="search-button"
              />

            </button>
          )}
        </div>
      </div>
      <p className="fork-icon">
        { getTitle(id) === 'Meals' && (
          <GiKnifeFork
            style={ { fontSize: '3em', margin: '0 auto' } }
          />)}
        {getTitle(id) === 'Drinks' && (
          <BiDrink
            style={ { fontSize: '3em', margin: '0 auto' } }
          />
        )}
      </p>
      <h1
        data-testid="page-title"
      >
        {getTitle(id)}
      </h1>
      {searchInput && <SearchBar />}
    </header>
  );
}

export default Header;
