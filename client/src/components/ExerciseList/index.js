import React, { useEffect, useState } from "react";
import ExerciseItem from "../ExerciseItem";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_EXERCISES } from "../../utils/actions";
import { useQuery } from "@apollo/client";
import { QUERY_EXERCISES } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import spinner from "../../assets/spinner.gif";


import axios from 'axios';
var FormData = require('form-data');
var data = new FormData();

var config = {
  method: 'get',
  url: 'https://wger.de/api/v2/exerciseinfo/?limit=1000',
  data : data
};

async function getExerciseData() {
  const exerciseData = await axios(config)
  return exerciseData
}


function ExerciseList() {
  const [results, setResults] = useState([]);

  const [state, dispatch] = useStoreContext();
  
  const { currentBodypart } = state;
  
  const { loading, data } = useQuery(QUERY_EXERCISES);
  
  
  useEffect(() => {
  getExerciseData()
  .then((exercises) => {
    const results = exercises.data.results.filter((item) => {
      return(
        item.videos[0] &&
        item.language.short_name === "en" &&
        item.images[0] &&
        item.description !== []
      );
    });
    console.log(results);
    setResults(results)
  })
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

  function filterExercises() {
    if (!currentBodypart) {
      return state.exercises;
    }

    return state.exercises.filter(
      (exercise) => exercise.bodypart._id === currentBodypart
    );
  }

  return (
    <div className="my-2">
      <h2>Our Exercises:</h2>
      {state.exercises ? (
        <div className="flex-row">
          {results.map((exercise) => (
            <ExerciseItem
              key={exercise.uuid}
              _id={exercise.id}
              bodypart={exercise.category.name}
              image={exercise.images[0].image}
              name={exercise.name}
              instruction={exercise.instruction}
              weight={exercise.weight}
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
