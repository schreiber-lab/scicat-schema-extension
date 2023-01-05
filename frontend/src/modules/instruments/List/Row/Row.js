import { TableCell, TableRow, Typography } from "@material-ui/core";

export const Row = ({ sample, onSampleSelect, ...props }) => {
  const handleSampleClick = () => {
    onSampleSelect(sample);
  };

  return (
    <TableRow {...props} onClick={handleSampleClick}>
      <TableCell component="th" scope="row">
        <Typography color="primary" variant="subtitle2">
          {sample.sampleId}
        </Typography>
      </TableCell>

      <TableCell align="right">{sample.description}</TableCell>
      <TableCell align="right">{sample.owner}</TableCell>

      <TableCell align="right">
        <Typography color="primary" variant="subtitle2">
          {sample.creationTime}
        </Typography>
      </TableCell>

      <TableCell align="right">{sample.ownerGroup}</TableCell>
    </TableRow>
  );
};
