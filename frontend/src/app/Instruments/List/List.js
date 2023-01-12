import { useEffect, useContext } from "react";
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
import { InstrumentsContext } from "../../../modules/instruments/InstrumentsProvider";
// import { Row } from "./Row";
import { RowWithContext } from "./Row/RowWithContext";

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
  const {
    isLoaded,
    instruments,
    getInstruments,
  } = useContext(InstrumentsContext);


  useEffect(() => {
    getInstruments();
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
                <TableCell
                  align="right"
                  className={classes.tableHeaderCell}
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {instruments.map((instrument) => (
                <RowWithContext key={instrument.pid} instrument={instrument} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};
