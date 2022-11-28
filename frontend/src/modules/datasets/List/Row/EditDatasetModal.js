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
import { yupResolver } from "../../../../utils/validation";
import * as datasetsApi from "../../../../api/datasets";
import {
  DatasetForm,
  validationSchema,
  defaultValues,
} from "../../../../app/CreationDatasetPage/DatasetForm";

export const EditDatasetModal = ({
  payload: { dataset },
  DialogProps,
  handleModalResolve,
  handleModalReject,
}) => {
  console.log(dataset);

  const form = useForm({
    defaultValues: { ...defaultValues, ...dataset },
    resolver: yupResolver(validationSchema),
  });
  console.log(form);
  const handleSubmit = (data) => {
    console.log(data);
    return datasetsApi.editDataset(data).then((data) => {
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
        <DialogTitle>
          <Typography variant="h4">
            Edit dataset
          </Typography>
        </DialogTitle>

        <DialogContent>
          <FormProvider {...form}>
            <DatasetForm />
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
