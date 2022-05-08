import React , {useMemo} from "react";
import IngredientList from "../Ingredients/IngredientList";
import { useDispatch, useSelector } from "react-redux";
import IngredientForm from "./IngredientForm";
import Search from "./Search";
import { ingredientActions } from "../../store/IngredientsSlice";
import { useCallback } from "react";
import useHttp from "../../hook/useHttp";
import { notificationActions } from "../../store/NotificationSlice";
import ErrorModal from '../UI/ErrorModal'

function Ingredients() {
  const dispatch = useDispatch();
  const ingredientsList = useSelector(
    (state) => state.ingredientSlice.ingredientsList
  );
  const error = useSelector((state) => state.notificationSlice.error)
  const resetNotifications = () => {
    dispatch(notificationActions.reset())
  }
  const { sendRequest } = useHttp();

  const addIngredient = useCallback(
    (ingredient) => {
      const addIngredientResponseHandler = (ingredient, response) => {
        dispatch(ingredientActions.add({ ...ingredient, id: response.name }));
      };

      sendRequest({
        url: "https://ingredients-manager-default-rtdb.firebaseio.com/ingredients.json",
        method: "POST",
        body: ingredient,
        headers: { "Content-Type": "application/json" },
        apply: addIngredientResponseHandler.bind(null, ingredient),
      });
    },
    [sendRequest, dispatch]
  );

  const removeIngredient = useCallback(
    (ingredientId) => {
      const removeIngredientResponseHandler = (ingredientId) => {
        dispatch(ingredientActions.remove(ingredientId));
      };

      sendRequest({
        url: `https://ingredients-manager-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`,
        method: "DELETE",
        body: null,
        headers: { "Content-Type": "application/json" },
        apply: removeIngredientResponseHandler.bind(null, ingredientId),
      });
    },
    [sendRequest, dispatch]
  );

  const ingredientListContent = useMemo(() => {
    return (
      <IngredientList
        ingredients={ingredientsList}
        onRemoveItem={removeIngredient}
      />
    );
  }, [ingredientsList, removeIngredient]);

  return (
    <div className="App">
      {error && <ErrorModal onClose={resetNotifications}>{error}</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredient} />
      <section>
        {ingredientListContent}
        <Search />
      </section>
    </div>
  );
}

export default Ingredients;
