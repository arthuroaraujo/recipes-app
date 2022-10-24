import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabledButton, setIsDisabledButton] = useState(true);

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
        }),
        [products, email, password, isDisabledButton],
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
