import React, { useEffect } from "react";
import ExerciseItem from "../ExerciseItem";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_EXERCISES } from "../../utils/actions";
import { useQuery } from "@apollo/client";
import { QUERY_EXERCISES } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import spinner from "../../assets/spinner.gif";

function ExerciseList() {
  const [state, dispatch] = useStoreContext();

  const { currentBodypart } = state;

  const { loading, data } = useQuery(QUERY_EXERCISES);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_EXERCISES,
        exercises: data.exercises,
      });
      data.exercises.forEach((exercise) => {
        idbPromise("exercises", "put", exercise);
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
      (exercise) => exercise.bodypart._id === currentBodypart
    );
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {state.exercises.length ? (
        <div className="flex-row">
          {filterProducts().map((exercise) => (
            <ExerciseItem
              key={exercise._id}
              _id={exercise._id}
              image={exercise.image}
              name={exercise.name}
              price={exercise.price}
              quantity={exercise.quantity}
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

export default ExerciseList;
