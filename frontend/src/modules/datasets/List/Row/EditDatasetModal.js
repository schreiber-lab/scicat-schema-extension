import { useEffect } from "react";
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
import * as datasetsApi from "../../../../api/datasets";
import * as instrumentsApi from "../../../../api/instruments";
import * as proposalsApi from "../../../../api/proposals";
import * as samplesApi from "../../../../api/samples";
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
  const form = useForm({
    defaultValues: {
      ...defaultValues, 
      ...dataset,

      instrumentId: null,
      proposalId: null,
      sampleId: null,
    },
    resolver: yupResolver(validationSchema),
  });

  const handleSubmit = (data) => {
    return datasetsApi.editDataset(data).then((data) => {
      handleModalResolve(data);
    });
  };

  useEffect(() => {
    if (dataset.instrumentId) {
      instrumentsApi.getInstrument(dataset.instrumentId).then((data) => {
        form.setValue("instrumentId", data);
      });
    }

    if (dataset.proposalId) {
      proposalsApi.getProposal(dataset.proposalId).then((data) => {
        form.setValue("proposalId", data);
      });
    }

    if (dataset.sampleId) {
      samplesApi.getSample(dataset.sampleId).then((data) => {
        form.setValue("sampleId", data);
      });
    }
  }, []);

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
        <DialogTitle>Edit dataset</DialogTitle>

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
