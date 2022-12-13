import React from "react";
import ProductList from "../components/ProductList";
import ExerciseMenu from "../components/ExerciseMenu";
import Cart from "../components/Cart";

const Home = () => {
  return (
    <div className="container">
      <ExerciseMenu />
      <ProductList />
      <Cart />
    </div>
  );
};

export default Home;
