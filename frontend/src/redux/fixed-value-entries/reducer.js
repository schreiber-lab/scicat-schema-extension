import { createReduxReducer } from "../../helpers/createReduxReducer";
import * as types from "./types";

const initialState = {
  isLoaded: false,
  fixedValueEntries: [],
  filter: {},
};

export const reducer = createReduxReducer(initialState, {
  [types.ADD_FIXED_VALUE_ENTRY]: (state, fixedValueEntry) => {
    return {
      ...state,

      fixedValueEntries: [ fixedValueEntry, ...state.fixedValueEntries ],
    };
  },

  [types.DELETE_FIXED_VALUE_ENTRY]: (state, { schema, entryId }) => { 
    return {
      ...state,
          
      fixedValueEntries: (
        state.fixedValueEntries?.filter((entry) => entry[schema.id_key] !== entryId)
      )
    };
  },

  [types.EDIT_FIXED_VALUE_ENTRY]: (state, { schema, updatedEntry }) => {
    return {
      ...state,

      fixedValueEntries: state.fixedValueEntries.map((entry) => {
        return entry[schema.id_key] === updatedEntry.entry_id
          ? updatedEntry.new_entry_details
          : entry;
      })
    };
  },

  [types.LOAD_FIXED_VALUE_ENTRIES_REQUEST]: (state) => { 
    return {
      ...state,

      isLoaded: false,
      fixedValueEntries: [],
    };
  },

  [types.LOAD_FIXED_VALUE_ENTRIES_SUCCESS]: (state, { entries }) => {
    return {
      ...state,

      isLoaded: true,
      fixedValueEntries: entries,
    };
  },

  [types.LOAD_FIXED_VALUE_ENTRIES_ERROR]: (state) => {
    return {
      ...state,

      isLoaded: true,
      fixedValueEntries: [],
    };
  },
});

