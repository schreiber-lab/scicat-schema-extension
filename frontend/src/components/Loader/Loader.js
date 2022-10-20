import { useState, useEffect, useRef } from 'react';
import T from 'prop-types';
import cn from 'classnames';
import { makeStyles, useTheme, CircularProgress, Box } from '@material-ui/core';
import { styles, DEFAULT_SPINNER_SIZE, DEFAULT_SPINNER_THICKNESS } from './styles';

const useStyles = makeStyles(styles);

const propTypes = {
  loading: T.bool,
  render: T.func,
  surface: T.bool,
  fullWidth: T.bool,
  fullHeight: T.bool,
  inset: T.bool,
  thickness: T.number
};

export const Loader = ({
  loading = true,
  color = 'primary',
  variant,
  size,
  value,
  surface,
  fullWidth,
  fullHeight,
  inset = true,
  render = () => null,
  thickness = DEFAULT_SPINNER_THICKNESS,
  className,

  ...props
}) => {
  const [ spinnerSize, setSpinnerSizeState ] = useState(DEFAULT_SPINNER_SIZE);
  const classes = useStyles({ fullWidth, fullHeight, color, spinnerSize, thickness });
  const theme = useTheme();
  const rootRef = useRef();

  const setSpinnerSize = () => {
    if (loading) {
      const rootEl = rootRef.current;
      const spacing = theme.spacing();
      const width = rootEl.clientWidth;
      const height = rootEl.clientHeight;
      const smallerSide = ((width - height) <= 0 ? width : height) - spacing;
      const spinnerSize = (smallerSide < DEFAULT_SPINNER_SIZE) && surface ? smallerSide : DEFAULT_SPINNER_SIZE;

      setSpinnerSizeState(spinnerSize + (surface ? spacing * (inset ? -0.5 : 1) : 0));
    }
  };

  useEffect(() => {
    if (loading && !size) {
      setSpinnerSize();
    }
  }, [ loading ]);

  return (
    loading ?
      <Box
        ref={rootRef}
        className={cn(classes.root, { [classes.root_surface]: surface }, className)}
        {...props}
      >
        <div className={classes.content}>
          {inset && surface && render()}
        </div>

        <div className={classes.spinnerWrapper}>
          <CircularProgress
            variant={variant}
            value={value}
            size={size || spinnerSize}
            thickness={thickness}
            className={classes.loader}
          />
        </div>

        {!inset && surface && render()}
      </Box>
    :
      render()
  );
};

Loader.propTypes = propTypes;
