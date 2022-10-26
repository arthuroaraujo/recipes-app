import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppProvider from './context/AppProvider';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeDetails from './pages/RecipeDetails';
import InProgress from './pages/InProgress';

function App() {
  return (
    <AppProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Meals } />
        <Route exact path="/meals/:id" component={ RecipeDetails } />
        <Route exact path="/meals/:id/in-progress" component={ InProgress } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/drinks/:id" component={ RecipeDetails } />
        <Route exact path="/drinks/:id/in-progress" component={ InProgress } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route component={ NotFound } />
      </Switch>
    </AppProvider>
  );
}

export default App;
