import { createReduxReducer } from "../../helpers/createReduxReducer";
import * as types from "./types";

const initialState = {
  isLoaded: false,
  mdSchemas: [],
  filter: {},
};

export const reducer = createReduxReducer(initialState, {

  [types.LOAD_MD_SCHEMAS_REQUEST]: (state) => { 
    return {
      ...state,

      isLoaded: false,
      mdSchemas: [],
    };
  },

  [types.LOAD_MD_SCHEMAS_SUCCESS]: (state, data) => {
    return {
      ...state,

      isLoaded: true,
      mdSchemas: data,
    };
  },

  [types.LOAD_MD_SCHEMAS_ERROR]: (state) => {
    return {
      ...state,

      isLoaded: false,
      mdSchemas: [],
    };
  },
});

