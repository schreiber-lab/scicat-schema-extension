import { makeStyles, SvgIcon as MuiSvgIcon } from '@material-ui/core';
import { forwardRef } from 'react';
import { styles } from './styles';

const useStyles = makeStyles(styles);

export const SvgIcon = forwardRef(({ children, color, background, ...props }, ref) => {
  const classes = useStyles({ color });

  return (
    <MuiSvgIcon ref={ref} classes={classes} {...props}>
      {children}
    </MuiSvgIcon>
  );
});
