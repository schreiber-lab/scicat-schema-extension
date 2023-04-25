import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { preventDefault } from "../../../helpers/preventDefault";
// import { yupResolver } from "../../../utils/validation";
import * as mdschemasApi from "../../../api/md-schemas";
import { MDSchemaKeyForm } from "./MDSchemaKeyForm";

export const CreateMDSchemaKeyModal = ({
  payload: { schemaName },
  DialogProps,
  handleModalResolve,
  handleModalReject,
}) => {
  const fieldNamePrefix = "new_key_details.";
  const form = useForm({
    defaultValues: {
      key_name: null,
      schema_name: schemaName,
      new_key_details: {},
      withPredefinedValues: false,
      withUnit: false,
    },
    // resolver: yupResolver(validationSchema),
  });

  const handleSubmit = (values) => {
    // if (!values.withPredefinedValues) {
    //   values.new_key_details.allowed = [];
    // }

    delete values.withPredefinedValues;
    delete values.withUnit;
  
    const data = {
      ...values,

      key_name: values.new_key_details.key_name,
    };

    return mdschemasApi.createMDSchemaKey(data).then(() => {
      handleModalResolve(data.new_key_details);
    });
  };

  return (
    <Dialog {...DialogProps}>
      <form
        noValidate
        onSubmit={preventDefault(form.handleSubmit(handleSubmit))}
      >
        <DialogTitle>Add new key</DialogTitle>

        <DialogContent>
          <FormProvider {...form}>
            <MDSchemaKeyForm fieldNamePrefix={fieldNamePrefix} />
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
            Add key
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
