import { createReduxReducer } from "../../helpers/createReduxReducer";
import * as types from "./types";

const initialState = {
  isLoaded: false,
  proposals: [],
  filter: {},
};

export const reducer = createReduxReducer(initialState, {
  [types.ADD_PROPOSAL]: (state, proposal) => {
    return {
      ...state,

      proposals: [proposal, ...state.proposals],
    };
  },
  [types.LOAD_PROPOSALS_REQUEST]: (state) => { 
    return {
      ...state,

      isLoaded: false,
      instruments: [],
    };
  },

  [types.LOAD_PROPOSALS_SUCCESS]: (state, data) => {
    return {
      ...state,

      isLoaded: true,
      proposals: data,
    };
  },

  [types.LOAD_PROPOSALS_ERROR]: (state) => {
    return {
      ...state,

      isLoaded: false,
      proposals: [],
    };
  },
});
