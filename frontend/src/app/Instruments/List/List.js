import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  LinearProgress,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getInstruments } from "../../../redux/instruments/operations";
import { Row } from "./Row";

const useStyles = makeStyles(({ palette, spacing }) => ({
  root: {
    margin: spacing(2.5, 10),
    maxWidth: 1100,
  },
  tableHeaderCell: {
    fontWeight: "bold",
    backgroundColor: palette.primary.dark,
    color: palette.getContrastText(palette.primary.dark),
  },
}));

export const List = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isLoaded, instruments } = useSelector(
    ({ instruments }) => instruments
  );

  useEffect(() => {
    dispatch(getInstruments());
  }, []);

  return (
    <Container className={classes.root}>
      {!isLoaded ? (
        <LinearProgress />
      ) : !instruments.length ? (
        <Typography align="center" variant="h3">
          No instruments found
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHeaderCell}>Name</TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Custom Metadata
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {instruments.map((instrument) => (
                <Row key={instrument.pid} instrument={instrument} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};
