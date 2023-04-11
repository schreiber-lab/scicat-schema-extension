import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { preventDefault } from "../../helpers/preventDefault";
import { yupResolver } from "../../utils/validation";
import * as samplesApi from "../../api/samples";
import { validationSchema, SampleForm } from "./SampleForm";

const defaultValues = {
  description: null,
  owner: null,
  ownerGroup: null,
};

  export const AddSampleModal = ({
    DialogProps,
    handleModalResolve,
    handleModalReject,
  }) => {
    const form = useForm({
      defaultValues,
      resolver: yupResolver(validationSchema),
    });

  const handleSubmit = (data) => {
    return samplesApi.createSample(data).then((data) => {
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
        <DialogTitle>Sample Entry</DialogTitle>

        <DialogContent>
          <FormProvider {...form}>
            <SampleForm/>
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
            Add sample
          </Button>
        </DialogActions>
        </Box>
    </Dialog>
  );
};
