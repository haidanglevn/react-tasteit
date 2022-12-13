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
  const [countries, setCountries] = useState([]);
  const [ingredientFields, setIngredientFields] = useState([
    {
      name: "",
      quantity: "",
      unit: "",
    },
  ]);
  const [instructionFields, setInstructionFields] = useState([""]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      const countryList = [];
      res.data.map((a) => countryList.push(a.name.common));
      countryList.sort();
      setCountries(countryList);
    });
  }, []);

  const units = [
    "teaspoon",
    "tablespoon",
    "cup",
    "pint",
    "quart",
    "gram",
    "ounce",
    "pound",
    "liter",
  ];

  const onchangeHandler = (event) => {
    console.log("changing ", event.target.name, " to ", event.target.value);
    setRecipe({ ...recipe, [event.target.name]: event.target.value });
  };

  const ingredientHandler = (event, index) => {
    let data = [...ingredientFields];
    data[index][event.target.name] = event.target.value;
    setIngredientFields(data);
  };

  const addField = () => {
    let object = {
      name: "",
      quantity: "",
      unit: "",
    };
    setIngredientFields([...ingredientFields, object]);
  };

  const submit = (e) => {
    e.preventDefault();
    setRecipe({ ...recipe, ingredient: ingredientFields });
    console.log(recipe);
    axios
      .post("http://localhost:3001/recipes", recipe)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };
  return (
    <div className="new-recipe">
      <h1>Add new recipe</h1>
      <form action="">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          onChange={(event) => onchangeHandler(event)}
        />

        <label htmlFor="author">Author</label>
        <input
          type="text"
          name="author"
          onChange={(event) => onchangeHandler(event)}
        />

        <label htmlFor="country">Recipe is from:</label>
        <select
          name="country"
          id="country"
          onChange={(event) => onchangeHandler(event)}
        >
          <option value="" disabled>
            Choose a country:
          </option>
          {countries.map((a) => {
            return (
              <option key={a} value={a.toLowerCase()}>
                {a}
              </option>
            );
          })}
        </select>

        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          cols="30"
          rows="10"
          onChange={(event) => onchangeHandler(event)}
        ></textarea>

        <label htmlFor="image">Image</label>
        <input
          type="text"
          name="image"
          placeholder="Paste a link here"
          onChange={(event) => onchangeHandler(event)}
        />

        <label htmlFor="ingredients">Ingredients</label>
        <div className="ingredients">
          {ingredientFields.map((ingredient, index) => {
            return (
              <div className="ingredients-info" key={index}>
                <div>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={ingredient.name}
                    onChange={(event) => ingredientHandler(event, index)}
                  />
                </div>
                <div>
                  <label htmlFor="quantity">Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    value={ingredient.quantity}
                    onChange={(event) => ingredientHandler(event, index)}
                  />
                </div>
                <div>
                  <label htmlFor="unit">Unit</label>
                  <select
                    name="unit"
                    value={ingredient.unit}
                    onChange={(event) => ingredientHandler(event, index)}
                  >
                    <option value="" disabled>
                      Choose a unit:
                    </option>
                    {units.map((unit) => {
                      return (
                        <option key={unit} value={unit}>
                          {unit}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            );
          })}

          <div>
            <button type="button" onClick={addField}>
              Add more
            </button>
          </div>
        </div>

        <label htmlFor="instructions">Instructions</label>
        <textarea
          name="instructions"
          cols="30"
          rows="10"
          onChange={(event) => onchangeHandler(event)}
        ></textarea>
        <button onClick={submit}>Post recipe</button>
      </form>
    </div>
  );
};

export default NewRecipe;
