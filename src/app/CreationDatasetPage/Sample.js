import { useForm, FormProvider } from "react-hook-form";
import { preventDefault } from "../../helpers/preventDefault";
import { yupResolver } from "../../utils/validation";
import { useModal } from "../../components";
import { Button, Typography, Grid, Box } from "@material-ui/core";
import { SelectSampleModal } from "../../modules/samples/SelectSampleModal";
import * as samplesApi from "../../api/samples";
import {
  SampleForm,
  validationSchema,
  defaultValues,
} from "../CreationSamplePage/SampleForm";

export const Sample = ({ formRef, onCreate }) => {
  const form = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });
  const { openModal } = useModal();

  const handleSubmit = (data) => {
    samplesApi.createSample(data).then(onCreate);
  };

  const openSelectSampleModal = () => {
    openModal(SelectSampleModal, {
      onModalResolved: (sample) => {
        form.reset(sample);
      },
    });
  };

  return (
    <Grid container component={Box} my={4}>
      <Grid item xs>
        <Typography variant="h5">Add new sample</Typography>
      </Grid>

      <Grid item>
        <Button
          variant="contained"
          color="primary"
          onClick={openSelectSampleModal}
        >
          Apply template
        </Button>
      </Grid>

      <Grid item xs={12}>
        <form
          noValidate
          ref={formRef}
          onSubmit={preventDefault(form.handleSubmit(handleSubmit))}
        >
          <FormProvider {...form}>
            <SampleForm />
          </FormProvider>
        </form>
      </Grid>
    </Grid>
  );
};
