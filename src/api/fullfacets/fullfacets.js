import { api } from "../api";

export const getFullfacets = (config) => {
  return api
    .get("/datasets/fullfacet", config)
    .then(({ data }) => {
      return data;
    })
    .catch((data) => {
      throw data;
    });
};
