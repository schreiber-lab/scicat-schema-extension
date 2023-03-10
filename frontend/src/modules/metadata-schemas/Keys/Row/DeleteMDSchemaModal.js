import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import * as mdschemasApi from "../../../../api/md-schemas";

export const DeleteMDSchemaModal = ({
  payload: { field },
  DialogProps,
  handleModalResolve,
  handleModalReject,
}) => {
  const handleKeyDelete = () => {

    return mdschemasApi.deleteMDSchemaKey({
      params: {
        schema_name: "dataset",
        key_name: field.key_name,
      }
    }).then(() => {
      handleModalResolve(field);
    });
  };

  return (
    <Dialog {...DialogProps}>
      <DialogTitle>Are you sure you want to delete this key?</DialogTitle>
      <DialogActions>
        <Button onClick={handleModalReject} variant="outlined" color="primary">
          Cancel
        </Button>

        <Button
          type="submit"
          color="primary"
          variant="contained"
          onClick={handleKeyDelete}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
