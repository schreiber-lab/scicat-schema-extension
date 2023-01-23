import { useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form"
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Collapse,
  IconButton,
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { Row } from "./Row";

export const Schema = ({ schema }) => {
  const [openCollapse, setOpenCollapse] = useState(false);
  const { control } = useFormContext()
  const field = useWatch({ name: "scientificMetadata.measurement" })
  const toggleCollapse = () => {
    setOpenCollapse((isOpen) => !isOpen);
  };
console.log(field)
  return (
    <FormGroup row>
      <IconButton onClick={toggleCollapse}>
        <KeyboardArrowDownIcon />
      </IconButton>

      <FormControlLabel
        control={
          <Controller
            name={`scientificMetadata.${schema.schema_name}.isActive`}
            control={control}
            render={({ field }) => (
              <Checkbox
                inputRef={field.ref}
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            )}
          />
        }
        label={schema.schema_name}
      />

      <Collapse in={openCollapse} timeout="auto">
        {schema.keys.map((field) => (
          <Row key={field.key_name} field={field} schemaName={schema.schema_name} />
        ))}
      </Collapse>
    </FormGroup>
  );
};
