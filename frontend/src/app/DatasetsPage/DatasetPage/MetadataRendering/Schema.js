import { useState } from "react";
import {
  FormGroup,
  Collapse,
  IconButton,
  TableRow,
  TableCell,
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { Row } from "./Row";

export const Schema = ({ schemaName, fields }) => {
  const [openCollapse, setOpenCollapse] = useState(false);
  const toggleCollapse = () => {
    setOpenCollapse((isOpen) => !isOpen);
  };
  return (
    <FormGroup row>
      <TableRow>
        <TableCell>{schemaName}</TableCell>

        <TableCell component="th" scope="row">
          <IconButton onClick={toggleCollapse}>
            <KeyboardArrowDownIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <Collapse unmountOnExit in={openCollapse} timeout="auto">
            {Object.entries(fields).map(([name, value]) => (
              <Row key={name} name={name} value={value} />
            ))}
          </Collapse>
        </TableCell>
      </TableRow>
    </FormGroup>
  );
};
