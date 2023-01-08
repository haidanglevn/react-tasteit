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
    preparation_time: 0,
    cooking_time: 0,
    servings: 0,
    instructions: [],
    ingredients: [],
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

  const onchangeHandler = (event) => {
    setRecipe({ ...recipe, [event.target.name]: event.target.value });
  };

  const ingredientHandler = (event, index) => {
    let data = [...ingredientFields];
    data[index][event.target.name] = event.target.value;
    setIngredientFields(data);
    setRecipe({ ...recipe, ingredients: ingredientFields });
  };

  const instructionHandler = (event, index) => {
    let data = [...instructionFields];
    data[index] = event.target.value;
    setInstructionFields(data);
    setRecipe({ ...recipe, instructions: instructionFields });
  };

  const addIngredientField = () => {
    let object = {
      name: "",
      quantity: "",
      unit: "",
    };
    setIngredientFields([...ingredientFields, object]);
  };

  const addInstructionField = () => {
    let array = [""];
    setInstructionFields([...instructionFields, array]);
  };

  const submit = (e) => {
    e.preventDefault();
    setRecipe({ ...recipe, ingredients: ingredientFields });
    setRecipe({ ...recipe, instructions: instructionFields });
    axios
      .post("http://localhost:3001/recipes", recipe)
  };
  return (
    <div className="new-recipe">
      <h1>Add new recipe</h1>
      <form action="">
        {/* -----------NAME----------------------- */}
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          onChange={(event) => onchangeHandler(event)}
        />

        {/* -----------AUTHOR----------------------- */}
        <label htmlFor="author">Author</label>
        <input
          type="text"
          name="author"
          onChange={(event) => onchangeHandler(event)}
        />

        {/* -----------COUNTRY----------------------- */}
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

        {/* -----------DESCRIPTION----------------------- */}
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

        {/* -----------preparation_time----------------------- */}
        <label htmlFor="preparation_time">Preparation time</label>
        <input
          type="number"
          name="preparation_time"
          onChange={(event) => onchangeHandler(event)}
          placeholder={"in minutes"}
        />
        {/* -----------cooking_time----------------------- */}
        <label htmlFor="cooking_time">Cooking time</label>
        <input
          type="number"
          name="cooking_time"
          onChange={(event) => onchangeHandler(event)}
          placeholder={"in minutes"}
        />
        {/* -----------servings----------------------- */}
        <label htmlFor="servings">Servings</label>
        <input
          type="number"
          name="servings"
          onChange={(event) => onchangeHandler(event)}
        />

        {/* -----------INGREDIENTS----------------------- */}
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
                  <input
                    type="text"
                    name="unit"
                    value={ingredient.unit}
                    onChange={(event) => ingredientHandler(event, index)}
                  />
                </div>
              </div>
            );
          })}

          <div>
            <button type="button" onClick={addIngredientField}>
              Add more
            </button>
          </div>
        </div>

        {/* -----------INSTRUCTION----------------------- */}
        <label htmlFor="instructions">Instructions</label>
        {instructionFields.map((instruction, index) => {
          return (
            <div key={index}>
              <label htmlFor="step">Step: {index + 1}</label>
              <input
                type="text"
                name="step"
                value={instruction}
                onChange={(event) => instructionHandler(event, index)}
              />
            </div>
          );
        })}
        <div>
          <button type="button" onClick={addInstructionField}>
            Add more step
          </button>
        </div>
        
        <button onClick={submit}>Post recipe</button>
      </form>
    </div>
  );
};

export default NewRecipe;
