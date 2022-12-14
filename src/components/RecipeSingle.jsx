import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./RecipeSingle.css";

const RecipeSingle = () => {
  const params = useParams();
  const [recipe, setRecipe] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/recipes").then((res) => {
      setRecipe(res.data.filter((a) => a.name == params.recipesingle));
    });
  }, []);
  console.log(recipe);

  return (
    <div className="recipe-single">
      {recipe.map((a) => {
        let flag = `https://countryflagsapi.com/svg/${a.country}`;
        return (
          <div>
            <div
              key={a.id}
              style={{ backgroundImage: `url(${a.image})` }}
              className={"hero"}
            >
              <div className="intro">
                <h1>
                  <span>
                    <img src={flag} alt="flag" id="country-flag" />
                  </span>{" "}
                  {a.name}{" "}
                  <span>
                    <img src={flag} alt="flag" id="country-flag" />
                  </span>
                </h1>
                <h2>{a.description}</h2>
              </div>
            </div>
            <div className="info">
              <p>
                <span>Preparation</span> <br /> {a.preparation_time} mins
              </p>
              <p>
                <span>Cooking</span> <br /> {a.cooking_time} mins
              </p>
              <p>
                <span>Servings</span> <br /> {a.servings}
              </p>
            </div>
            <div className="details">
              <div className="ingredient-list">
                <h2>Ingredients</h2>
                <ul>
                  {a.ingredients.map((ingredient) => {
                    return (
                      <li>
                        {" "}
                        <span>{ingredient.name}</span>: {ingredient.quantity}{" "}
                        {ingredient.unit}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="instruction">
                <h2>Instruction</h2>
                <ul>
                  {a.instructions.map((instruction) => {
                    return <li>{instruction}</li>;
                  })}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
      <div className="button">
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    </div>
  );
};

export default RecipeSingle;
