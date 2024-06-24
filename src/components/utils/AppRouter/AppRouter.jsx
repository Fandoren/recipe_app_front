import Recipes from "components/recipes/Recipes";
import React from "react";
import { Route, Routes } from "react-router-dom";

export default function AppRouter() {
  return (
    <Routes>
      <Route exact path="/" element={<Recipes />} />
      <Route exact path="/recipes" element={<Recipes />} />
    </Routes>
  );
}
