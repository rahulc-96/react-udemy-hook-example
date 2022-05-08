import React, { useState } from "react";

import Card from "../UI/Card";
import "./Search.css";
import { useDispatch, useSelector } from "react-redux";
import { notificationActions } from "../../store/NotificationSlice";
import { useEffect, useRef, useCallback } from "react";
import { ingredientActions } from "../../store/IngredientsSlice";
import useHttp from "../../hook/useHttp";
import ErrorModal from "../UI/ErrorModal";

const Search = React.memo((props) => {
  console.log('RENDERING INGREDIENTS SEARCH');
  const inputRef = useRef();
  const { sendRequest } = useHttp();
  const error = useSelector((state) => state.notificationSlice.error);
  const resetNotifications = () => {
    dispatch(notificationActions.reset());
  };
  const [enteredFilter, setFilter] = useState("");
  const dispatch = useDispatch();
  const onChangeHandler = (event) => {
    event.preventDefault();
    setFilter(event.target.value);
  };
  const filterResponseHandler = useCallback(
    (response) => {
      let ingredientsList = [];
      for (const key in response) {
        ingredientsList.push({
          id: key,
          title: response[key].title,
          amount: response[key].amount,
        });
      }
      dispatch(ingredientActions.replace(ingredientsList));
    },
    [dispatch]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
        const query =
          enteredFilter.length === 0
            ? ""
            : `?orderBy="title"&equalTo="${enteredFilter}"`;
        sendRequest({
          url:
            "https://ingredients-manager-default-rtdb.firebaseio.com/ingredients.json" +
            query,
          headers: { "Content-Type": "application/json" },
          apply: filterResponseHandler,
        });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [inputRef, sendRequest, filterResponseHandler, enteredFilter]);
  return (
    <section className="search">
      {error && <ErrorModal onClose={resetNotifications}>{error}</ErrorModal>}

      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            type="text"
            ref={inputRef}
            value={enteredFilter}
            onChange={onChangeHandler}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
