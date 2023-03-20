import { IconButton, Fab, Box } from "@material-ui/core";
import { stopPropagation } from "../../../helpers/stopPropagation";
import { CreateMDSchemaKeyModal } from "./CreateMDSchemaKeyModal";
import AddIcon from "@material-ui/icons/Add";
import { useModal } from "../../../components";

export const CreateMDSchemaKeyButton = ({ field, schemaName }) => {
  const { openModal } = useModal();

  const openCreateModal = () => {
    openModal(CreateMDSchemaKeyModal, {
      payload: {
        field,
        schemaName
      },
      onModalResolved: (field) => {
        // createKey(field);
      },
    });
  }; 

  return (
    <Box display="flex" justifyContent="flex-end">
      <Fab>
        <IconButton onClick={stopPropagation(openCreateModal)}>
          <AddIcon />
        </IconButton>
      </Fab>
    </Box>
  );
};
