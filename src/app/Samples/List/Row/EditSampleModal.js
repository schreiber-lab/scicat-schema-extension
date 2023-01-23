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
import * as samplesApi from "../../../../api/samples";
import { SampleForm, validationSchema, defaultValues } from "../../SampleForm";

export const EditSampleModal = ({
  payload: { sample },
  DialogProps,
  handleModalResolve,
  handleModalReject,
}) => {
  const form = useForm({
    defaultValues: { ...defaultValues, ...sample },
    resolver: yupResolver(validationSchema),
  });

  const handleSubmit = (data) => {
    return samplesApi.editSampleWithMetadata(data).then((data) => {
      handleModalResolve(data);
    });
  };

  return (
    <Dialog maxWidth="lg" {...DialogProps}>
      <Box
        flexGrow={1}
        display="flex"
        flexDirection="column"
        overflow="auto"
        component="form"
        onSubmit={preventDefault(form.handleSubmit(handleSubmit))}
      >
        <DialogTitle>Edit sample</DialogTitle>

        <DialogContent>
          <FormProvider {...form}>
            <SampleForm />
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
