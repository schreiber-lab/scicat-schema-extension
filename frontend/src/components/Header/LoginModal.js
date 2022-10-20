import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Typography,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { preventDefault } from "../../helpers/preventDefault";
import { yupResolver } from "../../utils/validation";
import { Yup } from "../../utils/validation";
import * as authApi from "../../api/auth";
import { loginSuccess } from "../../redux/auth/actions";
import { TextField } from "../TextField";
import { PasswordField } from "../PasswordField";

const defaultValues = {
  username: null,
  password: null,
};

const validationSchema = Yup.object({
  username: Yup.string().required(),
  password: Yup.string().required(),
});

export const LoginModal = ({ isOpen, onClose }) => {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const handleSubmit = (data) => {
    setIsSubmitting(true);

    authApi
      .login(data)
      .then((data) => {
        dispatch(loginSuccess(data));
        navigate("/datasets");
        onClose();
        //redirect to the datasets
      })
      .catch((error) => {
        setError("Could not log in. Check your username and password");
        console.log(error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <form onSubmit={preventDefault(form.handleSubmit(handleSubmit))}>
        <DialogTitle>SciCat</DialogTitle>

        <DialogContent>
          <DialogContentText>Log in to see the datasets</DialogContentText>
          <Typography color="error"> {error}</Typography>

          <FormProvider {...form}>
            <TextField
              required
              fullWidth
              autoFocus
              margin="dense"
              name="username"
              label="Username"
              placeholder="Enter your username..."
            />

            <PasswordField
              required
              fullWidth
              margin="dense"
              name="password"
              label="Password"
              placeholder="Enter the password..."
            />
          </FormProvider>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>

          <Button type="submit" color="primary" variant="contained">
            Log in
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
