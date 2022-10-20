import { useFormContext } from "react-hook-form";
import { fieldsByTypesMap } from "./fieldsByTypesMap";
import { FixedValueEntriesAutocomplete } from "../../../modules/fixed-value-entries";

export const Row = ({ isVisible, field, schema, baseKey, index }) => {
  const formContext = useFormContext();
  const schemaName = schema.schema_name + (schema.multiples_entries ? `[${index}]` : "");
  const fieldProps = {
    name: `${baseKey}.${schemaName}.fields.${field.key_name}`,
    label: field.key_name,
    required: isVisible && field.required,
    onChange: (value) => {
      console.log(value);
      if (value) {
        formContext.setValue(`${baseKey}.${schemaName}.isActive`, true, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
        console.log(formContext.getValues());
      }
    }
  };

  if (schema.id_key === field.key_name) {
    return (
      <FixedValueEntriesAutocomplete
        {...fieldProps}
        multiple={field.type === "list"}
        keyName={field.key_name}
        baseKey={`${baseKey}.${schemaName}.fields`}
        params={{ schema_name: schema.schema_name }}
      />
    );
  }

  return (fieldsByTypesMap[field.type] || fieldsByTypesMap.string)({
    ...fieldProps,

    disabled: schema.fixed_value_entries,
    field,
  });
};
