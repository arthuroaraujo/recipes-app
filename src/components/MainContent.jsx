import React, { useState, useEffect } from 'react';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { useHistory } from 'react-router-dom';
import { BsBookmarkHeart } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';

function MainContent() {
  const history = useHistory();
  const [profile, setProfile] = useState(null);

  function redirect({ target }) {
    const { dataset: { url } } = target;
    history.push(url);
  }

  function logout() {
    localStorage.clear();
    history.push('/');
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setProfile(user.email);
    }
  }, [profile]);

  return (
    <main className="main-content">
      <h2 data-testid="profile-email">{ profile }</h2>
      <button
        type="button"
        data-testid="profile-done-btn"
        data-url="/done-recipes"
        onClick={ redirect }
      >
        <IoMdCheckmarkCircleOutline
          style={ { fontSize: '2em', pointerEvents: 'none' } }
        />
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        data-url="/favorite-recipes"
        onClick={ redirect }
      >
        <BsBookmarkHeart
          style={ { fontSize: '2em', pointerEvents: 'none' } }
        />
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        data-url="/"
        onClick={ logout }
      >
        <FiLogOut
          style={ { fontSize: '2em', pointerEvents: 'none' } }
        />
        Logout
      </button>
    </main>
  );
}

export default MainContent;
