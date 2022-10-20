import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
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
import { getFixedValueEntries } from "../../../redux/fixed-value-entries/operations";
import { Row } from "../../../modules/metadata-schemas/Entries/Row";
import { AddEntryButton } from "../AddEntryButton";
import { MetadataSchemasAutocomplete } from "../../../modules/metadata-schemas";

const useStyles = makeStyles(({ palette, spacing }) => ({
  root: {
    margin: spacing(2.5, 10),
    maxWidth: 1100,
  },
  title: {
    marginTop: spacing(4),
    fontSize: 26,
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
  const [schema, setSchema] = useState({ schema_name: "material" });
  const [entriesProps, setEntriesProps] = useState([]);
  const { isLoaded, fixedValueEntries } = useSelector(
    ({ fixedValueEntries }) => fixedValueEntries
  );

  const handleSchemaNameChange = (schema) => {
    // console.log(schemaName)
    dispatch(getFixedValueEntries({ schema_name: schema.schema_name }));
    setSchema(schema);
  };

  useEffect(() => {
    dispatch(getFixedValueEntries({ schema_name: schema.schema_name }));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (fixedValueEntries.length) {
      setEntriesProps(Object.keys(fixedValueEntries[0]));
    }
  }, [fixedValueEntries]);

  return (
    <Container className={classes.root}>
      {!isLoaded ? (
        <LinearProgress />
      ) : (
        <>
          <Box>
            <Box mb={-5} mt={4} maxWidth={300} mx="auto">
              {/* <TextField
              required
              fullWidth
              select
              margin="dense"
              name="schemaName"
              label="Schema name"
              value={schemaName}
              onChange={handleSchemaNameChange}
            >
              <MenuItem value="material">material</MenuItem>
            </TextField> */}
              <MetadataSchemasAutocomplete
                disableClearable
                value={schema}
                // params={{
                //   object_type: "sample",
                // }}
                onChange={handleSchemaNameChange}
              />
            </Box>

            <Box display="flex" justifyContent="flex-end">
              <AddEntryButton schemaName={schema.schema_name} />
            </Box>
          </Box>

          {!fixedValueEntries.length ? (
            <Typography
              align="center"
              color="primary"
              className={classes.title}
            >
              Fixed value entries of this schema not found
            </Typography>
          ) : (
            <Box mb={3}>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      {entriesProps.map((property) => (
                        <TableCell key={property} className={classes.tableHeaderCell}>
                          {property}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {fixedValueEntries.map((entry, index) => (
                      <Row
                        key={index}
                        field={entry}
                        entriesProps={entriesProps}
                      />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </>
      )}
    </Container>
  );
};
