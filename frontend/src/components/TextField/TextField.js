import { forwardRef } from "react";
import { useFormContext, useController } from "react-hook-form";
import MuiTextField from "@material-ui/core/TextField";

// prettier-ignore
export const TextField = forwardRef(({
  unbindForm = false,
  name,
  InputLabelProps,
  onChange,

  ...props
}, ref) => {
  // React Hook Form
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const formContext = name && useFormContext();
  const formRegister = formContext?.register?.(name);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { fieldState } = (formContext && useController({
    name,
    control: formContext?.control
  })) || {};
  const errorMessage = fieldState?.error?.message;
  const value = formContext?.watch(name) || "";
 console.log(name, errorMessage, fieldState)
  const handleChange = (event) => {
    console.log(name, formRegister)
    onChange?.(event);
    formRegister?.onChange(event);
  };

  return (
    <MuiTextField
      value={value}
      error={!!errorMessage}
      helperText={errorMessage}

      {...formRegister}
      {...props}

      InputLabelProps={formContext?.getValues(name) ? { shrink: true } : {}}
      onChange={handleChange}
      ref={(!unbindForm && formRegister?.ref) || ref}
    />
  );
});
