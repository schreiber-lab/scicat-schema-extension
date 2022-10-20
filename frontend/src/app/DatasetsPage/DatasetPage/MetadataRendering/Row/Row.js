import { TableCell, TableRow, Typography  } from "@material-ui/core";

export const Row = ({ name, value }) => {
  return (
    <TableRow>
      <TableCell component="th">
        <Typography color="primary" variant="subtitle2">
          {name} 
        </Typography>
      </TableCell>

      <TableCell>
        <Typography color="primary" variant="subtitle2">
          {value} 
        </Typography>
      </TableCell>
    </TableRow>
  );
};
