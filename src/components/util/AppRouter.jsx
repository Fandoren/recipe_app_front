import React from "react";
import {Route, Routes} from "react-router-dom";
import RecipesPage from "../recipes/RecipesPage";
import ProductsPage from "../products/ProductsPage";
import TagsPage from "../tags/TagsPage";


function AppRouter() {
    return (
    <Routes>
        <Route exact path="/tags" element={<TagsPage/>}/>
        <Route exact path="/products" element={<ProductsPage/>}/>
        <Route exact path="/recipes" element={<RecipesPage/>}/>
    </Routes>
    )
}

export default AppRouter;