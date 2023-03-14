import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { preventDefault } from "../../../../helpers/preventDefault";
// import { yupResolver } from "../../../../utils/validation";
import * as mdschemasApi from "../../../../api/md-schemas";
import {
  MDSchemaKeyForm,
  // validationSchema,
  // defaultValues,
} from "../../../../app/CreationMDSchemaPage/MDSchemaKeyForm";

export const EditMDSchemaModal = ({
  payload: {
    field, 
    schemaName,
   },
  DialogProps,
  handleModalResolve,
  handleModalReject,
}) => {
  console.log(field);

  const form = useForm({
    defaultValues: {
      schema_name: schemaName,
      
      ...field,
    },
    // resolver: yupResolver(validationSchema),
  });

  const handleSubmit = (data) => {
    if (!data.withPredefinedValues) {
      delete data.allowed;
    }

    delete data.withPredefinedValues;

    return mdschemasApi.editMDSchemaKey(data).then((data) => {
      handleModalResolve(data);
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
        <DialogTitle>
          <Typography variant="h4">Edit key</Typography>
        </DialogTitle>

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
