import { api2 } from "../api";

export const getFixedValueEntries = (config) => {
  return api2
    .get("/addons/get_fixed_value_entries", config)
    .then(({ data }) => {
      return data;
    })
    .catch((data) => {
      throw data;
    });
};  

export const createFixedValueEntry = (data) => {
  return api2
    .post("/addons/add_fixed_value_entries", data)
    .then(({ data }) => {
      return JSON.parse(data).entries[0];
    })
    .catch((data) => {
      throw data;
    });
};
