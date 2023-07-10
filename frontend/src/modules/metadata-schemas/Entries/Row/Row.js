import { Box, IconButton, TableCell, TableRow } from "@material-ui/core";
import { stopPropagation } from "../../../../helpers/stopPropagation";
import { useModal } from "../../../../components";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { useDispatch } from "react-redux";
import { DeleteEntryModal } from "./DeleteEntryModal";
import { EditEntryModal } from "./EditEntryModal";
import { deleteFixedValueEntry } from "../../../../redux/fixed-value-entries/actions";
import { editFixedValueEntry } from "../../../../redux/fixed-value-entries/actions";

export const Row = ({ field, schemaName, entriesProps, index }) => {
  const { openModal } = useModal();
  const dispatch = useDispatch();

  const openEditModal = () => {
    openModal(EditEntryModal, {
      payload: {
        field,
        schemaName
      },
      onModalResolved: (updatedEntry) => {
        dispatch(editFixedValueEntry({ updatedEntry, updatedEntryIndex: index }));
      },
    });
  };
  
  const openDeleteModal = () => {
    openModal(DeleteEntryModal, {
      payload: {
        field,
        schemaName
      },
    onModalResolved: () => {
        dispatch(deleteFixedValueEntry(index));
      },
    });
  };

  return (
    <TableRow>
      {entriesProps.map((property) => {
        const isObject = typeof field[property] === "object";
        const value = isObject
          ? JSON.stringify(field[property], null, " ").replaceAll('"', "")
          : field[property];

        return   <TableCell key={property}>{value || "-"} </TableCell>
       
      })}
       <TableCell >
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={stopPropagation(openEditModal)}>
            <EditOutlinedIcon />
          </IconButton>

          <IconButton onClick={stopPropagation(openDeleteModal)}>
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>
  );
};
