import { Yup } from "../../../utils/validation";

export const validationSchema = Yup.object({
  schema_name: Yup.string().nullable().required(),
  schema_type: Yup.string().nullable().required(),
  fixed_value_entries: Yup.boolean().nullable(),
});
