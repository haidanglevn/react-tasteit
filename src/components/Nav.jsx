import React from "react";
import { NavLink } from "react-router-dom";

import "./Nav.css";

const Nav = () => {
  return (
    <nav>
      <div>
        <NavLink to="/home">Home</NavLink>
      </div>
      <div>
        <NavLink to="/recipes">Recipes</NavLink>
      </div>
      <div>
        <NavLink to="/newrecipe">Add a recipe</NavLink>
      </div>
    </nav>
  );
};

export default Nav;
