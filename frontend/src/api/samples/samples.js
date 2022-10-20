import { api } from "../api";
import { transformMetadataSchemaRequest } from "../metadata-schemas";

const transformSampleRequest = (sample) => {
  return {
    ...sample,

    sampleCharacteristics: transformMetadataSchemaRequest(sample.sampleCharacteristics)
  };
};

export const getSamples = (config) => {
  return api
    .get("/Samples", config)
    .then(({ data }) => {
      return data;
    })
    .catch((data) => {
      throw data;
    });
};

export const getSample = (id, config) => {
  return api
    .get(`/Samples/${id}`, config)
    .then(({ data }) => {
      return data;
    })
    .catch((data) => {
      throw data;
    });
};

export const createSample = (data) => {
    return api
      .post('/Samples', transformSampleRequest(data))
      .then(({ data }) => {
        return data;
      })
      .catch((data) => {
        throw data;
      });
  };

  export const deleteSample = (id, config) => {
    return api
      .delete(`/Samples/${id}`, config)
      .then(({ data }) => {
        return data;
      })
      .catch((data) => {
        throw data;
      });
  };

  export const editSample = (sample, config) => {
    return api
      .put(`/Samples/${sample.sampleId}`, transformSampleRequest(sample), config)
      .then(({ data }) => {
        return data;
      })
      .catch((data) => {
        throw data;
      });
  };