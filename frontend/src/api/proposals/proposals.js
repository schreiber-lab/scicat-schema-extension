import { api } from "../api";

export const getProposals = (config) => {
  return api
    .get("/proposals", config)
    .then(({ data }) => {
      return data;
    })
    .catch((data) => {
      throw data;
    });
};

export const getProposal = (id, config) => {
  return api
    .get(`/proposals/${id}`, config)
    .then(({ data }) => {
      return data;
    })
    .catch((data) => {
      throw data;
    });
};


export const createProposal = (data) => {
  return api
    .post('/proposals', data)
    .then(({ data }) => {
      return data;
    })
    .catch((data) => {
      throw data;
    });
};

