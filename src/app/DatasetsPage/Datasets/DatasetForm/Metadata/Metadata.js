import { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import { getMetadataSchemas } from "../../../../../api/metadata-schemas";
import { Schema } from "./Schema";

export const Metadata = () => {
  const [datasetMetadataSchemas, setDatasetMetadataSchemas] = useState(null);
 
  useEffect(() => {
    getMetadataSchemas().then((datasetMetadataSchemas) => {
      setDatasetMetadataSchemas(datasetMetadataSchemas);
    });
  }, []);

  return (
    <div>
      <Typography variant="h4">Metadata</Typography>

      {datasetMetadataSchemas?.map((schema) => (
        <Schema key={schema.schema_name} schema={schema} />
      ))}
    </div>
  );
};
