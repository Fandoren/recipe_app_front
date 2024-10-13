import Recipes from "@/pages/recipes/Recipes";
import { Route, Routes } from "react-router-dom";
import Login from "@/pages/auth/Login";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Recipes />} />
      <Route path="/recipes" element={<Recipes />} />
      <Route path="/login" element={<Login/>}/>
    </Routes>
  );
}