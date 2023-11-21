import { createReduxReducer } from "../../helpers/createReduxReducer";
import * as types from "./types";

const initialState = {
  isLoaded: false,
  fixedValueEntries: [],
  mdSchemas: [],
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

  // [types.EDIT_FIXED_VALUE_ENTRY]: (state, { updatedEntry, updatedEntryIndex })  => {
  //   return {
  //     ...state,

  //     fixedValueEntries: state.fixedValueEntries.map((fixedValueEntry, index) => {
  //       return index === updatedEntryIndex ? updatedEntry : fixedValueEntry;
  //     })
  //   };
  // },

  [types.EDIT_FIXED_VALUE_ENTRY]: (state, { schemaName, updatedEntry }) => {
    console.log(schemaName, updatedEntry)
    return {
      ...state,

      mdSchemas: state.mdSchemas.map((schema) => {
        return schemaName !== schema.schema_name ? schema : {
          ...schema,

          entries: schema.entries.map((entry) => {
            console.log(entry.entry_id, updatedEntry.entry_id)
            return entry.entry_id === updatedEntry.entry_id ? updatedEntry : entry
          })
        }
      }),
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

