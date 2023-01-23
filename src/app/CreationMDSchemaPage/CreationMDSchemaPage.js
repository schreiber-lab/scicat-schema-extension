import { useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  Container,
  makeStyles,
  Box,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { preventDefault } from "../../helpers/preventDefault";
import { yupResolver } from "../../utils/validation";
import * as mdSchemasApi from "../../api/md-schemas";
import { MDSchemaForm, validationSchema } from "./MDSchemaForm";

const defaultValues = {
  schema_name: null,
  schema_type: null,
  fixed_value_entries: false,
  keys: [],
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

export const CreationMDSchemaPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const handleSubmit = (data) => {
    mdSchemasApi.createMDSchema(data).then(() => {
      navigate("/md-schemas");
    });
  };

  return (
    <Container className={classes.root}>
      <Typography component="h1" variant="h5" className={classes.title}>
        Schema entry
      </Typography>

      <form
        noValidate
        onSubmit={preventDefault(form.handleSubmit(handleSubmit))}
      >
        <FormProvider {...form}>
          <MDSchemaForm />
        </FormProvider>

        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button type="submit" color="primary" variant="contained">
            Create MD schema
          </Button>
        </Box>
      </form>
    </Container>
  );
};
