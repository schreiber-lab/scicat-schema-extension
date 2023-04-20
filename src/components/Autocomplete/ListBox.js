import { forwardRef } from 'react';
import cn from 'classnames';
import { makeStyles } from '@material-ui/core';
import { Scrollbars } from '../Scrollbars';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column'
  }
});

export const ListBox = forwardRef(({ children, className, onScroll, ...props }, ref) => {
  const classes = useStyles();

  return (
    <div ref={ref} className={cn(classes.root, className)} {...props}>
      <Scrollbars autoHeight ref={ref} onScroll={onScroll} style={{ flexGrow: 1 }}>
        {children}
      </Scrollbars>
    </div>
  );
});