import { Controller, useFormContext, useController } from "react-hook-form";
import { DatePicker as MuiDatePicker } from "@material-ui/pickers";

export const DatePicker = ({ name, ...props }) => {
  // React Hook Form
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const formContext = name && useFormContext();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { fieldState } = (formContext && useController({
    name,
    control: formContext?.control
  })) || {};
  const errorMessage = fieldState?.error?.message;


  return (
    <Controller
      name={name}
      control={formContext?.control}
      render={({ field: { ref, ...field } }) => (
        <MuiDatePicker
          animateYearScrolling
          error={!!errorMessage}
          helperText={errorMessage}
          format="L"
          {...field}
          {...props}
        />

      )}
    />
  );
};
