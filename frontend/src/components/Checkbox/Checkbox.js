import { useFormContext, Controller } from "react-hook-form";
import MuiCheckbox from "@material-ui/core/Checkbox";

// prettier-ignore
export const Checkbox = ({
  name,
  onChange = () => {},

  ...props
}) => {
  // React Hook Form
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const formContext = name && useFormContext();
  
  return (
    <Controller
        name={name}
        control={formContext?.control}
        defaultValue={false}
        render={({ field: { value, ref, ...field } }) => (
          <MuiCheckbox
            {...field}
            inputRef={ref}
            checked={!!value}
            onChange={(event) => {
              onChange(event);
              field.onChange(event);
        
            }}
           />
        )}
    />
  );
};
