import * as types from "./types";
import { PURGE } from "redux-persist";

export const loginSuccess = (payload) => ({
  type: types.LOGIN_SUCCESS,
  payload,
});

export const logOut = () => (dispatch) => {
  dispatch({
    type: PURGE,
    key: process.env.REACT_APP_STORE_KEY,
    result: () => null,
  });

  dispatch({
    type: types.LOGOUT,
  })
};
