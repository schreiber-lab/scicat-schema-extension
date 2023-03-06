import { Fab, Box } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

export const CreateMDSchemaButton = () => {
  return (
    <Box>
      <Fab color="primary">
        <AddIcon />
      </Fab>
    </Box>
  );
};
