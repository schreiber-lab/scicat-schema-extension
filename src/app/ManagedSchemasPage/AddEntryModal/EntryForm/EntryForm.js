import { useEffect, useState } from "react";
import { LinearProgress } from "@material-ui/core";
import { getMetadataSchema } from "../../../../api/metadata-schemas";
import { Field } from "./Field";

export const EntryForm = ({ schemaName }) => {
  const [metadataSchema, setMetadataSchema] = useState(null);

  useEffect(() => {
    getMetadataSchema({
      params: {
        schema_name: schemaName,
      },
    }).then((metadataSchema) => {
      setMetadataSchema(metadataSchema);
    });
  }, []);

  return !metadataSchema ? (
    <LinearProgress />
  ) : (
    metadataSchema.keys.map((field) => <Field key={field.key_name} field={field}/>)
  );
};
