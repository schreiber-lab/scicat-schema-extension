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
import * as mdschemasApi from "../../../api/md-schemas";
import { MDSchemaKeyForm, validationSchema } from "./MDSchemaKeyForm";

const defaultValues = {
  key_name: null,
  type: null,
  unit: null,
  withPredefinedValues: false,
  allowed: [],
  required: false,
  scan_ref: false,
  changes_likely: false,
};

export const CreateMDSchemaKeyModal = ({
  DialogProps,
  handleModalResolve,
  handleModalReject,
}) => {
  const form = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const handleSubmit = (data) => {
    if (!data.withPredefinedValues) {
      delete data.allowed;
    }

    delete data.withPredefinedValues;

    return mdschemasApi.createMDSchemaKey(data).then((data) => {
    handleModalResolve(data);
  });
  };

  return (
    <Dialog {...DialogProps}>
      <form
        noValidate
        onSubmit={preventDefault(form.handleSubmit(handleSubmit))}
      >
        <DialogTitle>Add new key</DialogTitle>

        <DialogContent>
          <FormProvider {...form}>
            <MDSchemaKeyForm />
          </FormProvider>
        </DialogContent>

        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleModalReject}
          >
            Cancel
          </Button>

          <Button type="submit" color="primary" variant="contained">
            Add key
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
