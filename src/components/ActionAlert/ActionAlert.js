import { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '30%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export const ActionAlert = () =>  {
  const [open, setOpen] = useState(true);
  const classes = useStyles();

  const closeAlertWindow = () => {
    setOpen(false);
  }; 
  

  return (
    <div className={classes.root}>
      <Alert severity="error" onClose={closeAlertWindow}>
      {/* <Alert severity="error"  onClose={() => closeAlertWindow()}> */}
        <AlertTitle>Error</AlertTitle>
        This is an error alert — <strong>check it out!</strong>
      </Alert>
    </div>
  );
}