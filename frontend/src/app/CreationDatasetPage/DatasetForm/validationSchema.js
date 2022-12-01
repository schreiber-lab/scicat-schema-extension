import { Yup } from "../../../utils/validation";

export const validationSchema = Yup.object({
  datasetName: Yup.string().nullable(),
  sourceFolder: Yup.string().nullable().required(),
  // size: Yup.number().nullable(),
  owner: Yup.string().nullable().required(),
  contactEmail: Yup.string().nullable().email().required(),
  creationTime: Yup.string().nullable().required(),
  ownerGroup: Yup.string().nullable().required(),
  // startTime: Yup.number().nullable(),
  type: Yup.string().nullable().required(),
  proposalId: Yup.string().nullable(),
  description: Yup.string().nullable(),
  group: Yup.string().nullable(),
  // creationLocation: Yup.string().nullable().required(),
  // principalInvestigator: Yup.string().nullable().required()
});
