import React from "react";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import Tags from "../pages/Tags";
import Products from "../pages/Products";
import {Route, Routes} from "react-router-dom";
import TagId from "../pages/TagId";
import ProductId from "../pages/ProductId";

function AppRouter() {
    return (
    <Routes>
        <Route path="/about" element={<About/>}/>
        <Route path="/" element={<About/>}/>
        <Route exact path="/tags" element={<Tags/>}/>
        <Route exact path="/tags/:id" element={<TagId/>}/>
        <Route exact path="/products" element={<Products/>}/>
        <Route exact path="/products/:id" element={<ProductId/>}/>
        <Route path="/recipes" element={<Tags/>}/>
        <Route path="*" element={<NotFound/>}/>
    </Routes>
    )
}

export default AppRouter;