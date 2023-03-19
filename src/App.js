import React from 'react';
import NavBar from './components/util/NavBar';
import { BrowserRouter } from "react-router-dom";
import AppRouter from './components/util/AppRouter';
import "./styles/util/style.scss";

function App() {

  let tags = require('./resources/testTagData.json');
  let products = require('./resources/testProductData.json');
  let recipes = require('./resources/testRecipeData.json');
  return (
    <BrowserRouter>
      <NavBar/>
      <AppRouter/>
    </BrowserRouter>
  );
}

export default App;
