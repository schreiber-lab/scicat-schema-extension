import { createReduxReducer } from "../../helpers/createReduxReducer";
import * as types from "./types";

const initialState = {
  isAuthenticated: false,
  authToken: "",
};

export const reducer = createReduxReducer(initialState, {
  [types.LOGIN_REQUEST]: (state) => {
    return {
      ...state,

      isLoading: true,
      isAuthenticated: false,
    };
  },

  [types.LOGOUT]: () => {
    return initialState;
  },

  [types.LOGIN_SUCCESS]: (state, { id }) => {
    return {
      ...state,

      isLoading: false,
      isAuthenticated: true,
      authToken: id,
    };
  },
});
