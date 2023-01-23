import { createReduxReducer } from "../../helpers/createReduxReducer";
import * as types from "./types";

const initialState = {
  isLoaded: false,
  samples: [],
  filter: {},
};

export const reducer = createReduxReducer(initialState, {
  [types.ADD_SAMPLE]: (state, sample) => {
    return {
      ...state,

      samples: [sample, ...state.samples],
    };
  },

  [types.DELETE_SAMPLE]: (state, sample) => {
    return {
      ...state,

      samples: state.samples.filter(
        ({ sampleId }) => sampleId !== sample.sampleId
      ),
    };
  },

  [types.EDIT_SAMPLE]: (state, updatedSample) => {
    return {
      ...state,

      samples: state.samples.map((sample) => {
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
  },

  [types.LOAD_SAMPLES_ERROR]: (state) => {
    return {
      ...state,

      isLoaded: false,
      samples: [],
    };
  },
});
