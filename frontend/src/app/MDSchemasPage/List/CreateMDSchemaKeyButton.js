import { IconButton, Fab, Box } from "@material-ui/core";
import { stopPropagation } from "../../../helpers/stopPropagation";
import { CreateMDSchemaKeyModal } from "./CreateMDSchemaKeyModal";
import AddIcon from "@material-ui/icons/Add";
import { useModal } from "../../../components";
import { useDispatch } from "react-redux";
import { addSchemaKey } from "../../../redux/md-schemas/actions";

export const CreateMDSchemaKeyButton = ({ schemaName }) => {
  const { openModal } = useModal();
  const dispatch = useDispatch();

  const openCreateModal = () => {
    openModal(CreateMDSchemaKeyModal, {
      payload: {
        schemaName
      },
      onModalResolved: (field) => {
        dispatch(addSchemaKey({ schemaName }));
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
