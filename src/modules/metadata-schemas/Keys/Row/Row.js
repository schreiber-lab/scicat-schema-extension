
import { useContext } from "react";
import { IconButton, TableCell, TableRow } from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { stopPropagation } from "../../../../helpers/stopPropagation";
import { useWatch, useFormContext } from "react-hook-form";
import { useModal } from "../../../../components";
import { KeysContext } from "../../../keys/KeysProvider";
import { Radio } from "../../../../components";
import { EditKeyModal } from "./EditKeyModal";

export const Row = ({ field, ...props }) => {  
  // React Hook Form
  const formContext = useFormContext();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const isFixedValueEntries = !!(formContext && useWatch({ name: "fixed_value_entries"}));
  console.log(isFixedValueEntries)
  const { openModal } = useModal();
  const { editKey } = useContext(KeysContext);

  const openEditModal = () => {
    openModal(EditKeyModal, {
      payload: {
        field,
      },
      onModalResolved: (field) => {
        editKey(field);
      },
    });
  };

  return (
    <TableRow {...props}>
      {isFixedValueEntries && <TableCell><Radio name="id_key" value={field.key_name}/></TableCell>}

      <TableCell>{field.key_name}</TableCell>
      <TableCell>{field.type}</TableCell>
      <TableCell>{field.unit || "-"}</TableCell>
      <TableCell>{String(field.required)}</TableCell>
      <TableCell>{String(field.scan_ref)}</TableCell>
      <TableCell>{String(field.changes_likely)}</TableCell>
      <TableCell>{field.allowed?.join(", ") || "-"}</TableCell>
      <TableCell align="right">
        <IconButton onClick={stopPropagation(openEditModal)}>
          <EditOutlinedIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
