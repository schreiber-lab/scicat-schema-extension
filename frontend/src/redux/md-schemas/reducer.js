import { createReduxReducer } from "../../helpers/createReduxReducer";
import * as types from "./types";

const initialState = {
  isLoaded: false,
  mdSchemas: [],
  filter: {},
};

export const reducer = createReduxReducer(initialState, {
  [types.LOAD_MD_SCHEMAS_REQUEST]: (state) => { 
    return {
      ...state,

      isLoaded: false,
      mdSchemas: [],
    };
  },

  [types.LOAD_MD_SCHEMAS_SUCCESS]: (state, data) => {
    return {
      ...state,

      isLoaded: true,
      mdSchemas: data,
    };
  },

  [types.LOAD_MD_SCHEMAS_ERROR]: (state) => {
    return {
      ...state,

      isLoaded: false,
      mdSchemas: [],
    };
  },

  [types.DELETE_SCHEMA_KEY]: (state, { schemaName, keyName }) => { 
    console.log(schemaName, keyName)
    return {
      ...state,
 
      mdSchemas: state.mdSchemas.map((schema) => {
        return schemaName !== schema.schema_name ? schema : {
          ...schema,
          
          keys: (
            schema.keys?.filter(({ key_name }) => key_name !== keyName)
          )
        }
      }),
    };
  },

  [types.EDIT_SCHEMA_KEY]: (state, { schemaName, keyName, updatedKey }) => {
    console.log(schemaName, updatedKey)
    return {
      ...state,

      mdSchemas: state.mdSchemas.map((schema) => {
        return schemaName !== schema.schema_name ? schema : {
          ...schema,

          keys: schema.keys.map((key) => {
            console.log(key.key_name, updatedKey.key_name)
            return key.key_name === keyName ? updatedKey : key
          })
        }
      }),
    };
  },

  [types.ADD_SCHEMA_KEY]: (state, { schemaName, newKey }) => {
    return {
      ...state,

      mdSchemas: state.mdSchemas.map((schema) => {
        return schemaName !== schema.schema_name ? schema : {
          ...schema,


          keys: [ newKey, ...schema.keys ],
        }
      }),
    };
  },
});


