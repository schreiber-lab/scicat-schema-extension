import { Link } from "react-router-dom";
import { Fab, Box } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

export const CreateDatasetButton = () => {
  return (
    <Box position="fixed" bottom={16} right={32}>
      <Fab color="primary" component={Link} to="/dataset-creation">
        <AddIcon />
      </Fab>
    </Box>
  );
};
