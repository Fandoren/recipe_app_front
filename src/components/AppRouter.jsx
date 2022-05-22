import React from "react";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import Tags from "../pages/Tags";
import {Route, Routes} from "react-router-dom";
import TagId from "../pages/TagId";

function AppRouter() {
    return (
    <Routes>
        <Route path="/about" element={<About/>}/>
        <Route exact path="/tags" element={<Tags/>}/>
        <Route exact path="/tags/:id" element={<TagId/>}/>
        <Route path="/recipes" element={<Tags/>}/>
        <Route path="*" element={<NotFound/>}/>
    </Routes>
    )
}

export default AppRouter;