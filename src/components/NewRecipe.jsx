import axios from "axios";
import React, { useEffect, useState } from "react";
import "./NewRecipe.css";

const NewRecipe = () => {
  const [recipe, setRecipe] = useState({
    name: "",
    author: "",
    country: "",
    description: "",
    image: "",
    instructions: "",
    ingredient: [],
  });
  const [country, setCountry] = useState([]);
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      const countryList = [];
      res.data.map((a) => countryList.push(a.name.common));
      countryList.sort();
      setCountry(countryList);
    });
  }, []);

  const onchangeHandler = (event) => {
    setRecipe({ ...recipe, [event.target.name]: event.target.value });
  };
  return (
    <div className="new-recipe">
      <h1>Add new recipe</h1>
      <form action="">
        <label htmlFor="name">Name</label>
        <input type="text" name="name" />

        <label htmlFor="author">Author</label>
        <input type="text" name="author" />

        <label htmlFor="country">Recipe is from:</label>
        <select name="country" id="country">
          <option value="" disabled>
            Choose a country:
          </option>
          {country.map((a) => {
            return <option key={a} value={a.toLowerCase()}>{a}</option>;
          })}
        </select>

        <label htmlFor="description">Description</label>
        <textarea name="description" cols="30" rows="10"></textarea>

        <label htmlFor="image">Image</label>
        <input type="text" name="image" placeholder="Paste a link here" />

        <label htmlFor="ingredients">Ingredients</label>
        <div className="ingredients">
          <div className="ingredients-info">
            <div>
              <label htmlFor="quantity">Quantity</label>
              <input type="text" name="quantity" />
            </div>
            <div>
              <label htmlFor="ingredient">Ingredient</label>
              <input type="text" name="ingredient" />
            </div>
          </div>
          <div>
            <button type="button">Add more</button>
          </div>
        </div>

        <label htmlFor="instructions">Instructions</label>
        <textarea name="instructions" cols="30" rows="10"></textarea>
        <button>Post recipe</button>
      </form>
    </div>
  );
};

export default NewRecipe;
