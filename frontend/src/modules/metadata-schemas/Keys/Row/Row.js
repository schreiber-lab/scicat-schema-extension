import { TableCell, TableRow } from "@material-ui/core";
import { useWatch, useFormContext } from "react-hook-form";
import { Radio } from "../../../../components";

export const Row = ({ field }) => {  
  // React Hook Form
  const formContext = useFormContext();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const isFixedValueEntries = !!(formContext && useWatch({ name: "fixed_value_entries"}));
  console.log(isFixedValueEntries)
  return (
    <TableRow>
      {isFixedValueEntries && <TableCell><Radio name="id_key" value={field.key_name}/></TableCell>}

      <TableCell>{field.key_name}</TableCell>
      <TableCell>{field.type}</TableCell>
      <TableCell>{field.unit || "-"}</TableCell>
      <TableCell>{String(field.required)}</TableCell>
      <TableCell>{String(field.scan_ref)}</TableCell>
      <TableCell>{String(field.changes_likely)}</TableCell>
      <TableCell>{field.allowed?.join(", ") || "-"}</TableCell>
    </TableRow>
  );
};
