import { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import {
  Grid,
  Box,
  FormControlLabel,
  MenuItem,
  Button,
  Typography,
} from "@material-ui/core";
import { Keys } from "../../../modules/metadata-schemas";
import { TextField } from "../../../components/TextField";
import { CreateMDSchemaKeyModal } from "../CreateMDSchemaKeyModal";
import { Checkbox } from "../../../components/Checkbox";
import { useModal } from "../../../components";


export const MDSchemaForm = () => {
  const { getValues, reset } = useFormContext();
  const keys = useWatch({ name: "keys" });
  const { openModal } = useModal();
  const addKey = (key) => {
    reset({ ...getValues(), "keys": (getValues().keys || []).concat(key) });
    console.log((getValues().keys || []).concat(key));
  };

  const openCreationModal = () => {
    openModal(CreateMDSchemaKeyModal, {
      onModalResolved: (key) => {
        addKey(key);
      }
    });
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item sm={4}>
          <TextField
            required
            fullWidth
            name="schema_name"
            label="Schema name"
          />
        </Grid>

        <Grid item sm={4}>
          <TextField
            required
            fullWidth
            select
            name="schema_type"
            label="Schema type"
          >
            <MenuItem value="dataset">Dataset</MenuItem>
            <MenuItem value="sample">Sample</MenuItem>
            <MenuItem value="instrument">Instrument</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox  name="fixed_value_entries"/>}
            label="Fixed value entries"
          />
        </Grid>
      </Grid>

      <Box pb={2} pt={3}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Typography variant="h5">Schema keys</Typography>
          </Grid>

          <Grid item>
            <Button
              color="primary"
              variant="contained"
              type="button"
              onClick={openCreationModal}
            >
              Add key
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Keys keys={keys} />
    </>
  );
};
