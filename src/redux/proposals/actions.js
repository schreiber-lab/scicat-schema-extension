import * as types from './types';

export const addProposal = (payload) => ({ type: types.ADD_PROPOSAL, payload });
export const loadProposalsRequest = () => ({ type: types.LOAD_PROPOSALS_REQUEST });
export const loadProposalsSuccess = (payload) => ({ type: types.LOAD_PROPOSALS_SUCCESS, payload });
export const loadProposalsError = () => ({ type: types.LOAD_PROPOSALS_ERROR }); 
