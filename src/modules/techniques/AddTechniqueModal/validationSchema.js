import { Yup } from "../../../utils/validation";

export const validationSchema = Yup.object({
  _id: Yup.object({
    pid: Yup.string().nullable().required(),
    name:Yup.string().nullable().required(),
  })
});
