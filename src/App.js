import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppProvider from './context/AppProvider';
import Login from './pages/Login';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={ Login } />
          <Route path="/meals" />
        </Switch>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
