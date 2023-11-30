import { Yup } from "../../../utils/validation";

export const validationSchema = Yup.object({
  sampleId: Yup.string().nullable().required(),
  description: Yup.string().nullable().required(),
  owner: Yup.string().nullable(),
  ownerGroup: Yup.string().nullable().required(),
});