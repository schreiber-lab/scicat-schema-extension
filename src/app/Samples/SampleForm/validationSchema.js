import { Yup } from "../../../utils/validation";

export const validationSchema = Yup.object({
  description: Yup.string().nullable(),
  owner: Yup.string().nullable(),
  ownerGroup: Yup.string().nullable().required(),
});
