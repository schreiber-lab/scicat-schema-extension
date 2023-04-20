import * as  mdSchemasApi from '../../api/md-schemas';
import { loadMDSchemasError, loadMDSchemasRequest, loadMDSchemasSuccess } from './actions';

export const getMDSchemas = (filter) => (dispatch) => {
    dispatch(loadMDSchemasRequest());

    return mdSchemasApi.getMDSchemas({
        params: filter
    }).then((data) => {
        dispatch(loadMDSchemasSuccess(data));
    }).catch(() => {
        dispatch(loadMDSchemasError());
    });    
};
