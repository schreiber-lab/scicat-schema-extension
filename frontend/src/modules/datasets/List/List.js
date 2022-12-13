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
} from "@material-ui/core";
import { Row } from "./Row";
import { DatasetsContext } from "../DatasetsProvider";
import { TablePagination } from "../../../components/TablePagination";

const useStyles = makeStyles(({ palette }) => ({
  tableHeaderCell: {
    fontWeight: "bold",
    backgroundColor: palette.primary.dark,
    color: palette.getContrastText(palette.primary.dark),
    wordWrap: "break-word",
    maxWidth: 200,
  },
}));

export const List = ({ onDatasetSelect }) => {
  const classes = useStyles();
  const {
    isLoaded,
    datasets,
    pagination,
    getDatasets,
    handlePaginationChange,
  } = useContext(DatasetsContext);

  useEffect(() => {
    getDatasets();
  }, []);

  return !isLoaded ? (
    <LinearProgress />
  ) : !pagination.total ? (
    <Typography align="center" variant="h3">
      No datasets found
    </Typography>
  ) : (
    <TableContainer component={Paper}>
      <TablePagination
        pagination={pagination}
        onChange={handlePaginationChange}
      />

      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}>Name</TableCell>
            <TableCell align="right" className={classes.tableHeaderCell}>
              Source Folder
            </TableCell>
            {/* <TableCell align="right" className={classes.tableHeaderCell}>
              Size
            </TableCell> */}
            <TableCell align="right" className={classes.tableHeaderCell}>
              Creation Time
            </TableCell>
            <TableCell align="right" className={classes.tableHeaderCell}>
              Type
            </TableCell>
            {/* <TableCell align="right" className={classes.tableHeaderCell}>Proposal ID</TableCell> */}
            <TableCell align="right" className={classes.tableHeaderCell}>
              Group
            </TableCell>

            <TableCell className={classes.tableHeaderCell} />
          </TableRow>
        </TableHead>
        <TableBody>
          {datasets.map((dataset) => (
            <Row
              key={dataset.pid}
              dataset={dataset}
              onDatasetSelect={onDatasetSelect}
            />
          ))}
        </TableBody>
      </Table>

      <TablePagination
        pagination={pagination}
        onChange={handlePaginationChange}
      />
    </TableContainer>
  );
};
