import React, { useState } from "react";
import IngredientList from "../Ingredients/IngredientList";

import IngredientForm from "./IngredientForm";
import Search from "./Search";

function Ingredients() {
  const [ingredientsList, setIngredientsList] = useState([]);

  const addIngredient = (ingredient) => {
    setIngredientsList((prevIngredientsList) => [
      ...prevIngredientsList,
      { ...ingredient, id: Math.random().toString() },
    ]);
  };

  const removeIngredient = (ingredientId) => {
    setIngredientsList((prevIngredientsList) => {
      let filteredIngredientsList = prevIngredientsList.filter(
        (ingredient) => ingredient.id !== ingredientId
      );
      setIngredientsList(filteredIngredientsList);
    });
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredient} />
      <section>
        <IngredientList ingredients={ingredientsList} onRemoveItem={removeIngredient} />
        <Search />
      </section>
    </div>
  );
}

export default Ingredients;
