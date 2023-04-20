import { useFormContext, Controller } from "react-hook-form";
import MuiRadio from "@material-ui/core/Radio";

// prettier-ignore
export const Radio = ({
  name,

  ...props
}) => {
  // React Hook Form
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const formContext = name && useFormContext();
  
  return (
    <Controller
      name={name}
      control={formContext?.control}
      render={({ field }) => (
        <MuiRadio
          inputRef={field.ref}
          checked={field.value === props.value}
          onChange={(e) => field.onChange(e.target.value)}

          { ...props}
        />
      )}
    />
  );
};
