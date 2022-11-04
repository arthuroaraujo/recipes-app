import React, { useEffect, useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MainContent from '../components/MainContent';
import AppContext from '../context/AppContext';
import '../styles/Profile.css';

function Profile() {
  const { setSearchInput } = useContext(AppContext);
  useEffect(() => {
    setSearchInput(false);
  }, []);

  return (
    <>
      <Header />
      <MainContent />
      <Footer />
    </>
  );
}

export default Profile;
