import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { preventDefault } from "../../../helpers/preventDefault";
// import { yupResolver } from "../../../utils/validation";
import * as mdschemasApi from "../../../api/md-schemas";
import { MDSchemaKeyForm } from "./MDSchemaKeyForm";

export const CreateMDSchemaKeyModal = ({
  payload: { field, schemaName },
  DialogProps,
  handleModalResolve,
  handleModalReject,
}) => {
  const fieldNamePrefix = "new_key_details.";
  const form = useForm({
    defaultValues: {
      key_name: field.key_name,
      schema_name: schemaName,
      new_key_details: field,
      withPredefinedValues: !!field.allowed?.length,
      withUnit: !!field.unit,
    },
    // resolver: yupResolver(validationSchema),
  });


  const handleSubmit = (data) => {
    if (!data.withPredefinedValues) {
      data.new_key_details.allowed = [];
    }

    delete data.withPredefinedValues;
    delete data.withUnit;


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
            <MDSchemaKeyForm fieldNamePrefix={fieldNamePrefix} />
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
