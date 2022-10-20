import { Yup } from "../../../../utils/validation";

export const validationSchema = Yup.object({
  datasetName: Yup.string().nullable(),
  sourceFolder: Yup.string().nullable().required(),
  size: Yup.string().number().nullable(),
  owner: Yup.string().nullable().required(),
  contactEmail: Yup.string().nullable().required(),
  creationTime: Yup.string().nullable().required(),
  ownerGroup: Yup.string().nullable().required(),
  // startTime: Yup.number().nullable(),
  type: Yup.string().nullable().required(),
  // proposalId: Yup.number().nullable(),
  group: Yup.string().nullable(),
});
