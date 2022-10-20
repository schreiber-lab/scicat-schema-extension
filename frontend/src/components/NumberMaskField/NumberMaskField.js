import { useFormContext, Controller } from "react-hook-form";
import NumberFormat from "react-number-format";
import { TextField } from "@material-ui/core";

// prettier-ignore
export const NumberMaskField = ({ name, ...props }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const formContext = name && useFormContext();

  return (
    <Controller
      name={name}
      control={formContext?.control}
      render={({ field: { onChange, ...field } }) => {
        return (
          <NumberFormat
            mask="_"
            allowNegative={false}
            customInput={TextField}
            onValueChange={({ floatValue }) => {
              onChange(floatValue || null);
            }}

            {...field}
            {...props}
          />
        );
      }}
    />
  );
};
