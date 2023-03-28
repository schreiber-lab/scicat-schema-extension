import { useDispatch } from "react-redux";
import { IconButton, Fab, Box } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { stopPropagation } from "../../../helpers/stopPropagation";
import { useModal } from "../../../components";
import { addSchemaKey } from "../../../redux/md-schemas/actions";
import { CreateMDSchemaKeyModal } from "./CreateMDSchemaKeyModal";

export const CreateMDSchemaKeyButton = ({ schemaName }) => {
  const { openModal } = useModal();
  const dispatch = useDispatch();

  const openCreateModal = () => {
    openModal(CreateMDSchemaKeyModal, {
      payload: {
        schemaName
      },
      onModalResolved: (newKey) => {
        dispatch(addSchemaKey({ schemaName, newKey }));
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
