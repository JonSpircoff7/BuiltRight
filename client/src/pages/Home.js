import React from "react";
import ExerciseList from "../components/ExerciseList";
import BodypartMenu from "../components/BodypartMenu";
import Cart from "../components/Cart";

const Home = () => {
  return (
    <div className="container">
      <BodypartMenu />
      <ExerciseList />
      <Cart />
    </div>
  );
};

export default Home;
