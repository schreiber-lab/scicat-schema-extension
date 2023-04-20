import { merge } from "lodash";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { preventDefault } from "../../../helpers/preventDefault";
import { yupResolver } from "../../../utils/validation";
import { TextField } from "../../../components";
import { validationSchema } from "./validationSchema";

const defaultValues = {
  _id: {
    pid: null,
    name: null,
  },
};

export const AddTechniqueModal = ({
  DialogProps,
  payload: { initialValues = {} },
  handleModalResolve,
  handleModalReject,
}) => {
  const form = useForm({
    defaultValues: merge(
      defaultValues,
      initialValues,
    ),
    resolver: yupResolver(validationSchema),
  });

  const handleSubmit = (data) => {
    console.log(data);
    handleModalResolve(data);
  };

  return (
    <Dialog {...DialogProps}>
      <form
        noValidate
        onSubmit={preventDefault(form.handleSubmit(handleSubmit))}
      >
        <DialogContent>
          <FormProvider {...form}>
            <TextField
              required
              fullWidth
              name="_id.pid"
              label="PID"
              placeholder="Enter PID..."
              margin="dense"
            />

            <TextField
              required
              fullWidth
              name="_id.name"
              label="Name"
              placeholder="Enter name..."
              margin="dense"
            />
          </FormProvider>
        </DialogContent>

        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleModalReject}
          >
            Cancel
          </Button>

          <Button type="submit" color="primary" variant="contained">
            Add technique
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
