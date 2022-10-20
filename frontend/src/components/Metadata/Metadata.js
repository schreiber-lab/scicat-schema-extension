import { useState, useEffect } from "react";
import { Typography, Box } from "@material-ui/core";
import { getMetadataSchemas } from "../../api/metadata-schemas";
import { Schema } from "./Schema";

export const Metadata = ({ baseKey, objectType, title }) => {
  const [metadataSchemas, setMetadataSchemas] = useState(null);

  useEffect(() => {
    getMetadataSchemas({
      params: {
        object_type: objectType,
      },
    }).then((metadataSchemas) => {
      setMetadataSchemas(metadataSchemas);
    });
  }, []);

  return (
    <div>
      <Typography component="h1" variant="h5">
        {title}
      </Typography>

      {!metadataSchemas?.length && (
        <Box mt={2}>
          <Typography>Metadata schemas not found</Typography>
        </Box>
      )}

      {metadataSchemas?.map((schema) => (
        <Schema key={schema.schema_name} schema={schema} baseKey={baseKey} />
      ))}
    </div>
  );
};
