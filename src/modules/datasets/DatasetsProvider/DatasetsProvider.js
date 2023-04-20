import { debounce, isEqual } from "lodash";
import { createContext, useReducer, useEffect } from "react";
import * as datasetsApi from "../../../api/datasets";
import * as fullfacetsApi from "../../../api/fullfacets";
import { usePrevious } from "../../../helpers/hooks";
import { initialState } from "./initialState";
import { reducer } from "./reducer";
import * as types from "./types";

export const DatasetsContext = createContext();

export const DatasetsProvider = ({ children }) => {
  const [ state, dispatch ] = useReducer(reducer, initialState);
  const { filter } = state;
  const prevFilter = usePrevious(filter);

  const updatePagination = (payload) => {
    dispatch({ type: types.UPDATE_PAGINATION, payload });
  };

  const getDatasets = debounce(({ limits = {}, ...filter } = {}) => {
    dispatch({ type: types.LOAD_DATASETS_REQUEST });
   
    return fullfacetsApi.getFullfacets().then((data) => {
      updatePagination({ total: data[0].all[0]?.totalSets ?? 0 });

      return datasetsApi.getDatasets({
        params: {
          fields: { ...filter, mode: {} },
          limits: {
            skip: state.pagination.skip,
            limit: state.pagination.limit,
            order: "creationTime:desc",

            ...limits
          }
        }
      }).then((data) => {
        dispatch({ type: types.LOAD_DATASETS_SUCCESS, payload: data });
      });
    });
  }, 1200);

  const handlePaginationChange = (pagination) => {
    const { total, ...limits } = pagination;

    updatePagination(pagination);

    getDatasets({ limits });
  };

  const applyFilter = (payload) => {
    dispatch({ type: types.APPLY_FILTER, payload });
  };

  const resetDatasets = (payload) => {
    dispatch({ type: types.RESET_DATASETS, payload });

    getDatasets({ ...payload, limits: initialState.pagination });
  };

  const addDataset = (payload) => {
    dispatch({ type: types.ADD_DATASET, payload });
  };

  const editDataset = (payload) => {
    dispatch({ type: types.EDIT_DATASET, payload });
  };

  const providerValue = {
    ...state,

    applyFilter,
    getDatasets,
    addDataset,
    editDataset,
    handlePaginationChange,
  };

  useEffect(() => {
   if (!isEqual(filter, prevFilter)) {
    resetDatasets(filter);
   }
  }, [ filter, prevFilter ]);


  return (
    <DatasetsContext.Provider value={providerValue}>
      {children}
    </DatasetsContext.Provider>
  );
};
