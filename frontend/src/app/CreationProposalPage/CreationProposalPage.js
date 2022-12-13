import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Container, makeStyles } from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { preventDefault } from "../../helpers/preventDefault";
import { yupResolver } from "../../utils/validation";
import * as proposalsApi from "../../api/proposals";
import { addProposal } from "../../redux/proposals/actions";
import { ProposalForm, validationSchema } from "./ProposalForm";

const defaultValues = {
  proposalId: null,
  pi_firstname: null,
  pi_lastname: null,
  email: null,
  firstname: null,
  lastname: null,
  title: "",
  abstract: null,
  ownerGroup: "Schreiber_lab",
  accessGroups: [],
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

export const CreationProposalPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const handleSubmit = (data) => {
    proposalsApi.createProposal(data).then((data) => {
      dispatch(addProposal(data));
      navigate("/proposals");
    });
  };

  return (
    <Container className={classes.root}>
      <Typography component="h1" variant="h5" className={classes.title}>
        Add new proposal
      </Typography>

      <form
        noValidate
        onSubmit={preventDefault(form.handleSubmit(handleSubmit))}
      >
        <FormProvider {...form}>
          <ProposalForm />
        </FormProvider>

        <footer className={classes.footer}>
          <Button type="submit" color="primary" variant="contained">
            Add proposal
          </Button>
        </footer>
      </form>
    </Container>
  );
};
