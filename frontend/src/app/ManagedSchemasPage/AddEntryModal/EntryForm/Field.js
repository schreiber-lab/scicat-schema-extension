import { fieldsByTypesMap } from "../../../../components/Metadata/Row/fieldsByTypesMap";

export const Field = ({ field, basePath }) => {
  return (fieldsByTypesMap[field.type] || fieldsByTypesMap.string)({
    name: `${basePath ? basePath + "." : ""}${field.key_name}`,
    label: field.key_name,
    required: field.required,
    field,
  });
};
