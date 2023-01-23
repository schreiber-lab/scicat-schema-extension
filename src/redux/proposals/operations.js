import * as proposalsApi from '../../api/proposals';
import { loadProposalsError, loadProposalsRequest, loadProposalsSuccess } from './actions';

export const getProposals = () => (dispatch) => {
    dispatch(loadProposalsRequest());

    return proposalsApi.getProposals().then((data) => {
        dispatch(loadProposalsSuccess(data));
    }).catch(() => {
        dispatch(loadProposalsError());
    });    
};
