import { useState } from "react";
// import { useFormContext, useWatch } from "react-hook-form";
import { Grid, Box, Button } from "@material-ui/core";
import { AddEntryModal } from "../AddEntryModal";

export const AddEntryButton = ({ schemaName }) => {
  const [open, setOpen] = useState(false);
  // const { getValues, reset } = useFormContext();
  // const entries = useWatch({ name: "entries" });

  // const addEntry = (entry) => {

  // };

  const openCreationModal = () => {
    setOpen(true);
  };

  const handleCreationModalClose = () => {
    setOpen(false);
  };

  return (
    <Box pb={2} pt={3}>
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            onClick={openCreationModal}
          >
            Add entry
          </Button>

          <AddEntryModal
            isOpen={open}
            // onResolve={addEntry}
            schemaName={schemaName}
            onClose={handleCreationModalClose}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
