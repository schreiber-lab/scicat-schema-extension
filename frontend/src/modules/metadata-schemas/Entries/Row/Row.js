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

export const Row = ({ field, schema, entriesProps}) => {
  const { openModal } = useModal();
  const dispatch = useDispatch();
  const schemaName = schema.schema_name;
  const entryId = field[schema.id_key];

  const openEditModal = () => {
    openModal(EditEntryModal, {
      payload: {
        field,
        schema
      },
      onModalResolved: (updatedEntry) => {
        dispatch(editFixedValueEntry({ schemaName, entryId, updatedEntry }));
      },
    });
  };
  
  const openDeleteModal = () => {
    openModal(DeleteEntryModal, {
      payload: {
        field,
        schemaName,
        entryId
      },
      onModalResolved: () => {
        dispatch(deleteFixedValueEntry({ schema, entryId }));
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
