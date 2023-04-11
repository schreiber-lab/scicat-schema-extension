import { TextField } from "../../../components/TextField";
import { Metadata } from "../../../components/Metadata";

export const SampleForm = () => {
  return (
    <>
      <TextField
        required
        fullWidth
        margin="dense"
        name="sampleId"
        label="Sample Id"
      />
      <TextField
        required
        fullWidth
        margin="dense"
        name="description"
        label="Sample Description"
      />

      <TextField fullWidth margin="dense" name="owner" label="owner" />

      <TextField
        required
        fullWidth
        margin="dense"
        name="ownerGroup"
        label="Owner Group"
        placeholder="Use a group you have access to"
      />
      <Metadata
        baseKey="sampleCharacteristics"
        objectType="sample"
        title="Sample Characteristics"
      />
    </>
  );
};
