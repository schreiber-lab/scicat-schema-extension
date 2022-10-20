import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { preventDefault } from "../../../helpers/preventDefault";
import { yupResolver } from "../../../utils/validation";
import * as datasetsApi from "../../../api/datasets";
import { DatasetForm, validationSchema } from "./DatasetForm";

const defaultValues = {
  datasetName: null,
  sourceFolder: null,
  size: null,
  owner: null,
  contactEmail: null,
  creationTime: null,
  ownerGroup: null,
  // startTime: null,
  type: null,
  // proposalId: null,
  group: null,
};

export const CreateDatasetModal = ({ isOpen, onClose, onDatasetCreate }) => {
  const form = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const handleSubmit = (data) => {
    datasetsApi
      .createDataset(data)
      .then((data) => {
        onDatasetCreate(data);
        onClose();
      })
      .catch(() => {});
    console.log(data);
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <form noValidate onSubmit={preventDefault(form.handleSubmit(handleSubmit))}>
        <DialogTitle>Add new dataset</DialogTitle>

        <DialogContent>
          <FormProvider {...form}>
            <DatasetForm />
          </FormProvider>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} variant="outlined" color="primary">
            Cancel
          </Button>

          <Button type="submit" color="primary" variant="contained">
            Add dataset
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
