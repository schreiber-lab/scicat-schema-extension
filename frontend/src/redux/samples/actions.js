import * as types from './types';

export const addSample = (payload) => ({ type: types.ADD_SAMPLE, payload });
export const deleteSample = (payload) => ({ type: types.DELETE_SAMPLE, payload });
export const editSample = (payload) => ({ type: types.EDIT_SAMPLE, payload });
export const loadSamplesRequest = () => ({ type: types.LOAD_SAMPLES_REQUEST });
export const loadSamplesSuccess = (payload) => ({ type: types.LOAD_SAMPLES_SUCCESS, payload });
export const loadSamplesError = () => ({ type: types.LOAD_SAMPLES_ERROR }); 
