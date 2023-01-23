import { useContext } from "react";
import { Box, Container, TextField } from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { DatasetsContext, initialState } from "../../../modules/datasets";

export const SearchDatasetBox = () => {
  const { applyFilter } = useContext(DatasetsContext);
  const form = useForm({
    defaultValues: initialState.filter,
  });

  const handleDatasetNameChange = ({ target: { value } }) => {
    applyFilter({ datasetName: value });
  };

  return (
    <Container>
      <form noValidate>
        <FormProvider {...form}>
          <Box maxWidth={300} mx="auto" marginBottom={3}>
            <TextField
              fullWidth
              margin="dense"
              name="datasetName"
              label="Dataset name"
              placeholder="Enter dataset name..."
              onChange={handleDatasetNameChange}
            />
          </Box>
        </FormProvider>
      </form>
    </Container>
  );
};
