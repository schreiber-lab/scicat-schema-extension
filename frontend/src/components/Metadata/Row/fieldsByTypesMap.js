import { useFormContext } from "react-hook-form";
import { MenuItem, InputAdornment, FormControlLabel } from "@material-ui/core";
import { Autocomplete } from "../../Autocomplete";
import { TextField } from "../../TextField";
import { NumberMaskField } from "../../NumberMaskField";
import { Checkbox } from "../../Checkbox";

export const fieldsByTypesMap = {
  string: ({ name, field, onChange, ...props }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const formContext = useFormContext();

    if (field.unit) {
      formContext.setValue(name + ".unit", field.unit);
      //{"entries": [{qq: { unit:"mm"} }]}
      //{"entries": [{qq: { unit:"mm", value: 5} }]}
      //{"entries": [{qq: "value"]}
    }

    const textFieldProps = !field.allowed?.length
      ? {}
      : {
          select: true,
          children: field.allowed.map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          )),
        };


    const handleChange = ({ target: { value } }) => {
      onChange?.(value);
    };

    return (
      <TextField
        fullWidth
        variant="outlined"
        margin="dense"
        name={field.unit ? name + ".value" : name}
        InputProps={
          !field.unit
            ? null
            : {
                endAdornment: (
                  <InputAdornment position="end">{field.unit}</InputAdornment>
                ),
              }
        }
        onChange={handleChange}
        {...props}
        {...textFieldProps}
      />
    );
  },

  number: ({ field, name, onChange, ...props }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const formContext = useFormContext();

    if (field.unit) {
      formContext.setValue(name + ".unit", field.unit);
    }

    const handleChange = ({ target: { value } }) => {
      onChange?.(value);
    };

    return (
      <NumberMaskField
        fullWidth
        name={field.unit ? name + ".value" : name}
        variant="outlined"
        margin="dense"
        InputProps={
          !field.unit
            ? null
            : {
                endAdornment: (
                  <InputAdornment position="end">{field.unit}</InputAdornment>
                ),
              }
        }
        onChange={handleChange}
        {...props}
      />
    );
  },

  list: ({ field, onChange, ...props }) => {
    const isNumber = field.schema?.type === "number";

    const handleChange = (value) => {
      onChange?.(value);
    };

    return (
      <Autocomplete
        fullWidth
        isCreatable
        multiple
        variant="outlined"
        margin="dense"
        onCreate={(value) => Promise.resolve(isNumber ? +value : value)}
        onChange={handleChange}
        {...props}
      />
    );
  },
  boolean: ({ name, field, onChange, ...props }) => {
    const handleChange = (value) => {
      onChange?.(value);
    };

    return (
      <FormControlLabel
        control={
          <Checkbox name={name} onChange={handleChange}/>
        }
        {...props}
      />
    );
  },

};
