import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import {
  UPDATE_EXERCISES,
  UPDATE_CURRENT_EXERCISES,
} from '../../utils/actions';
import { QUERY_EXERCISES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';

function ExerciseMenu() {
  const [state, dispatch] = useStoreContext();

  const { exercises } = state;

  const { loading, data: exerciseData } = useQuery(QUERY_EXERCISES);

  useEffect(() => {
    if (exerciseData) {
      dispatch({
        type: UPDATE_EXERCISES,
        exercises: exerciseData.exercises,
      });
      exerciseData.exercises.forEach((exercise) => {
        idbPromise('exercises', 'put', exercise);
      });
    } else if (!loading) {
      idbPromise('exercises', 'get').then((exercises) => {
        dispatch({
          type: UPDATE_EXERCISES,
          exercises: exercises,
        });
      });
    }
  }, [exerciseData, loading, dispatch]);

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_EXERCISES,
      currentExercise: id,
    });
  };

  return (
    <div>
      <h2>Choose a Exercise:</h2>
      {exercises.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default ExerciseMenu;
