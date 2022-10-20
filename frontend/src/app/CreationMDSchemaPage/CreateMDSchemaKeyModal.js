import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { preventDefault } from "../../helpers/preventDefault";
import { yupResolver } from "../../utils/validation";
import { MDSchemaKeyForm, validationSchema } from "./MDSchemaKeyForm";

const defaultValues = {
  key_name: null,
  type: null,
  unit: null,
  allowed: [],
  required: false,
  scan_ref: false,
  changes_likely: false,
};

export const CreateMDSchemaKeyModal = ({ DialogProps, handleModalResolve, handleModalReject }) => {
  //   const { control } = useFormContext()

  const form = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const handleSubmit = (data) => {
    handleModalResolve(data);
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
          <Button variant="outlined" color="primary" onClick={handleModalReject}>
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
