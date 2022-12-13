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
import { getSamples } from "../../../redux/samples/operations";
import { Row } from "./Row";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ palette, spacing }) => ({
  root: {
    marginTop: spacing(2.5),
  },
  tableHeaderCell: {
    fontWeight: "bold",
    backgroundColor: palette.primary.dark,
    color: palette.primary.contrastText,
  },
}));

export const List = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isLoaded, samples } = useSelector(({ samples }) => samples);

  useEffect(() => {
    dispatch(getSamples());
  }, []);

  return (
    <Container className={classes.root}>
      {!isLoaded ? (
        <LinearProgress />
      ) : !samples.length ? (
        <Typography align="center" variant="h3">
          No samples found
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHeaderCell}>
                  Sample Id
                </TableCell>
                <TableCell align="right" className={classes.tableHeaderCell}>
                  Description
                </TableCell>
                <TableCell align="right" className={classes.tableHeaderCell}>
                  Owner
                </TableCell>
                <TableCell align="right" className={classes.tableHeaderCell}>
                  Creation Time
                </TableCell>
                <TableCell align="right" className={classes.tableHeaderCell}>
                  Owner Group
                </TableCell>
                <TableCell
                  align="right"
                  className={classes.tableHeaderCell}
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {samples.map((sample) => (
                <Row key={sample.sampleId} sample={sample} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};
