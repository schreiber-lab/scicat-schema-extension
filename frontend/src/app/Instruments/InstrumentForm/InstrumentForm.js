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
        <Metadata
          baseKey="customMetadata"
          objectType="instrument"
          title="Custom Metadata"
        />
    </>
  );
};
