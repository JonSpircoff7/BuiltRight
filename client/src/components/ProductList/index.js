import React, { useEffect } from "react";
import ProductItem from "../ProductItem";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_EXERCISES } from "../../utils/actions";
import { useQuery } from "@apollo/client";
import { QUERY_EXERCISES } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import spinner from "../../assets/spinner.gif";

function ProductList() {
  const [state, dispatch] = useStoreContext();

  const { currentBodypart } = state;

  const { loading, data } = useQuery(QUERY_EXERCISES);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_EXERCISES,
        exercises: data.exercises,
      });
      data.exercises.forEach((product) => {
        idbPromise("exercises", "put", product);
      });
    } else if (!loading) {
      idbPromise("exercises", "get").then((exercises) => {
        dispatch({
          type: UPDATE_EXERCISES,
          exercises: exercises,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    if (!currentBodypart) {
      return state.exercises;
    }

    return state.exercises.filter(
      (product) => product.bodypart._id === currentBodypart
    );
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {state.exercises.length ? (
        <div className="flex-row">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any exercises yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
