import { render, screen } from "@testing-library/react";
import RecipeCard from "../RecipeCard";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

test("should render recipe card component with name, image and button", () => {
  const detail = {
    name: "Food",
    image: "https://fakefood.com",
    country: "somewhere",
  };
  const flag = `https://countryflagsapi.com/svg/${detail.country}`;
  render(<RecipeCard detail={detail} />, { wrapper: MemoryRouter });
  const component = screen.getByTestId("Food");
  expect(component).toBeInTheDocument();
});

test("image HTML tag should have the right source", () => {
  const detail = {
    name: "Food",
    image: "https://fakefood.com",
    country: "somewhere",
  };
  render(<RecipeCard detail={detail} />, { wrapper: MemoryRouter });
  // image should have the right source
  const image = screen.getByAltText("recipe photo");
  expect(image).toHaveAttribute("src", detail.image);
});

test("recipe should have the recipe-info div ", () => {
  const detail = {
    name: "Food",
    image: "https://fakefood.com",
    country: "somewhere",
  };
  render(<RecipeCard detail={detail} />, { wrapper: MemoryRouter });
  const component = screen.getByTestId("Food");
  const recipeInfoDiv = screen.getByTestId('recipe-info');
  const button = screen.getByTestId('button')
  expect(component.contains(recipeInfoDiv)).toEqual(true);
  expect(component.contains(button)).toEqual(true);
});
