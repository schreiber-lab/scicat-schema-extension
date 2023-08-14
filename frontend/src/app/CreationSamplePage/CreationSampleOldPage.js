import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Container, makeStyles } from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { preventDefault } from "../../helpers/preventDefault";
import { yupResolver } from "../../utils/validation";
import * as samplesApi from "../../api/samples";
import { addSample } from "../../redux/samples/actions";
import { SampleForm, validationSchema, defaultValues } from "./SampleForm";

const useStyles = makeStyles(({spacing}) => ({
  root:{
    paddingTop: spacing(2),
    paddingBottom: spacing(2),
  },
  title: {
    alignItems: "center",
  },
  footer: {
    display: "flex",
    justifyContent: "flex-end"

  }
}));

export const CreationSampleOldPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const form = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const handleSubmit = (data) => {
    samplesApi
      .createSample(data)
      .then((data) => {
        dispatch(addSample(data));
        navigate("/samples")
      })
  };

  return (
    <Container className={classes.root}>
      <Typography component="h1" variant="h5" className={classes.title}>
        Sample entry
      </Typography>

      <form
        noValidate
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
    </Container>
  );
};
