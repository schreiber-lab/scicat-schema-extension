import { TextField } from "../../../components/TextField";

export const SampleForm = () => {
  return (
    <>
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
    </>
  );
};
