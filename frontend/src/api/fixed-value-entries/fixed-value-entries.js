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

export const deleteFixedValueEntry = (config) => {
  console.log(config)
  return api2
    .delete(`/addons/fixed_value_entry`, config)
    .then(({ data }) => {
      return data;
    })
    .catch((data) => {
      throw data;
    });
};

export const editFixedValueEntry = (data, config) => {
  return api2
    .patch(`/addons/fixed_value_entry`, data, config)
    .then(({ data }) => {
      return data;
    })
    .catch((data) => {
      throw data;
    });
};
