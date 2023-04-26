import { isEqual } from "lodash";
import { createContext, useReducer, useEffect } from "react";
import * as keysApi from "../../../api/md-schemas";
import { usePrevious } from "../../../helpers/hooks";
import { initialState } from "./initialState";
import { reducer } from "./reducer";
import * as types from "./types";

export const KeysContext = createContext();

export const KeysProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { filter } = state;
  const prevFilter = usePrevious(filter);

  const getKeys = (filter = {}) => {
    dispatch({ type: types.LOAD_KEYS_REQUEST });

    return keysApi
      .getMDSchemaKeys({
        params: {
          fields: { ...filter, mode: {} },
        },
      })
      .then((data) => {
        dispatch({ type: types.LOAD_KEYS_SUCCESS, payload: data });
      }).catch(console.log);
  };

  const applyFilter = (payload) => {
    dispatch({ type: types.APPLY_FILTER, payload });
  };

  const resetKeys = (payload) => {
    dispatch({ type: types.RESET_KEYS, payload });

    getKeys({ ...payload });
  };

  const addKey = (payload) => {
    dispatch({ type: types.ADD_KEY, payload });
  };

  const deleteKey = (payload) => {
    dispatch({ type: types.DELETE_KEY, payload });
  };

  const editKey = (payload) => {
    dispatch({ type: types.EDIT_KEY, payload });
  };

  const providerValue = {
    ...state,

    applyFilter,
    getKeys,
    addKey,
    deleteKey,
    editKey,
  };

  useEffect(() => {
    if (!isEqual(filter, prevFilter)) {
      resetKeys(filter);
    }
  }, [filter, prevFilter]);

  return (
    <KeysContext.Provider value={providerValue}>
      {children}
    </KeysContext.Provider>
  );
};
