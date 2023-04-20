import { Component } from 'react';
import { Typography, Box } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import { Loader } from '../Loader';
import { SvgIcon } from '../SvgIcon';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  };

  componentDidCatch(error, errorInfo) {
    // eslint-disable-next-line no-console
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          p={3}
        >
          <Box pb={1}>
            <Loader surface inset={false} color="error" render={
              () => (
                <SvgIcon color="warning" fontSize="large">
                  <ErrorIcon />
                </SvgIcon>
              )}
            />
          </Box>

          <Typography gutterBottom variant="h3" color="error">
            Sorry for the inconvenience!
          </Typography>

          <Typography variant="subtitle1" color="error">
            We know about the error, and are already actively working on its solution.
          </Typography>
        </Box>
      );
    }

    return this.props.children;
  }
}
