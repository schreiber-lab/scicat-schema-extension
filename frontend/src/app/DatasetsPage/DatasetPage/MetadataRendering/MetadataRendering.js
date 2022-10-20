import {
  Table,
  Paper,
  TableContainer,
  TableHead,
  TableBody,
  Typography,
} from "@material-ui/core";
import { Schema } from "./Schema";

export const MetadataRendering = ({ metadata }) => {
  const metadataArray = Object.entries(metadata);

  return !metadataArray.length ? (
    <Typography>No Metadata</Typography>
  ) : (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <Typography variant="h5">Metadata</Typography>
        </TableHead>

        <TableBody>
          {metadataArray.map(([ schemaName, { isActive, fields } ]) => !!isActive && (
            <Schema key={schemaName} fields={fields} schemaName={schemaName} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
