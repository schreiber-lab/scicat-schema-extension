import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  Container,
  makeStyles,
  Grid,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import { useForm, FormProvider } from "react-hook-form";
import { preventDefault } from "../../helpers/preventDefault";
import { yupResolver } from "../../utils/validation";
import * as datasetsApi from "../../api/datasets";
// import { validateMetadataSchema } from "../../api/metadata-schemas";
import { addDataset } from "../../redux/datasets/actions";
import { DatasetForm, validationSchema, defaultValues } from "./DatasetForm";
import { SelectDatasetModal } from "../../modules/datasets/SelectDatasetModal";
import { Sample } from "./Sample";

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    paddingTop: spacing(2),
    paddingBottom: spacing(2),
  },
  title: {
    alignItems: "center",
  },
  footer: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

export const CreationDatasetAndSamplePage = () => {
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });
  const datasetFormRef = useRef();
  const sampleFormRef = useRef();

  const submitForms = () => {
    datasetsApi.validateDataset(form.getValues()).then(({ valid }) => {
      if (!valid) {
        return;
      }

      sampleFormRef.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    });
  };

  const handleSubmit = (values) => {
    console.log(values);
    // validateMetadataSchema({
    //   object_type: "dataset",
    //   metadata: data.scientificMetadata,
    // })
    //   .then(() => {

    datasetsApi.createDataset(values).then((data) => {
      dispatch(addDataset(data));
      enqueueSnackbar("Dataset was successfully created");
      navigate("/datasets");
    });

    // })
    // .catch(() => {
    //   enqueueSnackbar(
    //     "Your dataset wasn't created. Check the data you entered.",
    //     {
    //       variant: "error",
    //     }
    //   );
    // });
  };

  const handleSampleCreate = () => {
    datasetFormRef.current.dispatchEvent(
      new Event("submit", { cancelable: true, bubbles: true })
    );
  };

  const openSelectDatasetModal = () => {
    setOpen(true);
  };

  const closeSelectDatasetModal = () => {
    setOpen(false);
  };

  const handleDatasetSelect = ({ pid, ...dataset }) => {
    console.log(1);
    closeSelectDatasetModal();
    form.reset(dataset);
  };

  return (
    <Container className={classes.root}>
      <Grid container>
        <Grid item xs>
          <Typography component="h1" variant="h5" className={classes.title}>
            Add new dataset
          </Typography>
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={openSelectDatasetModal}
          >
            Apply template
          </Button>

          <SelectDatasetModal
            isOpen={open}
            onClose={closeSelectDatasetModal}
            onDatasetSelect={handleDatasetSelect}
          />
        </Grid>
      </Grid>

      <form
        noValidate
        ref={datasetFormRef}
        onSubmit={preventDefault(form.handleSubmit(handleSubmit))}
      >
        <FormProvider {...form}>
          <DatasetForm />
        </FormProvider>
      </form>

      <Sample formRef={sampleFormRef} onCreate={handleSampleCreate} />

      <Button color="primary" variant="contained" onClick={submitForms}>
        Add dataset and sample
      </Button>
    </Container>
  );
};
