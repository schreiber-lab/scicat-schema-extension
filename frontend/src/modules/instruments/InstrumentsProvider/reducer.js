import { createHookReducer } from "../../../helpers/createHookReducer";
import * as types from "./types";

export const reducer = createHookReducer({
  [types.ADD_INSTRUMENT]: (state, instrument) => {
    return {
      ...state,

      instruments: [ instrument, ...state.instruments ]
    };
  },

  [types.APPLY_FILTER]: ({ filter, ...state }, newFilter) => {
    return {
      ...state,

      filter: { ...filter, ...newFilter }
    };
  },

  [types.DELETE_INSTRUMENT]: (state, instrument) => {
    return {
      ...state,

      instruments: state.instruments.filter(
        ({ pid }) => pid !== instrument.pid
      ),
    };
  },


  [types.EDIT_INSTRUMENT]: (state, updatedInstrument) => {
    console.log(state)
    return {
      ...state,

      instruments: state.instruments.map((instrument) => {
        console.log(updatedInstrument, instrument)
        return instrument.pid === updatedInstrument.pid ? updatedInstrument : instrument;
      })
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
  }
});
