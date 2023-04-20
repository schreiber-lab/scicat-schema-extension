import { Yup } from "../../../utils/validation";

export const validationSchema = Yup.object({
  proposalId: Yup.string().nullable().required(),
  pi_firstname: Yup.string().nullable(),
  pi_lastname: Yup.string().nullable(),
  email: Yup.string().nullable().required(),
  firstname: Yup.string().nullable(),
  lastname: Yup.string().nullable(),
  title: Yup.string().nullable(),
  abstract: Yup.string().nullable(),
  ownerGroup: Yup.string().nullable().required(),
});
