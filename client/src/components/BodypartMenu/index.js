import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useStoreContext } from "../../utils/GlobalState";
import {
  UPDATE_BODYPARTS,
  UPDATE_CURRENT_BODYPARTS,
} from "../../utils/actions";
import { QUERY_BODYPARTS } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";

function BodypartMenu() {
  const [state, dispatch] = useStoreContext();

  const { bodyparts } = state;

  const { loading, data: bodypartData } = useQuery(QUERY_BODYPARTS);

  useEffect(() => {
    if (bodypartData) {
      dispatch({
        type: UPDATE_BODYPARTS,
        bodyparts: bodypartData.bodyparts,
      });
      bodypartData.bodyparts.forEach((bodypart) => {
        idbPromise("bodyparts", "put", bodypart);
      });
    } else if (!loading) {
      idbPromise("bodyparts", "get").then((bodyparts) => {
        dispatch({
          type: UPDATE_BODYPARTS,
          bodyparts: bodyparts,
        });
      });
    }
  }, [bodypartData, loading, dispatch]);

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_BODYPARTS,
      currentBodypart: id,
    });
  };

  return (
    <div class="categories">
      {bodyparts.map((item) => (
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

export default BodypartMenu;
