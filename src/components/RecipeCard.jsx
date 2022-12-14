import React from "react";
import { Link } from "react-router-dom";


const RecipeCard = ({detail}) => {
  let flag = `https://countryflagsapi.com/svg/${detail.country}`;

  return (
    <div className="recipe">
      <span>
        <img src={flag} id="country-flag" />
      </span>

      <img src={detail.image} alt="recipe photo" />
      <div className="recipe-info">
        <p>{detail.name}</p>
        <Link to={`${detail.name}`}>
          <button>Details</button>
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
