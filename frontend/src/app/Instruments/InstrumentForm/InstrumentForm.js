import { TextField } from "../../../components/TextField";
import { Metadata } from "../../../components/Metadata";

export const InstrumentForm = () => {
  return (
    <>
      <TextField
        required
        fullWidth
        margin="dense"
        name="name"
        label="Name"
      />

      <TextField
        required
        fullWidth
        margin="dense"
        name="facility"
        label="Custom Metadata"
      />
        <Metadata
          baseKey="customMetadata"
          objectType="instrument"
          title="Custom Metadata"
        />
    </>
  );
};
