import React from "react";
import { Link } from "react-router-dom";
// import { pluralize } from "../../utils/helpers"
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_WEIGHT } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

function ExerciseItem(item) {
  const [state, dispatch] = useStoreContext();

  const {
    image,
    name,
    _id,
    bodypart,
    instruction,
    weight
  } = item;

  const { cart } = state

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_WEIGHT,
        _id: _id,
        purchaseWeight: parseInt(itemInCart.purchaseWeight) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseWeight: parseInt(itemInCart.purchaseWeight) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        exercise: { ...item, purchaseWeight: 1 }
      });
      idbPromise('cart', 'put', { ...item, purchaseWeight: 1 });
    }
  }

  return (
    <div className="card px-1 py-1">
      <Link to={`/exerciseinfo/${_id}`}>
        <img
          alt={name}
          src={image}
          style={{width: "200px", height: "200px"}}
        />
        <p>{name}</p>
      </Link>
      <div>
        <div>{weight}</div>
        <span>{instruction}</span>
        <span>{bodypart}</span>
      </div>
      <button onClick={addToCart}>Add Exercise</button>
    </div>
  );
}

export default ExerciseItem;
