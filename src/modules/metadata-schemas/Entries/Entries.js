import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Row } from "./Row";

const useStyles = makeStyles(({ palette }) => ({
  tableHeaderCell: {
    fontWeight: "bold",
    backgroundColor: palette.primary.dark,
    color: palette.getContrastText(palette.primary.dark),
  },
}));

export const Entries = ({ entries }) => {
  const classes = useStyles();

  return !entries?.length ? (
    <Typography>Entries weren't found</Typography>
  ) : (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}>Full name</TableCell>

            <TableCell className={classes.tableHeaderCell}>
              Material id
            </TableCell>

            <TableCell className={classes.tableHeaderCell}>Formula</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {entries?.map((entry) => (
            <Row key={entry.full_name} field={entry} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
