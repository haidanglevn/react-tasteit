import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RecipeCard from "./RecipeCard";
import "./Recipes.css";

const Recipes = () => {
  const [recipe, setRecipe] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [country, setCountry] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/recipes").then((res) => {
        setRecipe(res.data);
    });
  }, []);

  useEffect(() => {
    makeCountryList();
  }, [recipe]);

  const searchHandler = (e) => {
    setSearchParam(e.target.value);
    recipeRender();
  };

  const makeCountryList = () => {
    let countryList = [];
    recipe.map((detail) => {
      countryList.push(detail.country);
    });
    let countryNoDub = [...new Set(countryList)];
    setCountry(countryNoDub);
  };

  const recipeRender = () => {
    let recipeList = "";
    if (searchParam == "") {
      recipeList = recipe.map((detail) => {
        return <RecipeCard key={detail.id} detail={detail} />;
      });
    } else {
      let search = recipe.filter(
        (dish) =>
          dish.name.toLowerCase().includes(searchParam.toLowerCase()) ||
          dish.country.toLowerCase().includes(searchParam.toLowerCase())
      );
      recipeList = search.map((detail) => {
        return <RecipeCard key={detail.id} detail={detail} />;
      });
    }

    return recipeList;
  };

  const filterByCountry = (value) => {
    setSearchParam(value);
  };

  return (
    <div className="recipes">
      <div className="recipes-search">
        <label>Search for recipe:</label> <br />
        <input
          type="text"
          placeholder="Search by name or country"
          value={searchParam}
          onChange={(e) => searchHandler(e)}
        />
      </div>
      <h1>Our recipes</h1>
      <div className="content">
        <div className="filter">
          <p style={{fontWeight: "bold"}}>Filter by country: </p>
          <p className="country-filter" onClick={() => filterByCountry("")}>
            All ({recipe.length})
          </p>
          {country.map((country) => {
            let filter = recipe.filter((dish) =>
              dish.country.toLowerCase().includes(country.toLowerCase())
            );
            return (
              <p
                key={country}
                className="country-filter"
                onClick={() => filterByCountry(country)}
              >
                {country} ({filter.length})
              </p>
            );
          })}
        </div>
        <div className="recipe-wrapper">{recipeRender()}</div>
      </div>
    </div>
  );
};

export default Recipes;
