import { useState } from "react";
import { useWatch } from "react-hook-form";
import {
  FormGroup,
  FormControlLabel,
  MenuItem,
  Checkbox as MuiCheckbox,
} from "@material-ui/core";
import { TextField } from "../../../../components/TextField";
import { Checkbox } from "../../../../components/Checkbox";
import { Autocomplete } from "../../../../components/Autocomplete";

export const MDSchemaKeyForm = ({ fieldNamePrefix = "" }) => {
  const [checkboxes, setCheckboxes] = useState({});
  const keyType = useWatch({ name: fieldNamePrefix + "type" });
  const withPredefinedValues = useWatch({ name: "withPredefinedValues" });
  const withUnit = useWatch({ name: "withUnit" });

  const handleCheckboxChange =
    (name) =>
    ({ target: { checked } }) => {
      setCheckboxes((checkboxes) => ({
        ...checkboxes,
        [name]: checked,
      }));
    };

  return (
    <>
      <TextField
        fullWidth
        margin="dense"
        name={fieldNamePrefix + "key_name"}
        label="Key name"
        placeholder="Enter key name..."
      />

      <TextField
        required
        fullWidth
        select
        margin="dense"
        name={fieldNamePrefix + "type"}
        label="Type"
      >
        <MenuItem value="string">string</MenuItem>
        <MenuItem value="number">number</MenuItem>
        <MenuItem value="list">list</MenuItem>
        <MenuItem value="boolean">boolean</MenuItem>
      </TextField>

      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              name="withUnit"
              checked={checkboxes.withUnit}
              onChange={handleCheckboxChange("withUnit")}
            />
          }
          label="Use unit"
        />

        {!!withUnit && (
          <TextField
            fullWidth
            variant="outlined"
            margin="dense"
            name={fieldNamePrefix + "unit"}
            label="Unit"
            placeholder="Enter unit..."
          />
        )}

        {keyType !== "boolean" && (
          <FormControlLabel
            control={
              <Checkbox
                name="withPredefinedValues"
                // checked={withPredefinedValues}
                // onChange={handleCheckboxChange("withPredefinedValues")}
              />
            }
            label="Use predefined values"
          />
        )}

        {!!withPredefinedValues && (
          <Autocomplete
            fullWidth
            multiple
            isCreatable
            variant="outlined"
            margin="dense"
            name={fieldNamePrefix + "allowed"}
            label="Predefined values"
            placeholder="Enter predefined values..."
          />
        )}

        <FormGroup row={true}>
          <FormControlLabel
            control={<Checkbox name={fieldNamePrefix + "required"} />}
            label="Required"
          />
          <FormControlLabel
            control={<Checkbox name={fieldNamePrefix + "scan_ref"} />}
            label="Scan ref"
          />
          <FormControlLabel
            control={<Checkbox name={fieldNamePrefix + "changes_likely"} />}
            label="Changes likely"
          />
        </FormGroup>
      </FormGroup>
    </>
  );
};