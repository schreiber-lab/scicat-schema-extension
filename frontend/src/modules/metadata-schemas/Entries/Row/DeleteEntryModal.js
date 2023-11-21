import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import * as fixedValueEntryApi from "../../../../api/fixed-value-entries";

export const DeleteEntryModal = ({
  payload: { field, schemaName, entryId },
  DialogProps,
  handleModalResolve,
  handleModalReject,
}) => {
  const handleEntryDelete = () => {
    return fixedValueEntryApi.deleteFixedValueEntry({
      data: {
        schema_name: schemaName,
        entry_id: entryId,
      }
    }).then(() => {
      handleModalResolve(field);
    });
  };

  return (
    <Dialog {...DialogProps}>
      <DialogTitle>Are you sure you want to delete this entry?</DialogTitle>
      <DialogActions>
        <Button onClick={handleModalReject} variant="outlined" color="primary">
          Cancel
        </Button>

        <Button
          type="submit"
          color="primary"
          variant="contained"
          onClick={handleEntryDelete}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
