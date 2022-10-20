import * as instrumentsApi from '../../api/instruments';
import { loadInstrumentsError, loadInstrumentsRequest, loadInstrumentsSuccess } from './actions';

export const getInstruments = () => (dispatch) => {
    dispatch(loadInstrumentsRequest());

    return instrumentsApi.getInstruments().then((data) => {
        dispatch(loadInstrumentsSuccess(data));
    }).catch(() => {
        dispatch(loadInstrumentsError());
    });    
};
