import { useDispatch } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { preventDefault } from "../../helpers/preventDefault";
import { yupResolver } from "../../utils/validation";
import * as samplesApi from "../../api/samples";
import { addSample } from "../../redux/samples/actions";
import { validationSchema, SampleForm } from "./SampleForm";

const defaultValues = {
  description: null,
  owner: null,
  ownerGroup: null,
};

export const FormModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const form = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const handleSubmit = (data) => {
    samplesApi
      .createSample(data)
      .then((data) => {
        dispatch(addSample(data));
        onClose();
      })
      .catch(() => {});
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <form onSubmit={preventDefault(form.handleSubmit(handleSubmit))}>
        <DialogTitle>Sample Entry</DialogTitle>

        <DialogContent>
          <FormProvider {...form}>
            <SampleForm/>
          </FormProvider>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} variant="outlined" color="primary">
            Close
          </Button>

          <Button type="submit" color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
