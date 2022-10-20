import { api2 } from "../api";

export const getMDSchemas = (config) => {
  return api2
    .get("/addons/metadata_schemas", config)
    .then(({ data }) => {
      return data;
    })
    .catch((data) => {
      throw data;
    });
};  

export const getMDSchemaKeys = (config) => {
  return api2
    .get("/addons/metadata_schemas", config)
    .then(({ data }) => {
      return data;
    })
    .catch((data) => {
      throw data;
    });
};  

export const createMDSchema = (data) => {
  return api2
    .post("/addons/metadata_schemas", data)
    .then(({ data }) => {
      return data;
    })
    .catch((data) => {
      throw data;
    });
};
