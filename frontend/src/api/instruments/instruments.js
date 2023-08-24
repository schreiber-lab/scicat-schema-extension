import { omit } from "lodash";
import { api } from "../api";
import { transformMetadataSchemaRequest, transformMetadataSchemaResponse } from "../metadata-schemas";

const transformInstrumentRequest = (instrument) => {
  return {
    ...omit(instrument, [
      "_id",
      "id",
      "createdAt",
      "createdBy",
      "updatedAt",
      "pid"
    ]),

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
    .get("/instruments", config)
    .then(({ data }) => {
    return data.map(transformInstrumentResponse);
    })
    .catch((data) => {
      throw data;
    });
};

export const getInstrument = (id, config) => {
  return api
    .get(`/instruments/${id}`, config)
    .then(({ data }) => {
      return data;
    })
    .catch((data) => {
      throw data;
    });
};


export const createInstrument = (data) => {
  return api
    .post('/instruments', transformInstrumentRequest(data))
    .then(({ data }) => {
      return data;
    })
    .catch((data) => {
      throw data;
    });
};

/////////////////////////////////////////
export const editInstrumentWithMetadata = (instrument, config) => {
  return api
    .patch(
      `/instruments/${instrument.pid}`,
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
