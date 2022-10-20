import { TableCell, TableRow, Typography } from "@material-ui/core";

export const Row = ({ instrument }) => {
  const facility = instrument.customMetadata?.facility;

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        <Typography color="primary" variant="subtitle2">
          {instrument.name}
        </Typography>
      </TableCell>
      {/* <TableCell>facility:{instrument.name} :</TableCell> */}
      <TableCell>{facility?.value || "-"}</TableCell>
    </TableRow>
  );
};
