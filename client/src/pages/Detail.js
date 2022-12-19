import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Cart from "../components/Cart";

import axios from "axios";

function Detail() {
  const pathname = window.location.pathname;
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://wger.de/api/v2${pathname}`)
      .then((response) => {
        setResults(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  let regex = /(<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>)|(\\+n)|(\\)|(["])/g;

  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }

  if (!results) {
    return null;
  }

  return (
    <>
      <div className="container my-1">
        <Link to="/">← Back to Exercises</Link>

        <h2>{results.name}</h2>

        <p>Target Muscle: {results.category.name}</p>

        <p>
          <strong>Instruction:</strong>
          {JSON.stringify(results.description).replace(regex, " ")}{" "}
          <button>Add workout</button>
          <button>Remove workout</button>
        </p>

        <video
          controls
          loop
          muted
          autoplay
          style={{ maxInlineSize: "-webkit-fill-available" }}
        >
          <source src={results.videos[0].video} type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>
      <Cart />
    </>
  );
}

export default Detail;
