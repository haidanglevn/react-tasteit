import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Recipes from "./components/Recipes";
import NewRecipe from "./components/NewRecipe";
import Layout from "./pages/Layout";
import RecipeSingle from "./components/RecipeSingle";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/:recipesingle" element={<RecipeSingle />} />
          <Route path="/newrecipe" element={<NewRecipe />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
