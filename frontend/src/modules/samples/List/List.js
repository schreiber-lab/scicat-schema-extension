import { useEffect, useContext } from "react";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
  Typography,
  Container,
} from "@material-ui/core";
import { Row } from "./Row";
import { SamplesContext } from "../SamplesProvider";

const useStyles = makeStyles(({ palette }) => ({
  tableHeaderCell: {
    fontWeight: "bold",
    backgroundColor: palette.primary.dark,
    color: palette.getContrastText(palette.primary.dark),
    wordWrap: "break-word",
    maxWidth: 200,
  },
}));

export const List = ({ onSampleSelect }) => {
  const classes = useStyles();
  const { isLoaded, samples, getSamples } = useContext(SamplesContext);

  useEffect(() => {
    getSamples();
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
                <Row
                  key={sample.sampleId}
                  sample={sample}
                  onSampleSelect={onSampleSelect}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};
