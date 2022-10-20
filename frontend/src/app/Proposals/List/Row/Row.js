import { TableCell, TableRow, Typography } from "@material-ui/core";

export const Row = ({ proposal }) => {

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        <Typography color="primary" variant="subtitle2">
          {proposal.proposalId}
        </Typography>
      </TableCell>
      <TableCell component="th" scope="row">
        <Typography color="primary" variant="subtitle2">
          {proposal.title}
        </Typography>
      </TableCell>
      <TableCell component="th" scope="row">
        <Typography color="primary" variant="subtitle2">
          {proposal.firstname}
        </Typography>
      </TableCell>
      <TableCell component="th" scope="row">
        <Typography color="primary" variant="subtitle2">
          {proposal.lastname}
        </Typography>
      </TableCell>
      <TableCell component="th" scope="row">
        <Typography color="primary" variant="subtitle2">
          {proposal.startTime ? new Date(proposal.startTime).toLocaleDateString('en-US') : "-"}
        </Typography>
      </TableCell>
      <TableCell component="th" scope="row">
        <Typography color="primary" variant="subtitle2">
        { proposal.endTime ? new Date(proposal.endTime).toLocaleDateString('en-US') : "-"}
        </Typography>
      </TableCell>
    </TableRow>
  );
};
