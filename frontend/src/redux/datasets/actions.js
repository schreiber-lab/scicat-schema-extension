import * as types from "./types";

export const addDataset = (payload) => ({ type: types.ADD_DATASET, payload });
export const editDataset = (payload) => ({ type: types.EDIT_DATASET, payload });
export const loadDatasetsRequest = () => ({
  type: types.LOAD_DATASETS_REQUEST,
});
export const loadDatasetsSuccess = (payload) => ({
  type: types.LOAD_DATASETS_SUCCESS,
  payload,
});
export const loadDatasetsError = () => ({ type: types.LOAD_DATASETS_ERROR });
