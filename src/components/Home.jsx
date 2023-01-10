import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="home-hero">
        <div>
          <h1>TasteIT</h1>
          <p>
            TasteIT is recipe app which is made in REACT22S group React lessons.
          </p>
          <Link to="/recipes">
            <button> Browse recipes</button>
          </Link>
        </div>
      </div>
      <h2 className="home-title">Looking for the recipes?</h2>
      <div className="home-link">
        <div>
          <h3>Browse recipes</h3>
          <p>
            Find your favorites in this collection. You can search recipes based
            on name or country
          </p>
          <Link to="/recipes">All recipes</Link>
        </div>

        <div>
          <h3>Add recipes</h3>
          <p>Recipe from your country is missing? No worries, add one!</p>
          <Link to="/newrecipe">Add recipes</Link>
        </div>

        <div>
          <h3>Want to know more about our projects</h3>
          <p>Visit our programme homepage</p>
          <a href="https://en.bc.fi/qualifications/full-stack-web-developer-program/" target={"_blank"} rel={"noopener noreferrer"}>
            Business College Helsinki homepage
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
