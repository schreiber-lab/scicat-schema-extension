import * as samplesApi from '../../api/samples';
import { loadSamplesError, loadSamplesRequest, loadSamplesSuccess } from './actions';

export const getSamples = () => (dispatch) => {
    dispatch(loadSamplesRequest());
 
    return samplesApi.getSamples().then((data) => {
        dispatch(loadSamplesSuccess(data));
    }).catch(() => {
        dispatch(loadSamplesError());
    });    
};

