import { createHookReducer } from "../../../helpers/createHookReducer";
import * as types from "./types";

export const reducer = createHookReducer({
  [types.ADD_SAMPLE]: (state, sample) => {
    return {
      ...state,

      samples: [ sample, ...state.samples ]
    };
  },

  [types.APPLY_FILTER]: ({ filter, ...state }, newFilter) => {
    return {
      ...state,

      filter: { ...filter, ...newFilter }
    };
  },

  [types.EDIT_SAMPLE]: (state, updatedSample) => {
    console.log(state)
    return {
      ...state,

      samples: state.samples.map((sample) => {
        console.log(updatedSample, sample)
        return sample.sampleId === updatedSample.sampleId ? updatedSample : sample;
      })
    };
  },
  

  [types.LOAD_SAMPLES_REQUEST]: (state) => {
    return {
      ...state,

      isLoaded: false,
      samples: [],
    };
  },

  [types.LOAD_SAMPLES_SUCCESS]: (state, data) => {
    return {
      ...state,

      isLoaded: true,
      samples: data,
    };
  }
});
