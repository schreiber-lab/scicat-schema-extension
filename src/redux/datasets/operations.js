import * as datasetsApi from '../../api/datasets';
import { loadDatasetsError, loadDatasetsRequest, loadDatasetsSuccess } from './actions';

export const getDatasets = () => (dispatch) => {
    dispatch(loadDatasetsRequest());

    return datasetsApi.getDatasets().then((data) => {
        dispatch(loadDatasetsSuccess(data));
    }).catch(() => {
        dispatch(loadDatasetsError());
    });    
};
