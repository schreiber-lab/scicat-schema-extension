import * as types from './types';

export const addInstrument = (payload) => ({ type: types.ADD_INSTRUMENT, payload });
export const loadInstrumentsRequest = () => ({ type: types.LOAD_INSTRUMENTS_REQUEST });
export const loadInstrumentsSuccess = (payload) => ({ type: types.LOAD_INSTRUMENTS_SUCCESS, payload });
export const loadInstrumentsError = () => ({ type: types.LOAD_INSTRUMENTS_ERROR }); 
