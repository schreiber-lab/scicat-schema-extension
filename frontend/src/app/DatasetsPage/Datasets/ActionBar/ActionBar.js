import { useState } from "react";
import {
  Container,
  Toolbar,
  Button,
  Grid,
} from "@material-ui/core";
import { FormModal } from "../../../app/Datasets/FormModal";

export const ActionBar = () => {
  const [open, setOpen] = useState(false);

  const openFormModal = () => {
    setOpen(true);
  };

  const handleFormModalClose = () => {
    setOpen(false);
  };

  return (
      <Container fixed>
        <Toolbar>
          <Grid container spacing={1}>
          <Grid item xs={9}>
            <Button
              color="primary"
              variant="contained"
              onClick={openFormModal}
            >
              Add dataset
            </Button>
            <FormModal isOpen={open} onClose={handleFormModalClose} />
            </Grid>
            </Grid>
        </Toolbar>
      </Container>
    
  );
};
