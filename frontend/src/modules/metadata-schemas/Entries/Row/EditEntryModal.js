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
import * as fixedValueEntryApi from "../../../../api/fixed-value-entries";
import { EntryForm } from "../../../../app/ManagedSchemasPage/AddEntryModal/EntryForm"

export const EditEntryModal = ({
  payload: { field, schemaName },
  DialogProps,
  handleModalResolve,
  handleModalReject,
}) => {
  const form = useForm({
    defaultValues: {
      schema_name: schemaName,
      entry_id: field.entry_id,
      new_entry_details: field,
    },
  });

  const handleSubmit = (data) => {
    return fixedValueEntryApi.editFixedValueEntry(data).then(() => {
      handleModalResolve(field);
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
        <DialogTitle>Edit entry for {schemaName}</DialogTitle>

        <DialogContent>
          <FormProvider {...form}>
            <EntryForm schemaName={schemaName} basePath="new_entry_details" />
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
