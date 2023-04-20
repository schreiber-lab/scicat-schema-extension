import { forwardRef } from 'react';
import T from 'prop-types';
import cn from 'classnames';
import { makeStyles, IconButton as MuiIconButton } from '@material-ui/core';
import { styles } from './styles';

const useStyles = makeStyles(styles);

const propTypes = {
  selected: T.bool
};

export const IconButton = forwardRef(({ selected, color, children, className, ...props }, ref) => {
  const classes = useStyles({ color });

  if (color === 'inherit') {
    props.color = color;
  }

  return (
    <MuiIconButton
      ref={ref}
      className={cn(
        classes.root,
        { [classes.selected]: selected },
        className
      )}
      {...props}
    >
      {children}
    </MuiIconButton>
  );
});

IconButton.propTypes = propTypes;
