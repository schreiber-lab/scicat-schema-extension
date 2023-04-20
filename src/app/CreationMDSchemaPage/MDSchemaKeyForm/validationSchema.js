import { Yup } from "../../../utils/validation";

export const validationSchema = Yup.object({
  key_name: Yup.string().nullable(),
  type: Yup.string().nullable().required(),
  unit: Yup.string().nullable(),
  allowed: Yup.mixed().nullable(),
  required: Yup.boolean().nullable(),
  scan_ref: Yup.boolean().nullable(),
  changes_likely: Yup.boolean().nullable(),
});
