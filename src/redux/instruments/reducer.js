import { createReduxReducer } from "../../helpers/createReduxReducer";
import * as types from "./types";

const initialState = {
  isLoaded: false,
  instruments: [],
  filter: {},
};

export const reducer = createReduxReducer(initialState, {
  [types.ADD_INSTRUMENT]: (state, instrument) => {
    return {
      ...state,

      instruments: [instrument, ...state.instruments],
    };
  },
  [types.LOAD_INSTRUMENTS_REQUEST]: (state) => { 
    return {
      ...state,

      isLoaded: false,
      instruments: [],
    };
  },

  [types.LOAD_INSTRUMENTS_SUCCESS]: (state, data) => {
    return {
      ...state,

      isLoaded: true,
      instruments: data,
    };
  },

  [types.LOAD_INSTRUMENTS_ERROR]: (state) => {
    return {
      ...state,

      isLoaded: false,
      instruments: [],
    };
  },
});
