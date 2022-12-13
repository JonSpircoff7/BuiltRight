import React from "react";
import ProductList from "../components/ProductList";
import BodypartMenu from "../components/BodypartMenu";
import Cart from "../components/Cart";

const Home = () => {
  return (
    <div className="container">
      <BodypartMenu />
      <ProductList />
      <Cart />
    </div>
  );
};

export default Home;
