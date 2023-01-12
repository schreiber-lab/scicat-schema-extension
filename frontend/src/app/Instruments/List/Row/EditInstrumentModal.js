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
import * as instrumentsApi from "../../../../api/instruments";
import {
  InstrumentForm,
  validationSchema,
  defaultValues,
} from "../../InstrumentForm";

export const EditInstrumentModal = ({
  payload: { instrument },
  DialogProps,
  handleModalResolve,
  handleModalReject,
}) => {
  const form = useForm({
    defaultValues: { ...defaultValues, ...instrument },
    resolver: yupResolver(validationSchema),
  });

  const handleSubmit = (data) => {
    return instrumentsApi.editInstrumentWithMetadata(data).then((data) => {
      handleModalResolve(data);
      console.log(data)
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
        <DialogTitle>Edit instrument</DialogTitle>

        <DialogContent>
          <FormProvider {...form}>
            <InstrumentForm />
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
