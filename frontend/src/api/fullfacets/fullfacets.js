import qs from "qs";
import { api } from "../api";

export const getFullfacets = (config = {}) => {
  return api
    .get("/datasets/fullfacet", {
      ...config,

      paramsSerializer: (params) => qs.stringify(Object.fromEntries(Object.entries(params).map(([ key, value ]) => {   
        console.log(key, value, encodeURIComponent(JSON.stringify(value))) 
        return [ key, encodeURIComponent(JSON.stringify(value)) ];
      })), {
        encode: false
      })
    })
    .then(({ data }) => {
      return data;
    })
    .catch((data) => {
      throw data;
    });
};
