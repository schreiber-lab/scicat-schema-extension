import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Box,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { preventDefault } from "../../../../helpers/preventDefault";
import * as mdschemasApi from "../../../../api/md-schemas";
import {
  MDSchemaKeyForm,
} from "../../../../app/CreationMDSchemaPage/MDSchemaKeyForm";

export const EditMDSchemaModal = ({
  payload: { field, schemaName },
  DialogProps,
  handleModalResolve,
  handleModalReject,
}) => {
  const fieldNamePrefix = "new_key_details.";
  const form = useForm({
    defaultValues: {
      schema_name: schemaName,
      key_name: field.key_name,
      new_key_details: field,
      withPredefinedValues: !!field.allowed?.length,
      withUnit: !!field.unit,
    },
  });

  const handleSubmit = (data) => {
    if (!data.withPredefinedValues) {
      data.new_key_details.allowed = [];
    }

    delete data.withPredefinedValues;
    delete data.withUnit;

    return mdschemasApi.editMDSchemaKey(data).then(() => {
      handleModalResolve(data.new_key_details);
    });
  };

  return (
    <Dialog maxWidth="lg" {...DialogProps}>
      <Box
        noValidate
        flexGrow={1}
        display="flex"
        flexDirection="column"
        overflow="auto"
        component="form"
        onSubmit={preventDefault(form.handleSubmit(handleSubmit))}
      >
        <DialogTitle>Edit key</DialogTitle>

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

          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            color="primary"
            variant="contained"
          >
            Edit
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
