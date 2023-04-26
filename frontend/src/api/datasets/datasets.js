import { api } from "../api";
import {
  transformMetadataSchemaRequest,
  transformMetadataSchemaResponse,
} from "../metadata-schemas";

const transformDatasetRequest = (dataset) => {
  console.log(dataset.scientificMetadata);
  return {
    ...dataset,

    scientificMetadata: transformMetadataSchemaRequest(
      dataset.scientificMetadata
    ),
  };
};

const transformDatasetResponse = (dataset) => {
  return {
    ...dataset,

    scientificMetadata: transformMetadataSchemaResponse(
      dataset.scientificMetadata
    ),
  };
};

const injectDatasetPid = ({ pid, ...dataset }) => {
  if (!dataset.proposalId) {
    return dataset;
  }

  return {
    ...dataset,

    pid: dataset.proposalId + "/" + dataset.datasetName,
  };
};

export const getDatasets = (config) => {
  return api
    .get("/datasets/fullquery", config)
    .then(({ data }) => {
      return data.map(transformDatasetResponse);
    })
    .catch((data) => {
      throw data;
    });
};

export const getDataset = (id, config = {}) => {
  return api
    .get("/datasets/findOne", {
      ...config,

      headers: {
        filter: JSON.stringify({
          where: { pid: id },
          include: [
            { relation: "origdatablocks" },
            { relation: "datablocks" },
            { relation: "attachments" },
          ],
        }),
        ...config.headers,
      },
    })
    .then(({ data }) => {
      return data;
    })
    .catch((data) => {
      throw data;
    });
};

export const createDataset = (data) => {
  return api
    .post("/datasets", injectDatasetPid(transformDatasetRequest(data)))
    .then(({ data }) => {
      return data;
    })
    .catch((data) => {
      throw data;
    });
};

export const validateDataset = (data) => {
  return api
    .post("/datasets/isValid", injectDatasetPid(transformDatasetRequest(data)))
    .then(({ data }) => {
      return data;
    })
    .catch((data) => {
      throw data;
    });
};

/////////////////////////////////////////
export const editDataset = ({ pid, ...dataset }, config) => {
  console.log(dataset);
  return api
    .patch(
      `/datasets/${encodeURIComponent(pid)}`,
      transformDatasetRequest(dataset),
      config
    )
    .then(({ data }) => {
      return transformDatasetResponse(data);
    })
    .catch((data) => {
      throw data;
    });
};
