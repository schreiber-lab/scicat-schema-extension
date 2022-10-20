export const DEFAULT_SPINNER_SIZE = 40;
export const DEFAULT_SPINNER_THICKNESS = 3.6;

const getSpinnerThickness = ({ size = DEFAULT_SPINNER_SIZE, thickness = DEFAULT_SPINNER_THICKNESS } = {}) => {
  const percents = 100 - (thickness / (size / 100));

  return size - size / 100 * percents;
};

export const styles = ({ palette }) => ({
  root: {
    position: 'relative',
    display: 'inline-block',
    width: '100%',
    minHeight: (spinnerSize) => spinnerSize
  },

  root_surface: {
    width: ({ fullWidth }) => !fullWidth && 'auto',
    height: ({ fullHeight }) => fullHeight && '100%',

    '& $spinnerWrapper': {
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    }
  },

  spinnerWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  content: {
    height: ({ fullHeight }) => fullHeight && '100%',
    opacity: 0.6,
    filter: 'blur(3px)'
  },

  loader: {
    boxShadow: ({ spinnerSize, thickness }) => {
      return `inset 0 0 0 ${getSpinnerThickness({ size: spinnerSize, thickness })}px rgba(0, 0, 0, 0.15)`;
    },
    color: ({ color }) => palette[color] && palette[color].main
  }
});
