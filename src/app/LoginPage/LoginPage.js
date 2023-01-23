import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { LoginModal } from "../../components/Header/LoginModal";
// import backgroundPicture from "./img/main.jpg";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    // background: `url(${backgroundPicture}) center / cover no-repeat`,
  },
}));

export const LoginPage = () => {
  const isAuthenticated = useSelector(({ auth }) => auth.isAuthenticated);
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleLoginModalClose = () => {
    setOpen(false);
  };

  return (
    <Container className={classes.root}>
      {isAuthenticated ? (
        <Navigate to="/datasets" />
      ) : (
        <LoginModal isOpen={open} onClose={handleLoginModalClose} />
      )}
    </Container>
  );
};
