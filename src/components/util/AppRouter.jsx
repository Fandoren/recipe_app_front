import React from "react";
import {Route, Routes} from "react-router-dom";
import RecipesPage from "../recipes/RecipesPage";
import ProductsPage from "../products/ProductsPage";
import TagsPage from "../tags/TagsPage";
import ProfilePage from "../profile/ProfilePage";
import RecipePage from "../recipes/RecipePage";
import TagCreatePage from "../tags/TagCreatePage";


function AppRouter() {
    return (
    <Routes>
        <Route exact path="/tags" element={<TagsPage/>}/>
        <Route exact path="/tags/createTag" element={<TagCreatePage/>}/>
        <Route exact path="/tags/:id" element={<RecipePage/>}/>
        <Route exact path="/products" element={<ProductsPage/>}/>
        <Route exact path="/recipes" element={<RecipesPage/>}/>
        <Route exact path="/recipes/:id" element={<RecipePage/>}/>
        <Route exact path="/profile" element={<ProfilePage/>}/>
    </Routes>
    )
}

export default AppRouter;