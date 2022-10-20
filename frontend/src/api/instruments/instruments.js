import { api } from "../api";
import { transformMetadataSchemaRequest } from "../metadata-schemas";

const transformInstrumentRequest = (instrument) => {
  return {
    ...instrument,

    customMetadata: transformMetadataSchemaRequest(instrument.customMetadata)
  };
};

export const getInstruments = (config) => {
  return api
    .get("/Instruments", config)
    .then(({ data }) => {
      return data;
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

