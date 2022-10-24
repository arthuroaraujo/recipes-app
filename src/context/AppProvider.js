import React, { useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabledButton, setIsDisabledButton] = useState(true);
  const [searchInput, setSearchInput] = useState(false);

  const getTitle = useCallback(() => {
    const { pathname } = location;
    switch (pathname) {
    case '/meals':
      return 'Meals';

    case '/drinks':
      return 'Drinks';

    case '/profile':
      return 'Profile';

    case '/done-recipes':
      return 'Done Recipes';

    case '/favorite-recipes':
      return 'Favorite Recipes';

    default:
      return 'Not Found';
    }
  }, [location]);

  return (
    <AppContext.Provider
      value={ useMemo(
        () => ({
          products,
          setProducts,
          email,
          setEmail,
          password,
          setPassword,
          isDisabledButton,
          setIsDisabledButton,
          getTitle,
          searchInput,
          setSearchInput,
        }),
        [products, email, password, isDisabledButton, getTitle, searchInput],
      ) }
    >
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default AppProvider;
