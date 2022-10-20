import { createRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRoutes, useSearchParams } from "react-router-dom";
import jss from "jss";
import preset from "jss-preset-default";
import { SnackbarProvider } from "notistack";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import {
  createMuiTheme,
  CssBaseline,
  Box,
  IconButton,
} from "@material-ui/core";
import { StylesProvider, ThemeProvider } from "@material-ui/styles";
import Close from "@material-ui/icons/Close";
import { Header } from "../components/Header";
import { ModalsProvider } from "../components";
import { loginSuccess } from "../redux/auth/actions";
import { theme } from "../theme";
import { routes } from "./routes";

jss.setup(preset());

const authTokenKey = "auth_token";

function App() {
  const isAuthenticated = useSelector(({ auth }) => auth.isAuthenticated);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const authToken = searchParams.get(authTokenKey);
  const routesElement = useRoutes(routes({ isAuthenticated }));
  const notistackRef = createRef();
  const onClickDismiss = (key) => () => {
    notistackRef.current.closeSnackbar(key);
  };

  useEffect(() => {
    if (authToken) {
      dispatch(loginSuccess({ id: authToken }));
      searchParams.delete(authTokenKey);
      setSearchParams(searchParams);
    }
  }, [authToken]);

  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={createMuiTheme(theme)}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <SnackbarProvider
            hideIconVariant
            maxSnack={3}
            ref={notistackRef}
            action={(key) => (
              <IconButton color="inherit" onClick={onClickDismiss(key)}>
                <Close />
              </IconButton>
            )}
          >
            <ModalsProvider>
              <Box display="flex" flexDirection="column" height="100%">
                <Header />
                {routesElement}
                <CssBaseline />
              </Box>
            </ModalsProvider>
          </SnackbarProvider>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </StylesProvider>
  );
}

export default App;
