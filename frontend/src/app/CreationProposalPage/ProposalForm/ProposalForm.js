import { Grid, makeStyles } from "@material-ui/core";
import { TextField } from "../../../components/TextField";

const useStyles = makeStyles(({ spacing }) => ({
  textField: {
    paddingRight: spacing(6),
  },
}));

export const ProposalForm = () => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item sm={2} md={4}>
        <TextField
          required
          fullWidth
          className={classes.textField}
          margin="dense"
          name="proposalId"
          label="Proposal id"
          placeholder="Enter the proposal id..."
        />
      </Grid>

      <Grid item sm={2} md={4}>
        <TextField
          fullWidth
          className={classes.textField}
          margin="dense"
          name="pi_firstname"
          label="PI first name"
          placeholder="Enter the PI of first name..."
        />
      </Grid>

      <Grid item sm={2} md={4}>
        <TextField
          fullWidth
          className={classes.textField}
          margin="dense"
          name="pi_lastname"
          label="PI last name"
          placeholder="Enter the PI of last name ..."
        />
      </Grid>

      <Grid item sm={2} md={4}>
        <TextField
          required
          fullWidth
          className={classes.textField}
          margin="dense"
          name="email"
          label="Email"
          placeholder="Enter the email..."
        />
      </Grid>

      <Grid item sm={2} md={4}>
        <TextField
          fullWidth
          className={classes.textField}
          margin="dense"
          name="firstname"
          label="First name"
          placeholder="Enter the first name..."
        />
      </Grid>

      <Grid item sm={2} md={4}>
        <TextField
          fullWidth
          className={classes.textField}
          margin="dense"
          name="lastname"
          label="Last name"
          placeholder="Enter the last name..."
        />
      </Grid>

      <Grid item sm={2} md={4}>
        <TextField
          fullWidth
          className={classes.textField}
          margin="dense"
          name="title"
          label="Title"
          placeholder="Enter the title..."
        />
      </Grid>

      <Grid item sm={2} md={4}>
        <TextField
          fullWidth
          multiline
          rows={4}
          className={classes.textField}
          variant="outlined"
          margin="dense"
          name="abstract"
          label="Abstract"
          placeholder="Enter the abstract..."
        />
      </Grid>

      <Grid item sm={2} md={4}>
        <TextField
          required
          fullWidth
          className={classes.textField}
          margin="dense"
          name="ownerGroup"
          label=" Owner group"
          placeholder="Enter the owner group..."
        />
      </Grid>
    </Grid>
  );
};
