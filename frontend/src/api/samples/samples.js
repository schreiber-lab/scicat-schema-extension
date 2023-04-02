import { api } from "../api";
import { transformMetadataSchemaRequest, transformMetadataSchemaResponse } from "../metadata-schemas";

const transformSampleRequest = (sample) => {
  return {
    ...sample,

    sampleCharacteristics: transformMetadataSchemaRequest(sample.sampleCharacteristics)
  };
};

const transformSampleResponse = (sample) => {
  return {
    ...sample,

    sampleCharacteristics: transformMetadataSchemaResponse(
      sample.sampleCharacteristics
    ),
  };
};

export const getSamples = (config) => {
  return api
    .get("/samples/fullquery", config)
    .then(({ data }) => {
      return data.map(transformSampleResponse);
    })
    .catch((data) => {
      throw data;
    });
};

export const getSample = (id, config) => {
  return api
    .get(`/samples/${id}`, config)
    .then(({ data }) => {
      return data;
    })
    .catch((data) => {
      throw data;
    });
};

export const createSample = (data) => {
    return api
      .post('/samples', transformSampleRequest(data))
      .then(({ data }) => {
        return data;
      })
      .catch((data) => {
        throw data;
      });
  };

  export const deleteSample = (id, config) => {
    return api
      .delete(`/samples/${id}`, config)
      .then(({ data }) => {
        return data;
      })
      .catch((data) => {
        throw data;
      });
  };

////////////////////////////////////////
  export const editSample = (sample, config) => {
    return api
      .patch(`/samples/${sample.sampleId}`, transformSampleRequest(sample), config)
      .then(({ data }) => {
        return data;
      })
      .catch((data) => {
        throw data;
      });
  };

/////////////////////////////
  export const editSampleWithMetadata = (sample, config) => {
    return api
      .patch(
        `/samples/${sample.sampleId}`,
        transformSampleRequest(sample),
        config
      )
      .then(({ data }) => {
        return transformSampleResponse(data);
      })
      .catch((data) => {
        throw data;
      });
  };
  