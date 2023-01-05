import { debounce, isEqual } from "lodash";
import { createContext, useReducer, useEffect } from "react";
import * as instrumentsApi from "../../../api/instruments";
import { usePrevious } from "../../../helpers/hooks";
import { initialState } from "./initialState";
import { reducer } from "./reducer";
import * as types from "./types";

export const InstrumentsContext = createContext();

export const InstrumentsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { filter } = state;
  const prevFilter = usePrevious(filter);

  const getInstruments = (filter = {}) => {
    dispatch({ type: types.LOAD_INSTRUMENTS_REQUEST });

    return instrumentsApi
      .getInstruments({
        params: {
          fields: { ...filter, mode: {} },
        },
      })
      .then((data) => {
        dispatch({ type: types.LOAD_INSTRUMENTS_SUCCESS, payload: data });
      }).catch(console.log);
  };

  const applyFilter = (payload) => {
    dispatch({ type: types.APPLY_FILTER, payload });
  };

  const resetInstruments = (payload) => {
    dispatch({ type: types.RESET_INSTRUMENTS, payload });

    getInstruments({ ...payload });
  };

  const addInstrument = (payload) => {
    dispatch({ type: types.ADD_INSTRUMENT, payload });
  };

  const editInstrument = (payload) => {
    dispatch({ type: types.EDIT_INSTRUMENT, payload });
  };

  const providerValue = {
    ...state,

    applyFilter,
    getInstruments,
    addInstrument,
    editInstrument,
  };

  useEffect(() => {
    if (!isEqual(filter, prevFilter)) {
      resetInstruments(filter);
    }
  }, [filter, prevFilter]);

  return (
    <InstrumentsContext.Provider value={providerValue}>
      {children}
    </InstrumentsContext.Provider>
  );
};
