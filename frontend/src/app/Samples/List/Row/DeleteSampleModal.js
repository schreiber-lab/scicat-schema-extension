import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle
} from "@material-ui/core";
import * as samplesApi from "../../../../api/samples";

export const DeleteSampleModal = ({
  payload: { sample },
  DialogProps,
  handleModalResolve,
  handleModalReject
}) => {

  const handleSampleDelete = () => {
    return samplesApi.deleteSample(sample.sampleId).then(() => {
      handleModalResolve(sample);
    });
  };
  
  return (
    <Dialog {...DialogProps}>
      <DialogTitle>
        Are you sure you want to delete this sample?
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleModalReject} variant="outlined" color="primary">
          Cancel
        </Button>

        <Button
          type="submit"
          color="primary"
          variant="contained"
          onClick={handleSampleDelete}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
