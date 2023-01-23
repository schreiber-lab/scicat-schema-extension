import { useContext } from "react";
import { Box, Container, TextField } from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { SamplesContext, initialState } from "../../modules/samples";

export const SearchSampleBox = () => {
  const { applyFilter } = useContext(SamplesContext);
  const form = useForm({
    defaultValues: initialState.filter,
  });

  const handleSampleNameChange = ({ target: { value } }) => {
    applyFilter({ sampleId: value });
  };

  return (
    <Container>
      <form noValidate>
        <FormProvider {...form}>
          <Box maxWidth={300} mx="auto" marginBottom={3}>
            <TextField
              fullWidth
              margin="dense"
              name="sampleId"
              label="Sample id"
              placeholder="Enter sample name..."
              onChange={handleSampleNameChange}
            />
          </Box>
        </FormProvider>
      </form>
    </Container>
  );
};
