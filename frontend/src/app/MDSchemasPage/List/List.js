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
  MenuItem,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getMDSchemas } from "../../../redux/md-schemas/operations";
import { Row } from "../../../modules/metadata-schemas/Keys/Row";
import { CreateMDSchemaKeyButton } from "./CreateMDSchemaKeyButton";

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
  const [schemaType, setSchemaType] = useState("dataset");
  const { isLoaded, mdSchemas } = useSelector(({ mdSchemas }) => mdSchemas);
console.log(mdSchemas)
  const handleSchemaTypeChange = ({ target: { value } }) => {
    dispatch(getMDSchemas({ object_type: value }));
    setSchemaType(value);
  };

  useEffect(() => {
    dispatch(getMDSchemas({ object_type: schemaType }));
  }, []);

  return (
    <Container className={classes.root}>
      {!isLoaded ? (
        <LinearProgress />
      ) : (
        <>
          <Box maxWidth={300} mx="auto">
            <TextField
              required
              fullWidth
              select
              margin="dense"
              name="schemaType"
              label="Schema type"
              // variant="standard"
              value={schemaType}
              onChange={handleSchemaTypeChange}
            >
              <MenuItem value="dataset">Dataset</MenuItem>
              <MenuItem value="sample">Sample</MenuItem>
              <MenuItem value="instrument">Instrument</MenuItem>
            </TextField>
          </Box>
          {!mdSchemas.length ? (
            <Typography
              align="center"
              color="primary"
              className={classes.title}
            >
              Schemas of this type not found
            </Typography>
          ) : (
            mdSchemas.map((mdSchema, index) => (
              <Box mb={3} key={index}>
                <Typography variant="h5">{mdSchema.schema_name}</Typography>

                {!mdSchema.keys?.length ? (
                   <TableHead>
                  <Typography>No keys of these schema were found. Press the button to create a new key. </Typography>
                  <TableCell >
                  <CreateMDSchemaKeyButton schemaName={mdSchema.schema_name}/>
                </TableCell>
                </TableHead>
                ) : (
                  <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell className={classes.tableHeaderCell}>
                            Key name
                          </TableCell>

                          <TableCell className={classes.tableHeaderCell}>
                            Type
                          </TableCell>

                          <TableCell className={classes.tableHeaderCell}>
                            Unit
                          </TableCell>

                          <TableCell className={classes.tableHeaderCell}>
                            Required
                          </TableCell>

                          <TableCell className={classes.tableHeaderCell}>
                            Scan ref
                          </TableCell>

                          <TableCell className={classes.tableHeaderCell}>
                            Changes likely
                          </TableCell>

                          <TableCell className={classes.tableHeaderCell}>
                            Allowed
                          </TableCell>
                          
                          <TableCell className={classes.tableHeaderCell}>
                            <CreateMDSchemaKeyButton schemaName={mdSchema.schema_name}/>
                          </TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {mdSchema.keys?.map((key, index) => (
                          <Row key={index} field={key} schemaName={mdSchema.schema_name} />
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Box>
            ))
          )}
        </>
      )}
      {/* <div>Page for MDSchemas</div> */}
    </Container>
  );
};
