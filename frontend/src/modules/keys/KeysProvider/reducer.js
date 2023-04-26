import { createHookReducer } from "../../../helpers/createHookReducer";
import * as types from "./types";

export const reducer = createHookReducer({
  [types.ADD_KEY]: (state, key) => {
    return {
      ...state,

      keys: [ key, ...state.keys ]
    };
  },

  [types.APPLY_FILTER]: ({ filter, ...state }, newFilter) => {
    return {
      ...state,

      filter: { ...filter, ...newFilter }
    };
  },

  [types.DELETE_KEY]: (state, key) => {
    return {
      ...state,

      keys: state.keys.filter(
        ({ key_name }) => key_name !== key.key_name
      ),
    };
  },

  [types.EDIT_KEY]: (state, updatedKey) => {
    console.log(state)
    return {
      ...state,

      keys: state.keys.map((key) => {
        console.log(updatedKey, key)
        return key.key_name === updatedKey.key_name ? updatedKey : key;
      })
    };
  },
  

  [types.LOAD_KEYS_REQUEST]: (state) => {
    return {
      ...state,

      isLoaded: false,
      keys: [],
    };
  },

  [types.LOAD_KEYS_SUCCESS]: (state, data) => {
    return {
      ...state,

      isLoaded: true,
      keys: data,
    };
  }
});
