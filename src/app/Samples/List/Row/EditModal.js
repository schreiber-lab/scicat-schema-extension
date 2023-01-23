import { useDispatch } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { preventDefault } from "../../../../helpers/preventDefault";
import { yupResolver } from "../../../../utils/validation";
import { editSample } from "../../../../redux/samples/actions";
import * as samplesApi from "../../../../api/samples";
import { SampleForm, validationSchema } from '../../SampleForm'

export const EditModal = ({ sample, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const form = useForm({
    defaultValues: sample,
    resolver: yupResolver(validationSchema),
  });


  const handleSubmit = (data) => {
    samplesApi
      .editSample(data)
      .then((data) => {
        dispatch(editSample(data));
        onClose();
      })
      .catch(() => {});
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <form onSubmit={preventDefault(form.handleSubmit(handleSubmit))}>
        <DialogTitle>Are you sure you want to edit this sample?</DialogTitle>

        <DialogContent>
          <FormProvider {...form}>
            <SampleForm/>
          </FormProvider>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} variant="outlined" color="primary">
            Cancel
          </Button>

          <Button type="submit" color="primary" variant="contained">
            Edit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
