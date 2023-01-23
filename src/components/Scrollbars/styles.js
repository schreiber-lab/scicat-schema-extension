export const styles = ({ palette: { grey }, transitions, zIndex }) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
  
      '& > *': {
        flexGrow: 1
      }
    },
  
    track: {
      zIndex: zIndex.appBar,
      opacity: 0.6,
      borderRadius: 3,
      cursor: 'pointer',
      transition: transitions.create([ 'opacity', 'background' ]),
  
      '&:hover': {
        opacity: 1,
        background: grey[300]
      }
    },
  
    track_horizontal: {
      left: 0,
      right: 0,
      bottom: 0
    },
  
    track_vertical: {
      top: 0,
      bottom: 0,
      right: 0
    },
  
    thumb: {
      background: grey[500],
      borderRadius: 3,
      transition: transitions.create('background'),
  
      '&:hover': {
        background: grey[600]
      }
    }
  });
  
