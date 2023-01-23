import { fieldsByTypesMap } from "../../../../components/Metadata/Row/fieldsByTypesMap";

export const Field = ({ field }) => {
  return (fieldsByTypesMap[field.type] || fieldsByTypesMap.string)({
    name: `entries[0].${field.key_name}`,
    label: field.key_name,
    required: field.required,
    field,
  });
};
