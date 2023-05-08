import { env } from '../../../env';

export const defaultValues = {
  datasetName: null,
  sourceFolder: null,
  owner: env.REACT_APP_SCICAT_DEFAULT_DS_OWNER,
  contactEmail: null,
  creationTime: null,
  ownerGroup: env.REACT_APP_SCICAT_DEFAULT_DS_GROUP,
  type: null,
  description: null,
  // group: env.REACT_APP_SCICAT_DEFAULT_DS_OWNER_GROUP,
  ownerEmail: null,
  creationLocation: null,
  principalInvestigator: null,
  // accessGroups: null
};
