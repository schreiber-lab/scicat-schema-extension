import { TableCell, TableRow } from "@material-ui/core";

export const Row = ({ field, entriesProps }) => {
  return (
    <TableRow>
      {entriesProps.map((property) => {
        const isObject = typeof field[property] === "object";
        const value = isObject
          ? JSON.stringify(field[property], null, " ").replaceAll('"', "")
          : field[property];

        return <TableCell key={property}>{value || "-"}</TableCell>;
      })}
    </TableRow>
  );
};
