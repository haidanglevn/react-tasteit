import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Recipes.css";

const Recipes = () => {
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/recipes").then((res) => {
      console.log(res.data);
      setRecipe(res.data);
    });
    axios
      .get("https://countryflagsapi.com/png/vietnam")
      .then((res) => console.log("flag: ", res));
  }, []);



  return (
    <div className="recipes">
      <div className="recipes-search">
        <label>Search for recipe:</label> <br />
        <input type="text" placeholder="Search..." />
      </div>
      <h1>Our recipes</h1>
      <div className="content">
        <div className="filter">
          <p>Filter by country: </p>
          <p>All ({recipe.length})</p>
        </div>
        <div className="recipe-wrapper">
          {recipe.map((a) => {
            let flag = `https://countryflagsapi.com/svg/${a.country}`;
            return (
              <div className="recipe">
                <span>
                  <img
                    src={flag}
                    alt="flag"
                    id="country-flag"
                  />
                </span>

                <img src={a.image} alt="recipe photo" />
                <div className="recipe-info">
                  <p>{a.name}</p>
                  <button>see more</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Recipes;
