import React from 'react';
import ItemCard from './components/util/ItemCard';
import NavBar from './components/util/NavBar';
import { BrowserRouter } from "react-router-dom";
import "./styles/util/style.scss";
import MainPage from './components/util/MainPage';

function App() {

  let tags = require('./resources/testTagData.json');
  let products = require('./resources/testProductData.json');
  let recipes = require('./resources/testRecipeData.json');
  return (
    <BrowserRouter>
      <NavBar/>
      <MainPage/>
    </BrowserRouter>
  );
}

export default App;
