import { useContext } from "react";
import { Container, Toolbar, Button, Grid } from "@material-ui/core";
import { stopPropagation } from "../../../helpers/stopPropagation";
import { SamplesContext } from "../../../modules/samples/SamplesProvider";
import { useModal } from "../../../components";
import { AddSampleModal } from "../AddSampleModal";

export const ActionBar = ({ sample, ...props }) => {
  const { openModal } = useModal();
  const { addSample } = useContext(SamplesContext);

  const openAddModal = () => {
    openModal(AddSampleModal, {
      payload: {
        sample,
      },
      onModalResolved: (sample) => {
        addSample(sample);
      },
    });
  };

  return (
    <Container {...props}>
      <Toolbar disableGutters>
        <Grid container>

          <Grid item>
            <Button  color="primary" variant="contained" onClick={stopPropagation(openAddModal)}>
              Create Sample
            </Button>

            <AddSampleModal />
          </Grid>
        </Grid>
      </Toolbar>
    </Container>
  );
};
