import cn from 'classnames';
import { makeStyles, Popper as PopperCommon } from '@material-ui/core';

const useStyles = makeStyles({
  popper: {
    minWidth: 240
  }
});

export const Popper = ({ className, ...props }) => {
  const classes = useStyles();

  return (
    <PopperCommon {...props} className={cn(classes.popper, className)} placement="bottom-start" />
  );
};
