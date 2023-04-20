import { useState } from "react";
import {
  FormControlLabel,
  Collapse,
  IconButton,
  Grid,
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { Checkbox } from "../../Checkbox";
import { Entry } from "./Entry";
import { MultipleEntries } from "./MultipleEntries";

export const Schema = ({ schema, baseKey }) => {
  const [openCollapse, setOpenCollapse] = useState(false);

  const toggleCollapse = () => {
    setOpenCollapse((isOpen) => !isOpen);
  };

  return (
    <div>
      <IconButton edge="start" onClick={toggleCollapse}>
        <KeyboardArrowDownIcon />
      </IconButton>

      <FormControlLabel
        control={
          <Checkbox name={`${baseKey}.${schema.schema_name}.isActive`} />
        }
        label={schema.schema_name}
      />

      <Collapse in={openCollapse} timeout="auto">
        <Grid container spacing={2}>
          {schema.multiples_entries ? (
            <MultipleEntries
              isVisible={openCollapse}
              schema={schema}
              baseKey={baseKey}
            />
          ) : (
            <Entry isVisible={openCollapse} schema={schema} baseKey={baseKey} />
          )}
        </Grid>
      </Collapse>
    </div>
  );
};
