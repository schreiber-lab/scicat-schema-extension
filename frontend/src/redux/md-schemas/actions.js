import * as types from './types';

export const loadMDSchemasRequest = () => ({ type: types.LOAD_MD_SCHEMAS_REQUEST });
export const loadMDSchemasSuccess = (payload) => ({ type: types.LOAD_MD_SCHEMAS_SUCCESS, payload });
export const loadMDSchemasError = () => ({ type: types.LOAD_MD_SCHEMAS_ERROR });
export const deleteSchemaKey = (payload) => ({ type: types.DELETE_SCHEMA_KEY, payload });
// export const editSchemaKey = (payload) => ({ type: types.EDIT_SCHEMA_KEY, payload });
