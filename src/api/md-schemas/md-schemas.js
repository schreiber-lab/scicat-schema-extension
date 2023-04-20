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

export const editKey = (key, config) => {
  return api2
    .put(`/addons/metadata_schemas/${key.key_name}`, key, config)
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
