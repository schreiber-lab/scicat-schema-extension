import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(8),
    fontSize: 30,
  },
  title2: {
    marginTop: theme.spacing(1),
    fontSize: 30,
  },
}));

export const ForbiddenPage = () => {
  const classes = useStyles();
  return (
    <>
      <Typography align="center" color="primary" className={classes.title}>
        This page doesn't exist.
      </Typography>
      <Typography align="center" color="primary" className={classes.title2} >
        You should probably log in.
      </Typography>
    </>
  );
};
