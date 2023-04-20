import { TextField } from "../../../../../../components";

export const Row = ({ field, schemaName }) => {
  return (
    <TextField
      fullWidth
      required={field.required}
      name={`scientificMetadata.${schemaName}.fields.${field.key_name}`}
      label={field.key_name}
      variant="outlined"
      margin="dense"
    />
  );
};
