import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle
} from "@material-ui/core";
import * as instrumentsApi from "../../../../api/instruments";

export const DeleteInstrumentModal = ({
  payload: { instrument },
  DialogProps,
  handleModalResolve,
  handleModalReject
}) => {

  const handleInstrumentDelete = () => {
    return instrumentsApi.deleteInstrument(instrument.pid).then(() => {
      handleModalResolve(instrument);
    });
  };
  
  return (
    <Dialog {...DialogProps}>
      <DialogTitle>
        Are you sure you want to delete this instrument?
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleModalReject} variant="outlined" color="primary">
          Cancel
        </Button>

        <Button
          type="submit"
          color="primary"
          variant="contained"
          onClick={handleInstrumentDelete}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
