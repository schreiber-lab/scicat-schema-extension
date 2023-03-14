// import { useContext } from "react";
import { Box, IconButton, TableCell, TableRow } from "@material-ui/core";
import { useWatch, useFormContext } from "react-hook-form";
import { stopPropagation } from "../../../../helpers/stopPropagation";
// import { KeysContext } from "../../../keys/KeysProvider";
import { Radio } from "../../../../components";
import { useModal } from "../../../../components";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { DeleteMDSchemaModal } from "./DeleteMDSchemaModal";
import { EditMDSchemaModal } from "./EditMDSchemaModal";

export const Row = ({ field, schemaName }) => {
  const { openModal } = useModal();
  // const { editKey, deleteKey } = useContext(KeysContext);


  // React Hook Form
  const formContext = useFormContext();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const isFixedValueEntries = !!(formContext && useWatch({ name: "fixed_value_entries" }));
  console.log(field);
  

  const openEditModal = () => {
    openModal(EditMDSchemaModal, {
      payload: {
        field,
        schemaName
      },
      onModalResolved: (field) => {
        // editKey(field);
      },
    });
  };

  const openDeleteModal = () => {
    openModal(DeleteMDSchemaModal, {
      payload: {
        field,
      },
      onModalResolved: (field) => {
        // deleteKey(field);
      },
    });
  };

  return (
    <TableRow>
      {isFixedValueEntries && (
        <TableCell>
          <Radio name="id_key" value={field.key_name} />
        </TableCell>
      )}
      <TableCell>{field.key_name}</TableCell>
      <TableCell>{field.type}</TableCell>
      <TableCell>{field.unit || "-"}</TableCell>
      <TableCell>{String(field.required)}</TableCell>
      <TableCell>{String(field.scan_ref)}</TableCell>
      <TableCell>{String(field.changes_likely)}</TableCell>
      <TableCell>{field.allowed?.join(", ") || "-"}</TableCell>
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
