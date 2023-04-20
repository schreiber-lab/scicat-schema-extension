import { useState } from "react";
import { Container, Toolbar, Button, Grid } from "@material-ui/core";
// import { Autocomplete } from "@material-ui/lab";
// import Autocomplete from '@material-ui/lab/Autocomplete';
// import { Autocomplete } from "../../../components/Autocomplete";
import { FormModal } from "../FormModal";
// import { SamplesAutocomplete } from "./SamplesAutocomplete";

export const ActionBar = () => {
  const [open, setOpen] = useState(false);

  const openFormModal = () => {
    setOpen(true);
  };

  const handleFormModalClose = () => {
    setOpen(false);
  };

  return (
    <Container>
      <Toolbar disableGutters>
        <Grid container>
          <Grid item xs>
            {/* <SamplesAutocomplete style={{ width: 300 }} /> */}
          </Grid>

          <Grid item>
            <Button color="primary" variant="contained" onClick={openFormModal}>
              Create Sample
            </Button>

            <FormModal isOpen={open} onClose={handleFormModalClose} />
          </Grid>
        </Grid>
      </Toolbar>
    </Container>
  );
};
