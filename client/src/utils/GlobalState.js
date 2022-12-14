import React, { createContext, useContext } from "react";
import { useExerciseReducer } from "./reducers";

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useExerciseReducer({
    exercises: [],
    cart: [],
    cartOpen: false,
    bodyparts: [],
    currentBodypart: "",
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
