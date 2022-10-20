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
import { useWatch, useFormContext } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { Row } from "./Row";

const useStyles = makeStyles(({ palette }) => ({
  tableHeaderCell: {
    fontWeight: "bold",
    backgroundColor: palette.primary.dark,
    color: palette.getContrastText(palette.primary.dark),
  },
}));

export const Keys = ({ keys }) => {
  const classes = useStyles();
  // React Hook Form
  const formContext = useFormContext();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const isFixedValueEntries = !!(formContext && useWatch({ name: "fixed_value_entries"}));

  return !keys?.length ? (
    <Typography>Keys weren't found</Typography>
  ) : (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {isFixedValueEntries && <TableCell className={classes.tableHeaderCell}>Id key</TableCell>}

            <TableCell className={classes.tableHeaderCell}>Key name</TableCell>

            <TableCell className={classes.tableHeaderCell}>Type</TableCell>

            <TableCell className={classes.tableHeaderCell}>Unit</TableCell>

            <TableCell className={classes.tableHeaderCell}>Required</TableCell>

            <TableCell className={classes.tableHeaderCell}>Scan ref</TableCell>

            <TableCell className={classes.tableHeaderCell}>
              Changes likely
            </TableCell>

            <TableCell className={classes.tableHeaderCell}>Allowed</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {keys?.map((key) => (
            <Row key={key.key_name} field={key} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
