import * as  fixedValueEntriesApi from '../../api/fixed-value-entries';
import { loadFixedValueEntriesError, loadFixedValueEntriesRequest, loadFixedValueEntriesSuccess } from './actions';

export const getFixedValueEntries = (filter) => (dispatch) => {
    dispatch(loadFixedValueEntriesRequest());

    return fixedValueEntriesApi.getFixedValueEntries({
        params: filter
    }).then((data) => {
        dispatch(loadFixedValueEntriesSuccess(data));
    }).catch(() => {
        dispatch(loadFixedValueEntriesError());
    });    
};
