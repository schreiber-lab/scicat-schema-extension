import { Grid, Box } from "@material-ui/core";
import { TextField } from "../../../components/TextField";
import { Metadata } from "../../../components/Metadata";

export const InstrumentForm = () => {
  return (
    <Grid container>
      <Grid item sm={6} md={7}>
        <TextField required fullWidth margin="dense" name="name" label="Name" />
      </Grid>

      {/* <Grid item sm={6} md={7}>
        <TextField
          required
          fullWidth
          margin="dense"
          name="customMetadata"
          label="Custom Metadata"
        />
      </Grid> */}

      <Grid item xs={12}>
        <Box py={2}>
          <Metadata
            baseKey="customMetadata"
            objectType="instrument"
            title="Custom Metadata"
          />
        </Box>
      </Grid>
    </Grid>
  );
};
