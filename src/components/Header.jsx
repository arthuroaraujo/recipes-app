import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import profile from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';

function Header() {
  const history = useHistory();
  const { getTitle, searchInput, setSearchInput } = useContext(AppContext);
  const pages = ['Profile', 'Done Recipes', 'Favorite Recipes'];

  const handleClick = () => {
    history.push('/profile');
  };

  return (
    <div>
      <h1
        data-testid="page-title"
      >
        {getTitle()}

      </h1>
      <button
        type="button"
        data-testid="profile-top-btn"
        src={ profile }
        alt="Profile Icon"
        onClick={ handleClick }
      />
      {pages.includes(getTitle()) ? null : <button
        type="button"
        data-testid="search-top-btn"
        src={ search }
        alt="Search Icon"
        onClick={ () => setSearchInput((prevState) => !prevState) }
      />}
      {searchInput && <input data-testid="search-input" type="text" /> }
    </div>
  );
}

export default Header;
