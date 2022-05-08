import React, { useState } from "react";

import Card from "../UI/Card";
import "./IngredientForm.css";

const IngredientForm = React.memo((props) => {
  console.log('RENDERING INGREDIENTS FORM');
  const submitHandler = (event) => {
    event.preventDefault();
    props.onAddIngredient({title, amount})
  };

  const titleChangeHandler = (event) => {
    event.preventDefault()
    setTitle(event.target.value);
  };

  const amountChangeHandler = (event) => {
    event.preventDefault()
    setAmount(event.target.value);
  };

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={titleChangeHandler}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={amountChangeHandler}
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
