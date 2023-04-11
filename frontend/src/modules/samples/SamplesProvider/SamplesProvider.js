import { debounce, isEqual } from "lodash";
import { createContext, useReducer, useEffect } from "react";
import * as samplesApi from "../../../api/samples";
import { usePrevious } from "../../../helpers/hooks";
import { initialState } from "./initialState";
import { reducer } from "./reducer";
import * as types from "./types";

export const SamplesContext = createContext();

export const SamplesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { filter } = state;
  const prevFilter = usePrevious(filter);

  const getSamples = (filter = {}) => {
    dispatch({ type: types.LOAD_SAMPLES_REQUEST });

    return samplesApi
      .getSamples({
        params: {
          fields: { ...filter, mode: {} },
        },
      })
      .then((data) => {
        dispatch({ type: types.LOAD_SAMPLES_SUCCESS, payload: data });
      }).catch(console.log);
  };

  const applyFilter = (payload) => {
    dispatch({ type: types.APPLY_FILTER, payload });
  };

  const resetSamples = (payload) => {
    dispatch({ type: types.RESET_SAMPLES, payload });

    getSamples({ ...payload });
  };

  const addSample = (payload) => {
    dispatch({ type: types.ADD_SAMPLE, payload });
  };

  const deleteSample = (payload) => {
    dispatch({ type: types.DELETE_SAMPLE, payload });
  };

  const editSample = (payload) => {
    dispatch({ type: types.EDIT_SAMPLE, payload });
  };

  const providerValue = {
    ...state,

    applyFilter,
    getSamples,
    addSample,
    editSample,
    deleteSample
  };

  useEffect(() => {
    if (!isEqual(filter, prevFilter)) {
      resetSamples(filter);
    }
  }, [filter, prevFilter]);

  return (
    <SamplesContext.Provider value={providerValue}>
      {children}
    </SamplesContext.Provider>
  );
};
