import { api } from "../api";
import { transformMetadataSchemaRequest, transformMetadataSchemaResponse } from "../metadata-schemas";

const transformInstrumentRequest = (instrument) => {
  return {
    ...instrument,

    customMetadata: transformMetadataSchemaRequest(instrument.customMetadata)
  };
};

const transformInstrumentResponse = (instrument) => {
  return {
    ...instrument,

    customMetadata: transformMetadataSchemaResponse(
      instrument.customMetadata
    ),
  };
};

export const getInstruments = (config) => {
  return api
    .get("/Instruments", config)
    .then(({ data }) => {
      return data.map(transformInstrumentResponse);
    })
    .catch((data) => {
      throw data;
    });
};

export const getInstrument = (id, config) => {
  return api
    .get(`/Instruments/${id}`, config)
    .then(({ data }) => {
      return data;
    })
    .catch((data) => {
      throw data;
    });
};


export const createInstrument = (data) => {
  return api
    .post('/Instruments', transformInstrumentRequest(data))
    .then(({ data }) => {
      return data;
    })
    .catch((data) => {
      throw data;
    });
};

export const editInstrumentWithMetadata = (instrument, config) => {
  return api
    .put(
      `/Instruments/${instrument.pid}`,
      transformInstrumentRequest(instrument),
      config
    )
    .then(({ data }) => {
      return transformInstrumentResponse(data);
    })
    .catch((data) => {
      throw data;
    });
};
