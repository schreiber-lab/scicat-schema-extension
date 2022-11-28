import { env } from '../../../env';

export const defaultValues = {
  datasetName: null,
  sourceFolder: null,
  owner: env.REACT_APP_OWNER,
  contactEmail: null,
  creationTime: null,
  ownerGroup: env.REACT_APP_OWNER_GROUP,
  type: null,
  description: null,
  group: env.REACT_APP_GROUP,
  // creationLocation: null,
  // principalInvestigator: null,
  // accessGroups: null
};
