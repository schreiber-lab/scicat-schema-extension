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
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getProposals } from "../../../redux/proposals/operations";
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
  const { isLoaded, proposals } = useSelector(({ proposals }) => proposals);

  useEffect(() => {
    dispatch(getProposals());
  }, []);

  return (
    <Container className={classes.root}>
      {!isLoaded ? (
        <LinearProgress />
      ) : !proposals.length ? (
        <Typography align="center" variant="h3">
          No proposals found
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHeaderCell}>
                  Proposal ID
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>Title</TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  First Name
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Last Name
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Start Date
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  End Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {proposals.map((proposal) => (
                <Row key={proposal.proposalId} proposal={proposal} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};
