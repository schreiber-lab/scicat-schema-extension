import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
  } from "@material-ui/core";
  
  
  export const DeleteModal = ({ isOpen, onClose, onResolve }) => {
    return (
      <Dialog open={isOpen} onClose={onClose}>
          <DialogTitle>Are you sure you want to delete this sample?</DialogTitle>
          <DialogActions>
          <Button onClick={onClose} variant="outlined" color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary" variant="contained" onClick={onResolve}>
              Delete
            </Button>
          </DialogActions>
      </Dialog>
    );
  };