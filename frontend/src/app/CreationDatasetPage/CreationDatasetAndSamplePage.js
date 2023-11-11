import { useRef } from "react";
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
import { useModal } from "../../components";
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
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });
  const datasetFormRef = useRef();
  const sampleFormRef = useRef();
  const { openModal } = useModal();

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
    datasetsApi.createDataset(values).then((data) => {
      dispatch(addDataset(data));
      enqueueSnackbar("Dataset was successfully created");
      navigate("/datasets");
    })
  };

  const handleSampleCreate = () => {
    datasetFormRef.current.dispatchEvent(
      new Event("submit", { cancelable: true, bubbles: true })
    );
  };

  const openSelectDatasetModal = () => {
    openModal(SelectDatasetModal, {
      onModalResolved: (dataset) => {
        form.reset(dataset);
      },
    });
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
