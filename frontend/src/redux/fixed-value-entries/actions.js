import * as types from './types';

export const addFixedValueEntry = (payload) => ({ type: types.ADD_FIXED_VALUE_ENTRY, payload });
export const loadFixedValueEntriesRequest = () => ({ type: types.LOAD_FIXED_VALUE_ENTRIES_REQUEST });
export const loadFixedValueEntriesSuccess = (payload) => ({ type: types.LOAD_FIXED_VALUE_ENTRIES_SUCCESS, payload });
export const loadFixedValueEntriesError = () => ({ type: types.LOAD_FIXED_VALUE_ENTRIES_ERROR }); 
export const deleteFixedValueEntry = (payload) => ({ type: types.DELETE_FIXED_VALUE_ENTRY, payload });
export const editFixedValueEntry = (payload) => ({ type: types.EDIT_FIXED_VALUE_ENTRY, payload });
