import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { AppBar, Toolbar, Typography, Button, Grid } from "@material-ui/core";
import { actions } from "../../redux/auth";
import { env } from "../../env";
import { LoginModal } from "./LoginModal";
import { Menu } from "./Menu";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(3),
    textDecoration: "none",
  },
}));

export const Header = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const openLoginModal = () => {
    setOpen(true);
  };

  const handleLoginModalClose = () => {
    setOpen(false);
  };

  const handleAboutClick = () => {
    window.open(`${env.REACT_APP_API_URL2}/about/`);
  };

  const handleHelpClick = () => {
    window.open(`${env.REACT_APP_API_URL2}/help/`);
  };

  const logOut = () => {
    dispatch(actions.logOut());
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Menu />

        <Grid container spacing={2} alignItems="center">
          <Typography
            component={Link}
            to="/datasets"
            color="inherit"
            variant="h6"
            className={classes.title}
          >
            SciCat Ingest Extension v{process.env.REACT_APP_VERSION}
          </Typography>

          <Grid item onClick={handleHelpClick}>
            <Button color="inherit" variant="outlined">
              Help
            </Button>
          </Grid>
          <Grid item onClick={handleAboutClick}>
            <Button color="inherit" variant="outlined">
              About
            </Button>
          </Grid>

          <Grid item>
            {isAuthenticated ? (
              <Button color="secondary" variant="contained" onClick={logOut}>
                Log out
              </Button>
            ) : (
              <Button
                color="secondary"
                variant="contained"
                onClick={openLoginModal}
              >
                Sign in
              </Button>
            )}

            <LoginModal isOpen={open} onClose={handleLoginModalClose} />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
