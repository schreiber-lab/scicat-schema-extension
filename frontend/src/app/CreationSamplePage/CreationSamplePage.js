import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { preventDefault } from "../../helpers/preventDefault";
import { yupResolver } from "../../utils/validation";
import { useModal } from "../../components";
import { Button, Typography, Grid, makeStyles } from "@material-ui/core";
import { SelectSampleModal } from "../../modules/samples/SelectSampleModal";
import * as samplesApi from "../../api/samples";
import { SampleForm, validationSchema, defaultValues } from "./SampleForm";

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    padding: spacing(2),
  },
  title: {
    alignItems: "center",
  },
  footer: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

export const CreationSamplePage = ({ formRef, onCreate }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const form = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });
  const { openModal } = useModal();

  const handleSubmit = (data) => {
    samplesApi.createSample(data).then(onCreate);
    navigate("/samples");
  };

  const openSelectSampleModal = () => {
    openModal(SelectSampleModal, {
      onModalResolved: (sample) => {
        form.reset(sample);
      },
    });
  };

  return (
    <Grid container className={classes.root}>
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
          <footer className={classes.footer}>
            <Button type="submit" color="primary" variant="contained">
              Add sample
            </Button>
          </footer>
        </form>
      </Grid>
    </Grid>
  );
};
