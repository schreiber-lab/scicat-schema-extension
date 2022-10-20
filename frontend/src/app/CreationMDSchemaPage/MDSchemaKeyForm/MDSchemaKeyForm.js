import { useState } from "react";
import { FormGroup, FormControlLabel, MenuItem, Checkbox as MuiCheckbox } from "@material-ui/core";
import { TextField } from "../../../components/TextField";
import { Checkbox } from "../../../components/Checkbox";
import { Autocomplete } from "../../../components/Autocomplete";

export const MDSchemaKeyForm = () => {
  const [checkboxes, setCheckboxes] = useState({});

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
        name="key_name"
        label="Key name"
        placeholder="Enter key name..."
      />

      <TextField
        required
        fullWidth
        select
        margin="dense"
        name="type"
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
            <MuiCheckbox 
              name="withUnit" 
              checked={checkboxes.withUnit} 
              onChange={handleCheckboxChange("withUnit")} 
            />
          }
          label="Use unit"
        />

        {!!checkboxes.withUnit && (
          <TextField
            fullWidth
            variant="outlined"
            margin="dense"
            name="unit"
            label="Unit"
            placeholder="Enter unit..."
          />
        )}

        <FormControlLabel
          control={
            <MuiCheckbox
              name="withPredefinedValues"
              checked={checkboxes.withPredefinedValues}
              onChange={handleCheckboxChange("withPredefinedValues")}
            />
          }
          label="Use predefined values"
        />

        {!!checkboxes.withPredefinedValues && (
          <Autocomplete
            fullWidth
            multiple
            isCreatable
            variant="outlined"
            margin="dense"
            name="allowed"
            label="Predefined values"
            placeholder="Enter predefined values..."
          />
        )}

        <FormGroup row={true}>
          <FormControlLabel
            control={<Checkbox name="required" />}
            label="Required"
          />
          <FormControlLabel
            control={<Checkbox name="scan_ref" />}
            label="Scan ref"
          />
          <FormControlLabel
            control={<Checkbox name="changes_likely" />}
            label="Changes likely"
          />
        </FormGroup>
      </FormGroup>
    </>
  );
};
