import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import AppContext from '../context/AppContext';
import profile from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

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
      <h1
        data-testid="page-title"
      >
        {getTitle(id)}
      </h1>
      <input
        type="button"
        data-testid="profile-top-btn"
        src={ profile }
        alt="Profile Icon"
        onClick={ handleClick }
      />
      {pages.includes(getTitle()) ? null : (
        <button
          type="button"
          data-testid="search-top-btn"
          src={ search }
          alt="Search Icon"
          onClick={ () => {
            setSearchInput((prevState) => !prevState);
            setRecipes([]);
          } }
        >
          Buscar

        </button>)}
      {searchInput && <SearchBar />}
    </header>
  );
}

export default Header;
