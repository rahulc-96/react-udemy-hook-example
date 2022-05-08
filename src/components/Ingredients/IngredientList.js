import React from 'react';
import { useSelector } from 'react-redux';
import LoadingIndicator from '../UI/LoadingIndicator';
import './IngredientList.css';

const IngredientList = props => {
  const isLoading = useSelector((state) => state.notificationSlice.isLoading)
  console.log('RENDERING INGREDIENTS LIST');
  return (
    <section className="ingredient-list">
      <h2>Loaded Ingredients</h2> 
      {isLoading && <LoadingIndicator />}
      <ul>
        {props.ingredients.map(ig => (
          <li key={ig.id} onClick={props.onRemoveItem.bind(null, ig.id)}>
            <span>{ig.title}</span>
            <span>{ig.amount}x</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default IngredientList;
