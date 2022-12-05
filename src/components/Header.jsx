import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css"
import Nav from "./Nav";


const Header = () => {
  return (
    <header>
      <NavLink to="/home" className={"logo"}>
        TasteIT
      </NavLink>
      <Nav />
    </header>
  );
};

export default Header;
