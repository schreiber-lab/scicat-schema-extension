import { isNil } from "lodash";
import { removeEmpty } from "../../helpers/removeEmpty";
import { api2 } from "../api";

export const transformMetadataSchemaRequest = (metadataSchema = {}) => {
  return Object.entries(metadataSchema).reduce(
    (scientificMetadata, [name, metadata]) => {
      const isArray = Array.isArray(metadata);
      const filledFields = isArray
        ? metadata.map(({ fields }) => {
            return removeEmpty(fields, (value) => isNil(value));
          })
        : metadata.fields
        ? removeEmpty(metadata.fields, (value) => isNil(value))
        : {};
      const isValid =
        isArray || (metadata.isActive && Object.keys(filledFields).length);

      return Object.assign(
        scientificMetadata,
        isValid ? { [name]: filledFields } : {}
      );
    },
    {}
  );
};

export const transformMetadataSchemaResponse = (metadataSchema) => {
  return Object.entries(metadataSchema).reduce((metadataSchema, [ name, schema ]) => {
    const transformedSchema = Array.isArray(schema) ? schema.map((schema) => ({
      fields: schema
    })) : {
      fields: schema
    };

    transformedSchema.isActive = true;

    return {
      ...metadataSchema,

      [name]: transformedSchema
    }
  }, {});
};

export const getMetadataSchemas = (config) => {
  return api2
    .get("/addons/metadata_schemas", config)
    .then(({ data }) => {
      return data;
    })
    .catch((data) => {
      throw data;
    });
};

export const getMetadataSchema = (config) => {
  return api2
    .get("/addons/get_metadata_schema", config)
    .then(({ data }) => {
      return data;
    })
    .catch((data) => {
      throw data;
    });
};

export const validateMetadataSchema = (data) => {
  return api2
    .post("/addons/validate", {
      ...data,

      metadata: transformMetadataSchemaRequest(data.metadata),
    })
    .then(({ data }) => {
      return data;
    })
    .catch((data) => {
      throw data;
    });
};
