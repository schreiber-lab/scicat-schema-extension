import { Grid, Box } from "@material-ui/core";
import { TextField } from "../../../components/TextField";
import { Metadata } from "../../../components/Metadata";
import { WarningBox } from "../../../components/WarningBox";

export const SampleForm = () => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item sm={2} md={4}>
          <TextField
            required
            fullWidth
            margin="dense"
            name="sampleId"
            label="Sample Id"
            InputProps={{
              endAdornment: <WarningBox />,
            }}
          />
        </Grid>

        <Grid item sm={2} md={4}>
          <TextField
            required
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            name="description"
            label="Sample Description"
          />
        </Grid>

        <Grid item sm={2} md={4}>
          <TextField fullWidth margin="dense" name="owner" label="owner" />
        </Grid>

        <Grid item sm={2} md={4}>
          <TextField
            required
            fullWidth
            margin="dense"
            name="ownerGroup"
            label="Owner Group"
            placeholder="Use a group you have access to"
          />
        </Grid>
      </Grid>

      <Box py={2}>
        <Metadata
          baseKey="sampleCharacteristics"
          objectType="sample"
          title="Sample Characteristics"
        />
      </Box>
    </>
  );
};
