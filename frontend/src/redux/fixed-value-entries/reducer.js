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

  [types.DELETE_FIXED_VALUE_ENTRY]: (state, { schemaName, fixedValueEntry }) => { 
    return {
      ...state,
 
      mdSchemas: state.mdSchemas.map((schema) => {
        return schemaName !== schema.schema_name ? schema : {
          ...schema,
          
          fixedValueEntries: (
            schema.fixedValueEntries?.filter(({ full_name }) => full_name !== fixedValueEntry)
          )
        }
      }),
    };
  },

  [types.EDIT_FIXED_VALUE_ENTRY]: (state, updatedEntry)  => {
    return {
      ...state,

      fixedValueEntries: state.fixedValueEntries.map((fixedValueEntry) => {
        return fixedValueEntry.material_id === updatedEntry.material_id ? updatedEntry : fixedValueEntry;
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

