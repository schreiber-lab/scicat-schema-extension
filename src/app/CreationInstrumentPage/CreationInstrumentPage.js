import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Container, makeStyles } from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { preventDefault } from "../../helpers/preventDefault";
import { yupResolver } from "../../utils/validation";
import * as instrumentsApi from "../../api/instruments";
import { addInstrument } from "../../redux/instruments/actions";
import { InstrumentForm, validationSchema } from "./InstrumentForm";

const defaultValues = {
  name: null,
};

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

export const CreationInstrumentPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const handleSubmit = (data) => {
    instrumentsApi.createInstrument(data).then((data) => {
      dispatch(addInstrument(data));
      navigate("/instruments");
    });
  };

  return (
    <Container className={classes.root}>
      <Typography component="h1" variant="h5" className={classes.title}>
        Instrument entry
      </Typography>

      <form
        noValidate
        onSubmit={preventDefault(form.handleSubmit(handleSubmit))}
      >
        <FormProvider {...form}>
          <InstrumentForm />
        </FormProvider>

        <footer className={classes.footer}>
          <Button type="submit" color="primary" variant="contained">
            Add instrument
          </Button>
        </footer>
      </form>
    </Container>
  );
};
