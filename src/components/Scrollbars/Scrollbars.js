import { forwardRef, useEffect, useRef } from 'react';
import T from 'prop-types';
import cn from 'classnames';
import { Scrollbars as RCS } from 'react-custom-scrollbars';
import { makeStyles } from '@material-ui/core';
import { styles } from './styles';

const useStyles = makeStyles(styles);

const propTypes = {
  children: T.node,
  className: T.string,
  containerRef: T.oneOfType([
    T.func,
    T.shape({ current: T.instanceOf(Element) })
  ]),
  viewRef: T.oneOfType([
    T.func,
    T.shape({ current: T.instanceOf(Element) })
  ])
};

export const Scrollbars = forwardRef(({
  className,
  children,
  containerRef,
  viewRef,

  ...props
}, ref) => {
  const classes = useStyles();
  const scrollbarsRef = useRef();

  useEffect(() => {
    const scrollbars = scrollbarsRef.current;

    if (scrollbars && scrollbars.container && scrollbars.view) {
      if (containerRef) containerRef.current = scrollbars.container;
      if (viewRef) viewRef.current = scrollbars.view;
    }
  }, []);

  return (
    <RCS
      ref={(node) => {
        if (ref) {
          ref.current = node;
        }
        
        scrollbarsRef.current = node;
      }}
      autoHeightMax="100%" 
      className={cn(classes.root, className)}
      renderTrackHorizontal={(props) => <div {...props} className={cn(classes.track, classes.track_horizontal)} />}
      renderTrackVertical={(props) => <div {...props} className={cn(classes.track, classes.track_vertical)} />}
      renderThumbHorizontal={(props) => <div {...props} className={classes.thumb} />}
      renderThumbVertical={(props) => <div {...props} className={classes.thumb} />}

      {...props}
    >
      {children}
    </RCS>
  );
});

Scrollbars.propTypes = propTypes;
