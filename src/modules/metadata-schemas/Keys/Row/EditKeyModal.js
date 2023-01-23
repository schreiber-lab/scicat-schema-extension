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
import { yupResolver } from "../../../../utils/validation";
import * as keysApi from "../../../../api/md-schemas";
import { MDSchemaKeyForm, validationSchema } from "../../../../app/CreationMDSchemaPage/MDSchemaKeyForm";

export const EditKeyModal = ({
  payload: { field },
  DialogProps,
  handleModalResolve,
  handleModalReject,
}) => {
  const form = useForm({
    defaultValues: field,
    resolver: yupResolver(validationSchema),
  });

  const handleSubmit = (data) => {
    if (!data.withPredefinedValues) {
      delete data.allowed;
    }

    delete data.withPredefinedValues;

    return keysApi.editKey(data).then((data) => {
      handleModalResolve(data);
    });
  };

  return (
    <Dialog maxWidth="sm" {...DialogProps}>
      <Box
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
