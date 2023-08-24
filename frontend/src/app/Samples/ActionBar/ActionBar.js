// import { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Toolbar, Button, Grid } from "@material-ui/core";
// import { FormModal } from "../FormModal";

export const ActionBar = () => {
  // const [open, setOpen] = useState(false);

  // const openFormModal = () => {
  //   setOpen(true);
  // };

  // const handleFormModalClose = () => {
  //   setOpen(false);
  // };
  
  return (
    <Container>
      <Toolbar disableGutters>
        <Grid container>
          <Grid item xs>
          </Grid>

          <Grid item>
            {/* <Button color="primary" variant="contained" onClick={openFormModal}>
              Create Sample 
            </Button> */}

            <Button color="primary" variant="contained" component={Link} to="/sample-creation">
              Create Sample 
            </Button>

            {/* <FormModal isOpen={open} onClose={handleFormModalClose} /> */}
          </Grid>
        </Grid>
      </Toolbar>
    </Container>
  );
};
